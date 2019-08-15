import { Manager } from "../../models/types";
import { ManagerAction, FETCH_MANAGER_SUCCEEDED } from "./managerActions";

export interface ManagerState {
  managersById: {
    [id: number]: Manager;
  };
  selectedManagerId: number | null;
}

export const initManagerState = (): ManagerState => ({
  managersById: {},
  selectedManagerId: null,
});

export const managerReducer = (
  state = initManagerState(),
  action: ManagerAction,
): ManagerState => {
  switch (action.type) {
    case FETCH_MANAGER_SUCCEEDED:
      return {
        ...state,
        managersById: {
          ...state.managersById,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
