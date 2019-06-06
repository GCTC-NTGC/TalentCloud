import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import JobBuilderImpact from "../../components/JobBuilderImpact/JobBuilderImpact";

const stories = storiesOf("Job Builder - Impact", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  "Job Builder Impact",
  (): React.ReactElement => <JobBuilderImpact />,
  {
    info: { inline: true },
  },
);
