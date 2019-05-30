import { createSelector } from "reselect";
import { Skill } from "../../models/types";
import { RootState } from "../store";
import { hasKey } from "../../helpers/queries";

export const getSkillState = (state: RootState): { [id: number]: Skill } =>
  state.skill.entities.skills.byId;

export const getSkills = createSelector(
  getSkillState,
  (skillState): Skill[] => Object.values(skillState),
);

export const getSkillById = (state: RootState, id: number): Skill | null =>
  hasKey(state.skill.entities.skills.byId, id)
    ? state.skill.entities.skills.byId[id]
    : null;
