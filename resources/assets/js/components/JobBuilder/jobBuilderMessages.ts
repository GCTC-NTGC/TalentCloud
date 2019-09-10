import { defineMessages } from "react-intl";

export const progressTrackerLabels = defineMessages({
  start: {
    id: "jobBuilder.progressTracker.label.start",
    defaultMessage: "Start",
  },
  step01: {
    id: "jobBuilder.progressTracker.label.step1",
    defaultMessage: "Step 1 / 5",
  },
  step02: {
    id: "jobBuilder.progressTracker.label.step2",
    defaultMessage: "Step 2 / 5",
  },
  step03: {
    id: "jobBuilder.progressTracker.label.step3",
    defaultMessage: "Step 3 / 5",
  },
  step04: {
    id: "jobBuilder.progressTracker.label.step4",
    defaultMessage: "Step 4 / 5",
  },
  step05: {
    id: "jobBuilder.progressTracker.label.step5",
    defaultMessage: "Step 5 / 5",
  },
  finish: {
    id: "jobBuilder.progressTracker.label.finish",
    defaultMessage: "Finish",
  },
});

export const progressTrackerTitles = defineMessages({
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
    defaultMessage: "Work Env.",
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

export const jobBuilderMessages = defineMessages({
  jobLoading: {
    id: "jobBuilder.jobLoading",
    defaultMessage: "Your job is loading...",
    description:
      "Message indicating that the current job is still being loaded.",
  },
});

export default {
  progressTrackerLabels,
  progressTrackerTitles,
  jobBuilderMessages,
};
