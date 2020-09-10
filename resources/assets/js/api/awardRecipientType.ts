import { baseUrl } from "./base";
import { AwardRecipientType } from "../models/types";

// TODO: verify schema
export const parseAwardRecipientTypesResponse = (
  data: any,
): AwardRecipientType[] => data;

export const getAwardRecipientTypesEndpoint = (): string =>
  `${baseUrl()}/award-recipient-types`;
