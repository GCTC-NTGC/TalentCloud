import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { text, select } from "@storybook/addon-knobs";
import ProgressTrackerItem from "../../../components/ProgressTracker/ProgressTrackerItem";
import ProgressTracker from "../../../components/ProgressTracker/ProgressTracker";

const ProgressTrackerWrapper = (
  children: React.ReactElement,
): React.ReactElement => {
  return (
    <ProgressTracker
      backgroundColor={text("Background Color", "white")}
      fontColor={text("Font Color", "white")}
      classNames="manager-jpb-tracker"
      itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
    >
      {children}
    </ProgressTracker>
  );
};

const stories = storiesOf(
  "Job Poster Builder|Progress Tracker/Item",
  module,
).addDecorator(withIntl);

const trackerStateOptions: {
  [key: string]: "active" | "complete" | "error" | "null";
} = {
  active: "active",
  complete: "complete",
  error: "error",
  null: "null",
};

stories.add(
  "Active",
  (): React.ReactElement =>
    ProgressTrackerWrapper(
      <ProgressTrackerItem
        link="/"
        state={select("State", trackerStateOptions, "active")}
        label={text("Label", "Step 01")}
        title={text("Title", "Job Info")}
        fontColor={text("Font Color", "black")}
        dataIsLoading
      />,
    ),
);

stories.add(
  "Complete",
  (): React.ReactElement =>
    ProgressTrackerWrapper(
      <ProgressTrackerItem
        link="/"
        state={select("State", trackerStateOptions, "complete")}
        label={text("Label", "Step 02")}
        title={text("Title", "Work Env.")}
        fontColor={text("Font Color", "black")}
        dataIsLoading={false}
      />,
    ),
);

stories.add(
  "Error",
  (): React.ReactElement =>
    ProgressTrackerWrapper(
      <ProgressTrackerItem
        link="/"
        state={select("State", trackerStateOptions, "error")}
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
        link="/"
        state={select("State", trackerStateOptions, "null")}
        label={text("Label", "Step 04")}
        title={text("Title", "Tasks")}
        fontColor={text("Font Color", "black")}
      />,
    ),
);
