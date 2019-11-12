/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
import { MessageDescriptor } from "react-intl";
import {
  Criteria,
  Assessment,
  RatingGuideQuestion,
  RatingGuideAnswer,
  Skill,
} from "../../models/types";
import { fakeCriterion } from "../../fakeData/fakeJob";
import { fakeAnswers } from "../../fakeData/fakeRatingGuideAnswer";
import { fakeQuestions } from "../../fakeData/fakeRatingGuideQuestion";
import { fakeSkill } from "../../fakeData/fakeSkills";
import { AssessmentTypeId } from "../../models/lookupConstants";
import {
  assessmentType,
  skillLevelName,
  criteriaType,
} from "../../models/localizedConstants";
import { clipboardData, ClipboardTableRowProps } from "./RatingGuideClipboard";

const jediSkill: Skill = fakeSkill();

jest.mock("../../store/Skill/skillSelector", (): object => {
  return {
    // Define Function Mock Return Values
    getSkillById: jest.fn((): object => jediSkill),
  };
});

const formatMessage = (message: MessageDescriptor): string =>
  message.defaultMessage || message.id;

const someSkills: Skill[] = [
  fakeSkill(),
  fakeSkill(),
  fakeSkill(),
  fakeSkill(),
];

const someCriteria: Criteria[] = [1, 2, 3, 4].map(
  (id: number): Criteria => fakeCriterion(id),
);

const someAssessments: Assessment[] = [
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

const someRatingGuideQuestions: RatingGuideQuestion[] = fakeQuestions();

const someRatingGuideAnswers: RatingGuideAnswer[] = fakeAnswers();

const defaultClipboardData = clipboardData(
  someAssessments,
  someCriteria,
  someSkills,
  someRatingGuideQuestions,
  someRatingGuideAnswers,
  "en",
  formatMessage,
);

const expectedOutput: ClipboardTableRowProps[] = [
  {
    id: `A${someRatingGuideQuestions[1].assessment_type_id}-Q${someRatingGuideQuestions[1].id}-T${someCriteria[1].criteria_type_id}-AN${someRatingGuideAnswers[1].id}`,
    title: formatMessage(assessmentType(someAssessments[1].assessment_type_id)),
    question: someRatingGuideQuestions[1].question,
    skillLevel: formatMessage(
      skillLevelName(
        someCriteria[1].skill_level_id,
        someSkills[1].skill_type_id,
      ),
    ),
    criteriaTypeName: formatMessage(
      criteriaType(someCriteria[1].criteria_type_id),
    ),
    skillName: someSkills[1].en.name,
    skillDescription: someSkills[1].en.description,
    modelAnswer: someRatingGuideAnswers[1].expected_answer,
  },
  {
    id: `A${someRatingGuideQuestions[3].assessment_type_id}-Q${someRatingGuideQuestions[3].id}-T${someCriteria[3].criteria_type_id}-AN${someRatingGuideAnswers[3].id}`,
    title: formatMessage(assessmentType(someAssessments[3].assessment_type_id)),
    question: someRatingGuideQuestions[3].question,
    skillLevel: formatMessage(
      skillLevelName(
        someCriteria[3].skill_level_id,
        someSkills[3].skill_type_id,
      ),
    ),
    criteriaTypeName: formatMessage(
      criteriaType(someCriteria[3].criteria_type_id),
    ),
    skillName: someSkills[3].en.name,
    skillDescription: someSkills[3].en.description,
    modelAnswer: someRatingGuideAnswers[3].expected_answer,
  },
  {
    id: `A${someRatingGuideQuestions[2].assessment_type_id}-Q${someRatingGuideQuestions[2].id}-T${someCriteria[2].criteria_type_id}-AN${someRatingGuideAnswers[2].id}`,
    title: formatMessage(assessmentType(someAssessments[2].assessment_type_id)),
    question: someRatingGuideQuestions[2].question,
    skillLevel: formatMessage(
      skillLevelName(
        someCriteria[2].skill_level_id,
        someSkills[2].skill_type_id,
      ),
    ),
    criteriaTypeName: formatMessage(
      criteriaType(someCriteria[2].criteria_type_id),
    ),
    skillName: someSkills[2].en.name,
    skillDescription: someSkills[2].en.description,
    modelAnswer: someRatingGuideAnswers[2].expected_answer,
  },
  {
    id: `A${someRatingGuideQuestions[0].assessment_type_id}-Q${someRatingGuideQuestions[0].id}-T${someCriteria[0].criteria_type_id}-AN${someRatingGuideAnswers[0].id}`,
    title: formatMessage(assessmentType(someAssessments[0].assessment_type_id)),
    question: someRatingGuideQuestions[0].question,
    skillLevel: formatMessage(
      skillLevelName(
        someCriteria[0].skill_level_id,
        someSkills[0].skill_type_id,
      ),
    ),
    criteriaTypeName: formatMessage(
      criteriaType(someCriteria[0].criteria_type_id),
    ),
    skillName: someSkills[0].en.name,
    skillDescription: someSkills[0].en.description,
    modelAnswer: someRatingGuideAnswers[0].expected_answer,
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
