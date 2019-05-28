import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { uniq, difference } from "lodash";
import { RootState } from "../store";
import {
  Job,
  Criteria,
  Assessment,
  RatingGuideAnswer,
  RatingGuideQuestion,
} from "../../models/types";
import { hasKey } from "../../helpers/queries";
import { EntityState, UiState } from "./jobReducer";
import {
  getCurrentRatingGuideQuestionById,
  getTempRatingGuideQuestionById,
} from "../RatingGuideQuestion/ratingGuideQuestionSelectors";
import {
  getAssessmentsByType,
  getAssessmentsByJob,
  getCurrentAssessments,
} from "../Assessment/assessmentSelector";
import {
  getRatingGuideAnswersByQuestion,
  getTempRatingGuideAnswersByQuestion,
  getRatingGuideAnswersByAssessment,
  getCurrentRatingGuideAnswers,
} from "../RatingGuideAnswer/ratingGuideAnswerSelectors";

const entities = (state: RootState): EntityState => state.jobs.entities;
const ui = (state: RootState): UiState => state.jobs.ui;

const getJobState = (state: RootState): { [id: number]: Job } =>
  entities(state).jobs.byId;

const getJobUpdatingState = (state: RootState): { [id: number]: boolean } =>
  ui(state).jobUpdating;

const getCriteriaState = (state: RootState): { [id: number]: Criteria } =>
  entities(state).criteria.byId;

export const getJob = createCachedSelector(
  getJobState,
  (state: RootState, ownProps: { jobId: number }): number => ownProps.jobId,
  (jobState, jobId): Job | null =>
    hasKey(jobState, jobId) ? jobState[jobId] : null,
)((state, ownProps): number => ownProps.jobId);

export const getJobIsLoading = (state: RootState, id: number): boolean => {
  const updating = getJobUpdatingState(state);
  return hasKey(updating, id) ? updating[id] : false;
};

export const getCriteria = createSelector(
  getCriteriaState,
  (criteriaState): Criteria[] => Object.values(criteriaState),
);

export const getCriteriaById = (
  state: RootState,
  id: number,
): Criteria | null =>
  hasKey(entities(state).criteria.byId, id)
    ? entities(state).criteria.byId[id]
    : null;

export const getCriteriaByJob = createCachedSelector(
  getCriteria,
  (state: RootState, ownProps: { jobId: number }): number => ownProps.jobId,
  (criteria, jobId: number): Criteria[] =>
    criteria.filter((criterion): boolean => criterion.job_poster_id === jobId),
)((state, ownProps): number => ownProps.jobId);

export const getCriteriaIdsByJobAndAssessmentType = createCachedSelector(
  getAssessmentsByType,
  (assessments: Assessment[]): number[] =>
    assessments.map(
      (assessment: Assessment): number => assessment.criterion_id,
    ),
)(
  (state, props): string =>
    `${props.assessmentTypeId} ${props.assessmentTypeId}`,
);

export const getCriteriaByJobAndAssessmentType = createCachedSelector(
  (state): RootState => state,
  getCriteriaIdsByJobAndAssessmentType,
  (state, criteriaIds: number[]): Criteria[] =>
    criteriaIds
      .map((id: number): Criteria | null => getCriteriaById(state, id))
      .filter(
        (criterion: Criteria | null): boolean => criterion !== null,
      ) as Criteria[],
)(
  (state, props): string =>
    `${props.assessmentTypeId} ${props.assessmentTypeId}`,
);

/**
 * Select a job's Criteria associated with an assessmentType, that
 * don't have a matching RatingGuideAnswer yet.
 * @param state
 * @param questionId RatingGuideQuestion id
 */
export const getCriteriaIdsUnansweredForAssessmentType = createCachedSelector(
  getCriteriaIdsByJobAndAssessmentType,
  getRatingGuideAnswersByAssessment,
  (requiredCriteriaIds, assessmentAnswers): number[] => {
    const answeredCriteriaIds: number[] = uniq(assessmentAnswers
      .map((answer: RatingGuideAnswer): number | null => answer.criterion_id)
      .filter((id): boolean => id !== null) as number[]);
    return difference(requiredCriteriaIds, answeredCriteriaIds);
  },
)(
  (state, props): string =>
    `${props.assessmentTypeId} ${props.assessmentTypeId}`,
);

export const getCriteriaUnansweredForAssessmentType = createCachedSelector(
  (state): RootState => state,
  getCriteriaIdsUnansweredForAssessmentType,
  (state, criteriaIds: number[]): Criteria[] =>
    criteriaIds
      .map((id: number): Criteria | null => getCriteriaById(state, id))
      .filter(
        (criterion: Criteria | null): boolean => criterion !== null,
      ) as Criteria[],
)(
  (state, props): string =>
    `${props.assessmentTypeId} ${props.assessmentTypeId}`,
);

/**
 * Select all the Criteria associated with a RatingGuideQuestion's assessmentType, that
 * don't have a matching RatingGuideAnswer yet.
 */
export const getCriteriaUnansweredForQuestion = createCachedSelector(
  (state: RootState): RootState => state,
  (
    state: RootState,
    props: {
      questionId: number;
      isTempQuestion: boolean;
    },
  ): RatingGuideQuestion | null =>
    getCurrentRatingGuideQuestionById(state, props.questionId),
  (
    state: RootState,
    props: {
      questionId: number;
      isTempQuestion: boolean;
    },
  ): RatingGuideQuestion | null =>
    getTempRatingGuideQuestionById(state, props.questionId),
  (state, props: { questionId: number; isTempQuestion: boolean }): boolean =>
    props.isTempQuestion,
  getCurrentAssessments, // This is here to ensure cache refresh when assessments change
  getCriteriaState, // This is here to ensure cache refresh when criteria change
  getCurrentRatingGuideAnswers, // This is here to ensure cache refresh when answers change
  (state, currentQuestion, tempQuestion, isTempQuestion): Criteria[] => {
    const question = isTempQuestion ? tempQuestion : currentQuestion;
    if (question === null) {
      return [];
    }
    // All the assessments this question may test
    const questionAssessments = getAssessmentsByType(state, {
      jobId: question.job_poster_id,
      assessmentTypeId: question.assessment_type_id,
    });

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
  },
)((state, props): string => `${props.questionId} ${props.isTempQuestion}`);
