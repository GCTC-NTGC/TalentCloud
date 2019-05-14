/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import { initUi, uiReducer, initEntities, entitiesReducer, EntityState } from "./jobReducer";
import { Job, Criteria } from "../../models/types";
import {
  FETCH_JOB_STARTED,
  FETCH_JOB_SUCCEEDED,
  JobAction,
  FETCH_JOB_FAILED,
} from "./jobActions";

describe("Job Reducer tests", (): void => {
  const fakeJob: Job = {
    id: 12,
    close_date_time: new Date("2019-05-20 06:59:59"),
    classification: "PE-04",
    title: "I wonder if I'm on the.",
    fr: {
      city: "Lake Robbburgh",
      title: "Queen! The Queen!' and.",
      impact:
        "Nulla enim dignissimos ea saepe totam. Deserunt quod deserunt et sed qui nesciunt illo eaque.\n\nVeniam laudantium ab illo. In in et et voluptatem excepturi. Nesciunt deleniti qui vero magni sunt earum rerum.",
      branch: "et",
      division: "minima",
      education: "Ut odit inventore incidunt.",
    },
    en: {
      city: "Rempelfort",
      title: "I wonder if I'm on the.",
      impact:
        "At iste inventore tempora est. Aspernatur odio autem sapiente est aut. Commodi eius eligendi corrupti repellendus. Enim ad placeat voluptas qui et eum.\n\nEos commodi reprehenderit officiis vero repudiandae. Nisi voluptatem officiis aut molestias incidunt. Doloribus autem est sed non reprehenderit dolores. Et similique et doloribus ea est nam facere.",
      branch: "dolor",
      division: "suscipit",
      education: "Dolorem laborum vel sequi quo autem.",
    },
  };
  const fakeJobUpdated: Job = {
    id: 12,
    title: "Test Job",
    classification: "NOC-02",
    close_date_time: new Date("2019-05-20 06:59:59"),
    en: {
      city: "Toronto",
      title: "Test Job",
      impact: "lorem ipsum",
      branch: "Treasury Board",
      division: "CIOB",
      education: "blah blah",
    },
    fr: {
      city: "Toronto",
      title: "Test Job",
      impact: "lorem ipsum",
      branch: "Treasury Board",
      division: "CIOB",
      education: "blah blah",
    },
  };

  const fakeCriteria: Criteria = {
    id: 1,
    criteria_type_id: 1,
    job_poster_id: 12,
    skill_id: 1,
    skill_level_id: 1,
    description: "Test criteria description",
    // TODO: remove skill
    skill: {
      id: 1,
      name: "Test Skill",
      description: "Description of a test skill",
      skill_type_id: 1,
      en: {
        name: "Test Skill",
        description: "Description of a test skill",
      },
      fr: {
        name: "FR Test Skill",
        description: "FR Description of a test skill",
      },
    },
    en: {
      description: "Test criteria description",
    },
    fr: {
      description: "FR Test criteria description",
    },
  };

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
          job: fakeJob,
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
          job: fakeJob,
          criteria: [fakeCriteria],
        },
        meta: { id: fakeJob.id },
      };
      const expectState: EntityState = {
        ...initialState,
        jobs: {
          byId: {
            [fakeJob.id]: fakeJob,
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
          [fakeJob.id]: fakeJob,
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
      meta: { id: fakeJob.id },
    };
    const expectState: EntityState = {
      ...initialState,
      jobs: {
        byId: {
          [fakeJob.id]: fakeJobUpdated,
        },
      },
    };
    expect(entitiesReducer(initialState, succeededAction)).toEqual(expectState);
  });
});
