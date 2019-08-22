import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import fakeJob from "../../fakeData/fakeJob";
import { Job } from "../../models/types";
import WorkEnvForm from "../../components/JobBuilderWorkEnv/WorkEnvForm";

const stories = storiesOf(
  "Job Poster Builder|Work Environment",
  module,
).addDecorator(withIntl);

const handleSubmit = async (job: Job): Promise<Job> => {
  action("Submit")();
  return job;
};
const handleSkipToReview = async (): Promise<void> => {
  action("Skip to Review")();
};

stories
  .add(
    "New Job",
    (): React.ReactElement => (
      <WorkEnvForm
        job={null}
        handleSubmit={handleSubmit}
        handleReturn={action("Save & Return")}
        handleModalConfirm={action("Confirm")}
        handleModalCancel={action("Cancel")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
      />
    ),
  )
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <WorkEnvForm
        job={fakeJob()}
        handleSubmit={handleSubmit}
        handleReturn={action("Save & Return")}
        handleModalConfirm={action("Confirm")}
        handleModalCancel={action("Cancel")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
      />
    ),
  );
