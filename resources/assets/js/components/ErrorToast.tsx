import React, { useCallback, useContext, useEffect, useRef } from "react";
import { defineMessages, useIntl } from "react-intl";
import { ErrorContext } from "./ErrorContainer";
import Alert from "./H2Components/Alert";

const TOAST_SELF_DISMISS_TIMER = 3500;

export const errorMessages = defineMessages({
  toastTitle: {
    id: "errorToast.title",
    defaultMessage: "Something went wrong!",
    description: "Title displayed on the Error Toast component.",
  },
});

/**
 * Creates a closure which can be called in the future, to conditionally run a callback only if a certain value is unchanged.
 *
 * @param pastValue This value is fixed when the closure is initially created.
 * @param futureValueRef This allows access to a variable which may be changed by the time this closure runs.
 * @param callback This function will be called if pastValue === futureValueRef.current when this closure runs.
 */
function runCallbackIfValueUnchanged<T>(
  pastValue: T,
  futureValueRef: React.MutableRefObject<T>,
  callback: () => void,
) {
  return () => {
    if (pastValue === futureValueRef.current) {
      callback();
    }
  };
}

export const ErrorToast: React.FC = () => {
  const intl = useIntl();
  const { state, dispatch } = useContext(ErrorContext);
  const dismiss = useCallback(() => dispatch({ type: "pop" }), [dispatch]);

  // This toast will render the first error in the queue, if any.
  const currentError = state.errorQueue.length > 0 ? state.errorQueue[0] : null;

  // This ref object makes the currently rendered error available to an async closure, dismissCurrentError
  const currentErrorRef = useRef(currentError);
  currentErrorRef.current = currentError;

  useEffect(() => {
    if (currentError !== null) {
      // At the end of the timeout, if the current error hasn't been manually dismissed, dismiss it.
      const dismissCurrentError = runCallbackIfValueUnchanged(
        currentError,
        currentErrorRef,
        dismiss,
      );
      setTimeout(dismissCurrentError, TOAST_SELF_DISMISS_TIMER);
    }
  }, [currentError, dismiss]);

  return (
    <>
      {currentError !== null && (
        <Alert
          color="stop"
          position="toast"
          data-h2-radius="b(round)"
          data-h2-padding="b(all, .25)"
          dismissBtn={
            <Alert.DismissBtn onClick={dismiss}>
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
