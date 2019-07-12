import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { Department } from "../../models/types";
import {
  getDepartmentsEndpoint,
  parseDepartmentsResponse,
} from "../../api/department";

export const GET_DEPTS_STARTED = "DEPARTMENT: GET STARTED";
export const GET_DEPTS_SUCCEEDED = "DEPARTMENT: GET SUCCEEDED";
export const GET_DEPTS_FAILED = "DEPARTMENT: GET FAILED";

export type GetDeptsAction = AsyncFsaActions<
  typeof GET_DEPTS_STARTED,
  typeof GET_DEPTS_SUCCEEDED,
  typeof GET_DEPTS_FAILED,
  Department[],
  {}
>;

export const getDepartments = (): RSAActionTemplate<
  typeof GET_DEPTS_STARTED,
  typeof GET_DEPTS_SUCCEEDED,
  typeof GET_DEPTS_FAILED,
  Department[],
  {}
> =>
  asyncGet(
    getDepartmentsEndpoint(),
    GET_DEPTS_STARTED,
    GET_DEPTS_SUCCEEDED,
    GET_DEPTS_FAILED,
    parseDepartmentsResponse,
    {},
  );

export type DeptAction = GetDeptsAction;
