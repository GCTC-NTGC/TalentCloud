/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DispatchType } from "../configureStore";
import { RootState } from "../store/store";
import { getAwardRecipientTypes as fetchAwardRecipientTypes } from "../store/AwardRecipientType/awardRecipientTypeActions";
import { getAwardRecipientTypes } from "../store/AwardRecipientType/awardRecipientTypeSelector";
import { getAwardRecognitionTypes as fetchAwardRecognitionTypes } from "../store/AwardRecognitionType/awardRecognitionTypeActions";
import { getAwardRecognitionTypes } from "../store/AwardRecognitionType/awardRecognitionTypeSelector";
import { getEducationTypes as fetchEducationTypes } from "../store/EducationType/educationTypeActions";
import { getEducationTypes } from "../store/EducationType/educationTypeSelector";
import { getEducationStatuses as fetchEducationStatuses } from "../store/EducationStatus/educationStatusActions";
import { getEducationStatuses } from "../store/EducationStatus/educationStatusSelector";
import {
  AwardRecipientType,
  AwardRecognitionType,
  EducationType,
  EducationStatus,
  Job,
  Experience as ExperienceType,
  Skill,
  ExperienceSkill,
  ApplicationNormalized,
  Criteria,
  JobPosterQuestion,
  JobApplicationAnswer,
  Application,
  User,
} from "../models/types";
import {
  getApplicationById,
  getApplicationIsUpdating,
  getApplicationNormalized,
  getJobApplicationAnswers,
} from "../store/Application/applicationSelector";
import {
  fetchApplication,
  fetchApplicationNormalized,
} from "../store/Application/applicationActions";
import {
  getCriteriaByJob,
  getJob,
  getJobIsUpdating,
  getJobPosterQuestionsByJob,
} from "../store/Job/jobSelector";
import { fetchJob } from "../store/Job/jobActions";
import { ApplicationStatusId } from "../models/lookupConstants";
import {
  getExperienceByApplicant,
  getExperienceByApplication,
  getExperienceSkillsByApplicant,
  getExperienceSkillsByApplication,
  getUpdatingByApplicant,
  getUpdatingByApplication,
} from "../store/Experience/experienceSelector";
import {
  fetchExperienceByApplicant,
  fetchExperienceByApplication,
} from "../store/Experience/experienceActions";
import { getSkills, getSkillsUpdating } from "../store/Skill/skillSelector";
import { fetchSkills } from "../store/Skill/skillActions";
import { getUserById } from "../store/User/userSelector";
import { fetchUser } from "../store/User/userActions";

export function useUser(userId: number | undefined): User | null {
  return useSelector((state: RootState) =>
    userId ? getUserById(state, { userId }) : null,
  );
}
export function useApplication(
  applicationId: number,
): ApplicationNormalized | null {
  return useSelector((state: RootState) =>
    getApplicationNormalized(state, { applicationId }),
  );
}

export function useReviewedApplication(
  applicationId: number,
): Application | null {
  return useSelector((state: RootState) =>
    getApplicationById(state, { id: applicationId }),
  );
}

export function useJob(jobId: number | undefined): Job | null {
  return useSelector((state: RootState) =>
    jobId ? getJob(state, { jobId }) : null,
  );
}

export function useExperienceConstants(): {
  awardRecipientTypes: AwardRecipientType[];
  awardRecognitionTypes: AwardRecognitionType[];
  educationTypes: EducationType[];
  educationStatuses: EducationStatus[];
} {
  const awardRecipientTypes = useSelector(getAwardRecipientTypes);
  const awardRecognitionTypes = useSelector(getAwardRecognitionTypes);
  const educationTypes = useSelector(getEducationTypes);
  const educationStatuses = useSelector(getEducationStatuses);
  return {
    awardRecipientTypes,
    awardRecognitionTypes,
    educationTypes,
    educationStatuses,
  };
}

export function useSkills(): Skill[] {
  return useSelector(getSkills);
}

export function useCriteria(jobId: number | undefined): Criteria[] {
  return useSelector((state: RootState) =>
    jobId ? getCriteriaByJob(state, { jobId }) : [],
  );
}

export function useExperiences(
  applicationId: number,
  application: ApplicationNormalized | null,
): ExperienceType[] {
  const applicantId = application?.applicant_id ?? 0;

  // When an Application is still a draft, use Experiences associated with the applicant profile.
  // When an Application has been submitted and is no longer a draft, display Experience associated with the Application directly.
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
  return experiences;
}

