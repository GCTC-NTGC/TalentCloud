import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { JobDetailsIntl as JobDetails } from "../../components/JobDetails/JobDetails";
import fakeJob from "../../fakeData/fakeJob";

const modalRoot = document.querySelector("#modal-root");

const stories = storiesOf("JobDetails", module);

stories
  .addDecorator(withInfo)
  .addDecorator(withIntl)
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobDetails
        modalParent={modalRoot || document.body}
        handleSubmit={action("Submit")}
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
        modalParent={modalRoot || document.body}
        handleSubmit={action("Submit Edit")}
        handleModalCancel={action("Modal Cancelled")}
        handleModalConfirm={action("Modal Confirmed")}
      />
    ),
    { info: { inline: true } },
  );
