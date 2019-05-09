import { combineReducers } from "redux";
import { Job, Criteria } from "../../models/types";
import jobActions, {
  JobAction,
  FETCH_JOB_STARTED,
  FETCH_JOB_SUCCEEDED,
  FETCH_JOB_FAILED,
} from "./jobActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface EntityState {
  jobs: {
    byId: {
      [id: number]: Job;
    };
  };
  criteria: {
    byId: {
      [id: number]: Criteria;
    };
  };
}

export interface UiState {
  jobUpdating: {
    [id: number]: boolean;
  };
  criteriaUpdating: {
    [id: number]: boolean;
  };
}

export interface JobState {
  entities: EntityState;
  ui: UiState;
}

export const initEntities = (): EntityState => ({
  jobs: { byId: {} },
  criteria: { byId: {} },
});

export const initUi = (): UiState => ({
  jobUpdating: {},
  criteriaUpdating: {},
});

export const initState = (): JobState => ({
  entities: initEntities(),
  ui: initUi(),
});

export const entitiesReducer = (
  state = initEntities(),
  action: JobAction,
): EntityState => {
  switch (action.type) {
    case FETCH_JOB_SUCCEEDED:
      return {
        jobs: {
          byId: {
            ...state.jobs.byId,
            [action.payload.job.id]: action.payload.job,
          },
        },
        criteria: {
          byId: {
            ...state.criteria.byId,
            ...mapToObject(action.payload.criteria, getId),
          },
        },
      };
    default:
      return state;
  }
};

export const uiReducer = (state = initUi(), action: JobAction): UiState => {
  switch (action.type) {
    case FETCH_JOB_STARTED:
      return {
        ...state,
        jobUpdating: {
          [action.meta.id]: true,
        },
      };
    case FETCH_JOB_SUCCEEDED:
      return {
        ...state,
        jobUpdating: {
          [action.meta.id]: false,
        },
      };
    case FETCH_JOB_FAILED:
      return {
        ...state,
        jobUpdating: {
          [action.meta.id]: false,
        },
      };
    default:
      return state;
  }
};

export const jobsReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export default jobsReducer;
