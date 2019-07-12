import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import fakeJob from "../../fakeData/fakeJob";
import IntroForm from "../../components/JobBuilderIntro/IntroForm";
import { Job } from "../../models/types";

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
      <IntroForm
        job={null}
        handleSubmit={handleSubmit}
        handleContinueEn={action("Continue in English")}
        handleContinueFr={action("Continue in French")}
      />
    ),
  )
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <IntroForm
        job={fakeJob()}
        handleSubmit={handleSubmit}
        handleContinueEn={action("Continue in English")}
        handleContinueFr={action("Continue in French")}
      />
    ),
  );
