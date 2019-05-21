/* eslint-disable @typescript-eslint/camelcase */
import { Job, JobTranslation, Criteria } from "../models/types";
import { baseUrl, parseDate } from "./base";

const parseJobTranslation = (data: any): JobTranslation => ({
  city: data.city,
  title: data.title,
  impact: data.impact,
  branch: data.branch,
  division: data.division,
  education: data.education,
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

export const parseJobResponse = (
  data: any,
): { job: Job; criteria: Criteria[] } => {
  const job = {
    id: Number(data.id),
    title: data.title,
    classification: data.classification,
    close_date_time: parseDate(data.close_date_time),
    en: parseJobTranslation(data.en),
    fr: parseJobTranslation(data.fr),
  };
  const criteria = data.criteria.map(
    (critData: any): Criteria => parseCriterion(critData),
  );
  return {
    job,
    criteria,
  };
};

export const getJobEndpoint = (id: number): string => `${baseUrl()}/jobs/${id}`;
