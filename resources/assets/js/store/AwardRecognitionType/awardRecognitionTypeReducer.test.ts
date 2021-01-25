/* eslint-disable @typescript-eslint/camelcase */
import awardRecognitionTypeReducer, {
  initAwardRecognitionTypeState,
} from "./awardRecognitionTypeReducer";
import {
  GET_AWARD_RECOGNITION_TYPES_STARTED,
  GET_AWARD_RECOGNITION_TYPES_FAILED,
  GET_AWARD_RECOGNITION_TYPES_SUCCEEDED,
} from "./awardRecognitionTypeActions";
import { AwardRecognitionType } from "../../models/types";
import { FailedAction } from "../asyncAction";

describe("Award Recognition Type Reducer tests", (): void => {
  it("Sets loading to true when GET_AWARD_RECOGNITION_TYPES_STARTED", (): void => {
    const initialState = initAwardRecognitionTypeState();
    const getAction: any = {
      type: GET_AWARD_RECOGNITION_TYPES_STARTED,
    };
    const expectState = {
      ...initialState,
      loading: true,
    };
    expect(awardRecognitionTypeReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
  it("Sets loading to false when GET_AWARD_RECOGNITION_TYPES_FAILED", (): void => {
    const initialState = {
      ...initAwardRecognitionTypeState(),
      loading: true,
    };
    const getAction: FailedAction<
      typeof GET_AWARD_RECOGNITION_TYPES_FAILED,
      {}
    > = {
      type: GET_AWARD_RECOGNITION_TYPES_FAILED,
      error: true,
      payload: new Error(""),
      meta: {},
    };
    const expectState = {
      ...initialState,
      loading: false,
    };
    expect(awardRecognitionTypeReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
  it("Sets award recognition type by id and sets loading to false when GET_AWARD_RECOGNITION_TYPES_SUCCEEDED", (): void => {
    const initialState = {
      ...initAwardRecognitionTypeState(),
      loading: true,
    };
    const fakeAwardRecognitionType: AwardRecognitionType = {
      id: 2,
      key: "national",
      name: {
        en: "National",
        fr: "Nationale",
      },
      created_at: null,
      updated_at: null,
    };
    const getAction: {
      type: typeof GET_AWARD_RECOGNITION_TYPES_SUCCEEDED;
      payload: AwardRecognitionType[];
      meta: {};
    } = {
      type: GET_AWARD_RECOGNITION_TYPES_SUCCEEDED,
      payload: [fakeAwardRecognitionType],
      meta: {},
    };
    const expectState = {
      byId: {
        2: { ...fakeAwardRecognitionType },
      },
      loading: false,
    };
    expect(awardRecognitionTypeReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
});
