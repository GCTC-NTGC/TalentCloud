import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import Input from "../../components/Forms/Input";
import TextArea from "../../components/Forms/TextArea";

const stories = storiesOf("Input", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withIntl);

stories.add(
  "Text Input",
  (): React.ReactElement => (
    <Input
      htmlId={text("ID", "sample-input")}
      formName={text("Name", "What a name")}
      label={text("Label", "Label")}
      required={boolean("Required", false)}
      placeholder={text("Placeholder", "Write what you will")}
      type={text("type", "text")}
      minLength={number("Minimum Length", 0)}
      maxLength={number("Maximum Length", 30)}
      value={text("Default Value", "Hello World")}
      errorText={text("Error Text", "")}
      onChange={action("Contents changed")}
    />
  ),
  { info: { inline: true } },
);

stories.add(
  "Email Input",
  (): React.ReactElement => (
    <Input
      htmlId={text("ID", "sample-email-input")}
      formName={text("Name", "What a name")}
      label={text("Label", "Label")}
      required={boolean("Required", false)}
      placeholder={text("Placeholder", "Write what you will")}
      type={text("type", "email")}
      minLength={number("Minimum Length", 0)}
      maxLength={number("Maximum Length", 30)}
      value={text("Default Value", "hello@world.test")}
      errorText={text("Error Text", "")}
      onChange={action("Contents changed")}
    />
  ),
  { info: { inline: true } },
);

stories.add(
  "Text Area",
  (): React.ReactElement => (
    <TextArea
      htmlId={text("ID", "sample-text-area")}
      formName={text("Name", "texty-area")}
      label={text("Label", "My Text Area")}
      required={boolean("Required", false)}
      placeholder={text("Placeholder", "Write what you will, in long form")}
      minLength={number("Minimum Length", 10)}
      maxLength={number("Maximum Length", 300)}
      value={text("Default Value", "Spock is Captain Kirk finds Janeway")}
      errorText={text("Error Text", "")}
      onChange={action("Contents changed")}
    />
  ),
  { info: { inline: true } },
);
