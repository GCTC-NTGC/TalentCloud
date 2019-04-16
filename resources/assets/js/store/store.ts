import { combineReducers, Reducer } from "redux";
import { jobsReducer, JobState } from "./Job/jobReducer";

export interface RootState {
  jobs: JobState;
}

export const rootReducer = (): Reducer<RootState> =>
  combineReducers({
    jobs: jobsReducer,
  });

export default rootReducer;
