import React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
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
} from "./jobBuilderHelpers";
import ProgressTracker from "../ProgressTracker/ProgressTracker";

type JobBuilderPage =
  | "intro"
  | "details"
  | "env"
  | "impact"
  | "tasks"
  | "skills"
  | "review";

interface JobBuilderProgressTrackerProps {
  job: Job | null;
  tasks: JobPosterKeyTask[];
  maxTasksCount: number;
  criteria: Criteria[];
  dataIsLoading: boolean;
  currentPage: JobBuilderPage;
}

export const JobBuilderProgressTracker: React.FunctionComponent<
  JobBuilderProgressTrackerProps & InjectedIntlProps
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
    intro: dataIsLoading ? "null" : jobBuilderIntroProgressState(job),
    details: dataIsLoading ? "null" : jobBuilderIntroProgressState(job),
    env: dataIsLoading ? "null" : jobBuilderEnvProgressState(job, locale),
    impact: dataIsLoading ? "null" : jobImpactProgressState(job, locale),
    tasks: dataIsLoading
      ? "null"
      : jobTasksProgressState(tasks, maxTasksCount, locale),
    skills: dataIsLoading ? "null" : criteriaProgressState(criteria, locale),
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
    />
  );
};

export default injectIntl(JobBuilderProgressTracker);
