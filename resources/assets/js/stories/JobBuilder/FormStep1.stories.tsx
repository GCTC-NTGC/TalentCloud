import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import FormStep1 from "../../components/JobBuilder-01/FormStep1";

const stories = storiesOf("Job Builder - Step 01", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add("Form", (): React.ReactElement => <FormStep1 />, {
  info: { inline: true },
});
