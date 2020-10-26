import React, { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import RootContainer from "../RootContainer";
import ProfileExperience from "./ProfileExperience";
import {
  useFetchExperienceConstants,
  useFetchSkills,
} from "../../hooks/applicationHooks";
import { RootState } from "../../store/store";
import {
  getExperienceByApplicant,
  getExperienceSkillsByApplicant,
  getUpdatingByApplicant,
} from "../../store/Experience/experienceSelector";
import { Experience, ExperienceSkill } from "../../models/types";
import {
  createExperience,
  deleteExperience,
  deleteExperienceSkill,
  fetchExperienceByApplicant,
  updateExperience,
  updateExperienceSkill,
} from "../../store/Experience/experienceActions";
import { loadingMessages } from "../Application/applicationMessages";

const ProfileExperiencePage: FunctionComponent<{ applicantId: number }> = ({
  applicantId,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const skills = useFetchSkills(dispatch);

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
  const experienceSkills = useSelector((state: RootState) =>
    getExperienceSkillsByApplicant(state, { applicantId }),
  );
  const {
    awardRecipientTypes,
    awardRecognitionTypes,
    educationTypes,
    educationStatuses,
  } = useFetchExperienceConstants(dispatch);

  const handleCreateExperience = async (data: Experience): Promise<void> => {
    return dispatch(createExperience(data, applicantId));
  };
  const handleUpdateExperience = async (data: Experience): Promise<void> => {
    return dispatch(updateExperience(data));
  };
  const handleDeleteExperience = async (
    id: number,
    type: Experience["type"],
  ): Promise<void> => {
    return dispatch(deleteExperience(id, type));
  };
  const handleUpdateExperienceSkill = async (
    expSkill: ExperienceSkill,
  ): Promise<void> => {
    return dispatch(updateExperienceSkill(expSkill));
  };
  const handleDeleteExperienceSkill = async (
    expSkill: ExperienceSkill,
  ): Promise<void> => {
    return dispatch(
      deleteExperienceSkill(
        expSkill.id,
        expSkill.experience_id,
        expSkill.experience_type,
      ),
    );
  };

  const experienceConstantsLoaded =
    awardRecipientTypes.length > 0 &&
    awardRecognitionTypes.length > 0 &&
    educationTypes.length > 0 &&
    educationStatuses.length > 0;
  const experiencesLoaded = experiencesFetched && !experiencesUpdating;
  const showComponent =
    experienceConstantsLoaded && skills.length > 0 && experiencesLoaded;

  return (
    <>
      {showComponent ? (
        <ProfileExperience
          experiences={experiences}
          experienceSkills={experienceSkills}
          skills={skills}
          educationStatuses={educationStatuses}
          educationTypes={educationTypes}
          handleCreateExperience={handleCreateExperience}
          handleUpdateExperience={handleUpdateExperience}
          handleDeleteExperience={handleDeleteExperience}
          handleUpdateExperienceSkill={handleUpdateExperienceSkill}
          handleDeleteExperienceSkill={handleDeleteExperienceSkill}
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
