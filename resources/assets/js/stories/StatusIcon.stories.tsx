import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import StatusIcon, { IconStatus } from "../components/StatusIcon";

const stories = storiesOf(
  "Components|Status Icon",
  module,
).addDecorator((storyFn) => (
  <div data-c-container="base(medium, left)">{storyFn()}</div>
));

stories
  .add(
    "Default",
    (): React.ReactElement => (
      <div data-c-padding="left(double)" data-c-margin="top(double)">
        <StatusIcon size={text("Size", "h4")} status={IconStatus.DEFAULT} />
      </div>
    ),
  )
  .add(
    "Error",
    (): React.ReactElement => (
      <div data-c-padding="left(double)" data-c-margin="top(double)">
        <StatusIcon size={text("Size", "small")} status={IconStatus.ERROR} />
      </div>
    ),
  )
  .add(
    "Custom Color",
    (): React.ReactElement => (
      <div data-c-padding="left(double)" data-c-margin="top(double)">
        <StatusIcon
          color={text("Color", "c3")}
          size={text("Size", "small")}
          status={IconStatus.READY}
        />
      </div>
    ),
  );
