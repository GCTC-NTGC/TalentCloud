import React from "react";
import "core-js/modules/es.promise.finally";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import IntlContainer from "../IntlContainer";
import ErrorToastRedux from "./ErrorToastRedux";
import ErrorToast from "./ErrorToast";
import ErrorContainer from "./ErrorContainer";

const store = configureStore();

export const RootContainer: React.FunctionComponent = ({
  children,
}): React.ReactElement => {
  const locale = document.documentElement.lang;
  return (
    <IntlContainer locale={locale}>
      <ErrorContainer>
        <Provider store={store}>
          <ErrorToastRedux />
          <ErrorToast />
          {children}
        </Provider>
      </ErrorContainer>
    </IntlContainer>
  );
};

export default RootContainer;
