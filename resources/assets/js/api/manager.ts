import { baseUrl } from "./base";

export const getManagerEndpoint = (id: number): string =>
  `${baseUrl()}/managers/${id}`;

export default { getManagerEndpoint };
