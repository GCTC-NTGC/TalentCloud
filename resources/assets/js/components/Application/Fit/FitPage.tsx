import React from "react";
import { useIntl } from "react-intl";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationIndex,
  applicationExperienceIntro,
  applicationWelcome,
  applicationReview,
  applicationSkills,
} from "../../../helpers/routes";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { fakeApplication } from "../../../fakeData/fakeApplications";
import fakeJob, {
  fakeJobQuestions,
  fakeJobApplicationAnswers,
} from "../../../fakeData/fakeJob";
import Fit from "./Fit";
import { JobApplicationAnswer } from "../../../models/types";

interface FitPageProps {
  applicationId: number;
}

export const FitPage: React.FunctionComponent<FitPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const application = fakeApplication(); // TODO: get real application.
  const job = fakeJob(); // TODO: Get real job associated with application.
  const questions = fakeJobQuestions(); // TODO: get questions from job.
  const answers = fakeJobApplicationAnswers(); // TODO: get answers currently saved to application.

  const handleSubmit = async (answer: JobApplicationAnswer): Promise<void> => {
    // TODO: save answer.
  };

  const handleContinue = (): void => {
    navigate(applicationReview(locale, applicationId));
  };
  const handleReturn = (): void => {
    navigate(applicationSkills(locale, applicationId));
  };
  const handleQuit = (): void => {
    // Because the Applications Index is outside of the Application SPA, we navigate to it differently.
    window.location.href = applicationIndex(locale);
  };
  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.step01)}
        steps={makeProgressBarSteps(application, intl, "fit")}
      />
      <Fit
        jobQuestions={questions}
        jobApplicationAnswers={answers}
        handleSubmit={handleSubmit}
        handleContinue={handleContinue}
        handleReturn={handleReturn}
        handleQuit={handleQuit}
      />
    </>
  );
};

export default FitPage;
