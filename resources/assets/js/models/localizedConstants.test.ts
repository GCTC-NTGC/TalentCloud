/* eslint-disable @typescript-eslint/camelcase */
import { skillLevelName } from "./localizedConstants";
import { SkillLevelId, SkillTypeId } from "./lookupConstants";

test("This file actually runs tests", (): void => {
  const one = 1;
  expect(one).toEqual(1);
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
