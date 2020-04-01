import { Application } from "../../models/types";
import {
  ApplicationAction,
  FETCH_APPLICATION_SUCCEEDED,
  FETCH_APPLICATION_FAILED,
  FETCH_APPLICATION_STARTED,
  FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED,
  FETCH_APPLICATIONS_FOR_JOB_STARTED,
  FETCH_APPLICATIONS_FOR_JOB_FAILED,
} from "./applicationActions";
import { combineReducers } from "redux";
import { mapToObject, getId } from "../../helpers/queries";

export interface EntityState {
  applications: {
    [id: number]: Application;
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
      };
    case FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED:
      return {
        ...state,
        applications: {
          ...state.applications,
          ...mapToObject(action.payload, getId),
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
    default:
      return state;
  }
};

export const applicationReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export default applicationReducer;
