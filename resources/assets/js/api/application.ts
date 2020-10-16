/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import { ApplicationStep, ProgressBarStatus } from "../models/lookupConstants";
import {
  Application,
  ApplicationNormalized,
  ApplicationReview,
  Email,
  JobApplicationAnswer,
} from "../models/types";
import { baseUrl } from "./base";

export const parseApplication = (data: any): Application => data;
export const parseApplicationNormalized = (data: any): ApplicationNormalized =>
  data;

export const parseApplicationResponse = (
  data: any,
): {
  application: Application;
  jobApplicationAnswers: JobApplicationAnswer[];
  steps: { [step in ApplicationStep]: ProgressBarStatus };
} => {
  const { steps, job_application_answers } = data;
  const application: Application = parseApplication(data);
  const jobApplicationAnswers: JobApplicationAnswer[] = job_application_answers.map(
    (answersData: any): JobApplicationAnswer => answersData,
  );

  return {
    application,
    jobApplicationAnswers,
    steps,
  };
};

export const parseApplicationReview = (data: any): ApplicationReview => data;
export const parseApplicationsForJob = (data: any): Application[] =>
  data.map(parseApplication);

export interface ReferenceEmailResponse {
  director: Email;
  secondary: Email;
}
export const parseReferenceEmails = (data: any): ReferenceEmailResponse => data;
export const parseSingleReferenceEmail = (data: any): Email => data;

export const parseApplicationStep = (
  data: any,
): { [step in ApplicationStep]: ProgressBarStatus } => data;

export const getApplicationEndpoint = (id: number): string =>
  `${baseUrl(2)}/applications/${id}`;

export const getApplicationBasicEndpoint = (applicationId: number): string =>
  `${getApplicationEndpoint(applicationId)}/basic`;

export const getApplicationReviewEndpoint = (applicationId: number): string =>
  `${getApplicationEndpoint(applicationId)}/review`;

export const getApplicationsForJobEndpoint = (jobId: number): string =>
  `${baseUrl(2)}/jobs/${jobId}/applications`;

export const getReferenceEmailsEndpoint = (applicationId: number): string =>
  `${baseUrl()}/applications/${applicationId}/reference-emails/`;

export const getSendReferenceEmailEndpoint = (
  applicationId: number,
  referenceType: "director" | "secondary",
): string =>
  `${baseUrl()}/applications/${applicationId}/reference-emails/${referenceType}/send`;

export const getUpdateApplicationStepEndpoint = (
  applicationId: number,
  stepId: number,
): string => `${getApplicationEndpoint(applicationId)}/steps/${stepId}`;
