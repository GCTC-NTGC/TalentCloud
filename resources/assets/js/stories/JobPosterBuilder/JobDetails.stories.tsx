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

stories
  .addDecorator(withInfo)
  .addDecorator(withIntl)
  .addDecorator(withKnobs)
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobDetails
        isSaving={boolean("isSaving", false)}
        saveSuccessful={boolean("saveSuccessful", false)}
        handleSubmit={action("Submit Job")}
        clearSaveSuccessful={action("clearSaveSuccessful")}
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
        saveSuccessful={boolean("saveSuccessful", false)}
        handleSubmit={action("Submit Job")}
        clearSaveSuccessful={action("clearSaveSuccessful")}
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
        saveSuccessful={boolean("saveSuccessful", false)}
        handleSubmit={action("Submit Job")}
        clearSaveSuccessful={action("clearSaveSuccessful")}
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
        saveSuccessful={boolean("saveSuccessful", true)}
        handleSubmit={action("Submit Job")}
        clearSaveSuccessful={action("clearSaveSuccessful")}
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessful, setSaveSuccessful] = useState(false);
  const handleSubmit = (): void => {
    setIsSaving(true);
    setTimeout((): void => {
      setIsSaving(false);
      setSaveSuccessful(true);
    }, 1000);
    // action("Submit")();
  };
  const clearSaveSuccessful = (): void => {
    setSaveSuccessful(true);
    // action("Clear Save Successful")();
  };
  return (
    <JobDetails
      job={fakeJob()}
      isSaving={isSaving}
      saveSuccessful={saveSuccessful}
      handleSubmit={handleSubmit}
      clearSaveSuccessful={clearSaveSuccessful}
      modalParent={modalRoot || document.body}
      handleModalCancel={action("Modal Cancelled")}
      handleModalConfirm={action("Modal Confirmed")}
    />
  );
};
