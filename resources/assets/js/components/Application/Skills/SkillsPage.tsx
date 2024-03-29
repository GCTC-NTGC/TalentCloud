/* eslint-disable camelcase */
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { ExperienceSkill } from "../../../models/types";
import { navigate } from "../../../helpers/router";
import {
  applicationFit,
  applicationIndex,
  applicationExperience,
} from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";
import { DispatchType } from "../../../configureStore";
import {
  updateExperienceSkill,
  deleteExperienceSkill,
  batchUpdateExperienceSkills,
} from "../../../store/Experience/experienceActions";
import Skills from "./Skills";
import { loadingMessages } from "../applicationMessages";
import {
  useApplication,
  useCriteria,
  useExperiences,
  useExperienceSkills,
  useFetchAllApplicationData,
  useJob,
  useSkills,
  useJobApplicationSteps,
  useTouchApplicationStep,
} from "../../../hooks/applicationHooks";

interface SkillsPageProps {
  applicationId: number;
}

export const SkillsPage: React.FunctionComponent<SkillsPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  // Fetch all un-loaded data that may be required for the Application.
  const { experiencesLoaded, skillsLoaded } = useFetchAllApplicationData(
    applicationId,
    dispatch,
  );

  const application = useApplication(applicationId);
  const jobId = application?.job_poster_id;
  const job = useJob(jobId);
  const criteria = useCriteria(jobId);
  const experiences = useExperiences(applicationId, application);
  const experienceSkills = useExperienceSkills(
    applicationId,
    application,
  ).filter((expSkill) =>
    criteria.find((criterion) => criterion.skill_id === expSkill.skill_id),
  );
  const skills = useSkills();
  const steps = useJobApplicationSteps();

  const stepsAreUpdating = useTouchApplicationStep(
    applicationId,
    "skills",
    dispatch,
  );

  const showLoadingState =
    application === null || job === null || !experiencesLoaded || !skillsLoaded;

  const handleUpdateExpSkill = async (
    expSkill: ExperienceSkill,
  ): Promise<ExperienceSkill> => {
    const result = await dispatch(updateExperienceSkill(expSkill));
    if (!result.error) {
      return result.payload;
    }
    return Promise.reject(result.error);
  };
  const handleBatchUpdateExpSkill = async (
    experienceSkillsToUpdate: ExperienceSkill[],
  ): Promise<void> => {
    const result = await dispatch(
      batchUpdateExperienceSkills(experienceSkillsToUpdate),
    );
    if (!result.error) {
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  };
  const handleDeleteExpSkill = async (
    expSkill: ExperienceSkill,
  ): Promise<void> => {
    const result = await dispatch(
      deleteExperienceSkill(
        expSkill.id,
        expSkill.experience_id,
        expSkill.experience_type,
      ),
    );
    if (!result.error) {
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  };
  const closeDate = job?.close_date_time ?? null;

  const handleReturn = (): void => {
    navigate(applicationExperience(locale, applicationId));
  };
  const handleQuit = (): void => {
    // Because the Applications Index is outside of the Application SPA, we navigate to it differently.
    window.location.href = applicationIndex(locale);
  };
  const handleContinue = async (): Promise<void> => {
    navigate(applicationFit(locale, applicationId));
  };

  return (
    <>
      {application && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.step03)}
          steps={makeProgressBarSteps(
            applicationId,
            steps,
            intl,
            "skills",
            stepsAreUpdating,
          )}
        />
      )}
      {showLoadingState && (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(3)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      )}
      {!showLoadingState && (
        <Skills
          criteria={criteria}
          experiences={experiences}
          experienceSkills={experienceSkills}
          skills={skills}
          handleUpdateExperienceJustification={handleUpdateExpSkill}
          handleBatchUpdateExperienceSkills={handleBatchUpdateExpSkill}
          handleRemoveExperienceJustification={handleDeleteExpSkill}
          handleContinue={handleContinue}
          handleReturn={handleReturn}
          handleQuit={handleQuit}
        />
      )}
    </>
  );
};

export default SkillsPage;
