import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import JobBuilderWorkEnv from "../../components/JobBuilderWorkEnv/JobBuilderWorkEnv";
import fakeJob from "../../fakeData/fakeJob";
import { Job } from "../../models/types";

const stories = storiesOf(
  "Job Poster Builder|Work Environment",
  module,
).addDecorator(withIntl);

const handleSubmit = async (job: Job): Promise<Job> => {
  action("handleSubmit")();
  return fakeJob();
};

stories.add(
  "Body",
  (): React.ReactElement => <JobBuilderWorkEnv handleSubmit={handleSubmit} />,
);
