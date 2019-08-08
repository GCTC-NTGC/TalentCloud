import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Job } from "../../models/types";
import { JobDetailsIntl } from "./JobDetails";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import {
  fetchJob,
  createJob,
  updateJob,
  setSelectedJob,
} from "../../store/Job/jobActions";
import { getSelectedJob } from "../../store/Job/jobSelector";
import RootContainer from "../RootContainer";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { ProgressTrackerItem } from "../ProgressTracker/types";
import {
  progressTrackerLabels,
  progressTrackerTitles,
  jobBuilderMessages,
} from "../JobBuilder/jobBuilderMessages";
import {
  jobBuilderIntroProgressState,
  jobBuilderEnvProgressState,
  jobImpactProgressState,
} from "../JobBuilder/jobBuilderHelpers";
import { jobBuilderEnv, jobBuilderIntro } from "../../helpers/routes";

interface JobDetailsPageProps {
  jobId: number | null;
  job: Job | null;
  loadJob: (jobId: number) => void;
  handleCreateJob: (newJob: Job) => Promise<boolean>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
}

const JobDetailsPage: React.FunctionComponent<
  JobDetailsPageProps & InjectedIntlProps
> = ({
  jobId,
  job,
  loadJob,
  handleCreateJob,
  handleUpdateJob,
  intl,
}): React.ReactElement => {
  useEffect((): void => {
    if (jobId) {
      loadJob(jobId);
    }
  }, [jobId, loadJob]);

  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const waitingForJob = jobId !== null && job === null;
  const handleModalCancel = (): void => {};
  const handleModalConfirm = (): void => {
    if (job) {
      window.location.href = jobBuilderEnv(intl.locale, job.id);
    }
    // TODO: what do if selectJob not set yet?
  };
  const handleSubmit = job ? handleUpdateJob : handleCreateJob;
  const handleReturn = (): void => {
    window.location.href = jobBuilderIntro(
      locale,
      jobId !== null ? jobId : undefined,
    );
  };
  const progressTrackerItems: ProgressTrackerItem[] = [
    {
      state: waitingForJob ? "null" : jobBuilderIntroProgressState(job),
      label: intl.formatMessage(progressTrackerLabels.start),
      title: intl.formatMessage(progressTrackerTitles.welcome),
    },
    {
      state: "active",
      label: intl.formatMessage(progressTrackerLabels.step01),
      title: intl.formatMessage(progressTrackerTitles.jobInfo),
    },
    {
      state: waitingForJob
        ? "null"
        : jobBuilderEnvProgressState(job, locale, true),
      label: intl.formatMessage(progressTrackerLabels.step02),
      title: intl.formatMessage(progressTrackerTitles.workEnv),
    },
    {
      state: waitingForJob ? "null" : jobImpactProgressState(job, locale, true),
      label: intl.formatMessage(progressTrackerLabels.step03),
      title: intl.formatMessage(progressTrackerTitles.impact),
    },
    {
      state: "null",
      label: intl.formatMessage(progressTrackerLabels.step04),
      title: intl.formatMessage(progressTrackerTitles.tasks),
    },
    {
      state: "null",
      label: intl.formatMessage(progressTrackerLabels.step05),
      title: intl.formatMessage(progressTrackerTitles.skills),
    },
    {
      state: "null",
      label: intl.formatMessage(progressTrackerLabels.finish),
      title: intl.formatMessage(progressTrackerTitles.review),
    },
  ];
  return (
    <section>
      <ProgressTracker
        items={progressTrackerItems}
        backgroundColor="black"
        fontColor="white"
        classNames="manager-jpb-tracker"
        itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
      />
      {waitingForJob ? (
        <div
          data-c-container="form"
          data-c-padding="top(triple) bottom(triple)"
        >
          <div
            data-c-background="white(100)"
            data-c-card
            data-c-padding="all(double)"
            data-c-radius="rounded"
            data-c-align="base(centre)"
          >
            <p>{intl.formatMessage(jobBuilderMessages.jobLoading)}</p>
          </div>
        </div>
      ) : (
        <JobDetailsIntl
          job={job}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </section>
  );
};

const mapStateToPropsPage = (
  state: RootState,
): {
  job: Job | null;
} => ({
  job: getSelectedJob(state),
});

const mapDispatchToPropsPage = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => void;
  handleCreateJob: (newJob: Job) => Promise<boolean>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
} => ({
  loadJob: (jobId: number): void => {
    dispatch(fetchJob(jobId));
    dispatch(setSelectedJob(jobId));
  },
  handleCreateJob: async (newJob: Job): Promise<boolean> => {
    const result = await dispatch(createJob(newJob));
    if (!result.error) {
      const resultJob = await result.payload;
      dispatch(setSelectedJob(resultJob.id));
    }
    return !result.error;
  },
  handleUpdateJob: async (newJob: Job): Promise<boolean> => {
    const result = await dispatch(updateJob(newJob));
    return !result.error;
  },
});

const JobDetailsPageContainer = connect(
  mapStateToPropsPage,
  mapDispatchToPropsPage,
)(injectIntl(JobDetailsPage));

if (document.getElementById("job-builder-details")) {
  const container = document.getElementById(
    "job-builder-details",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  ReactDOM.render(
    <RootContainer>
      <JobDetailsPageContainer jobId={jobId} />
    </RootContainer>,
    container,
  );
}
