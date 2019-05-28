import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ProgressTracker from "../../components/ProgressTracker/ProgressTracker";
import { ProgressTrackerItem } from "../../components/ProgressTracker/types";

const items: ProgressTrackerItem[] = [
  { state: "active", label: "Step 01", title: "Job Info" },
  { state: "complete", label: "Step 02", title: "Work Env." },
  { state: "error", label: "Step 03", title: "Impact" },
  { state: "null", label: "Step 04", title: "Tasks" },
  { state: "null", label: "Step 05", title: "Skills" },
  { state: "null", label: "Step 05", title: "Review" },
];

const stories = storiesOf("ProgressTracker", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  "Progress Tracker",
  (): React.ReactElement => (
    <ProgressTracker
      items={items}
      backgroundColor="black"
      fontColor="white"
      classNames="manager-jpb-tracker"
      itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
    />
  ),
  { info: { inline: true } },
);
