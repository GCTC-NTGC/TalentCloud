import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { date, text } from "@storybook/addon-knobs";
import { ProgressBar } from "../../components/Application/ProgressBar/ProgressBar";
import { Link } from "../../models/app";
import { ProgressBarStatus } from "../../models/lookupConstants";

const steps: { link: Link; status: ProgressBarStatus; loading: boolean }[] = [
  {
    link: { url: "/", text: "Step 1", title: "Step 1" },
    status: "complete",
    loading: false,
  },
  {
    link: { url: "/", text: "Step 2", title: "Step 2" },
    status: "error",
    loading: false,
  },
  {
    link: { url: "/", text: "Step 3", title: "Step 3" },
    status: "current",
    loading: false,
  },
  {
    link: { url: "/", text: "Step 4", title: "Step 4" },
    status: "default",
    loading: false,
  },
  {
    link: { url: "/", text: "Step 5", title: "Step 5" },
    status: "default",
    loading: false,
  },
  {
    link: { url: "/", text: "Step 6", title: "Step 6" },
    status: "default",
    loading: false,
  },
];

const twoWeeksFromNow = new Date();
twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

const stories = storiesOf("Application/Progress Bar", module).addDecorator(
  withIntl,
);

function myDateKnob(name, defaultValue) {
  const stringTimestamp = date(name, defaultValue);
  return new Date(stringTimestamp);
}
stories.add(
  "Progress Bar",
  (): React.ReactElement => (
    <ProgressBar
      closeDateTime={myDateKnob("Application Deadline", twoWeeksFromNow)}
      currentTitle={text("Current Title", "Step 3/6")}
      steps={steps}
    />
  ),
);
