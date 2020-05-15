/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { defineMessages, useIntl, IntlShape } from "react-intl";
import { useRouter, RouterResult } from "../../helpers/router";
import JobIntroPage from "./Intro/JobIntroPage";
import RootContainer from "../RootContainer";
import JobDetailsPage from "./Details/JobDetailsPage";
import JobWorkEnvPage from "./WorkEnv/JobWorkEnvPage";
import JobImpactPage from "./Impact/JobImpactPage";
import JobTasksPage from "./Tasks/JobTasksPage";
import JobSkillsPage from "./Skills/JobSkillsPage";
import JobReviewPage from "./Review/JobReviewPage";
import ScrollToTop from "../ScrollToTop";
import RedirectPage from "./RedirectToLastIncompleteStep";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getSelectedJob } from "../../store/Job/jobSelector";
import { Job } from "../../models/types";
import { managerJobSummary } from "../../helpers/routes";
import { getLocale, localizeField } from "../../helpers/localize";
import { messages } from "../HRPortal/JobIndexHrPage";

const titles = defineMessages({
  rootTitle: {
    id: "jobBuilder.root.documentTitle",
    defaultMessage: "Job Builder",
    description: "The document's title shown in browser's title bar or tab.",
  },
  introTitle: {
    id: "jobBuilder.intro.documentTitle",
    defaultMessage: "Job Builder: Intro",
    description: "The document's title shown in browser's title bar or tab.",
  },
  detailsTitle: {
    id: "jobBuilder.details.documentTitle",
    defaultMessage: "Job Builder: Details",
    description: "The document's title shown in browser's title bar or tab.",
  },
  workEnvTitle: {
    id: "jobBuilder.workEnv.documentTitle",
    defaultMessage: "Job Builder: Work Environment",
    description: "The document's title shown in browser's title bar or tab.",
  },
  impactTitle: {
    id: "jobBuilder.impact.documentTitle",
    defaultMessage: "Job Builder: Impact",
    description: "The document's title shown in browser's title bar or tab.",
  },
  tasksTitle: {
    id: "jobBuilder.tasks.documentTitle",
    defaultMessage: "Job Builder: Tasks",
    description: "The document's title shown in browser's title bar or tab.",
  },
  skillsTitle: {
    id: "jobBuilder.skills.documentTitle",
    defaultMessage: "Job Builder: Skills",
    description: "The document's title shown in browser's title bar or tab.",
  },
  reviewTitle: {
    id: "jobBuilder.review.documentTitle",
    defaultMessage: "Job Builder: Review",
    description: "The document's title shown in browser's title bar or tab.",
  },
});

const routes: Routes<{}, RouterResult> = [
  {
    path: "/:locale/manager/jobs",
    children: [
      {
        path: "/builder",
        action: () => ({
          title: titles.introTitle,
          component: <JobIntroPage jobId={null} />,
        }),
      },
      {
        path: "/:id/builder",
        children: [
          {
            path: "",
            action: ({ params }) => ({
              title: titles.rootTitle,
              component: <RedirectPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/intro",
            action: ({ params }) => ({
              title: titles.introTitle,
              component: <JobIntroPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/details",
            action: ({ params }) => ({
              title: titles.detailsTitle,
              component: <JobDetailsPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/environment",
            action: ({ params }) => ({
              title: titles.workEnvTitle,
              component: <JobWorkEnvPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/impact",
            action: ({ params }) => ({
              title: titles.impactTitle,
              component: <JobImpactPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/tasks",
            action: ({ params }) => ({
              title: titles.tasksTitle,
              component: <JobTasksPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/skills",
            action: ({ params }) => ({
              title: titles.skillsTitle,
              component: <JobSkillsPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/review",
            action: ({ params }) => ({
              title: titles.reviewTitle,
              component: <JobReviewPage jobId={Number(params.id)} />,
            }),
          },
        ],
      },
    ],
  },
];

const useJobBreadcrumbs = (intl: IntlShape) => {
  const locale = getLocale(intl.locale);
  const job = useSelector((state: RootState) => getSelectedJob(state));
  const jobBreadcrumbId = "job-title-breadcrumb";

  const addJobBreadcrumb = (jobBreadcrumb: Job): void => {
    const breadcrumbs: HTMLOListElement | null = document.querySelector(
      "#jpb-breadcrumbs",
    );
    const breadcrumb: HTMLLIElement = document.createElement("li");
    const anchor = document.createElement("a");
    const icon = document.createElement("i");

    anchor.id = jobBreadcrumbId;
    anchor.href = managerJobSummary(locale, jobBreadcrumb.id);
    anchor.innerText =
      localizeField(locale, jobBreadcrumb, "title") ||
      `{ ${intl.formatMessage(messages.titleMissing)} }`;

    icon.classList.add("fas", "fa-caret-right");
    breadcrumb.append(anchor);
    breadcrumb.append(icon);

    if (breadcrumbs) {
      const lastBreadcrumb = breadcrumbs.lastElementChild;
      breadcrumbs.insertBefore(breadcrumb, lastBreadcrumb);
    }
  };

  const jobBreadcrumb: HTMLAnchorElement | null = document.querySelector(
    `#${jobBreadcrumbId}`,
  );

  useEffect(() => {
    if (job) {
      if (jobBreadcrumb) {
        jobBreadcrumb.href = managerJobSummary(locale, job.id);
        jobBreadcrumb.innerText =
          localizeField(locale, job, "title") ||
          `{ ${intl.formatMessage(messages.titleMissing)} }`;
      } else {
        addJobBreadcrumb(job);
      }
    }
  }, [
    job,
    jobBreadcrumb,
    locale,
    messages,
    managerJobSummary,
    addJobBreadcrumb,
  ]);
};

const Route: React.FunctionComponent = () => {
  const intl = useIntl();
  const match = useRouter(routes, intl);
  const tracker: HTMLElement | null = document.getElementById(
    "job-builder-root",
  );

  // Dynamically update the breadcrumbs on step changes
  useJobBreadcrumbs(intl);

  const trackerOffsetTop: number = tracker ? tracker.offsetTop : 0;

  return (
    <ScrollToTop offsetTop={trackerOffsetTop} scrollBehaviorAuto>
      {match}
    </ScrollToTop>
  );
};

const JobBuilderRoot: React.FunctionComponent | null = () => {
  return (
    <RootContainer>
      <Route />
    </RootContainer>
  );
};

if (document.getElementById("job-builder-root")) {
  const root = document.getElementById("job-builder-root");
  ReactDOM.render(<JobBuilderRoot />, root);
}
