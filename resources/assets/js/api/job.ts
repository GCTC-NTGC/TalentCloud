/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { Job, JobTranslation, Criteria } from "../models/types";
import { baseUrl, parseDate } from "./base";

const parseJobTranslation = (data: any): JobTranslation => ({
  city: String(data.city),
  title: String(data.title),
  team_impact: String(data.team_impact),
  hire_impact: String(data.hire_impact),
  branch: String(data.branch),
  division: String(data.division),
  education: String(data.education),
});

const parseCriterion = (data: any): Criteria => ({
  id: Number(data.id),
  criteria_type_id: Number(data.criteria_type_id),
  job_poster_id: Number(data.job_poster_id),
  skill_id: Number(data.skill_id),
  skill_level_id: Number(data.skill_level_id),
  en: { description: data.en.description },
  fr: { description: data.fr.description },
});

export const parseJob = (data: any): Job => ({
  id: Number(data.id),
  manager_id: Number(data.manager_id),
  term_qty: Number(data.term_qty),
  open_date_time: parseDate(data.open_date_time),
  close_date_time: parseDate(data.close_date_time),
  start_date_time: parseDate(data.start_date_time),
  department_id: Number(data.department_id),
  province_id: Number(data.province_id),
  salary_min: Number(data.salary_min),
  salary_max: Number(data.salary_max),
  noc: Number(data.noc),
  classification_code: String(data.classification_code),
  classification_level: Number(data.classification_level),
  security_clearance_id: Number(data.security_clearance_id),
  language_requirement_id: Number(data.language_requirement_id),
  remote_work_allowed: Boolean(data.remote_work_allowed),
  published_at: parseDate(data.published_at),
  review_requested_at: parseDate(data.published_at),
  en: parseJobTranslation(data.en),
  fr: parseJobTranslation(data.fr),
});

export const parseJobResponse = (
  data: any,
): { job: Job; criteria: Criteria[] } => {
  const job: Job = parseJob(data);
  const criteria: Criteria[] = data.criteria.map(
    (critData: any): Criteria => parseCriterion(critData),
  );
  return {
    job,
    criteria,
  };
};

export const getJobEndpoint = (id: number): string => `${baseUrl()}/jobs/${id}`;
