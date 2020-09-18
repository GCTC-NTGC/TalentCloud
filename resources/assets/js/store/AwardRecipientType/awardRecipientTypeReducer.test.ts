/* eslint-disable @typescript-eslint/camelcase */
import awardRecipientTypeReducer, {
  initAwardRecipientTypeState,
} from "./awardRecipientTypeReducer";
import {
  GET_AWARD_RECIPIENT_TYPES_STARTED,
  GET_AWARD_RECIPIENT_TYPES_FAILED,
  GET_AWARD_RECIPIENT_TYPES_SUCCEEDED,
} from "./awardRecipientTypeActions";
import { AwardRecipientType } from "../../models/types";
import { FailedAction } from "../asyncAction";

describe("Award Recipient Type Reducer tests", (): void => {
  it("Sets loading to true when GET_AWARD_RECIPIENT_TYPES_STARTED", (): void => {
    const initialState = initAwardRecipientTypeState();
    const getAction: any = {
      type: GET_AWARD_RECIPIENT_TYPES_STARTED,
    };
    const expectState = {
      ...initialState,
      loading: true,
    };
    expect(awardRecipientTypeReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
  it("Sets loading to false when GET_AWARD_RECIPIENT_TYPES_FAILED", (): void => {
    const initialState = {
      ...initAwardRecipientTypeState(),
      loading: true,
    };
    const getAction: FailedAction<
      typeof GET_AWARD_RECIPIENT_TYPES_FAILED,
      {}
    > = {
      type: GET_AWARD_RECIPIENT_TYPES_FAILED,
      error: true,
      payload: new Error(""),
      meta: {},
    };
    const expectState = {
      ...initialState,
      loading: false,
    };
    expect(awardRecipientTypeReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
  it("Sets award recipient type by id and sets loading to false when GET_AWARD_RECIPIENT_TYPES_SUCCEEDED", (): void => {
    const initialState = {
      ...initAwardRecipientTypeState(),
      loading: true,
    };
    const fakeAwardRecipientType: AwardRecipientType = {
      id: 2,
      key: "project",
      name: {
        en: "My project",
        fr: "Mon projet",
      },
      created_at: null,
      updated_at: null,
    };
    const getAction: {
      type: typeof GET_AWARD_RECIPIENT_TYPES_SUCCEEDED;
      payload: AwardRecipientType[];
      meta: {};
    } = {
      type: GET_AWARD_RECIPIENT_TYPES_SUCCEEDED,
      payload: [fakeAwardRecipientType],
      meta: {},
    };
    const expectState = {
      byId: {
        2: { ...fakeAwardRecipientType },
      },
      loading: false,
    };
    expect(awardRecipientTypeReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
});
