/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { defineMessages, useIntl } from "react-intl";
import { useRouter, RouterResult } from "../../helpers/router";
import RootContainer from "../RootContainer";
import JobIntroPage from "./Intro/JobIntroPage";
import JobDetailsPage from "./Details/JobDetailsPage";
import JobBuilderWorkEnvPage from "./WorkEnv/WorkEnvPage";
import JobBuilderImpactPage from "./Impact/JobBuilderImpactPage";
import JobTasksPage from "./Tasks/JobTasksPage";
import JobSkillsPage from "./Skills/JobBuilderSkillsPage";
import JobReviewPage from "./Review/JobReviewPage";
import ScrollToTop from "../ScrollToTop";
import RedirectPage from "./RedirectToLastIncompleteStep";

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
              component: <JobBuilderWorkEnvPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/impact",
            action: ({ params }) => ({
              title: titles.impactTitle,
              component: <JobBuilderImpactPage jobId={Number(params.id)} />,
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

const Route: React.FunctionComponent = () => {
  const intl = useIntl();
  const match = useRouter(routes, intl);
  const tracker: HTMLElement | null = document.getElementById(
    "job-builder-root",
  );
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
