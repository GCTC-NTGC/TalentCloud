import * as React from "react";
import {
  h2ComponentDialogLoad,
  h2ComponentDialogLoadResize,
  h2ComponentDialogEnableTrigger,
} from "@hydrogen-design-system/system/dist/import/latest/components/dialog/scripts/dialog";
import { defineMessages, useIntl } from "react-intl";
import { GeneralProps, GeneralBtnProps } from "./utils";

const messages = defineMessages({
  closeDialog: {
    id: "hydrogen.dialog.close",
    defaultMessage: "Close",
  },
});

interface DialogContext {
  /** The dialogs id. */
  id?: string;
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
  const { children } = props;
  return (
    <div data-h2-dialog-actions {...props}>
      {children}
    </div>
  );
};

const ActionBtn: React.FunctionComponent<GeneralBtnProps> = (props) => {
  const { id = "dialog" } = useDialogContext();
  const { buttonStyling, type, onClick, children } = props;
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2ComponentDialogEnableTrigger("latest", ref.current);
  });
  return (
    <button
      data-h2-dialog-trigger={`${id}`}
      data-h2-button={buttonStyling}
      ref={ref}
      type={type || "button"}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Content: React.FunctionComponent<GeneralProps> = (props) => {
  const { id = "dialog" } = useDialogContext();
  const { className, children } = props;
  return (
    <div
      data-h2-dialog-content
      id={`${id}Content`}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

const ExitBtn: React.FunctionComponent<GeneralBtnProps & GeneralProps> = (
  props,
) => {
  useDialogContext(); // Ensures sub-component can only be used within the Dialog component.
  const { buttonStyling, className, onClick, children } = props;
  const intl = useIntl();
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2ComponentDialogEnableTrigger("latest", ref.current);
  });
  return (
    <button
      data-h2-dialog-exit-trigger
      data-h2-button={buttonStyling}
      ref={ref}
      type="button"
      onClick={onClick}
      className={className}
      {...props}
    >
      <i className="fas fa-times" aria-hidden="true" />
      <span data-h2-visibility="hidden">
        {intl.formatMessage(messages.closeDialog)}
      </span>
      {children}
    </button>
  );
};

const Header: React.FunctionComponent<GeneralProps> = (props) => {
  useDialogContext(); // Ensures sub-component can only be used within the Dialog component.
  const { className, children } = props;
  return (
    <div data-h2-dialog-title className={className} {...props}>
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
  const { id = "dialog" } = useDialogContext();
  const { className, children } = props;
  return (
    <h5 data-h2-focus id={`${id}Title`} className={className} {...props}>
      {children}
    </h5>
  );
};

interface TriggerProps extends GeneralProps, GeneralBtnProps {
  id: string;
}

/** This Trigger component opens the dialog and sits outside the main dialog component */
const Trigger: React.FunctionComponent<TriggerProps> = (props) => {
  const { id, buttonStyling, className, children } = props;
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2ComponentDialogEnableTrigger("latest", ref.current);
  });
  return (
    <button
      data-h2-button={buttonStyling}
      ref={ref}
      data-h2-dialog-trigger={`${id}`}
      type="button"
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

interface DialogComposition {
  Actions: React.FunctionComponent<GeneralProps>;
  ActionBtn: React.FunctionComponent<GeneralBtnProps>;
  Content: React.FunctionComponent<GeneralProps>;
  ExitBtn: React.FunctionComponent<GeneralBtnProps>;
  Header: React.FunctionComponent<GeneralProps>;
  Overlay: React.FunctionComponent<OverlayProps>;
  Title: React.FunctionComponent<GeneralProps>;
  Trigger: React.FunctionComponent<TriggerProps>;
}

const Dialog: React.FunctionComponent<DialogContext> & DialogComposition = (
  props,
) => {
  const { id, children } = props;
  React.useEffect(() => {
    h2ComponentDialogLoad();
    h2ComponentDialogLoadResize();
    h2ComponentDialogEnableTrigger();
  });
  return (
    <DialogContext.Provider value={props}>
      <div
        aria-hidden="true"
        aria-describedby={`${id}Content`}
        aria-labelledby={`${id}Title`}
        data-h2-dialog={id}
        tabIndex={-1}
        role="dialog"
        {...props}
      >
        <div data-h2-dialog-wrapper {...props}>
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
Dialog.ExitBtn = ExitBtn;
Dialog.Header = Header;
Dialog.Overlay = Overlay;
Dialog.Title = Title;
Dialog.Trigger = Trigger;

export default Dialog;
