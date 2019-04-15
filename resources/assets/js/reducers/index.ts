import { History } from "history";
import { combineReducers } from "redux";
import { Sample } from "../models/app";
import * as sampleReducer from "./sample";

export interface RootState {
  sample: Sample[];
}

export default (history: History) => combineReducers({
  ...sampleReducer
});
