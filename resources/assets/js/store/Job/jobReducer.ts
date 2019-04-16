import { Job, Criteria } from "../../models/types";
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
  jobs: {
    [id: number]: Job;
  };
  jobUpdating: {
    [id: number]: boolean;
  };
  criteria: {
    [id: number]: Criteria;
  };
  criteriaUpdating: {
    [id: number]: boolean;
  };
}

export const initState = (): JobState => ({
  jobs: {},
  jobUpdating: {},
  criteria: {},
  criteriaUpdating: {},
});

/**
 * Set jobUpdating to true for the specified job
 * @param state
 * @param action
 */
export const fetchStarted = (
  state: JobState,
  action: FetchJobStartedAction,
): JobState => {
  const id = action.payload;
  return {
    ...state,
    jobUpdating: {
      [id]: true,
    },
  };
};

/** Set jobUpdating to false and replace the job in store */
export const fetchSucceeded = (
  state: JobState,
  action: FetchJobSucceededAction,
): JobState => {
  const { id, job, criteria } = action.payload;
  const newCriteria: { [id: number]: Criteria } = criteria.reduce((map, obj): {
    [id: number]: Criteria;
  } => {
    // eslint-disable-next-line no-param-reassign
    map[obj.id] = obj;
    return map;
  }, {});
  return {
    ...state,
    jobs: {
      ...state.jobs,
      [id]: job,
    },
    jobUpdating: {
      ...state.jobUpdating,
      [id]: false,
    },
    criteria: {
      ...state.criteria,
      ...newCriteria,
    },
  };
};

/** Set jobUpdating to false for specified job */
export const fetchFailed = (
  state: JobState,
  action: FetchJobFailedAction,
): JobState => {
  // TODO: do something with the error in the payload
  const { id } = action.payload;
  return {
    ...state,
    jobUpdating: {
      [id]: false,
    },
  };
};

export const jobsReducer = (
  state = initState(),
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
