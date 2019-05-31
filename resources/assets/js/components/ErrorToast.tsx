import React, { useEffect } from "react";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { ErrorEntity } from "../store/Error/errorReducer";
import { clearErrors } from "../store/Error/errorActions";
import { getRecentError } from "../store/Error/errorSelector";
import { RootState } from "../store/store";
import { DispatchType } from "../configureStore";

const ErrorToast = (props): React.ReactElement => {
  const { error, dispatchClearErrors } = props;
  useEffect((): (() => void) => {
    const timer = setInterval((): void => {
      dispatchClearErrors();
      clearInterval(timer);
    }, 3500);
    return (): void => {
      clearInterval(timer);
    };
  }, [error]);
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
            <p>{error.message}</p>
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

const mapDispatchToProps = (dispatch: DispatchType): any => ({
  dispatchClearErrors: (): void => {
    dispatch(clearErrors());
  },
});
// @ts-ignore
const ErrorToastContainer: React.FunctionComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ErrorToast));

export default ErrorToastContainer;
