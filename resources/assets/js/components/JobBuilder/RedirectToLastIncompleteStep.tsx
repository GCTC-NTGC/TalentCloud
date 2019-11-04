import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { Job, JobPosterKeyTask, Criteria } from "../../models/types";
import {
  criteriaProgressState,
  jobTasksProgressState,
  jobImpactProgressState,
  jobBuilderEnvProgressState,
  jobBuilderIntroProgressState,
  jobBuilderDetailsProgressState,
  JobBuilderPage,
  VALID_COUNT,
  pageToUrlBuilder,
} from "./jobBuilderHelpers";
import { ProgressTrackerState } from "../ProgressTracker/types";
import { RootState } from "../../store/store";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
  getJobIsUpdating,
  getTasksForJobIsUpdating,
  getCriteriaForJobIsUpdating,
} from "../../store/Job/jobSelector";
import JobBuilderStepContainer from "./JobBuilderStep";
import { redirect } from "../../helpers/router";

interface RedirectToLastIncompleteStepProps {
  jobId: number;
  job: Job | null;
  jobIsLoading: boolean;
  tasks: JobPosterKeyTask[];
  maxTasksCount: number;
  tasksIsLoading: boolean;
  criteria: Criteria[];
  criteriaIsLoading: boolean;
  handleRedirect: (url: string) => void;
}

export type PageStates = {
  [page in JobBuilderPage]: () => ProgressTrackerState;
};

/**
 * Return the first "error" page (ie incomplete page) without any "null" pages (ie still loading) preceding it.
 * If loading pages precede any incomplete pages, return null.
 * @param pageStates
 * @param pageOrder
 */
export const firstIncompletePage = (
  pageStates: PageStates,
  pageOrder: JobBuilderPage[],
): JobBuilderPage | null => {
  if (pageOrder.length === 0) {
    return null;
  }
  const page = pageOrder[0];
  const state = pageStates[page]();
  if (state === "null") {
    return null;
  }
  if (state === "error") {
    return page;
  }
  return firstIncompletePage(pageStates, pageOrder.slice(1));
};

export const RedirectToLastIncompleteStep: React.FunctionComponent<
  RedirectToLastIncompleteStepProps
> = ({
  jobId,
  job,
  jobIsLoading,
  tasks,
  maxTasksCount,
  tasksIsLoading,
  criteria,
  criteriaIsLoading,
  handleRedirect,
}): React.ReactElement | null => {
  const intl = useIntl();

  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }

  const pageStates: PageStates = {
    intro: () =>
      jobIsLoading ? "null" : jobBuilderIntroProgressState(job, false),
    details: () =>
      jobIsLoading
        ? "null"
        : jobBuilderDetailsProgressState(job, locale, false),
    env: () =>
      jobIsLoading ? "null" : jobBuilderEnvProgressState(job, locale, false),
    impact: () =>
      jobIsLoading ? "null" : jobImpactProgressState(job, locale, false),
    tasks: () =>
      tasksIsLoading
        ? "null"
        : jobTasksProgressState(tasks, maxTasksCount, locale, false),
    skills: () =>
      criteriaIsLoading
        ? "null"
        : criteriaProgressState(criteria, locale, false),
    review: () => "error",
  };
  // This is necessary because browsers do not guarantee object attribute order will be maintained (such as in pageStates)
  const pageOrder: JobBuilderPage[] = [
    "intro",
    "details",
    "env",
    "impact",
    "tasks",
    "skills",
    "review",
  ];

  const returnToPage = firstIncompletePage(pageStates, pageOrder);
  useEffect((): void => {
    if (returnToPage) {
      const url = pageToUrlBuilder(returnToPage)(locale, jobId);
      handleRedirect(url);
    }
  }, [returnToPage, handleRedirect, locale, jobId]);

  return null;
};

const mapStateToProps = (
  state: RootState,
  { jobId }: { jobId: number },
): {
  job: Job | null;
  jobIsLoading: boolean;
  tasks: JobPosterKeyTask[];
  tasksIsLoading: boolean;
  criteria: Criteria[];
  criteriaIsLoading: boolean;
} => {
  const job = getJob(state, { jobId });
  // for isLoading args, check that job is not null, becuase job must have loaded at least once for us to trust results.
  return {
    job,
    jobIsLoading: getJobIsUpdating(state, jobId) || job === null,
    tasks: getTasksByJob(state, { jobId }),
    tasksIsLoading: getTasksForJobIsUpdating(state, jobId) || job === null,
    criteria: getCriteriaByJob(state, { jobId }),
    criteriaIsLoading:
      getCriteriaForJobIsUpdating(state, jobId) || job === null,
  };
};

export const RedirectToLastIncompleteStepConnected = connect(mapStateToProps)(
  RedirectToLastIncompleteStep,
);

export const RedirectPage: React.FC<{ jobId: number }> = ({ jobId }) => {
  return (
    <JobBuilderStepContainer jobId={jobId} currentPage={null} forceIsLoading>
      <RedirectToLastIncompleteStepConnected
        jobId={jobId}
        maxTasksCount={VALID_COUNT}
        handleRedirect={redirect}
      />
    </JobBuilderStepContainer>
  );
};

export default RedirectPage;
