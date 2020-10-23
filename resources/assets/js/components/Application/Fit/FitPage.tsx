/* eslint-disable camelcase */
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationIndex,
  applicationReview,
  applicationSkills,
} from "../../../helpers/routes";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import Fit from "./Fit";
import { JobApplicationAnswer } from "../../../models/types";
import {
  fetchApplication,
  touchApplicationStep,
} from "../../../store/Application/applicationActions";
import {
  createJobApplicationAnswer,
  updateJobApplicationAnswer,
} from "../../../store/JobApplicationAnswer/jobApplicationAnswerActions";
import { loadingMessages } from "../applicationMessages";
import {
  useApplication,
  useFetchAllApplicationData,
  useJob,
  useJobApplicationAnswers,
  useJobPosterQuestions,
  useJobApplicationSteps,
} from "../../../hooks/applicationHooks";
import { ApplicationStepId } from "../../../models/lookupConstants";

interface FitPageProps {
  applicationId: number;
}

export const FitPage: React.FunctionComponent<FitPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch();

  // Fetch all un-loaded data that may be required for the Application.
  useFetchAllApplicationData(applicationId, dispatch);

  const application = useApplication(applicationId);
  const jobId = application?.job_poster_id;
  const job = useJob(jobId);
  const jobPosterQuestions = useJobPosterQuestions(jobId);
  const answers = useJobApplicationAnswers(applicationId);
  const steps = useJobApplicationSteps();

  const handleSubmit = async (answer: JobApplicationAnswer): Promise<void> => {
    const exists = answer.id !== -1;
    const result = exists
      ? await dispatch(updateJobApplicationAnswer(answer))
      : await dispatch(createJobApplicationAnswer(answer));

    if (!result.error) {
      await dispatch(fetchApplication(applicationId));
      const payload = await result.payload;
      return payload;
    }
    return Promise.reject(result.payload);
  };

  const handleContinue = async (): Promise<void> => {
    await dispatch(
      touchApplicationStep(applicationId, ApplicationStepId.review),
    );
    navigate(applicationReview(locale, applicationId));
  };
  const handleReturn = (): void => {
    navigate(applicationSkills(locale, applicationId));
  };
  const handleQuit = (): void => {
    // Because the Applications Index is outside of the Application SPA, we navigate to it differently.
    window.location.href = applicationIndex(locale);
  };

  const closeDate = job?.close_date_time ?? null;
  const showLoadingState = application === null || job === null;
  return (
    <>
      {application !== null && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.step04)}
          steps={makeProgressBarSteps(applicationId, steps, intl, "fit")}
        />
      )}
      {showLoadingState && (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(3)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      )}
      {application !== null && job !== null && (
        <Fit
          applicationId={applicationId}
          jobQuestions={jobPosterQuestions || []}
          jobApplicationAnswers={answers || []}
          handleSubmit={handleSubmit}
          handleContinue={handleContinue}
          handleReturn={handleReturn}
          handleQuit={handleQuit}
        />
      )}
    </>
  );
};

export default FitPage;
