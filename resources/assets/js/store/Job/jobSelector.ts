import { RootState } from "../store";
import { Job, Criteria } from "../../models/types";
import { hasKey } from "../../helpers/queries";
import { EntityState, UiState } from "./jobReducer";
import {
  getCurrentRatingGuideQuestionById,
  getTempRatingGuideQuestionById,
} from "../RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getAssessmentsByType } from "../Assessment/assessmentSelector";
import {
  getRatingGuideAnswersByQuestion,
  getTempRatingGuideAnswersByQuestion,
} from "../RatingGuideAnswer/ratingGuideAnswerSelectors";

const entities = (state: RootState): EntityState => state.jobs.entities;
const ui = (state: RootState): UiState => state.jobs.ui;

export const getJob = (state: RootState, id: number): Job | null => {
  const jobs = entities(state).jobs.byId;
  return hasKey(jobs, id) ? jobs[id] : null;
};

export const getJobIsLoading = (state: RootState, id: number): boolean => {
  const updating = ui(state).jobUpdating;
  return hasKey(updating, id) ? updating[id] : false;
};

export const getCriteria = (state: RootState): Criteria[] =>
  Object.values(entities(state).criteria.byId);

export const getCriteriaById = (
  state: RootState,
  id: number,
): Criteria | null =>
  hasKey(entities(state).criteria.byId, id)
    ? entities(state).criteria.byId[id]
    : null;

export const getCriteriaByJob = (state: RootState, jobId: number): Criteria[] =>
  getCriteria(state).filter(
    (criteria): boolean => criteria.job_poster_id === jobId,
  );

/**
 * Select all the Criteria associated with a RatingGuideQuestion's assessmentType, that
 * don't have a matching RatingGuideAnswer yet.
 * @param state
 * @param questionId RatingGuideQuestion id
 */
export const getCriteriaUnansweredForQuestion = (
  state: RootState,
  questionId: number,
  tempQuestion = false,
): Criteria[] => {
  const question = tempQuestion
    ? getTempRatingGuideQuestionById(state, questionId)
    : getCurrentRatingGuideQuestionById(state, questionId);
  if (question === null) {
    return [];
  }
  // All the assessments this question may test
  const questionAssessments = getAssessmentsByType(
    state,
    question.assessment_type_id,
  );
  // All the criteria this question may test
  const assessmentCriteria: Criteria[] = questionAssessments
    .map(
      (assessment): Criteria | null =>
        getCriteriaById(state, assessment.criterion_id),
    )
    .filter((criterion): boolean => criterion !== null) as Criteria[];

  // All the current answers to this question
  const questionAnswers = [
    ...getRatingGuideAnswersByQuestion(state, question.id),
    ...getTempRatingGuideAnswersByQuestion(state, question.id),
  ];

  // The criteria already selected by an answer
  const selectedCriteriaIds: number[] = questionAnswers
    .map((a): number | null => a.criterion_id)
    .filter((id): boolean => id !== null) as number[];

  // Filter out already selected answers
  return assessmentCriteria.filter(
    (criterion): boolean => !selectedCriteriaIds.includes(criterion.id),
  );
};
