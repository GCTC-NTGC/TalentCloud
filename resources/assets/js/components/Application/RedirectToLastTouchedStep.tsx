import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { getLocale } from "../../helpers/localize";
import {
  useApplication,
  useFetchAllApplicationData,
  useJob,
  useJobApplicationSteps,
} from "../../hooks/applicationHooks";
import { ApplicationStep } from "../../models/lookupConstants";
import { loadingMessages } from "./applicationMessages";
import BasicInfoPage from "./BasicInfo/BasicInfoPage";
import ExperienceIntroPage from "./Experience/ExperienceIntroPage";
import ExperiencePage from "./Experience/ExperiencePage";
import FinalSubmitPage from "./FinalSubmit/FinalSubmitPage";
import FitPage from "./Fit/FitPage";
import IntroPage from "./Intro/IntroPage";
import ReviewPage from "./Review/ReviewPage";
import SkillsIntroPage from "./Skills/SkillsIntroPage";
import SkillsPage from "./Skills/SkillsPage";

interface RedirectToLastTouchedStepProps {
  applicationId: number;
  requestedStep?: ApplicationStep;
  introStep?: boolean;
}

const RedirectToLastTouchedStep: React.FunctionComponent<RedirectToLastTouchedStepProps> = ({
  applicationId,
  requestedStep,
  introStep,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch();

  useFetchAllApplicationData(applicationId, dispatch);
  const application = useApplication(applicationId);
  const job = useJob(application?.job_poster_id);
  const steps = useJobApplicationSteps();

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
        return introStep ? (
          <ExperienceIntroPage applicationId={applicationId} />
        ) : (
          <ExperiencePage applicationId={applicationId} />
        );
      case "skills":
        return introStep ? (
          <SkillsIntroPage applicationId={applicationId} />
        ) : (
          <SkillsPage applicationId={applicationId} />
        );
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
    // If the step requested in the has been touched, then return to step.
    if (
      requestedStep &&
      (steps[requestedStep] === "complete" || steps[requestedStep] === "error")
    ) {
      return getStepComponent(requestedStep);
    }

    // Iterate through steps, and return the last touched step.
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
