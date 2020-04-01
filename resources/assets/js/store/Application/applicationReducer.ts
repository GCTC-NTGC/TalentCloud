import {
  Application,
  ApplicationNormalized,
  ApplicationReview,
} from "../../models/types";
import {
  ApplicationAction,
  FETCH_APPLICATION_SUCCEEDED,
  FETCH_APPLICATION_FAILED,
  FETCH_APPLICATION_STARTED,
  FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED,
  FETCH_APPLICATIONS_FOR_JOB_STARTED,
  FETCH_APPLICATIONS_FOR_JOB_FAILED,
  UPDATE_APPLICATION_REVIEW_SUCCEEDED,
  UPDATE_APPLICATION_REVIEW_STARTED,
  UPDATE_APPLICATION_REVIEW_FAILED,
} from "./applicationActions";
import { combineReducers } from "redux";
import {
  mapToObject,
  getId,
  notEmpty,
  mapToObjectTrans,
} from "../../helpers/queries";

export interface EntityState {
  applications: {
    [id: number]: ApplicationNormalized;
  };
  applicationReviews: {
    byId: {
      [id: number]: ApplicationReview;
    };
    idByApplicationId: {
      [applicationId: number]: number;
    };
  };
}

export interface UiState {
  applicationIsUpdating: {
    [id: number]: boolean;
  };
  fetchingApplications: boolean;
}

export interface ApplicationState {
  entities: EntityState;
  ui: UiState;
}

export const initEntities = (): EntityState => ({
  applications: {},
  applicationReviews: {
    byId: {},
    idByApplicationId: {},
  },
});

export const initUi = (): UiState => ({
  applicationIsUpdating: {},
  fetchingApplications: false,
});

export const initApplicationState = (): ApplicationState => ({
  entities: initEntities(),
  ui: initUi(),
});

export const entitiesReducer = (
  state = initEntities(),
  action: ApplicationAction,
): EntityState => {
  switch (action.type) {
    case FETCH_APPLICATION_SUCCEEDED:
      return {
        ...state,
        applications: {
          ...state.applications,
          [action.payload.id]: action.payload,
        },
        applicationReviews:
          action.payload.application_review !== undefined
            ? {
                byId: {
                  ...state.applicationReviews.byId,
                  [action.payload.application_review.id]:
                    action.payload.application_review,
                },
                idByApplicationId: {
                  ...state.applicationReviews.idByApplicationId,
                  [action.payload.id]: action.payload.application_review.id,
                },
              }
            : state.applicationReviews,
      };
    case FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED:
      return {
        ...state,
        applications: {
          ...state.applications,
          ...mapToObject(action.payload, getId),
        },
        applicationReviews: {
          byId: {
            ...state.applicationReviews.byId,
            ...mapToObject(
              action.payload
                .map((application) => application.application_review)
                .filter(notEmpty),
              getId,
            ),
          },
          idByApplicationId: {
            ...state.applicationReviews.idByApplicationId,
            ...mapToObjectTrans(
              action.payload
                .map((application) => application.application_review)
                .filter(notEmpty),
              (review) => review.job_application_id,
              (review) => review.id,
            ),
          },
        },
      };
    case UPDATE_APPLICATION_REVIEW_SUCCEEDED:
      return {
        ...state,
        applicationReviews: {
          byId: {
            ...state.applicationReviews.byId,
            [action.payload.id]: action.payload,
          },
          idByApplicationId: {
            ...state.applicationReviews.idByApplicationId,
            [action.payload.job_application_id]: action.payload.id,
          },
        },
      };
    default:
      return state;
  }
};

export const uiReducer = (
  state = initUi(),
  action: ApplicationAction,
): UiState => {
  switch (action.type) {
    case FETCH_APPLICATION_STARTED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.id]: true,
        },
      };
    case FETCH_APPLICATION_SUCCEEDED:
    case FETCH_APPLICATION_FAILED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.id]: false,
        },
      };
    case FETCH_APPLICATIONS_FOR_JOB_STARTED:
      return {
        ...state,
        fetchingApplications: true,
      };
    case FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED:
    case FETCH_APPLICATIONS_FOR_JOB_FAILED:
      return {
        ...state,
        fetchingApplications: false,
      };
    case UPDATE_APPLICATION_REVIEW_STARTED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.applicationId]: true,
        },
      };
    case UPDATE_APPLICATION_REVIEW_SUCCEEDED:
    case UPDATE_APPLICATION_REVIEW_FAILED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.applicationId]: false,
        },
      };
    default:
      return state;
  }
};

export const applicationReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export default applicationReducer;
