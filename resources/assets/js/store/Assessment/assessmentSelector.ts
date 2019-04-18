import isEqual from "lodash/isEqual";
import { RootState } from "../store";
import {
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
} from "../../models/types";
import { getCriteriaByJob } from "../Job/jobSelector";
import { getId, hasKey, mapToObjectTrans } from "../../helpers/queries";
import { AssessmentState } from "./assessmentReducer";

const stateSlice = (state: RootState): AssessmentState => state.assessment;

/** Returns current (ie edited, if possible) verisons of all assessments */
export const getAssessments = (state: RootState): Assessment[] => {
  const currentAssessments = {
    ...stateSlice(state).assessments,
    ...stateSlice(state).editedAssessments,
  };
  return Object.values(currentAssessments);
};

/** Returns current (ie edited, if possible) verisons of all assessments */
export const getAssessmentsByJob = (
  state: RootState,
  jobId: number,
): Assessment[] => {
  const criteriaIds = getCriteriaByJob(state, jobId).map(getId);
  return getAssessments(state).filter(
    (assessment): boolean => criteriaIds.includes(assessment.criterion_id),
  );
};

/** Returns current (ie edited, if possible) verisons of all assessments */
export const getAssessmentsByCriterion = (
  state: RootState,
  criterionId: number,
): Assessment[] =>
  getAssessments(state).filter(
    (assessment): boolean => assessment.criterion_id === criterionId,
  );

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

export const getRatingsGuideQuestions = (
  state: RootState,
): RatingsGuideQuestion[] =>
  Object.values(stateSlice(state).ratingsGuideQuestions);

export const getRatingsGuideQuestionsByJob = (
  state: RootState,
  jobId: number,
): RatingsGuideQuestion[] => {
  return getRatingsGuideQuestions(state).filter(
    (question): boolean => question.job_poster_id === jobId,
  );
};

export const getRatingsGuideAnswers = (
  state: RootState,
): RatingsGuideAnswer[] => Object.values(stateSlice(state).ratingsGuideAnswers);

export const getRatingsGuideAnswersByJob = (
  state: RootState,
  jobId: number,
): RatingsGuideAnswer[] => {
  const questionIds = getRatingsGuideQuestionsByJob(state, jobId).map(getId);
  return getRatingsGuideAnswers(state).filter(
    (answer): boolean => questionIds.includes(answer.rating_guide_question_id),
  );
};
