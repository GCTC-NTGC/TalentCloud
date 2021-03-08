import React, { useCallback, useContext } from "react";
import { defineMessages, useIntl } from "react-intl";
import { ErrorContext } from "./ErrorContainer";
import Alert from "./H2Components/Alert";

export const errorMessages = defineMessages({
  toastTitle: {
    id: "errorToast.title",
    defaultMessage: "Something went wrong!",
    description: "Title displayed on the Error Toast component.",
  },
  dismissLabel: {
    id: "errorToast.dismiss",
    defaultMessage: "Dismiss",
    description: "Label for the Error Toast dismiss button.",
  },
});

export const ErrorToast: React.FC = () => {
  const intl = useIntl();
  const { state, dispatch } = useContext(ErrorContext);
  const dismiss = useCallback(() => dispatch({ type: "pop" }), [dispatch]);

  // This toast will render the first error in the queue, if any.
  const currentError = state.errorQueue.length > 0 ? state.errorQueue[0] : null;

  return (
    <>
      {currentError !== null && (
        <Alert
          color="stop"
          position="toast"
          data-h2-radius="b(round)"
          data-h2-padding="b(all, .25)"
          dismissBtn={
            <Alert.DismissBtn
              onClick={dismiss}
              data-h2-padding="b(all, .25)"
              aria-label={intl.formatMessage(errorMessages.dismissLabel)}
            >
              <i className="fa fa-times-circle" />
            </Alert.DismissBtn>
          }
        >
          <Alert.Title>
            <strong>{intl.formatMessage(errorMessages.toastTitle)}</strong>
          </Alert.Title>
          <p>{currentError}</p>
        </Alert>
      )}
    </>
  );
};

export default ErrorToast;
