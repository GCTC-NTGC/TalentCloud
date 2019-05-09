/* eslint-disable @typescript-eslint/camelcase */
import { getJob, getCriteria } from "./jobSelector";
import { RootState, initState } from "../store";
import { JobState, initState as initJobs, initEntities } from "./jobReducer";
import { Job, Criteria } from "../../models/types";

describe("getJob", (): void => {
  it("Returns the correct job", (): void => {
    const fakeJob = (): Job => {
      return {
        id: 12,
        title: "Test Job",
        classification: "NOC-02",
        close_date_time: new Date(),
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
    };
    const job = fakeJob();
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
  const fakeCriterion = (id: number): Criteria => ({
    id,
    criteria_type_id: 1, // asset or essential
    job_poster_id: 1,
    skill_id: 1,
    skill_level_id: 1,
    description: `This is criteria number ${id}`, // TODO: remove un-localized description
    skill: {
      id,
      name: `Skill number ${id}`,
      description: `Description of skill number ${id}`,
      skill_type_id: 1,
      en: {
        name: `Skill number ${id}`,
        description: `Description of skill number ${id}`,
      },
      fr: {
        name: `FR Skill number ${id}`,
        description: `FR Description of skill number ${id}`,
      },
    }, // TODO: remove skill from here
    en: {
      description: `This is criteria number ${id}`,
    },
    fr: {
      description: `FR This is criteria number ${id}`,
    },
  });

  it("returns all criteria", (): void => {
    const crit1 = fakeCriterion(1);
    const crit2 = fakeCriterion(2);
    const crit3 = fakeCriterion(3);

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
