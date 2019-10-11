import React from "react";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Job, JobPosterKeyTask, Criteria } from "../../models/types";
import {
  ProgressTrackerItem,
  ProgressTrackerState,
} from "../ProgressTracker/types";
import {
  progressTrackerLabels,
  progressTrackerTitles,
} from "./jobBuilderMessages";
import {
  criteriaProgressState,
  jobTasksProgressState,
  jobImpactProgressState,
  jobBuilderEnvProgressState,
  jobBuilderIntroProgressState,
  jobBuilderDetailsProgressState,
} from "./jobBuilderHelpers";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { JobBuilderPage } from "./JobBuilderStep";

interface JobBuilderProgressTrackerProps {
  job: Job | null;
  tasks: JobPosterKeyTask[];
  maxTasksCount: number;
  criteria: Criteria[];
  dataIsLoading: boolean;
  currentPage: JobBuilderPage;
}

const pageOrder: { [page in JobBuilderPage]: number } = {
  intro: 0,
  details: 1,
  env: 2,
  impact: 3,
  tasks: 4,
  skills: 5,
  review: 6,
};
const stepComesBefore = (
  currentPage: JobBuilderPage,
  referencePage: JobBuilderPage,
): boolean => {
  const comesBefore = pageOrder[currentPage] < pageOrder[referencePage];
  return comesBefore;
};

export const JobBuilderProgressTracker: React.FunctionComponent<
  JobBuilderProgressTrackerProps & WrappedComponentProps
> = ({
  job,
  tasks,
  maxTasksCount,
  dataIsLoading,
  criteria,
  currentPage,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }
  const pageStates: { [page in JobBuilderPage]: ProgressTrackerState } = {
    intro: dataIsLoading
      ? "null"
      : jobBuilderIntroProgressState(
          job,
          stepComesBefore(currentPage, "intro"),
        ),
    details: dataIsLoading
      ? "null"
      : jobBuilderDetailsProgressState(
          job,
          locale,
          stepComesBefore(currentPage, "details"),
        ),
    env: dataIsLoading
      ? "null"
      : jobBuilderEnvProgressState(
          job,
          locale,
          stepComesBefore(currentPage, "env"),
        ),
    impact: dataIsLoading
      ? "null"
      : jobImpactProgressState(
          job,
          locale,
          stepComesBefore(currentPage, "impact"),
        ),
    tasks: dataIsLoading
      ? "null"
      : jobTasksProgressState(
          tasks,
          maxTasksCount,
          locale,
          stepComesBefore(currentPage, "tasks"),
        ),
    skills: dataIsLoading
      ? "null"
      : criteriaProgressState(
          criteria,
          locale,
          stepComesBefore(currentPage, "skills"),
        ),
    review: "null",
  };
  pageStates[currentPage] = "active";
  const progressTrackerItems: ProgressTrackerItem[] = [
    {
      state: pageStates.intro,
      label: intl.formatMessage(progressTrackerLabels.start),
      title: intl.formatMessage(progressTrackerTitles.welcome),
    },
    {
      state: pageStates.details,
      label: intl.formatMessage(progressTrackerLabels.step01),
      title: intl.formatMessage(progressTrackerTitles.jobInfo),
    },
    {
      state: pageStates.env,
      label: intl.formatMessage(progressTrackerLabels.step02),
      title: intl.formatMessage(progressTrackerTitles.workEnv),
    },
    {
      state: pageStates.impact,
      label: intl.formatMessage(progressTrackerLabels.step03),
      title: intl.formatMessage(progressTrackerTitles.impact),
    },
    {
      state: pageStates.tasks,
      label: intl.formatMessage(progressTrackerLabels.step04),
      title: intl.formatMessage(progressTrackerTitles.tasks),
    },
    {
      state: pageStates.skills,
      label: intl.formatMessage(progressTrackerLabels.step05),
      title: intl.formatMessage(progressTrackerTitles.skills),
    },
    {
      state: pageStates.review,
      label: intl.formatMessage(progressTrackerLabels.finish),
      title: intl.formatMessage(progressTrackerTitles.review),
    },
  ];
  return (
    <ProgressTracker
      items={progressTrackerItems}
      backgroundColor="black"
      fontColor="white"
      classNames="manager-jpb-tracker"
      itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
      dataIsLoading={dataIsLoading}
    />
  );
};

export default injectIntl(JobBuilderProgressTracker);
