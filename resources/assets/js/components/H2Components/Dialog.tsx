import * as React from "react";
import { focusOnElement, getTabList } from "../../helpers/forms";
import { GeneralBtnProps } from "./utils";

type Div = React.HTMLAttributes<HTMLDivElement>;
type Heading = React.HTMLAttributes<HTMLDivElement>;
interface DialogContext extends Div {
  /** The dialogs id. */
  id: string;
  /** Boolean that controls if modal is open or closed. */
  isVisible: boolean;
  /** Callback method that closes the dialog. */
  closeDialog: () => void;
}

const DialogContext = React.createContext<DialogContext | undefined>(undefined);

/**
 * This Context hook allows our child components to easily reach
 * into the Tabs context and get the pieces it needs.
 *
 * Bonus: it even makes sure the component is used within a
 * Dialog component!
 */
const useDialogContext = (): DialogContext => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("This component must be used within a <Dialog> component.");
  }
  return context;
};

type ActionsProps = Div;
const Actions: React.FunctionComponent<ActionsProps> = ({
  children,
  ...rest
}) => {
  useDialogContext(); // Ensures sub-component can only be used within the Dialog component.
  return (
    <div data-h2-dialog-actions {...rest}>
      {children}
    </div>
  );
};

type ActionBtnProps = GeneralBtnProps;
const ActionBtn: React.FunctionComponent<ActionBtnProps> = ({
  buttonStyling,
  children,
  type,
  ...rest
}) => {
  const { id } = useDialogContext();
  return (
    <button
      data-h2-dialog-trigger={`${id}`}
      data-h2-button={buttonStyling}
      type={type || "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

type ContentProps = Div;
const Content: React.FunctionComponent<ContentProps> = ({
  children,
  ...rest
}) => {
  const { id } = useDialogContext();
  return (
    <div data-h2-dialog-content id={`${id}Content`} {...rest}>
      {children}
    </div>
  );
};

type HeaderProps = Div;
const Header: React.FunctionComponent<HeaderProps> = ({
  children,
  ...rest
}) => {
  useDialogContext(); // Ensures sub-component can only be used within the Dialog component.
  return (
    <div data-h2-dialog-title {...rest}>
      {children}
    </div>
  );
};

type TitleProps = Heading;
const Title: React.FunctionComponent<TitleProps> = ({ children, ...rest }) => {
  const { id } = useDialogContext();
  return (
    <h5 data-h2-focus id={`${id}Title`} {...rest}>
      {children}
    </h5>
  );
};

/** This Trigger component opens the dialog and sits outside the main dialog component */
type TriggerProps = GeneralBtnProps;
const Trigger: React.FunctionComponent<TriggerProps> = ({
  id,
  buttonStyling,
  children,
  ...rest
}) => {
  return (
    <button
      aria-haspopup
      data-h2-button={buttonStyling}
      data-h2-dialog-trigger={`${id}`}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

interface DialogComposition {
  Actions: React.FunctionComponent<ActionsProps>;
  ActionBtn: React.FunctionComponent<ActionBtnProps>;
  Content: React.FunctionComponent<ContentProps>;
  Header: React.FunctionComponent<HeaderProps>;
  Title: React.FunctionComponent<TitleProps>;
  Trigger: React.FunctionComponent<TriggerProps>;
}

const Dialog: React.FunctionComponent<DialogContext> & DialogComposition = (
  props,
) => {
  const { id, isVisible, className, children, closeDialog, ...rest } = props;
  // Focus the first focusable element when the modal becomes visible.
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (isVisible && dialogRef.current) {
      const focusableModalElements = getTabList(dialogRef.current);
      if (focusableModalElements.length > 0) {
        const firstElement = focusableModalElements[0] as HTMLElement;
        firstElement.focus();
      }
    }
  }, [isVisible]);

  const handleKeyUp = React.useCallback(
    (event) => {
      switch (event.key) {
        case "Escape":
          closeDialog();
          focusOnElement(`[data-h2-dialog-trigger=${id}]`);
          break;
        case "Tab":
          if (dialogRef && dialogRef.current) {
            const focusableDialogElements = getTabList(dialogRef.current);

            if (focusableDialogElements.length === 0) {
              event.preventDefault(); // TODO: should this throw an error?
              return;
            }

            const firstElement = focusableDialogElements[0] as HTMLElement;
            const lastElement = focusableDialogElements[
              focusableDialogElements.length - 1
            ] as HTMLElement;

            if (focusableDialogElements.length === 1) {
              // This check to avoid strange behavior if firstElement == lastElement.
              firstElement.focus();
              event.preventDefault();
              return;
            }

            const focusableDialogElementsArray = Array.from(
              focusableDialogElements,
            );

            if (
              document.activeElement &&
              !focusableDialogElementsArray.includes(
                document.activeElement as HTMLElement,
              )
            ) {
              firstElement.focus();
              event.preventDefault();
              return;
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
              return;
            }

            if (event.shiftKey && document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          }
          break;
        default:
          break;
      }
    },
    [id, closeDialog],
  );

  React.useEffect(() => {
    if (isVisible) {
      document.addEventListener("keydown", handleKeyUp);
    }

    return () => document.removeEventListener("keydown", handleKeyUp);
  }, [isVisible, handleKeyUp]);

  return (
    <DialogContext.Provider value={props}>
      <div
        data-h2-no-js
        aria-hidden={!isVisible}
        aria-describedby={`${id}Content`}
        aria-labelledby={`${id}Title`}
        data-h2-dialog={id}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={isVisible ? 0 : -1}
        role="dialog"
        className={`h2-dialog-contained ${
          isVisible ? "h2-active h2-dialog-height" : ""
        }`}
        ref={dialogRef}
      >
        <div data-h2-dialog-wrapper className={className} {...rest}>
          {children}
        </div>
      </div>
      <div
        data-h2-dialog-overlay="black, .9"
        className={isVisible ? "h2-active" : ""}
      />
    </DialogContext.Provider>
  );
};

// We expose the children components here, as properties.
// Using the dot notation we explicitly set the composition relationships,
// btw the Dialog component and its sub components.
Dialog.Actions = Actions;
Dialog.ActionBtn = ActionBtn;
Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Title = Title;
Dialog.Trigger = Trigger;

export default Dialog;
