import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "../createAction";
import { getJob } from "../../api/job";
import { Job } from "../../models/types";

export const FETCH_JOB_STARTED = "FETCH_JOB_STARTED";
export const FETCH_JOB_SUCCEEDED = "FETCH_JOB_SUCCEEDED";
export const FETCH_JOB_FAILED = "FETCH_JOB_FAILED";

export type FetchJobStartedAction = Action<typeof FETCH_JOB_STARTED, number>;
export type FetchJobSucceededAction = Action<
  typeof FETCH_JOB_SUCCEEDED,
  { id: number; job: Job }
>;
export type FetchJobFailedAction = Action<
  typeof FETCH_JOB_FAILED,
  { id: number; error: Error }
>;

export type JobAction =
  | FetchJobStartedAction
  | FetchJobSucceededAction
  | FetchJobFailedAction;

export const fetchJobStarted = (id: number): FetchJobStartedAction => {
  return {
    type: FETCH_JOB_STARTED,
    payload: id,
  };
};

export const fetchJobSucceeded = (
  id: number,
  job: Job,
): FetchJobSucceededAction => {
  return {
    type: FETCH_JOB_SUCCEEDED,
    payload: {
      id,
      job,
    },
  };
};

export const fetchJobFailed = (
  id: number,
  error: Error,
): FetchJobFailedAction => {
  return {
    type: FETCH_JOB_FAILED,
    payload: {
      id,
      error,
    },
  };
};

export const fetchJob = (
  id: number,
): ThunkAction<void, any, any, JobAction> => {
  return (dispatch: ThunkDispatch<any, undefined, JobAction>): void => {
    dispatch(fetchJobStarted(id));
    getJob(id)
      .then(
        (job: Job): void => {
          dispatch(fetchJobSucceeded(id, job));
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(fetchJobFailed(id, error));
        },
      );
  };
};

export default { fetchJob };
