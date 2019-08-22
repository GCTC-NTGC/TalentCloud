/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { number, boolean } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { JobTasksIntl as JobTasks } from "../../components/JobTasks/JobTasks";
import { fakeJobTasks } from "../../fakeData/fakeJob";
import { JobPosterKeyTask } from "../../models/types";

const stories = storiesOf("Job Poster Builder|Tasks", module).addDecorator(
  withIntl,
);

const handleSubmit = async (
  values: JobPosterKeyTask[],
): Promise<JobPosterKeyTask[]> => {
  action("Handle Submit")();
  return values;
};
const handleSkipToReview = async (): Promise<void> => {
  action("Skip to Review")();
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
        handleReturn={action("Handle Return")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
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
        handleReturn={action("Handle Return")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
      />
    ),
  );
