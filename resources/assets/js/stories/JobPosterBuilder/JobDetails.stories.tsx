import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { JobDetailsIntl as JobDetails } from "../../components/JobDetails/JobDetails";
import fakeJob from "../../fakeData/fakeJob";

const modalRoot = document.querySelector("#modal-root");

const stories = storiesOf("JobDetails", module);

let isSaving = false;
let saveSuccessful = false;
const handleSubmit = (): void => {
  isSaving = true;
  setTimeout((): void => {
    isSaving = false;
    saveSuccessful = true;
  }, 1000);
  // action("Submit")();
};
const clearSaveSuccessful = (): void => {
  saveSuccessful = false;
  // action("Clear Save Successful")();
};

stories
  .addDecorator(withInfo)
  .addDecorator(withIntl)
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobDetails
        isSaving={isSaving}
        saveSuccessful={saveSuccessful}
        handleSubmit={handleSubmit}
        clearSaveSuccessful={clearSaveSuccessful}
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
        isSaving={isSaving}
        saveSuccessful={saveSuccessful}
        handleSubmit={handleSubmit}
        clearSaveSuccessful={clearSaveSuccessful}
        modalParent={modalRoot || document.body}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
    { info: { inline: true } },
  );
