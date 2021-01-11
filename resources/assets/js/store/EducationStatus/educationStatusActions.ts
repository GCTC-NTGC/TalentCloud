import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { EducationStatus } from "../../models/types";
import {
  getEducationStatusesEndpoint,
  parseEducationStatusesResponse,
} from "../../api/educationStatus";

export const GET_EDUCATION_STATUSES_STARTED = "EDUCATION_STATUSES: GET STARTED";
export const GET_EDUCATION_STATUSES_SUCCEEDED =
  "EDUCATION_STATUSES: GET SUCCEEDED";
export const GET_EDUCATION_STATUSES_FAILED = "EDUCATION_STATUSES: GET FAILED";

export type GetEducationStatusesAction = AsyncFsaActions<
  typeof GET_EDUCATION_STATUSES_STARTED,
  typeof GET_EDUCATION_STATUSES_SUCCEEDED,
  typeof GET_EDUCATION_STATUSES_FAILED,
  EducationStatus[],
  {}
>;

export const getEducationStatuses = (): RSAActionTemplate<
  typeof GET_EDUCATION_STATUSES_STARTED,
  typeof GET_EDUCATION_STATUSES_SUCCEEDED,
  typeof GET_EDUCATION_STATUSES_FAILED,
  EducationStatus[],
  {}
> =>
  asyncGet(
    getEducationStatusesEndpoint(),
    GET_EDUCATION_STATUSES_STARTED,
    GET_EDUCATION_STATUSES_SUCCEEDED,
    GET_EDUCATION_STATUSES_FAILED,
    parseEducationStatusesResponse,
    {},
  );

export type EducationStatusAction = GetEducationStatusesAction;
