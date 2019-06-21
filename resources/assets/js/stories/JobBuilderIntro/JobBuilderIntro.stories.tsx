import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withIntl } from "storybook-addon-intl";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import JobBuilderIntro from "../../components/JobBuilderIntro/JobBuilderIntro";

const stories = storiesOf("Job Builder - Intro", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withIntl);

stories.add(
  "Intro Body",
  (): React.ReactElement => <JobBuilderIntro handleSubmit={action("Submit")} />,
  {
    info: { inline: true },
  },
);
