import isEqual from "lodash/isEqual";
import { RootState } from "../store";
import { RatingGuideAnswerState } from "./ratingGuideAnswerReducer";
import { RatingGuideAnswer, RatingGuideQuestion } from "../../models/types";
import {
  getRatingGuideQuestionsByJob,
  getRatingGuideQuestionsByAssessment,
} from "../RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getId, hasKey } from "../../helpers/queries";

const stateSlice = (state: RootState): RatingGuideAnswerState =>
  state.ratingGuideAnswer;

const getCurrentAnswerState = (
  state: RootState,
): { [id: number]: RatingGuideAnswer } => ({
  ...stateSlice(state).ratingGuideAnswers,
  ...stateSlice(state).editedRatingGuideAnswers,
});
/**
 * Returns current verisons of all answers.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getCurrentRatingGuideAnswers = (
  state: RootState,
): RatingGuideAnswer[] => {
  const currentRatingGuideAnswers = {
    ...stateSlice(state).ratingGuideAnswers,
    ...stateSlice(state).editedRatingGuideAnswers,
  };
  const deleteCount = stateSlice(state).ratingGuideAnswerDeletes;
  return Object.values(currentRatingGuideAnswers).filter(
    (ratingGuideAnswer): boolean =>
      !hasKey(deleteCount, ratingGuideAnswer.id) ||
      deleteCount[ratingGuideAnswer.id] <= 0,
  );
};

export const getCanonRatingGuideAnswers = (
  state: RootState,
): RatingGuideAnswer[] => Object.values(stateSlice(state).ratingGuideAnswers);

export const getTempRatingGuideAnswers = (
  state: RootState,
): RatingGuideAnswer[] => {
  return Object.values(stateSlice(state).tempRatingGuideAnswers);
};

/**
 * Returns current verisons of all answers.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getRatingGuideAnswersByJob = (
  state: RootState,
  jobId: number,
): RatingGuideAnswer[] => {
  const questionIds = getRatingGuideQuestionsByJob(state, jobId).map(getId);
  return getCurrentRatingGuideAnswers(state).filter(
    (answer): boolean => questionIds.includes(answer.rating_guide_question_id),
  );
};

/**
 * Returns current verison of answer, ie edited version if possible.
 */
export const getRatingGuideAnswerById = (
  state: RootState,
  id: number,
): RatingGuideAnswer | null => {
  const answers = getCurrentAnswerState(state);
  return hasKey(answers, id) ? answers[id] : null;
};

export const getTempRatingGuideAnswerById = (
  state: RootState,
  id: number,
): RatingGuideAnswer | null =>
  hasKey(stateSlice(state).tempRatingGuideAnswers, id)
    ? stateSlice(state).tempRatingGuideAnswers[id]
    : null;

export const getRatingGuideAnswersByQuestion = (
  state: RootState,
  ratingGuideQuestionId: number,
): RatingGuideAnswer[] => {
  return getCurrentRatingGuideAnswers(state).filter(
    (answer): boolean =>
      answer.rating_guide_question_id === ratingGuideQuestionId,
  );
};

export const getRatingGuideAnswersByAssessment = (
  state: RootState,
  assessmentTypeId: number,
): RatingGuideAnswer[] => {
  const availableAnswers = [] as RatingGuideAnswer[];
  const ratingGuideQuestions = getRatingGuideQuestionsByAssessment(
    state,
    assessmentTypeId,
  );
  ratingGuideQuestions.map(
    // eslint-disable-next-line array-callback-return
    (question: RatingGuideQuestion): void => {
      availableAnswers.push(
        ...getRatingGuideAnswersByQuestion(state, question.id),
      );
    },
  );
  return availableAnswers;
};

export const getTempRatingGuideAnswersByQuestion = (
  state: RootState,
  ratingGuideQuestionId: number,
): RatingGuideAnswer[] =>
  getTempRatingGuideAnswers(state).filter(
    (ratingGuideAnswer: RatingGuideAnswer): boolean =>
      ratingGuideAnswer.rating_guide_question_id === ratingGuideQuestionId,
  );

export const getCanonRatingGuideAnswerById = (
  state: RootState,
  id: number,
): RatingGuideAnswer | null => {
  const canonRatingGuideAnswers = stateSlice(state).ratingGuideAnswers;
  return hasKey(canonRatingGuideAnswers, id)
    ? canonRatingGuideAnswers[id]
    : null;
};

export const getEditRatingGuideAnswerById = (
  state: RootState,
  id: number,
): RatingGuideAnswer | null => {
  const editRatingGuideAnswers = stateSlice(state).editedRatingGuideAnswers;
  return hasKey(editRatingGuideAnswers, id) ? editRatingGuideAnswers[id] : null;
};

/** Returns true if there is an edited verision which differs from canonical version */
export const ratingGuideAnswerIsEdited = (
  state: RootState,
  id: number,
): boolean => {
  const canon = getCanonRatingGuideAnswerById(state, id);
  const edited = getEditRatingGuideAnswerById(state, id);
  return edited !== null && !isEqual(edited, canon);
};

export const ratingGuideAnswerIsUpdating = (
  state: RootState,
  id: number,
): boolean =>
  hasKey(stateSlice(state).ratingGuideAnswerUpdates, id)
    ? stateSlice(state).ratingGuideAnswerUpdates[id] > 0
    : false;

export const tempRatingGuideAnswerIsSaving = (
  state: RootState,
  id: number,
): boolean =>
  hasKey(stateSlice(state).tempRatingGuideAnswerSaving, id)
    ? stateSlice(state).tempRatingGuideAnswerSaving[id]
    : false;
