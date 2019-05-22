/* eslint-disable @typescript-eslint/camelcase */
import { getJob, getCriteria } from "./jobSelector";
import { RootState, initState } from "../store";
import { initState as initJobs, initEntities } from "./jobReducer";
import { Job, Criteria } from "../../models/types";
import { fakeJob, fakeCriterion } from "../../fakeData/fakeJob";

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
