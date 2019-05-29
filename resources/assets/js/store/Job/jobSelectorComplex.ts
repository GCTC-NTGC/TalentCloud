import createCachedSelector from "re-reselect";

import { uniq, difference, intersection } from "lodash";
import {
  getCriteriaById,
  getCriteriaIdsByJob,
  getCriteriaState,
} from "./jobSelector";
import {
  getRatingGuideAnswersByAssessment,
  getCurrentRatingGuideAnswers,
  getRatingGuideAnswersByQuestion,
  getTempRatingGuideAnswersByQuestion,
} from "../RatingGuideAnswer/ratingGuideAnswerSelectors";
import {
  RatingGuideAnswer,
  RatingGuideQuestion,
  Criteria,
} from "../../models/types";
import { RootState } from "../store";
import {
  getCurrentRatingGuideQuestionById,
  getTempRatingGuideQuestionById,
} from "../RatingGuideQuestion/ratingGuideQuestionSelectors";
import {
  getCurrentAssessments,
  getAssessmentsByType,
} from "../Assessment/assessmentSelector";

/**
 * This file is for defining selectors that depend on selectors in other modules,
 * to avoid circular dependencies
 */

// CRITERIA SELECTORS

export const getCriteriaIdsByJobAndAssessmentType = createCachedSelector(
  getCriteriaIdsByJob,
  getAssessmentsByType,
  (jobCriteriaIds, assessments): number[] => {
    const assessmentCriteriaIds = assessments.map(
      (assessment): number => assessment.criterion_id,
    );
    return intersection(jobCriteriaIds, assessmentCriteriaIds);
  },
)((state, props): string => `${props.jobId}:${props.assessmentTypeId}`);

export const getCriteriaByJobAndAssessmentType = createCachedSelector(
  (state): RootState => state,
  getCriteriaIdsByJobAndAssessmentType,
  (state, criteriaIds: number[]): Criteria[] =>
    criteriaIds
      .map(
        (id: number): Criteria | null =>
          getCriteriaById(state, { criterionId: id }),
      )
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
    // All the assessments this question may test - BUT FROM ANY JOB
    const questionTypeAssessments = getAssessmentsByType(state, {
      assessmentTypeId: question.assessment_type_id,
    });

    // All the criteria this question may test
    const assessmentCriteria: Criteria[] = questionTypeAssessments
      .map(
        (assessment): Criteria | null =>
          getCriteriaById(state, { criterionId: assessment.criterion_id }),
      )
      .filter(
        (criterion): boolean =>
          criterion !== null &&
          criterion.job_poster_id === question.job_poster_id,
      ) as Criteria[];

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

export const getCriteriaUnansweredForAssessmentType = createCachedSelector(
  (state): RootState => state,
  getCriteriaIdsUnansweredForAssessmentType,
  (state, criteriaIds: number[]): Criteria[] =>
    criteriaIds
      .map(
        (id: number): Criteria | null =>
          getCriteriaById(state, { criterionId: id }),
      )
      .filter(
        (criterion: Criteria | null): boolean => criterion !== null,
      ) as Criteria[],
)(
  (state, props): string =>
    `${props.assessmentTypeId} ${props.assessmentTypeId}`,
);
