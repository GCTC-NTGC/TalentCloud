export type ActionType = "ADD_SAMPLE";

export interface Action<T> {
  type: ActionType;
  payload: T;
}

export interface Link {
  url: string;
  text: string;
  title: string;
}
