import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Input from "../components/Input";

const stories = storiesOf("Input", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  "Text Input",
  () => (
    <Input
      htmlId={text('ID', 'sample-input')}
      formName={text('Name', "What a name")}
      label={text("Label", "Label")}
      required={boolean("Required", "false")}
      placeholder={text("Placeholder", "Write what you will")}
      type={text("type","text")}
      minLength={number("Minimum Length", "0")}
      maxLength={number("Maximum Length", "30")}
      value={text("Default Value", "Hello World")}
      errorText={text("Error Text", "")}
      onChange={action('Confirm clicked')}
    />
  ),
  { info: { inline: true } },
);

stories.add(
  "Email Input",
  () => (
    <Input
      htmlId={text('ID', 'sample-email-input')}
      formName={text('Name', "What a name")}
      label={text("Label", "Label")}
      required={boolean("Required", "false")}
      placeholder={text("Placeholder", "Write what you will")}
      type={text("type","email")}
      minLength={number("Minimum Length", "0")}
      maxLength={number("Maximum Length", "30")}
      value={text("Default Value", "hello@world.test")}
      errorText={text("Error Text", "")}
      onChange={action('Confirm clicked')}
    />
  ),
  { info: { inline: true } },
);
