import isEqual from "lodash/isEqual";
import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { RootState } from "../store";
import { Assessment, TempAssessment } from "../../models/types";
import { getId, hasKey, mapToObjectTrans } from "../../helpers/queries";
import { AssessmentState } from "./assessmentReducer";

const stateSlice = (state: RootState): AssessmentState => state.assessment;

const getCanonAssessmentState = (
  state: RootState,
): { [id: number]: Assessment } => stateSlice(state).assessments;

const getEditedAssessmentState = (
  state: RootState,
): { [id: number]: Assessment } => stateSlice(state).editedAssessments;

const getTempAssessmentState = (
  state: RootState,
): { [id: number]: TempAssessment } => stateSlice(state).tempAssessments;

const getAssessmentDeletes = (state: RootState): { [id: number]: number } =>
  stateSlice(state).assessmentDeletes;

const getTempSavingState = (state: RootState): { [id: number]: boolean } =>
  stateSlice(state).tempAssessmentSaving;

const getAssessmentUpdatingState = (
  state: RootState,
): { [id: number]: number } => stateSlice(state).assessmentUpdates;

const getCurrentAssessmentState = (
  state: RootState,
): { [id: number]: Assessment } => ({
  ...getCanonAssessmentState(state),
  ...getEditedAssessmentState(state),
});

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getCurrentAssessments = createSelector(
  getCurrentAssessmentState,
  getAssessmentDeletes,
  (currentAssessments, deleteCount): Assessment[] =>
    Object.values(currentAssessments).filter(
      (assessment): boolean =>
        !hasKey(deleteCount, assessment.id) || deleteCount[assessment.id] <= 0,
    ),
);

export const getTempAssessments = createSelector(
  getTempAssessmentState,
  (assessmentState): TempAssessment[] => Object.values(assessmentState),
);

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getAssessmentsByCriterion = createCachedSelector(
  getCurrentAssessments,
  (state: RootState, props: { criterionId: number }): number =>
    props.criterionId,
  (assessments, criterionId): Assessment[] =>
    assessments.filter(
      (assessment): boolean => assessment.criterion_id === criterionId,
    ),
)((state, props): number => props.criterionId);

export const getTempAssessmentsByCriterion = createCachedSelector(
  getTempAssessments,
  (state: RootState, props: { criterionId: number }): number =>
    props.criterionId,
  (assessments, criterionId): TempAssessment[] =>
    assessments.filter(
      (assessment): boolean => assessment.criterion_id === criterionId,
    ),
)((state, props): number => props.criterionId);

export const tempAssessmentIsSaving = (state: RootState, id: number): boolean =>
  hasKey(stateSlice(state).tempAssessmentSaving, id)
    ? stateSlice(state).tempAssessmentSaving[id]
    : false;

export const tempAssessmentsAreSavingByCriterion = createCachedSelector(
  (state: RootState): RootState => state,
  getTempAssessmentsByCriterion,
  getTempSavingState, // Here because if saving state changes, we need to recompute
  (state, assessments): { [id: number]: boolean } =>
    mapToObjectTrans(
      assessments,
      getId,
      (assessment): boolean => tempAssessmentIsSaving(state, assessment.id),
    ),
)((state, props): number => props.criterionId);

/** Returns current (ie edited, if possible) verisons of assessment */
export const getAssessmentById = createCachedSelector(
  getCurrentAssessmentState,
  (state: RootState, props: { assessmentId: number }): number =>
    props.assessmentId,
  (assessments, assessmentId): Assessment | null =>
    hasKey(assessments, assessmentId) ? assessments[assessmentId] : null,
)((state, props): number => props.assessmentId);

export const getCanonAssessmentById = createCachedSelector(
  getCanonAssessmentState,
  (state: RootState, props: { assessmentId: number }): number =>
    props.assessmentId,
  (assessments, assessmentId): Assessment | null =>
    hasKey(assessments, assessmentId) ? assessments[assessmentId] : null,
)((state, props): number => props.assessmentId);

/** NOTE: this will return assessments assocaited with multiple jobs! */
export const getAssessmentsByType = createCachedSelector(
  getCurrentAssessments,
  (state: RootState, props: { assessmentTypeId: number }): number =>
    props.assessmentTypeId,
  (assessments, assessmentTypeId): Assessment[] =>
    assessments.filter(
      (assessment): boolean =>
        assessment.assessment_type_id === assessmentTypeId,
    ),
)((state, props): number => props.assessmentTypeId);

export const getEditAssessmentById = createCachedSelector(
  getEditedAssessmentState,
  (state: RootState, props: { assessmentId: number }): number =>
    props.assessmentId,
  (assessments, assessmentId): Assessment | null =>
    hasKey(assessments, assessmentId) ? assessments[assessmentId] : null,
)((state, props): number => props.assessmentId);

/** Returns true if there is an edited verision which differs from canonical version */
export const assessmentIsEdited = createCachedSelector(
  getCanonAssessmentById,
  getEditAssessmentById,
  (canon, edited): boolean => edited !== null && !isEqual(edited, canon),
)((state, props): number => props.assessmentId);

export const assessmentsAreEditedByCriteria = createCachedSelector(
  (state): RootState => state,
  getAssessmentsByCriterion,
  (state, assessments): { [id: number]: boolean } =>
    mapToObjectTrans(
      assessments,
      getId,
      (assessment): boolean =>
        assessmentIsEdited(state, { assessmentId: assessment.id }),
    ),
)((state, props): number => props.criterionId);

export const assessmentIsUpdating = (state: RootState, id: number): boolean =>
  hasKey(stateSlice(state).assessmentUpdates, id)
    ? stateSlice(state).assessmentUpdates[id] > 0
    : false;

export const assessmentsAreUpdatingByCriteria = createCachedSelector(
  (state: RootState): RootState => state,
  getAssessmentsByCriterion,
  getAssessmentUpdatingState, // Here because if updating state changes, we need to recompute
  (state, assessments): { [id: number]: boolean } =>
    mapToObjectTrans(
      assessments,
      getId,
      (assessment): boolean => assessmentIsUpdating(state, assessment.id),
    ),
)((state, props): number => props.criterionId);
