/* eslint-disable @typescript-eslint/camelcase */
import { fakeCriterion } from "../../../fakeData/fakeJob";
import { essentialSkillIdToKey, criteriaToValues } from "./CriteriaForm";
import { CriteriaTypeId } from "../../../models/lookupConstants";
import { Criteria } from "../../../models/types";

describe("CriteriaForm", (): void => {
  describe("essentialSkillIdToKey", (): void => {
    it("returns basic when passed 1", (): void => {
      expect(essentialSkillIdToKey(1)).toEqual("basic");
    });
    it("returns export when passed 4", (): void => {
      expect(essentialSkillIdToKey(4)).toEqual("expert");
    });
  });

  describe("criteriaToValues", (): void => {
    it("returns values with skillId=expert when skill_level_id=4 and criteria_type=essential", (): void => {
      const criteria: Criteria = {
        ...fakeCriterion(),
        skill_level_id: 4,
        criteria_type_id: CriteriaTypeId.Essential,
      };
      expect(criteriaToValues(criteria, "en").level).toEqual("expert");
    });
  });
});
