import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { Job, JobPosterKeyTask, Criteria } from "../../models/types";
import {
  criteriaProgressState,
  jobTasksProgressState,
  jobImpactProgressState,
  jobBuilderEnvProgressState,
  jobBuilderIntroProgressState,
  jobBuilderDetailsProgressState,
  JobBuilderPage,
} from "./jobBuilderHelpers";
import { ProgressTrackerState } from "../ProgressTracker/types";

interface RedirectToLastIncompleteStepProps {
  job: Job | null;
  jobIsLoading: boolean;
  tasks: JobPosterKeyTask[];
  maxTasksCount: number;
  tasksIsLoading: boolean;
  criteria: Criteria[];
  criteriaIsLoading: boolean;
  redirect: (url: string) => void;
}

export type PageStates = {
  [page in JobBuilderPage]: () => ProgressTrackerState
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
  for (const page of pageOrder) {
    const state = pageStates[page]();
    if (state === "null") {
      return null;
    } else if (state === "error") {
      return page;
    }
  }
  return null;
};

const RedirectToLastIncompleteStep: React.FunctionComponent<
  RedirectToLastIncompleteStepProps
> = ({
  job,
  jobIsLoading,
  tasks,
  maxTasksCount,
  tasksIsLoading,
  criteria,
  criteriaIsLoading,
  redirect,
}): React.ReactElement => {
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
      redirect(returnToPage);
    }
  }, [returnToPage, redirect]);

  return (
    <div>
      <p>Loading your job...</p>
    </div>
  );
};

export default RedirectToLastIncompleteStep;
