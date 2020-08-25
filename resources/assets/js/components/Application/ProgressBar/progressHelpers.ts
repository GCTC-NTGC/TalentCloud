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
        url: applicationBasic(locale, application.id),
        text: intl.formatMessage(stepNames.step01),
        title: intl.formatMessage(stepNames.step01),
      },
      status:
        currentStep === "basic" ? "current" : basicInfoStatus(application),
    },
    {
      link: {
        url: applicationExperienceIntro(locale, application.id),
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
        url: applicationSkills(locale, application.id),
        text: intl.formatMessage(stepNames.step03),
        title: intl.formatMessage(stepNames.step03),
      },
      status: currentStep === "skills" ? "current" : skillsStatus(application),
    },
    {
      link: {
        url: applicationFit(locale, application.id),
        text: intl.formatMessage(stepNames.step04),
        title: intl.formatMessage(stepNames.step04),
      },
      status: currentStep === "fit" ? "current" : myFitStatus(application),
    },
    {
      link: {
        url: applicationReview(locale, application.id),
        text: intl.formatMessage(stepNames.step05),
        title: intl.formatMessage(stepNames.step05),
      },
      status: currentStep === "review" ? "current" : reviewStatus(application),
    },
    {
      link: {
        url: applicationSubmission(locale, application.id),
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
