import { baseUrl } from "./base";

// eslint-disable-next-line import/prefer-default-export
export const getApplicantProfileEndpoint = (applicantId: number): string =>
  `${baseUrl()}/applicant/${applicantId}/profile`;
