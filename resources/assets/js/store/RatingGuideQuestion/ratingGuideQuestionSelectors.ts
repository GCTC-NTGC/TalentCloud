import isEqual from "lodash/isEqual";
import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { RootState } from "../store";
import { RatingGuideQuestionState } from "./ratingGuideQuestionReducer";
import { RatingGuideQuestion } from "../../models/types";
import { getId, hasKey, mapToObjectTrans } from "../../helpers/queries";

const stateSlice = (state: RootState): RatingGuideQuestionState =>
  state.ratingGuideQuestion;

const getCanonQuestionState = (
  state: RootState,
): { [id: number]: RatingGuideQuestion } =>
  stateSlice(state).ratingGuideQuestions;

const getTempQuestionState = (
  state: RootState,
): { [id: number]: RatingGuideQuestion } =>
  stateSlice(state).tempRatingGuideQuestions;

const getEditedQuestionState = (
  state: RootState,
): { [id: number]: RatingGuideQuestion } =>
  stateSlice(state).editedRatingGuideQuestions;

const getQuestionDeletes = (state: RootState): { [id: number]: number } =>
  stateSlice(state).ratingGuideQuestionDeletes;

const getTempQuestionSaving = (state: RootState): { [id: number]: boolean } =>
  stateSlice(state).tempRatingGuideQuestionSaving;

const getQuestionUpdates = (state: RootState): { [id: number]: number } =>
  stateSlice(state).ratingGuideQuestionUpdates;

const getCurrentQuestionState = createSelector(
  getCanonQuestionState,
  getEditedQuestionState,
  (canonQuestions, editedQuestions): { [id: number]: RatingGuideQuestion } => ({
    ...canonQuestions,
    ...editedQuestions,
  }),
);

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getCurrentRatingGuideQuestions = createSelector(
  [getCanonQuestionState, getEditedQuestionState, getQuestionDeletes],
  (questionState, editedQuestionState, deleteCount): RatingGuideQuestion[] => {
    const currentRatingGuideQuestions = {
      ...questionState,
      ...editedQuestionState,
    };
    return Object.values(currentRatingGuideQuestions).filter(
      (ratingGuideQuestion): boolean =>
        !hasKey(deleteCount, ratingGuideQuestion.id) ||
        deleteCount[ratingGuideQuestion.id] <= 0,
    );
  },
);

export const getTempRatingGuideQuestions = createSelector(
  getTempQuestionState,
  (tempQuestionState): RatingGuideQuestion[] =>
    Object.values(tempQuestionState),
);

export const getRatingGuideQuestionIds = createSelector(
  getCurrentQuestionState,
  (currentQuestions): number[] =>
    Object.keys(currentQuestions).map(id => Number(id)),
);

export const getTempRatingGuideQuestionIds = createSelector(
  getTempQuestionState,
  (tempQuestions): number[] => Object.keys(tempQuestions).map(id => Number(id)),
);

/**
 * Returns edited version, if available
 * */
export const getCurrentRatingGuideQuestionById = createSelector(
  getCurrentQuestionState,
  (state: RootState, id: number) => id,
  (questions, id): RatingGuideQuestion | null =>
    hasKey(questions, id) ? questions[id] : null,
);

export const getCanonRatingGuideQuestionById = createCachedSelector(
  getCanonQuestionState,
  (state: RootState, id: number): number => id,
  (questions, id): RatingGuideQuestion | null =>
    hasKey(questions, id) ? questions[id] : null,
)((state, id) => id);

export const getEditRatingGuideQuestionById = createCachedSelector(
  getEditedQuestionState,
  (state: RootState, id: number): number => id,
  (questions, id): RatingGuideQuestion | null =>
    hasKey(questions, id) ? questions[id] : null,
)((state, id) => id);

export const getTempRatingGuideQuestionById = createCachedSelector(
  getTempQuestionState,
  (state: RootState, id: number): number => id,
  (questions, id): RatingGuideQuestion | null =>
    hasKey(questions, id) ? questions[id] : null,
)((state, id) => id);

