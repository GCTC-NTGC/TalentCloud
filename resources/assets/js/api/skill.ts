/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ResponseData, baseUrl, ApiResponse, axiosConfig } from "./base";
import { Skill, SkillTranslation } from "../models/types";
import { hasKey } from "../helpers/queries";

export const parseSkillTranslation = (
  data: ResponseData,
): SkillTranslation => ({
  name: data.name,
  description: data.description,
});

export const parseSkill = (data: any): Skill => data;

export const getSkills = (): Promise<Skill[]> => {
  return axios
    .get(`${baseUrl()}/skills/`, axiosConfig)
    .then((response: ApiResponse): Skill[] =>
      response.data.skills.reduce((skills: Skill[], data): Skill[] => {
        skills.push(parseSkill(data));
        return skills;
      }, []),
    );
};
