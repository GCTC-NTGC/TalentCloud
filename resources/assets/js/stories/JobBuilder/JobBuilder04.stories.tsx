import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import JobBuilder04 from "../../components/JobBuilder-04/JobBuilder04";

const stories = storiesOf("Job Builder - Step 04", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add("Job Builder Body", (): React.ReactElement => <JobBuilder04 />, {
  info: { inline: true },
});
