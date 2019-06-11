import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import JobBuilderStep1 from "../../components/JobBuilder-01/JobBuilderStep1";

const stories = storiesOf("Job Builder - Step 01", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add("Job Builder Body", (): React.ReactElement => <JobBuilderStep1 />, {
  info: { inline: true },
});
