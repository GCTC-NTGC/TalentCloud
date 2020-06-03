/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { select, text, boolean } from "@storybook/addon-knobs";
import JobImpact from "../../components/JobBuilder/Impact/JobImpact";
import fakeDepartments from "../../fakeData/fakeDepartments";
import fakeJob from "../../fakeData/fakeJob";

const stories = storiesOf("Job Poster Builder|Impact", module).addDecorator(
  withIntl,
);

const handleSubmit = async (): Promise<boolean> => {
  action("Submitted")();
  return true;
};
const handleSkipToReview = async (): Promise<void> => {
  action("Skip to Review")();
};

const deptOptions = {
  "Treasury Board": 1,
  "Natural Resources": 2,
};

stories
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobImpact
        departments={fakeDepartments()}
        job={null}
        handleSubmit={handleSubmit}
        handleReturn={action("Save & Return")}
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
      <JobImpact
        departments={fakeDepartments()}
        job={{
          ...fakeJob(),
          department_id: select("Department", deptOptions, 1),
        }}
        handleSubmit={handleSubmit}
        handleReturn={action("Save & Return")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
      />
    ),
  )
  .add(
    "Departments Loading",
    (): React.ReactElement => (
      <JobImpact
        departments={[]}
        job={fakeJob()}
        handleSubmit={handleSubmit}
        handleReturn={action("Save & Return")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
      />
    ),
  )
  .add(
    "Unknown Department",
    (): React.ReactElement => (
      <JobImpact
        departments={fakeDepartments()}
        job={{
          ...fakeJob(),
          department_id: 100,
        }}
        handleSubmit={handleSubmit}
        handleReturn={action("Save & Return")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
      />
    ),
  );
