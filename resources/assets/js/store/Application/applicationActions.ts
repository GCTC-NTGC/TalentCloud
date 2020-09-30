import {
  AsyncFsaActions,
  RSAActionTemplate,
  asyncGet,
  asyncPut,
  asyncPost,
} from "../asyncAction";
import {
  Application,
  ApplicationNormalized,
  ApplicationReview,
  Email,
  JobApplicationAnswer,
} from "../../models/types";
import {
  getApplicationEndpoint,
  parseApplication,
  getApplicationsForJobEndpoint,
  parseApplicationsForJob,
  getApplicationReviewEndpoint,
  parseApplicationReview,
  ReferenceEmailResponse,
  getReferenceEmailsEndpoint,
  parseReferenceEmails,
  getSendReferenceEmailEndpoint,
  parseSingleReferenceEmail,
  getApplicationBasicEndpoint,
  parseApplicationResponse,
} from "../../api/application";
import {
  CreateJobApplicationAnswerAction,
  UpdateJobApplicationAnswerAction,
} from "../JobApplicationAnswer/jobApplicationAnswerActions";

export const FETCH_APPLICATION_STARTED = "APPLICATION: GET STARTED";
export const FETCH_APPLICATION_SUCCEEDED = "APPLICATION: GET SUCCEEDED";
export const FETCH_APPLICATION_FAILED = "APPLICATION: GET FAILED";

export type FetchApplicationAction = AsyncFsaActions<
  typeof FETCH_APPLICATION_STARTED,
  typeof FETCH_APPLICATION_SUCCEEDED,
  typeof FETCH_APPLICATION_FAILED,
  {
    application: Application;
    jobApplicationAnswers: JobApplicationAnswer[];
  },
  { id: number }
>;

export const fetchApplication = (
  id: number,
): RSAActionTemplate<
  typeof FETCH_APPLICATION_STARTED,
  typeof FETCH_APPLICATION_SUCCEEDED,
  typeof FETCH_APPLICATION_FAILED,
  {
    application: Application;
    jobApplicationAnswers: JobApplicationAnswer[];
  },
  { id: number }
> =>
  asyncGet(
    getApplicationEndpoint(id),
    FETCH_APPLICATION_STARTED,
    FETCH_APPLICATION_SUCCEEDED,
    FETCH_APPLICATION_FAILED,
    parseApplicationResponse,
    { id },
  );

export const UPDATE_APPLICATION_STARTED = "APPLICATION: UPDATE STARTED";
export const UPDATE_APPLICATION_SUCCEEDED = "APPLICATION: UPDATE SUCCEEDED";
export const UPDATE_APPLICATION_FAILED = "APPLICATION: UPDATE FAILED";

export type UpdateApplicationAction = AsyncFsaActions<
  typeof UPDATE_APPLICATION_STARTED,
  typeof UPDATE_APPLICATION_SUCCEEDED,
  typeof UPDATE_APPLICATION_FAILED,
  ApplicationNormalized,
  { id: number }
>;

export const updateApplication = (
  application: ApplicationNormalized,
): RSAActionTemplate<
  typeof UPDATE_APPLICATION_STARTED,
  typeof UPDATE_APPLICATION_SUCCEEDED,
  typeof UPDATE_APPLICATION_FAILED,
  ApplicationNormalized,
  { id: number }
> =>
  asyncPut(
    getApplicationBasicEndpoint(application.id),
    application,
    UPDATE_APPLICATION_STARTED,
    UPDATE_APPLICATION_SUCCEEDED,
    UPDATE_APPLICATION_FAILED,
    parseApplication,
    { id: application.id },
  );

export const FETCH_APPLICATIONS_FOR_JOB_STARTED =
  "APPLICATION: GET FOR JOB STARTED";
export const FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED =
  "APPLICATION: GET FOR JOB SUCCEEDED";
export const FETCH_APPLICATIONS_FOR_JOB_FAILED =
  "APPLICATION: GET FOR JOB FAILED";

export type FetchApplicationsForJobAction = AsyncFsaActions<
  typeof FETCH_APPLICATIONS_FOR_JOB_STARTED,
  typeof FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED,
  typeof FETCH_APPLICATIONS_FOR_JOB_FAILED,
  Application[],
  { jobId: number }
>;

export const fetchApplicationsForJob = (
  jobId: number,
): RSAActionTemplate<
  typeof FETCH_APPLICATIONS_FOR_JOB_STARTED,
  typeof FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED,
  typeof FETCH_APPLICATIONS_FOR_JOB_FAILED,
  Application[],
  { jobId: number }
> =>
  asyncGet(
    getApplicationsForJobEndpoint(jobId),
    FETCH_APPLICATIONS_FOR_JOB_STARTED,
    FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED,
    FETCH_APPLICATIONS_FOR_JOB_FAILED,
    parseApplicationsForJob,
    { jobId },
  );

export const UPDATE_APPLICATION_REVIEW_STARTED =
  "APPLICATION: UPDATE REVIEW STARTED";
