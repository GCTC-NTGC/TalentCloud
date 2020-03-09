import { JobPosterStatus } from "../../models/types";
import { JobPosterStatusAction, FETCH_JOB_POSTER_STATUSES_STARTED, FETCH_JOB_POSTER_STATUSES_SUCCEEDED, FETCH_JOB_POSTER_STATUSES_FAILED } from "./jobStatusActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface JobStatusState {
  byId: {
    [id: number]: JobPosterStatus;
  };
  loading: boolean;
}

export const initJobStatusState = (): JobStatusState => ({
  byId: [],
  loading: false,
});

const jobStatusReducer = (
  state = initJobStatusState(),
  action: JobPosterStatusAction,
): JobStatusState => {
  switch (action.type) {
    case FETCH_JOB_POSTER_STATUSES_STARTED:
      return { ...state, loading: true };
    case FETCH_JOB_POSTER_STATUSES_SUCCEEDED:
      return { byId: mapToObject(action.payload, getId), loading: false };
    case FETCH_JOB_POSTER_STATUSES_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default jobStatusReducer;
