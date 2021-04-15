import * as React from "react";
import Dialog from "../H2Components/Dialog";

interface TCConfirmationDialogProps {
  /** Close button text. */
  closeBtn: string;
  /** Confirm button text. */
  confirmBtn: string;
  /** Dialog content. */
  content: React.ReactElement | string;
  /** The dialogs id. This must match the dialog trigger id. */
  id: string;
  /** Boolean that controls if the dialog is open or closed */
  isVisible: boolean;
  /** Optional subtitle. */
  subtitle?: string;
  /** Dialog title. */
  title: string;
  /** Callback method that closes the dialog. */
  closeDialog: () => void;
}

const TCConfirmationDialog: React.FunctionComponent<TCConfirmationDialogProps> = ({
  closeBtn,
  confirmBtn,
  content,
  id,
  isVisible,
  subtitle,
  title,
  closeDialog,
}) => {
  return (
    <Dialog
      id={id}
      isVisible={isVisible}
      closeDialog={closeDialog}
      data-h2-radius="b(round)"
    >
      <Dialog.Header closeBtnColor="black">
        <Dialog.Title
          data-h2-padding="b(all, .5) b(left, 1)"
          data-h2-font-color="b(black)"
          data-h2-font-size="b(h5)"
          data-h2-font-weight="b(700)"
        >
          {title}
          <p data-h2-font-color="b(theme-3)" data-h2-font-size="b(normal)">
            {subtitle}
          </p>
        </Dialog.Title>
      </Dialog.Header>
      <div data-h2-container="b(center, large)">
        <Dialog.Content data-h2-padding="mqb(tb, 1)">{content}</Dialog.Content>
        <hr data-h2-hr="gray-1, thin" />
        <Dialog.Actions
          data-h2-padding="mqb(tb, 1)"
          data-h2-grid="b(middle, expanded, padded, 1)"
        >
          <div data-h2-align="b(left)" data-h2-grid-item="b(1of2)">
            <Dialog.ActionBtn
              buttonStyling="stop, round, outline"
              data-h2-padding="b(rl, 2) b(tb, .5)"
              data-h2-bg-color="b(white, 1)"
              data-h2-font-size="b(h6)"
            >
              {closeBtn}
            </Dialog.ActionBtn>
          </div>
          <div data-h2-align="b(right)" data-h2-grid-item="b(1of2)">
            <Dialog.ActionBtn
              buttonStyling="theme-1, round, solid"
              data-h2-padding="b(rl, 2) b(tb, .5)"
              data-h2-bg-color="b(white, 1)"
              data-h2-font-size="b(h6)"
            >
              {confirmBtn}
            </Dialog.ActionBtn>
          </div>
        </Dialog.Actions>
      </div>
    </Dialog>
  );
};

export default TCConfirmationDialog;
