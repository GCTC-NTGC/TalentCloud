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
  Classification,
  Experience as ExperienceType,
  ExperienceSkill,
} from "../../../models/types";
import {
  createExperience,
  updateExperience,
  deleteExperience,
  batchCreateExperienceSkills,
  batchDeleteExperienceSkills,
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
  useJobApplicationSteps,
  useTouchApplicationStep,
} from "../../../hooks/applicationHooks";
import { useLoadClassifications } from "../../../hooks/classificationHooks";

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

  const { classifications } = useLoadClassifications(dispatch);
  const application = useApplication(applicationId);
  const jobId = application?.job_poster_id;
  const job = useJob(jobId);
  const classificationEducationRequirements =
    classifications.find(
      (item: Classification) => item.id === job?.classification_id,
    )?.education_requirements[locale] || null;
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
  const steps = useJobApplicationSteps();

  const stepsAreUpdating = useTouchApplicationStep(
    applicationId,
    "experience",
    dispatch,
  );

  const showLoadingState =
    application === null ||
    job === null ||
    classifications === null ||
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
        const expSkills: ExperienceSkill[] = newLinkedSkills.map((skill) => {
          return newExpSkill(skill.id, newExperience);
        });
        if (expSkills.length > 0) {
          dispatch(batchCreateExperienceSkills(expSkills));
        }
      }
    } else {
      const allRequests: Promise<any>[] = [];
      // If the experience already exists it can simply be updated.
      const updateExpRequest = dispatch(updateExperience(experience));
      allRequests.push(updateExpRequest);
      // Determine which skills were already linked to the experience
      const prevExpSkills = experienceSkills.filter(
        (expSkill) =>
          expSkill.experience_id === experience?.id &&
          expSkill.experience_type === experience?.type &&
          criteria.find(
            (criterion) => criterion.skill_id === expSkill.skill_id,
          ),
      );
      const prevSkillIds = prevExpSkills.map((expSkill) => expSkill.skill_id);
      const newSkillIds = newLinkedSkills.map(getId);

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
      const newExpSkills: ExperienceSkill[] = [];
      const newExpSkillIds = newSkillIds.filter(
        (newSkillId) => !prevSkillIds.includes(newSkillId),
      );
      newExpSkillIds.forEach((expSkillId) => {
        if (experience) {
          newExpSkills.push(newExpSkill(expSkillId, experience));
        }
      });

      if (newExpSkills.length > 0) {
        const batchCreateExpSkillsRequest = dispatch(
          batchCreateExperienceSkills(newExpSkills),
        );
        allRequests.push(batchCreateExpSkillsRequest);
      }

      await Promise.allSettled(allRequests);
    }
  };
  const handleDelete = async (
    id: number,
    type: ExperienceType["type"],
  ): Promise<void> => {
    // Deleting an Experience automatically handles deleting associated ExperienceSkills.
    await dispatch(deleteExperience(id, type));
  };

  const handleContinue = async (): Promise<void> => {
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
            steps,
            intl,
            "experience",
            stepsAreUpdating,
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
          jobEducationRequirements={localizeField(locale, job, "education")}
          classificationEducationRequirements={
            classificationEducationRequirements
          }
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
