/* eslint-disable no-undef */
import {
  skillLevelName,
  skillLevelDescription,
  assessmentType,
  criteriaType,
} from "./localizedConstants";
import {
  AssessmentTypeId,
  CriteriaTypeId,
  SkillLevelId,
  SkillTypeId,
  enumToIds,
} from "./lookupConstants";

test("enumToIds works", (): void => {
  const skillLevelIdValues: number[] = enumToIds(SkillLevelId);
  expect(skillLevelIdValues).toEqual([1, 2, 3, 4]);
});

describe("skillLevelName", (): void => {
  it("returns a truthy object", (): void => {
    expect(skillLevelName(1, 1)).toBeTruthy();
  });

  it("raise an error when skill level value is not part of enum", (): void => {
    function badSkillLevel(): void {
      skillLevelName(42, SkillTypeId.Soft);
    }
    expect(badSkillLevel).toThrow("invalid SkillLevelIdValue");
  });

  it("raise an error when skill type value is not part of enum", (): void => {
    function badSkillType(): void {
      skillLevelName(SkillLevelId.Basic, 42);
    }
    expect(badSkillType).toThrow("invalid SkillTypeIdValue");
  });

  it("returns a basic soft localization", (): void => {
    expect(skillLevelName(SkillLevelId.Basic, SkillTypeId.Soft).id).toEqual(
      "skillLevel.soft.basic.name",
    );
  });

  it("returns a intermediate soft localization", (): void => {
    expect(
      skillLevelName(SkillLevelId.Intermediate, SkillTypeId.Soft).id,
    ).toEqual("skillLevel.soft.intermediate.name");
  });

  it("returns a advanced soft localization", (): void => {
    expect(skillLevelName(SkillLevelId.Advanced, SkillTypeId.Soft).id).toEqual(
      "skillLevel.soft.advanced.name",
    );
  });

  it("returns a expert soft localization", (): void => {
    expect(skillLevelName(SkillLevelId.Expert, SkillTypeId.Soft).id).toEqual(
      "skillLevel.soft.expert.name",
    );
  });

  it("returns a basic hard localization", (): void => {
    expect(skillLevelName(SkillLevelId.Basic, SkillTypeId.Hard).id).toEqual(
      "skillLevel.hard.basic.name",
    );
  });

  it("returns a intermediate hard localization", (): void => {
    expect(
      skillLevelName(SkillLevelId.Intermediate, SkillTypeId.Hard).id,
    ).toEqual("skillLevel.hard.intermediate.name");
  });

  it("returns a advanced hard localization", (): void => {
    expect(skillLevelName(SkillLevelId.Advanced, SkillTypeId.Hard).id).toEqual(
      "skillLevel.hard.advanced.name",
    );
  });

  it("returns a expert hard localization", (): void => {
    expect(skillLevelName(SkillLevelId.Expert, SkillTypeId.Hard).id).toEqual(
      "skillLevel.hard.expert.name",
    );
  });
});

describe("skillLevelDescription", (): void => {
  it("returns a truthy object", (): void => {
    expect(skillLevelDescription(1, 1)).toBeTruthy();
  });

  it("raise an error when skill level value is not part of enum", (): void => {
    function badSkillLevel(): void {
      skillLevelName(42, SkillTypeId.Soft);
    }
    expect(badSkillLevel).toThrow("invalid SkillLevelIdValue");
  });

  it("raise an error when skill type value is not part of enum", (): void => {
    function badSkillType(): void {
      skillLevelName(SkillLevelId.Basic, 42);
    }
    expect(badSkillType).toThrow("invalid SkillTypeIdValue");
  });

  it("returns a basic soft localization", (): void => {
    expect(
      skillLevelDescription(SkillLevelId.Basic, SkillTypeId.Soft).id,
    ).toEqual("skillLevel.soft.basic.description");
  });

  it("returns a intermediate soft localization", (): void => {
    expect(
      skillLevelDescription(SkillLevelId.Intermediate, SkillTypeId.Soft).id,
    ).toEqual("skillLevel.soft.intermediate.description");
  });

  it("returns a advanced soft localization", (): void => {
    expect(
      skillLevelDescription(SkillLevelId.Advanced, SkillTypeId.Soft).id,
    ).toEqual("skillLevel.soft.advanced.description");
  });

  it("returns a expert soft localization", (): void => {
    expect(
      skillLevelDescription(SkillLevelId.Expert, SkillTypeId.Soft).id,
    ).toEqual("skillLevel.soft.expert.description");
  });

  it("returns a basic hard localization", (): void => {
    expect(
      skillLevelDescription(SkillLevelId.Basic, SkillTypeId.Hard).id,
    ).toEqual("skillLevel.hard.basic.description");
  });

  it("returns a intermediate hard localization", (): void => {
    expect(
      skillLevelDescription(SkillLevelId.Intermediate, SkillTypeId.Hard).id,
    ).toEqual("skillLevel.hard.intermediate.description");
  });

  it("returns a advanced hard localization", (): void => {
    expect(
      skillLevelDescription(SkillLevelId.Advanced, SkillTypeId.Hard).id,
    ).toEqual("skillLevel.hard.advanced.description");
  });

  it("returns a expert hard localization", (): void => {
    expect(
      skillLevelDescription(SkillLevelId.Expert, SkillTypeId.Hard).id,
    ).toEqual("skillLevel.hard.expert.description");
  });
});

