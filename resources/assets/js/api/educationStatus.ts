import { baseUrl } from "./base";
import { EducationStatus } from "../models/types";

// TODO: verify schema
export const parseEducationStatusesResponse = (data: any): EducationStatus[] =>
  data;

export const getEducationStatusesEndpoint = (): string =>
  `${baseUrl()}/education-statuses`;
