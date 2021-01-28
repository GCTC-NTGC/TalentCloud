import * as React from "react";
import {
  h2ComponentDialogLoad,
  h2ComponentDialogLoadResize,
  h2ComponentDialogEnableTrigger,
} from "@hydrogen-design-system/system/dist/import/latest/components/dialog/scripts/dialog";
import { defineMessages, useIntl } from "react-intl";
import Button, { ButtonProps } from "./Button";

const messages = defineMessages({
  closeDialog: {
    id: "hydrogen.dialog.close",
    defaultMessage: "Close",
  },
});

interface DialogContext {
  id?: string;
}

const DialogContext = React.createContext<DialogContext>({});

const useDialog = (): Partial<DialogContext> => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("This component must be used within a <Dialog> component.");
  }
  return context;
};

const Actions: React.FunctionComponent = (props) => {
  const { id = "dialog" } = useDialog();
  const { children } = props;
  return (
    <div data-h2-dialog-actions {...props}>
      {children}
    </div>
  );
};

const ActionBtn: React.FunctionComponent<ButtonProps> = (props) => {
  const { id = "dialog" } = useDialog();
  const { onClick, styling, type, children } = props;
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2ComponentDialogEnableTrigger("latest", ref.current);
  });
  return (
    <button
      data-h2-button={styling}
      ref={ref}
      data-h2-dialog-trigger={`${id}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Content: React.FunctionComponent = (props) => {
  const { id = "dialog" } = useDialog();
  const { children } = props;
  return (
    <div data-h2-dialog-content id={`${id}Content`} {...props}>
      {children}
    </div>
  );
};
const ExitBtn: React.FunctionComponent = (props) => {
  useDialog();
  const intl = useIntl();
  const { children } = props;
  return (
    <Button data-h2-dialog-exit-trigger data-h2-bg-color="b(white, 0)">
      <i className="fas fa-times" aria-hidden="true" />
      <span data-h2-visibility="hidden">
        {intl.formatMessage(messages.closeDialog)}
      </span>
    </Button>
  );
};

interface HeaderProps {
  className?: string;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  useDialog();
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

const Title: React.FunctionComponent = (props) => {
  const { id = "dialog" } = useDialog();
  const { children } = props;
  return (
    <h5 data-h2-focus id={`${id}Title`} {...props}>
      {children}
    </h5>
  );
};

interface TriggerProps {
  id: string;
}

const Trigger: React.FunctionComponent<TriggerProps> = (props) => {
  const { id, children } = props;
  const ref = React.useRef(null);
  React.useEffect((): void => {
    h2ComponentDialogEnableTrigger("latest", ref.current);
  });
  return (
    <button ref={ref} data-h2-dialog-trigger={`${id}`} type="button" {...props}>
      {children}
    </button>
  );
};

interface DialogComposition {
  Actions: React.FunctionComponent;
  ActionBtn: React.FunctionComponent<ButtonProps>;
  Content: React.FunctionComponent;
  ExitBtn: React.FunctionComponent;
  Header: React.FunctionComponent<HeaderProps>;
  Overlay: React.FunctionComponent<OverlayProps>;
  Title: React.FunctionComponent;
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
      >
        <div data-h2-dialog-wrapper {...props}>
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
};

// We expose the children components here, as properties.
Dialog.Actions = Actions;
Dialog.ActionBtn = ActionBtn;
Dialog.Content = Content;
Dialog.ExitBtn = ExitBtn;
Dialog.Header = Header;
Dialog.Overlay = Overlay;
Dialog.Title = Title;
Dialog.Trigger = Trigger;

// We only export the root component.
export default Dialog;
