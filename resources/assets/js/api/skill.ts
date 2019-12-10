/* eslint-disable @typescript-eslint/camelcase */
import { baseUrl, ApiResponse, axios } from "./base";
import { Skill } from "../models/types";

export const parseSkill = (data: any): Skill => data;

export const getSkills = (): Promise<Skill[]> => {
  return axios
    .get(`${baseUrl()}/skills/`)
    .then((response: ApiResponse): Skill[] =>
      response.data.skills.reduce((skills: Skill[], data): Skill[] => {
        skills.push(parseSkill(data));
        return skills;
      }, []),
    );
};
