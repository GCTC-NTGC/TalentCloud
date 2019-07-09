import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import fakeJob from "../../fakeData/fakeJob";
import { Job } from "../../models/types";
import WorkEnvForm from "../../components/JobBuilderWorkEnv/WorkEnvForm";

const stories = storiesOf(
  "Job Poster Builder|Work Environment",
  module,
).addDecorator(withIntl);

const handleSubmit = async (job: Job): Promise<Job> => {
  action("handleSubmit")();
  return job;
};

stories.add(
  "Body",
  (): React.ReactElement => (
    <WorkEnvForm
      job={null}
      handleSubmit={handleSubmit}
      handleModalConfirm={action("Confirm")}
      handleModalCancel={action("Cancel")}
    />
  ),
);
