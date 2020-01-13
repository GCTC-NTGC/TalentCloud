import { baseUrl } from "./base";

export const getAllUsersEndpoint = (): string => `${baseUrl()}/users`;

export const getUserEndpoint = (id: number): string =>
  `${baseUrl()}/users/${id}`;
