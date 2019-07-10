import React from "react";
import { Provider } from "react-redux";

import ReduxApp from "./ReduxApp";
import configureStore from "./configureStore";

const store = configureStore();

export default () => (
  <Provider store={store}>
    <ReduxApp />
  </Provider>
);
