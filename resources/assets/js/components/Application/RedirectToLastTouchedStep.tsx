import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { getLocale } from "../../helpers/localize";
import { redirect } from "../../helpers/router";
import {
  applicationBasic,
  applicationExperience,
  applicationFit,
  applicationReview,
  applicationSkills,
  applicationSubmission,
  applicationWelcome,
} from "../../helpers/routes";
import {
  useApplication,
  useFetchAllApplicationData,
  useFetchNormalizedApplication,
  useJob,
  useSteps,
} from "../../hooks/applicationHooks";
import {
  ApplicationStepId,
  ApplicationStep,
} from "../../models/lookupConstants";
import { loadingMessages } from "./applicationMessages";
import BasicInfoPage from "./BasicInfo/BasicInfoPage";
import ExperiencePage from "./Experience/ExperiencePage";
import FinalSubmitPage from "./FinalSubmit/FinalSubmitPage";
import FitPage from "./Fit/FitPage";
import IntroPage from "./Intro/IntroPage";
import ReviewPage from "./Review/ReviewPage";
import SkillsPage from "./Skills/SkillsPage";

interface RedirectToLastTouchedStepProps {
  applicationId: number;
}

const RedirectToLastTouchedStep: React.FunctionComponent<RedirectToLastTouchedStepProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch();

  useFetchAllApplicationData(applicationId, dispatch);
  const application = useApplication(applicationId);
  const job = useJob(application?.job_poster_id);
  const steps = useSteps();

  const stepOrder: ApplicationStep[] = [
    "basic",
    "experience",
    "skills",
    "fit",
    "review",
    "submission",
  ];

  const getStepComponent = (step: ApplicationStep | null) => {
    switch (step) {
      case "basic":
        return <BasicInfoPage applicationId={applicationId} />;
      case "experience":
        return <ExperiencePage applicationId={applicationId} />;
      case "skills":
        return <SkillsPage applicationId={applicationId} />;
      case "fit":
        return <FitPage applicationId={applicationId} />;
      case "review":
        return <ReviewPage applicationId={applicationId} />;
      case "submission":
        return <FinalSubmitPage applicationId={applicationId} />;
      default:
        return <IntroPage applicationId={applicationId} />;
    }
  };

  const lastTouchedStep = (): React.ReactElement => {
    const reversedStepOrder = stepOrder.reverse();
    for (let i = 0; i <= reversedStepOrder.length; i += 1) {
      const step = reversedStepOrder[i];
      if (steps[step] === "complete" || steps[step] === "error") {
        return getStepComponent(step);
      }
    }
    return getStepComponent(null);
  };

  const showLoadingState = application === null || job === null;
  return (
    <>
      {showLoadingState && (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(3)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      )}
      {application !== null &&
        job !== null &&
        steps !== null &&
        lastTouchedStep()}
    </>
  );
};

export default RedirectToLastTouchedStep;
