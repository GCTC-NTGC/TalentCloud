import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { useIntl, defineMessages } from "react-intl";
import RootContainer from "../RootContainer";
import { RouterResult, useRouter, Link } from "../../helpers/router";
import IntroPage from "./Intro/IntroPage";
import ScrollToTop from "../ScrollToTop";
import BasicInfoPage from "./BasicInfo/BasicInfoPage";
import { applicationWelcome } from "../../helpers/routes";
import { Locales } from "../../helpers/localize";
import ExperienceIntroPage from "./Experience/ExperienceIntroPage";
import ExperiencePage from "./Experience/ExperiencePage";
import SkillsPage from "./Skills/SkillsPage";
import FitPage from "./Fit/FitPage";
import ReviewPage from "./Review/ReviewPage";
import FinalSubmitPage from "./FinalSubmit/FinalSubmitPage";
import SkillsIntroPage from "./Skills/SkillsIntroPage";

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
          component: <BasicInfoPage applicationId={Number(params.id)} />,
        }),
      },
      {
        path: "/experience-intro",
        action: ({ params }) => ({
          title: pageTitles.experienceIntroTitle,
          component: <ExperienceIntroPage applicationId={Number(params.id)} />,
        }),
      },
      {
        path: "/experience",
        action: ({ params }) => ({
          title: pageTitles.experienceTitle,
          component: <ExperiencePage applicationId={Number(params.id)} />,
        }),
      },
      {
        path: "/skills-intro",
        action: ({ params }) => ({
          title: pageTitles.skillsIntroTitle,
          component: <SkillsIntroPage applicationId={Number(params.id)} />,
        }),
      },
      {
        path: "/skills",
        action: ({ params }) => ({
          title: pageTitles.skillsTitle,
          component: <SkillsPage applicationId={Number(params.id)} />,
        }),
      },
      {
        path: "/fit",
        action: ({ params }) => ({
          title: pageTitles.fitTitle,
          component: <FitPage applicationId={Number(params.id)} />,
        }),
      },
      {
        path: "/review",
        action: ({ params }) => ({
          title: pageTitles.reviewTitle,
          component: <ReviewPage applicationId={Number(params.id)} />,
        }),
      },
      {
        path: "/submission",
        action: ({ params }) => ({
          title: pageTitles.submissionTitle,
          component: <FinalSubmitPage applicationId={Number(params.id)} />,
        }),
      },
      {
        // Redirect any unmatched url to Welcome step.
        path: "(.*)",
        action: ({ params }) => ({
          title: pageTitles.welcomeTitle,
          component: <div />,
          redirect: applicationWelcome(
            params.locale as Locales,
            Number(params.id),
          ),
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
