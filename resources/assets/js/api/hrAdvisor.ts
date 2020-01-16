import { baseUrl } from "./base";

export const getHrAdvisorEndpoint = (id: number): string =>
  `${baseUrl()}/hr-advisors/${id}`;

export const getClaimJobEndpoint = (advisorId: number, jobId: number): string =>
  // TODO: Modify route
  `${getHrAdvisorEndpoint(advisorId)}/claims/${jobId}`;
