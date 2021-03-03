import React, { useEffect } from "react";
import { connect } from "react-redux";
import { injectIntl, WrappedComponentProps, useIntl } from "react-intl";
import { ApiError } from "redux-api-middleware";
import { ErrorEntity } from "../store/Error/errorReducer";
import { clearErrors } from "../store/Error/errorActions";
import { getRecentError } from "../store/Error/errorSelector";
import { RootState } from "../store/store";
import { DispatchType } from "../configureStore";
import { errorMessages } from "./ErrorToast";

const constructErrorMessage = (error: ErrorEntity): string => {
  if (error.error instanceof ApiError) {
    // if error was of type redux-api-middleware/ApiError, we may be able to extract extra info from the response.
    const apiError = error.error;
    if (apiError.status && apiError.response && apiError.response.message) {
      return `${apiError.status} - ${apiError.response.message}`;
    }
  }
  return error.message;
};
interface ErrorToastProps {
  error: ErrorEntity;
  dispatchClearErrors: () => void;
}
const ErrorToastRedux: React.FC<ErrorToastProps & WrappedComponentProps> = ({
  error,
  dispatchClearErrors,
}): React.ReactElement => {
  const intl = useIntl();

  useEffect((): (() => void) => {
    const timer = setInterval((): void => {
      dispatchClearErrors();
      clearInterval(timer);
    }, 3500);
    return (): void => {
      clearInterval(timer);
    };
  }, [dispatchClearErrors, error]);

  return (
    <>
      {error !== undefined && (
        <div data-c-alert="error(toast)" data-c-radius="rounded" role="alert">
          <div data-c-padding="half">
            <span data-c-margin="bottom(quarter)" data-c-font-weight="bold">
              {intl.formatMessage(errorMessages.toastTitle)}
            </span>
            <p>{constructErrorMessage(error)}</p>
          </div>
          <button
            type="button"
            onClick={(): void => {
              dispatchClearErrors();
            }}
            data-c-alert="close-trigger"
            data-c-padding="half"
          >
            <i className="fa fa-times-circle" />
          </button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (
  state: RootState,
): {
  error: ErrorEntity;
} => ({
  error: getRecentError(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): { dispatchClearErrors: () => void } => ({
  dispatchClearErrors: (): void => {
    dispatch(clearErrors());
  },
});

const ErrorToastContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ErrorToastRedux));

export default ErrorToastContainer;
