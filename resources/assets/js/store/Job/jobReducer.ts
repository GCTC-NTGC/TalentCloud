import { Job } from "../../models/types";
import {
  JobAction,
  FETCH_JOB_STARTED,
  FetchJobStartedAction,
  FETCH_JOB_SUCCEEDED,
  FETCH_JOB_FAILED,
  FetchJobSucceededAction,
  FetchJobFailedAction,
} from "./jobActions";

export interface JobState {
  [id: number]: {
    job: Job | null;
    isLoading: boolean;
  };
}

const initialState: JobState = {};

export const fetchStarted = (
  state: JobState,
  action: FetchJobStartedAction,
): JobState => {
  const id = action.payload;
  const oldEntry = state[id] ? state[id] : { job: null, isLoading: false };
  const newEntry = Object.assign(oldEntry, { isLoading: true });
  const newState = Object.assign(state);
  newState[id] = newEntry;
  return newState;
};

export const fetchSucceeded = (
  state: JobState,
  action: FetchJobSucceededAction,
): JobState => {
  const { id } = action.payload;
  const newEntry = { job: action.payload.response.data, isLoading: false };
  const newState = Object.assign(state);
  newState[id] = newEntry;
  return newState;
};

export const fetchFailed = (
  state: JobState,
  action: FetchJobFailedAction,
): JobState => {
  // TODO: Add some kind of error notification state
  const { id } = action.payload;
  const oldEntry = state[id] ? state[id] : { job: null, isLoading: false };
  const newEntry = Object.assign(oldEntry, { isLoading: false });
  const newState = Object.assign(state);
  newState[id] = newEntry;
  return newState;
};

export const jobsReducer = (
  state = initialState,
  action: JobAction,
): JobState => {
  switch (action.type) {
    case FETCH_JOB_STARTED:
      return fetchStarted(state, action);
    case FETCH_JOB_SUCCEEDED:
      return fetchSucceeded(state, action);
    case FETCH_JOB_FAILED:
      return fetchFailed(state, action);
    default:
      return state;
  }
};

export default jobsReducer;
