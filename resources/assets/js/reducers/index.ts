import { History } from "history";
import { combineReducers } from "redux";
import { Sample } from "../model/model";
import * as sampleReducer from "./sample";

export interface RootState {
  sample: Sample[];
}

export default (history: History) => combineReducers({
  ...sampleReducer
});
