import { RootState } from "../store";
import { Job, Criteria } from "../../models/types";
import { hasKey } from "../../helpers/queries";
import { EntityState, UiState } from "./jobReducer";

const entities = (state: RootState): EntityState => state.jobs.entities;
const ui = (state: RootState): UiState => state.jobs.ui;

export const getJob = (state: RootState, id: number): Job | null => {
  const jobs = entities(state).jobs.byId;
  return hasKey(jobs, id) ? jobs[id] : null;
};

export const getJobIsLoading = (state: RootState, id: number): boolean => {
  const updating = ui(state).jobUpdating;
  return hasKey(updating, id) ? updating[id] : false;
};

export const getCriteria = (state: RootState): Criteria[] =>
  Object.values(entities(state).criteria.byId);

export const getCriteriaById = (
  state: RootState,
  id: number,
): Criteria | null =>
  hasKey(entities(state).criteria.byId, id)
    ? entities(state).criteria.byId[id]
    : null;

export const getCriteriaByJob = (state: RootState, jobId: number): Criteria[] =>
  getCriteria(state).filter(
    (criteria): boolean => criteria.job_poster_id === jobId,
  );
