/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { Job, Criteria, JobPosterKeyTask, Comment } from "../models/types";
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

export const parseTasksResponse = (data: any): JobPosterKeyTask[] => data;

export const parseCriteriaResponse = (data: any): Criteria[] => data;

export const parseCommentResponse = (data: any): Comment => ({
  ...data,
  id: Number(data.id),
  job_poster_id: Number(data.job_poster_id),
  user_id: Number(data.user_id),
  comment: String(data.comment),
  location: String(data.location),
  type_id: Number(data.type_id),
  created_at: parseDate(data.created_at),
});

export const parseCommentsResponse = (data: any): Comment[] =>
  data.map((commentData: any): Comment => parseCommentResponse(commentData));

export const getJobEndpoint = (id: number | null): string =>
  id ? `${baseUrl()}/jobs/${id}` : `${baseUrl()}/jobs`;

export const getSubmitJobEndpoint = (id: number): string =>
  `${getJobEndpoint(id)}/submit`;

export const getTasksEndpoint = (jobId: number): string =>
  `${getJobEndpoint(jobId)}/tasks`;

export const getCriteriaEndpoint = (jobId: number): string =>
  `${getJobEndpoint(jobId)}/criteria`;

export const getCommentEndpoint = (jobId: number): string =>
  `${baseUrl()}/jobs/${jobId}/comments`;
