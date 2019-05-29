import * as React from "react";
import * as ReactDOM from "react-dom";
import ReduxRoot from "./ReduxRoot";

const REDUX_CONTAINER = "home-redux-container";
if (document.getElementById(REDUX_CONTAINER)) {
  const rootEl = document.getElementById(REDUX_CONTAINER);
  ReactDOM.render(<ReduxRoot />, rootEl);

  // comment in for PWA with service worker in production mode
  // registerServiceWorker();
}
