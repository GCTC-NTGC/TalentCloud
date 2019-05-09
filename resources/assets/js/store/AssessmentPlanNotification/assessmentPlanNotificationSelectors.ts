import { RootState } from "../store";
import { AssessmentPlanNotificationState } from "./assessmentPlanNotificationReducer";
import { AssessmentPlanNotification } from "../../models/types";
import { hasKey } from "../../helpers/queries";

const stateSlice = (state: RootState): AssessmentPlanNotificationState =>
  state.assessmentPlanNotification;

export const getNotifications = (
  state: RootState,
): AssessmentPlanNotification[] => {
  const notificationState = stateSlice(state).entities.notifications;
  return notificationState.allIds.map(
    (id): AssessmentPlanNotification => notificationState.byId[id],
  );
};

export const getNotificationsByJob = (
  state: RootState,
  jobId: number,
): AssessmentPlanNotification[] => {
  return getNotifications(state).filter(
    (notification): boolean => notification.job_poster_id === jobId,
  );
};

export const getUnreadNotificationsByJob = (
  state: RootState,
  jobId: number,
): AssessmentPlanNotification[] => {
  return getNotificationsByJob(state, jobId).filter(
    (notification): boolean => notification.acknowledged === false,
  );
};

export const notificationIsUpdating = (
  state: RootState,
  id: number,
): boolean => {
  const { updatingById } = stateSlice(state).ui;
  return hasKey(updatingById, id) ? updatingById[id] : false;
};

export const notificationsAreFetching = (state: RootState): boolean =>
  stateSlice(state).ui.fetching;
