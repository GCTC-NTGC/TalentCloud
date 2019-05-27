import { Skill, Criteria } from "../../models/types";
import { RootState } from "../store";
import { hasKey } from "../../helpers/queries";
import { getCriteriaById } from "../Job/jobSelector";

export const getSkills = (state: RootState): Skill[] =>
  Object.values(state.skill.entities.skills.byId);

export const getSkillById = (state: RootState, id: number): Skill | null =>
  hasKey(state.skill.entities.skills.byId, id)
    ? state.skill.entities.skills.byId[id]
    : null;

export const getCriteriaToSkills = (
  state: RootState,
  criteriaIds: number[],
): { [criteriaId: number]: Skill } => {
  const criteria: Criteria[] = criteriaIds
    .map((id: number): Criteria | null => getCriteriaById(state, id))
    .filter(criteria => criteria !== null) as Criteria[];
  return criteria.reduce(
    (
      result: { [criteriaId: number]: Skill },
      criterion: Criteria,
    ): { [criteriaId: number]: Skill } => {
      const skill = getSkillById(state, criterion.skill_id);
      return skill !== null
        ? {
            ...result,
            [criterion.id]: skill,
          }
        : result;
    },
    {},
  );
};
