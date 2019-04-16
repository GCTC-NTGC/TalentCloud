import { applyMiddleware, createStore, AnyAction, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import rootReducer, { RootState } from "./store/store";

export const configureStore = (): Store<RootState, AnyAction> => {
  const logger = createLogger();

  const isDev = process.env.NODE_ENV === "development";

  let middleware = isDev
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk);

  if (isDev) {
    middleware = composeWithDevTools(middleware);
  }

  const reducer = rootReducer();
  return createStore(reducer, middleware);
};

export default configureStore;
