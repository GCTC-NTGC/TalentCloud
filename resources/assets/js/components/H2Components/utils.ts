export interface GeneralProps {
  /** The standard css class attribute */
  className?: string;
}

export interface GeneralBtnProps {
  /** The hydrogen styling for a button component */
  buttonStyling?: string;
  /** The type of button: "submit" | "reset" | "button" */
  type?: "submit" | "reset" | "button";
  /** The onClick event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
