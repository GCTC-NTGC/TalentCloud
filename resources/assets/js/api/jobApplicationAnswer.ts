import { ResponseData, baseUrl } from "./base";
import { JobApplicationAnswer } from "../models/types";

export const parseJobApplicationAnswer = (data: any): JobApplicationAnswer =>
  data;

export const getJobApplicationAnswerEndpoint = (
  id: number | null = null,
): string => `${baseUrl()}/job-application-answers/${id ?? ""}`;
