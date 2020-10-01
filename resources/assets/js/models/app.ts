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

export type ValuesOf<T> = T[keyof T];

export type Portal = "manager" | "hr";

export interface localizedField {
  en: string | null;
  fr: string | null;
}
export interface localizedFieldNonNull {
  en: string;
  fr: string;
}

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
