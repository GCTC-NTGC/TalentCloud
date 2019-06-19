/* eslint-disable @typescript-eslint/camelcase */
import { Job, JobTranslation } from "./types";

const pad = (n: number, width: number, z = "0"): string => {
  return (String(z).repeat(width) + String(n)).slice(String(n).length);
};

export const classificationString = (job: Job): string => {
  return job.classification_code && job.classification_level
    ? `${job.classification_code}-${pad(job.classification_level, 2)}`
    : "";
};

const emptyJobTranslation = (): JobTranslation => ({
  city: "",
  title: "",
  team_impact: "",
  hire_impact: "",
  branch: "",
  division: "",
  education: "",
});

export const emptyJob = (): Job => {
  return {
    id: 0,
    manager_id: 0,
    term_qty: null,
    open_date_time: null,
    close_date_time: null,
    start_date_time: null,
    department_id: null,
    province_id: null,
    salary_min: null,
    salary_max: null,
    noc: null,
    classification_code: null,
    classification_level: null,
    security_clearance_id: null,
    language_requirement_id: null,
    remote_work_allowed: null,
    published_at: null,
    review_requested_at: null,
    en: emptyJobTranslation(),
    fr: emptyJobTranslation(),
  };
};

export default { classificationString };