describe("assessmentType", (): void => {
  it("returns a truthy object", (): void => {
    expect(assessmentType(AssessmentTypeId.NarrativeAssessment)).toBeTruthy();
  });

  it("raise an error when Assessment Type value is not part of enum", (): void => {
    function badAssessmentType(): void {
      assessmentType(42);
    }
    expect(badAssessmentType).toThrow("invalid AssessmentTypeValue");
  });

  it("returns a narrative assessment localization", (): void => {
    expect(assessmentType(AssessmentTypeId.NarrativeAssessment).id).toEqual(
      "assessmentType.narrativeAssessment",
    );
  });

  it("returns a narrative assessment localization", (): void => {
    expect(assessmentType(AssessmentTypeId.NarrativeAssessment).id).toEqual(
      "assessmentType.narrativeAssessment",
    );
  });

  it("returns a group test localization", (): void => {
    expect(assessmentType(AssessmentTypeId.GroupTest).id).toEqual(
      "assessmentType.groupTest",
    );
  });

  it("returns an informal phone conversation localization", (): void => {
    expect(
      assessmentType(AssessmentTypeId.InformalPhoneConversation).id,
    ).toEqual("assessmentType.informalPhoneConversation");
  });

  it("returns an interview localization", (): void => {
    expect(assessmentType(AssessmentTypeId.Interview).id).toEqual(
      "assessmentType.interview",
    );
  });

  it("returns an online exam localization", (): void => {
    expect(assessmentType(AssessmentTypeId.OnlineExam).id).toEqual(
      "assessmentType.onlineExam",
    );
  });

  it("returns an on site exam localization", (): void => {
    expect(assessmentType(AssessmentTypeId.OnSiteExam).id).toEqual(
      "assessmentType.onSiteExam",
    );
  });

  it("returns a take home exam localization", (): void => {
    expect(assessmentType(AssessmentTypeId.TakeHomeExam).id).toEqual(
      "assessmentType.takeHomeExam",
    );
  });

  it("returns a portfolio review localization", (): void => {
    expect(assessmentType(AssessmentTypeId.PortfolioReview).id).toEqual(
      "assessmentType.portfolioReview",
    );
  });

  it("returns a reference check localization", (): void => {
    expect(assessmentType(AssessmentTypeId.ReferenceCheck).id).toEqual(
      "assessmentType.referenceCheck",
    );
  });

  it("returns a serious Games localization", (): void => {
    expect(assessmentType(AssessmentTypeId.SeriousGames).id).toEqual(
      "assessmentType.seriousGames",
    );
  });
});

describe("criteriaType", (): void => {
  it("returns a truthy object", (): void => {
    expect(criteriaType(CriteriaTypeId.Asset)).toBeTruthy();
  });

  it("raise an error when Assessment Type value is not part of enum", (): void => {
    function badCriteriaType(): void {
      criteriaType(42);
    }
    expect(badCriteriaType).toThrow("invalid CriteriaTypeValue");
  });

  it("returns an asset localization", (): void => {
    expect(criteriaType(CriteriaTypeId.Asset).id).toEqual(
      "criteriaType.asset",
    );
  });

  it("returns an essential localization", (): void => {
    expect(criteriaType(CriteriaTypeId.Essential).id).toEqual(
      "criteriaType.essential",
    );
  });
});

