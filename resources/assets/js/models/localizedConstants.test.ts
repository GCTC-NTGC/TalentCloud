/* eslint-disable @typescript-eslint/camelcase */
import { skillLevelName, skillLevelDescription } from "./localizedConstants";
import { SkillLevelId, SkillTypeId, enumToIds } from "./lookupConstants";

test("enumToIds works", (): void => {
  const skillLevelIdValues: number[] = enumToIds(SkillLevelId);
  expect(skillLevelIdValues).toEqual([1, 2, 3, 4]);
});

describe("skillLevelName", (): void => {
  it("returns a truthy object", (): void => {
    expect(skillLevelName(1, 1)).toBeTruthy();
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
