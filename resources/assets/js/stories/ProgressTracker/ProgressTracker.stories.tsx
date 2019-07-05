import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
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

const stories = storiesOf("Job Poster Builder|Progress Tracker", module);

stories.add(
  "Tracker",
  (): React.ReactElement => (
    <ProgressTracker
      items={items}
      backgroundColor={text("Background Color", "black")}
      fontColor={text("Font Color", "white")}
      classNames="manager-jpb-tracker"
      itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
    />
  ),
);
