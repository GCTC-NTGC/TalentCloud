export interface Sample {
  id: number;
  name: string;
}

export type ActionType = "ADD_SAMPLE";

export interface Action<T> {
  type: ActionType;
  payload: T;
}
