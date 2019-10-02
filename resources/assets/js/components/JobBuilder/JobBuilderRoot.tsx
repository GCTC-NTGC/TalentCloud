/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { defineMessages, FormattedMessage } from "react-intl";
import { useRouter } from "../../helpers/router";
import JobBuilderIntroPageContainer from "../JobBuilderIntro/JobBuilderIntro";
import RootContainer from "../RootContainer";
import JobDetailsPage from "../JobDetails/JobDetailsPage";
import JobBuilderWorkEnvPage from "../JobBuilderWorkEnv/JobBuilderWorkEnv";
import JobBuilderImpactPage from "../JobBuilderImpact/JobBuilderImpactPage";
import JobTasksPage from "../JobTasks/JobTasksPage";
import JobSkillsPage from "../JobBuilderSkills/JobBuilderSkillsPage";
import JobReviewPage from "../JobReview/JobReviewPage";
import ScrollToTop from "../ScrollToTop";

const titles = defineMessages({
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

const routes: Routes<any, any> = [
  {
    path: "/:locale/manager/jobs",
    children: [
      {
        path: "/builder",
        action: () => ({
          title: <FormattedMessage {...titles.introTitle} />,
          component: <JobBuilderIntroPageContainer jobId={null} />,
        }),
      },
      {
        path: "/:id/builder",
        children: [
          {
            path: "/intro",
            action: ({ params }) => ({
              title: <FormattedMessage {...titles.introTitle} />,
              component: (
                <JobBuilderIntroPageContainer jobId={Number(params.id)} />
              ),
            }),
          },
          {
            path: "/details",
            action: ({ params }) => ({
              title: <FormattedMessage {...titles.detailsTitle} />,
              component: <JobDetailsPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/environment",
            action: ({ params }) => ({
              title: <FormattedMessage {...titles.workEnvTitle} />,
              component: <JobBuilderWorkEnvPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/impact",
            action: ({ params }) => ({
              title: <FormattedMessage {...titles.impactTitle} />,
              component: <JobBuilderImpactPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/tasks",
            action: ({ params }) => ({
              title: <FormattedMessage {...titles.tasksTitle} />,
              component: <JobTasksPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/skills",
            action: ({ params }) => ({
              title: <FormattedMessage {...titles.skillsTitle} />,
              component: <JobSkillsPage jobId={Number(params.id)} />,
            }),
          },
          {
            path: "/review",
            action: ({ params }) => ({
              title: <FormattedMessage {...titles.reviewTitle} />,
              component: <JobReviewPage jobId={Number(params.id)} />,
            }),
          },
        ],
      },
    ],
  },
];

const JobBuilderRoot = (): React.ReactElement | null => {
  const match = useRouter(routes);
  const tracker: HTMLElement | null = document.getElementById(
    "job-builder-root",
  );
  const trackerOffsetTop: number = tracker ? tracker.offsetTop : 0;
  return (
    <RootContainer>
      <ScrollToTop offsetTop={trackerOffsetTop} scrollBehaviorAuto>
        {match}
      </ScrollToTop>
    </RootContainer>
  );
};

if (document.getElementById("job-builder-root")) {
  const root = document.getElementById("job-builder-root");
  ReactDOM.render(<JobBuilderRoot />, root);
}
