import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { EducationType } from "../../models/types";
import {
  getEducationTypesEndpoint,
  parseEducationTypesResponse,
} from "../../api/educationType";

export const GET_EDUCATION_TYPES_STARTED = "EDUCATION_TYPES: GET STARTED";
export const GET_EDUCATION_TYPES_SUCCEEDED = "EDUCATION_TYPES: GET SUCCEEDED";
export const GET_EDUCATION_TYPES_FAILED = "EDUCATION_TYPES: GET FAILED";

export type GetEducationTypesAction = AsyncFsaActions<
  typeof GET_EDUCATION_TYPES_STARTED,
  typeof GET_EDUCATION_TYPES_SUCCEEDED,
  typeof GET_EDUCATION_TYPES_FAILED,
  EducationType[],
  {}
>;

export const getEducationTypes = (): RSAActionTemplate<
  typeof GET_EDUCATION_TYPES_STARTED,
  typeof GET_EDUCATION_TYPES_SUCCEEDED,
  typeof GET_EDUCATION_TYPES_FAILED,
  EducationType[],
  {}
> =>
  asyncGet(
    getEducationTypesEndpoint(),
    GET_EDUCATION_TYPES_STARTED,
    GET_EDUCATION_TYPES_SUCCEEDED,
    GET_EDUCATION_TYPES_FAILED,
    parseEducationTypesResponse,
    {},
  );

export type EducationTypeAction = GetEducationTypesAction;
