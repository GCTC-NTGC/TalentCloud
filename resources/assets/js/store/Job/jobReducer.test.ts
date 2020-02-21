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
  FETCH_JOB_INDEX_STARTED,
  FETCH_JOB_INDEX_SUCCEEDED,
  FETCH_JOB_INDEX_FAILED,
} from "./jobActions";

describe("Job Reducer tests", (): void => {
  describe("UiReducer", (): void => {
    it("Sets jobIndexUpdating to true when FETCH_JOB_INDEX_STARTED", (): void => {
      const initialState = initUi();
      const expectState = {
        ...initialState,
        jobIndexUpdating: true,
      };
      const newState = uiReducer(initialState, {
        type: FETCH_JOB_INDEX_STARTED,
        meta: { filters: new Map() },
      });
      expect(newState).toEqual(expectState);
    });
    it("Sets jobIndexUpdating to false when FETCH_JOB_INDEX_SUCCEEDED or FETCH_JOB_INDEX_FAILED", (): void => {
      const initialState = {
        ...initUi(),
        jobIndexUpdating: true,
      };
      const expectState = {
        ...initialState,
        jobIndexUpdating: false,
      };
      const newStateSucceeded = uiReducer(initialState, {
        type: FETCH_JOB_INDEX_SUCCEEDED,
        payload: { jobs: [] },
        meta: { filters: new Map() },
      });
      expect(newStateSucceeded).toEqual(expectState);
      const newStateFailed = uiReducer(initialState, {
        type: FETCH_JOB_INDEX_FAILED,
        payload: new Error(),
        error: true,
        meta: { filters: new Map() },
      });
      expect(newStateFailed).toEqual(expectState);
    });

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
      const job: Job = fakeJob(12);
      const fakeCriteria: Criteria = fakeCriterion(12);
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
    it("Adds new jobs when FETCH_JOB_INDEX_SUCCEEDED", (): void => {
      const job1: Job = fakeJob(12);
      const job2: Job = fakeJob(500);
      const initialState: EntityState = initEntities();
      const succeededAction: JobAction = {
        type: FETCH_JOB_INDEX_SUCCEEDED,
        payload: {
          jobs: [job1, job2],
        },
        meta: { filters: new Map() },
      };
      const expectState: EntityState = {
        ...initialState,
        jobs: {
          byId: {
            [job1.id]: job1,
            [job2.id]: job2,
          },
        },
      };
      expect(entitiesReducer(initialState, succeededAction)).toEqual(
        expectState,
      );
    });

    /**
     * Job index requests may happen with a filter. Therefore, the return action not containing
     * a particular job does not mean it should be removed from the store.
     */
    it("Does not delete missing jobs when FETCH_JOB_INDEX_SUCCEEDED", (): void => {
      const oldJob: Job = fakeJob(12);
      const newJob: Job = fakeJob(500);
      const initialState: EntityState = {
        ...initEntities(),
        jobs: {
          byId: {
            [oldJob.id]: oldJob
          }
        }
      };
      const succeededAction: JobAction = {
        type: FETCH_JOB_INDEX_SUCCEEDED,
        payload: {
          jobs: [newJob],
        },
        meta: { filters: new Map() },
      };
      const expectState: EntityState = {
        ...initialState,
        jobs: {
          byId: {
            [oldJob.id]: oldJob,
            [newJob.id]: newJob,
          },
        },
      };
      expect(entitiesReducer(initialState, succeededAction)).toEqual(
        expectState,
      );
    });

    it("Adds new job and criteria when FETCH_JOB_SUCCEEDED", (): void => {
      const job: Job = fakeJob(12);
      const fakeCriteria: Criteria = fakeCriterion(12);
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
    const job: Job = fakeJob(12);
    const fakeJobUpdated: Job = fakeJob2(12);
    const fakeCriteria: Criteria = fakeCriterion(12);
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
