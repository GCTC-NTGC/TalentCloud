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

export type H2Color =
  | "white"
  | "gray-1"
  | "gray-2"
  | "gray-3"
  | "gray-4"
  | "gray-5"
  | "gray-6"
  | "gray-7"
  | "gray-8"
  | "gray-9"
  | "black"
  | "stop"
  | "slow"
  | "go"
  | "theme-1"
  | "theme-1-light"
  | "theme-1-dark"
  | "theme-2"
  | "theme-2-light"
  | "theme-2-dark"
  | "theme-3"
  | "theme-3-light"
  | "theme-3-dark"
  | "theme-4"
  | "theme-4-light"
  | "theme-4-dark"
  | "theme-5"
  | "theme-5-light"
  | "theme-5-dark";
