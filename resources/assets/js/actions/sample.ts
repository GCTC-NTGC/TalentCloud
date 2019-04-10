import { Action, ActionType, Sample } from "../model/model";

export function addSample(id: number): Action<Sample> {
  return {
    type: ActionType.ADD_SAMPLE,
    payload: {
      id,
      name: `Sample ${id}`
    }
  };
}
