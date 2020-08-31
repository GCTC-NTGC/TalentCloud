/* eslint-disable camelcase */
import React, { useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationSkillsIntro,
  applicationBasic,
  applicationIndex,
} from "../../../helpers/routes";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import Experience, { ExperienceSubmitData } from "./Experience";
import { Experience as ExperienceType } from "../../../models/types";
import { getApplicationById } from "../../../store/Application/applicationSelector";
import { RootState } from "../../../store/store";
import { fetchApplication } from "../../../store/Application/applicationActions";
import {
  getJob,
  getJobIsUpdating,
  getCriteriaByJob,
} from "../../../store/Job/jobSelector";
import { fetchJob } from "../../../store/Job/jobActions";
import {
  getExperienceByApplication,
  getExperienceSkillsByApplication,
} from "../../../store/Experience/experienceSelector";
import { fetchExperienceByApplication } from "../../../store/Experience/experienceActions";

interface ExperiencePageProps {
  applicationId: number;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch();

  const applicationSelector = (state: RootState) =>
    getApplicationById(state, { id: applicationId });
  const application = useSelector(applicationSelector);
  useEffect(() => {
    if (application === null) {
      dispatch(fetchApplication(applicationId));
    }
  }, [application, applicationId, dispatch]);

  const jobId = application?.job_poster_id;
  const jobSelector = (state: RootState) =>
    jobId ? getJob(state, { jobId }) : null;
  const job = useSelector(jobSelector);
  const jobUpdatingSelector = (state: RootState) =>
    jobId ? getJobIsUpdating(state, jobId) : false;
  const jobIsUpdating = useSelector(jobUpdatingSelector);
  useEffect(() => {
    // If job is null and not already updating, fetch it.
    if (jobId && job === null && !jobIsUpdating) {
      dispatch(fetchJob(jobId));
    }
  }, [jobId, job, jobIsUpdating, dispatch]);

  const criteriaSelector = (state: RootState) =>
    jobId ? getCriteriaByJob(state, { jobId }) : [];
  const criteria = useSelector(criteriaSelector);

  // This selector must be memoized because getExperienceByApplication uses reselect, and not re-reselect.
  const experienceSelector = useCallback(
    (state: RootState) => getExperienceByApplication(state, { applicationId }),
    [applicationId],
  );
  const experiencesByType = useSelector(experienceSelector);
  useEffect(() => {
    fetchExperienceByApplication(applicationId);
  }, [applicationId]);
  const experiences: ExperienceType[] = [
    ...experiencesByType.award,
    ...experiencesByType.community,
    ...experiencesByType.education,
    ...experiencesByType.personal,
    ...experiencesByType.work,
  ];

  const expSkillSelector = (state: RootState) =>
    getExperienceSkillsByApplication(state, { applicationId });
  const experienceSkills = useSelector(expSkillSelector);

  // TODO: load constants from backend.
  const educationStatuses = [];
  const educationTypes = [];
  const skills = [];
  const recipientTypes = [];
  const recognitionTypes = [];

  const handleSubmit = async (data: ExperienceSubmitData): Promise<void> => {
    console.log(data); // TODO: Save the data.
  };
  const handleDelete = async (
    id: number,
    type: ExperienceType["type"],
  ): Promise<void> => {
    // TODO: Delete the experience.
    console.log(`Delete experience id: ${id}, type: ${type}`);
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
  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.step01)}
        steps={makeProgressBarSteps(
          applicationId,
          application,
          intl,
          "experience",
        )}
      />
      <Experience
        experiences={experiences}
        educationStatuses={educationStatuses}
        educationTypes={educationTypes}
        experienceSkills={experienceSkills}
        criteria={criteria}
        skills={skills}
        jobId={job?.id ?? 1}
        jobClassificationId={job?.classification_id ?? 1}
        recipientTypes={recipientTypes}
        recognitionTypes={recognitionTypes}
        handleSubmitExperience={handleSubmit}
        handleDeleteExperience={handleDelete}
        handleContinue={handleContinue}
        handleReturn={handleReturn}
        handleQuit={handleQuit}
      />
    </>
  );
};

export default ExperiencePage;
