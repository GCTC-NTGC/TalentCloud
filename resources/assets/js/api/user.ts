import { baseUrl } from "./base";
import { User } from "../models/types";

export const getAllUsersEndpoint = (): string => `${baseUrl()}/users`;
export const parseAllUsersResponse = (data: any): User[] => data;

export const getUserEndpoint = (id: number): string =>
  `${baseUrl()}/users/${id}`;
