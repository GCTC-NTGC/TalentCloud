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
    return step === currentStep ? "current" : steps[step];
  };
  const isLoading = (step: ApplicationStep): boolean => {
    return steps[step] !== "default" && stepsUpdateInProgress;
  };

  return [
    {
      link: {
        url: applicationBasic(locale, applicationId),
        text: intl.formatMessage(stepNames.step01),
        title: intl.formatMessage(stepNames.step01),
      },
      status: makeStatus("basic"),
      loading: isLoading("basic"),
    },
    {
      link: {
        url: applicationExperienceIntro(locale, applicationId),
        text: intl.formatMessage(stepNames.step02),
        title: intl.formatMessage(stepNames.step02),
      },
      status: makeStatus("experience"),
      loading: isLoading("experience"),
    },
    {
      link: {
        url: applicationSkillsIntro(locale, applicationId),
        text: intl.formatMessage(stepNames.step03),
        title: intl.formatMessage(stepNames.step03),
      },
      status: makeStatus("skills"),
      loading: isLoading("skills"),
    },
    {
      link: {
        url: applicationFit(locale, applicationId),
        text: intl.formatMessage(stepNames.step04),
        title: intl.formatMessage(stepNames.step04),
      },
      status: makeStatus("fit"),
      loading: isLoading("fit"),
    },
    {
      link: {
        url: applicationReview(locale, applicationId),
        text: intl.formatMessage(stepNames.step05),
        title: intl.formatMessage(stepNames.step05),
      },
      status: makeStatus("review"),
      loading: isLoading("review"),
    },
    {
      link: {
        url: applicationSubmission(locale, applicationId),
        text: intl.formatMessage(stepNames.step06),
        title: intl.formatMessage(stepNames.step06),
      },
      status: makeStatus("submission"),
      loading: isLoading("submission"),
    },
  ];
}

export default makeProgressBarSteps;
