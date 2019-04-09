import React from "react";
import ReactDOM from "react-dom";
import AssessmentPlan from "./AssessmentPlan";
import { Job } from "./types";

interface AssessmentPlanContainerProps {
  job: Job;
}

const AssessmentPlanContainer: React.FunctionComponent<
  AssessmentPlanContainerProps
> = ({ job }: AssessmentPlanContainerProps): React.ReactElement => {
  return <AssessmentPlan job={job} />;
};

if (document.getElementById("assessment-plan-container")) {
  const container = document.getElementById(
    "assessment-plan-container"
  ) as HTMLElement;
  if (container.hasAttribute("data-job")) {
    const job = JSON.parse(container.getAttribute("data-job") as string);
    ReactDOM.render(<AssessmentPlanContainer job={job} />, container);
  }
}

export default AssessmentPlanContainer;