export const getRatingGuideQuestionsByJob = createCachedSelector(
  getCurrentRatingGuideQuestions,
  (state: RootState, jobId: number): number => jobId,
  (questions, jobId): RatingGuideQuestion[] =>
    questions.filter((question): boolean => question.job_poster_id === jobId),
)((state, jobId) => jobId);

export const getRatingGuideQuestionsByAssessment = createCachedSelector(
  getCurrentRatingGuideQuestions,
  (state: RootState, jobId: number, assessmentTypeId: number): number => jobId,
  (state: RootState, jobId: number, assessmentTypeId: number): number =>
    assessmentTypeId,
  (questions, jobId, assessmentTypeId): RatingGuideQuestion[] =>
    questions.filter(
      (question): boolean =>
        question.job_poster_id === jobId &&
        question.assessment_type_id === assessmentTypeId,
    ),
)((state, jobId, assessmentTypeId) => `${jobId} ${assessmentTypeId}`);

export const getTempRatingGuideQuestionsByAssessment = createCachedSelector(
  getTempRatingGuideQuestions,
  (state: RootState, jobId: number, assessmentTypeId: number): number => jobId,
  (state: RootState, jobId: number, assessmentTypeId: number): number =>
    assessmentTypeId,
  (questions, jobId, assessmentTypeId): RatingGuideQuestion[] =>
    questions.filter(
      (question): boolean =>
        question.job_poster_id === jobId &&
        question.assessment_type_id === assessmentTypeId,
    ),
)((state, assessmentTypeId) => assessmentTypeId);

// TODO: test that this works like I think it does -- Tristan
/** Returns true if there is an edited verision which differs from canonical version */
export const ratingGuideQuestionIsEdited = createCachedSelector(
  getCanonRatingGuideQuestionById,
  getEditRatingGuideQuestionById,
  (canon, edited): boolean => {
    if (canon === null) {
      return true;
    }
    return edited !== null && !isEqual(edited, canon);
  },
)((state: RootState, id: number) => id);

export const ratingGuideQuestionsAreEditedByAssessment = createCachedSelector(
  (state: RootState) => state,
  getRatingGuideQuestionsByAssessment,
  (state, questions): { [id: number]: boolean } =>
    mapToObjectTrans(
      questions,
      getId,
      (ratingGuideQuestion): boolean =>
        ratingGuideQuestionIsEdited(state, ratingGuideQuestion.id),
    ),
)(
  (state: RootState, jobId: number, assessmentTypeId: number) =>
    `${jobId} ${assessmentTypeId}`,
);

export const tempRatingGuideQuestionIsSaving = createCachedSelector(
  getTempQuestionSaving,
  (state: RootState, id: number) => id,
  (tempSaving, id): boolean =>
    hasKey(tempSaving, id) ? tempSaving[id] : false,
)((state: RootState, id: number) => id);

export const tempRatingGuideQuestionsAreSavingByAssessment = createCachedSelector(
  (state: RootState) => state,
  getTempRatingGuideQuestionsByAssessment,
  (state, questions) =>
    mapToObjectTrans(
      questions,
      getId,
      (ratingGuideQuestion: RatingGuideQuestion): boolean =>
        tempRatingGuideQuestionIsSaving(state, ratingGuideQuestion.id),
    ),
)(
  (state: RootState, jobId: number, assessmentTypeId: number) =>
    `${jobId} ${assessmentTypeId}`,
);

export const ratingGuideQuestionIsUpdating = createCachedSelector(
  getQuestionUpdates,
  (state: RootState, id: number) => id,
  (updateCounts, id): boolean =>
    hasKey(updateCounts, id) ? updateCounts[id] > 0 : false,
)((state: RootState, id: number) => id);

export const ratingGuideQuestionsAreUpdatingByAssessment = createCachedSelector(
  (state: RootState) => state,
  getRatingGuideQuestionsByAssessment,
  (state, questions) =>
    questions.reduce(
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
    ),
)((state, jobId, assessmentTypeId) => `${jobId} ${assessmentTypeId}`);
