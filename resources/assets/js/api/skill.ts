import { baseUrl } from "./base";
import { Skill } from "../models/types";

export const getSkillsEndpoint = (): string => `${baseUrl()}/skills`;

export const parseSkillsResponse = (data: any): Skill[] => data;

export const parseSkill = (data: any): Skill => data;
