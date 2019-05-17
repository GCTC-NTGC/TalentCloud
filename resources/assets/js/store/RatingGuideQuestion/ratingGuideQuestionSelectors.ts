import isEqual from "lodash/isEqual";
import { RootState } from "../store";
import { RatingGuideQuestionState } from "./ratingGuideQuestionReducer";
import {
  RatingGuideQuestion,
  TempRatingGuideQuestion,
} from "../../models/types";
import { getId, hasKey, mapToObjectTrans } from "../../helpers/queries";

const stateSlice = (state: RootState): RatingGuideQuestionState =>
  state.ratingGuideQuestion;

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getCurrentRatingGuideQuestions = (
  state: RootState,
): RatingGuideQuestion[] => {
  const currentRatingGuideQuestions = {
    ...stateSlice(state).ratingGuideQuestions,
    ...stateSlice(state).editedRatingGuideQuestions,
  };
  const deleteCount = stateSlice(state).ratingGuideQuestionDeletes;
  return Object.values(currentRatingGuideQuestions).filter(
    (ratingGuideQuestion): boolean =>
      !hasKey(deleteCount, ratingGuideQuestion.id) ||
      deleteCount[ratingGuideQuestion.id] <= 0,
  );
};

export const getRatingGuideQuestions = (
  state: RootState,
): RatingGuideQuestion[] =>
  Object.values(stateSlice(state).ratingGuideQuestions);

export const getTempRatingGuideQuestions = (
  state: RootState,
): TempRatingGuideQuestion[] => {
  return Object.values(stateSlice(state).tempRatingGuideQuestions);
};

export const getCanonRatingGuideQuestionById = (
  state: RootState,
  id: number,
): RatingGuideQuestion | null => {
  const canonRatingGuideQuestions = stateSlice(state).ratingGuideQuestions;
  return hasKey(canonRatingGuideQuestions, id)
    ? canonRatingGuideQuestions[id]
    : null;
};

export const getEditRatingGuideQuestionById = (
  state: RootState,
  id: number,
): RatingGuideQuestion | null => {
  const editRatingGuideQuestions = stateSlice(state).editedRatingGuideQuestions;
  return hasKey(editRatingGuideQuestions, id)
    ? editRatingGuideQuestions[id]
    : null;
};

export const getRatingGuideQuestionsByJob = (
  state: RootState,
  jobId: number,
): RatingGuideQuestion[] => {
  return getCurrentRatingGuideQuestions(state).filter(
    (question): boolean => question.job_poster_id === jobId,
  );
};

export const getRatingGuideQuestionsByAssessment = (
  state: RootState,
  assessmentTypeId: number,
): RatingGuideQuestion[] => {
  return getCurrentRatingGuideQuestions(state).filter(
    (question): boolean => question.assessment_type_id === assessmentTypeId,
  );
};

export const getTempRatingGuideQuestionsByAssessment = (
  state: RootState,
  assessmentTypeId: number,
): TempRatingGuideQuestion[] =>
  getTempRatingGuideQuestions(state).filter(
    (ratingGuideQuestion: RatingGuideQuestion): boolean =>
      ratingGuideQuestion.assessment_type_id === assessmentTypeId,
  );

/** Returns true if there is an edited verision which differs from canonical version */
export const ratingGuideQuestionIsEdited = (
  state: RootState,
  id: number,
): boolean => {
  const canon = getCanonRatingGuideQuestionById(state, id);
  const edited = getEditRatingGuideQuestionById(state, id);
  return edited !== null && !isEqual(edited, canon);
};

export const ratingGuideQuestionsAreEditedByAssessment = (
  state: RootState,
  assessmentTypeId: number,
): { [id: number]: boolean } => {
  const ratingGuideQuestions = getRatingGuideQuestionsByAssessment(
    state,
    assessmentTypeId,
  );
  return mapToObjectTrans(
    ratingGuideQuestions,
    getId,
    (ratingGuideQuestion): boolean =>
      ratingGuideQuestionIsEdited(state, ratingGuideQuestion.id),
  );
};

export const tempRatingGuideQuestionIsSaving = (
  state: RootState,
  id: number,
): boolean =>
  hasKey(stateSlice(state).tempRatingGuideQuestionSaving, id)
    ? stateSlice(state).tempRatingGuideQuestionSaving[id]
    : false;

export const tempRatingGuideQuestionsAreSavingByAssessment = (
  state: RootState,
  assessmentTypeId: number,
): { [id: number]: boolean } => {
  const ratingGuideQuestions = getTempRatingGuideQuestionsByAssessment(
    state,
    assessmentTypeId,
  );
  return mapToObjectTrans(
    ratingGuideQuestions,
    getId,
    (ratingGuideQuestion: RatingGuideQuestion): boolean =>
      tempRatingGuideQuestionIsSaving(state, ratingGuideQuestion.id),
  );
};

export const ratingGuideQuestionIsUpdating = (
  state: RootState,
  id: number,
): boolean =>
  hasKey(stateSlice(state).ratingGuideQuestionUpdates, id)
    ? stateSlice(state).ratingGuideQuestionUpdates[id] > 0
    : false;

export const ratingGuideQuestionsAreUpdatingByAssessment = (
  state: RootState,
  assessmentTypeId: number,
): { [id: number]: boolean } => {
  const ratingGuideQuestions = getRatingGuideQuestionsByAssessment(
    state,
    assessmentTypeId,
  );
  return ratingGuideQuestions.reduce(
    (
      result: { [id: number]: boolean },
      ratingGuideQuestion: RatingGuideQuestion,
    ): { [id: number]: boolean } => {
      result[ratingGuideQuestion.id] = ratingGuideQuestionIsUpdating(
        state,
        ratingGuideQuestion.id,
      );
      return result;
    },
    {},
  );
};
