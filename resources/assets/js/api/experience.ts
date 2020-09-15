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
export const getCreateExperienceEndpoint = (experience: Experience): string => {
  if (experience.experienceable_type === "application") {
    throw new Error(
      "There is no API endpoint for creating Experience directly attached to applications.",
    );
  }
  return `${baseUrl()}/applicants/${
    experience.experienceable_id
  }/${experience.type.replace("_", "-")}`;
};

export const getExperienceSkillEndpoint = (id: number | null = null): string =>
  `${baseUrl()}/experience-skills/${id ?? ""}`;
