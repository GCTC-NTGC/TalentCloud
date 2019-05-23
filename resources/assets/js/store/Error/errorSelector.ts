import { ErrorEntity } from "./errorReducer";
import { RootState } from "../store";

export const getErrors = (state: RootState): ErrorEntity[] =>
  state.error.errors;

export const getRecentError = (state: RootState): ErrorEntity => {
  const errors = getErrors(state);
  return errors[errors.length - 1];
};

export default { getErrors };
