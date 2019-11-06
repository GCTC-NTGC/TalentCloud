/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { defineMessages, useIntl } from "react-intl";
import { useRouter, RouterResult } from "../../helpers/router";
import AssessmentPlanContainer from "./AssessmentPlanContainer";
import RootContainer from "../RootContainer";

const titles = defineMessages({
  assessmentPlanTitle: {
    id: "assessmentPlan.title",
    defaultMessage: "Assessment Plan Builder",
    description: "The document's title shown in browser's title bar or tab.",
  },
});

const routes: Routes<{}, RouterResult> = [
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

const Route: React.FunctionComponent = () => {
  const intl = useIntl();
  const match = useRouter(routes, intl);

  return <>{match}</>;
};

const AssessmentPlanRoot = (): React.ReactElement | null => {
  return (
    <RootContainer>
      <Route />
    </RootContainer>
  );
};

if (document.getElementById("assessment-plan-root")) {
  const root = document.getElementById("assessment-plan-root");
  ReactDOM.render(<AssessmentPlanRoot />, root);
}
