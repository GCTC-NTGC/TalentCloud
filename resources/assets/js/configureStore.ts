import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import { ActionType } from "./model/model";

const actionTypeEnumToString = (action: any): any => typeof action.type === 'number' && ActionType[action.type] ? ({
  type: ActionType[action.type],
  payload: action.payload,
}) : action;

const logger = (createLogger as any)({ actionTransformer: actionTypeEnumToString });
const history = createBrowserHistory({ actionSanitizer: actionTypeEnumToString });

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
