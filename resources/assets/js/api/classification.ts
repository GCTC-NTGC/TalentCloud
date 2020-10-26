import { baseUrl } from "./base";
import { Classification } from "../models/types";

// TODO: verify schema
export const parseClassificationsResponse = (data: any): Classification[] => data;

export const getClassificationsEndpoint = (): string => `${baseUrl(2)}/classifications`;
