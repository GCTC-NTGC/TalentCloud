/* eslint-disable @typescript-eslint/camelcase, camelcase */
import { MessageDescriptor } from "react-intl";
import {
  Job,
  JobTranslation,
  JobPosterKeyTask,
  Criteria,
  Skill,
} from "./types";
import {
  CriteriaTypeId,
  getKeyByValue,
  ClassificationId,
  JobStatus,
} from "./lookupConstants";
import { assetSkillName, skillLevelName } from "./localizedConstants";
import { JobState } from "../store/Job/jobReducer";

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

const emptyJobTranslation = (): JobTranslation => ({
  city: "",
  title: "",
  dept_impact: "",
  team_impact: "",
  hire_impact: "",
  division: "",
  education: "",
  work_env_description: "",
  culture_summary: "",
  culture_special: "",
});

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
    province_id: null,
    salary_min: null,
    salary_max: null,
    noc: null,
    classification_id: null,
    classification_level: null,
    security_clearance_id: null,
    language_requirement_id: null,
    remote_work_allowed: true,
    published_at: null,
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
    en: emptyJobTranslation(),
    fr: emptyJobTranslation(),
  };
};

export const emptyTasks = (): JobPosterKeyTask[] => [
  {
    id: 0,
    job_poster_id: 0,
    en: {
      description: "",
    },
    fr: {
      description: "",
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

// TODO: allow for Complete status.
export const jobStatus = (job: Job): JobStatus => {
  if (job.review_requested_at === null) {
    return JobStatus.Draft;
  } else if (job.published_at === null) {
    // Review request but not passed
    return JobStatus.Review;
  } else if (job.open_date_time === null || job.open_date_time > new Date()) {
    // Ready to publish, but not open yet
    return JobStatus.Approved;
  } else if (job.close_date_time === null || job.close_date_time > new Date()) {
    // Approved and currently open
    return JobStatus.Published;
  } else {
    // Published and close date has passed
    return JobStatus.Closed;
  }
};
