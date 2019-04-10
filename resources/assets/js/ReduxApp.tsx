import React from "react";
import { Route, Router } from "react-router-dom";

import { history } from "./configureStore";
import ReduxHome from "./pages/ReduxHome";
import Page2 from "./pages/Page2";


const Routes = () => (
  <React.Fragment>
    <Route exact={true} path="/" component={ReduxHome} />
    <Route exact={true} path="/page2" component={Page2} />
  </React.Fragment>
);

export default () => (
  <Router history={history}>
    <ul>
      <li><a onClick={() => history.push('/')}>Root</a></li>
      <li><a onClick={() => history.push('/page2')}>page2</a></li>
    </ul>
    <Routes />
  </Router>
);
