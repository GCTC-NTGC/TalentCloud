import { baseUrl } from "./base";
import { AwardRecognitionType } from "../models/types";

// TODO: verify schema
export const parseAwardRecognitionTypesResponse = (
  data: any,
): AwardRecognitionType[] => data;

export const getAwardRecognitionTypesEndpoint = (): string =>
  `${baseUrl()}/award-recognition-types`;
