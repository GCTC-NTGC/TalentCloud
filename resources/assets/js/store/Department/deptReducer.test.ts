import deptReducer, { initDeptState } from "./deptReducer";
import {
  GET_DEPTS_STARTED,
  GET_DEPTS_FAILED,
  GET_DEPTS_SUCCEEDED,
} from "./deptActions";
import { Department } from "../../models/types";
import { FailedAction } from "../asyncAction";

describe("Department Reducer tests", (): void => {
  it("Sets loading to true when GET_DEPTS_STARTED", (): void => {
    const initialState = initDeptState();
    const getAction: any = {
      type: GET_DEPTS_STARTED,
    };
    const expectState = {
      ...initialState,
      loading: true,
    };
    expect(deptReducer(initialState, getAction)).toEqual(expectState);
  });
  it("Sets loading to false when GET_DEPTS_FAILED", (): void => {
    const initialState = {
      ...initDeptState(),
      loading: true,
    };
    const getAction: FailedAction<typeof GET_DEPTS_FAILED, {}> = {
      type: GET_DEPTS_FAILED,
      error: true,
      payload: new Error(""),
      meta: {},
    };
    const expectState = {
      ...initialState,
      loading: false,
    };
    expect(deptReducer(initialState, getAction)).toEqual(expectState);
  });
  it("Sets adds departments by id and sets loading to false when GET_DEPTS_SUCCEEDED", (): void => {
    const initialState = {
      ...initDeptState(),
      loading: true,
    };
    const fakeDept: Department = {
      id: 3,
      en: {
        name: "Treasury Board of Canada Secretariat",
        impact:
          "The Treasury Board of Canada Secretariat provides advice and makes recommendations on how the government spends money, how it regulates and how it is managed ensuring tax dollars are spent wisely and effectively for Canadians.",
      },
      fr: {
        name: "Secrétariat du Conseil du Trésor du Canada",
        impact:
          "Le Secrétariat du Conseil du Trésor du Canada fournit des conseils et des recommandations sur la façon dont le gouvernement investit dans les programmes et les services, ainsi que sur la façon dont il en assure la réglementation et la gestion pour faire en sorte que l'argent des contribuables soit utilisé de manière judicieuse et efficace pour les Canadiens.",
      },
    };
    const getAction: {
      type: typeof GET_DEPTS_SUCCEEDED;
      payload: Department[];
      meta: {};
    } = {
      type: GET_DEPTS_SUCCEEDED,
      payload: [fakeDept],
      meta: {},
    };
    const expectState = {
      byId: {
        3: { ...fakeDept },
      },
      loading: false,
    };
    expect(deptReducer(initialState, getAction)).toEqual(expectState);
  });
});
