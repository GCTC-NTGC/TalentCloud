import { userReducer, initUserState } from "./userReducer";
import { FETCH_ALL_USERS_SUCCEEDED } from "./userActions";
import { User } from "../../models/types";
import { fakeUsers } from "../../fakeData/fakeUsers";

describe("User Reducer tests", (): void => {
  it("Sets adds users by id when GET_ALL_USERS_SUCCEEDED", (): void => {
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
});
