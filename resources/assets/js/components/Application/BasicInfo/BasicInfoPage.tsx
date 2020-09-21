/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import BasicInfo from "./BasicInfo";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationIndex,
  applicationExperienceIntro,
  applicationWelcome,
} from "../../../helpers/routes";
import { Job, ApplicationNormalized } from "../../../models/types";
import { DispatchType } from "../../../configureStore";
import { RootState } from "../../../store/store";
import {
  getApplicationNormalized,
  getApplicationIsUpdating,
} from "../../../store/Application/applicationSelector";
import {
  updateApplication as updateApplicationAction,
  fetchApplicationNormalized,
} from "../../../store/Application/applicationActions";
import { fetchJob } from "../../../store/Job/jobActions";
import { getJob, getJobIsUpdating } from "../../../store/Job/jobSelector";
import { loadingMessages } from "../applicationMessages";

interface BasicInfoPageProps {
  applicationId: number;
}

const BasicInfoPage: React.FunctionComponent<BasicInfoPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  // Load Application.
  const applicationSelector = (
    state: RootState,
  ): ApplicationNormalized | null =>
    getApplicationNormalized(state, { applicationId });
  const application: ApplicationNormalized | null = useSelector(
    applicationSelector,
  );
  const applicationIsUpdating = useSelector((state: RootState) =>
    getApplicationIsUpdating(state, { applicationId }),
  );

  useEffect(() => {
    if (application === null && !applicationIsUpdating) {
      dispatch(fetchApplicationNormalized(applicationId));
    }
  }, [dispatch, applicationId, application, applicationIsUpdating]);

  // Load Job.
  const jobId = application?.job_poster_id;
  const jobSelector = (state: RootState): Job | null =>
    jobId ? getJob(state, { jobId }) : null;
  const job = useSelector(jobSelector);
  const jobUpdatingSelector = (state: RootState): boolean =>
    jobId ? getJobIsUpdating(state, jobId) : false;
  const jobIsUpdating = useSelector(jobUpdatingSelector);

  useEffect(() => {
    // If job is null and not already updating, fetch it.
    if (jobId && job === null && !jobIsUpdating) {
      dispatch(fetchJob(jobId));
    }
  }, [jobId, job, jobIsUpdating, dispatch]);

  const updateApplication = async (
    editedApplication: ApplicationNormalized,
  ): Promise<ApplicationNormalized> => {
    const result = await dispatch(updateApplicationAction(editedApplication));
    if (!result.error) {
      const payload = await result.payload;
      return payload;
    }
    return Promise.reject(result.payload);
  };

  const handleContinue = async (
    values: ApplicationNormalized,
  ): Promise<void> => {
    await updateApplication(values);
    navigate(applicationExperienceIntro(locale, applicationId));
  };
  const handleReturn = async (values: ApplicationNormalized): Promise<void> => {
    await updateApplication(values);
    navigate(applicationWelcome(locale, applicationId));
  };
  const handleQuit = async (values: ApplicationNormalized): Promise<void> => {
    await updateApplication(values);
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
          currentTitle={intl.formatMessage(stepNames.step01)}
          steps={makeProgressBarSteps(application, intl, "basic")}
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
        <BasicInfo
          application={application}
          job={job}
          handleContinue={handleContinue}
          handleReturn={handleReturn}
          handleQuit={handleQuit}
        />
      )}
    </>
  );
};

export default BasicInfoPage;
