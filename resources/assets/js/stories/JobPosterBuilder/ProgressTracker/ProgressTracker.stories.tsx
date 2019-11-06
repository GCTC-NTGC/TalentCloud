import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import ProgressTracker from "../../../components/ProgressTracker/ProgressTracker";
import { ProgressTrackerItem } from "../../../components/ProgressTracker/types";

const items: ProgressTrackerItem[] = [
  { link: "/", state: "active", label: "Step 01", title: "Job Info" },
  { link: "/", state: "complete", label: "Step 02", title: "Work Env." },
  { link: "/", state: "error", label: "Step 03", title: "Impact" },
  { link: "/", state: "null", label: "Step 04", title: "Tasks" },
  { link: "/", state: "null", label: "Step 05", title: "Skills" },
  { link: "/", state: "null", label: "Step 05", title: "Review" },
];

const stories = storiesOf(
  "Job Poster Builder|Progress Tracker",
  module,
).addDecorator(withIntl);

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
