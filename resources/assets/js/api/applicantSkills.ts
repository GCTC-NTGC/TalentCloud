import { baseUrl } from "./base";

// eslint-disable-next-line import/prefer-default-export
export const getApplicantSkillsEndpoint = (applicantId: number): string =>
  `${baseUrl()}/applicants/${applicantId}/skills`;
