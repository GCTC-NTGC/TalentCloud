import React, { Component, createRef } from "react";

export interface InfoModalProps {
  /** HTML ID for modal attributes */
  id: string;
  /** Title that appears within the modal when open */
  title: string;
  /** Optional subtitle that appears within the open modal */
  subtitle?: string;
  /** Text displayed on the button that displays the modal */
  openText: string;
  /** Text displayed on the modal confirmation button */
  confirmText: string;
  /** React children */
  children?: React.ReactNode;
}

interface InfoModalState {
  /** Height of the modal itself */
  height: number;
  /** Visibility of the modal */
  visible: boolean;
}

class InfoModal extends Component<InfoModalProps, InfoModalState> {
  private divElement = createRef<HTMLDivElement>();

  public constructor(props: InfoModalProps) {
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

  private updateBody = (visible: boolean): void => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = visible ? "hidden" : "visible";
    }
  };

  public handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.setState(() => ({ visible: true }));
    this.updateBody(true);
  };

  public handleClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.setState(() => ({ visible: false }));
    this.updateBody(false);
  };

  public render(): React.ReactElement {
    const { id, title, subtitle, openText, confirmText, children } = this.props;

    const { visible } = this.state;

    return (
      <>
        <div data-c-alignment="center">
          <button
            className="modal-info__open-button"
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
          aria-hidden={visible}
          aria-describedby={`${id}-description`}
          aria-labelledby={`${id}-title`}
          data-c-dialog=""
          data-c-dialog-id={id}
          data-c-padding="top(double) bottom(double)"
          role="dialog"
          ref={this.divElement}
        >
          <div data-c-background="white(100)" data-c-radius="rounded">
            <div
              data-c-padding="normal"
              data-c-border="bottom(thin, solid, black)"
              data-c-background="black(90)"
              className="modal-info__header"
            >
              <h5
                data-c-font-size="h4"
                data-c-colour="white"
                id={`${id}-title`}
              >
                {title}
              </h5>

              {subtitle && (
                <span data-c-font-size="h5" data-c-margin="top(half)">
                  {subtitle}
                </span>
              )}

              <button
                className="modal-info__close-button"
                data-c-dialog-action="close"
                data-c-dialog-id={id}
                type="button"
                onClick={this.handleClose}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <div
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
            >
              <div id={`${id}-description`}>{children}</div>
            </div>

            <div data-c-padding="normal">
              <div data-c-alignment="center">
                <button
                  data-c-button="solid(go)"
                  data-c-radius="rounded"
                  data-c-dialog-action="close"
                  data-c-dialog-id={id}
                  type="button"
                  onClick={this.handleClose}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default InfoModal;
