/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import ReactDOM from "react-dom";
import { Routes } from "universal-router";
import { defineMessages, useIntl } from "react-intl";
import { useRouter, RouterResult } from "../../helpers/router";
import AssessmentPlanContainer from "./AssessmentPlanContainer";
import RootContainer from "../RootContainer";

if (document.getElementById("assessment-plan-root")) {
  const container = document.getElementById("assessment-plan-root");
  if (container !== null) {
    if ("jobId" in container.dataset) {
      const jobId = Number(container.dataset.jobId as string);
      ReactDOM.render(
        <RootContainer>
          <AssessmentPlanContainer jobId={jobId} />
        </RootContainer>,
        container,
      );
    }
  }
}
