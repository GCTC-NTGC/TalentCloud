import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { AwardRecipientType } from "../../models/types";
import {
  getAwardRecipientTypesEndpoint,
  parseAwardRecipientTypesResponse,
} from "../../api/awardRecipientType";

export const GET_AWARD_RECIPIENT_TYPES_STARTED =
  "AWARD_RECIPIENT_TYPES: GET STARTED";
export const GET_AWARD_RECIPIENT_TYPES_SUCCEEDED =
  "AWARD_RECIPIENT_TYPES: GET SUCCEEDED";
export const GET_AWARD_RECIPIENT_TYPES_FAILED =
  "AWARD_RECIPIENT_TYPES: GET FAILED";

export type GetAwardRecipientTypesAction = AsyncFsaActions<
  typeof GET_AWARD_RECIPIENT_TYPES_STARTED,
  typeof GET_AWARD_RECIPIENT_TYPES_SUCCEEDED,
  typeof GET_AWARD_RECIPIENT_TYPES_FAILED,
  AwardRecipientType[],
  {}
>;

export const getAwardRecipientTypes = (): RSAActionTemplate<
  typeof GET_AWARD_RECIPIENT_TYPES_STARTED,
  typeof GET_AWARD_RECIPIENT_TYPES_SUCCEEDED,
  typeof GET_AWARD_RECIPIENT_TYPES_FAILED,
  AwardRecipientType[],
  {}
> =>
  asyncGet(
    getAwardRecipientTypesEndpoint(),
    GET_AWARD_RECIPIENT_TYPES_STARTED,
    GET_AWARD_RECIPIENT_TYPES_SUCCEEDED,
    GET_AWARD_RECIPIENT_TYPES_FAILED,
    parseAwardRecipientTypesResponse,
    {},
  );

export type AwardRecipientTypeAction = GetAwardRecipientTypesAction;
