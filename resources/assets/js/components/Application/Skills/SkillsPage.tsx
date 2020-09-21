/* eslint-disable camelcase */
import React, { useEffect, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { ExperienceSkill, Experience } from "../../../models/types";
import { navigate } from "../../../helpers/router";
import {
  applicationFit,
  applicationIndex,
  applicationExperience,
} from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";
import { DispatchType } from "../../../configureStore";
import { RootState } from "../../../store/store";
import {
  getApplicationById,
  getApplicationIsUpdating,
} from "../../../store/Application/applicationSelector";
import { fetchApplication } from "../../../store/Application/applicationActions";
import {
  getJob,
  getJobIsUpdating,
  getCriteriaByJob,
} from "../../../store/Job/jobSelector";
import { fetchJob } from "../../../store/Job/jobActions";
import {
  getExperienceByApplicant,
  getExperienceByApplication,
  getUpdatingByApplicant,
  getUpdatingByApplication,
  getExperienceSkillsByApplication,
  getExperienceSkillsByApplicant,
} from "../../../store/Experience/experienceSelector";
import {
  fetchExperienceByApplicant,
  fetchExperienceByApplication,
  updateExperienceSkill,
  deleteExperienceSkill,
} from "../../../store/Experience/experienceActions";
import { ApplicationStatusId } from "../../../models/lookupConstants";
import Skills from "./Skills";
import {
  getSkills,
  getSkillsUpdating,
} from "../../../store/Skill/skillSelector";
import { fetchSkills } from "../../../store/Skill/skillActions";
import { loadingMessages } from "../applicationMessages";

interface SkillsPageProps {
  applicationId: number;
}

export const SkillsPage: React.FunctionComponent<SkillsPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  const applicationSelector = (state: RootState) =>
    getApplicationById(state, { id: applicationId });
  const application = useSelector(applicationSelector);
  const applicationIsUpdating = useSelector((state: RootState) =>
    getApplicationIsUpdating(state, { applicationId }),
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
  const applicationLoaded = application !== null;
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
  const experiences: Experience[] = [
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
  const [experiencesFetched, setExperiencesFetched] = useState(false);
  useEffect(() => {
    // Only load experiences if they have never been fetched by this component (!experiencesFetched),
    //  have never been fetched by another component (length === 0),
    //  and are not currently being fetched (!experiencesUpdating).
    // Also, wait until application has been loaded so the correct source can be determined.
    if (
      applicationLoaded &&
      !experiencesFetched &&
      !experiencesUpdating &&
      experiences.length === 0
    ) {
      setExperiencesFetched(true);
      if (useProfileExperience) {
        dispatch(fetchExperienceByApplicant(applicantId));
      } else {
        dispatch(fetchExperienceByApplication(applicationId));
      }
    }
  }, [
    applicantId,
    applicationId,
    applicationLoaded,
    dispatch,
    experiences.length,
    experiencesFetched,
    experiencesUpdating,
    useProfileExperience,
  ]);

  const expSkillSelector = (state: RootState) =>
    useProfileExperience
      ? getExperienceSkillsByApplicant(state, { applicantId })
      : getExperienceSkillsByApplication(state, { applicationId });
  const experienceSkills = useSelector(expSkillSelector);

  const skills = useSelector(getSkills);
  const skillsUpdating = useSelector(getSkillsUpdating);
  useEffect(() => {
    if (skills.length === 0 && !skillsUpdating) {
      dispatch(fetchSkills());
    }
  }, [skills.length, skillsUpdating, dispatch]);

  const showLoadingState =
    application === null ||
    job === null ||
    experiencesUpdating ||
    skills.length === 0;

  const handleUpdateExpSkill = async (
    expSkill: ExperienceSkill,
  ): Promise<ExperienceSkill> => {
    const result = await dispatch(updateExperienceSkill(expSkill));
    if (!result.error) {
      return result.payload;
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
  const handleContinue = (): void => {
    navigate(applicationFit(locale, applicationId));
  };

  return (
    <>
      {application && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.step01)}
          steps={makeProgressBarSteps(
            applicationId,
            application,
            intl,
            "skills",
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
