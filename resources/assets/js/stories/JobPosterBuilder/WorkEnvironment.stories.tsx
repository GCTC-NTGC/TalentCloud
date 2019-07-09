import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import JobBuilderWorkEnv from "../../components/JobBuilderWorkEnv/JobBuilderWorkEnv";

const stories = storiesOf(
  "Job Poster Builder|Work Environment",
  module,
).addDecorator(withIntl);

stories.add(
  "Body",
  (): React.ReactElement => (
    <JobBuilderWorkEnv handleSubmit={action("Submit")} />
  ),
);
