import { baseUrl } from "./base";

export const getJobPosterStatusEndpoint = (): string =>
         `${baseUrl()}/job-poster-statuses`;
