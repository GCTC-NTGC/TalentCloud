import { Manager } from "../../models/types";
import {
  ManagerAction,
  FETCH_MANAGER_SUCCEEDED,
  SET_SELECTED_MANAGER,
  UPDATE_MANAGER_SUCCEEDED,
  FETCH_CURRENT_MANAGER_SUCCEEDED,
  FETCH_MANAGER_STARTED,
  UPDATE_MANAGER_STARTED,
  FETCH_CURRENT_MANAGER_STARTED,
  FETCH_MANAGER_FAILED,
  FETCH_CURRENT_MANAGER_FAILED,
  UPDATE_MANAGER_FAILED,
} from "./managerActions";

export interface ManagerState {
  managersById: {
    [id: number]: Manager;
  };
  selectedManagerId: number | null;
  managerUpdating: {
    [id: number]: boolean;
  };
}

export const initManagerState = (): ManagerState => ({
  managersById: {},
  selectedManagerId: null,
  managerUpdating: {},
});

export const managerReducer = (
  state = initManagerState(),
  action: ManagerAction,
): ManagerState => {
  switch (action.type) {
    case FETCH_MANAGER_STARTED:
    case UPDATE_MANAGER_STARTED:
      return {
        ...state,
        managerUpdating: {
          ...state.managerUpdating,
          [action.meta.id]: true,
        },
      };
    case FETCH_MANAGER_SUCCEEDED:
    case FETCH_CURRENT_MANAGER_SUCCEEDED:
    case UPDATE_MANAGER_SUCCEEDED:
      return {
        ...state,
        managersById: {
          ...state.managersById,
          [action.payload.id]: action.payload,
        },
        managerUpdating: {
          ...state.managerUpdating,
          [action.payload.id]: false,
        },
      };
    case FETCH_MANAGER_FAILED:
    case UPDATE_MANAGER_FAILED:
      return {
        ...state,
        managerUpdating: {
          ...state.managerUpdating,
          [action.meta.id]: false,
        },
      };
    case SET_SELECTED_MANAGER:
      return {
        ...state,
        selectedManagerId: action.payload.managerId,
      };
    default:
      return state;
  }
};
