/* eslint-disable @typescript-eslint/camelcase */
import educationTypeReducer, {
  initEducationTypeState,
} from "./educationTypeReducer";
import {
  GET_EDUCATION_TYPES_STARTED,
  GET_EDUCATION_TYPES_FAILED,
  GET_EDUCATION_TYPES_SUCCEEDED,
} from "./educationTypeActions";
import { EducationType } from "../../models/types";
import { FailedAction } from "../asyncAction";

describe("Education Type Reducer tests", (): void => {
  it("Sets loading to true when GET_EDUCATION_TYPES_STARTED", (): void => {
    const initialState = initEducationTypeState();
    const getAction: any = {
      type: GET_EDUCATION_TYPES_STARTED,
    };
    const expectState = {
      ...initialState,
      loading: true,
    };
    expect(educationTypeReducer(initialState, getAction)).toEqual(expectState);
  });
  it("Sets loading to false when GET_EDUCATION_TYPES_FAILED", (): void => {
    const initialState = {
      ...initEducationTypeState(),
      loading: true,
    };
    const getAction: FailedAction<typeof GET_EDUCATION_TYPES_FAILED, {}> = {
      type: GET_EDUCATION_TYPES_FAILED,
      error: true,
      payload: new Error(""),
      meta: {},
    };
    const expectState = {
      ...initialState,
      loading: false,
    };
    expect(educationTypeReducer(initialState, getAction)).toEqual(expectState);
  });
  it("Sets education type by id and sets loading to false when GET_EDUCATION_TYPES_SUCCEEDED", (): void => {
    const initialState = {
      ...initEducationTypeState(),
      loading: true,
    };
    const fakeEducationType: EducationType = {
      id: 4,
      key: "phd",
      name: {
        en: "PhD",
        fr: "Doctorat",
      },
      created_at: null,
      updated_at: null,
    };
    const getAction: {
      type: typeof GET_EDUCATION_TYPES_SUCCEEDED;
      payload: EducationType[];
      meta: {};
    } = {
      type: GET_EDUCATION_TYPES_SUCCEEDED,
      payload: [fakeEducationType],
      meta: {},
    };
    const expectState = {
      byId: {
        4: { ...fakeEducationType },
      },
      loading: false,
    };
    expect(educationTypeReducer(initialState, getAction)).toEqual(expectState);
  });
});
