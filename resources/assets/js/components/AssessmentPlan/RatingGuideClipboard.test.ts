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
import { clipboardData, ClipboardTableRowProps } from "./RatingGuideClipboard";

const jediSkill: Skill = {
  id: 1,
  skill_type_id: SkillTypeId.Hard,
  en: { name: "English Jedi", description: "English Laser Sword User" },
  fr: { name: "French Jedi", description: "French Laser Sword User" },
};

jest.mock("../../store/Skill/skillSelector", (): object => {
  return {
    // Define Function Mock Return Values
    getSkillById: jest.fn((): object => jediSkill),
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

const expectedOutput: ClipboardTableRowProps[] = [
  {
    id: "A2-Q2-T2-AN2",
    title: "Application Screening Question",
    question:
      "What is the second question of the meaning of life, the universe and everything?",
    skillLevel: "Intermediate",
    criteriaTypeName: "Asset",
    skillName: "English hacking",
    skillDescription: "English manipulator of technology",
    modelAnswer:
      "The second answer will make complete sense once you know the question.",
  },
  {
    id: "A3-Q4-T1-AN4",
    title: "Group Test",
    question:
      "What is the fourth question of the meaning of life, the universe and everything?",
    skillLevel: "Deep Level Demonstration",
    criteriaTypeName: "Essential",
    skillName: "English joker",
    skillDescription: "English teller of jokes",
    modelAnswer:
      "The fourth answer will make complete sense once you know the question.",
  },
  {
    id: "A3-Q3-T1-AN3",
    title: "Group Test",
    question:
      "What is the third question of the meaning of life, the universe and everything?",
    skillLevel: "Advanced",
    criteriaTypeName: "Essential",
    skillName: "English ninja",
    skillDescription: "English silent and stealthy",
    modelAnswer:
      "The third answer will make complete sense once you know the question.",
  },
  {
    id: "A1-Q1-T1-AN1",
    title: "Narrative Review",
    question:
      "What is the first question of the meaning of life, the universe and everything?",
    skillLevel: "Beginner",
    criteriaTypeName: "Essential",
    skillName: "English jedi",
    skillDescription: "English Laser Sword User",
    modelAnswer:
      "The first answer will make complete sense once you know the question.",
  },
];
describe("ClipboardData", (): void => {
  it("returns a truthy object", (): void => {
    expect(defaultClipboardData).toBeTruthy();
  });
  it("returns an array equal to the number of Criteria", (): void => {
    expect(defaultClipboardData.length).toEqual(someCriteria.length);
  });
  it("returns the associated localized skill name for each criteria", (): void => {
    expect(defaultClipboardData[0].skillName).toEqual(
      expectedOutput[0].skillName,
    );
    expect(defaultClipboardData[1].skillName).toEqual(
      expectedOutput[1].skillName,
    );
    expect(defaultClipboardData[2].skillName).toEqual(
      expectedOutput[2].skillName,
    );
    expect(defaultClipboardData[3].skillName).toEqual(
      expectedOutput[3].skillName,
    );
  });
  it("returns the associated localized skill description for each criteria", (): void => {
    expect(defaultClipboardData[0].skillDescription).toEqual(
      expectedOutput[0].skillDescription,
    );
    expect(defaultClipboardData[1].skillDescription).toEqual(
      expectedOutput[1].skillDescription,
    );
    expect(defaultClipboardData[2].skillDescription).toEqual(
      expectedOutput[2].skillDescription,
    );
    expect(defaultClipboardData[3].skillDescription).toEqual(
      expectedOutput[3].skillDescription,
    );
  });
  it("returns the associated answer description for each criteria", (): void => {
    expect(defaultClipboardData[0].modelAnswer).toEqual(
      expectedOutput[0].modelAnswer,
    );
    expect(defaultClipboardData[1].modelAnswer).toEqual(
      expectedOutput[1].modelAnswer,
    );
    expect(defaultClipboardData[2].modelAnswer).toEqual(
      expectedOutput[2].modelAnswer,
    );
    expect(defaultClipboardData[3].modelAnswer).toEqual(
      expectedOutput[3].modelAnswer,
    );
  });
  it("returns the associated question description for each criteria", (): void => {
    expect(defaultClipboardData[0].question).toEqual(
      expectedOutput[0].question,
    );
    expect(defaultClipboardData[1].question).toEqual(
      expectedOutput[1].question,
    );
    expect(defaultClipboardData[2].question).toEqual(
      expectedOutput[2].question,
    );
    expect(defaultClipboardData[3].question).toEqual(
      expectedOutput[3].question,
    );
  });
  it("returns the proper skill level name as the target skill level", (): void => {
    expect(defaultClipboardData[0].skillLevel).toEqual(
      expectedOutput[0].skillLevel,
    );
    expect(defaultClipboardData[1].skillLevel).toEqual(
      expectedOutput[1].skillLevel,
    );
    expect(defaultClipboardData[2].skillLevel).toEqual(
      expectedOutput[2].skillLevel,
    );
    expect(defaultClipboardData[3].skillLevel).toEqual(
      expectedOutput[3].skillLevel,
    );
  });
  it("returns the proper criteria type", (): void => {
    expect(defaultClipboardData[0].criteriaTypeName).toEqual(
      expectedOutput[0].criteriaTypeName,
    );
    expect(defaultClipboardData[1].criteriaTypeName).toEqual(
      expectedOutput[1].criteriaTypeName,
    );
    expect(defaultClipboardData[2].criteriaTypeName).toEqual(
      expectedOutput[2].criteriaTypeName,
    );
    expect(defaultClipboardData[3].criteriaTypeName).toEqual(
      expectedOutput[3].criteriaTypeName,
    );
  });
  it("returns the proper assessment type", (): void => {
    expect(defaultClipboardData[0].title).toEqual(expectedOutput[0].title);
    expect(defaultClipboardData[1].title).toEqual(expectedOutput[1].title);
    expect(defaultClipboardData[2].title).toEqual(expectedOutput[2].title);
    expect(defaultClipboardData[3].title).toEqual(expectedOutput[3].title);
  });
  it("returns a unique id", (): void => {
    expect(defaultClipboardData[0].id).toEqual(expectedOutput[0].id);
    expect(defaultClipboardData[1].id).toEqual(expectedOutput[1].id);
    expect(defaultClipboardData[2].id).toEqual(expectedOutput[2].id);
    expect(defaultClipboardData[3].id).toEqual(expectedOutput[3].id);
  });
});
