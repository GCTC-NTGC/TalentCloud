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
  (state: RootState, props: { jobId: number }): number => props.jobId,
  (questions, jobId): RatingGuideQuestion[] =>
    questions.filter((question): boolean => question.job_poster_id === jobId),
)((state, props): number => props.jobId);

export const getRatingGuideQuestionIdsByJob = createCachedSelector(
  getRatingGuideQuestionsByJob,
  (questions): number[] => questions.map(getId),
)((state, props): number => props.jobId);

export const getRatingGuideQuestionsByJobAndAssessmentType = createCachedSelector(
  getCurrentRatingGuideQuestions,
  (
    state: RootState,
    props: { jobId: number; assessmentTypeId: number },
  ): number => props.jobId,
  (
    state: RootState,
    props: { jobId: number; assessmentTypeId: number },
  ): number => props.assessmentTypeId,
  (questions, jobId, assessmentTypeId): RatingGuideQuestion[] =>
    questions.filter(
      (question): boolean =>
        question.job_poster_id === jobId &&
        question.assessment_type_id === assessmentTypeId,
    ),
)((state, props): string => `${props.jobId} ${props.assessmentTypeId}`);

export const getRatingGuideQuestionIdsByJobAndAssessmentType = createCachedSelector(
  getRatingGuideQuestionsByJobAndAssessmentType,
  (questions): number[] => questions.map(getId),
)((state, props): string => `${props.jobId} ${props.assessmentTypeId}`);

export const getTempRatingGuideQuestionsByAssessment = createCachedSelector(
  getTempRatingGuideQuestions,
  (
    state: RootState,
    props: { jobId: number; assessmentTypeId: number },
  ): number => props.jobId,
  (
    state: RootState,
    props: { jobId: number; assessmentTypeId: number },
  ): number => props.assessmentTypeId,
  (questions, jobId, assessmentTypeId): RatingGuideQuestion[] =>
    questions.filter(
      (question): boolean =>
        question.job_poster_id === jobId &&
        question.assessment_type_id === assessmentTypeId,
    ),
)((state, props): string => `${props.jobId} ${props.assessmentTypeId}`);

export const getTempRatingGuideQuestionIdsByAssessment = createCachedSelector(
  getTempRatingGuideQuestionsByAssessment,

  (questions): number[] => questions.map(getId),
)((state, props): string => `${props.jobId} ${props.assessmentTypeId}`);

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
)((state: RootState, id: number): number => id);

export const ratingGuideQuestionsAreEditedByAssessment = createCachedSelector(
  getRatingGuideQuestionIdsByJobAndAssessmentType,
  getCanonQuestionState,
  getEditedQuestionState,
  (questionIds, canonState, editedState): { [id: number]: boolean } =>
    mapToObjectTrans(
      questionIds,
      (id): number => id,
      (questionId): boolean => {
        const canon = hasKey(canonState, questionId)
          ? canonState[questionId]
          : null;
        const edited = hasKey(editedState, questionId)
          ? editedState[questionId]
          : null;
        return edited !== null && !isEqual(edited, canon);
      },
    ),
)((state, props): string => `${props.jobId}:${props.assessmentTypeId}`);

export const tempRatingGuideQuestionIsSaving = createCachedSelector(
  getTempQuestionSaving,
  (state: RootState, id: number): number => id,
  (tempSaving, id): boolean =>
    hasKey(tempSaving, id) ? tempSaving[id] : false,
)((state: RootState, id: number): number => id);

export const tempRatingGuideQuestionsAreSavingByAssessment = createCachedSelector(
  getTempRatingGuideQuestionIdsByAssessment,
  getTempQuestionSaving,
  (questionIds, savingState): { [id: number]: boolean } =>
    mapToObjectTrans(
      questionIds,
      (id): number => id,
      (questionId): boolean =>
        hasKey(savingState, questionId) ? savingState[questionId] : false,
    ),
)((state, props): string => `${props.jobId}:${props.assessmentTypeId}`);

export const ratingGuideQuestionIsUpdating = createCachedSelector(
  getQuestionUpdates,
  (state: RootState, id: number): number => id,
  (updateCounts, id): boolean =>
    hasKey(updateCounts, id) ? updateCounts[id] > 0 : false,
)((state: RootState, id: number): number => id);

export const ratingGuideQuestionsAreUpdatingByAssessment = createCachedSelector(
  getRatingGuideQuestionIdsByJobAndAssessmentType,
  getQuestionUpdates,
  (questionIds, updateCounts): { [id: number]: boolean } =>
    questionIds.reduce(
      (
        result: { [id: number]: boolean },
        questionId: number,
      ): { [id: number]: boolean } => {
        // eslint-disable-next-line no-param-reassign
        result[questionId] = hasKey(updateCounts, questionId)
          ? updateCounts[questionId] > 0
          : false;
        return result;
      },
      {},
    ),
)((state, jobId, assessmentTypeId): string => `${jobId} ${assessmentTypeId}`);
