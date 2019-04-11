import React, { Component } from 'react';

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
  children?: React.ReactNode;
}

class Modal extends Component<ModalProps> {
  protected handleSizing(): void {
    const viewportHeight = window.outerHeight;
  }

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
    } = this.props;
    return (
      <>
        <div data-c-alignment="center">
          <button
            data-c-button="solid(c1)"
            data-c-radius="rounded"
            data-c-dialog-id={id}
            data-c-dialog-action="open"
            type="button"
          >
            {openText}
          </button>
        </div>

        <div data-c-dialog-overlay />

        <div
          aria-hidden="true"
          aria-describedby={`${id}-description`}
          aria-labelledby={`${id}-title`}
          data-c-dialog
          data-c-dialog-id={id}
          data-c-padding="top(double) bottom(double)"
          role="dialog"
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
