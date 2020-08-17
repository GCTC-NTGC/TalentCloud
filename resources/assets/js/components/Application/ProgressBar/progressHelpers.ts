import { IntlShape } from "react-intl";
import { Application } from "../../../models/types";
import {
  ProgressBarProps,
  stepNames,
  ProgressBarStepStatus,
} from "./ProgressBar";

function basicInfoStatus(application: Application): ProgressBarStepStatus {
  // TODO: implement.
  return "default";
}
function experienceStatus(application: Application): ProgressBarStepStatus {
  // TODO: implement.
  return "default";
}
function skillsStatus(application: Application): ProgressBarStepStatus {
  // TODO: implement.
  return "default";
}
function myFitStatus(application: Application): ProgressBarStepStatus {
  // TODO: implement.
  return "default";
}
function reviewStatus(application: Application): ProgressBarStepStatus {
  // TODO: implement.
  return "default";
}
function submissionStatus(application: Application): ProgressBarStepStatus {
  // TODO: implement.
  return "default";
}

export function makeProgressBarSteps(
  application: Application,
  intl: IntlShape,
): ProgressBarProps["steps"] {
  return [
    {
      link: {
        url: "/",
        text: intl.formatMessage(stepNames.step01),
        title: intl.formatMessage(stepNames.step01),
      },
      status: basicInfoStatus(application),
    },
    {
      link: {
        url: "/",
        text: intl.formatMessage(stepNames.step02),
        title: intl.formatMessage(stepNames.step02),
      },
      status: experienceStatus(application),
    },
    {
      link: {
        url: "/",
        text: intl.formatMessage(stepNames.step03),
        title: intl.formatMessage(stepNames.step03),
      },
      status: skillsStatus(application),
    },
    {
      link: {
        url: "/",
        text: intl.formatMessage(stepNames.step04),
        title: intl.formatMessage(stepNames.step04),
      },
      status: myFitStatus(application),
    },
    {
      link: {
        url: "/",
        text: intl.formatMessage(stepNames.step05),
        title: intl.formatMessage(stepNames.step05),
      },
      status: reviewStatus(application),
    },
    {
      link: {
        url: "/",
        text: intl.formatMessage(stepNames.step06),
        title: intl.formatMessage(stepNames.step06),
      },
      status: submissionStatus(application),
    },
  ];
}

export default makeProgressBarSteps;
