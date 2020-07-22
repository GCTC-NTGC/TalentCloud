import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import Checkbox from "../components/Checkbox";

const stories = storiesOf("Form Components|Checkbox", module).addDecorator(
  withIntl,
);

stories.add(
  "Plain",
  (): React.ReactElement => (
    <div data-c-grid="gutter" data-c-padding="left(double)">
      <Checkbox
        id={text("ID", "sample-input")}
        name={text("Name", "What a name")}
        label={text("Label", "Plain old checkbox")}
        grid="base(1of1) tl(1of3)"
        value={text("Value", "value")}
        checked={boolean("Checked", true)}
        onChange={action("Contents changed")}
        onBlur={action("Lost focus")}
      />
    </div>
  ),
);
