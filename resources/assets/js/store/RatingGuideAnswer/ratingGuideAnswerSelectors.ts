import isEqual from "lodash/isEqual";
import { RootState } from "../store";
import { RatingGuideAnswerState } from "./ratingGuideAnswerReducer";
import { RatingGuideAnswer, TempRatingGuideAnswer } from "../../models/types";
import { getRatingGuideQuestionsByJob } from "../RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getId, hasKey } from "../../helpers/queries";

const stateSlice = (state: RootState): RatingGuideAnswerState =>
  state.ratingGuideAnswer;

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

export const getRatingGuideAnswers = (state: RootState): RatingGuideAnswer[] =>
  Object.values(stateSlice(state).ratingGuideAnswers);

export const getTempRatingGuideAnswers = (
  state: RootState,
): TempRatingGuideAnswer[] => {
  return Object.values(stateSlice(state).tempRatingGuideAnswers);
};

export const getRatingGuideAnswersByJob = (
  state: RootState,
  jobId: number,
): RatingGuideAnswer[] => {
  const questionIds = getRatingGuideQuestionsByJob(state, jobId).map(getId);
  return getCurrentRatingGuideAnswers(state).filter(
    (answer): boolean => questionIds.includes(answer.rating_guide_question_id),
  );
};

export const getRatingGuideAnswerById = (
  state: RootState,
  id: number,
): RatingGuideAnswer | null =>
  hasKey(stateSlice(state).ratingGuideAnswers, id)
    ? stateSlice(state).ratingGuideAnswers[id]
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

export const getTempRatingGuideAnswersByQuestion = (
  state: RootState,
  ratingGuideQuestionId: number,
): TempRatingGuideAnswer[] =>
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
