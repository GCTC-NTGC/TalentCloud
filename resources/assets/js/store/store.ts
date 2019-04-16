import { combineReducers, Reducer } from "redux";
import { jobsReducer, JobState, initState as initJobs } from "./Job/jobReducer";

export interface RootState {
  jobs: JobState;
}

export const initState = (): RootState => ({
  jobs: initJobs(),
});

export const rootReducer = (): Reducer<RootState> =>
  combineReducers({
    jobs: jobsReducer,
  });

export default rootReducer;
