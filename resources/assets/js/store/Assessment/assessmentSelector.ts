import isEqual from "lodash/isEqual";
import { RootState } from "../store";
import { Assessment, TempAssessment } from "../../models/types";
import { getCriteriaByJob } from "../Job/jobSelector";
import { getId, hasKey, mapToObjectTrans } from "../../helpers/queries";
import { AssessmentState } from "./assessmentReducer";

const stateSlice = (state: RootState): AssessmentState => state.assessment;

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getCurrentAssessments = (state: RootState): Assessment[] => {
  const currentAssessments = {
    ...stateSlice(state).assessments,
    ...stateSlice(state).editedAssessments,
  };
  const deleteCount = stateSlice(state).assessmentDeletes;
  return Object.values(currentAssessments).filter(
    (assessment): boolean =>
      !hasKey(deleteCount, assessment.id) || deleteCount[assessment.id] <= 0,
  );
};

export const getTempAssessments = (state: RootState): TempAssessment[] => {
  return Object.values(stateSlice(state).tempAssessments);
};

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getAssessmentsByJob = (
  state: RootState,
  jobId: number,
): Assessment[] => {
  const criteriaIds = getCriteriaByJob(state, { jobId }).map(getId);
  return getCurrentAssessments(state).filter(
    (assessment): boolean => criteriaIds.includes(assessment.criterion_id),
  );
};

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getAssessmentsByCriterion = (
  state: RootState,
  criterionId: number,
): Assessment[] =>
  getCurrentAssessments(state).filter(
    (assessment): boolean => assessment.criterion_id === criterionId,
  );

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getAssessmentsByType = (
  state: RootState,
  { jobId, assessmentTypeId }: { jobId: number; assessmentTypeId: number },
): Assessment[] =>
  getAssessmentsByJob(state, jobId).filter(
    (assessment): boolean => assessment.assessment_type_id === assessmentTypeId,
  );

export const getTempAssessmentsByCriterion = (
  state: RootState,
  criterionId: number,
): TempAssessment[] =>
  getTempAssessments(state).filter(
    (assessment): boolean => assessment.criterion_id === criterionId,
  );

export const tempAssessmentIsSaving = (state: RootState, id: number): boolean =>
  hasKey(stateSlice(state).tempAssessmentSaving, id)
    ? stateSlice(state).tempAssessmentSaving[id]
    : false;

export const tempAssessmentsAreSavingByCriterion = (
  state: RootState,
  criteriaId: number,
): { [id: number]: boolean } => {
  const assessments = getTempAssessmentsByCriterion(state, criteriaId);
  return mapToObjectTrans(
    assessments,
    getId,
    (assessment): boolean => tempAssessmentIsSaving(state, assessment.id),
  );
};

/** Returns current (ie edited, if possible) verisons of assessment */
export const getAssessmentById = (
  state: RootState,
  id: number,
): Assessment | null => {
  const currentAssessments = {
    ...stateSlice(state).assessments,
    ...stateSlice(state).editedAssessments,
  };
  return hasKey(currentAssessments, id) ? currentAssessments[id] : null;
};

export const getCanonAssessmentById = (
  state: RootState,
  id: number,
): Assessment | null => {
  const canonAssessments = stateSlice(state).assessments;
  return hasKey(canonAssessments, id) ? canonAssessments[id] : null;
};

export const getEditAssessmentById = (
  state: RootState,
  id: number,
): Assessment | null => {
  const editAssessments = stateSlice(state).editedAssessments;
  return hasKey(editAssessments, id) ? editAssessments[id] : null;
};

/** Returns true if there is an edited verision which differs from canonical version */
export const assessmentIsEdited = (state: RootState, id: number): boolean => {
  const canon = getCanonAssessmentById(state, id);
  const edited = getEditAssessmentById(state, id);
  return edited !== null && !isEqual(edited, canon);
};

export const assessmentsAreEditedByCriteria = (
  state: RootState,
  criteriaId: number,
): { [id: number]: boolean } => {
  const assessments = getAssessmentsByCriterion(state, criteriaId);
  return mapToObjectTrans(
    assessments,
    getId,
    (assessment): boolean => assessmentIsEdited(state, assessment.id),
  );
};

export const assessmentIsUpdating = (state: RootState, id: number): boolean =>
  hasKey(stateSlice(state).assessmentUpdates, id)
    ? stateSlice(state).assessmentUpdates[id] > 0
    : false;

export const assessmentsAreUpdatingByCriteria = (
  state: RootState,
  criteriaId: number,
): { [id: number]: boolean } => {
  const assessments = getAssessmentsByCriterion(state, criteriaId);
  return assessments.reduce(
    (
      result: { [id: number]: boolean },
      assessment: Assessment,
    ): { [id: number]: boolean } => {
      result[assessment.id] = assessmentIsUpdating(state, assessment.id);
      return result;
    },
    {},
  );
};
