import { Skill } from "../../models/types";
import { getSkillsEndpoint, parseSkillsResponse } from "../../api/skill";
import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";

export const FETCH_SKILLS_STARTED = "FETCH_SKILLS_STARTED";
export const FETCH_SKILLS_SUCCEEDED = "FETCH_SKILLS_SUCCEEDED";
export const FETCH_SKILLS_FAILED = "FETCH_SKILLS_FAILED";

export type FetchSkillsAction = AsyncFsaActions<
  typeof FETCH_SKILLS_STARTED,
  typeof FETCH_SKILLS_SUCCEEDED,
  typeof FETCH_SKILLS_FAILED,
  Skill[],
  {}
>;

export const fetchSkills = (): RSAActionTemplate<
  typeof FETCH_SKILLS_STARTED,
  typeof FETCH_SKILLS_SUCCEEDED,
  typeof FETCH_SKILLS_FAILED,
  Skill[],
  {}
> =>
  asyncGet(
    getSkillsEndpoint(),
    FETCH_SKILLS_STARTED,
    FETCH_SKILLS_SUCCEEDED,
    FETCH_SKILLS_FAILED,
    parseSkillsResponse,
    {},
  );

export type SkillAction = FetchSkillsAction;
