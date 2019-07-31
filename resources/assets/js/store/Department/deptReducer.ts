import { Department } from "../../models/types";
import {
  DeptAction,
  GET_DEPTS_STARTED,
  GET_DEPTS_SUCCEEDED,
  GET_DEPTS_FAILED,
} from "./deptActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface DeptState {
  byId: {
    [id: number]: Department;
  };
  loading: boolean;
}

export const initDeptState = (): DeptState => ({
  byId: [],
  loading: false,
});

const deptReducer = (
  state = initDeptState(),
  action: DeptAction,
): DeptState => {
  switch (action.type) {
    case GET_DEPTS_STARTED:
      return { ...state, loading: true };
    case GET_DEPTS_SUCCEEDED:
      return { byId: mapToObject(action.payload, getId), loading: false };
    case GET_DEPTS_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default deptReducer;
