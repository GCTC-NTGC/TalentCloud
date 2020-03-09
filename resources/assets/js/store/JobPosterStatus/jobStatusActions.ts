import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { JobPosterStatus } from "../../models/types";
import { getJobPosterStatusEndpoint } from "../../api/jobPosterStatus";

export const FETCH_JOB_POSTER_STATUSES_STARTED =
  "JOB POSTER STATUS: GET STARTED";
export const FETCH_JOB_POSTER_STATUSES_SUCCEEDED =
  "JOB POSTER STATUS: GET SUCCEEDED";
export const FETCH_JOB_POSTER_STATUSES_FAILED = "JOB POSTER STATUS: GET FAILED";

export type FetchJobPosterStatusesAction = AsyncFsaActions<
  typeof FETCH_JOB_POSTER_STATUSES_STARTED,
  typeof FETCH_JOB_POSTER_STATUSES_SUCCEEDED,
  typeof FETCH_JOB_POSTER_STATUSES_FAILED,
  JobPosterStatus[],
  {}
>;

export const fetchJobPosterStatuses = (): RSAActionTemplate<
  typeof FETCH_JOB_POSTER_STATUSES_STARTED,
  typeof FETCH_JOB_POSTER_STATUSES_SUCCEEDED,
  typeof FETCH_JOB_POSTER_STATUSES_FAILED,
  JobPosterStatus[],
  {}
> =>
  asyncGet(
    getJobPosterStatusEndpoint(),
    FETCH_JOB_POSTER_STATUSES_STARTED,
    FETCH_JOB_POSTER_STATUSES_SUCCEEDED,
    FETCH_JOB_POSTER_STATUSES_FAILED,
    (response): JobPosterStatus[] => response,
    {},
  );

export type JobPosterStatusAction = FetchJobPosterStatusesAction;
