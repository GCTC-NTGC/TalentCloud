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
  useFetchApplication,
  useFetchExperience,
  useFetchExperienceConstants,
  useFetchJob,
  useFetchSkills,
} from "../applicationHooks";

interface ExperienceIntroPageProps {
  applicationId: number;
}

export const ExperienceIntroPage: React.FunctionComponent<ExperienceIntroPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  // Begin fetching all the data which will be used on the Experience page.
  const dispatch = useDispatch<DispatchType>();

  const application = useFetchApplication(applicationId, dispatch);
  const jobId = application?.job_poster_id;
  const job = useFetchJob(jobId, dispatch);
  useFetchExperience(applicationId, application, dispatch);
  useFetchSkills(dispatch);
  useFetchExperienceConstants(dispatch);

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
        steps={makeProgressBarSteps(
          applicationId,
          application,
          intl,
          "experience",
        )}
      />
      <ExperienceIntro handleStart={handleStart} />
    </>
  );
};

export default ExperienceIntroPage;
