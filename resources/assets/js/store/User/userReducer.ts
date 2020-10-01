import { User } from "../../models/types";
import {
  UserAction,
  FETCH_USER_SUCCEEDED,
  FETCH_ALL_USERS_SUCCEEDED,
  FETCH_USER_STARTED,
  FETCH_USER_FAILED,
  FETCH_ALL_USERS_STARTED,
  FETCH_ALL_USERS_FAILED,
} from "./userActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface UserState {
  usersById: {
    [id: number]: User;
  };
  userIsUpdating: {
    [id: number]: boolean;
  };
  allUsersUpdating: boolean;
}

export const initUserState = (): UserState => ({
  usersById: {},
  userIsUpdating: {},
  allUsersUpdating: false,
});

export const userReducer = (
  state = initUserState(),
  action: UserAction,
): UserState => {
  switch (action.type) {
    case FETCH_USER_STARTED:
      return {
        ...state,
        userIsUpdating: {
          ...state.userIsUpdating,
          [action.meta.id]: true,
        },
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        userIsUpdating: {
          ...state.userIsUpdating,
          [action.meta.id]: false,
        },
      };
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        usersById: {
          ...state.usersById,
          [action.payload.id]: action.payload,
        },
        userIsUpdating: {
          ...state.userIsUpdating,
          [action.meta.id]: false,
        },
      };
    case FETCH_ALL_USERS_STARTED:
      return {
        ...state,
        allUsersUpdating: true,
      };
    case FETCH_ALL_USERS_FAILED:
      return {
        ...state,
        allUsersUpdating: false,
      };
    case FETCH_ALL_USERS_SUCCEEDED:
      return {
        ...state,
        usersById: {
          ...state.usersById,
          ...mapToObject(action.payload, getId),
        },
        allUsersUpdating: false,
      };
    default:
      return state;
  }
};
