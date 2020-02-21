/* eslint-disable @typescript-eslint/camelcase, camelcase */
import { MessageDescriptor } from "react-intl";
import {
  Job,
  JobPosterKeyTask,
  Criteria,
  Skill,
  Comment,
} from "./types";
import {
  CriteriaTypeId,
  getKeyByValue,
  ClassificationId,
  JobStatus,
  enumToIds,
  LocationId,
} from "./lookupConstants";
import { assetSkillName, skillLevelName } from "./localizedConstants";
import {
  jobBuilderDetails,
  jobBuilderEnv,
  jobBuilderImpact,
  jobBuilderSkills,
  jobBuilderReview,
  hrJobReview,
  hrScreeningPlan,
  managerScreeningPlan,
  hrJobSummary,
  hrJobPreview,
  jobBuilderTasks,
  managerJobShow,
  hrJobApplications,
  managerJobApplications,
} from "../helpers/routes";
import { hasKey } from "../helpers/queries";

const pad = (n: number, width: number, z = "0"): string => {
  return (String(z).repeat(width) + String(n)).slice(String(n).length);
};

export const classificationString = (job: Job): string => {
  return job.classification_id && job.classification_level
    ? `${getKeyByValue(ClassificationId, job.classification_id)}-${pad(
        job.classification_level,
        2,
      )}`
    : "";
};

export const emptyJob = (): Job => {
  return {
    id: 0,
    manager_id: 0,
    chosen_lang: null,
    term_qty: null,
    open_date_time: null,
    close_date_time: null,
    start_date_time: null,
    department_id: null,
    job_poster_status_id: JobStatus.Draft,
    province_id: null,
    salary_min: null,
    salary_max: null,
    noc: null,
    classification_id: null,
    classification_level: null,
    security_clearance_id: null,
    language_requirement_id: null,
    remote_work_allowed: true,
    review_requested_at: null,
    team_size: null,
    work_env_features: null,
    fast_vs_steady: null,
    horizontal_vs_vertical: null,
    experimental_vs_ongoing: null,
    citizen_facing_vs_back_office: null,
    collaborative_vs_independent: null,
    telework_allowed_frequency_id: null,
    flexible_hours_frequency_id: null,
    travel_requirement_id: null,
    overtime_requirement_id: null,
    created_at: new Date(),
    city: {
      en: "",
      fr: "",
    },
    title: {
      en: "",
      fr: "",
    },
    dept_impact: {
      en: "",
      fr: "",
    },
    team_impact: {
      en: "",
      fr: "",
    },
    hire_impact: {
      en: "",
      fr: "",
    },
    division: {
      en: "",
      fr: "",
    },
    education: {
      en: "",
      fr: "",
    },
    work_env_description: {
      en: "",
      fr: "",
    },
    culture_summary: {
      en: "",
      fr: "",
    },
    culture_special: {
      en: "",
      fr: "",
    },
  };
};

export const emptyTasks = (): JobPosterKeyTask[] => [
  {
    id: 0,
    job_poster_id: 0,
    description: {
      en: "",
      fr: "",
    },
  },
];

export const getSkillLevelName = (
  { skill_level_id, criteria_type_id }: Criteria,
  { skill_type_id }: Skill,
): MessageDescriptor => {
  if (criteria_type_id === CriteriaTypeId.Asset) {
    return assetSkillName();
  }
  return skillLevelName(skill_level_id, skill_type_id);
};

export const emptyComment = (): Comment => ({
  id: 0,
  job_poster_id: 0,
  user_id: 0,
  comment: "",
  location: "",
  type_id: null,
  created_at: new Date(),
});
// TODO: allow for Complete status.
export const jobStatus = (job: Job): JobStatus => {
  if (enumToIds(JobStatus).includes(job.job_poster_status_id)) {
    return job.job_poster_status_id;
  }
  return JobStatus.Draft;
};

export const activityLocationUrl = (
  isHrAdvisor: boolean,
  location: string,
  jobId: number,
  locale: string,
): string => {
  const hrAdvisorUrls = {
    /* Job Poster Review Page */
    [LocationId.jobGeneric]: hrJobReview(locale, jobId),
    [LocationId.heading]: hrJobReview(locale, jobId),
    [LocationId.basicInfo]: hrJobReview(locale, jobId),
    [LocationId.impact]: hrJobReview(locale, jobId),
    [LocationId.tasks]: hrJobReview(locale, jobId),
    [LocationId.skills]: hrJobReview(locale, jobId),
    [LocationId.langRequirements]: hrJobReview(locale, jobId),
    [LocationId.environment]: hrJobReview(locale, jobId),

    /* Applicant Review Page */
    [LocationId.applicantsGeneric]: hrJobApplications(locale, jobId),
    [LocationId.underConsideration]: hrJobApplications(locale, jobId),
    [LocationId.optionalConsideration]: hrJobApplications(locale, jobId),
    [LocationId.notUnderConsideration]: hrJobApplications(locale, jobId),

    /* Screening Plan Builder */
    [LocationId.screeningPlan]: hrScreeningPlan(locale, jobId),
    [LocationId.screeningPlanBuilder]: hrScreeningPlan(locale, jobId),
    [LocationId.screeningPlanSummary]: hrScreeningPlan(locale, jobId),
    [LocationId.screeningPlanRatings]: hrScreeningPlan(locale, jobId),

    [LocationId.summary]: hrJobSummary(locale, jobId),
    [LocationId.preview]: hrJobPreview(locale, jobId),
  };
  const managerUrls = {
    /* Job Poster Review Page */
    [LocationId.jobGeneric]: jobBuilderReview(locale, jobId),
    [LocationId.heading]: jobBuilderDetails(locale, jobId),
    [LocationId.basicInfo]: jobBuilderDetails(locale, jobId),
    [LocationId.impact]: jobBuilderImpact(locale, jobId),
    [LocationId.tasks]: jobBuilderTasks(locale, jobId),
    [LocationId.skills]: jobBuilderSkills(locale, jobId),
    [LocationId.langRequirements]: jobBuilderDetails(locale, jobId),
    [LocationId.environment]: jobBuilderEnv(locale, jobId),

    /* Applicant Review Page */
    [LocationId.applicantsGeneric]: managerJobApplications(locale, jobId),
    [LocationId.underConsideration]: managerJobApplications(locale, jobId),
    [LocationId.optionalConsideration]: managerJobApplications(locale, jobId),
    [LocationId.notUnderConsideration]: managerJobApplications(locale, jobId),

    /* Screening Plan Builder */
    [LocationId.screeningPlan]: managerScreeningPlan(locale, jobId),
    [LocationId.screeningPlanBuilder]: managerScreeningPlan(locale, jobId),
    [LocationId.screeningPlanSummary]: managerScreeningPlan(locale, jobId),
    [LocationId.screeningPlanRatings]: managerScreeningPlan(locale, jobId),

    [LocationId.summary]: jobBuilderReview(locale, jobId), // TODO: change to summary page, once managers have it
    [LocationId.preview]: managerJobShow(locale, jobId),
  };
  const urlMap = isHrAdvisor ? hrAdvisorUrls : managerUrls;
  const backupUrl = "/";
  return hasKey(urlMap, location) ? urlMap[location] : backupUrl;
};
