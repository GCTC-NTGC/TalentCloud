import { baseUrl } from "./base";
import { EducationType } from "../models/types";

// TODO: verify schema
export const parseEducationTypesResponse = (data: any): EducationType[] => data;

export const getEducationTypesEndpoint = (): string =>
  `${baseUrl()}/education-types`;
