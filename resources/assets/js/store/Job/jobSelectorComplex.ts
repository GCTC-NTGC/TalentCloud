import createCachedSelector from "re-reselect";
import { uniq, difference, intersection } from "lodash";
import { createSelector } from "reselect";
import {
  getCriteriaById,
  getCriteriaIdsByJob,
  getCriteriaState,
  getCriteria,
} from "./jobSelector";
import {
  getRatingGuideAnswersByAssessment,
  getCurrentRatingGuideAnswers,
  getTempRatingGuideAnswers,
} from "../RatingGuideAnswer/ratingGuideAnswerSelectors";
import {
  RatingGuideAnswer,
  RatingGuideQuestion,
  Criteria,
  Skill,
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
import {
  hasKey,
  notEmpty,
  mapToObjectTrans,
  getId,
} from "../../helpers/queries";
import { getSkillState } from "../Skill/skillSelector";

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
  getCriteriaIdsByJobAndAssessmentType,
  getCriteriaState,
  (criteriaIds: number[], criteriaState): Criteria[] =>
    criteriaIds
      .map(
        (id: number): Criteria | null =>
          hasKey(criteriaState, id) ? criteriaState[id] : null,
      )
      .filter(notEmpty),
)(
  (state, props): string =>
    `${props.assessmentTypeId}:${props.assessmentTypeId}`,
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
  getCurrentAssessments,
  getCriteriaState,
  getCurrentRatingGuideAnswers,
  getTempRatingGuideAnswers,
  (
    currentQuestion,
    tempQuestion,
    isTempQuestion,
    assessments,
    criteriaState,
    answers,
    tempAnswers,
  ): Criteria[] => {
    const question = isTempQuestion ? tempQuestion : currentQuestion;
    if (question === null) {
      return [];
    }
    // All the assessments this question may test - BUT FROM ANY JOB
    const questionTypeAssessments = assessments.filter(
      (assessment): boolean =>
        assessment.assessment_type_id === question.assessment_type_id,
    );

    // All the criteria this question may test -
    const assessmentCriteria: Criteria[] = questionTypeAssessments
      .map(
        (assessment): Criteria | null =>
          hasKey(criteriaState, assessment.criterion_id)
            ? criteriaState[assessment.criterion_id]
            : null,
      )
      .filter(notEmpty)
      .filter(
        (criterion): boolean =>
          criterion.job_poster_id === question.job_poster_id,
      );

    const questionCurrentAnswers = answers.filter(
      (answer): boolean => answer.rating_guide_question_id === question.id,
    );
    const questionTempAnswers = tempAnswers.filter(
      (answer): boolean => answer.rating_guide_question_id === question.id,
    );

    // All the current answers to this question
    const questionAnswers = questionCurrentAnswers.concat(questionTempAnswers);

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
  getCriteriaIdsUnansweredForAssessmentType,
  getCriteriaState,
  (criteriaIds: number[], criteriaState): Criteria[] =>
    criteriaIds
      .map(
        (id: number): Criteria | null =>
          hasKey(criteriaState, id) ? criteriaState[id] : null,
      )
      .filter(notEmpty),
)(
  (state, props): string =>
    `${props.assessmentTypeId} ${props.assessmentTypeId}`,
);

export const getCriteriaToSkills = createSelector(
  getSkillState,
  getCriteria,
  (skillState, criteria): { [criteriaId: number]: Skill | null } =>
    mapToObjectTrans(
      criteria,
      getId,
      (criterion): Skill | null =>
        hasKey(skillState, criterion.skill_id)
          ? skillState[criterion.skill_id]
          : null,
    ),
);
