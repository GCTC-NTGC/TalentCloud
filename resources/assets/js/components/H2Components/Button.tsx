import * as React from "react";

export interface ButtonProps {
  disabled?: boolean;
  ref?: React.MutableRefObject<null>;
  styling?: string;
  tabIndex?: number;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  disabled,
  ref,
  styling,
  tabIndex,
  type,
  onClick,
  children,
  ...rest
}) => {
  return (
    <button
      ref={ref}
      data-h2-button={styling}
      type={type || "button"}
      onClick={onClick}
      tabIndex={tabIndex}
      {...rest}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
