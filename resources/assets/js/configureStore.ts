import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const logger = createLogger();
const history = createBrowserHistory();

const dev = process.env.NODE_ENV === "development";

let middleware = dev ? applyMiddleware(logger) : applyMiddleware();

if (dev) {
  middleware = composeWithDevTools(middleware);
}

const reducer = rootReducer(history);

export default () => {
  const store = createStore(reducer, {}, middleware);
  return { store };
};

export { history };
