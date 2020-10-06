/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { getLocale, localizeField } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationSkillsIntro,
  applicationBasic,
  applicationIndex,
} from "../../../helpers/routes";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import { ExperienceStep, ExperienceSubmitData } from "./Experience";
import {
  Experience as ExperienceType,
  ExperienceSkill,
} from "../../../models/types";
import {
  createExperience,
  createExperienceSkill,
  updateExperience,
  deleteExperienceSkill,
  deleteExperience,
} from "../../../store/Experience/experienceActions";
import { getId } from "../../../helpers/queries";
import { DispatchType } from "../../../configureStore";
import { loadingMessages } from "../applicationMessages";
import {
  useExperienceSkills,
  useFetchAllApplicationData,
  useExperienceConstants,
  useApplication,
  useJob,
  useCriteria,
  useExperiences,
  useSkills,
} from "../../../hooks/applicationHooks";

interface ExperiencePageProps {
  applicationId: number;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  // Fetch all un-loaded data that may be required for the Application.
  const {
    experiencesLoaded,
    experienceConstantsLoaded,
    skillsLoaded,
  } = useFetchAllApplicationData(applicationId, dispatch);

  const application = useApplication(applicationId);
  const jobId = application?.job_poster_id;
  const job = useJob(jobId);
  const criteria = useCriteria(jobId);
  const experiences = useExperiences(applicationId, application);
  const experienceSkills = useExperienceSkills(applicationId, application);
  const skills = useSkills();
  const {
    awardRecipientTypes,
    awardRecognitionTypes,
    educationTypes,
    educationStatuses,
  } = useExperienceConstants();

  const showLoadingState =
    application === null ||
    job === null ||
    !experiencesLoaded ||
    !skillsLoaded ||
    !experienceConstantsLoaded;

  const handleSubmit = async (data: ExperienceSubmitData): Promise<void> => {
    // extract the Experience object from the data.
    let experience: ExperienceType | null = null;
    if ("experienceWork" in data) {
      experience = data.experienceWork;
    } else if ("experienceAward" in data) {
      experience = data.experienceAward;
    } else if ("experienceCommunity" in data) {
      experience = data.experienceCommunity;
    } else if ("experienceEducation" in data) {
      experience = data.experienceEducation;
    } else if ("experiencePersonal" in data) {
      experience = data.experiencePersonal;
    }
    if (experience === null) {
      return;
    }

    const newLinkedSkills = [
      ...data.savedRequiredSkills,
      ...data.savedOptionalSkills,
    ];

    const newExpSkill = (
      skillId: number,
      exp: ExperienceType,
    ): ExperienceSkill => ({
      id: 0,
      skill_id: skillId,
      experience_id: exp.id,
      experience_type: exp.type,
      justification: "",
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (experience.id === 0) {
      const applicantId = application?.applicant_id;
      if (applicantId === undefined) {
        // This should never happen. By the time the Submit handler is called, application must be loaded.
        throw new Error(
          "Submitting new Experience before Application has loaded.",
        );
      }
      // If the experience is brand new, it (and related experience skills) must be created on server.
      const result = await dispatch(createExperience(experience, applicantId));
      if (!result.error) {
        const newExperience = (await result.payload).experience;
        const saveRequests = newLinkedSkills.map((skill) => {
          const expSkill = newExpSkill(skill.id, newExperience);
          return dispatch(createExperienceSkill(expSkill));
        });
        await Promise.allSettled(saveRequests);
      }
    } else {
      // If the experience already exists it can simply be updated.
      const updateExpRequest = dispatch(updateExperience(experience));
      // Determine which skills were already linked to the experience
      const prevExpSkills = experienceSkills.filter(
        (expSkill) =>
          expSkill.experience_id === experience?.id &&
          expSkill.experience_type === experience?.type,
      );
      const prevSkillIds = prevExpSkills.map((expSkill) => expSkill.skill_id);
      const newSkillIds = newLinkedSkills.map(getId);

      // Delete skills that were removed.
      const deleteRequests = prevExpSkills
        .filter((expSkill) => !newSkillIds.includes(expSkill.skill_id))
        .map((expSkill) =>
          dispatch(
            deleteExperienceSkill(
              expSkill.id,
              expSkill.experience_id,
              expSkill.experience_type,
            ),
          ),
        );
      // Created new Experience Skills for skills which don't exist yet.
      const createRequests = newSkillIds
        .filter((newSkillId) => !prevSkillIds.includes(newSkillId))
        .map((newSkillId) =>
          experience
            ? dispatch(
                createExperienceSkill(newExpSkill(newSkillId, experience)),
              )
            : Promise.reject(),
        );
      await Promise.allSettled([
        updateExpRequest,
        ...deleteRequests,
        ...createRequests,
      ]);
    }
  };
  const handleDelete = async (
    id: number,
    type: ExperienceType["type"],
  ): Promise<void> => {
    // Deleting an Experience automatically handles deleting associated ExperienceSkills.
    await dispatch(deleteExperience(id, type));
  };

  const handleContinue = (): void => {
    navigate(applicationSkillsIntro(locale, applicationId));
  };
  const handleReturn = (): void => {
    navigate(applicationBasic(locale, applicationId));
  };
  const handleQuit = (): void => {
    window.location.href = applicationIndex(locale);
  };
  const closeDate = job?.close_date_time ?? null;
  return (
    <>
      {application !== null && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.step02)}
          steps={makeProgressBarSteps(
            applicationId,
            application,
            intl,
            "experience",
          )}
        />
      )}
      {showLoadingState && (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(2)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      )}
      {/* Note: if showLoadingState is false, job must not be null, but TypeScript can't seem to infer that. */}
      {!showLoadingState && job !== null && (
        <ExperienceStep
          experiences={experiences}
          educationStatuses={educationStatuses}
          educationTypes={educationTypes}
          experienceSkills={experienceSkills}
          criteria={criteria}
          skills={skills}
          jobId={job.id}
          jobClassificationId={job.classification_id}
          jobEducationRequirements={localizeField(locale, job, "education")}
          recipientTypes={awardRecipientTypes}
          recognitionTypes={awardRecognitionTypes}
          handleSubmitExperience={handleSubmit}
          handleDeleteExperience={handleDelete}
          handleContinue={handleContinue}
          handleReturn={handleReturn}
          handleQuit={handleQuit}
        />
      )}
      <div id="modal-root" data-clone />
    </>
  );
};

export default ExperiencePage;
