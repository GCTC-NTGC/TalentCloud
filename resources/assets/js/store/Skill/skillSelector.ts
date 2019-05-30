import { createSelector } from "reselect";
import { Skill, Criteria } from "../../models/types";
import { RootState } from "../store";
import { hasKey } from "../../helpers/queries";
import { getCriteriaById } from "../Job/jobSelector";

export const getSkillState = (state: RootState): { [id: number]: Skill } =>
  state.skill.entities.skills;

export const getSkills = createSelector(
  getSkillState,
  (skillState): Skill[] => Object.values(skillState),
);

export const getSkillById = (state: RootState, id: number): Skill | null =>
  hasKey(state.skill.entities.skills.byId, id)
    ? state.skill.entities.skills.byId[id]
    : null;
