/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { useRouter } from "../../helpers/router";
import AssessmentPlanContainer from "./AssessmentPlanContainer";
import RootContainer from "../RootContainer";

const routes: Routes<any, React.ReactElement> = [
  {
    path: "/:locale/manager/jobs",
    children: [
      {
        path: "/:id/assessment-plan",
        action: ({ params }) => (
          <AssessmentPlanContainer jobId={Number(params.id)} />
        ),
      },
    ],
  },
];

const AssessmentPlanRoot = (): React.ReactElement | null => {
  const match = useRouter(routes);
  return <RootContainer>{match}</RootContainer>;
};

if (document.getElementById("assessment-plan-root")) {
  const root = document.getElementById("assessment-plan-root");
  ReactDOM.render(<AssessmentPlanRoot />, root);
}
