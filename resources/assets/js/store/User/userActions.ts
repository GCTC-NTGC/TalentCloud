import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { User } from "../../models/types";
import {
  getUserEndpoint,
  getAllUsersEndpoint,
  parseAllUsersResponse,
} from "../../api/user";

export const FETCH_USER_STARTED = "USER: GET STARTED";
export const FETCH_USER_SUCCEEDED = "USER: GET SUCCEEDED";
export const FETCH_USER_FAILED = "USER: GET FAILED";

export type FetchUserAction = AsyncFsaActions<
  typeof FETCH_USER_STARTED,
  typeof FETCH_USER_SUCCEEDED,
  typeof FETCH_USER_FAILED,
  User,
  { id: number }
>;

export const fetchUser = (
  id: number,
): RSAActionTemplate<
  typeof FETCH_USER_STARTED,
  typeof FETCH_USER_SUCCEEDED,
  typeof FETCH_USER_FAILED,
  User,
  { id: number }
> =>
  asyncGet(
    getUserEndpoint(id),
    FETCH_USER_STARTED,
    FETCH_USER_SUCCEEDED,
    FETCH_USER_FAILED,
    (response): User => response,
    { id },
  );

export const FETCH_ALL_USERS_STARTED = "USERS: GET STARTED";
export const FETCH_ALL_USERS_SUCCEEDED = "USERS: GET SUCCEEDED";
export const FETCH_ALL_USERS_FAILED = "USERS: GET FAILED";

export type FetchAllUsersAction = AsyncFsaActions<
  typeof FETCH_ALL_USERS_STARTED,
  typeof FETCH_ALL_USERS_SUCCEEDED,
  typeof FETCH_ALL_USERS_FAILED,
  User[],
  {}
>;

export const fetchAllUsers = (
  ids = "",
): RSAActionTemplate<
  typeof FETCH_ALL_USERS_STARTED,
  typeof FETCH_ALL_USERS_SUCCEEDED,
  typeof FETCH_ALL_USERS_FAILED,
  User[],
  {}
> =>
  asyncGet(
    getAllUsersEndpoint(ids),
    FETCH_ALL_USERS_STARTED,
    FETCH_ALL_USERS_SUCCEEDED,
    FETCH_ALL_USERS_FAILED,
    parseAllUsersResponse,
    {},
  );

export type UserAction = FetchUserAction | FetchAllUsersAction;
