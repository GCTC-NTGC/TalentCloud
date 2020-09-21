/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getLocale } from "../../../helpers/localize";
import { applicationExperience } from "../../../helpers/routes";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { navigate } from "../../../helpers/router";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ExperienceIntro from "./ExperienceIntro";
import { DispatchType } from "../../../configureStore";
import { RootState } from "../../../store/store";
import { fetchSkills } from "../../../store/Skill/skillActions";
import { getAwardRecipientTypes as fetchAwardRecipientTypes } from "../../../store/AwardRecipientType/awardRecipientTypeActions";
import { getAwardRecipientTypes } from "../../../store/AwardRecipientType/awardRecipientTypeSelector";
import { getAwardRecognitionTypes as fetchAwardRecognitionTypes } from "../../../store/AwardRecognitionType/awardRecognitionTypeActions";
import { getAwardRecognitionTypes } from "../../../store/AwardRecognitionType/awardRecognitionTypeSelector";
import { getEducationTypes as fetchEducationTypes } from "../../../store/EducationType/educationTypeActions";
import { getEducationTypes } from "../../../store/EducationType/educationTypeSelector";
import { getEducationStatuses as fetchEducationStatuses } from "../../../store/EducationStatus/educationStatusActions";
import { getEducationStatuses } from "../../../store/EducationStatus/educationStatusSelector";
import { loadingMessages } from "../applicationMessages";
import {
  getApplicationById,
  getApplicationIsUpdating,
} from "../../../store/Application/applicationSelector";
import { fetchApplication } from "../../../store/Application/applicationActions";
import { getJob, getJobIsUpdating } from "../../../store/Job/jobSelector";
import { fetchJob } from "../../../store/Job/jobActions";
import { ApplicationStatusId } from "../../../models/lookupConstants";
import {
  getExperienceByApplicant,
  getExperienceByApplication,
  getUpdatingByApplicant,
  getUpdatingByApplication,
} from "../../../store/Experience/experienceSelector";
import {
  fetchExperienceByApplicant,
  fetchExperienceByApplication,
} from "../../../store/Experience/experienceActions";
import {
  getSkills,
  getSkillsUpdating,
} from "../../../store/Skill/skillSelector";
import { Experience as ExperienceType } from "../../../models/types";

interface ExperienceIntroPageProps {
  applicationId: number;
}

export const ExperienceIntroPage: React.FunctionComponent<ExperienceIntroPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  // Begin fetching all the data which will be used on the Experience page.
  const dispatch = useDispatch<DispatchType>();

  const awardRecipientTypes = useSelector(getAwardRecipientTypes);
  const awardRecipientTypesLoading = useSelector(
    (state: RootState) => state.awardRecipientType.loading,
  );
  useEffect(() => {
    if (awardRecipientTypes.length === 0 && !awardRecipientTypesLoading) {
      dispatch(fetchAwardRecipientTypes());
    }
  }, [awardRecipientTypes, awardRecipientTypesLoading, dispatch]);

  const awardRecognitionTypes = useSelector(getAwardRecognitionTypes);
  const awardRecognitionTypesLoading = useSelector(
    (state: RootState) => state.awardRecognitionType.loading,
  );
  useEffect(() => {
    if (awardRecognitionTypes.length === 0 && !awardRecognitionTypesLoading) {
      dispatch(fetchAwardRecognitionTypes());
    }
  }, [awardRecognitionTypes, awardRecognitionTypesLoading, dispatch]);

  const educationTypes = useSelector(getEducationTypes);
  const educationTypesLoading = useSelector(
    (state: RootState) => state.educationType.loading,
  );
  useEffect(() => {
    if (educationTypes.length === 0 && !educationTypesLoading) {
      dispatch(fetchEducationTypes());
    }
  }, [educationTypes, educationTypesLoading, dispatch]);

  const educationStatuses = useSelector(getEducationStatuses);
  const educationStatusesLoading = useSelector(
    (state: RootState) => state.educationStatus.loading,
  );
  useEffect(() => {
    if (educationStatuses.length === 0 && !educationStatusesLoading) {
      dispatch(fetchEducationStatuses());
    }
  }, [educationStatuses, educationStatusesLoading, dispatch]);

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
      if (useProfileExperience) {
        dispatch(fetchExperienceByApplicant(applicantId));
      } else {
        dispatch(fetchExperienceByApplication(applicationId));
      }
      setExperiencesFetched(true);
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

  const skills = useSelector(getSkills);
  const skillsUpdating = useSelector(getSkillsUpdating);
  useEffect(() => {
    if (skills.length === 0 && !skillsUpdating) {
      dispatch(fetchSkills());
    }
  }, [skills.length, skillsUpdating, dispatch]);

  const handleStart = (): void =>
    navigate(applicationExperience(locale, applicationId));
  const closeDate = job?.close_date_time ?? null;
  return application === null ? (
    <h2
      data-c-heading="h2"
      data-c-align="center"
      data-c-padding="top(2) bottom(2)"
    >
      {intl.formatMessage(loadingMessages.loading)}
    </h2>
  ) : (
    <>
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
      <ExperienceIntro handleStart={handleStart} />
    </>
  );
};

export default ExperienceIntroPage;
