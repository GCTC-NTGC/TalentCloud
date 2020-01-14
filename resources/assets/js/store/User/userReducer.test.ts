import { userReducer, initUserState } from "./userReducer";
import { FETCH_ALL_USERS_SUCCEEDED, FETCH_USER_SUCCEEDED } from "./userActions";
import { User } from "../../models/types";
import { fakeUsers, fakeUser } from "../../fakeData/fakeUsers";

describe("User Reducer tests", (): void => {
  it("Sets all users by id when GET_ALL_USERS_SUCCEEDED", (): void => {
    const initialState = {
      ...initUserState(),
    };
    const getAction: {
      type: typeof FETCH_ALL_USERS_SUCCEEDED;
      payload: User[];
      meta: {};
    } = {
      type: FETCH_ALL_USERS_SUCCEEDED,
      payload: fakeUsers(),
      meta: {},
    };
    const expectState = {
      usersById: {
        1: { ...fakeUsers()[0] },
        2: { ...fakeUsers()[1] },
        3: { ...fakeUsers()[2] },
      },
    };
    expect(userReducer(initialState, getAction)).toEqual(expectState);
  });
  it("Sets a user by id when GET_USER_SUCCEEDED", (): void => {
    const initialState = {
      ...initUserState(),
    };
    const getAction: {
      type: typeof FETCH_USER_SUCCEEDED;
      payload: User;
      meta: { id: number };
    } = {
      type: FETCH_USER_SUCCEEDED,
      payload: fakeUser(),
      meta: { id: 1 },
    };
    const expectState = {
      usersById: {
        1: { ...fakeUser() },
      },
    };
    expect(userReducer(initialState, getAction)).toEqual(expectState);
  });
});
