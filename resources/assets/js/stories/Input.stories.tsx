import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean, number } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import Input from "../components/Input";

const stories = storiesOf("Components|Input", module).addDecorator(withIntl);

stories
  .add(
    "Text",
    (): React.ReactElement => (
      <div data-c-grid="gutter" data-c-padding="left(double)">
        <Input
          id={text("ID", "sample-input")}
          name={text("Name", "What a name")}
          label={text("Label", "Label")}
          required={boolean("Required", false)}
          invalid={boolean("Invalid", false)}
          placeholder={text("Placeholder", "Write what you will")}
          grid="base(1of1) tl(1of3)"
          type={text("Type", "text")}
          minLength={number("Minimum Length", 0)}
          maxLength={number("Maximum Length", 30)}
          value={text("Value", "Hello World")}
          errorText={text("Error Text", "")}
          onChange={action("Contents changed")}
          onBlur={action("Lost focus")}
        />
      </div>
    ),
  )
  .add(
    "Email",
    (): React.ReactElement => (
      <div data-c-grid="gutter" data-c-padding="left(double)">
        <Input
          id={text("ID", "sample-email-input")}
          name={text("Name", "What a name")}
          label={text("Label", "Label")}
          required={boolean("Required", false)}
          invalid={boolean("Invalid", false)}
          placeholder={text("Placeholder", "Write what you will")}
          grid="base(1of1) tl(1of3)"
          type={text("Type", "email")}
          minLength={number("Minimum Length", 0)}
          maxLength={number("Maximum Length", 30)}
          value={text("Value", "hello@world.test")}
          errorText={text("Error Text", "")}
          onChange={action("Contents changed")}
          onBlur={action("Lost focus")}
        />
      </div>
    ),
  );
