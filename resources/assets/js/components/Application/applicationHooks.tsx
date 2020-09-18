/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DispatchType } from "../../configureStore";
import { RootState } from "../../store/store";
import { getAwardRecipientTypes as fetchAwardRecipientTypes } from "../../store/AwardRecipientType/awardRecipientTypeActions";
import { getAwardRecipientTypes } from "../../store/AwardRecipientType/awardRecipientTypeSelector";
import { getAwardRecognitionTypes as fetchAwardRecognitionTypes } from "../../store/AwardRecognitionType/awardRecognitionTypeActions";
import { getAwardRecognitionTypes } from "../../store/AwardRecognitionType/awardRecognitionTypeSelector";
import { getEducationTypes as fetchEducationTypes } from "../../store/EducationType/educationTypeActions";
import { getEducationTypes } from "../../store/EducationType/educationTypeSelector";
import { getEducationStatuses as fetchEducationStatuses } from "../../store/EducationStatus/educationStatusActions";
import { getEducationStatuses } from "../../store/EducationStatus/educationStatusSelector";
import {
  AwardRecipientType,
  AwardRecognitionType,
  EducationType,
  EducationStatus,
  Application,
  Job,
  Experience as ExperienceType,, Skill, ExperienceSkill
} from "../../models/types";
import { RSAActionTemplate } from "../../store/asyncAction";
import {
  getApplicationById,
  getApplicationIsUpdating,
} from "../../store/Application/applicationSelector";
import { fetchApplication } from "../../store/Application/applicationActions";
import { getJob, getJobIsUpdating } from "../../store/Job/jobSelector";
import { fetchJob } from "../../store/Job/jobActions";
import { ApplicationStatusId } from "../../models/lookupConstants";
import {
  getExperienceByApplicant,
  getExperienceByApplication,
  getExperienceSkillsByApplicant,
  getExperienceSkillsByApplication,
  getUpdatingByApplicant,
  getUpdatingByApplication,
} from "../../store/Experience/experienceSelector";
import {
  fetchExperienceByApplicant,
  fetchExperienceByApplication,
} from "../../store/Experience/experienceActions";
import { getSkills, getSkillsUpdating } from "../../store/Skill/skillSelector";
import { fetchSkills } from "../../store/Skill/skillActions";

export function useFetchSkills(dispatch: DispatchType): Skill[] {
  const skills = useSelector(getSkills);
  const skillsUpdating = useSelector(getSkillsUpdating);
  useEffect(() => {
    if (skills.length === 0 && !skillsUpdating) {
      dispatch(fetchSkills());
    }
  }, [skills.length, skillsUpdating, dispatch]);
  return skills;
}

export function useFetchExperienceConstants(
  dispatch: DispatchType,
): {
  awardRecipientTypes: AwardRecipientType[];
  awardRecognitionTypes: AwardRecognitionType[];
  educationTypes: EducationType[];
  educationStatuses: EducationStatus[];
} {
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

  return {
    awardRecipientTypes,
    awardRecognitionTypes,
    educationTypes,
    educationStatuses,
  };
}

export function useFetchApplication(
  applicationId: number,
  dispatch: DispatchType,
): Application | null {
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
  return application;
}

export function useFetchJob(
  jobId: number | undefined,
  dispatch: DispatchType,
): Job | null {
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
  return job;
}

export function useFetchExperience(
  applicationId: number,
  application: Application | null,
  dispatch: DispatchType,
): {
  experiences: ExperienceType[];
  experiencesUpdating: boolean;
  experiencesFetched: boolean;
} {
  const applicantId = application?.applicant_id ?? 0;

  // When an Application is still a draft, use Experiences associated with the applicant profile.
  // When an Application has been submitted and is no longer a draft, display Experience associated with the Application directly.
  const applicationLoaded = application !== null;
  const useProfileExperience =
    application === null ||
    application.application_status_id === ApplicationStatusId.draft;

  // This selector must be memoized because getExperienceByApplicant/Application uses reselect, and not re-reselect, so it needs to preserve its state.
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
  return {
    experiences,
    experiencesUpdating,
    experiencesFetched,
  };
}

/**
 * Unlike most other hooks in this file, this will never trigger any fetches.
 * It is assumed experience skills will be fetched when Experiences are.
 */
export function useExperienceSkills(applicationId: number, application: Application|null): ExperienceSkill[] {
  // ExperienceSkills don't need to be fetched because they are returned in the Experiences API calls.
  const applicantId = application?.applicant_id ?? 0;
  const useProfileExperience =
    application === null ||
    application.application_status_id === ApplicationStatusId.draft;
  const expSkillSelector = (state: RootState) =>
    useProfileExperience
      ? getExperienceSkillsByApplicant(state, { applicantId })
      : getExperienceSkillsByApplication(state, { applicationId });
  const experienceSkills = useSelector(expSkillSelector);
  return experienceSkills;
}
