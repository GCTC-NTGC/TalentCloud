import React, { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import RootContainer from "../../RootContainer";
import ProfileExperience from "./ProfileExperience";
import {
  useFetchExperienceConstants,
  useFetchSkills,
} from "../../../hooks/applicationHooks";
import { RootState } from "../../../store/store";
import {
  getExperienceByApplicant,
  getExperienceSkillsByApplicant,
  getUpdatingByApplicant,
} from "../../../store/Experience/experienceSelector";
import { Experience, ExperienceSkill } from "../../../models/types";
import {
  batchCreateExperienceSkills,
  batchDeleteExperienceSkills,
  batchUpdateExperienceSkills,
  createExperience,
  deleteExperience,
  fetchExperienceByApplicant,
  updateExperience,
} from "../../../store/Experience/experienceActions";
import { loadingMessages } from "../../Application/applicationMessages";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import { useApplicantSkillIds } from "../../../hooks/apiResourceHooks";
import { find, where } from "../../../helpers/queries";
import { deepEquals } from "../../../helpers/deepEquals";

const ProfileExperiencePage: FunctionComponent<{ applicantId: number }> = ({
  applicantId,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const skills = useFetchSkills(dispatch);
  const applicantSkillIdsResource = useApplicantSkillIds(applicantId);

  const experiencesByType = useSelector((state: RootState) =>
    getExperienceByApplicant(state, { applicantId }),
  );
  const experiences: Experience[] = [
    ...experiencesByType.award,
    ...experiencesByType.community,
    ...experiencesByType.education,
    ...experiencesByType.personal,
    ...experiencesByType.work,
  ];

  // Fetch Experiences.
  const experiencesUpdating = useSelector((state: RootState) =>
    getUpdatingByApplicant(state, { applicantId }),
  );
  const [experiencesFetched, setExperiencesFetched] = useState(false);
  useEffect(() => {
    // Only load experiences if they have never been fetched by this component (!experiencesFetched),
    //  have never been fetched by another component (length === 0),
    //  and are not currently being fetched (!experiencesUpdating).
    if (
      !experiencesFetched &&
      !experiencesUpdating &&
      experiences.length === 0
    ) {
      setExperiencesFetched(true);
      dispatch(fetchExperienceByApplicant(applicantId));
    }
  }, [
    applicantId,
    dispatch,
    experiences.length,
    experiencesFetched,
    experiencesUpdating,
  ]);
  const experienceSkills: ExperienceSkill[] = useSelector((state: RootState) =>
    getExperienceSkillsByApplicant(state, { applicantId }),
  );
  const {
    awardRecipientTypes,
    awardRecognitionTypes,
    educationTypes,
    educationStatuses,
  } = useFetchExperienceConstants(dispatch);

  const userSkills =
    applicantSkillIdsResource.status !== "rejected"
      ? skills.filter((skill) =>
          applicantSkillIdsResource.value.skill_ids.includes(skill.id),
        )
      : [];

  const newExpSkill = (
    exp: Experience,
    skillId: number,
    justification: string,
  ): ExperienceSkill => ({
    id: 0,
    skill_id: skillId,
    experience_id: exp.id,
    experience_type: exp.type,
    justification,
    created_at: new Date(),
    updated_at: new Date(),
  });

  const handleCreateExperience = async (
    data: ExperienceSubmitData<Experience>,
  ): Promise<void> => {
    // If the experience is brand new, it (and related experience skills) must be created on server.
    const result = await dispatch(
      createExperience(data.experience, applicantId),
    );
    if (!result.error) {
      const createdExperience = (await result.payload).experience;
      const expSkills: ExperienceSkill[] = data.savedSkills.map((skill) => {
        return newExpSkill(
          createdExperience,
          skill.skillId,
          skill.justification,
        );
      });
      if (expSkills.length > 0) {
        dispatch(batchCreateExperienceSkills(expSkills));
      }
    }
  };
  const handleUpdateExperience = async ({
    experience,
    savedSkills,
  }: ExperienceSubmitData<Experience>): Promise<void> => {
    const allRequests: Promise<any>[] = [];
    // Determine if the experience has changed and needs to be updated.
    const prevExperience = find(
      where(experiences, "type", experience.type),
      experience.id,
    );
    if (!deepEquals(experience, prevExperience)) {
      const updateExpRequest = dispatch(updateExperience(experience));
      allRequests.push(updateExpRequest);
    }

    // Determine which skills were already linked to the experience
    const prevExpSkills = experienceSkills.filter(
      (expSkill) =>
        expSkill.experience_id === experience.id &&
        expSkill.experience_type === experience.type,
    );
    const prevSkillIds = prevExpSkills.map((expSkill) => expSkill.skill_id);
    const newSkillIds = savedSkills.map((x) => x.skillId);

    // Delete skills that were removed.
    const expSkillsToDelete = prevExpSkills.filter(
      (expSkill) => !newSkillIds.includes(expSkill.skill_id),
    );
    if (expSkillsToDelete.length > 0) {
      const batchDeleteExpSkillsRequest = dispatch(
        batchDeleteExperienceSkills(expSkillsToDelete),
      );
      allRequests.push(batchDeleteExpSkillsRequest);
    }

    // Created new Experience Skills for skills which don't exist yet.
    const createdSkills = savedSkills
      .filter((savedSkill) => !prevSkillIds.includes(savedSkill.skillId))
      .map((savedSkill) =>
        newExpSkill(experience, savedSkill.skillId, savedSkill.justification),
      );
    if (createdSkills.length > 0) {
      const batchCreateExpSkillsRequest = dispatch(
        batchCreateExperienceSkills(createdSkills),
      );
      allRequests.push(batchCreateExpSkillsRequest);
    }

    // Update Experience Skills which already existed but for which justifications have changed.
    const updatedSkills = prevExpSkills
      .filter((expSkill) => newSkillIds.includes(expSkill.skill_id))
      .reduce(
        (modifiedSkills: ExperienceSkill[], expSkill: ExperienceSkill) => {
          const matchingSavedSkill = savedSkills.find(
            (x) => x.skillId === expSkill.skill_id,
          );
          if (
            matchingSavedSkill !== undefined &&
            expSkill.justification !== matchingSavedSkill.justification
          ) {
            modifiedSkills.push({
              ...expSkill,
              justification: matchingSavedSkill.justification,
            });
          }
          return modifiedSkills;
        },
        [],
      );
    if (updatedSkills.length > 0) {
      const batchUpdateExpSkillsRequest = dispatch(
        batchUpdateExperienceSkills(updatedSkills),
      );
      allRequests.push(batchUpdateExpSkillsRequest);
    }

    await Promise.allSettled(allRequests);
  };
  const handleDeleteExperience = async (
    id: number,
    type: Experience["type"],
  ): Promise<void> => {
    return dispatch(deleteExperience(id, type));
  };

  const experienceConstantsLoaded =
    awardRecipientTypes.length > 0 &&
    awardRecognitionTypes.length > 0 &&
    educationTypes.length > 0 &&
    educationStatuses.length > 0;
  const experiencesLoaded = experiencesFetched && !experiencesUpdating;
  const showComponent =
    experienceConstantsLoaded &&
    skills.length > 0 &&
    applicantSkillIdsResource.status !== "pending" &&
    experiencesLoaded;

  return (
    <>
      {showComponent ? (
        <ProfileExperience
          applicantId={applicantId}
          experiences={experiences}
          experienceSkills={experienceSkills}
          userSkills={userSkills}
          educationStatuses={educationStatuses}
          educationTypes={educationTypes}
          handleCreateExperience={handleCreateExperience}
          handleUpdateExperience={handleUpdateExperience}
          handleDeleteExperience={handleDeleteExperience}
          recipientTypes={awardRecipientTypes}
          recognitionTypes={awardRecognitionTypes}
        />
      ) : (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(2)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      )}
      <div id="modal-root" data-clone />
    </>
  );
};

if (document.getElementById("profile-experience")) {
  const root = document.getElementById("profile-experience");
  if (root && "applicantId" in root.dataset) {
    const applicantId = Number(root.dataset.applicantId as string);
    ReactDOM.render(
      <RootContainer>
        <ProfileExperiencePage applicantId={applicantId} />
      </RootContainer>,
      root,
    );
  }
}
