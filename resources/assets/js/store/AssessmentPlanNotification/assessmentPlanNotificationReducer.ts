import { combineReducers, Reducer } from "redux";
import { AssessmentPlanNotification } from "../../models/types";
import {
  FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_SUCCEEDED,
  AssessmentPlanNotificationAction,
  UPDATE_ASSESSMENT_PLAN_NOTIFICATION_SUCCEEDED,
  UPDATE_ASSESSMENT_PLAN_NOTIFICATION_STARTED,
  UPDATE_ASSESSMENT_PLAN_NOTIFICATION_FAILED,
} from "./assessmentPlanNotificationActions";
import { mapToObject, getId } from "../../helpers/queries";

interface EntityState {
  notifications: {
    byId: {
      [id: number]: AssessmentPlanNotification;
    };
    allIds: number[];
  };
}

interface UiState {
  updatingById: {
    [id: number]: boolean;
  };
}

export interface AssessmentPlanNotificationState {
  entities: EntityState;
  ui: UiState;
}

const initEntityState = (): EntityState => ({
  notifications: {
    byId: {},
    allIds: [],
  },
});

const initUiState = (): UiState => ({ updatingById: {} });

export const initState = (): AssessmentPlanNotificationState => ({
  entities: initEntityState(),
  ui: initUiState(),
});

export const sortNotifications = (notificationsById: {
  [id: number]: AssessmentPlanNotification;
}): number[] => {
  const notifications = Object.values(notificationsById);
  const comparator = (
    a: AssessmentPlanNotification,
    b: AssessmentPlanNotification,
  ): number => {
    return a.created_at.getTime() - b.created_at.getTime();
  };
  const sortedIds = notifications.sort(comparator).map(getId);
  return sortedIds;
};

const entityReducer = (
  state = initEntityState(),
  action: AssessmentPlanNotificationAction,
): EntityState => {
  switch (action.type) {
    case FETCH_ASSESSMENT_PLAN_NOTIFICATIONS_SUCCEEDED: {
      const newById = {
        ...state.notifications.byId,
        ...mapToObject(action.payload, getId),
      };
      return {
        ...state,
        notifications: {
          byId: newById,
          allIds: sortNotifications(newById),
        },
      };
    }
    case UPDATE_ASSESSMENT_PLAN_NOTIFICATION_SUCCEEDED: {
      const newById = {
        ...state.notifications.byId,
        [action.payload.id]: action.payload,
      };
      return {
        ...state,
        notifications: {
          byId: newById,
          allIds: sortNotifications(newById),
        },
      };
    }
    default:
      return state;
  }
};

const uiReducer = (
  state = initUiState(),
  action: AssessmentPlanNotificationAction,
): UiState => {
  switch (action.type) {
    case UPDATE_ASSESSMENT_PLAN_NOTIFICATION_STARTED:
      return {
        updatingById: {
          ...state.updatingById,
          [action.payload.id]: true,
        },
      };
    case UPDATE_ASSESSMENT_PLAN_NOTIFICATION_SUCCEEDED:
      return {
        updatingById: {
          ...state.updatingById,
          [action.payload.id]: false,
        },
      };
    case UPDATE_ASSESSMENT_PLAN_NOTIFICATION_FAILED:
      return {
        updatingById: {
          ...state.updatingById,
          [action.payload.notification.id]: false,
        },
      };
    default:
      return state;
  }
};

export const assessmentPlanNotificationReducer: Reducer<
  AssessmentPlanNotificationState
> = combineReducers({
  entities: entityReducer,
  ui: uiReducer,
});

export default assessmentPlanNotificationReducer;
