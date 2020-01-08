/* eslint-disable @typescript-eslint/camelcase */
import {
  getJob,
  getCriteria,
  getJobIsEdited,
  getAllJobs,
  getJobIsUpdating,
  getJobIndexIsUpdating,
} from "./jobSelector";
import { getCriteriaUnansweredForQuestion } from "./jobSelectorComplex";
import { RootState, initState } from "../store";
import { initState as initJobs, initEntities, initUi } from "./jobReducer";
import {
  Job,
  Criteria,
  Assessment,
  RatingGuideAnswer,
} from "../../models/types";
import { fakeJob, fakeJob2, fakeCriterion } from "../../fakeData/fakeJob";
import { fakeQuestion } from "../../fakeData/fakeRatingGuideQuestion";

describe("Job Selectors", (): void => {
  describe("getAllJobs", (): void => {
    it("Returns all the jobs and no more", (): void => {
      const job1: Job = fakeJob(1);
      const job2: Job = fakeJob(2);
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          entities: {
            ...initEntities(),
            jobs: {
              byId: {
                1: job1,
                2: job2,
              },
            },
          },
        },
      };
      const result = getAllJobs(state);
      expect(result.length).toBe(2);
      expect(result.includes(job1)).toBe(true);
      expect(result.includes(job2)).toBe(true);
    });
  });

  describe("getJob", (): void => {
    it("Returns the correct job", (): void => {
      const job: Job = fakeJob(12);
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
      expect(getJob(state, { jobId: 12 })).toEqual(job);
    });

    it("Returns the edited version of the job", (): void => {
      const job: Job = fakeJob(12);
      const jobEdit: Job = fakeJob2(12);
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
            jobEdits: {
              12: jobEdit,
            },
          },
        },
      };
      expect(getJob(state, { jobId: 12 })).toEqual(job);
    });
  });

  describe("getJobIsEdited", (): void => {
    it("Returns false if no version of the job exists", (): void => {
      const state: RootState = initState();
      expect(getJobIsEdited(state, { jobId: 12 })).toEqual(false);
    });

    it("Returns true if only edited job exists", (): void => {
      const jobEdit: Job = fakeJob2(12);
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          entities: {
            ...initEntities(),
            jobEdits: {
              12: jobEdit,
            },
          },
        },
      };
      expect(getJobIsEdited(state, { jobId: 12 })).toEqual(true);
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
      expect(getJobIsEdited(state, { jobId: 1 })).toEqual(true);
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
      expect(getJobIsEdited(state, { jobId: 1 })).toEqual(false);
    });
  });

  describe("getJobIndexIsUpdating", (): void => {
    it("Simply returns the boolean constant jobIndexUpdating", (): void => {
      const stateInit: RootState = initState();
      expect(getJobIndexIsUpdating(stateInit)).toEqual(false);
      const stateFalse: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          ui: {
            ...initUi(),
            jobIndexUpdating: false,
          },
        },
      };
      expect(getJobIndexIsUpdating(stateFalse)).toEqual(false);
      const stateTrue: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          ui: {
            ...initUi(),
            jobIndexUpdating: true,
          },
        },
      };
      expect(getJobIndexIsUpdating(stateTrue)).toEqual(true);
    });
  });

  describe("getJobIsUpdating", (): void => {
    it("returns false if nothing is recorded for that id", (): void => {
      const state: RootState = initState();
      expect(getJobIsUpdating(state, 12)).toEqual(false);
    });
    it("returns false if false is recorded for that id", (): void => {
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          ui: {
            ...initUi(),
            jobUpdating: {
              [12]: false,
            },
          },
        },
      };
      expect(getJobIsUpdating(state, 12)).toEqual(false);
    });
    it("returns true if true is recorded for that id", (): void => {
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          ui: {
            ...initUi(),
            jobUpdating: {
              [12]: true,
            },
          },
        },
      };
      expect(getJobIsUpdating(state, 12)).toEqual(true);
    });
    it("returns true if false is recorded for that id BUT jobIndexUpdating is set to true", (): void => {
      const state: RootState = {
        ...initState(),
        jobs: {
          ...initJobs(),
          ui: {
            ...initUi(),
            jobIndexUpdating: true,
            jobUpdating: {
              [12]: false,
            },
          },
        },
      };
      expect(getJobIsUpdating(state, 12)).toEqual(true);
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

describe("getCriteriaUnansweredForQuestion", (): void => {
  it("should return the correct criteria", (): void => {
    const job = fakeJob();

    const crit1 = fakeCriterion(1, 1);
    const crit2 = fakeCriterion(2, 1);
    const crit3 = fakeCriterion(3, 1);

    const question = fakeQuestion(4, 1);
    question.assessment_type_id = 1;

    // Associate 3 criteria with the question's assessment_type
    const assessment1: Assessment = {
      id: 5,
      criterion_id: 1,
      assessment_type_id: 1,
    };
    const assessment2: Assessment = {
      id: 6,
      criterion_id: 2,
      assessment_type_id: 1,
    };
    const assessment3: Assessment = {
      id: 7,
      criterion_id: 3,
      assessment_type_id: 1,
    };

    // create an answer for one of the criteria
    const answer: RatingGuideAnswer = {
      id: 8,
      rating_guide_question_id: question.id,
      criterion_id: 2,
      expected_answer: "This is an expected test answer.",
    };

    // const store = initState();
    // Add all these objects to the store
    const initialState = initState();
    const store: RootState = {
      ...initialState,
      jobs: {
        ...initialState.jobs,
        entities: {
          ...initialState.jobs.entities,
          jobs: {
            byId: {
              1: job,
            },
          },
          criteria: {
            byId: {
              1: crit1,
              2: crit2,
              3: crit3,
            },
          },
        },
      },
      ratingGuideQuestion: {
        ...initialState.ratingGuideQuestion,
        ratingGuideQuestions: {
          [question.id]: question,
        },
      },
      assessment: {
        ...initialState.assessment,
        assessments: {
          [assessment1.id]: assessment1,
          [assessment2.id]: assessment2,
          [assessment3.id]: assessment3,
        },
      },
      ratingGuideAnswer: {
        ...initialState.ratingGuideAnswer,
        ratingGuideAnswers: {
          [answer.id]: answer,
        },
      },
    };
    const expectedCriteria = [crit1, crit3];
    expect(
      getCriteriaUnansweredForQuestion(store, {
        questionId: question.id,
        isTempQuestion: false,
      }),
    ).toEqual(expectedCriteria);
  });
});
