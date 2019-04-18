import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Action } from "../createAction";
import { getAssessmentPlan } from "../../api/assessmentPlan";
import {
  updateAssessment as updateAssessmentApi,
  createAssessment as createAssessmentApi,
} from "../../api/assessment";
import {
  RatingsGuideAnswer,
  RatingsGuideQuestion,
  Assessment,
  TempAssessment,
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

/** Action for editing Assessments */
export const EDIT_ASSESSMENT = "EDIT_ASSESSMENT";

export type EditAssessmentAction = Action<
  typeof EDIT_ASSESSMENT,
  { assessment: Assessment }
>;

/** Actions for manipulating Temp Assessments */
export const CREATE_TEMP_ASSESSMENT = "CREATE_TEMP_ASSESSMENT";
export const EDIT_TEMP_ASSESSMENT = "EDIT_TEMP_ASSESSMENT";
export const DELETE_TEMP_ASSESSMENT = "DELETE_TEMP_ASSESSMENT";

export type CreateTempAssessmentAction = Action<
  typeof CREATE_TEMP_ASSESSMENT,
  { criterionId: number; assessmentTypeId: number | null }
>;

export type EditTempAssessmentAction = Action<
  typeof EDIT_TEMP_ASSESSMENT,
  { assessment: TempAssessment }
>;

export type DeleteTempAssessmentAction = Action<
  typeof DELETE_TEMP_ASSESSMENT,
  { id: number }
>;

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

/** Editing Assessments */
export const editAssessment = (
  assessment: Assessment,
): EditAssessmentAction => ({
  type: EDIT_ASSESSMENT,
  payload: { assessment },
});

/** Manipulating Temp Assessment */

export const createTempAssessment = (
  criterionId: number,
  assessmentTypeId: number | null,
): CreateTempAssessmentAction => ({
  type: CREATE_TEMP_ASSESSMENT,
  payload: { criterionId, assessmentTypeId },
});

export const editTempAssessment = (
  assessment: TempAssessment,
): EditTempAssessmentAction => ({
  type: EDIT_TEMP_ASSESSMENT,
  payload: { assessment },
});

export const deleteTempAssessment = (
  id: number,
): DeleteTempAssessmentAction => ({
  type: DELETE_TEMP_ASSESSMENT,
  payload: { id },
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

/** Actions for saving a new assessment to server */
export const STORE_NEW_ASSESSMENT_STARTED = "STORE_ASSESSMENT_STARTED";
export const STORE_NEW_ASSESSMENT_SUCCEEDED = "STORE_ASSESSMENT_SUCCEEDED";
export const STORE_NEW_ASSESSMENT_FAILED = "STORE_ASSESSMENT_FAILED";

export type StoreNewAssessmentStartedAction = Action<
  typeof STORE_NEW_ASSESSMENT_STARTED,
  { assessment: Assessment }
>;

export type StoreNewAssessmentSucceededAction = Action<
  typeof STORE_NEW_ASSESSMENT_SUCCEEDED,
  { assessment: Assessment; oldAssessment: Assessment }
>;

export type StoreNewAssessmentFailedAction = Action<
  typeof STORE_NEW_ASSESSMENT_FAILED,
  { oldAssessment: Assessment; error: Error }
>;

export const storeNewAssessmentStarted = (
  assessment: Assessment,
): StoreNewAssessmentStartedAction => {
  return {
    type: STORE_NEW_ASSESSMENT_STARTED,
    payload: {
      assessment,
    },
  };
};

export const storeNewAssessmentSucceeded = (
  assessment: Assessment,
  oldAssessment: Assessment,
): StoreNewAssessmentSucceededAction => {
  return {
    type: STORE_NEW_ASSESSMENT_SUCCEEDED,
    payload: {
      assessment,
      oldAssessment,
    },
  };
};

export const storeNewAssessmentFailed = (
  oldAssessment: Assessment,
  error: Error,
): StoreNewAssessmentFailedAction => ({
  type: STORE_NEW_ASSESSMENT_FAILED,
  payload: {
    oldAssessment,
    error,
  },
});

export const storeNewAssessment = (
  assessment: Assessment,
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch(storeNewAssessmentStarted(assessment));
    createAssessmentApi(assessment)
      .then(
        (updatedAssessment): void => {
          dispatch(storeNewAssessmentSucceeded(updatedAssessment, assessment));
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(storeNewAssessmentFailed(assessment, error));
        },
      );
  };
};

export type AssessmentPlanAction =
  | FetchAssessmentPlanStartedAction
  | FetchAssessmentPlanSucceededAction
  | FetchAssessmentPlanFailedAction
  | EditAssessmentAction
  | UpdateAssessmentStartedAction
  | UpdateAssessmentSucceededAction
  | UpdateAssessmentFailedAction
  | CreateTempAssessmentAction
  | EditTempAssessmentAction
  | DeleteTempAssessmentAction
  | StoreNewAssessmentStartedAction
  | StoreNewAssessmentSucceededAction
  | StoreNewAssessmentFailedAction;
