/* eslint-disable import/prefer-default-export */
import { baseUrl } from "./base";

export const getJobPosterStatusEndpoint = (): string =>
  `${baseUrl()}/job-poster-statuses`;
