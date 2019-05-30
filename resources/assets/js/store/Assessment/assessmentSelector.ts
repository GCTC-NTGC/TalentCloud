import { isEqual } from "lodash";
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

const getCurrentAssessmentState = createSelector(
  getCanonAssessmentState,
  getEditedAssessmentState,
  (canon, edited): { [id: number]: Assessment } => ({
    ...canon,
    ...edited,
  }),
);

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

export const getAssessmentIdsByCriterion = createCachedSelector(
  getAssessmentsByCriterion,
  (assessments): number[] => assessments.map(getId),
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

export const getTempAssessmentIdsByCriterion = createCachedSelector(
  getTempAssessmentsByCriterion,
  (assessments): number[] => assessments.map(getId),
)((state, props): number => props.criterionId);

export const tempAssessmentIsSaving = (state: RootState, id: number): boolean =>
  hasKey(stateSlice(state).tempAssessmentSaving, id)
    ? stateSlice(state).tempAssessmentSaving[id]
    : false;

export const tempAssessmentsAreSavingByCriterion = createCachedSelector(
  getTempAssessmentIdsByCriterion,
  getTempSavingState,
  (assessmentIds, savingState): { [id: number]: boolean } =>
    mapToObjectTrans(
      assessmentIds,
      (id): number => id,
      (assessmentId): boolean =>
        hasKey(savingState, assessmentId) ? savingState[assessmentId] : false,
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
  getAssessmentIdsByCriterion,
  getCanonAssessmentState,
  getEditedAssessmentState,
  (assessmentIds, canonState, editedState): { [id: number]: boolean } => {
    return mapToObjectTrans(
      assessmentIds,
      (id): number => id,
      (assessmentId): boolean => {
        const canon = hasKey(canonState, assessmentId)
          ? canonState[assessmentId]
          : null;
        const edited = hasKey(editedState, assessmentId)
          ? editedState[assessmentId]
          : null;
        return edited !== null && !isEqual(edited, canon);
      },
    );
  },
)((state, props): number => props.criterionId);

export const assessmentIsUpdating = (state: RootState, id: number): boolean =>
  hasKey(stateSlice(state).assessmentUpdates, id)
    ? stateSlice(state).assessmentUpdates[id] > 0
    : false;

export const assessmentsAreUpdatingByCriteria = createCachedSelector(
  getAssessmentIdsByCriterion,
  getAssessmentUpdatingState,
  (assessmentIds, updateState): { [id: number]: boolean } =>
    mapToObjectTrans(
      assessmentIds,
      (id): number => id,
      (assessmentId): boolean =>
        hasKey(updateState, assessmentId)
          ? updateState[assessmentId] > 0
          : false,
    ),
)((state, props): number => props.criterionId);
