/* eslint-disable no-undef */
import {
  Criteria,
  Assessment,
  RatingGuideQuestion,
  RatingGuideAnswer,
  Skill,
} from "../../models/types";
import {
  SkillLevelId,
  SkillTypeId,
  AssessmentTypeId,
  CriteriaTypeId,
} from "../../models/lookupConstants";
import { clipboardData } from "./RatingGuideClipboard";
import { CoverageSummary } from "istanbul-lib-coverage";
// import { getSkillById } from "../../store/skill/skillSelector";

const jediSkill: Skill = {
  id: 1,
  name: "jedi",
  description: "laser sword user",
  skill_type_id: SkillTypeId.Hard,
  en: {name: "English Jedi", description:"English Laser Sword User"},
  fr: {name: "French Jedi", description:"French Laser Sword User"},
};

jest.mock("../../store/skill/skillSelector", () => {
  return {                          // Define Function Mock Return Values
      getSkillById: jest.fn( (x, y) => jediSkill )
  }
});

const someCriteria: Criteria[] = [
  {
    id: 1,
    criteria_type_id: CriteriaTypeId.Essential,
    job_poster_id: 1,
    skill_id: 1,
    skill_level_id: SkillLevelId.Basic,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my first critical criterion",
    },
    fr: {
      description: "French for my first critical criterion",
    },
  },
  {
    id: 2,
    criteria_type_id: CriteriaTypeId.Asset,
    job_poster_id: 1,
    skill_id: 2,
    skill_level_id: SkillLevelId.Intermediate,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my second critical criterion",
    },
    fr: {
      description: "French for my second critical criterion",
    },
  },
  {
    id: 3,
    criteria_type_id: CriteriaTypeId.Essential,
    job_poster_id: 1,
    skill_id: 3,
    skill_level_id: SkillLevelId.Advanced,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my third critical criterion",
    },
    fr: {
      description: "French for my third critical criterion",
    },
  },
  {
    id: 4,
    criteria_type_id: CriteriaTypeId.Essential,
    job_poster_id: 1,
    skill_id: 4,
    skill_level_id: SkillLevelId.Expert,
    description: "Stringy", // TODO: remove un-localized description
    skill: jediSkill, // TODO: remove skill from here
    en: {
      description: "English for my fourth critical criterion",
    },
    fr: {
      description: "French for my fourth critical criterion",
    },
  },
];

const someAssesments: Assessment[] = [
  {
    id: 1,
    criterion_id: 1,
    assessment_type_id: AssessmentTypeId.NarrativeAssessment,
  },
  {
    id: 2,
    criterion_id: 2,
    assessment_type_id: AssessmentTypeId.ApplicationScreeningQuestion,
  },
  {
    id: 3,
    criterion_id: 3,
    assessment_type_id: AssessmentTypeId.GroupTest,
  },
];

const someRatingGuideQuestions: RatingGuideQuestion[] = [
  {
    id: 1,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.GroupTest,
    question:
      "What is the first question of the meaning of life, the universe and everything?",
  },
  {
    id: 2,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.GroupTest,
    question:
      "What is the second question of the meaning of life, the universe and everything?",
  },
  {
    id: 3,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.GroupTest,
    question:
      "What is the third question of the meaning of life, the universe and everything?",
  },
];

const someRatingGuideAnswers: RatingGuideAnswer[] = [
  {
    id: 1,
    rating_guide_question_id: 1,
    criterion_id: 1,
    expected_answer:
      "The first answer will make complete sense once you know the question.",
  },
  {
    id: 2,
    rating_guide_question_id: 2,
    criterion_id: 2,
    expected_answer:
      "The second answer will make complete sense once you know the question.",
  },
  {
    id: 3,
    rating_guide_question_id: 3,
    criterion_id: 3,
    expected_answer:
      "The third answer will make complete sense once you know the question.",
  },
  {
    id: 4,
    rating_guide_question_id: 4,
    criterion_id: 4,
    expected_answer:
      "The fourth answer will make complete sense once you know the question.",
  },
];

test("Test that jest can run typescript", () => {
  const one = 1;
  expect(one).toEqual(1);
});

describe("ClipboardData", (): void => {
  it("returns a truthy object", (): void => {
    expect(
      clipboardData(
        someCriteria,
        someRatingGuideQuestions,
        someRatingGuideAnswers,
      ),
    ).toBeTruthy();
  });
  it("returns an array equal to the number of Criteria", (): void => {
    expect(
      clipboardData(
        someCriteria,
        someRatingGuideQuestions,
        someRatingGuideAnswers,
      ).length,
    ).toEqual(someCriteria.length);
  });
  it("returns an array equal to the number of Criteria", (): void => {

    expect(
      clipboardData(
        someCriteria,
        someRatingGuideQuestions,
        someRatingGuideAnswers,
      )[0].skillName,
    ).toEqual("jedi");
  });
});

// export interface Skill {
//   id: number;
//   name: string;
//   description: string;
//   skill_type_id: number;
//   en: SkillTranslation;
//   fr: SkillTranslation;
// }

// export interface SkillTranslation {
//   name: string;
//   description: string;
// }
