/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { Job, JobTranslation, Criteria } from "../models/types";
import { baseUrl, ApiResponse, ResponseData } from "./base";
import { parseSkill } from "./skill";

const parseJobTranslation = (data: ResponseData): JobTranslation => ({
  city: data.city,
  title: data.title,
  impact: data.impact,
  branch: data.branch,
  division: data.division,
  education: data.education,
});

const parseCriterion = (data: ResponseData): Criteria => ({
  id: Number(data.id),
  criteria_type_id: Number(data.criteria_type_id),
  job_poster_id: Number(data.job_poster_id),
  skill_id: Number(data.skill_id),
  skill_level_id: Number(data.skill_level_id),
  description: data.description,
  en: { description: data.en.description },
  fr: { description: data.fr.description },
  skill: parseSkill(data.skill),
});

export const parseJobResponse = ({
  data,
}: ApiResponse): { job: Job; criteria: Criteria[] } => {
  const job = {
    id: Number(data.id),
    title: data.title,
    classification: data.classification,
    close_date_time: new Date(data.close_date_time),
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

export const getJob = (
  id: number,
): Promise<{ job: Job; criteria: Criteria[] }> => {
  return axios
    .get(getJobEndpoint(id))
    .then(
      (jobResponse: ApiResponse): { job: Job; criteria: Criteria[] } =>
        parseJobResponse(jobResponse),
    );
};

export default { getJob };
