export interface GeneralBtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** The hydrogen styling for a button component */
  buttonStyling?: string;
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
