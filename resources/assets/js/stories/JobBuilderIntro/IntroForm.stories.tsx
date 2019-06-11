import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import IntroForm from "../../components/JobBuilderIntro/IntroForm";

const stories = storiesOf("Job Builder - Step 01", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add("Form", (): React.ReactElement => <IntroForm />, {
  info: { inline: true },
});
