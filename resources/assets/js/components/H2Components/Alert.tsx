import React from "react";
import { GeneralBtnProps, GeneralProps, H2Color } from "./utils";

type DismissBtnProps = GeneralProps &
  Omit<GeneralBtnProps, "type" | "onClick"> & {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
const DismissBtn: React.FunctionComponent<DismissBtnProps> = ({
  className,
  children,
  buttonStyling,
  onClick,
  disabled,
  ...rest
}) => {
  return (
    <button
      data-h2-alert-dismissal-trigger
      type="button"
      className={className}
      data-h2-button={buttonStyling}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

const Title: React.FunctionComponent<GeneralProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <p data-h2-alert-title className={className} {...rest}>
      {children}
    </p>
  );
};

interface AlertComposition {
  DismissBtn: React.FunctionComponent<DismissBtnProps>;
  Title: React.FunctionComponent<GeneralProps>;
}

interface AlertProps extends GeneralProps {
  color: H2Color;
  position: "static" | "toast";
  dismissBtn?: React.ReactElement;
}

const Alert: React.FunctionComponent<AlertProps> & AlertComposition = ({
  color,
  position,
  dismissBtn,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      data-h2-no-js // Ensure this won't hook into an H2 script that removes this element from the DOM.
      data-h2-alert={`${color}, ${position}`}
      role="alert"
      className={className}
      {...rest}
    >
      {dismissBtn}
      <div data-h2-alert-content>{children}</div>
    </div>
  );
};

// We expose the children components here, as properties.
// Using the dot notation we explicitly set the composition relationships
// btw the Alert component and its sub components.
Alert.DismissBtn = DismissBtn;
Alert.Title = Title;

export default Alert;
