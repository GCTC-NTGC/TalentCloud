import { getJob } from "./jobSelector";
import { RootState } from "../store";
import { JobState } from "./jobReducer";
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
  const jobsState: JobState = { jobs: { 12: job }, jobUpdating: {} };
  const state: RootState = {
    jobs: jobsState,
  };
  expect(getJob(state, 12)).toEqual(job);
});
