/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
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
import {
  JobApplicationAnswer,
  ApplicationNormalized,
  Job,
  JobPosterQuestion,
} from "../../../models/types";
import { RootState } from "../../../store/store";
import {
  getApplicationNormalized,
  getApplicationIsUpdating,
  getJobApplicationAnswers,
} from "../../../store/Application/applicationSelector";
import {
  getJob,
  getJobPosterQuestionsByJob,
  getJobIsUpdating,
} from "../../../store/Job/jobSelector";
import { fetchJob } from "../../../store/Job/jobActions";
import { fetchApplicationNormalized } from "../../../store/Application/applicationActions";
import {
  createJobApplicationAnswer,
  updateJobApplicationAnswer,
} from "../../../store/JobApplicationAnswer/jobApplicationAnswerActions";
import { loadingMessages } from "../applicationMessages";

interface FitPageProps {
  applicationId: number;
}

export const FitPage: React.FunctionComponent<FitPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch();

  // Load application.
  const applicationSelector = (
    state: RootState,
  ): ApplicationNormalized | null =>
    getApplicationNormalized(state, { applicationId });
  const application = useSelector(applicationSelector);
  const applicationUpdatingSelector = (state: RootState): boolean =>
    getApplicationIsUpdating(state, { applicationId });
  const applicationIsUpdating = useSelector(applicationUpdatingSelector);
  useEffect(() => {
    if (application === null && !applicationIsUpdating) {
      dispatch(fetchApplicationNormalized(applicationId));
    }
  }, [applicationId, application, applicationIsUpdating, dispatch]);

  // Load job.
  const jobId = application?.job_poster_id;
  const jobSelector = (state: RootState): Job | null =>
    jobId ? getJob(state, { jobId }) : null;
  const job = useSelector(jobSelector);
  const jobUpdatingSelector = (state: RootState): boolean =>
    jobId ? getJobIsUpdating(state, jobId) : false;
  const jobIsUpdating = useSelector(jobUpdatingSelector);

  useEffect(() => {
    if (jobId && job === null && !jobIsUpdating) {
      dispatch(fetchJob(jobId));
    }
  }, [jobId, job, jobIsUpdating, dispatch]);

  // Get job poster questions.
  const jobPosterQuestionsSelector = (
    state: RootState,
  ): JobPosterQuestion[] | null =>
    jobId ? getJobPosterQuestionsByJob(state, { jobId }) : null;
  const jobPosterQuestions = useSelector(jobPosterQuestionsSelector);

  // Get job application answers.
  const jobApplicationAnswersSelector = (
    state: RootState,
  ): JobApplicationAnswer[] | null => getJobApplicationAnswers(state);
  const answers = useSelector(jobApplicationAnswersSelector);

  const handleSubmit = async (answer: JobApplicationAnswer): Promise<void> => {
    const exists = answer.id !== -1;
    const result = exists
      ? await dispatch(updateJobApplicationAnswer(answer))
      : await dispatch(createJobApplicationAnswer(answer));

    if (!result.error) {
      await dispatch(fetchApplicationNormalized(applicationId));
      const payload = await result.payload;
      return payload;
    }
    return Promise.reject(result.payload);
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

  // TODO: If the close_date_time is ever null it should show an error message (talk tristan).
  const closeDate = job?.close_date_time ?? null;
  const showLoadingState = application === null || job === null;
  return (
    <>
      {application !== null && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.step04)}
          steps={makeProgressBarSteps(applicationId, application, intl, "fit")}
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
