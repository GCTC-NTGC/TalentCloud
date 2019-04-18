import { RootState } from "../store";
import {
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
} from "../../models/types";
import { getCriteriaByJob } from "../Job/jobSelector";
import { getId, hasKey } from "../../helpers/queries";
import { AssessmentState } from "./assessmentReducer";

const stateSlice = (state: RootState): AssessmentState => state.assessment;

export const getAssessments = (state: RootState): Assessment[] =>
  Object.values(stateSlice(state).assessments);

export const getAssessmentsByJob = (
  state: RootState,
  jobId: number,
): Assessment[] => {
  const criteriaIds = getCriteriaByJob(state, jobId).map(getId);
  return getAssessments(state).filter(
    (assessment): boolean => criteriaIds.includes(assessment.criterion_id),
  );
};

export const getAssessmentsByCriterion = (
  state: RootState,
  criterionId: number,
): Assessment[] =>
  getAssessments(state).filter(
    (assessment): boolean => assessment.criterion_id === criterionId,
  );

export const getAssessmentById = (
  state: RootState,
  id: number,
): Assessment | null =>
  hasKey(stateSlice(state).assessments, id)
    ? stateSlice(state).assessments[id]
    : null;

export const assessmentIsUpdating = (state: RootState, id: number): boolean =>
  hasKey(stateSlice(state).assessmentUpdating, id)
    ? stateSlice(state).assessmentUpdating[id]
    : false;

export const getRatingsGuideQuestions = (
  state: RootState,
): RatingsGuideQuestion[] =>
  Object.values(stateSlice(state).ratingsGuideQuestions);

export const getRatingsGuideQuestionsByJob = (
  state: RootState,
  jobId: number,
): RatingsGuideQuestion[] => {
  return getRatingsGuideQuestions(state).filter(
    (question): boolean => question.job_poster_id === jobId,
  );
};

export const getRatingsGuideAnswers = (
  state: RootState,
): RatingsGuideAnswer[] => Object.values(stateSlice(state).ratingsGuideAnswers);

export const getRatingsGuideAnswersByJob = (
  state: RootState,
  jobId: number,
): RatingsGuideAnswer[] => {
  const questionIds = getRatingsGuideQuestionsByJob(state, jobId).map(getId);
  return getRatingsGuideAnswers(state).filter(
    (answer): boolean => questionIds.includes(answer.rating_guide_question_id),
  );
};
