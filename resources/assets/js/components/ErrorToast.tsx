import React from "react";

interface ErrorToastState {
  errorMessage: string | null;
}

interface ErrorToastProps {
  errorMessage: string | null;
}

class ErrorToast extends React.Component<ErrorToastProps, ErrorToastState> {
  public constructor(props) {
    super(props);

    const { errorMessage } = props;

    this.state = {
      errorMessage: errorMessage || null,
    };
  }

  public handleDismiss = (): void => {
    this.setState({ errorMessage: null });
  };

  public render(): React.ReactElement {
    const { errorMessage } = this.state;
    return (
      <div
        data-c-alert="error(toast)"
        data-c-radius="rounded"
        data-c-padding="half"
        role="alert"
        data-c-visibility={errorMessage ? null : "hidden"}
      >
        <div>
          <p>{errorMessage}</p>
        </div>
        <button
          type="button"
          onClick={this.handleDismiss}
          data-c-alert="close-trigger"
        >
          <i className="material-icons">close</i>
        </button>
      </div>
    );
  }
}

export default ErrorToast;
