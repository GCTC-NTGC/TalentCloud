import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { RootState } from "../store";
import { AssessmentPlanNotificationState } from "./assessmentPlanNotificationReducer";
import { AssessmentPlanNotification } from "../../models/types";
import { hasKey } from "../../helpers/queries";

const stateSlice = (state: RootState): AssessmentPlanNotificationState =>
  state.assessmentPlanNotification;

const getNotificationState = (
  state: RootState,
): {
  byId: { [id: number]: AssessmentPlanNotification };
  allIds: number[];
} => stateSlice(state).entities.notifications;

export const getNotifications = createSelector(
  getNotificationState,
  (notificationState): AssessmentPlanNotification[] =>
    notificationState.allIds.map(
      (id): AssessmentPlanNotification => notificationState.byId[id],
    ),
);

export const getNotificationsByJob = createCachedSelector(
  getNotifications,
  (state: RootState, ownProps: { jobId: number }): number => ownProps.jobId,
  (notifications, jobId): AssessmentPlanNotification[] =>
    notifications.filter(
      (notification): boolean => notification.job_poster_id === jobId,
    ),
)((state, ownProps): number => ownProps.jobId);

export const getUnreadNotificationsByJob = createCachedSelector(
  getNotificationsByJob,
  (notifications): AssessmentPlanNotification[] =>
    notifications.filter(
      (notification): boolean => notification.acknowledged === false,
    ),
)((state, ownProps): number => ownProps.jobId);

export const notificationIsUpdating = (
  state: RootState,
  id: number,
): boolean => {
  const { updatingById } = stateSlice(state).ui;
  return hasKey(updatingById, id) ? updatingById[id] : false;
};

export const notificationsAreFetching = (state: RootState): boolean =>
  stateSlice(state).ui.fetching;
