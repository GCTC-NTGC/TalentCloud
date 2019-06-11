import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import JobBuilderIntro from "../../components/JobBuilderIntro/JobBuilderIntro";

const stories = storiesOf("Job Builder - Step 01", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add("Job Builder Body", (): React.ReactElement => <JobBuilderIntro />, {
  info: { inline: true },
});
