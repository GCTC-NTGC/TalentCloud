/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import { FormattedMessage } from "react-intl";
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

const jediSkill: Skill = {
  id: 1,
  skill_type_id: SkillTypeId.Hard,
  en: { name: "English Jedi", description: "English Laser Sword User" },
  fr: { name: "French Jedi", description: "French Laser Sword User" },
};

jest.mock("../../store/skill/skillSelector", () => {
  return {
    // Define Function Mock Return Values
    getSkillById: jest.fn((x, y) => jediSkill),
  };
});

const formatMessage = (message: FormattedMessage.MessageDescriptor): string =>
  message.defaultMessage || message.id;

const someSkills: Skill[] = [
  {
    id: 1,
    skill_type_id: SkillTypeId.Hard,
    en: { name: "English jedi", description: "English Laser Sword User" },
    fr: { name: "French jedi", description: "French Laser Sword User" },
  },
  {
    id: 2,
    skill_type_id: SkillTypeId.Hard,
    en: {
      name: "English hacking",
      description: "English manipulator of technology",
    },
    fr: {
      name: "French hacking",
      description: "French manipulator of technology",
    },
  },
  {
    id: 3,
    skill_type_id: SkillTypeId.Hard,
    en: { name: "English ninja", description: "English silent and stealthy" },
    fr: { name: "French ninja", description: "French silent and stealthy" },
  },
  {
    id: 4,
    skill_type_id: SkillTypeId.Soft,
    en: { name: "English joker", description: "English teller of jokes" },
    fr: { name: "French joker", description: "French teller of jokes" },
  },
];

const someCriteria: Criteria[] = [
  {
    id: 1,
    criteria_type_id: CriteriaTypeId.Essential,
    job_poster_id: 1,
    skill_id: 1,
    skill_level_id: SkillLevelId.Basic,
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
  {
    id: 4,
    criterion_id: 4,
    assessment_type_id: AssessmentTypeId.GroupTest,
  },
];

const someRatingGuideQuestions: RatingGuideQuestion[] = [
  {
    id: 1,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.NarrativeAssessment,
    question:
      "What is the first question of the meaning of life, the universe and everything?",
  },
  {
    id: 2,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.ApplicationScreeningQuestion,
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
  {
    id: 4,
    job_poster_id: 1,
    assessment_type_id: AssessmentTypeId.GroupTest,
    question:
      "What is the fourth question of the meaning of life, the universe and everything?",
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

const defaultClipboardData = clipboardData(
  someAssesments,
  someCriteria,
  someSkills,
  someRatingGuideQuestions,
  someRatingGuideAnswers,
  "en",
  formatMessage,
);

describe("ClipboardData", (): void => {
  it("returns a truthy object", (): void => {
    expect(defaultClipboardData).toBeTruthy();
  });
  it("returns an array equal to the number of Criteria", (): void => {
    expect(defaultClipboardData.length).toEqual(someCriteria.length);
  });
  it("returns the associated localized skill name for each criteria", (): void => {
    expect(defaultClipboardData[0].skillName).toEqual("English hacking");
    expect(defaultClipboardData[1].skillName).toEqual("English joker");
    expect(defaultClipboardData[2].skillName).toEqual("English ninja");
    expect(defaultClipboardData[3].skillName).toEqual("English jedi");
  });
  it("returns the associated answer description for each criteria", (): void => {
    expect(defaultClipboardData[0].modelAnswer).toEqual(
      "The second answer will make complete sense once you know the question.",
    );
    expect(defaultClipboardData[1].modelAnswer).toEqual(
      "The fourth answer will make complete sense once you know the question.",
    );
    expect(defaultClipboardData[2].modelAnswer).toEqual(
      "The third answer will make complete sense once you know the question.",
    );
    expect(defaultClipboardData[3].modelAnswer).toEqual(
      "The first answer will make complete sense once you know the question.",
    );
  });
  it("returns the associated question description for each criteria", (): void => {
    expect(defaultClipboardData[0].question).toEqual(
      "What is the second question of the meaning of life, the universe and everything?",
    );
    expect(defaultClipboardData[1].question).toEqual(
      "What is the fourth question of the meaning of life, the universe and everything?",
    );
    expect(defaultClipboardData[2].question).toEqual(
      "What is the third question of the meaning of life, the universe and everything?",
    );
    expect(defaultClipboardData[3].question).toEqual(
      "What is the first question of the meaning of life, the universe and everything?",
    );
  });
  it("returns the proper skill level name as the target skill level", (): void => {
    expect(defaultClipboardData[0].skillLevel).toEqual(
      "Moderately in Evidence",
    );
    expect(defaultClipboardData[1].skillLevel).toEqual(
      "Deep Level Demonstration",
    );
    expect(defaultClipboardData[2].skillLevel).toEqual("Advanced");
    expect(defaultClipboardData[3].skillLevel).toEqual("Beginner");
  });
  it("returns the proper criteria type", (): void => {
    expect(defaultClipboardData[0].criteriaTypeName).toEqual("Asset");
    expect(defaultClipboardData[1].criteriaTypeName).toEqual("Essential");
    expect(defaultClipboardData[2].criteriaTypeName).toEqual("Essential");
    expect(defaultClipboardData[3].criteriaTypeName).toEqual("Essential");
  });
  it("returns the proper assessment type", (): void => {
    expect(defaultClipboardData[0].title).toEqual(
      "Application Screening Question",
    );
    expect(defaultClipboardData[1].title).toEqual("Group Test");
    expect(defaultClipboardData[2].title).toEqual("Group Test");
    expect(defaultClipboardData[3].title).toEqual("Narrative Review");
  });
  it("returns a unique id", (): void => {
    expect(defaultClipboardData[0].id).toEqual("A2-Q2-T2-AN2");
    expect(defaultClipboardData[1].id).toEqual("A3-Q4-T1-AN4");
    expect(defaultClipboardData[2].id).toEqual("A3-Q3-T1-AN3");
    expect(defaultClipboardData[3].id).toEqual("A1-Q1-T1-AN1");
  });
});
