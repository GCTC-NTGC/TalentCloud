import { Criteria, Skill } from "../../models/types";
import { fakeCriterion } from "../../fakeData/fakeJob";
import { fakeSkill2 } from "../../fakeData/fakeSkills";
import { skillAlreadySelected } from "./JobBuilderSkills";

describe("Job Builder Skills", (): void => {
  describe("skillAlreadySelected", (): void => {
    it("returns false when criteria contains other skills, but not the specified", (): void => {
      const criteria: Criteria[] = [fakeCriterion()];
      const skill: Skill = fakeSkill2();
      expect(skillAlreadySelected(criteria, skill)).toEqual(false);
    });
  });
});
