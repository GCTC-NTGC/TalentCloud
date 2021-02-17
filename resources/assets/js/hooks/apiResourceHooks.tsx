/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getApplicantSkillsEndpoint } from "../api/applicantSkills";
import {
  getApplicantExperienceEndpoint,
  getApplicantExperienceSkillsEndpoint,
  getCreateExperienceEndpoint,
  getExperienceEndpoint,
  getExperienceSkillEndpoint,
  parseSingleExperience,
} from "../api/experience";
import { getSkillCategoriesEndpoint, getSkillsEndpoint } from "../api/skill";
import {
  Experience,
  ExperienceSkill,
  Skill,
  SkillCategory,
} from "../models/types";
import { useResource, useResourceIndex } from "./webResourceHooks";

export const useSkills = () => {
  // The skills endpoint doesn't allow updates, so don't return that function.
  const { update, ...resource } = useResource<Skill[]>(getSkillsEndpoint(), []);
  return resource;
};

export const useSkillCategories = () => {
  // The SkillCategories endpoint doesn't allow updates, so don't return that function.
  const { update, ...resource } = useResource<SkillCategory[]>(
    getSkillCategoriesEndpoint(),
    [],
  );
  return resource;
};

export const useApplicantSkillIds = (applicantId: number) => {
  return useResource<{ skill_ids: number[] }>(
    getApplicantSkillsEndpoint(applicantId),
    {
      skill_ids: [],
    },
  );
};

export const useApplicantExperience = (applicantId: number) => {
  return useResourceIndex<Experience>(
    getApplicantExperienceEndpoint(applicantId),
    {
      parseEntityResponse: (response) =>
        parseSingleExperience(response).experience,
      resolveEntityEndpoint: (_, entity) =>
        getExperienceEndpoint(entity.id, entity.type),
      resolveCreateEndpoint: (_, entity) =>
        getCreateExperienceEndpoint(applicantId, entity.type),
    },
  );
};

export const useApplicantExperienceSkills = (applicantId: number) => {
  return useResourceIndex<ExperienceSkill>(
    getApplicantExperienceSkillsEndpoint(applicantId),
    {
      resolveEntityEndpoint: (_, entity) =>
        getExperienceSkillEndpoint(entity.id),
      resolveCreateEndpoint: (_, entity) => getExperienceSkillEndpoint(null),
    },
  );
};
