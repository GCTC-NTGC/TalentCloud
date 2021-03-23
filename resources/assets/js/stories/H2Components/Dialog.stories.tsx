import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { text } from "@storybook/addon-knobs";
import { useState } from "@storybook/client-api";
import Dialog from "../../components/H2Components/Dialog";

const stories = storiesOf("H2 Components/Dialog", module).addDecorator(
  withIntl,
);

stories.add(
  "Dialog",
  (): React.ReactElement => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const openDialog = () => setIsDialogVisible(true);
    const closeDialog = () => {
      setIsDialogVisible(false);
    };
    return (
      <section>
        <Dialog.Trigger
          id="dialog"
          data-h2-button="white, round, solid"
          data-h2-shadow="b(medium)"
          data-h2-padding="b(all, .5)"
          data-h2-margin="b(right, 1)"
          onClick={openDialog}
        >
          <p>{text("Trigger", "Open Dialog", "Text")}</p>
        </Dialog.Trigger>
        <Dialog
          isVisible={isDialogVisible}
          closeDialog={closeDialog}
          id="dialog"
        >
          <Dialog.Header className="gradient-left-right">
            <Dialog.Title
              data-h2-padding="b(all, .5) b(left, 1)"
              data-h2-font-color="b(white)"
              data-h2-font-size="b(h4)"
            >
              {text(
                "Title",
                "Dialog Title but what if this were much longer?",
                "Text",
              )}
            </Dialog.Title>
            <Dialog.ActionBtn
              data-h2-dialog-exit-trigger
              data-h2-button="round, small, solid"
              data-h2-align="b(right)"
            >
              <i
                data-h2-font-size="b(normal)"
                data-h2-font-color="b(white)"
                className="fas fa-times"
                aria-hidden="true"
              />
            </Dialog.ActionBtn>
          </Dialog.Header>
          <Dialog.Content>
            <p data-h2-padding="b(all, 3)">
              {text(
                "Content",
                " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem officia reprehenderit labore ipsum et incidunt amet, dicta mollitia blanditiis minima!",
                "Text",
              )}
            </p>
          </Dialog.Content>
          <Dialog.Actions data-h2-padding="b(all, .5)" data-h2-align="b(right)">
            <Dialog.ActionBtn
              buttonStyling="stop, round, solid"
              data-h2-padding="b(rl, 2) b(tb, .5)"
              data-h2-bg-color="b(white, 1)"
            >
              {text("Button Label", "Close", "Text")}
            </Dialog.ActionBtn>
          </Dialog.Actions>
        </Dialog>
      </section>
    );
  },
);
