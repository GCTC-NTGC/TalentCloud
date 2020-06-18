import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { number, object, text } from "@storybook/addon-knobs";
import ProgressBar, {
  ProgressBarStepStatus,
} from "../../components/Application/ProgressBar/ProgressBar";
import { Link } from "../../models/app";

const steps: { link: Link; status: ProgressBarStepStatus }[] = [
  {
    link: { url: "/", text: "Step 1", title: text("step 1", "Step 1") },
    status: "default",
  },
  { link: { url: "/", text: "Step 2", title: "Step 2" }, status: "default" },
  { link: { url: "/", text: "Step 3", title: "Step 3" }, status: "default" },
  { link: { url: "/", text: "Step 4", title: "Step 4" }, status: "default" },
  { link: { url: "/", text: "Step 5", title: "Step 5" }, status: "default" },
  { link: { url: "/", text: "Step 6", title: "Step 6" }, status: "default" },
];

const twoWeeksFromNow = new Date();
twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

const stories = storiesOf("Application|Progress Bar", module).addDecorator(
  withIntl,
);

stories.add(
  "Tracker",
  (): React.ReactElement => (
    <ProgressBar
      closeDateTime={twoWeeksFromNow}
      stepNumber={number("Step Number", 1)}
      steps={steps}
    />
  ),
);
