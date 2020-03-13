import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import fakeJob from "../../fakeData/fakeJob";
import JobIntro from "../../components/JobBuilder/Intro/JobIntro";
import { Job } from "../../models/types";
import { fakeDepartments } from "../../fakeData/fakeDepartments";
import { fakeManager } from "../../fakeData/fakeManager";
import { fakeUser } from "../../fakeData/fakeUsers";

const stories = storiesOf("Job Poster Builder|Intro", module).addDecorator(
  withIntl,
);

const handleSubmit = async (): Promise<Job> => {
  action("Submit")();
  return fakeJob();
};

stories
  .add(
    "New Job",
    (): React.ReactElement => (
      <JobIntro
        job={null}
        manager={fakeManager()}
        user={fakeUser()}
        departments={fakeDepartments()}
        handleSubmit={handleSubmit}
        handleContinue={action("Continue in English")}
      />
    ),
  )
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <JobIntro
        job={fakeJob()}
        manager={fakeManager()}
        user={fakeUser()}
        departments={fakeDepartments()}
        handleSubmit={handleSubmit}
        handleContinue={action("Continue in English")}
      />
    ),
  );
