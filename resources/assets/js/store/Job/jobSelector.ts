import { RootState } from "../store";
import { Job, Criteria } from "../../models/types";
import { objectMap, hasKey } from "../../helpers/queries";

export const getJob = (state: RootState, id: number): Job | null => {
  return hasKey(state.jobs.jobs, id) ? state.jobs.jobs[id] : null;
};

export const getJobIsLoading = (state: RootState, id: number): boolean => {
  return hasKey(state.jobs.jobUpdating, id)
    ? state.jobs.jobUpdating[id]
    : false;
};

export const getCriteria = (state: RootState): Criteria[] =>
  Object.values(state.jobs.criteria);

export const getCriteriaById = (
  state: RootState,
  id: number,
): Criteria | null =>
  hasKey(state.jobs.criteria, id) ? state.jobs.criteria[id] : null;

export const getCriteriaByJob = (state: RootState, jobId: number): Criteria[] =>
  getCriteria(state).filter(
    (criteria): boolean => criteria.job_poster_id === jobId,
  );
