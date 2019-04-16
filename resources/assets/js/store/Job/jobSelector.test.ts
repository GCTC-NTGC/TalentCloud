import { getJob } from "./jobSelector";
import { RootState, initState } from "../store";
import { JobState, initState as initJobs } from "./jobReducer";
import { Job } from "../../models/types";

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
      jobs: { 12: job },
      jobUpdating: {},
    },
  };
  expect(getJob(state, 12)).toEqual(job);
});
