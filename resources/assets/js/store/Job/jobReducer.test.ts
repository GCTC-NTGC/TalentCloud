/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import {
  initUi,
  uiReducer,
  initEntities,
  entitiesReducer,
  EntityState,
} from "./jobReducer";
import { Job, Criteria } from "../../models/types";
import { fakeJob, fakeJob2, fakeCriterion } from "../../fakeData/fakeJob";
import {
  FETCH_JOB_STARTED,
  FETCH_JOB_SUCCEEDED,
  JobAction,
  FETCH_JOB_FAILED,
  clearJobEdit,
} from "./jobActions";

describe("Job Reducer tests", (): void => {
  const job: Job = fakeJob(12);
  const fakeJobUpdated: Job = fakeJob2(12);

  const fakeCriteria: Criteria = fakeCriterion(12);

  describe("UiReducer", (): void => {
    it("Starts updating when FETCH_JOB_STARTED", (): void => {
      const initialState = initUi();
      const expectState = {
        ...initialState,
        jobUpdating: { 12: true },
      };
      const newState = uiReducer(initialState, {
        type: FETCH_JOB_STARTED,
        meta: { id: 12 },
      });
      expect(newState).toEqual(expectState);
    });

    it("Sets updating to false when FETCH_JOB_SUCCEEDED or FETCH_JOB_FAILED", (): void => {
      const initialState = initUi();
      const expectState = {
        ...initialState,
        jobUpdating: { 12: false },
      };
      const succeededAction: JobAction = {
        type: FETCH_JOB_SUCCEEDED,
        payload: {
          job,
          criteria: [fakeCriteria],
        },
        meta: { id: 12 },
      };
      const failedAction: JobAction = {
        type: FETCH_JOB_FAILED,
        error: true,
        payload: { name: "Internal Error", message: "error" },
        meta: { id: 12 },
      };
      expect(uiReducer(initialState, succeededAction)).toEqual(expectState);
      expect(uiReducer(initialState, failedAction)).toEqual(expectState);
    });
  });

  describe("EntitiesReducer", (): void => {
    it("Adds new job and criteria when FETCH_JOB_SUCCEEDED", (): void => {
      const initialState: EntityState = initEntities();
      const succeededAction: JobAction = {
        type: FETCH_JOB_SUCCEEDED,
        payload: {
          job,
          criteria: [fakeCriteria],
        },
        meta: { id: job.id },
      };
      const expectState: EntityState = {
        ...initialState,
        jobs: {
          byId: {
            [job.id]: job,
          },
        },
        criteria: {
          byId: {
            [fakeCriteria.id]: fakeCriteria,
          },
        },
      };
      expect(entitiesReducer(initialState, succeededAction)).toEqual(
        expectState,
      );
    });
  });

  it("Updates existing job when FETCH_JOB_SUCCEEDED", (): void => {
    const initialState: EntityState = {
      ...initEntities(),
      jobs: {
        byId: {
          [job.id]: job,
        },
      },
      criteria: {
        byId: {
          [fakeCriteria.id]: fakeCriteria,
        },
      },
    };
    const succeededAction: JobAction = {
      type: FETCH_JOB_SUCCEEDED,
      payload: {
        job: fakeJobUpdated, // Job has changed, but has same id
        criteria: [fakeCriteria],
      },
      meta: { id: job.id },
    };
    const expectState: EntityState = {
      ...initialState,
      jobs: {
        byId: {
          [job.id]: fakeJobUpdated,
        },
      },
    };
    expect(entitiesReducer(initialState, succeededAction)).toEqual(expectState);
  });

  it("Removes jobEdit when CLEAR_JOB_EDIT", (): void => {
    const job: Job = fakeJob(1);
    const job2: Job = fakeJob2(2);
    const initialState: EntityState = {
      ...initEntities(),
      jobEdits: {
        1: job,
        2: job2,
      },
    };
    const expectState: EntityState = {
      ...initEntities(),
      jobEdits: {
        1: job,
      },
    };
    expect(entitiesReducer(initialState, clearJobEdit(2))).toEqual(expectState);
  });
});
