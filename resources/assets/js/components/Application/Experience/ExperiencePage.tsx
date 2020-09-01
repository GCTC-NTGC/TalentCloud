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
  getExperienceByApplicant,
  getUpdatingByApplicant,
  getUpdatingByApplication,
} from "../../../store/Experience/experienceSelector";
import {
  fetchExperienceByApplication,
  fetchExperienceByApplicant,
} from "../../../store/Experience/experienceActions";
import { ApplicationStatusId } from "../../../models/lookupConstants";

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
  const applicationIsUpdating = useSelector((state: RootState) =>
    applicationIsUpdating(state, { applicationId }),
  );
  useEffect(() => {
    if (application === null && !applicationIsUpdating) {
      dispatch(fetchApplication(applicationId));
    }
  }, [application, applicationId, applicationIsUpdating, dispatch]);

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

  const applicantId = application?.applicant_id ?? 0;

  // When an Application is still a draft, use Experiences associated with the applicant profile.
  // When an Application has been submitted and is no longer a draft, display Experience associated with the Application directly.
  const useProfileExperience =
    application === null ||
    application.application_status_id === ApplicationStatusId.draft;

  // This selector must be memoized because getExperienceByApplicant/Application uses reselect, and not re-reselect.
  const experienceSelector = useCallback(
    (state: RootState) =>
      useProfileExperience
        ? getExperienceByApplicant(state, { applicantId })
        : getExperienceByApplication(state, { applicationId }),
    [applicationId, applicantId, useProfileExperience],
  );
  const experiencesByType = useSelector(experienceSelector);
  const experiences: ExperienceType[] = [
    ...experiencesByType.award,
    ...experiencesByType.community,
    ...experiencesByType.education,
    ...experiencesByType.personal,
    ...experiencesByType.work,
  ];
  const experiencesUpdating = useSelector((state: RootState) =>
    useProfileExperience
      ? getUpdatingByApplicant(state, { applicantId })
      : getUpdatingByApplication(state, { applicationId }),
  );
  useEffect(() => {
    if (experiences.length === 0 && !experiencesUpdating) {
      if (useProfileExperience) {
        if (applicantId !== 0) {
          dispatch(fetchExperienceByApplicant(applicantId));
        }
      } else {
        dispatch(fetchExperienceByApplication(applicationId));
      }
    }
  }, [
    experiences.length,
    applicantId,
    applicationId,
    experiencesUpdating,
    useProfileExperience,
    dispatch,
  ]);

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
