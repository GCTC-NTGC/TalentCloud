import {
  AsyncFsaActions,
  RSAActionTemplate,
  asyncGet,
  asyncPut,
} from "../asyncAction";
import { Manager } from "../../models/types";
import {
  getManagerEndpoint,
  getCurrentManagerEndpoint,
} from "../../api/manager";
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

export const FETCH_CURRENT_MANAGER_STARTED = "MANAGER: GET CURRENT STARTED";
export const FETCH_CURRENT_MANAGER_SUCCEEDED = "MANAGER: GET CURRENT SUCCEEDED";
export const FETCH_CURRENT_MANAGER_FAILED = "MANAGER: GET CURRENT FAILED";

export type FetchCurrentManagerAction = AsyncFsaActions<
  typeof FETCH_CURRENT_MANAGER_STARTED,
  typeof FETCH_CURRENT_MANAGER_SUCCEEDED,
  typeof FETCH_CURRENT_MANAGER_FAILED,
  Manager,
  null
>;

export const fetchCurrentManager = (): RSAActionTemplate<
  typeof FETCH_CURRENT_MANAGER_STARTED,
  typeof FETCH_CURRENT_MANAGER_SUCCEEDED,
  typeof FETCH_CURRENT_MANAGER_FAILED,
  Manager,
  null
> =>
  asyncGet(
    getCurrentManagerEndpoint(),
    FETCH_CURRENT_MANAGER_STARTED,
    FETCH_CURRENT_MANAGER_SUCCEEDED,
    FETCH_CURRENT_MANAGER_FAILED,
    (response): Manager => response,
    null,
  );

export const UPDATE_MANAGER_STARTED = "MANAGER: UPDATE STARTED";
export const UPDATE_MANAGER_SUCCEEDED = "MANAGER: UPDATE SUCCEEDED";
export const UPDATE_MANAGER_FAILED = "MANAGER: UPDATE FAILED";

export type UpdateManagerAction = AsyncFsaActions<
  typeof UPDATE_MANAGER_STARTED,
  typeof UPDATE_MANAGER_SUCCEEDED,
  typeof UPDATE_MANAGER_FAILED,
  Manager,
  { id: number }
>;

export const updateManager = (
  manager: Manager,
): RSAActionTemplate<
  typeof UPDATE_MANAGER_STARTED,
  typeof UPDATE_MANAGER_SUCCEEDED,
  typeof UPDATE_MANAGER_FAILED,
  Manager,
  { id: number }
> => {
  return asyncPut(
    getManagerEndpoint(manager.id),
    manager,
    UPDATE_MANAGER_STARTED,
    UPDATE_MANAGER_SUCCEEDED,
    UPDATE_MANAGER_FAILED,
    (response): Manager => response,
    { id: manager.id },
  );
};

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
export type ManagerAction =
  | FetchManagerAction
  | FetchCurrentManagerAction
  | UpdateManagerAction
  | SetSelectedManagerAction;
