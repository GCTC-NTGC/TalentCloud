import React from "react";
import { storiesOf } from "@storybook/react";
import { text, select } from "@storybook/addon-knobs";
import ProgressTrackerItem from "../../../components/ProgressTracker/ProgressTrackerItem";
import ProgressTracker from "../../../components/ProgressTracker/ProgressTracker";

const ProgressTrackerWrapper = (
  children: React.ReactElement,
): React.ReactElement => {
  return (
    <ProgressTracker
      backgroundColor={text("Background Color", "white")}
      itemsWrapperClassNames="tracker"
    >
      {children}
    </ProgressTracker>
  );
};

const stories = storiesOf("Job Poster Builder|Progress Tracker/Item", module);

const trackerStateOptions: {
  [key: string]: "active" | "complete" | "error" | "null";
} = {
  active: "active",
  complte: "complete",
  error: "error",
  null: "null",
};

stories.add(
  "Active",
  (): React.ReactElement =>
    ProgressTrackerWrapper(
      <ProgressTrackerItem
        state={select("State", trackerStateOptions, "active")}
        label={text("Label", "Step 01")}
        title={text("Title", "Job Info")}
        fontColor={text("Font Color", "black")}
      />,
    ),
);

stories.add(
  "Complete",
  (): React.ReactElement =>
    ProgressTrackerWrapper(
      <ProgressTrackerItem
        state={select("State", trackerStateOptions, "active")}
        label={text("Label", "Step 02")}
        title={text("Title", "Work Env.")}
        fontColor={text("Font Color", "black")}
      />,
    ),
);

stories.add(
  "Error",
  (): React.ReactElement =>
    ProgressTrackerWrapper(
      <ProgressTrackerItem
        state={select("State", trackerStateOptions, "active")}
        label={text("Label", "Step 03")}
        title={text("Title", "impact")}
        fontColor={text("Font Color", "black")}
      />,
    ),
);

stories.add(
  "Null",
  (): React.ReactElement =>
    ProgressTrackerWrapper(
      <ProgressTrackerItem
        state={select("State", trackerStateOptions, "active")}
        label={text("Label", "Step 04")}
        title={text("Title", "Tasks")}
        fontColor={text("Font Color", "black")}
      />,
    ),
);
