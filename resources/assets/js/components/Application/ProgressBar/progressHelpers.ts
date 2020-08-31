import { IntlShape } from "react-intl";
import { Application } from "../../../models/types";
import {
  ProgressBarProps,
  stepNames,
  ProgressBarStepStatus,
} from "./ProgressBar";
import {
  applicationBasic,
  applicationExperienceIntro,
  applicationSkills,
  applicationFit,
  applicationReview,
  applicationSubmission,
} from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";

function basicInfoStatus(
  application: Application | null,
): ProgressBarStepStatus {
  if (application === null) {
    return "default";
  }
  // TODO: implement.
  return "complete";
}
function experienceStatus(
  application: Application | null,
): ProgressBarStepStatus {
  if (application === null) {
    return "default";
  }
  // TODO: implement.
  return "complete";
}
function skillsStatus(application: Application | null): ProgressBarStepStatus {
  if (application === null) {
    return "default";
  }
  // TODO: implement.
  return "complete";
}
function myFitStatus(application: Application | null): ProgressBarStepStatus {
  if (application === null) {
    return "default";
  }
  // TODO: implement.
  return "complete";
}
function reviewStatus(application: Application | null): ProgressBarStepStatus {
  if (application === null) {
    return "default";
  }
  // TODO: implement.
  return "complete";
}
function submissionStatus(
  application: Application | null,
): ProgressBarStepStatus {
  if (application === null) {
    return "default";
  }
  // TODO: implement.
  return "complete";
}

export function makeProgressBarSteps(
  applicationId: number,
  application: Application | null,
  intl: IntlShape,
  currentStep:
    | "welcome"
    | "basic"
    | "experience"
    | "skills"
    | "fit"
    | "review"
    | "submission"
    | "other",
): ProgressBarProps["steps"] {
  const locale = getLocale(intl.locale);
  return [
    {
      link: {
        url: applicationBasic(locale, applicationId),
        text: intl.formatMessage(stepNames.step01),
        title: intl.formatMessage(stepNames.step01),
      },
      status:
        currentStep === "basic" ? "current" : basicInfoStatus(application),
    },
    {
      link: {
        url: applicationExperienceIntro(locale, applicationId),
        text: intl.formatMessage(stepNames.step02),
        title: intl.formatMessage(stepNames.step02),
      },
      status:
        currentStep === "experience"
          ? "current"
          : experienceStatus(application),
    },
    {
      link: {
        url: applicationSkills(locale, applicationId),
        text: intl.formatMessage(stepNames.step03),
        title: intl.formatMessage(stepNames.step03),
      },
      status: currentStep === "skills" ? "current" : skillsStatus(application),
    },
    {
      link: {
        url: applicationFit(locale, applicationId),
        text: intl.formatMessage(stepNames.step04),
        title: intl.formatMessage(stepNames.step04),
      },
      status: currentStep === "fit" ? "current" : myFitStatus(application),
    },
    {
      link: {
        url: applicationReview(locale, applicationId),
        text: intl.formatMessage(stepNames.step05),
        title: intl.formatMessage(stepNames.step05),
      },
      status: currentStep === "review" ? "current" : reviewStatus(application),
    },
    {
      link: {
        url: applicationSubmission(locale, applicationId),
        text: intl.formatMessage(stepNames.step06),
        title: intl.formatMessage(stepNames.step06),
      },
      status:
        currentStep === "submission"
          ? "current"
          : submissionStatus(application),
    },
  ];
}

export default makeProgressBarSteps;
