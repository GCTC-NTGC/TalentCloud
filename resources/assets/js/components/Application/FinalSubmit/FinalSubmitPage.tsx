/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationIndex,
  applicationNextSteps,
  applicationReview,
} from "../../../helpers/routes";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { Application, ApplicationNormalized } from "../../../models/types";
import FinalSubmit from "./FinalSubmit";
import {
  useApplication,
  useFetchAllApplicationData,
  useJob,
  useJobApplicationSteps,
} from "../../../hooks/applicationHooks";
import { updateApplication } from "../../../store/Application/applicationActions";
import { loadingMessages } from "../applicationMessages";

interface FinalSubmitPageProps {
  applicationId: number;
}

export const FinalSubmitPage: React.FunctionComponent<FinalSubmitPageProps> = ({
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
  const steps = useJobApplicationSteps();

  const handleSubmit = async (
    completeApplication: ApplicationNormalized,
  ): Promise<void> => {
    await updateApplication(completeApplication);
    // Because the Applications Index is outside of the Application SPA, we navigate to it differently.
    window.location.href = applicationNextSteps(locale, applicationId);
  };
  const handleReturn = (): void => {
    navigate(applicationReview(locale, applicationId));
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
          currentTitle={intl.formatMessage(stepNames.step06)}
          steps={makeProgressBarSteps(applicationId, steps, intl, "submission")}
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
        <FinalSubmit
          application={application}
          submitApplication={handleSubmit}
          handleReturn={handleReturn}
          handleQuit={handleQuit}
        />
      )}
    </>
  );
};

export default FinalSubmitPage;