export function useExperienceSkills(
  applicationId: number,
  application: ApplicationNormalized | null,
): ExperienceSkill[] {
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

export function useJobPosterQuestions(
  jobId: number | undefined,
): JobPosterQuestion[] {
  return useSelector((state: RootState) =>
    jobId ? getJobPosterQuestionsByJob(state, { jobId }) : [],
  );
}

export function useJobApplicationAnswers(
  applicationId: number,
): JobApplicationAnswer[] {
  return useSelector((state: RootState) =>
    getJobApplicationAnswers(state, { applicationId }),
  );
}

/**
 * Return all skills from the redux store, and fetch the skills from backend if they are not yet in the store.
 * @param dispatch
 */
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

/**
 * Return all Experience constants from the redux store, and fetch them from backend if they are not yet in the store.
 * @param dispatch
 */
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

/**
 * Return an Application (normalized, ie without Review) from the redux store, and fetch it from backend if it is not yet in the store.
 * @param applicationId
 * @param dispatch
 */
export function useFetchNormalizedApplication(
  applicationId: number,
  dispatch: DispatchType,
): ApplicationNormalized | null {
  const applicationSelector = (
    state: RootState,
  ): ApplicationNormalized | null =>
    getApplicationNormalized(state, { applicationId });
  const application: ApplicationNormalized | null = useSelector(
    applicationSelector,
  );
  const applicationIsUpdating = useSelector((state: RootState) =>
    getApplicationIsUpdating(state, { applicationId }),
  );
  useEffect(() => {
    if (application === null && !applicationIsUpdating) {
      dispatch(fetchApplicationNormalized(applicationId));
    }
  }, [application, applicationId, applicationIsUpdating, dispatch]);
  return application;
}

/**
 * Return an Application from the redux store, and fetch it from backend if it is not yet in the store.
 * @param applicationId
 * @param dispatch
 */
export function useFetchApplication(
  applicationId: number,
  dispatch: DispatchType,
): Application | null {
  const applicationSelector = (state: RootState): Application | null =>
    getApplicationById(state, { id: applicationId });
  const application: Application | null = useSelector(applicationSelector);
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

/**
 * Return an Job from the redux store, and fetch it from backend if it is not yet in the store.
 * @param jobId
 * @param dispatch
 */
export function useFetchJob(
  jobId: number | undefined,
  dispatch: DispatchType,
): Job | null {
  const job = useJob(jobId);
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

/**
 * Return all Experience relavant to an Application from the redux store, and fetch it from backend if it is not yet in the store.
 * @param applicationId
 * @param application
 * @param dispatch
 */
export function useFetchExperience(
  applicationId: number,
  application: ApplicationNormalized | null,
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

  const experiences = useExperiences(applicationId, application);
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
 * Return an User from the redux store, and fetch it from backend if it is not yet in the store.
 * @param jobId
 * @param dispatch
 */
export function useFetchUser(
  userId: number,
  dispatch: DispatchType,
): User | null {
  const user = useUser(userId);
  useEffect(() => {
    // If job is null and not already updating, fetch it.
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId, dispatch]);
  return user;
}

/**
 * Trigger fetches for all data needed for the Application process which is not yet in the redux store, or in the process of loading.
 * @param applicationId
 */
export function useFetchAllApplicationData(
  applicationId: number,
  dispatch: DispatchType,
): {
  applicationLoaded: boolean;
  jobLoaded: boolean;
  experiencesLoaded: boolean;
  experienceConstantsLoaded: boolean;
  skillsLoaded: boolean;
} {
  const application = useFetchNormalizedApplication(applicationId, dispatch);
  const jobId = application?.job_poster_id;
  const job = useFetchJob(jobId, dispatch);
  const { experiences, experiencesUpdating } = useFetchExperience(
    applicationId,
    application,
    dispatch,
  );
  const {
    awardRecipientTypes,
    awardRecognitionTypes,
    educationTypes,
    educationStatuses,
  } = useFetchExperienceConstants(dispatch);
  const skills = useFetchSkills(dispatch);

  return {
    applicationLoaded: application !== null,
    jobLoaded: job !== null,
    experiencesLoaded: !experiencesUpdating || experiences.length > 0,
    experienceConstantsLoaded:
      awardRecipientTypes.length > 0 &&
      awardRecognitionTypes.length > 0 &&
      educationTypes.length > 0 &&
      educationStatuses.length > 0,
    skillsLoaded: skills.length > 0,
  };
}

/**
 * Trigger fetches for all data needed for the Application review process which is not yet in the redux store, or in the process of loading.
 * @param applicationId
 */
export function useFetchReviewApplicationData(
  applicantUserId: number,
  applicationId: number,
  jobId: number,
  dispatch: DispatchType,
): {
  applicationLoaded: boolean;
  jobLoaded: boolean;
  experiencesLoaded: boolean;
  experienceConstantsLoaded: boolean;
  skillsLoaded: boolean;
  userLoaded: boolean;
} {
  const application = useFetchApplication(applicationId, dispatch);
  const job = useFetchJob(jobId, dispatch);
  const { experiences, experiencesUpdating } = useFetchExperience(
    applicationId,
    application,
    dispatch,
  );
  const {
    awardRecipientTypes,
    awardRecognitionTypes,
    educationTypes,
    educationStatuses,
  } = useFetchExperienceConstants(dispatch);
  const skills = useFetchSkills(dispatch);
  const applicantUser = useFetchUser(applicantUserId, dispatch);

  return {
    applicationLoaded: application !== null,
    jobLoaded: job !== null,
    experiencesLoaded: !experiencesUpdating || experiences.length > 0,
    experienceConstantsLoaded:
      awardRecipientTypes.length > 0 &&
      awardRecognitionTypes.length > 0 &&
      educationTypes.length > 0 &&
      educationStatuses.length > 0,
    skillsLoaded: skills.length > 0,
    userLoaded: applicantUser !== null,
  };
}
