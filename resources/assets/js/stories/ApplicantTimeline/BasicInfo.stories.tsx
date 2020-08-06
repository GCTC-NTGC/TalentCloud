/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { BasicInfo } from "../../components/Application/BasicInfo/BasicInfo";
import fakeJob from "../../fakeData/fakeJob";
import { Job } from "../../models/types";

const stories = storiesOf("Applicant Timeline|Basic Info", module).addDecorator(
  withIntl,
);

const bilingualRequirementJob: Job = {
  ...fakeJob(),
  language_requirement_id: 4,
};

stories
  .add(
    "New Application",
    (): React.ReactElement => (
      <BasicInfo
        job={fakeJob()}
        handleContinue={action("Save and Continue")}
        handleReturn={action("Save and Return to Previous Step")}
        handleQuit={action("Save and Quit")}
      />
    ),
  )
  .add(
    "Bilingual Language Requirement",
    (): React.ReactElement => (
      <BasicInfo
        job={bilingualRequirementJob}
        handleContinue={action("Save and Continue")}
        handleReturn={action("Save and Return to Previous Step")}
        handleQuit={action("Save and Quit")}
      />
    ),
  );
