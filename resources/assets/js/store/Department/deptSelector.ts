import { createSelector } from "reselect";
import { RootState } from "../store";
import { Department } from "../../models/types";
import { hasKey } from "../../helpers/queries";

export const getDeptState = (state: RootState): { [id: number]: Department } =>
  state.department.byId;

export const getDepartments = createSelector(
  getDeptState,
  (deptState): Department[] => Object.values(deptState),
);

export const getDepartmentById = (
  state: RootState,
  id: number,
): Department | null =>
  hasKey(getDeptState(state), id) ? getDeptState(state)[id] : null;
