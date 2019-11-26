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
  JobBuilderPage,
} from "./jobBuilderHelpers";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import {
  jobBuilderIntro,
  jobBuilderDetails,
  jobBuilderEnv,
  jobBuilderImpact,
  jobBuilderTasks,
  jobBuilderSkills,
  jobBuilderReview,
} from "../../helpers/routes";

interface JobBuilderProgressTrackerProps {
  job: Job | null;
  jobId: number | null;
  tasks: JobPosterKeyTask[];
  criteria: Criteria[];
  dataIsLoading: boolean;
  currentPage: JobBuilderPage | null;
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
  currentPage: JobBuilderPage | null,
  referencePage: JobBuilderPage,
): boolean => {
  if (currentPage === null) {
    return true;
  }
  const comesBefore = pageOrder[currentPage] < pageOrder[referencePage];
  return comesBefore;
};

export const JobBuilderProgressTracker: React.FunctionComponent<JobBuilderProgressTrackerProps &
  WrappedComponentProps> = ({
  job,
  jobId,
  tasks,
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
  if (currentPage) {
    pageStates[currentPage] = "active";
  }
  const progressTrackerItems: ProgressTrackerItem[] = [
    {
      link: jobBuilderIntro(locale, jobId || undefined),
      state: pageStates.intro,
      label: intl.formatMessage(progressTrackerLabels.start),
      title: intl.formatMessage(progressTrackerTitles.welcome),
    },
    {
      link: jobId ? jobBuilderDetails(locale, jobId) : "",
      state: pageStates.details,
      label: intl.formatMessage(progressTrackerLabels.step01),
      title: intl.formatMessage(progressTrackerTitles.jobInfo),
    },
    {
      link: jobId ? jobBuilderEnv(locale, jobId) : "",
      state: pageStates.env,
      label: intl.formatMessage(progressTrackerLabels.step02),
      title: intl.formatMessage(progressTrackerTitles.workEnv),
    },
    {
      link: jobId ? jobBuilderImpact(locale, jobId) : "",
      state: pageStates.impact,
      label: intl.formatMessage(progressTrackerLabels.step03),
      title: intl.formatMessage(progressTrackerTitles.impact),
    },
    {
      link: jobId ? jobBuilderTasks(locale, jobId) : "",
      state: pageStates.tasks,
      label: intl.formatMessage(progressTrackerLabels.step04),
      title: intl.formatMessage(progressTrackerTitles.tasks),
    },
    {
      link: jobId ? jobBuilderSkills(locale, jobId) : "",
      state: pageStates.skills,
      label: intl.formatMessage(progressTrackerLabels.step05),
      title: intl.formatMessage(progressTrackerTitles.skills),
    },
    {
      link: jobId ? jobBuilderReview(locale, jobId) : "",
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
