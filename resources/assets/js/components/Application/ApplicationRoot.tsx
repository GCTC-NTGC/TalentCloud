import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { useIntl, defineMessages } from "react-intl";
import RootContainer from "../RootContainer";
import { RouterResult, useRouter } from "../../helpers/router";
import IntroPage from "./Intro/IntroPage";

const pageTitles = defineMessages({
  welcomeTitle: {
    id: "application.welcome.documentTitle",
    defaultMessage: "Application: Welcome", // TODO: Get page title from designs.
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
    ],
  },
];

const ApplicationRoot: React.FunctionComponent = () => {
  const intl = useIntl();
  const match = useRouter(routes, intl);
  // const tracker: HTMLElement | null = document.getElementById(
  //   "job-builder-root",
  // );

  // const trackerOffsetTop: number = tracker ? tracker.offsetTop : 0;

  // return (
  //   <ScrollToTop offsetTop={trackerOffsetTop} scrollBehaviorAuto>
  //     {match}
  //   </ScrollToTop>
  // );

  return match;
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
