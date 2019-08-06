import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { JobDetailsIntl as JobDetails } from "../../components/JobDetails/JobDetails";
import fakeJob from "../../fakeData/fakeJob";

const stories = storiesOf("Job Poster Builder|Details", module).addDecorator(
  withIntl,
);

const handleSubmit = async (): Promise<boolean> => {
  return true;
};

stories
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobDetails
        job={null}
        handleSubmit={handleSubmit}
        handleReturn={action("Save and Return")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
  )
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <JobDetails
        job={fakeJob()}
        handleSubmit={handleSubmit}
        handleReturn={action("Save and Return")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
  );
