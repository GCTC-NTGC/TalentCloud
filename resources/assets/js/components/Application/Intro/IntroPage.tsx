/* eslint-disable camelcase */
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useEffect } from "@storybook/addons";
import Intro from "./Intro";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import { navigate } from "../../../helpers/router";
import { getLocale } from "../../../helpers/localize";
import { applicationBasic } from "../../../helpers/routes";
import { DispatchType } from "../../../configureStore";
import {
  useApplication,
  useFetchAllApplicationData,
  useJob,
  useJobApplicationSteps,
} from "../../../hooks/applicationHooks";
import { touchApplicationStep } from "../../../store/Application/applicationActions";
import { ApplicationStepId } from "../../../models/lookupConstants";
import { loadingMessages } from "../applicationMessages";

interface IntroPageProps {
  applicationId: number;
}

export const IntroPage: React.FunctionComponent<IntroPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  // Fetch all un-loaded data that may be required for the Application.
  useFetchAllApplicationData(applicationId, dispatch);

  const application = useApplication(applicationId);
  const job = useJob(application?.job_poster_id);
  const steps = useJobApplicationSteps();

  const handleContinue = async (): Promise<void> => {
    await dispatch(
      touchApplicationStep(applicationId, ApplicationStepId.basic),
    );
    return navigate(applicationBasic(locale, applicationId));
  };
  const closeDate = job?.close_date_time ?? null;
  const showLoadingState = application === null || job === null;
  return (
    <>
      {application !== null && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.welcome)}
          steps={makeProgressBarSteps(applicationId, steps, intl, "other")}
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
        <Intro handleStart={handleContinue} />
      )}
    </>
  );
};

export default IntroPage;
