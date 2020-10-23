/* eslint-disable camelcase */
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { getLocale } from "../../../helpers/localize";
import { applicationExperience } from "../../../helpers/routes";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { navigate } from "../../../helpers/router";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ExperienceIntro from "./ExperienceIntro";
import { DispatchType } from "../../../configureStore";
import { loadingMessages } from "../applicationMessages";
import {
  useApplication,
  useFetchAllApplicationData,
  useJob,
  useJobApplicationSteps,
} from "../../../hooks/applicationHooks";

interface ExperienceIntroPageProps {
  applicationId: number;
}

export const ExperienceIntroPage: React.FunctionComponent<ExperienceIntroPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  // Fetch all un-loaded data that may be required for the Application.
  useFetchAllApplicationData(applicationId, dispatch);

  const application = useApplication(applicationId);
  const jobId = application?.job_poster_id;
  const job = useJob(jobId);
  const steps = useJobApplicationSteps();

  const handleStart = (): void =>
    navigate(applicationExperience(locale, applicationId));
  const closeDate = job?.close_date_time ?? null;
  return application === null ? (
    <h2
      data-c-heading="h2"
      data-c-align="center"
      data-c-padding="top(2) bottom(2)"
    >
      {intl.formatMessage(loadingMessages.loading)}
    </h2>
  ) : (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.step02)}
        steps={makeProgressBarSteps(applicationId, steps, intl, "experience")}
      />
      <ExperienceIntro handleStart={handleStart} />
    </>
  );
};

export default ExperienceIntroPage;
