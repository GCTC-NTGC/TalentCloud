import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withIntl } from "storybook-addon-intl";
import ApplicationIntro from "../../components/Application/Intro/Intro";

const stories = storiesOf("Application|Intro", module).addDecorator(withIntl);

stories.add(
  "Intro Page",
  (): React.ReactElement => (
    <ApplicationIntro handleStart={action("Start Clicked")} />
  ),
);
