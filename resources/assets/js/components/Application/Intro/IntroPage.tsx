/* eslint-disable camelcase */
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import Intro from "./Intro";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import { fakeApplication } from "../../../fakeData/fakeApplications";
import { navigate } from "../../../helpers/router";
import { getLocale } from "../../../helpers/localize";
import { applicationBasic } from "../../../helpers/routes";
import { DispatchType } from "../../../configureStore";
import {
  useApplication,
  useFetchAllApplicationData,
  useJob,
} from "../../../hooks/applicationHooks";

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

  const handleContinue = (): void =>
    navigate(applicationBasic(locale, applicationId));
  const closeDate = job?.close_date_time ?? null;
  return (
    <>
      {application !== null && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.welcome)}
          steps={makeProgressBarSteps(
            applicationId,
            application,
            intl,
            "other",
          )}
        />
      )}
      <Intro handleStart={handleContinue} />
    </>
  );
};

export default IntroPage;
