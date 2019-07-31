import { baseUrl } from "./base";
import { Department } from "../models/types";

// TODO: verify schema
export const parseDepartmentsResponse = (data: any): Department[] => data;

export const getDepartmentsEndpoint = (): string => `${baseUrl()}/departments`;
