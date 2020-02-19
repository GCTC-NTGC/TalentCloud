/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import ReactDOM from "react-dom";
import AssessmentPlanContainer from "./AssessmentPlanContainer";
import RootContainer from "../RootContainer";
import { Portal } from "../../models/app";

if (document.getElementById("assessment-plan-root")) {
  const container = document.getElementById("assessment-plan-root");
  if (container !== null) {
    if ("jobId" in container.dataset) {
      const jobId = Number(container.dataset.jobId as string);
      const portal: Portal = container.dataset.portal as Portal;
      ReactDOM.render(
        <RootContainer>
          <AssessmentPlanContainer jobId={jobId} portal={portal} />
        </RootContainer>,
        container,
      );
    }
  }
}
