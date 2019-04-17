import { combineReducers, Reducer } from "redux";
import { jobsReducer, JobState, initState as initJobs } from "./Job/jobReducer";
import assessmentReducer, {
  AssessmentState,
  initState as initAssessment,
} from "./Assessment/assessmentReducer";

export interface RootState {
  jobs: JobState;
  assessment: AssessmentState;
}

export const initState = (): RootState => ({
  jobs: initJobs(),
  assessment: initAssessment(),
});

export const rootReducer = (): Reducer<RootState> =>
  combineReducers({
    jobs: jobsReducer,
    assessment: assessmentReducer,
  });

export default rootReducer;
