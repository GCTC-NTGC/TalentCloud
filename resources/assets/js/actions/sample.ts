import { Action, Sample } from "../models/app";

export function addSample(id: number): Action<Sample> {
  return {
    type: "ADD_SAMPLE",
    payload: {
      id,
      name: `Sample ${id}`,
    },
  };
}
