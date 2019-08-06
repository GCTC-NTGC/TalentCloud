import React, { useEffect, useState } from "react";
import { InjectedIntlProps, FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { JobPosterKeyTask, Job } from "../../models/types";
import { ProgressTrackerItem } from "../ProgressTracker/types";
import {
  jobBuilderIntroProgressState,
  jobBuilderDetailsProgressState,
  jobBuilderEnvProgressState,
  jobImpactProgressState,
  VALID_COUNT,
} from "../JobBuilder/jobBuilderHelpers";
import {
  progressTrackerLabels,
  progressTrackerTitles,
} from "../JobBuilder/jobBuilderMessages";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import JobTasks from "./JobTasks";
import { jobBuilderSkills } from "../../helpers/routes";
import { RootState } from "../../store/store";
import { getJob, getTasksByJob } from "../../store/Job/jobSelector";
import { DispatchType } from "../../configureStore";
import {
  fetchJob,
  fetchJobTasks,
  batchUpdateJobTasks,
} from "../../store/Job/jobActions";
import RootContainer from "../RootContainer";

interface JobTasksPageProps {
  jobId: number;
  job: Job | null;
  loadJob: (jobId: number) => Promise<void>;
  keyTasks: JobPosterKeyTask[];
  loadTasks: (jobId: number) => Promise<void>;
  handleUpdateTasks: (
    jobId: number,
    tasks: JobPosterKeyTask[],
  ) => Promise<JobPosterKeyTask[]>;
}

const JobTasksPage: React.FunctionComponent<
  JobTasksPageProps & InjectedIntlProps
> = ({
  jobId,
  job,
  loadJob,
  keyTasks,
  loadTasks,
  handleUpdateTasks,
  intl,
}): React.ReactElement => {
  // Trigger fetching of jobs and tasks on first load, or when jobId changes
  const [isLoadingJob, setIsLoadingJob] = useState(false);
  useEffect((): void => {
    setIsLoadingJob(true);
    loadJob(jobId).finally((): void => {
      setIsLoadingJob(false);
    });
  }, [jobId, loadJob]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  useEffect((): void => {
    setIsLoadingTasks(true);
    loadTasks(jobId).finally((): void => {
      setIsLoadingTasks(false);
    });
  }, [jobId, loadTasks]);

  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }

  const handleModalCancel = (): void => {}; // No need to do anything.
  const handleModalConfirm = (): void => {
    // Continue to next page
    window.location.href = jobBuilderSkills(locale, jobId);
  };
  const handleSubmit = (
    tasks: JobPosterKeyTask[],
  ): Promise<JobPosterKeyTask[]> => handleUpdateTasks(jobId, tasks);

  const progressTrackerItems: ProgressTrackerItem[] = [
    {
      state: isLoadingJob ? "null" : jobBuilderIntroProgressState(job),
      label: intl.formatMessage(progressTrackerLabels.start),
      title: intl.formatMessage(progressTrackerTitles.welcome),
    },
    {
      state: isLoadingJob
        ? "null"
        : jobBuilderDetailsProgressState(job, locale),
      label: intl.formatMessage(progressTrackerLabels.step01),
      title: intl.formatMessage(progressTrackerTitles.jobInfo),
    },
    {
      state: isLoadingJob ? "null" : jobBuilderEnvProgressState(job, locale),
      label: intl.formatMessage(progressTrackerLabels.step02),
      title: intl.formatMessage(progressTrackerTitles.workEnv),
    },
    {
      state: isLoadingJob ? "null" : jobImpactProgressState(job, locale),
      label: intl.formatMessage(progressTrackerLabels.step03),
      title: intl.formatMessage(progressTrackerTitles.impact),
    },
    {
      state: "active",
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
      {isLoadingTasks ? (
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
            <p>
              <FormattedMessage
                id="jobBuilderTasksPage.loading"
                defaultMessage="Your job is loading..."
                description="Message indicating that the current job is still being loaded."
              />
            </p>
          </div>
        </div>
      ) : (
        <JobTasks
          jobId={jobId}
          keyTasks={keyTasks}
          validCount={VALID_COUNT}
          handleSubmit={handleSubmit}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: { jobId: number },
): {
  job: Job | null;
  keyTasks: JobPosterKeyTask[];
} => ({
  job: getJob(state, ownProps),
  keyTasks: getTasksByJob(state, ownProps),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => Promise<void>;
  loadTasks: (jobId: number) => Promise<void>;
  handleUpdateTasks: (
    jobId: number,
    tasks: JobPosterKeyTask[],
  ) => Promise<JobPosterKeyTask[]>;
} => ({
  loadJob: async (jobId: number): Promise<void> => {
    await dispatch(fetchJob(jobId));
  },
  loadTasks: async (jobId: number): Promise<void> => {
    await dispatch(fetchJobTasks(jobId));
  },
  handleUpdateTasks: async (
    jobId: number,
    tasks: JobPosterKeyTask[],
  ): Promise<JobPosterKeyTask[]> => {
    const result = await dispatch(batchUpdateJobTasks(jobId, tasks));
    if (result.error) {
      return Promise.reject(result.payload);
    }
    const resultTasks = await result.payload;
    return resultTasks;
  },
});

const JobTasksPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobTasksPage));

if (document.getElementById("job-builder-tasks")) {
  const container = document.getElementById("job-builder-tasks") as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  if (jobId) {
    ReactDOM.render(
      <RootContainer>
        <JobTasksPageContainer jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}
