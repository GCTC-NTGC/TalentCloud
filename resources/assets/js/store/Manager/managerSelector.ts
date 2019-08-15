import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { RootState } from "../store";
import { Manager } from "../../models/types";
import { hasKey } from "../../helpers/queries";

const getManagersById = (state: RootState): { [id: number]: Manager } =>
  state.manager.managersById;

export const getManagers = createSelector(
  getManagersById,
  (managersById): Manager[] => Object.values(managersById),
);

export const getManagerById = createCachedSelector(
  getManagersById,
  (state: RootState, ownProps: { managerId: number }): number =>
    ownProps.managerId,
  (managersById, managerId): Manager | null =>
    hasKey(managersById, managerId) ? managersById[managerId] : null,
)((state, ownProps): number => ownProps.managerId);

export const getSelectedManager = createCachedSelector(

)
