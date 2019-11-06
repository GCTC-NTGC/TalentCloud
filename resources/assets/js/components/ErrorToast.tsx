import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  injectIntl,
  FormattedMessage,
  WrappedComponentProps,
} from "react-intl";
import { ApiError } from "redux-api-middleware";
import { ErrorEntity } from "../store/Error/errorReducer";
import { clearErrors } from "../store/Error/errorActions";
import { getRecentError } from "../store/Error/errorSelector";
import { RootState } from "../store/store";
import { DispatchType } from "../configureStore";

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
const ErrorToast: React.FC<ErrorToastProps & WrappedComponentProps> = ({
  error,
  dispatchClearErrors,
}): React.ReactElement => {
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
            <span
              data-c-margin="bottom(quarter)"
              data-c-heading="h5"
              data-c-font-weight="bold"
            >
              <FormattedMessage
                id="errorToast.title"
                defaultMessage="Something went wrong!"
                description="Title displayed on the Error Toast component."
              />
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
)(injectIntl(ErrorToast));

export default ErrorToastContainer;
