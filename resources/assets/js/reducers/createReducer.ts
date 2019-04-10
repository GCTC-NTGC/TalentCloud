import { Action } from "../model/model";

export default function createReducer(initialState: any, handlers: any) {
  return function reducer(state: any = initialState, action: Action<any>) {
    if (handlers[action.type]) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
