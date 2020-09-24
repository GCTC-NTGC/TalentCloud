/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { BasicInfo } from "../../components/Application/BasicInfo/BasicInfo";
import { fakeApplicationNormalized } from "../../fakeData/fakeApplications";
import fakeJob from "../../fakeData/fakeJob";
import { Job } from "../../models/types";

const stories = storiesOf("Application|Basic Info", module).addDecorator(
  withIntl,
);

const bilingualRequirementJob: Job = {
  ...fakeJob(),
  language_requirement_id: 4,
};

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const promiseAction = (text: string) => async () => {
  sleep(1000);
  action(text)();
};

stories
  .add(
    "New Application",
    (): React.ReactElement => (
      <BasicInfo
        application={fakeApplicationNormalized()}
        job={fakeJob()}
        handleContinue={promiseAction("Save and Continue")}
        handleReturn={promiseAction("Save and Return to Previous Step")}
        handleQuit={promiseAction("Save and Quit")}
      />
    ),
  )
  .add(
    "Bilingual Language Requirement",
    (): React.ReactElement => (
      <BasicInfo
        application={fakeApplicationNormalized()}
        job={bilingualRequirementJob}
        handleContinue={promiseAction("Save and Continue")}
        handleReturn={promiseAction("Save and Return to Previous Step")}
        handleQuit={promiseAction("Save and Quit")}
      />
    ),
  );
