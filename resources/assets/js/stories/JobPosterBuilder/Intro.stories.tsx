import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import JobBuilderIntro from "../../components/JobBuilderIntro/JobBuilderIntro";

const stories = storiesOf("Job Poster Builder|Intro", module).addDecorator(
  withIntl,
);

stories.add(
  "Body",
  (): React.ReactElement => <JobBuilderIntro handleSubmit={action("Submit")} />,
);
