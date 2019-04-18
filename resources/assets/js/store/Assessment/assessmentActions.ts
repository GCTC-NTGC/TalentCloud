import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "../createAction";
import {
  getAssessmentPlan,
  updateAssessment as updateAssessmentApi,
} from "../../api/assessmentPlan";
import {
  RatingsGuideAnswer,
  RatingsGuideQuestion,
  Assessment,
} from "../../models/types";

/** Actions for Fetch All Assessment Plan items */

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
    ratingsGuideQuestions: RatingsGuideQuestion[];
    ratingsGuideAnswers: RatingsGuideAnswer[];
  }
>;

export type FetchAssessmentPlanFailedAction = Action<
  typeof FETCH_ASSESSMENT_PLAN_FAILED,
  { jobId: number; error: Error }
>;

/** Actions for Updating Assessment */
export const UPDATE_ASSESSMENT_STARTED = "UPDATE_ASSESSMENT_STARTED";
export const UPDATE_ASSESSMENT_SUCCEEDED = "UPDATE_ASSESSMENT_SUCCEEDED";
export const UPDATE_ASSESSMENT_FAILED = "UPDATE_ASSESSMENT_FAILED";

export type UpdateAssessmentStartedAction = Action<
  typeof UPDATE_ASSESSMENT_STARTED,
  { assessment: Assessment }
>;

export type UpdateAssessmentSucceededAction = Action<
  typeof UPDATE_ASSESSMENT_SUCCEEDED,
  { assessment: Assessment }
>;

export type UpdateAssessmentFailedAction = Action<
  typeof UPDATE_ASSESSMENT_FAILED,
  { assessment: Assessment; error: Error }
>;

/** Actions for manipulating Temp Assessments */
export const UPDATE_TEMP_ASSESSMENT = "UPDATE_TEMP_ASSESSMENT";
export const DELETE_TEMP_ASSESSMENT = "DELETE_TEMP_ASSESSMENT";

export type UpdateTempAssessmentAction = Action<
  typeof UPDATE_TEMP_ASSESSMENT,
  { assessment: Assessment }
>;

export type DeleteTempAssessmentAction = Action<
  typeof DELETE_TEMP_ASSESSMENT,
  { assessment: Assessment }
>;

export type AssessmentPlanAction =
  | FetchAssessmentPlanStartedAction
  | FetchAssessmentPlanSucceededAction
  | FetchAssessmentPlanFailedAction
  | UpdateAssessmentStartedAction
  | UpdateAssessmentSucceededAction
  | UpdateAssessmentFailedAction
  | UpdateTempAssessmentAction
  | DeleteTempAssessmentAction;

/** Fetching all Assessment Plan Items at once */

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
  ratingsGuideQuestions: RatingsGuideQuestion[],
  ratingsGuideAnswers: RatingsGuideAnswer[],
): FetchAssessmentPlanSucceededAction => {
  return {
    type: FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
    payload: {
      jobId,
      assessments,
      ratingsGuideQuestions,
      ratingsGuideAnswers,
    },
  };
};

export const fetchAssessmentPlanFailed = (
  jobId: number,
  error: Error,
): FetchAssessmentPlanFailedAction => ({
  type: FETCH_ASSESSMENT_PLAN_FAILED,
  payload: {
    jobId,
    error,
  },
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

/** Manipulating Temp Assessment */

export const updateTempAssessment = (
  assessment: Assessment,
): UpdateTempAssessmentAction => ({
  type: UPDATE_TEMP_ASSESSMENT,
  payload: { assessment },
});

export const deleteTempAssessment = (
  assessment: Assessment,
): DeleteTempAssessmentAction => ({
  type: DELETE_TEMP_ASSESSMENT,
  payload: { assessment },
});

/** Updating Assessment */

export const updateAssessmentStarted = (
  assessment: Assessment,
): UpdateAssessmentStartedAction => {
  return {
    type: UPDATE_ASSESSMENT_STARTED,
    payload: {
      assessment,
    },
  };
};

export const updateAssessmentSucceeded = (
  assessment: Assessment,
): UpdateAssessmentSucceededAction => {
  return {
    type: UPDATE_ASSESSMENT_SUCCEEDED,
    payload: {
      assessment,
    },
  };
};

export const updateAssessmentFailed = (
         assessment: Assessment,
         error: Error,
       ): UpdateAssessmentFailedAction => ({
         type: UPDATE_ASSESSMENT_FAILED,
         payload: {
           assessment,
           error,
         },
       });

export const updateAssessment = (
  assessment: Assessment,
): ThunkAction<void, any, any, AssessmentPlanAction> => {
  return (
    dispatch: ThunkDispatch<any, undefined, AssessmentPlanAction>,
  ): void => {
    dispatch(updateAssessmentStarted(assessment));
    updateAssessmentApi(assessment)
      .then(
        (updatedAssessment): void => {
          dispatch(updateAssessmentSucceeded(updatedAssessment));
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(updateAssessmentFailed(assessment, error));
        },
      );
  };
};
