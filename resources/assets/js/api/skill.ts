/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ResponseData, baseUrl, ApiResponse } from "./base";
import { Skill, SkillTranslation } from "../models/types";
import { hasKey } from "../helpers/queries";

export const parseSkillTranslation = (
  data: ResponseData,
): SkillTranslation => ({
  name: data.name,
  description: data.description,
});

export const parseSkill = (data: ResponseData): Skill => ({
  id: Number(data.id),
  skill_type_id: Number(data.skill_type_id),
  name: data.name,
  description: data.description,
  // TODO: remove the hasKey hack when removing skill from Criteria
  en: hasKey(data, "en")
    ? parseSkillTranslation(data.en)
    : parseSkillTranslation(data),
  fr: hasKey(data, "fr")
    ? parseSkillTranslation(data.fr)
    : parseSkillTranslation(data),
});

export const getSkills = (): Promise<Skill[]> => {
  return axios.get(`${baseUrl()}/skills/`).then(
    (response: ApiResponse): Skill[] =>
      response.data.skills.reduce((skills: Skill[], data): Skill[] => {
        skills.push(parseSkill(data));
        return skills;
      }, []),
  );
};
