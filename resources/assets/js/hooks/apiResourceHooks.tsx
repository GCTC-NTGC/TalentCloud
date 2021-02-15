/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getApplicantSkillsEndpoint } from "../api/applicantSkills";
import { getApplicantExperienceEndpoint } from "../api/experience";
import { getSkillCategoriesEndpoint, getSkillsEndpoint } from "../api/skill";
import { Skill, SkillCategory } from "../models/types";
import { useResource } from "./webResourceHooks";

export const useSkills = () => {
  // The skills endpoint doesn't allow updates, so don't return that function.
  const { update, ...resource } = useResource<Skill[]>(getSkillsEndpoint(), []);
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

// export const useApplicantExperience = (applicantId: number) => {
//   const resource = useResource(getApplicantExperienceEndpoint(applicantId));
// };

export const useSkillCategories = () => {
  // The SkillCategories endpoint doesn't allow updates, so don't return that function.
  const { update, ...resource } = useResource<SkillCategory[]>(
    getSkillCategoriesEndpoint(),
    [],
  );
  return resource;
};
