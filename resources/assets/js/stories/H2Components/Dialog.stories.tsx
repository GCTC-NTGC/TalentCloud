import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { text } from "@storybook/addon-knobs";
import Dialog from "../../components/H2Components/Dialog";

const stories = storiesOf("H2 Components/Dialog", module).addDecorator(
  withIntl,
);

stories.add(
  "Dialog",
  (): React.ReactElement => (
    <section>
      <Dialog.Trigger
        id="dialog"
        data-h2-button="white, round, solid"
        data-h2-card="white, round"
        data-h2-padding="b(all, .5)"
        data-h2-margin="b(right, 1)"
      >
        <p data-h2-grid-item="b(1of1)">
          {text("Trigger", "Open Dialog", "Text")}
        </p>
      </Dialog.Trigger>
      <Dialog id="dialog">
        <Dialog.Header className="gradient-left-right">
          <Dialog.Title
            data-h2-padding="b(all, .5) b(left, 1)"
            data-h2-font-color="b(white)"
            data-h2-font-size="b(h4)"
          >
            Dialog Title
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <p data-h2-padding="b(all, 3)">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            officia reprehenderit labore ipsum et incidunt amet, dicta mollitia
            blanditiis minima!
          </p>
        </Dialog.Content>
        <Dialog.Actions data-h2-padding="b(all, .5)" data-h2-align="b(right)">
          <Dialog.ActionBtn
            buttonStyling="stop, round, solid"
            data-h2-padding="b(rl, 2) b(tb, .5)"
            data-h2-bg-color="b(white, 1)"
          >
            Okay, Close
          </Dialog.ActionBtn>
        </Dialog.Actions>
      </Dialog>
      <Dialog.Overlay />
    </section>
  ),
);
