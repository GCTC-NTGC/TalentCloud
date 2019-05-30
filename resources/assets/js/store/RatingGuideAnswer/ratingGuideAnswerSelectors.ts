import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { isEqual } from "lodash";
import { RootState } from "../store";
import { RatingGuideAnswerState } from "./ratingGuideAnswerReducer";
import { RatingGuideAnswer } from "../../models/types";
import {
  getRatingGuideQuestionIdsByJob,
  getRatingGuideQuestionIdsByJobAndAssessmentType,
} from "../RatingGuideQuestion/ratingGuideQuestionSelectors";
import { hasKey, getId } from "../../helpers/queries";
import { deepEqualSelectorOptions } from "../cachedSelectors";

const stateSlice = (state: RootState): RatingGuideAnswerState =>
  state.ratingGuideAnswer;

export const getCanonAnswerState = (
  state: RootState,
): { [id: number]: RatingGuideAnswer } => stateSlice(state).ratingGuideAnswers;

export const getEditedAnswerState = (
  state: RootState,
): { [id: number]: RatingGuideAnswer } =>
  stateSlice(state).editedRatingGuideAnswers;

export const getTempAnswerState = (
  state: RootState,
): { [id: number]: RatingGuideAnswer } =>
  stateSlice(state).tempRatingGuideAnswers;

export const getCurrentAnswerState = createSelector(
  getCanonAnswerState,
  getEditedAnswerState,
  (canon, edited): { [id: number]: RatingGuideAnswer } => ({
    ...canon,
    ...edited,
  }),
);

export const getAnswerDeleteState = (
  state: RootState,
): { [id: number]: number } => stateSlice(state).ratingGuideAnswerDeletes;

/**
 * Returns current verisons of all answers.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getCurrentRatingGuideAnswers = createSelector(
  getCurrentAnswerState,
  getAnswerDeleteState,
  (currentRatingGuideAnswers, deleteCount): RatingGuideAnswer[] =>
    Object.values(currentRatingGuideAnswers).filter(
      (ratingGuideAnswer): boolean =>
        !hasKey(deleteCount, ratingGuideAnswer.id) ||
        deleteCount[ratingGuideAnswer.id] <= 0,
    ),
);

export const getCanonRatingGuideAnswers = createSelector(
  getCanonAnswerState,
  (answerState): RatingGuideAnswer[] => Object.values(answerState),
);

export const getTempRatingGuideAnswers = createSelector(
  getTempAnswerState,
  (answerState): RatingGuideAnswer[] => Object.values(answerState),
);

/**
 * Returns current verisons of all answers.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getRatingGuideAnswersByJob = createCachedSelector(
  getCurrentRatingGuideAnswers,
  getRatingGuideQuestionIdsByJob,
  (answers, jobQuestionIds): RatingGuideAnswer[] =>
    answers.filter(
      (answer): boolean =>
        jobQuestionIds.includes(answer.rating_guide_question_id),
    ),
)((state, props): number => props.jobId);

/**
 * Returns current verison of answer, ie edited version if possible.
 */
export const getRatingGuideAnswerById = createCachedSelector(
  getCurrentAnswerState,
  (state: RootState, props: { answerId: number }): number => props.answerId,
  (answerState, id): RatingGuideAnswer | null =>
    hasKey(answerState, id) ? answerState[id] : null,
)((state, props): number => props.answerId);

export const getTempRatingGuideAnswerById = createCachedSelector(
  getTempAnswerState,
  (state: RootState, props: { answerId: number }): number => props.answerId,
  (answerState, id): RatingGuideAnswer | null =>
    hasKey(answerState, id) ? answerState[id] : null,
)((state, props): number => props.answerId);

export const getRatingGuideAnswersByQuestion = createCachedSelector(
  getCurrentRatingGuideAnswers,
  (state: RootState, props: { questionId: number }): number => props.questionId,
  (answers, questionId): RatingGuideAnswer[] =>
    answers.filter(
      (answer): boolean => answer.rating_guide_question_id === questionId,
    ),
)((state, props): number => props.questionId);

export const getRatingGuideAnswerIdsByQuestion = createCachedSelector(
  (state: RootState, props: { questionId: number }): number[] =>
    getRatingGuideAnswersByQuestion(state, props).map(getId),
  (answerIds): number[] => answerIds,
)((state, props): number => props.questionId, deepEqualSelectorOptions);

// TODO: rename to ByAssessmentType
export const getRatingGuideAnswersByAssessment = createCachedSelector(
  getRatingGuideQuestionIdsByJobAndAssessmentType,
  getCurrentRatingGuideAnswers, // This is here to refresh the cache when answers change
  (questionIds, answers): RatingGuideAnswer[] =>
    answers.filter(
      (answer): boolean =>
        questionIds.includes(answer.rating_guide_question_id),
    ),
)((state, props): string => `${props.jobId} ${props.assessmentTypeId}`);

export const getTempRatingGuideAnswersByQuestion = createCachedSelector(
  getTempRatingGuideAnswers,
  (state: RootState, props: { questionId: number }): number => props.questionId,
  (answers, questionId): RatingGuideAnswer[] =>
    answers.filter(
      (answer): boolean => answer.rating_guide_question_id === questionId,
    ),
)((state, props): number => props.questionId);

export const getTempRatingGuideAnswerIdsByQuestion = createCachedSelector(
  (state: RootState, props: { questionId: number }): number[] =>
    getTempRatingGuideAnswersByQuestion(state, props).map(getId),
  (answerIds): number[] => answerIds,
)((state, props): number => props.questionId, deepEqualSelectorOptions);

export const getCanonRatingGuideAnswerById = createCachedSelector(
  getCanonAnswerState,
  (state: RootState, props: { answerId: number }): number => props.answerId,
  (answerState, answerId): RatingGuideAnswer | null =>
    hasKey(answerState, answerId) ? answerState[answerId] : null,
)((state, props): number => props.answerId);

export const getEditRatingGuideAnswerById = createCachedSelector(
  getEditedAnswerState,
  (state: RootState, props: { answerId: number }): number => props.answerId,
  (answerState, answerId): RatingGuideAnswer | null =>
    hasKey(answerState, answerId) ? answerState[answerId] : null,
)((state, props): number => props.answerId);

/** Returns true if there is an edited verision which differs from canonical version */
export const ratingGuideAnswerIsEdited = createCachedSelector(
  getCanonRatingGuideAnswerById,
  getEditRatingGuideAnswerById,
  (canon, edited): boolean => edited !== null && !isEqual(edited, canon),
)((state, props): number => props.answerId);

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
