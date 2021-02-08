/* eslint-disable import/prefer-default-export */
import { getApplicantSkillsEndpoint } from "../api/applicantSkills";
import { useResource } from "./webResourceHooks";

export const useApplicantSkillIds = (applicantId: number) => {
  return useResource<{ skill_ids: number[] }>(
    getApplicantSkillsEndpoint(applicantId),
    {
      skill_ids: [],
    },
  );
};
