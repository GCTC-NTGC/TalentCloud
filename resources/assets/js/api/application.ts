import { Application, ApplicationReview } from "../models/types";
import { baseUrl } from "./base";

export const parseApplication = (data: any): Application => data;
export const parseApplicationReview = (data: any): ApplicationReview => data;
export const parseApplicationsForJob = (data: any): Application[] =>
  data.map(parseApplication);

export const getApplicationEndpoint = (id: number): string =>
  `${baseUrl(2)}/applications/${id}`;

export const getApplicationReviewEndpoint = (applicationId: number): string =>
  `${getApplicationEndpoint(applicationId)}/review`;

export const getApplicationsForJobEndpoint = (jobId: number): string =>
  `${baseUrl(2)}/jobs/${jobId}/applications`;
