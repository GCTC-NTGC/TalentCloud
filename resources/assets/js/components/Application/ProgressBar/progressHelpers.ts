import { IntlShape } from "react-intl";
import { ProgressBarProps, stepNames } from "./ProgressBar";
import {
  applicationBasic,
  applicationExperienceIntro,
  applicationFit,
  applicationReview,
  applicationSubmission,
  applicationSkillsIntro,
} from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";
import { ProgressBarStatus } from "../../../models/lookupConstants";

export function makeProgressBarSteps(
  applicationId: number,
  steps: { [key in string]: ProgressBarStatus },
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
      status: currentStep === "basic" ? "current" : steps.basic,
    },
    {
      link: {
        url: applicationExperienceIntro(locale, applicationId),
        text: intl.formatMessage(stepNames.step02),
        title: intl.formatMessage(stepNames.step02),
      },
      status: currentStep === "experience" ? "current" : steps.experience,
    },
    {
      link: {
        url: applicationSkillsIntro(locale, applicationId),
        text: intl.formatMessage(stepNames.step03),
        title: intl.formatMessage(stepNames.step03),
      },
      status: currentStep === "skills" ? "current" : steps.skills,
    },
    {
      link: {
        url: applicationFit(locale, applicationId),
        text: intl.formatMessage(stepNames.step04),
        title: intl.formatMessage(stepNames.step04),
      },
      status: currentStep === "fit" ? "current" : steps.fit,
    },
    {
      link: {
        url: applicationReview(locale, applicationId),
        text: intl.formatMessage(stepNames.step05),
        title: intl.formatMessage(stepNames.step05),
      },
      status: currentStep === "review" ? "current" : steps.review,
    },
    {
      link: {
        url: applicationSubmission(locale, applicationId),
        text: intl.formatMessage(stepNames.step06),
        title: intl.formatMessage(stepNames.step06),
      },
      status: currentStep === "submission" ? "current" : steps.submission,
    },
  ];
}

export default makeProgressBarSteps;
