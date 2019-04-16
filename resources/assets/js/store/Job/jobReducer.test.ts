/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import jobReducer from "./jobReducer";
import { Job } from "../../models/types";

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
  const fakeJob2: Job = {
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

  it("Starts updating when FETCH_JOB_STARTED", (): void => {
    const initialState = {
      jobs: {},
      jobUpdating: {},
    };
    const expectState = {
      jobs: {},
      jobUpdating: { 12: true },
    };
    const newState = jobReducer(initialState, {
      type: "FETCH_JOB_STARTED",
      payload: 12,
    });
    expect(newState).toEqual(expectState);
  });

  it("Saves new job and sets loading to false when FETCH_JOB_SUCCEEDED", (): void => {
    const initialState = {
      jobs: { 12: fakeJob },
      jobUpdating: { 12: true },
    };
    const expectState = {
      jobs: { 12: fakeJob2 },
      jobUpdating: { 12: false },
    };
    const newState = jobReducer(initialState, {
      type: "FETCH_JOB_SUCCEEDED",
      payload: {
        id: 12,
        job: fakeJob2,
      },
    });
    expect(newState).toEqual(expectState);
  });

  it("Sets loading to false when FETCH_JOB_FAILED", (): void => {
    const initialState = {
      jobs: { 12: fakeJob },
      jobUpdating: { 12: true },
    };
    const expectState = {
      jobs: { 12: fakeJob },
      jobUpdating: { 12: false },
    };
    const newState = jobReducer(initialState, {
      type: "FETCH_JOB_FAILED",
      payload: {
        id: 12,
        error: new Error("Testing"),
      },
    });
    expect(newState).toEqual(expectState);
  });
});
