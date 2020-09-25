import { createSelector } from "reselect";
import { RootState } from "../store";
import { User } from "../../models/types";
import { hasKey } from "../../helpers/queries";

const getUsersById = (state: RootState): { [id: number]: User } =>
  state.users.usersById;

export const getUsers = createSelector(getUsersById, (usersById): User[] =>
  Object.values(usersById),
);

export const getUserById = (
  state: RootState,
  { userId }: { userId: number },
): User | null => {
  const usersById = getUsersById(state);
  return hasKey(usersById, userId) ? usersById[userId] : null;
};

export const getUserIsUpdating = (
  state: RootState,
  { userId }: { userId: number },
): boolean => {
  const updatingById = state.users.userIsUpdating;
  return (
    state.users.allUsersUpdating ||
    (hasKey(updatingById, userId) && updatingById[userId])
  );
};

export const getAllUsersUpdating = (state: RootState): boolean =>
  state.users.allUsersUpdating;
