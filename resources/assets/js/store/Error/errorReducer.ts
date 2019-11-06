import { CLEAR_ERRORS } from "./errorActions";
import { AppAction } from "../store";
import { ErrorAction } from "../createAction";

export interface ErrorEntity {
  type: string;
  name: string;
  message: string;
  error: Error;
}

export interface ErrorState {
  errors: ErrorEntity[];
}

export const initState = (): ErrorState => ({ errors: [] });

const errorReducer = (state = initState(), action: AppAction): ErrorState => {
  if (action.type === CLEAR_ERRORS) {
    return initState();
  }
  if (action.error) {
    const errorAction = action as ErrorAction<string>;
    return {
      errors: [
        ...state.errors,
        {
          type: errorAction.type,
          name: errorAction.payload.name,
          message: errorAction.payload.message,
          error: errorAction.payload,
        },
      ],
    };
  }
  return state;
};

export default errorReducer;
