import React, { createContext, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getFocusableElements } from "../helpers/forms";

interface ModalProps {
  id: string;
  parentElement: Element | null;
  visible: boolean;
  children: React.ReactNode;
  className?: string;
  onModalConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onModalMiddle?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  className,
  onModalConfirm,
  onModalMiddle,
  onModalCancel,
}: ModalProps): React.ReactPortal | null {
  // Set up div ref to measure modal height
  const modalRef = useRef<HTMLDivElement>(null);

  const getFocusableModalElements = () =>
    modalRef && modalRef.current ? getFocusableElements(modalRef.current) : [];

  const handleTabKey = (e: KeyboardEvent): void => {
    if (modalRef && modalRef.current) {
      const focusableModalElements = getFocusableModalElements();

      if (focusableModalElements.length === 0) {
        e.preventDefault(); // TODO: should this throw an error?
        return;
      }

      const firstElement = focusableModalElements[0] as HTMLElement;
      const lastElement = focusableModalElements[
        focusableModalElements.length - 1
      ] as HTMLElement;

      if (focusableModalElements.length === 1) {
        // This check to avoid strange behaviour if firstElement == lastElement.
        firstElement.focus();
        e.preventDefault();
        return;
      }

      const focusableModalElementsArray = Array.from(focusableModalElements);

      if (
        document.activeElement &&
        !focusableModalElementsArray.includes(
          document.activeElement as HTMLElement,
        )
      ) {
        firstElement.focus();
        e.preventDefault();
        return;
      }

      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
        return;
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    }
  };

  // Collection of key codes and event listeners
  const keyListenersMap = new Map([
    [27, onModalCancel],
    [9, handleTabKey],
  ]);

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
  }, [keyListenersMap, visible]);

  // Focus the first focusable element when the modal becomes visible.
  useEffect(() => {
    if (visible) {
      const focusableModalElements = getFocusableModalElements();
      if (focusableModalElements.length > 0) {
        const firstElement = focusableModalElements[0] as HTMLElement;
        firstElement.focus();
      }
    }
  }, [visible]);

  if (parentElement !== null) {
    return createPortal(
      <div
        aria-describedby={`${id}-description`}
        aria-hidden={!visible}
        aria-labelledby={`${id}-title`}
        data-c-dialog={visible ? "active--overflowing" : ""}
        data-c-padding="top(double) bottom(double)"
        role="dialog"
        ref={modalRef}
        className={className}
        data-c-visibility={!visible ? "hidden" : ""}
      >
        <div data-c-background="white(100)" data-c-radius="rounded">
          <modalContext.Provider
            value={{
              id,
              parentElement,
              visible,
              onModalConfirm,
              onModalMiddle,
              onModalCancel,
            }}
          >
            {children}
          </modalContext.Provider>
        </div>
      </div>,
      parentElement,
    );
  }

  return null;
}

Modal.Header = function ModalHeader({ children }): React.ReactElement {
  return <div className="dialog-header">{children}</div>;
};

Modal.Body = function ModalBody(props): React.ReactElement {
  const { children } = props;
  return <div data-c-border="bottom(thin, solid, black)">{children}</div>;
};

Modal.Footer = function ModalFooter(props): React.ReactElement {
  const { children } = props;
  return (
    <div data-c-padding="normal">
      <div data-c-grid="gutter middle">
        {Array.isArray(children) && children.length > 0
          ? children.map(
              (btn, index): React.ReactElement => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  data-c-grid-item={`base(1of${children.length})`}
                >
                  {btn}
                </div>
              ),
            )
          : children}
      </div>
    </div>
  );
};

Modal.FooterConfirmBtn = function ConfirmBtn(props): React.ReactElement {
  const { onModalConfirm } = useContext(modalContext);
  return (
    <div data-c-alignment="base(right)">
      <button
        {...props}
        data-c-button="solid(c1)"
        data-c-dialog-action="close"
        data-c-radius="rounded"
        type="button"
        onClick={onModalConfirm}
      />
    </div>
  );
};

Modal.FooterCancelBtn = function CancelBtn(props): React.ReactElement {
  const { onModalCancel } = useContext(modalContext);
  return (
    <div>
      <button
        {...props}
        data-c-button="outline(c1)"
        data-c-dialog-action="close"
        data-c-radius="rounded"
        type="button"
        onClick={onModalCancel}
      />
    </div>
  );
};

Modal.FooterMiddleBtn = function MiddleBtn(props): React.ReactElement {
  const { onModalMiddle } = useContext(modalContext);
  return (
    <div data-c-alignment="base(center)">
      <button
        {...props}
        data-c-button="solid(c1)"
        data-c-dialog-action="close"
        data-c-radius="rounded"
        type="button"
        disabled={onModalMiddle === undefined}
        onClick={onModalMiddle}
      />
    </div>
  );
};
