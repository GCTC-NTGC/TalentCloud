import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { text } from "@storybook/addon-knobs";
import { useState } from "@storybook/client-api";
import TCDialog from "../../components/TCComponents/TCDialog";
import Dialog from "../../components/H2Components/Dialog";
import TCConfirmationDialog from "../../components/TCComponents/TCConfirmationDialog";

const stories = storiesOf("TC Components/Dialog", module).addDecorator(
  withIntl,
);

stories
  .add(
    "Dialog",
    (): React.ReactElement => {
      const [isDialogVisible, setIsDialogVisible] = useState(true);
      const openDialog = () => setIsDialogVisible(true);
      const closeDialog = () => {
        setIsDialogVisible(false);
      };
      return (
        <section>
          <Dialog.Trigger
            id="tc-dialog"
            data-h2-button="white, round, solid"
            data-h2-shadow="b(medium)"
            data-h2-padding="b(all, .5)"
            data-h2-margin="b(right, 1)"
            onClick={openDialog}
          >
            <p>{text("Trigger", "Open TC Dialog", "Text")}</p>
          </Dialog.Trigger>
          <TCDialog
            id="tc-dialog"
            title={text("Title", "h1, Bold, Heading Size 4, White", "Text")}
            subtitle={text("Subtitle", "Optional, Copy Size, White", "Text")}
            content={
              <p>
                {text(
                  "Content",
                  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium autem, libero dolor quidem facere eos expedita quisquam architecto voluptates unde aliquam optio impedit possimus! Laboriosam unde necessitatibus rem dolorem? Quaerat maxime voluptate placeat officia iure eius cumque ducimus? Ea cum quod, nihil sed atque ullam repellat est dolores exercitationem repudiandae.

                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium autem, libero dolor quidem facere eos expedita quisquam architecto voluptates unde aliquam optio impedit possimus! Laboriosam unde necessitatibus rem dolorem? Quaerat maxime voluptate placeat officia iure eius cumque ducimus? Ea cum quod, nihil sed atque ullam repellat est dolores exercitationem repudiandae.
                  `,
                  "Text",
                )}
              </p>
            }
            closeBtn={text("Close Button", "Cancel", "Text")}
            confirmBtn={text("Confirm Button", "Confirm", "Text")}
            isVisible={isDialogVisible}
            closeDialog={closeDialog}
          />
        </section>
      );
    },
  )
  .add(
    "Confirmation Modal",
    (): React.ReactElement => {
      const [isDialogVisible, setIsDialogVisible] = useState(true);
      const openDialog = () => setIsDialogVisible(true);
      const closeDialog = () => {
        setIsDialogVisible(false);
      };
      return (
        <section>
          <Dialog.Trigger
            id="tc-dialog"
            data-h2-button="white, round, solid"
            data-h2-shadow="b(medium)"
            data-h2-padding="b(all, .5)"
            data-h2-margin="b(right, 1)"
            onClick={openDialog}
          >
            <p>{text("Trigger", "Open TC Dialog", "Text")}</p>
          </Dialog.Trigger>
          <TCConfirmationDialog
            id="tc-dialog"
            title={text("Title", "h1, Bold, Heading Size 5, Black", "Text")}
            subtitle={text("Subtitle", "Optional, Copy Size, Theme-3", "Text")}
            content={
              <p>
                {text(
                  "Content",
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium autem, libero dolor quidem facere eos expedita quisquam architecto voluptates unde aliquam optio impedit possimus! Laboriosam unde necessitatibus rem dolorem? Quaerat maxime voluptate placeat officia iure eius cumque ducimus? Ea cum quod, nihil sed atque ullam repellat est dolores exercitationem repudiandae.",
                  "Text",
                )}
              </p>
            }
            closeBtn={text("Close Button", "Cancel", "Text")}
            confirmBtn={text("Confirm Button", "Confirm", "Text")}
            isVisible={isDialogVisible}
            closeDialog={closeDialog}
          />
        </section>
      );
    },
  );
