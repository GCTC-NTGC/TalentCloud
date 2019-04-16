import { RootState } from "../store";
import { Job } from "../../models/types";

export const getJob = (state: RootState, id: number): Job | null => {
  return state.jobs[id] ? state.jobs[id].job : null;
};

export const getJobIsLoading = (state: RootState, id: number): boolean => {
  return state.jobs[id] ? state.jobs[id].isLoading : false;
};
