import { Skill } from "../../models/types";
import { RootState } from "../store";
import { hasKey } from "../../helpers/queries";

export const getSkills = (state: RootState): Skill[] =>
  Object.values(state.skill.entities.skills.byId);

export const getSkillById = (state: RootState, id: number): Skill | null =>
  hasKey(state.skill.entities.skills.byId, id)
    ? state.skill.entities.skills.byId[id]
    : null;
