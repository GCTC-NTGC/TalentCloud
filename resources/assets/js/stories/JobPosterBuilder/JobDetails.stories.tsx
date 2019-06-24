import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { useState } from "react";
import { JobDetailsIntl as JobDetails } from "../../components/JobDetails/JobDetails";
import fakeJob from "../../fakeData/fakeJob";

const stories = storiesOf("JobDetails", module);

const handleSubmit = async (): Promise<boolean> => {
  return true;
};

stories
  .addDecorator(withInfo)
  .addDecorator(withIntl)
  .addDecorator(withKnobs)
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobDetails
        job={null}
        handleSubmit={handleSubmit}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
    { info: { inline: true } },
  )
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <JobDetails
        job={fakeJob()}
        handleSubmit={handleSubmit}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
    { info: { inline: true } },
  );
