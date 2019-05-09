import { Action } from "../createAction";
import { getJobEndpoint, parseJobResponse } from "../../api/job";
import { Job, Criteria } from "../../models/types";
import asyncAction, {
  AsyncFsaActions,
  RSAActionTemplate,
} from "../asyncAction";

export const FETCH_JOB_STARTED = "JOB: GET STARTED";
export const FETCH_JOB_SUCCEEDED = "JOB: GET SUCCEEDED";
export const FETCH_JOB_FAILED = "JOB: GET FAILED";

export type JobAction = AsyncFsaActions<
  typeof FETCH_JOB_STARTED,
  typeof FETCH_JOB_SUCCEEDED,
  typeof FETCH_JOB_FAILED,
  { job: Job; criteria: Criteria[] },
  { id: number }
>;

export const fetchJob = (
  id: number,
): RSAActionTemplate<
  typeof FETCH_JOB_STARTED,
  typeof FETCH_JOB_SUCCEEDED,
  typeof FETCH_JOB_FAILED,
  { job: Job; criteria: Criteria[] },
  { id: number }
> =>
  asyncAction(
    getJobEndpoint(id),
    "GET",
    FETCH_JOB_STARTED,
    FETCH_JOB_SUCCEEDED,
    FETCH_JOB_FAILED,
    parseJobResponse,
    { id },
  );

export default { fetchJob };
