import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { JobDetails } from "../../components/JobBuilder/Details/JobDetails";
import fakeJob from "../../fakeData/fakeJob";
import fakeClassifications from "../../fakeData/fakeClassifications";

const stories = storiesOf("Job Poster Builder|Details", module).addDecorator(
  withIntl,
);

const handleSubmit = async (): Promise<boolean> => {
  action("Submit")();
  return true;
};
const handleSkipToReview = async (): Promise<void> => {
  action("Skip to Review")();
};

stories
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobDetails
        job={null}
        classifications={fakeClassifications()}
        handleSubmit={handleSubmit}
        handleReturn={action("Save and Return")}
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
      <JobDetails
        job={fakeJob()}
        classifications={fakeClassifications()}
        handleSubmit={handleSubmit}
        handleReturn={action("Save and Return")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
      />
    ),
  );
