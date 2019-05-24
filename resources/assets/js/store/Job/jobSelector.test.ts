/* eslint-disable @typescript-eslint/camelcase */
import {
  getJob,
  getCriteria,
  getCriteriaUnansweredForQuestion,
} from "./jobSelector";
import { RootState, initState } from "../store";
import { initState as initJobs, initEntities } from "./jobReducer";
import {
  Job,
  Criteria,
  Assessment,
  RatingGuideAnswer,
} from "../../models/types";
import { fakeQuestion } from "../../fakeData/fakeRatingGuideQuestion";

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

describe("getCriteriaUnansweredForQuestion", (): void => {
  it("should return the correct criteria", (): void => {
    const crit1 = fakeCriterion(1);
    const crit2 = fakeCriterion(2);
    const crit3 = fakeCriterion(3);

    const question = fakeQuestion(1);
    question.assessment_type_id = 1;

    // Associate 3 criteria with the question's assessment_type
    const assessment1: Assessment = {
      id: 1,
      criterion_id: 1,
      assessment_type_id: 1,
    };
    const assessment2: Assessment = {
      id: 2,
      criterion_id: 2,
      assessment_type_id: 1,
    };
    const assessment3: Assessment = {
      id: 3,
      criterion_id: 3,
      assessment_type_id: 1,
    };

    // create an answer for one of the criteria
    const answer: RatingGuideAnswer = {
      id: 1,
      rating_guide_question_id: 1,
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
          1: question,
        },
      },
      assessment: {
        ...initialState.assessment,
        assessments: {
          1: assessment1,
          2: assessment2,
          3: assessment3,
        },
      },
      ratingGuideAnswer: {
        ...initialState.ratingGuideAnswer,
        ratingGuideAnswers: {
          1: answer,
        },
      },
    };
    const expectedCriteria = [crit1, crit3];
    expect(getCriteriaUnansweredForQuestion(store, question.id)).toEqual(
      expectedCriteria,
    );
  });
});
