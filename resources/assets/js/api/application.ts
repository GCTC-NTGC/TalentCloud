import { Application } from "../models/types";
import { baseUrl } from "./base";

export const parseApplication = (data: any): Application => data;

export const parseApplicationsForJob = (data: any): Application[] =>
  data.map(parseApplication);

export const getApplicationEndpoint = (id: number): string =>
  `${baseUrl()}/applications/${id}}`;

export const getApplicationsForJobEndpoint = (jobId: number): string =>
  `${baseUrl()}/jobs/${jobId}/applications`;
