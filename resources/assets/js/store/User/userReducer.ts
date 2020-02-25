import { User } from "../../models/types";
import {
  UserAction,
  FETCH_USER_SUCCEEDED,
  FETCH_ALL_USERS_SUCCEEDED,
} from "./userActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface UserState {
  usersById: {
    [id: number]: User;
  };
}

export const initUserState = (): UserState => ({
  usersById: {},
});

export const userReducer = (
  state = initUserState(),
  action: UserAction,
): UserState => {
  switch (action.type) {
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        usersById: {
          ...state.usersById,
          [action.payload.id]: action.payload,
        },
      };
    case FETCH_ALL_USERS_SUCCEEDED:
      return {
        ...state,
        usersById: {
          ...state.usersById,
          ...mapToObject(action.payload, getId),
        },
      };
    default:
      return state;
  }
};
