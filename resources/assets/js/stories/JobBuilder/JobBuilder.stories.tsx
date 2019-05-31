import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import JobBuilder from "../../components/JobBuilder-01/JobBuilder";

const stories = storiesOf("Job Builder - Step 01", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add("Job Builder Body", (): React.ReactElement => <JobBuilder />, {
  info: { inline: true },
});
