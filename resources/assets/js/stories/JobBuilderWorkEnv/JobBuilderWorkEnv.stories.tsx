import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import JobBuilderWorkEnv from "../../components/JobBuilderWorkEnv/JobBuilderWorkEnv";
import WorkEnvForm from "../../components/JobBuilderWorkEnv/WorkEnvForm";

const stories = storiesOf("Job Builder - Work Environment", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories
  .add("Job Builder Body", (): React.ReactElement => <JobBuilderWorkEnv />, {
    info: { inline: true },
  })
  .add("Work Environment Form", (): React.ReactElement => <WorkEnvForm />, {
    info: { inline: true },
  });
