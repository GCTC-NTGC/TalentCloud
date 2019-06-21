import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { useState } from "react";
import { JobDetailsIntl as JobDetails } from "../../components/JobDetails/JobDetails";
import fakeJob from "../../fakeData/fakeJob";

const modalRoot = document.querySelector("#modal-root");

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
        isSaving={boolean("isSaving", false)}
        handleSubmit={handleSubmit}
        modalParent={modalRoot || document.body}
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
        isSaving={boolean("isSaving", false)}
        handleSubmit={handleSubmit}
        modalParent={modalRoot || document.body}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
    { info: { inline: true } },
  )
  .add(
    "Existing Job While Saving",
    (): React.ReactElement => (
      <JobDetails
        job={fakeJob()}
        isSaving={boolean("isSaving", true)}
        handleSubmit={handleSubmit}
        modalParent={modalRoot || document.body}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
    { info: { inline: true } },
  )
  .add(
    "After successful submit",
    (): React.ReactElement => (
      <JobDetails
        job={fakeJob()}
        isSaving={boolean("isSaving", false)}
        handleSubmit={handleSubmit}
        modalParent={modalRoot || document.body}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
    { info: { inline: true } },
  )
  .add(
    "With functioning interactions",
    (): React.ReactElement => <JobDetailsWrapper />,
    { info: { inline: true } },
  );

const JobDetailsWrapper = (): React.ReactElement => {
  return (
    <JobDetails
      job={fakeJob()}
      isSaving={false}
      // saveSuccessful={saveSuccessful}
      handleSubmit={handleSubmit}
      // clearSaveSuccessful={clearSaveSuccessful}
      modalParent={modalRoot || document.body}
      handleModalCancel={action("Modal Cancelled")}
      handleModalConfirm={action("Modal Confirmed")}
    />
  );
};
