export interface Sample {
  id: number;
  name: string;
}

export enum ActionType {
  ADD_SAMPLE,
}

export interface Action<T> {
  type: ActionType;
  payload: T;
}
