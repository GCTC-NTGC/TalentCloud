/* eslint-disable @typescript-eslint/camelcase */
import educationStatusReducer, {
  initEducationStatusState,
} from "./educationStatusReducer";
import {
  GET_EDUCATION_STATUSES_STARTED,
  GET_EDUCATION_STATUSES_FAILED,
  GET_EDUCATION_STATUSES_SUCCEEDED,
} from "./educationStatusActions";
import { EducationStatus } from "../../models/types";
import { FailedAction } from "../asyncAction";

describe("Education Status Reducer tests", (): void => {
  it("Sets loading to true when GET_EDUCATION_STATUSES_STARTED", (): void => {
    const initialState = initEducationStatusState();
    const getAction: any = {
      type: GET_EDUCATION_STATUSES_STARTED,
    };
    const expectState = {
      ...initialState,
      loading: true,
    };
    expect(educationStatusReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
  it("Sets loading to false when GET_EDUCATION_STATUSES_FAILED", (): void => {
    const initialState = {
      ...initEducationStatusState(),
      loading: true,
    };
    const getAction: FailedAction<typeof GET_EDUCATION_STATUSES_FAILED, {}> = {
      type: GET_EDUCATION_STATUSES_FAILED,
      error: true,
      payload: new Error(""),
      meta: {},
    };
    const expectState = {
      ...initialState,
      loading: false,
    };
    expect(educationStatusReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
  it("Sets education status by id and sets loading to false when GET_EDUCATION_STATUSES_SUCCEEDED", (): void => {
    const initialState = {
      ...initEducationStatusState(),
      loading: true,
    };
    const fakeEducationStatus: EducationStatus = {
      id: 3,
      key: "in_progress",
      name: {
        en: "In progress",
        fr: "En cours",
      },
      created_at: null,
      updated_at: null,
    };
    const getAction: {
      type: typeof GET_EDUCATION_STATUSES_SUCCEEDED;
      payload: EducationStatus[];
      meta: {};
    } = {
      type: GET_EDUCATION_STATUSES_SUCCEEDED,
      payload: [fakeEducationStatus],
      meta: {},
    };
    const expectState = {
      byId: {
        3: { ...fakeEducationStatus },
      },
      loading: false,
    };
    expect(educationStatusReducer(initialState, getAction)).toEqual(
      expectState,
    );
  });
});
