import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  id: string;
  parentElement: Element | null;
  visible: boolean;
  children: React.ReactNode;
  onModalConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onModalCancel: (
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
  ) => void;
}

// Partial helper allows empty defaults in the createContext call:
// https://fettblog.eu/typescript-react/context/#context-without-default-values
const modalContext = createContext<Partial<ModalProps>>({});

export default function Modal({
  id,
  parentElement,
  visible,
  children,
  onModalConfirm,
  onModalCancel,
}: ModalProps): React.ReactPortal {
  // Set up div ref to measure modal height
  const modalRef = useRef<HTMLDivElement>(null);

  // Internal state to keep track of the overflow setting
  const [overflow, setOverflow] = useState("");

  const handleTabKey = (e: KeyboardEvent): void => {
    if (modalRef && modalRef.current) {
      const focusableModalElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="radio"], select',
      );
      const firstElement = focusableModalElements[0] as HTMLElement;
      const lastElement = focusableModalElements[
        focusableModalElements.length - 1
      ] as HTMLElement;

      const focusableModalElementsArray = Array.from(focusableModalElements);

      if (
        document.activeElement &&
        !focusableModalElementsArray.includes(document.activeElement)
      ) {
        firstElement.focus();
        e.preventDefault();
      }

      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    }
  };

  // Collection of key codes and event listeners
  const keyListenersMap = new Map([[27, onModalCancel], [9, handleTabKey]]);

  // Runs every time visible changes to set the overflow on the modal and update the body overflow
  useEffect((): (() => void) => {
    function setBodyStyle(): void {
      document.body.style.overflow = visible ? "hidden" : "visible";
    }
    setBodyStyle();
    // Runs on component unmount
    return (): void => {
      setBodyStyle();
    };
  }, [visible]);

  // Runs when the children of the modal change to ensure proper height calculation
  useEffect((): void => {
    if (visible && modalRef && modalRef.current) {
      const height = modalRef.current.clientHeight;
      const viewportHeight = window.innerHeight;
      setOverflow(
        height > viewportHeight ? "active--overflowing" : "active--contained",
      );
    }
  }, [children]);

  // Adds various key commands to the modal
  useEffect((): (() => void) => {
    let keyListener;
    if (visible) {
      keyListener = (e: KeyboardEvent): void => {
        const listener = keyListenersMap.get(e.keyCode);
        return listener && listener(e);
      };
      document.addEventListener("keydown", keyListener);
    }

    return (): void => {
      if (keyListener !== undefined) {
        document.removeEventListener("keydown", keyListener);
      }
    };
  }, [visible]);

  return createPortal(
    <div
      aria-describedby={`${id}-description`}
      aria-hidden={!visible}
      aria-labelledby={`${id}-title`}
      data-c-dialog={visible ? overflow : ""}
      data-c-dialog-id={id}
      data-c-padding="top(double) bottom(double)"
      role="dialog"
      ref={modalRef}
    >
      <div data-c-background="white(100)" data-c-radius="rounded">
        <modalContext.Provider
          value={{ id, parentElement, visible, onModalConfirm, onModalCancel }}
        >
          {children}
        </modalContext.Provider>
      </div>
    </div>,
    parentElement || document.body,
  );
}

Modal.Header = function ModalHeader(props): React.ReactElement {
  return props.children;
};

Modal.Body = function ModalBody(props): React.ReactElement {
  const { children } = props;
  return <div data-c-border="bottom(thin, solid, black)">{children}</div>;
};

Modal.Footer = function ModalFooter(props): React.ReactElement {
  const { children } = props;

  return (
    <div data-c-padding="normal">
      <div data-c-grid="gutter middle">{children}</div>
    </div>
  );
};

Modal.FooterConfirmBtn = function ConfirmBtn(props): React.ReactElement {
  const { id, onModalConfirm } = useContext(modalContext);
  return (
    <div data-c-alignment="base(right)" data-c-grid-item="base(1of2)">
      <button
        {...props}
        data-c-button="solid(c1)"
        data-c-dialog-action="close"
        data-c-dialog-id={id}
        data-c-radius="rounded"
        type="button"
        onClick={onModalConfirm}
      />
    </div>
  );
};

Modal.FooterCancelBtn = function CancelBtn(props): React.ReactElement {
  const { id, onModalCancel } = useContext(modalContext);
  return (
    <div data-c-grid-item="base(1of2)">
      <button
        {...props}
        data-c-button="outline(c1)"
        data-c-dialog-action="close"
        data-c-dialog-id={id}
        data-c-radius="rounded"
        type="button"
        onClick={onModalCancel}
      />
    </div>
  );
};
