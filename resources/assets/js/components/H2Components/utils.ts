export interface GeneralProps {
  /** The standard css class attribute */
  className?: string;
  /** The standard inline styling attribute */
  style?: React.CSSProperties;
}

export interface GeneralBtnProps {
  /** The hydrogen styling for a button component */
  buttonStyling?: string;
  /** The type of button: "submit" | "reset" | "button" */
  type?: "submit" | "reset" | "button";
  /** The onClick event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** This sets the button to disabled state, preventing user from interacting with the button. */
  disabled?: boolean;
}
