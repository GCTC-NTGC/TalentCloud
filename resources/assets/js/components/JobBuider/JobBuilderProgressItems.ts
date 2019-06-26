import { defineMessages, FormattedMessage } from "react-intl";
import { ProgressTrackerItem } from "../ProgressTracker/types";

const labels = defineMessages({
  start: {
    id: "jobBuilder.progressTracker.label.start",
    defaultMessage: "Start",
  },
  step01: {
    id: "jobBuilder.progressTracker.label.step1",
    defaultMessage: "Step 01",
  },
  step02: {
    id: "jobBuilder.progressTracker.label.step2",
    defaultMessage: "Step 02",
  },
  step03: {
    id: "jobBuilder.progressTracker.label.step3",
    defaultMessage: "Step 03",
  },
  step04: {
    id: "jobBuilder.progressTracker.label.step4",
    defaultMessage: "Step 04",
  },
  step05: {
    id: "jobBuilder.progressTracker.label.step5",
    defaultMessage: "Step 05",
  },
  finish: {
    id: "jobBuilder.progressTracker.label.finish",
    defaultMessage: "Finish",
  },
});

const titles = defineMessages({
  welcome: {
    id: "jobBuilder.progressTracker.title.welcome",
    defaultMessage: "Welcome",
  },
  jobInfo: {
    id: "jobBuilder.progressTracker.title.jobInfo",
    defaultMessage: "Job Info",
  },
  workEnv: {
    id: "jobBuilder.progressTracker.title.workEnv",
    defaultMessage: "Work Environment",
  },
  impact: {
    id: "jobBuilder.progressTracker.title.impact",
    defaultMessage: "Impact",
  },
  tasks: {
    id: "jobBuilder.progressTracker.title.tasks",
    defaultMessage: "Tasks",
  },
  skills: {
    id: "jobBuilder.progressTracker.title.skills",
    defaultMessage: "Skills",
  },
  review: {
    id: "jobBuilder.progressTracker.title.review",
    defaultMessage: "Review",
  },
});
