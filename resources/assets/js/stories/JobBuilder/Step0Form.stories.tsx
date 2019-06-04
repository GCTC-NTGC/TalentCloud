import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import Step0Form from "../../components/JobBuilder-01/Step0Form";

const stories = storiesOf("Job Builder - Step 01", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add("Form", (): React.ReactElement => <Step0Form />, {
  info: { inline: true },
});
