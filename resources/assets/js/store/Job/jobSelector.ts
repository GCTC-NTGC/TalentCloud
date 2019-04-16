import { RootState } from "../store";
import { Job } from "../../models/types";

export const getJob = (state: RootState, id: number): Job | null => {
  return state.jobs.jobs[id] ? state.jobs.jobs[id] : null;
};

export const getJobIsLoading = (state: RootState, id: number): boolean => {
  return state.jobs.jobUpdating[id] ? state.jobs.jobUpdating[id] : false;
};
