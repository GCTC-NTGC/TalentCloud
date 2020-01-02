import { combineReducers } from "redux";
import { Job, Criteria, JobPosterKeyTask } from "../../models/types";
import {
  JobAction,
  FETCH_JOB_STARTED,
  FETCH_JOB_SUCCEEDED,
  FETCH_JOB_FAILED,
  UPDATE_JOB_SUCCEEDED,
  UPDATE_JOB_STARTED,
  UPDATE_JOB_FAILED,
  EDIT_JOB,
  CLEAR_JOB_EDIT,
  CREATE_JOB_SUCCEEDED,
  CREATE_JOB_STARTED,
  CREATE_JOB_FAILED,
  SET_SELECTED_JOB,
  FETCH_JOB_TASKS_SUCCEEDED,
  BATCH_UPDATE_JOB_TASKS_SUCCEEDED,
  FETCH_CRITERIA_SUCCEEDED,
  BATCH_UPDATE_CRITERIA_SUCCEEDED,
  SUBMIT_JOB_FOR_REVIEW_SUCCEEDED,
  SUBMIT_JOB_FOR_REVIEW_STARTED,
  SUBMIT_JOB_FOR_REVIEW_FAILED,
  FETCH_CRITERIA_STARTED,
  FETCH_CRITERIA_FAILED,
  BATCH_UPDATE_CRITERIA_FAILED,
  BATCH_UPDATE_CRITERIA_STARTED,
  FETCH_JOB_TASKS_STARTED,
  BATCH_UPDATE_JOB_TASKS_STARTED,
  FETCH_JOB_TASKS_FAILED,
  BATCH_UPDATE_JOB_TASKS_FAILED,
} from "./jobActions";
import {
  mapToObject,
  getId,
  deleteProperty,
  filterObjectProps,
} from "../../helpers/queries";

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
  tasks: {
    byJobId: {
      [id: number]: JobPosterKeyTask[];
    };
  };
  jobEdits: {
    [id: number]: Job;
  };
}

export interface UiState {
  jobUpdating: {
    [id: number]: boolean;
  };
  criteriaUpdating: {
    [id: number]: boolean;
  };
  criteriaUpdatingByJob: {
    [jobId: number]: boolean;
  };
  tasksUpdatingByJob: {
    [jobId: number]: boolean;
  };
  creatingJob: boolean;
  selectedJobId: number | null;
}

export interface JobState {
  entities: EntityState;
  ui: UiState;
}

export const initEntities = (): EntityState => ({
  jobs: { byId: {} },
  criteria: { byId: {} },
  tasks: { byJobId: {} },
  jobEdits: {},
});

export const initUi = (): UiState => ({
  jobUpdating: {},
  criteriaUpdating: {},
  criteriaUpdatingByJob: {},
  tasksUpdatingByJob: {},
  creatingJob: false,
  selectedJobId: null,
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
        ...state,
        jobs: {
          byId: {
            ...state.jobs.byId,
            [action.payload.job.id]: action.payload.job,
          },
        },
        criteria: {
          byId: {
            ...filterObjectProps<Criteria>(
              state.criteria.byId,
              (criteria): boolean => criteria.job_poster_id !== action.meta.id,
            ),
            ...mapToObject(action.payload.criteria, getId),
          },
        },
      };
    case CREATE_JOB_SUCCEEDED:
      return {
        ...state,
        jobs: {
          byId: {
            ...state.jobs.byId,
            [action.payload.id]: action.payload,
          },
        },
      };
    case UPDATE_JOB_SUCCEEDED:
    case SUBMIT_JOB_FOR_REVIEW_SUCCEEDED:
      return {
        ...state,
        jobs: {
          byId: {
            ...state.jobs.byId,
            [action.meta.id]: action.payload,
          },
        },
      };
    case EDIT_JOB:
      return {
        ...state,
        jobEdits: {
          ...state.jobEdits,
          [action.payload.id]: action.payload,
        },
      };
    case CLEAR_JOB_EDIT:
      return {
        ...state,
        jobEdits: deleteProperty<Job>(state.jobEdits, action.payload),
      };
    case FETCH_JOB_TASKS_SUCCEEDED:
    case BATCH_UPDATE_JOB_TASKS_SUCCEEDED:
      return {
        ...state,
        tasks: {
          byJobId: {
            ...state.tasks.byJobId,
            [action.meta.jobId]: action.payload,
          },
        },
      };
    case FETCH_CRITERIA_SUCCEEDED:
    case BATCH_UPDATE_CRITERIA_SUCCEEDED:
      return {
        ...state,
        criteria: {
          byId: {
            ...filterObjectProps<Criteria>(
              state.criteria.byId,
              (criteria): boolean =>
                criteria.job_poster_id !== action.meta.jobId,
            ),
            ...mapToObject(action.payload, getId),
          },
        },
      };
    default:
      return state;
  }
};

export const uiReducer = (state = initUi(), action: JobAction): UiState => {
  switch (action.type) {
    case CREATE_JOB_STARTED:
      return {
        ...state,
        creatingJob: true,
      };
    case CREATE_JOB_SUCCEEDED:
      return {
        ...state,
        creatingJob: false,
      };
    case CREATE_JOB_FAILED:
      return {
        ...state,
        creatingJob: false,
      };
    case FETCH_JOB_STARTED:
    case UPDATE_JOB_STARTED:
    case SUBMIT_JOB_FOR_REVIEW_STARTED:
      return {
        ...state,
        jobUpdating: {
          ...state.jobUpdating,
          [action.meta.id]: true,
        },
      };
    case FETCH_JOB_SUCCEEDED:
    case FETCH_JOB_FAILED:
    case UPDATE_JOB_FAILED:
    case UPDATE_JOB_SUCCEEDED:
    case SUBMIT_JOB_FOR_REVIEW_SUCCEEDED:
    case SUBMIT_JOB_FOR_REVIEW_FAILED:
      return {
        ...state,
        jobUpdating: {
          ...state.jobUpdating,
          [action.meta.id]: false,
        },
      };
    case SET_SELECTED_JOB:
      return {
        ...state,
        selectedJobId: action.payload.jobId,
      };
    case FETCH_JOB_TASKS_STARTED:
    case BATCH_UPDATE_JOB_TASKS_STARTED:
      return {
        ...state,
        tasksUpdatingByJob: {
          ...state.tasksUpdatingByJob,
          [action.meta.jobId]: true,
        },
      };
    case FETCH_JOB_TASKS_FAILED:
    case FETCH_JOB_TASKS_SUCCEEDED:
    case BATCH_UPDATE_JOB_TASKS_FAILED:
    case BATCH_UPDATE_JOB_TASKS_SUCCEEDED:
      return {
        ...state,
        tasksUpdatingByJob: {
          ...state.tasksUpdatingByJob,
          [action.meta.jobId]: false,
        },
      };
    case FETCH_CRITERIA_STARTED:
    case BATCH_UPDATE_CRITERIA_STARTED:
      return {
        ...state,
        criteriaUpdatingByJob: {
          ...state.criteriaUpdatingByJob,
          [action.meta.jobId]: true,
        },
      };
    case FETCH_CRITERIA_FAILED:
    case FETCH_CRITERIA_SUCCEEDED:
    case BATCH_UPDATE_CRITERIA_FAILED:
    case BATCH_UPDATE_CRITERIA_SUCCEEDED:
      return {
        ...state,
        criteriaUpdatingByJob: {
          ...state.criteriaUpdatingByJob,
          [action.meta.jobId]: false,
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
