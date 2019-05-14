import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "../createAction";
import {
  RatingGuideAnswer,
  RatingGuideQuestion,
  Assessment,
} from "../../models/types";
import { getAssessmentPlan } from "../../api/assessmentPlan";
import { FailedAction } from "../asyncAction";

/**
 * NOTE: There is no AssessmentPlan Reducer.
 * These actions are meant to be processed by several different reducers.
 */

export const FETCH_ASSESSMENT_PLAN_STARTED = "FETCH_ASSESSMENT_PLAN_STARTED";
export const FETCH_ASSESSMENT_PLAN_SUCCEEEDED =
  "FETCH_ASSESSMENT_PLAN_SUCCEEDED";
export const FETCH_ASSESSMENT_PLAN_FAILED = "FETCH_ASSESSMENT_PLAN_FAILED";

export type FetchAssessmentPlanStartedAction = Action<
  typeof FETCH_ASSESSMENT_PLAN_STARTED,
  { jobId: number }
>;

export type FetchAssessmentPlanSucceededAction = Action<
  typeof FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  {
    jobId: number;
    assessments: Assessment[];
    ratingGuideQuestions: RatingGuideQuestion[];
    ratingGuideAnswers: RatingGuideAnswer[];
  }
>;

export type FetchAssessmentPlanFailedAction = FailedAction<
  typeof FETCH_ASSESSMENT_PLAN_FAILED,
  { jobId: number }
>;

export const fetchAssessmentPlanStarted = (
  jobId: number,
): FetchAssessmentPlanStartedAction => {
  return {
    type: FETCH_ASSESSMENT_PLAN_STARTED,
    payload: {
      jobId,
    },
  };
};

export const fetchAssessmentPlanSucceeded = (
  jobId: number,
  assessments: Assessment[],
  ratingGuideQuestions: RatingGuideQuestion[],
  ratingGuideAnswers: RatingGuideAnswer[],
): FetchAssessmentPlanSucceededAction => {
  return {
    type: FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
    payload: {
      jobId,
      assessments,
      ratingGuideQuestions,
      ratingGuideAnswers,
    },
  };
};

export const fetchAssessmentPlanFailed = (
  jobId: number,
  error: Error,
): FetchAssessmentPlanFailedAction => ({
  type: FETCH_ASSESSMENT_PLAN_FAILED,
  payload: error,
  meta: { jobId },
  error: true,
});

export const fetchAssessmentPlan = (
  jobId: number,
): ThunkAction<void, {}, {}, AssessmentPlanAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AssessmentPlanAction>): void => {
    dispatch(fetchAssessmentPlanStarted(jobId));
    getAssessmentPlan(jobId)
      .then(
        ({ assessments, questions, answers }): void => {
          dispatch(
            fetchAssessmentPlanSucceeded(
              jobId,
              assessments,
              questions,
              answers,
            ),
          );
        },
      )
      .catch(
        (error): void => {
          dispatch(fetchAssessmentPlanFailed(jobId, error));
        },
      );
  };
};

export type AssessmentPlanAction =
  | FetchAssessmentPlanStartedAction
  | FetchAssessmentPlanSucceededAction
  | FetchAssessmentPlanFailedAction;
