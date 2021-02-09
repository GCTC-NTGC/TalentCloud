import * as React from "react";
import {
  h2DialogResizeOnViewport,
  h2DialogTrigger,
  h2DialogEnableOpenDialogs,
} from "@hydrogen-design-system/system/dist/import/latest/components/dialog/scripts/dialog";
import { GeneralProps, GeneralBtnProps } from "./utils";

interface DialogContext extends GeneralProps {
  /** The dialogs id. */
  id: string;
}

const DialogContext = React.createContext<DialogContext | undefined>(undefined);

/**
 * This Context hook allows our child components to easily reach
 * into the Tabs context and get the pieces it needs.
 *
 * Bonus: it even makes sure the component is used within a
 * Dialog component!
 */
const useDialogContext = (): Partial<DialogContext> => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("This component must be used within a <Dialog> component.");
  }
  return context;
};

const Actions: React.FunctionComponent<GeneralProps> = (props) => {
  useDialogContext(); // Ensures sub-component can only be used within the Dialog component.
  const { className, children, ...rest } = props;
  return (
    <div data-h2-dialog-actions className={className} {...rest}>
      {children}
    </div>
  );
};

const ActionBtn: React.FunctionComponent<GeneralBtnProps & GeneralProps> = (
  props,
) => {
  const { id } = useDialogContext();
  const { buttonStyling, type, onClick, className, children, ...rest } = props;
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2DialogTrigger(ref.current);
  });
  return (
    <button
      data-h2-dialog-trigger={`${id}`}
      data-h2-button={buttonStyling}
      ref={ref}
      type={type || "button"}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};

const Content: React.FunctionComponent<GeneralProps> = (props) => {
  const { id } = useDialogContext();
  const { className, children, ...rest } = props;
  return (
    <div
      data-h2-dialog-content
      id={`${id}Content`}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
};

const Header: React.FunctionComponent<GeneralProps> = (props) => {
  useDialogContext(); // Ensures sub-component can only be used within the Dialog component.
  const { className, children, ...rest } = props;
  return (
    <div data-h2-dialog-title className={className} {...rest}>
      {children}
    </div>
  );
};

interface OverlayProps {
  overlay?: string;
}

const Overlay: React.FunctionComponent<OverlayProps> = (props) => {
  const { overlay } = props;
  return <div data-h2-dialog-overlay={`${overlay || "black, .9"}`} />;
};

const Title: React.FunctionComponent<GeneralProps> = (props) => {
  const { id } = useDialogContext();
  const { className, children, ...rest } = props;
  return (
    <h5 data-h2-focus id={`${id}Title`} className={className} {...rest}>
      {children}
    </h5>
  );
};

interface TriggerProps extends GeneralProps, GeneralBtnProps {
  id: string;
}

/** This Trigger component opens the dialog and sits outside the main dialog component */
const Trigger: React.FunctionComponent<TriggerProps> = (props) => {
  const { id, buttonStyling, className, children, ...rest } = props;
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2DialogTrigger(ref.current);
  });
  return (
    <button
      data-h2-button={buttonStyling}
      ref={ref}
      data-h2-dialog-trigger={`${id}`}
      type="button"
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};

interface DialogComposition {
  Actions: React.FunctionComponent<GeneralProps>;
  ActionBtn: React.FunctionComponent<GeneralBtnProps>;
  Content: React.FunctionComponent<GeneralProps>;
  Header: React.FunctionComponent<GeneralProps>;
  Overlay: React.FunctionComponent<OverlayProps>;
  Title: React.FunctionComponent<GeneralProps>;
  Trigger: React.FunctionComponent<TriggerProps>;
}

const Dialog: React.FunctionComponent<DialogContext> & DialogComposition = (
  props,
) => {
  const { id, className, children, ...rest } = props;
  const ref = React.useRef(null);
  React.useEffect(() => {
    h2DialogResizeOnViewport(ref.current);
    h2DialogEnableOpenDialogs(ref.current);
  });
  return (
    <DialogContext.Provider value={props}>
      <div
        ref={ref}
        aria-hidden="true"
        aria-describedby={`${id}Content`}
        aria-labelledby={`${id}Title`}
        data-h2-dialog={id}
        tabIndex={-1}
        role="dialog"
      >
        <div data-h2-dialog-wrapper className={className} {...rest}>
          {children}
        </div>
      </div>
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
Dialog.Overlay = Overlay;
Dialog.Title = Title;
Dialog.Trigger = Trigger;

export default Dialog;
