import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "../createAction";
import { AssessmentPlanNotification } from "../../models/types";
import {
  getAssessmentPlanNotificationsByJob,
  updateAssessmentPlanNotification as updateAssessmentPlanNotificationApi,
} from "../../api/assessmentPlanNotifications";

/** Fetcing all Assessment Plan Notifications for a job */

export const FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_STARTED =
  "FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_STARTED";
export const FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_SUCCEEDED =
  "FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_SUCCEEDED";
export const FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_FAILED =
  "FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_FAILED";

export type FetchAssessmentPlanNotificationStartedAction = Action<
  typeof FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_STARTED,
  {
    jobId: number;
  }
>;
export type FetchAssessmentPlanNotificationSucceededAction = Action<
  typeof FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_SUCCEEDED,
  AssessmentPlanNotification[]
>;
export type FetchAssessmentPlanNotificationFailedAction = Action<
  typeof FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_FAILED,
  {
    jobId: number;
    error: Error;
  }
>;

export const fetchAssessmentPlanNotifications = (
  jobId: number,
): ThunkAction<void, {}, {}, AssessmentPlanNotificationAction> => {
  return (
    dispatch: ThunkDispatch<{}, {}, AssessmentPlanNotificationAction>,
  ): void => {
    dispatch({
      type: FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_STARTED,
      payload: { jobId },
    });
    getAssessmentPlanNotificationsByJob(jobId)
      .then(
        (notifications): void => {
          dispatch({
            type: FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_SUCCEEDED,
            payload: notifications,
          });
        },
      )
      .catch(
        (error): void => {
          dispatch({
            type: FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_FAILED,
            payload: {
              jobId,
              error,
            },
          });
        },
      );
  };
};

/** Updating a single Assessment Plan Notification */

export const UPDATE_ASSESSMENT_PLAN_NOTIFICATION_STARTED =
  "UPDATE_ASSESSMENT_PLAN_NOTIFICATION_STARTED";
export const UPDATE_ASSESSMENT_PLAN_NOTIFICATION_SUCCEEDED =
  "UPDATE_ASSESSMENT_PLAN_NOTIFICATION_SUCCEEDED";
export const UPDATE_ASSESSMENT_PLAN_NOTIFICATION_FAILED =
  "UPDATE_ASSESSMENT_PLAN_NOTIFICATION_FAILED";

export type UpdateAssessmentPlanNotificationStartedAction = Action<
  typeof UPDATE_ASSESSMENT_PLAN_NOTIFICATION_STARTED,
  AssessmentPlanNotification
>;
export type UpdateAssessmentPlanNotificationSucceededAction = Action<
  typeof UPDATE_ASSESSMENT_PLAN_NOTIFICATION_SUCCEEDED,
  AssessmentPlanNotification
>;
export type UpdateAssessmentPlanNotificationFailedAction = Action<
  typeof UPDATE_ASSESSMENT_PLAN_NOTIFICATION_FAILED,
  {
    error: Error;
    notification: AssessmentPlanNotification;
  }
>;

export const updateAssessmentPlanNotification = (
  notification: AssessmentPlanNotification,
): ThunkAction<void, {}, {}, AssessmentPlanNotificationAction> => {
  return (
    dispatch: ThunkDispatch<{}, {}, AssessmentPlanNotificationAction>,
  ): void => {
    dispatch({
      type: UPDATE_ASSESSMENT_PLAN_NOTIFICATION_STARTED,
      payload: notification,
    });
    updateAssessmentPlanNotificationApi(notification)
      .then(
        (updatedNotification): void => {
          dispatch({
            type: UPDATE_ASSESSMENT_PLAN_NOTIFICATION_SUCCEEDED,
            payload: updatedNotification,
          });
        },
      )
      .catch(
        (error): void => {
          dispatch({
            type: UPDATE_ASSESSMENT_PLAN_NOTIFICATION_FAILED,
            payload: {
              error,
              notification,
            },
          });
        },
      );
  };
};

export type AssessmentPlanNotificationAction =
  | FetchAssessmentPlanNotificationStartedAction
  | FetchAssessmentPlanNotificationSucceededAction
  | FetchAssessmentPlanNotificationFailedAction
  | UpdateAssessmentPlanNotificationStartedAction
  | UpdateAssessmentPlanNotificationSucceededAction
  | UpdateAssessmentPlanNotificationFailedAction;
