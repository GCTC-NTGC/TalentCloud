import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { Classification } from "../../models/types";
import {
  getClassificationsEndpoint,
  parseClassificationsResponse,
} from "../../api/classification";

export const GET_CLASSIFICATIONS_STARTED = "CLASSIFICATION: GET STARTED";
export const GET_CLASSIFICATIONS_SUCCEEDED = "CLASSIFICATION: GET SUCCEEDED";
export const GET_CLASSIFICATIONS_FAILED = "CLASSIFICATION: GET FAILED";

export type GetClassificationAction = AsyncFsaActions<
  typeof GET_CLASSIFICATIONS_STARTED,
  typeof GET_CLASSIFICATIONS_SUCCEEDED,
  typeof GET_CLASSIFICATIONS_FAILED,
  Classification[],
  {}
>;

// Call to initialize classifications into state
export const getClassifications = (): RSAActionTemplate<
  typeof GET_CLASSIFICATIONS_STARTED,
  typeof GET_CLASSIFICATIONS_SUCCEEDED,
  typeof GET_CLASSIFICATIONS_FAILED,
  Classification[],
  {}
> =>
  asyncGet(
    getClassificationsEndpoint(),
    GET_CLASSIFICATIONS_STARTED,
    GET_CLASSIFICATIONS_SUCCEEDED,
    GET_CLASSIFICATIONS_FAILED,
    parseClassificationsResponse,
    {},
  );

export type ClassificationAction = GetClassificationAction;
