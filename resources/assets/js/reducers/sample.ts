import { Action, Sample } from "../models/app";
import createReducer from "./createReducer";

export const sample = createReducer([], {
  ADD_SAMPLE: (state: Sample[], action: Action<Sample>) => {
    return [...state, action.payload];
  },
  // add more reducers here
});
