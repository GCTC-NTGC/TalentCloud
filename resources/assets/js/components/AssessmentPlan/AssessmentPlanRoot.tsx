/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { defineMessages } from "react-intl";
import { UseRouter } from "../../helpers/router";
import AssessmentPlanContainer from "./AssessmentPlanContainer";
import RootContainer from "../RootContainer";

const titles = defineMessages({
  assessmentPlanTitle: {
    id: "assessmentPlan.title",
    defaultMessage: "Assessment Plan Builder",
    description: "The document's title shown in browser's title bar or tab.",
  },
});

const routes: Routes<any, any> = [
  {
    path: "/:locale/manager/jobs",
    children: [
      {
        path: "/:id/assessment-plan",
        action: ({ params }) => ({
          title: titles.assessmentPlanTitle,
          component: <AssessmentPlanContainer jobId={Number(params.id)} />,
        }),
      },
    ],
  },
];

const AssessmentPlanRoot = (): React.ReactElement | null => {
  const match = <UseRouter routes={routes} />;
  return <RootContainer>{match}</RootContainer>;
};

if (document.getElementById("assessment-plan-root")) {
  const root = document.getElementById("assessment-plan-root");
  ReactDOM.render(<AssessmentPlanRoot />, root);
}
