import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import JobBuilderIntro from "../../components/JobBuilderIntro/JobBuilderIntro";
import fakeJob from "../../fakeData/fakeJob";

const stories = storiesOf("Job Builder - Intro", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withIntl);

stories
  .add(
    "Intro Body",
    (): React.ReactElement => (
      <JobBuilderIntro job={null} handleSubmit={action("Submit")} />
    ),
    {
      info: { inline: true },
    },
  )
  .add(
    "Intro for existing job",
    (): React.ReactElement => (
      <JobBuilderIntro job={fakeJob()} handleSubmit={action("Submit")} />
    ),
    {
      info: { inline: true },
    },
  );
