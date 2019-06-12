import React, { Component, createRef } from "react";

export interface ModalProps {
  /** HTML ID for modal attributes */
  id: string;
  /** Title that appears within the modal when open */
  title: string;
  /** Optional subtitle that appears within the open modal */
  subtitle?: string;
  /** Text displayed on the button that displays the modal */
  openText: string;
  /** Text displayed on the button that hides the modal */
  closeText: string;
  /** Text displayed on the modal confirmation button */
  confirmText: string;
  /** Text displayed on the modal cancellation button */
  cancelText: string;
  /** React children */
  children?: React.ReactNode;
  /** Function to run for modal confirmation click */
  handleConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ModalState {
  /** Height of the modal itself */
  height: number;
  /** Visibility of the modal */
  visible: boolean;
}

class Modal extends Component<ModalProps, ModalState> {
  private divElement = createRef<HTMLDivElement>();

  public constructor(props: ModalProps) {
    super(props);

    this.state = { height: 0, visible: false };
  }

  public componentDidMount = (): void => {
    const node = this.divElement.current;
    if (node) {
      const height = node.clientHeight;
      this.setState({ height });
    }
  };

  protected handleSizing = (): string => {
    const viewportHeight = window.outerHeight;
    const { height } = this.state;

    return height > viewportHeight
      ? "active--overflowing"
      : "active--contained";
  };

  private updateBody = (): void => {
    const body = document.querySelector("body");
    const { visible } = this.state;
    if (body) {
      body.style.overflow = visible ? "hidden" : "visible";
    }
  };

  public handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.setState({ visible: true });
    this.updateBody();
  };

  public handleClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.setState({ visible: false });
    this.updateBody();
  };

  public render(): React.ReactElement {
    const {
      id,
      title,
      subtitle,
      openText,
      closeText,
      confirmText,
      cancelText,
      children,
      handleConfirm,
    } = this.props;

    const { visible } = this.state;

    return (
      <>
        <div data-c-alignment="center">
          <button
            data-c-button="solid(c1)"
            data-c-radius="rounded"
            data-c-dialog-id={id}
            data-c-dialog-action="open"
            type="button"
            onClick={this.handleOpen}
          >
            {openText}
          </button>
        </div>

        <div data-c-dialog-overlay={visible && "active"} />

        <div
          aria-hidden={!visible}
          aria-describedby={`${id}-description`}
          aria-labelledby={`${id}-title`}
          data-c-dialog={visible && `${this.handleSizing()}`}
          data-c-dialog-id={id}
          data-c-padding="top(double) bottom(double)"
          role="dialog"
          ref={this.divElement}
        >
          <div data-c-background="white(100)" data-c-radius="rounded">
            <div
              data-c-padding="normal"
              data-c-border="bottom(thin, solid, black)"
            >
              <h5 data-c-font-size="h4" id={`${id}-title`}>
                {title}
              </h5>

              {subtitle && (
                <span data-c-font-size="h5" data-c-margin="top(half)">
                  {subtitle}
                </span>
              )}

              <button
                data-c-dialog-action="close"
                data-c-dialog-id={id}
                type="button"
                onClick={this.handleClose}
              >
                <i className="material-icons">{closeText}</i>
              </button>
            </div>

            <div
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
            >
              <div id={`${id}-description`}>{children}</div>
            </div>

            <div data-c-padding="normal">
              <div data-c-grid="gutter middle">
                <div data-c-grid-item="base(1of2)">
                  <button
                    data-c-button="outline(slow)"
                    data-c-radius="rounded"
                    data-c-dialog-action="close"
                    data-c-dialog-id={id}
                    type="button"
                    onClick={this.handleClose}
                  >
                    {cancelText}
                  </button>
                </div>
                <div
                  data-c-grid-item="base(1of2)"
                  data-c-alignment="base(right)"
                >
                  <button
                    data-c-button="solid(go)"
                    data-c-radius="rounded"
                    data-c-dialog-action="close"
                    data-c-dialog-id={id}
                    type="button"
                    onClick={handleConfirm}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
