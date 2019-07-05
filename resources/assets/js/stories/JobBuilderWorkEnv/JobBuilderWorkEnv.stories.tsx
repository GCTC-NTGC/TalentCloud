import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import JobBuilderWorkEnv from "../../components/JobBuilderWorkEnv/JobBuilderWorkEnv";

const stories = storiesOf("Job Builder - Work Environment", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withIntl);

stories.add(
  "Job Builder Body",
  (): React.ReactElement => (
    <JobBuilderWorkEnv handleSubmit={action("Submit")} />
  ),
  {
    info: { inline: true },
  },
);
