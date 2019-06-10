import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import Step3Form from "../../components/JobBuilder-03/Step3Form";

const stories = storiesOf("Job Builder - Step 03", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

// stories.add(
//   "Work Environment Form",
//   (): React.ReactElement => (
//     <Step3Form initPhysicalEnv={{ open_concept: true, physEnv1: true }} />
//   ),
//   {
//     info: { inline: true },
//   },
// );
