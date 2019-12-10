/* eslint-disable @typescript-eslint/camelcase */
import { combineReducers } from "redux";
import { HrAdvisor } from "../../models/types";
import {
  HrAdvisorAction,
  GET_HR_ADVISOR_SUCCEEDED,
  CLAIM_JOB_SUCCEEDED,
  CLAIM_JOB_FAILED,
  CLAIM_JOB_STARTED,
  UNCLAIM_JOB_STARTED,
  GET_HR_ADVISOR_STARTED,
  GET_HR_ADVISOR_FAILED,
  UNCLAIM_JOB_SUCCEEDED,
  UNCLAIM_JOB_FAILED,
} from "./hrAdivsorActions";

import uniq = require("lodash/uniq");

export interface EntityState {
  hrAdvisors: {
    byId: {
      [id: number]: HrAdvisor;
    };
  };
}
export interface UiState {
  hrAdvisorUpdating: {
    [id: number]: boolean;
  };
  jobClaimUpdating: {
    [hrAdvisorId: number]: {
      [jobId: number]: boolean;
    };
  };
}

export interface HrAdvisorState {
  entities: EntityState;
  ui: UiState;
}

export const initEntities = (): EntityState => ({
  hrAdvisors: { byId: {} },
});

export const initUi = (): UiState => ({
  hrAdvisorUpdating: {},
  jobClaimUpdating: {},
});

export const initState = (): HrAdvisorState => ({
  entities: initEntities(),
  ui: initUi(),
});

const addClaimedJob = (advisor: HrAdvisor, jobId: number): HrAdvisor => ({
  ...advisor,
  claimed_job_ids: uniq([jobId, ...advisor.claimed_job_ids]),
});

const removeClaimedJob = (advisor: HrAdvisor, jobId: number): HrAdvisor => ({
  ...advisor,
  claimed_job_ids: advisor.claimed_job_ids.filter(id => id !== jobId),
});

export const entitiesReducer = (
  state = initEntities(),
  action: HrAdvisorAction,
): EntityState => {
  switch (action.type) {
    case GET_HR_ADVISOR_SUCCEEDED:
      return {
        ...state,
        hrAdvisors: {
          byId: {
            ...state.hrAdvisors.byId,
            [action.payload.id]: action.payload,
          },
        },
      };
    case CLAIM_JOB_SUCCEEDED:
      return {
        ...state,
        hrAdvisors: {
          byId: {
            ...state.hrAdvisors.byId,
            [action.meta.hrAdvisorId]: addClaimedJob(
              state.hrAdvisors.byId[action.meta.hrAdvisorId],
              action.meta.jobId,
            ),
          },
        },
      };
    case CLAIM_JOB_FAILED:
      return {
        ...state,
        hrAdvisors: {
          byId: {
            ...state.hrAdvisors.byId,
            [action.meta.hrAdvisorId]: removeClaimedJob(
              state.hrAdvisors.byId[action.meta.hrAdvisorId],
              action.meta.jobId,
            ),
          },
        },
      };
    default:
      return state;
  }
};

export const uiReducer = (
  state = initUi(),
  action: HrAdvisorAction,
): UiState => {
  switch (action.type) {
    case GET_HR_ADVISOR_STARTED:
      return {
        ...state,
        hrAdvisorUpdating: {
          ...state.hrAdvisorUpdating,
          [action.meta.id]: true,
        },
      };
    case GET_HR_ADVISOR_FAILED:
    case GET_HR_ADVISOR_SUCCEEDED:
      return {
        ...state,
        hrAdvisorUpdating: {
          ...state.hrAdvisorUpdating,
          [action.meta.id]: true,
        },
      };
    case CLAIM_JOB_STARTED:
    case UNCLAIM_JOB_STARTED:
      return {
        ...state,
        jobClaimUpdating: {
          ...state.jobClaimUpdating,
          [action.meta.hrAdvisorId]: {
            ...state.jobClaimUpdating[action.meta.hrAdvisorId],
            [action.meta.jobId]: true,
          },
        },
      };
    case CLAIM_JOB_SUCCEEDED:
    case UNCLAIM_JOB_SUCCEEDED:
    case CLAIM_JOB_FAILED:
    case UNCLAIM_JOB_FAILED:
      return {
        ...state,
        jobClaimUpdating: {
          ...state.jobClaimUpdating,
          [action.meta.hrAdvisorId]: {
            ...state.jobClaimUpdating[action.meta.hrAdvisorId],
            [action.meta.jobId]: false,
          },
        },
      };
    default:
      return state;
  }
};

export const hrAdvisorReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export default hrAdvisorReducer;
