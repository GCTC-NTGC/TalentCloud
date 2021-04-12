import React from "react";
import { GeneralBtnProps, H2Color } from "./utils";

type DismissBtnProps = GeneralBtnProps;
const DismissBtn: React.FunctionComponent<DismissBtnProps> = ({
  className,
  children,
  buttonStyling,
  onClick,
  disabled,
  ...rest
}) => (
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

type TitleProps = React.HTMLAttributes<HTMLParagraphElement>;
const Title: React.FunctionComponent<TitleProps> = ({
  className,
  children,
  ...rest
}) => (
  <p data-h2-alert-title className={className} {...rest}>
    {children}
  </p>
);

interface AlertComposition {
  DismissBtn: React.FunctionComponent<DismissBtnProps>;
  Title: React.FunctionComponent<TitleProps>;
}

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
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
}) => (
  <div data-h2-alert-wrapper="toast">
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
  </div>
);

// We expose the children components here, as properties.
// Using the dot notation we explicitly set the composition relationships
// btw the Alert component and its sub components.
Alert.DismissBtn = DismissBtn;
Alert.Title = Title;

export default Alert;
