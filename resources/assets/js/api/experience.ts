import { baseUrl, parseDate } from "./base";
import { Experience } from "../models/types";

export const parseSingleExperience = (data: any): Experience => {
  const experience = { ...data };
  if (data.start_date) {
    experience.start_date = parseDate(data.start_date);
  }
  if (data.end_date) {
    experience.end_date = parseDate(data.end_date);
  }
  if (data.awarded_date) {
    experience.awarded_date = parseDate(data.awarded_date);
  }
  return experience;
};

export const parseExperience = (data: any): Experience[] =>
  data.map(parseSingleExperience);

export const getApplicantExperienceEndpoint = (applicantId: number): string =>
  `${baseUrl()}/applicants/${applicantId}/experience`; // FIXME: this url doesn't exist yet.

export const getApplicationExperienceEndpoint = (
  applicationId: number,
): string => `${baseUrl()}/applications/${applicationId}/experience`; // FIXME: this url doesn't exist yet.

export const getExperienceEndpoint = (
  id: number | null,
  type: Experience["type"],
): string => `${baseUrl()}/experience/${type}/${id ?? ""}`; // FIXME: this url doesn't exist yet.
