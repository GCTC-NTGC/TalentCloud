/* eslint-disable camelcase */
import { baseUrl, parseDate } from "./base";
import { Experience, ExperienceSkill } from "../models/types";

export interface ExperienceResponse {
  experience: Experience;
  experienceSkills: ExperienceSkill[];
}

export const parseSingleExperience = (data: any): ExperienceResponse => {
  const { experience_skills, ...experience } = data;
  return {
    experience,
    experienceSkills: experience_skills,
  };
};

export const parseExperience = (data: any): ExperienceResponse[] =>
  data.map(parseSingleExperience);

export const parseExperienceSkill = (data: any): ExperienceSkill => {
  return {
    ...data,
    created_at: parseDate(data.created_at),
    updated_at: parseDate(data.updated_at),
  };
};

export const parseBatchExperienceSkills = (data: any): ExperienceSkill[] =>
  data.map(parseExperienceSkill);

export const getApplicantExperienceEndpoint = (applicantId: number): string =>
  `${baseUrl()}/applicants/${applicantId}/experience`;

export const getApplicationExperienceEndpoint = (
  applicationId: number,
): string => `${baseUrl(2)}/applications/${applicationId}/experience`;

/**
 * This endpoint can be used to update (PUT) or delete (DELETE) Experiences.
 */
export const getExperienceEndpoint = (
  id: number,
  type: Experience["type"],
): string => `${baseUrl()}/${type.replace("_", "-")}/${id}`;

/**
 * This endpoint is used for creating (POST) new Experiences. They must be associated with an Applicant.
 */
export const getCreateExperienceEndpoint = (
  applicantId: number,
  type: Experience["type"],
): string => {
  return `${baseUrl()}/applicants/${applicantId}/${type.replace("_", "-")}`;
};

export const getApplicantExperienceSkillsEndpoint = (
  applicantId: number,
): string => `${baseUrl()}/applicants/${applicantId}/experience-skills`;

export const getExperienceSkillEndpoint = (id: number | null = null): string =>
  `${baseUrl()}/experience-skills/${id ?? ""}`;

export const getBatchCreateExperienceSkillsEndpoint = (): string =>
  `${baseUrl()}/experience-skills/batch-store`;
export const getBatchUpdateExperienceSkillsEndpoint = (): string =>
  `${baseUrl()}/experience-skills/batch-update`;
export const getBatchDeleteExperienceSkillsEndpoint = (): string =>
  `${baseUrl()}/experience-skills/batch-destroy`;
