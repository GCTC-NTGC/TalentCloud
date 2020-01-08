/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { Job, Criteria, JobPosterKeyTask } from "../models/types";
import { baseUrl, parseDate } from "./base";

const parseCriterion = (data: any): Criteria => data;

export const parseJob = (data: any): Job => ({
  ...data,
  open_date_time: parseDate(data.open_date_time),
  close_date_time: parseDate(data.close_date_time),
  start_date_time: parseDate(data.start_date_time),
  published_at: parseDate(data.published_at),
  review_requested_at: parseDate(data.published_at),
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

export const parseJobIndexResponse = (
  data: any,
): {jobs: Job[]} => {
  return {
    jobs: data.map(parseJob)
  }
}

export const parseTasksResponse = (data: any): JobPosterKeyTask[] => data;

export const parseCriteriaResponse = (data: any): Criteria[] => data;

export const getJobEndpoint = (id: number | null): string =>
  id ? `${baseUrl()}/jobs/${id}` : `${baseUrl()}/jobs`;

export const getSubmitJobEndpoint = (id: number): string =>
  `${getJobEndpoint(id)}/submit`;

export const getTasksEndpoint = (jobId: number): string =>
  `${getJobEndpoint(jobId)}/tasks`;

export const getCriteriaEndpoint = (jobId: number): string =>
  `${getJobEndpoint(jobId)}/criteria`;
