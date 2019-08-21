import { createSelector } from "reselect";
import { RootState } from "../store";
import { Manager } from "../../models/types";
import { hasKey } from "../../helpers/queries";

const getManagersById = (state: RootState): { [id: number]: Manager } =>
  state.manager.managersById;

const getSelectedId = (state: RootState): number | null =>
  state.manager.selectedManagerId;

export const getManagers = createSelector(
  getManagersById,
  (managersById): Manager[] => Object.values(managersById),
);

export const getManagerById = (
  state: RootState,
  { managerId }: { managerId: number },
): Manager | null => {
  const managersById = getManagersById(state);
  return hasKey(managersById, managerId) ? managersById[managerId] : null;
};

export const getSelectedManager = (state: RootState): Manager | null => {
  const selectedId = getSelectedId(state);
  return selectedId !== null
    ? getManagerById(state, { managerId: selectedId })
    : null;
};
