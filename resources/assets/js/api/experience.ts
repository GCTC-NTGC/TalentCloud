/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import { baseUrl, parseDate } from "./base";
import { Experience, ExperienceSkill } from "../models/types";

export interface ExperienceResponse {
  experience: Experience;
  experienceSkills: ExperienceSkill[];
}

export const parseSingleExperience = (data: any): ExperienceResponse => {
  const { experience_skills, ...experience } = data;
  if (data.start_date) {
    experience.start_date = parseDate(data.start_date);
  }
  if (data.end_date) {
    experience.end_date = parseDate(data.end_date);
  }
  if (data.awarded_date) {
    experience.awarded_date = parseDate(data.awarded_date);
  }
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

export const getApplicantExperienceEndpoint = (applicantId: number): string =>
  `${baseUrl()}/applicants/${applicantId}/experience`; // FIXME: this url doesn't exist yet.

export const getApplicationExperienceEndpoint = (
  applicationId: number,
): string => `${baseUrl()}/applications/${applicationId}/experience`; // FIXME: this url doesn't exist yet.

export const getExperienceEndpoint = (
  id: number | null,
  type: Experience["type"],
): string => `${baseUrl()}/experience/${type}/${id ?? ""}`; // FIXME: this url doesn't exist yet.

export const getExperienceSkillEndpoint = (id: number | null = null): string =>
  `${baseUrl()}/experience-skills/${id ?? ""}`;
