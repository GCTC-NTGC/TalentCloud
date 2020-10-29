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
import {
  ApplicationStep,
  ProgressBarStatus,
} from "../../../models/lookupConstants";

export function makeProgressBarSteps(
  applicationId: number,
  steps: { [step in ApplicationStep]: ProgressBarStatus },
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
  stepsUpdateInProgress: boolean,
): ProgressBarProps["steps"] {
  const locale = getLocale(intl.locale);
  const makeStatus = (step: ApplicationStep): ProgressBarStatus => {
    // eslint-disable-next-line no-nested-ternary
    return step === currentStep
      ? "current"
      : steps[step] === "error" && stepsUpdateInProgress
      ? "default"
      : steps[step];
  };
  return [
    {
      link: {
        url: applicationBasic(locale, applicationId),
        text: intl.formatMessage(stepNames.step01),
        title: intl.formatMessage(stepNames.step01),
      },
      status: makeStatus("basic"),
    },
    {
      link: {
        url: applicationExperienceIntro(locale, applicationId),
        text: intl.formatMessage(stepNames.step02),
        title: intl.formatMessage(stepNames.step02),
      },
      status: makeStatus("experience"),
    },
    {
      link: {
        url: applicationSkillsIntro(locale, applicationId),
        text: intl.formatMessage(stepNames.step03),
        title: intl.formatMessage(stepNames.step03),
      },
      status: makeStatus("skills"),
    },
    {
      link: {
        url: applicationFit(locale, applicationId),
        text: intl.formatMessage(stepNames.step04),
        title: intl.formatMessage(stepNames.step04),
      },
      status: makeStatus("fit"),
    },
    {
      link: {
        url: applicationReview(locale, applicationId),
        text: intl.formatMessage(stepNames.step05),
        title: intl.formatMessage(stepNames.step05),
      },
      status: makeStatus("review"),
    },
    {
      link: {
        url: applicationSubmission(locale, applicationId),
        text: intl.formatMessage(stepNames.step06),
        title: intl.formatMessage(stepNames.step06),
      },
      status: makeStatus("submission"),
    },
  ];
}

export default makeProgressBarSteps;
