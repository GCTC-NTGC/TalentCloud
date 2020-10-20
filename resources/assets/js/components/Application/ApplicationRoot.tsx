import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { useIntl, defineMessages } from "react-intl";
import RootContainer from "../RootContainer";
import { RouterResult, useRouter } from "../../helpers/router";
import IntroPage from "./Intro/IntroPage";
import ScrollToTop from "../ScrollToTop";
import RedirectStep from "./RedirectToLastTouchedStep";

const pageTitles = defineMessages({
  welcomeTitle: {
    id: "application.welcome.documentTitle",
    defaultMessage: "Apply: Welcome", // TODO: Get page title from designs.
    description: "The document's title shown in browser's title bar or tab.",
  },
  basicTitle: {
    id: "application.basic.documentTitle",
    defaultMessage: "Apply: My Basic Information", // TODO: Get page title from designs.
    description: "The document's title shown in browser's title bar or tab.",
  },
  experienceIntroTitle: {
    id: "application.experienceIntro.documentTitle",
    defaultMessage: "Apply: Defining Your Experience", // TODO: Get page title from designs.
    description: "The document's title shown in browser's title bar or tab.",
  },
  experienceTitle: {
    id: "application.experience.documentTitle",
    defaultMessage: "Apply: Experience",
    description: "The document's title shown in browser's title bar or tab.",
  },
  skillsIntroTitle: {
    id: "application.skillsIntro.documentTitle",
    defaultMessage: "Apply: Understanding Skills",
    description: "The document's title shown in browser's title bar or tab.",
  },
  skillsTitle: {
    id: "application.skills.documentTitle",
    defaultMessage: "Apply: Skills",
    description: "The document's title shown in browser's title bar or tab.",
  },
  fitTitle: {
    id: "application.fit.documentTitle",
    defaultMessage: "Apply: Application Questions",
    description: "The document's title shown in browser's title bar or tab.",
  },
  reviewTitle: {
    id: "application.review.documentTitle",
    defaultMessage: "Apply: Review Your Application",
    description: "The document's title shown in browser's title bar or tab.",
  },
  submissionTitle: {
    id: "application.submission.documentTitle",
    defaultMessage: "Apply: Submit",
    description: "The document's title shown in browser's title bar or tab.",
  },
});

const routes: Routes<{}, RouterResult> = [
  {
    path: "/:locale/demo/applications/:id", // TODO: remove demo from url.
    children: [
      {
        path: "/welcome",
        action: ({ params }) => ({
          title: pageTitles.welcomeTitle,
          component: <IntroPage applicationId={Number(params.id)} />,
        }),
      },
      {
        path: "/basic",
        action: ({ params }) => ({
          title: pageTitles.basicTitle,
          component: (
            <RedirectStep
              applicationId={Number(params.id)}
              requestedStep="basic"
            />
          ),
        }),
      },
      {
        path: "/experience-intro",
        action: ({ params }) => ({
          title: pageTitles.experienceIntroTitle,
          component: (
            <RedirectStep
              applicationId={Number(params.id)}
              requestedStep="experience"
              introStep
            />
          ),
        }),
      },
      {
        path: "/experience",
        action: ({ params }) => ({
          title: pageTitles.experienceTitle,
          component: (
            <RedirectStep
              applicationId={Number(params.id)}
              requestedStep="experience"
            />
          ),
        }),
      },
      {
        path: "/skills-intro",
        action: ({ params }) => ({
          title: pageTitles.skillsIntroTitle,
          component: (
            <RedirectStep
              applicationId={Number(params.id)}
              requestedStep="skills"
              introStep
            />
          ),
        }),
      },
      {
        path: "/skills",
        action: ({ params }) => ({
          title: pageTitles.skillsTitle,
          component: (
            <RedirectStep
              applicationId={Number(params.id)}
              requestedStep="skills"
            />
          ),
        }),
      },
      {
        path: "/fit",
        action: ({ params }) => ({
          title: pageTitles.fitTitle,
          component: (
            <RedirectStep
              applicationId={Number(params.id)}
              requestedStep="fit"
            />
          ),
        }),
      },
      {
        path: "/review",
        action: ({ params }) => ({
          title: pageTitles.reviewTitle,
          component: (
            <RedirectStep
              applicationId={Number(params.id)}
              requestedStep="review"
            />
          ),
        }),
      },
      {
        path: "/submission",
        action: ({ params }) => ({
          title: pageTitles.submissionTitle,
          component: (
            <RedirectStep
              applicationId={Number(params.id)}
              requestedStep="submission"
            />
          ),
        }),
      },
      {
        // Redirect any unmatched url to Welcome step.
        path: "(.*)",
        action: ({ params }) => ({
          title: pageTitles.welcomeTitle,
          component: <RedirectStep applicationId={Number(params.id)} />,
        }),
      },
    ],
  },
];

const ApplicationRoot: React.FunctionComponent = () => {
  const intl = useIntl();
  const match = useRouter(routes, intl);
  const tracker: HTMLElement | null = document.getElementById(
    "application-root",
  );
  const trackerOffsetTop: number = tracker ? tracker.offsetTop : 0;

  return (
    <ScrollToTop offsetTop={trackerOffsetTop} scrollBehaviorAuto>
      {match}
    </ScrollToTop>
  );
};

if (document.getElementById("application-root")) {
  const root = document.getElementById("application-root");
  ReactDOM.render(
    <RootContainer>
      <ApplicationRoot />
    </RootContainer>,
    root,
  );
}
