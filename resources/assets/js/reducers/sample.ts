import { Action, ActionType, Sample } from "../model/model";
import createReducer from "./createReducer";

export const sample = createReducer([], {
  [ActionType.ADD_SAMPLE](state: Sample[], action: Action<Sample>) {
    return [...state, action.payload];
  },
  // add more reducers here
});
