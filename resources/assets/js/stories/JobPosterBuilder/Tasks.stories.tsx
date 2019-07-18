/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { JobTasksIntl as JobTasks } from "../../components/JobTasks/JobTasks";
import { fakeJobTasks } from "../../fakeData/fakeJob";

const stories = storiesOf("Job Poster Builder|Tasks", module).addDecorator(
  withIntl,
);

const handleSubmit = async (): Promise<boolean> => {
  return true;
};

const sampleTasks = fakeJobTasks();

stories
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobTasks
        jobId={null}
        keyTasks={null}
        validCount={number("Valid Count", 6)}
        handleSubmit={handleSubmit}
      />
    ),
  )
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <JobTasks
        jobId={1}
        keyTasks={sampleTasks}
        validCount={number("Valid Count", 4)}
        handleSubmit={handleSubmit}
      />
    ),
  );
