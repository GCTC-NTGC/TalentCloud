import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Action } from "../createAction";
import {
  updateAssessment as updateAssessmentApi,
  createAssessment as createAssessmentApi,
  deleteAssessment as deleteAssessmentApi,
} from "../../api/assessment";
import { Assessment, TempAssessment } from "../../models/types";
import { FailedAction } from "../asyncAction";

/** Action for editing Assessments (without saving to server) */
export const EDIT_ASSESSMENT = "EDIT_ASSESSMENT";
export type EditAssessmentAction = Action<
  typeof EDIT_ASSESSMENT,
  { assessment: Assessment }
>;
export const editAssessment = (
  assessment: Assessment,
): EditAssessmentAction => ({
  type: EDIT_ASSESSMENT,
  payload: { assessment },
});

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

/** Updating Assessments on Server */

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
export type UpdateAssessmentFailedAction = FailedAction<
  typeof UPDATE_ASSESSMENT_FAILED,
  Assessment
>;

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
  payload: error,
  meta: assessment,
  error: true,
});
export const updateAssessment = (
  assessment: Assessment,
): ThunkAction<void, any, any, AssessmentAction> => {
  return (dispatch: ThunkDispatch<any, undefined, AssessmentAction>): void => {
    dispatch(updateAssessmentStarted(assessment));
    updateAssessmentApi(assessment)
      .then((updatedAssessment): void => {
        dispatch(updateAssessmentSucceeded(updatedAssessment));
      })
      .catch((error: Error): void => {
        dispatch(updateAssessmentFailed(assessment, error));
      });
  };
};

/** Deleting Assessments on server */

export const DELETE_ASSESSMENT_STARTED = "DELETE_ASSESSMENT_STARTED";
export const DELETE_ASSESSMENT_SUCCEEDED = "DELETE_ASSESSMENT_SUCCEEDED";
export const DELETE_ASSESSMENT_FAILED = "DELETE_ASSESSMENT_FAILED";

export type DeleteAssessmentStartedAction = Action<
  typeof DELETE_ASSESSMENT_STARTED,
  { id: number }
>;
export type DeleteAssessmentSucceededAction = Action<
  typeof DELETE_ASSESSMENT_SUCCEEDED,
  { id: number }
>;
export type DeleteAssessmentFailedAction = FailedAction<
  typeof DELETE_ASSESSMENT_FAILED,
  { id: number }
>;

export const deleteAssessmentStarted = (
  id: number,
): DeleteAssessmentStartedAction => {
  return {
    type: DELETE_ASSESSMENT_STARTED,
    payload: {
      id,
    },
  };
};
export const deleteAssessmentSucceeded = (
  id: number,
): DeleteAssessmentSucceededAction => {
  return {
    type: DELETE_ASSESSMENT_SUCCEEDED,
    payload: {
      id,
    },
  };
};
export const deleteAssessmentFailed = (
  id: number,
  error: Error,
): DeleteAssessmentFailedAction => ({
  type: DELETE_ASSESSMENT_FAILED,
  payload: error,
  meta: { id },
  error: true,
});
export const deleteAssessment = (
  id: number,
): ThunkAction<void, any, any, AssessmentAction> => {
  return (dispatch: ThunkDispatch<any, undefined, AssessmentAction>): void => {
    dispatch(deleteAssessmentStarted(id));
    deleteAssessmentApi(id)
      .then((): void => {
        dispatch(deleteAssessmentSucceeded(id));
      })
      .catch((error: Error): void => {
        dispatch(deleteAssessmentFailed(id, error));
      });
  };
};

/** Actions for saving a NEW assessment to server */
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
export type StoreNewAssessmentFailedAction = FailedAction<
  typeof STORE_NEW_ASSESSMENT_FAILED,
  Assessment
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
  payload: error,
  meta: oldAssessment,
  error: true,
});
export const storeNewAssessment = (
  assessment: Assessment,
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch(storeNewAssessmentStarted(assessment));
    createAssessmentApi(assessment)
      .then((updatedAssessment): void => {
        dispatch(storeNewAssessmentSucceeded(updatedAssessment, assessment));
      })
      .catch((error: Error): void => {
        dispatch(storeNewAssessmentFailed(assessment, error));
      });
  };
};

export type AssessmentAction =
  | EditAssessmentAction
  | UpdateAssessmentStartedAction
  | UpdateAssessmentSucceededAction
  | UpdateAssessmentFailedAction
  | DeleteAssessmentStartedAction
  | DeleteAssessmentSucceededAction
  | DeleteAssessmentFailedAction
  | CreateTempAssessmentAction
  | EditTempAssessmentAction
  | DeleteTempAssessmentAction
  | StoreNewAssessmentStartedAction
  | StoreNewAssessmentSucceededAction
  | StoreNewAssessmentFailedAction;
