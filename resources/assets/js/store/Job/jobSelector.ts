import isEqual from "lodash/isEqual";
import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { RootState } from "../store";
import { Job, Criteria } from "../../models/types";
import { hasKey, getId } from "../../helpers/queries";
import { EntityState, UiState } from "./jobReducer";

const entities = (state: RootState): EntityState => state.jobs.entities;
const ui = (state: RootState): UiState => state.jobs.ui;

const getJobState = (state: RootState): { [id: number]: Job } =>
  entities(state).jobs.byId;

const getJobEditState = (state: RootState): { [id: number]: Job } =>
  entities(state).jobEdits;

const getJobUpdatingState = (state: RootState): { [id: number]: boolean } =>
  ui(state).jobUpdating;

export const getCriteriaState = (
  state: RootState,
): { [id: number]: Criteria } => entities(state).criteria.byId;

export const getJob = createCachedSelector(
  getJobState,
  (state: RootState, ownProps: { jobId: number }): number => ownProps.jobId,
  (jobState, jobId): Job | null =>
    hasKey(jobState, jobId) ? jobState[jobId] : null,
)((state, ownProps): number => ownProps.jobId);

export const getSelectedJob = (state: RootState): Job | null => {
  const selectedId = ui(state).selectedJobId;
  return selectedId ? getJob(state, { jobId: selectedId }) : null;
};

export const getEditJob = createCachedSelector(
  getJobEditState,
  (state: RootState, ownProps: { jobId: number }): number => ownProps.jobId,
  (jobState, jobId): Job | null =>
    hasKey(jobState, jobId) ? jobState[jobId] : null,
)((state, ownProps): number => ownProps.jobId);

export const getJobIsUpdating = (state: RootState, id: number): boolean => {
  const updating = getJobUpdatingState(state);
  return hasKey(updating, id) ? updating[id] : false;
};

export const getJobIsEdited = createCachedSelector(
  getJob,
  getEditJob,
  (canon, edited): boolean => edited !== null && !isEqual(canon, edited),
)((state, ownProps): number => ownProps.jobId);

export const getCriteria = createSelector(
  getCriteriaState,
  (criteriaState): Criteria[] => Object.values(criteriaState),
);

export const getCriteriaById = (
  state: RootState,
  { criterionId }: { criterionId: number },
): Criteria | null =>
  hasKey(entities(state).criteria.byId, criterionId)
    ? entities(state).criteria.byId[criterionId]
    : null;

export const getCreatingJob = (state: RootState): boolean =>
  ui(state).creatingJob;

export const getCriteriaByJob = createCachedSelector(
  getCriteria,
  (state: RootState, ownProps: { jobId: number }): number => ownProps.jobId,
  (criteria, jobId: number): Criteria[] =>
    criteria.filter((criterion): boolean => criterion.job_poster_id === jobId),
)((state, ownProps): number => ownProps.jobId);

export const getCriteriaOfTypeByJob = createCachedSelector(
  getCriteriaByJob,
  (state: RootState, props: { criteriaTypeId: number }): number =>
    props.criteriaTypeId,
  (criteria, criteriaTypeId): Criteria[] =>
    criteria.filter(
      (criterion: Criteria): boolean =>
        criterion.criteria_type_id === criteriaTypeId,
    ),
)((state, props): string => `${props.jobId}:${props.criteriaTypeId}`);

export const getCriteriaIdsOfTypeByJob = createCachedSelector(
  getCriteriaOfTypeByJob,
  (criteria): number[] => criteria.map(getId),
)((state, props): string => `${props.jobId}:${props.criteriaTypeId}`);

export const getCriteriaIdsByJob = createCachedSelector(
  getCriteriaByJob,
  (criteria): number[] => criteria.map(getId),
)((state, ownProps): number => ownProps.jobId);