export const UPDATE_APPLICATION_REVIEW_SUCCEEDED =
  "APPLICATION: UPDATE REVIEW SUCCEEDED";
export const UPDATE_APPLICATION_REVIEW_FAILED =
  "APPLICATION: UPDATE REVIEW FAILED";

export type UpdateApplicationReview = AsyncFsaActions<
  typeof UPDATE_APPLICATION_REVIEW_STARTED,
  typeof UPDATE_APPLICATION_REVIEW_SUCCEEDED,
  typeof UPDATE_APPLICATION_REVIEW_FAILED,
  ApplicationReview,
  { id: number; applicationId: number }
>;

export const updateApplicationReview = (
  applicationReview: ApplicationReview,
): RSAActionTemplate<
  typeof UPDATE_APPLICATION_REVIEW_STARTED,
  typeof UPDATE_APPLICATION_REVIEW_SUCCEEDED,
  typeof UPDATE_APPLICATION_REVIEW_FAILED,
  ApplicationReview,
  { id: number; applicationId: number }
> =>
  asyncPut(
    getApplicationReviewEndpoint(applicationReview.job_application_id),
    applicationReview,
    UPDATE_APPLICATION_REVIEW_STARTED,
    UPDATE_APPLICATION_REVIEW_SUCCEEDED,
    UPDATE_APPLICATION_REVIEW_FAILED,
    parseApplicationReview,
    {
      id: applicationReview.id,
      applicationId: applicationReview.job_application_id,
    },
  );

export const FETCH_REFERENCE_EMAILS_STARTED =
  "APPLICATION: GET REFERENCE EMAILS STARTED";
export const FETCH_REFERENCE_EMAILS_SUCCEEDED =
  "APPLICATION: GET REFERENCE EMAILS SUCCEEDED";
export const FETCH_REFERENCE_EMAILS_FAILED =
  "APPLICATION: GET REFERENCE EMAILS FAILED";

export type FetchReferenceEmailsAction = AsyncFsaActions<
  typeof FETCH_REFERENCE_EMAILS_STARTED,
  typeof FETCH_REFERENCE_EMAILS_SUCCEEDED,
  typeof FETCH_REFERENCE_EMAILS_FAILED,
  ReferenceEmailResponse,
  { applicationId: number }
>;

export const fetchReferenceEmails = (
  applicationId: number,
): RSAActionTemplate<
  typeof FETCH_REFERENCE_EMAILS_STARTED,
  typeof FETCH_REFERENCE_EMAILS_SUCCEEDED,
  typeof FETCH_REFERENCE_EMAILS_FAILED,
  ReferenceEmailResponse,
  { applicationId: number }
> =>
  asyncGet(
    getReferenceEmailsEndpoint(applicationId),
    FETCH_REFERENCE_EMAILS_STARTED,
    FETCH_REFERENCE_EMAILS_SUCCEEDED,
    FETCH_REFERENCE_EMAILS_FAILED,
    parseReferenceEmails,
    { applicationId },
  );

export const SEND_REFERENCE_EMAIL_STARTED =
  "APPLICATION: SEND REFERENCE EMAIL STARTED";
export const SEND_REFERENCE_EMAIL_SUCCEEDED =
  "APPLICATION: SEND REFERENCE EMAIL SUCCEEDED";
export const SEND_REFERENCE_EMAIL_FAILED =
  "APPLICATION: SEND REFERENCE EMAIL FAILED";

export type SendReferenceEmailAction = AsyncFsaActions<
  typeof SEND_REFERENCE_EMAIL_STARTED,
  typeof SEND_REFERENCE_EMAIL_SUCCEEDED,
  typeof SEND_REFERENCE_EMAIL_FAILED,
  Email,
  { applicationId: number; referenceType: "director" | "secondary" }
>;

export const sendReferenceEmail = (
  applicationId: number,
  referenceType: "director" | "secondary",
): RSAActionTemplate<
  typeof SEND_REFERENCE_EMAIL_STARTED,
  typeof SEND_REFERENCE_EMAIL_SUCCEEDED,
  typeof SEND_REFERENCE_EMAIL_FAILED,
  Email,
  { applicationId: number; referenceType: "director" | "secondary" }
> =>
  asyncPost(
    getSendReferenceEmailEndpoint(applicationId, referenceType),
    "",
    SEND_REFERENCE_EMAIL_STARTED,
    SEND_REFERENCE_EMAIL_SUCCEEDED,
    SEND_REFERENCE_EMAIL_FAILED,
    parseSingleReferenceEmail,
    { applicationId, referenceType },
  );

export type ApplicationAction =
  | FetchApplicationAction
  | FetchApplicationsForJobAction
  | UpdateApplicationAction
  | UpdateApplicationReview
  | FetchReferenceEmailsAction
  | SendReferenceEmailAction
  | CreateJobApplicationAnswerAction
  | UpdateJobApplicationAnswerAction;
