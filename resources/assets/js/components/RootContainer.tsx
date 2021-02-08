import React from "react";
import "core-js/modules/es.promise.finally";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import IntlContainer from "../IntlContainer";
import ErrorToastRedux from "./ErrorToastRedux";
import ErrorToast from "./ErrorToast";

const store = configureStore();

export const RootContainer: React.FunctionComponent = ({
  children,
}): React.ReactElement => {
  const locale = document.documentElement.lang;
  return (
    <Provider store={store}>
      <IntlContainer locale={locale}>
        <>
          <ErrorToastRedux />
          <ErrorToast />
          {children}
        </>
      </IntlContainer>
    </Provider>
  );
};

export default RootContainer;
