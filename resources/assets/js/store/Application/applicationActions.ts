import {
  AsyncFsaActions,
  RSAActionTemplate,
  asyncGet,
  asyncPut,
} from "../asyncAction";
import { Application, ApplicationReview } from "../../models/types";
import {
  getApplicationEndpoint,
  parseApplication,
  getApplicationsForJobEndpoint,
  parseApplicationsForJob,
  getApplicationReviewEndpoint,
  parseApplicationReview,
} from "../../api/application";

export const FETCH_APPLICATION_STARTED = "APPLICATION: GET STARTED";
export const FETCH_APPLICATION_SUCCEEDED = "APPLICATION: GET SUCCEEDED";
export const FETCH_APPLICATION_FAILED = "APPLICATION: GET FAILED";

export type FetchApplicationAction = AsyncFsaActions<
  typeof FETCH_APPLICATION_STARTED,
  typeof FETCH_APPLICATION_SUCCEEDED,
  typeof FETCH_APPLICATION_FAILED,
  Application,
  { id: number }
>;

export const fetchApplication = (
  id: number,
): RSAActionTemplate<
  typeof FETCH_APPLICATION_STARTED,
  typeof FETCH_APPLICATION_SUCCEEDED,
  typeof FETCH_APPLICATION_FAILED,
  Application,
  { id: number }
> =>
  asyncGet(
    getApplicationEndpoint(id),
    FETCH_APPLICATION_STARTED,
    FETCH_APPLICATION_SUCCEEDED,
    FETCH_APPLICATION_FAILED,
    parseApplication,
    { id },
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

export type ApplicationAction =
  | FetchApplicationAction
  | FetchApplicationsForJobAction
  | UpdateApplicationReview;
