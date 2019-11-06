import { baseUrl } from "./base";

export const getManagerEndpoint = (id: number): string =>
  `${baseUrl()}/managers/${id}`;

export const getCurrentManagerEndpoint = (): string =>
  `${baseUrl()}/currentuser/manager`;

export default { getManagerEndpoint, getCurrentManagerEndpoint };
