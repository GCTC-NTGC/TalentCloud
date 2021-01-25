import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { AwardRecognitionType } from "../../models/types";
import {
  getAwardRecognitionTypesEndpoint,
  parseAwardRecognitionTypesResponse,
} from "../../api/awardRecognitionType";

export const GET_AWARD_RECOGNITION_TYPES_STARTED =
  "AWARD_RECOGNITION_TYPES: GET STARTED";
export const GET_AWARD_RECOGNITION_TYPES_SUCCEEDED =
  "AWARD_RECOGNITION_TYPES: GET SUCCEEDED";
export const GET_AWARD_RECOGNITION_TYPES_FAILED =
  "AWARD_RECOGNITION_TYPES: GET FAILED";

export type GetAwardRecognitionTypesAction = AsyncFsaActions<
  typeof GET_AWARD_RECOGNITION_TYPES_STARTED,
  typeof GET_AWARD_RECOGNITION_TYPES_SUCCEEDED,
  typeof GET_AWARD_RECOGNITION_TYPES_FAILED,
  AwardRecognitionType[],
  {}
>;

export const getAwardRecognitionTypes = (): RSAActionTemplate<
  typeof GET_AWARD_RECOGNITION_TYPES_STARTED,
  typeof GET_AWARD_RECOGNITION_TYPES_SUCCEEDED,
  typeof GET_AWARD_RECOGNITION_TYPES_FAILED,
  AwardRecognitionType[],
  {}
> =>
  asyncGet(
    getAwardRecognitionTypesEndpoint(),
    GET_AWARD_RECOGNITION_TYPES_STARTED,
    GET_AWARD_RECOGNITION_TYPES_SUCCEEDED,
    GET_AWARD_RECOGNITION_TYPES_FAILED,
    parseAwardRecognitionTypesResponse,
    {},
  );

export type AwardRecognitionTypeAction = GetAwardRecognitionTypesAction;
