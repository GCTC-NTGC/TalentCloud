import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import fakeJob from "../../fakeData/fakeJob";
import IntroForm from "../../components/JobBuilderIntro/IntroForm";
import { Job } from "../../models/types";

const stories = storiesOf("Job Poster Builder|Intro", module)
  .addDecorator(withInfo)
  .addDecorator(withIntl);

const handleSubmit = async (): Promise<Job> => {
  action("Submit")();
  return fakeJob();
};

stories
  .add(
    "Intro Body",
    (): React.ReactElement => (
      <IntroForm
        job={null}
        handleSubmit={handleSubmit}
        handleContinueEn={action("Continue in English")}
        handleContinueFr={action("Continue in French")}
      />
    ),
    {
      info: { inline: true },
    },
  )
  .add(
    "Intro for existing job",
    (): React.ReactElement => (
      <IntroForm
        job={fakeJob()}
        handleSubmit={handleSubmit}
        handleContinueEn={action("Continue in English")}
        handleContinueFr={action("Continue in French")}
      />
    ),
    {
      info: { inline: true },
    },
  );