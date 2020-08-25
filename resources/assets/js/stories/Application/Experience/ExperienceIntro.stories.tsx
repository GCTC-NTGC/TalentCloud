import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withIntl } from "storybook-addon-intl";
import ExperienceIntro from "../../../components/Application/Experience/ExperienceIntro";

const stories = storiesOf("Application|Experience Intro", module).addDecorator(
  withIntl,
);

stories.add(
  "Experience Intro Page",
  (): React.ReactElement => (
    <ExperienceIntro handleStart={action("Continue to Experience Step")} />
  ),
);
