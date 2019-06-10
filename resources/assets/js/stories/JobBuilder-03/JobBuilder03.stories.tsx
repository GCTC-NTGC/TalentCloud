import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import JobBuilder03 from "../../components/JobBuilder-03/JobBuilder03";
import Step3Form from "../../components/JobBuilder-03/Step3Form";

const stories = storiesOf("Job Builder - Step 03", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories
  .add("Job Builder Body", (): React.ReactElement => <JobBuilder03 />, {
    info: { inline: true },
  })
  .add("Work Environment Form", (): React.ReactElement => <Step3Form />, {
    info: { inline: true },
  });
