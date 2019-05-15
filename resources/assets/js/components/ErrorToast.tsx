import React, { useEffect } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
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
    }, 2000);
    return (): void => {
      clearInterval(timer);
    };
  }, [error]);
  return (
    <>
      {error !== undefined && (
        <div
          data-c-alert="error(toast)"
          data-c-radius="rounded"
          data-c-padding="half"
          role="alert"
        >
          <div>
            <p>{error.message}</p>
          </div>
          <button
            type="button"
            onClick={(): void => {
              dispatchClearErrors();
            }}
            data-c-alert="close-trigger"
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
