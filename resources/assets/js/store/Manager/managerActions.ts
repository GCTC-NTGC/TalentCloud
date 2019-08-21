import { AsyncFsaActions, RSAActionTemplate, asyncGet } from "../asyncAction";
import { Manager } from "../../models/types";
import { getManagerEndpoint } from "../../api/manager";
import { Action } from "../createAction";

export const FETCH_MANAGER_STARTED = "MANAGER: GET STARTED";
export const FETCH_MANAGER_SUCCEEDED = "MANAGER: GET SUCCEEDED";
export const FETCH_MANAGER_FAILED = "MANAGER: GET FAILED";

export type FetchManagerAction = AsyncFsaActions<
  typeof FETCH_MANAGER_STARTED,
  typeof FETCH_MANAGER_SUCCEEDED,
  typeof FETCH_MANAGER_FAILED,
  Manager,
  { id: number }
>;

export const fetchManager = (
  id: number,
): RSAActionTemplate<
  typeof FETCH_MANAGER_STARTED,
  typeof FETCH_MANAGER_SUCCEEDED,
  typeof FETCH_MANAGER_FAILED,
  Manager,
  { id: number }
> =>
  asyncGet(
    getManagerEndpoint(id),
    FETCH_MANAGER_STARTED,
    FETCH_MANAGER_SUCCEEDED,
    FETCH_MANAGER_FAILED,
    (response): Manager => response,
    { id },
  );

export const SET_SELECTED_MANAGER = "MANAGER: SET SELECTED";
export type SetSelectedManagerAction = Action<
  typeof SET_SELECTED_MANAGER,
  { managerId: number | null }
>;
export const setSelectedManager = (
  id: number | null,
): SetSelectedManagerAction => ({
  type: SET_SELECTED_MANAGER,
  payload: { managerId: id },
});
export type ManagerAction = FetchManagerAction | SetSelectedManagerAction;
