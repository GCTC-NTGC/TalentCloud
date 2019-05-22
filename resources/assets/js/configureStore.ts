import {
  applyMiddleware,
  createStore,
  AnyAction,
  Store,
  Dispatch,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { apiMiddleware } from "redux-api-middleware";
import rootReducer, { RootState } from "./store/store";

/** Defining a dispatch for the app that accepts thunks */
export type DispatchType = Dispatch<AnyAction, RootState> &
  ThunkDispatch<any, any, AnyAction>;

export const configureStore = (): Store<RootState, AnyAction> => {
  const logger = createLogger();

  const isDev = process.env.NODE_ENV === "development";

  let middleware = isDev
    ? applyMiddleware(thunk, apiMiddleware, logger)
    : applyMiddleware(thunk, apiMiddleware);

  if (isDev) {
    middleware = composeWithDevTools(middleware);
  }

  const reducer = rootReducer();
  return createStore(reducer, middleware);
};

export default configureStore;
