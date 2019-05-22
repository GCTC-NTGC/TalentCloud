/* eslint-disable @typescript-eslint/camelcase */
import { getJob, getCriteria, getJobIsEdited } from "./jobSelector";
import { RootState, initState } from "../store";
import { initState as initJobs, initEntities } from "./jobReducer";
import { Job, Criteria } from "../../models/types";
import { fakeJob, fakeJob2, fakeCriterion } from "../../fakeData/fakeJob";

describe("Job Selectors", (): void => {
  describe("getJob", (): void => {
    it("Returns the correct job", (): void => {
      const job: Job = fakeJob();
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          entities: {
            ...initEntities(),
            jobs: {
              byId: {
                12: job,
              },
            },
          },
        },
      };
      expect(getJob(state, 12)).toEqual(job);
    });

    it("Returns the edited version of the job", (): void => {
      const job: Job = fakeJob(1);
      const jobEdit: Job = fakeJob2(1);
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          entities: {
            ...initEntities(),
            jobs: {
              byId: {
                1: job,
              },
            },
            jobEdits: {
              1: jobEdit,
            },
          },
        },
      };
      expect(getJob(state, 1)).toEqual(jobEdit);
    });
  });

  describe("getJobIsEdited", (): void => {
    it("Returns true if unedited job doesn't exist", (): void => {
      const state: RootState = initState();
      expect(getJobIsEdited(state, 1)).toEqual(true);
    });

    it("Returns true if edited job is different", (): void => {
      const job: Job = fakeJob(1);
      const jobEdit: Job = fakeJob2(1);
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          entities: {
            ...initEntities(),
            jobs: {
              byId: {
                1: job,
              },
            },
            jobEdits: {
              1: jobEdit,
            },
          },
        },
      };
      expect(getJobIsEdited(state, 1)).toEqual(true);
    });

    it("Returns false if edited job is same as original", (): void => {
      const job: Job = fakeJob(1);
      const jobEdit: Job = fakeJob(1);
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          entities: {
            ...initEntities(),
            jobs: {
              byId: {
                1: job,
              },
            },
            jobEdits: {
              1: jobEdit,
            },
          },
        },
      };
      expect(getJobIsEdited(state, 1)).toEqual(false);
    });
  });

  describe("getCriteria", (): void => {
    it("returns all criteria", (): void => {
      const crit1: Criteria = fakeCriterion(1);
      const crit2: Criteria = fakeCriterion(2);
      const crit3: Criteria = fakeCriterion(3);

      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          entities: {
            ...initEntities(),
            criteria: {
              byId: {
                1: crit1,
                2: crit2,
                3: crit3,
              },
            },
          },
        },
      };
      expect(getCriteria(state)).toEqual([crit1, crit2, crit3]);
    });
  });
});
