import * as React from "react";
import { storiesOf, RenderFunction } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { injectIntl } from "react-intl";
import IntlContainer from "../../IntlContainer";
import JobDetails from "../../components/JobDetails/JobDetails";
import fakeJob from "../../fakeData/fakeJob";

const langOptions = {
  english: "en",
  french: "fr",
};

const modalRoot = document.querySelector("#modal-root");

const stories = storiesOf("JobDetails", module);

stories
  .addDecorator(withInfo)
  .addParameters({
    info: {
      propTables: [JobDetails],
      propTablesExclude: [IntlContainer, injectIntl],
    },
  })
  .addDecorator(withKnobs)
  .addDecorator(
    (storyFn: RenderFunction): React.ReactElement => (
      <IntlContainer
        locale={select("Language", langOptions, "en", "Lang-Group")}
      >
        {storyFn()}
      </IntlContainer>
    ),
  )
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
