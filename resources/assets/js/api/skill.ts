/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ResponseData, baseUrl, ApiResponse } from "./base";
import { Skill } from "../models/types";

export const parseSkill = (data: ResponseData): Skill => ({
  id: Number(data.id),
  skill_type_id: Number(data.skill_type_id),
  name: data.name,
  description: data.description,
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
