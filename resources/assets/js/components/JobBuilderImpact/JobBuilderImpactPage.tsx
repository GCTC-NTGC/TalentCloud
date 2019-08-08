import React, { useEffect } from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, FormattedMessage, injectIntl } from "react-intl";
import ReactDOM from "react-dom";
import { Department, Job } from "../../models/types";
import { ProgressTrackerItem } from "../ProgressTracker/types";
import {
  jobBuilderDetailsProgressState,
  jobBuilderIntroProgressState,
  jobBuilderEnvProgressState,
} from "../JobBuilder/jobBuilderHelpers";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import JobBuilderImpact from "./JobBuilderImpact";
import {
  progressTrackerLabels,
  progressTrackerTitles,
  jobBuilderMessages,
} from "../JobBuilder/jobBuilderMessages";
import { jobBuilderTasks, jobBuilderEnv } from "../../helpers/routes";
import { getSelectedJob } from "../../store/Job/jobSelector";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import {
  updateJob,
  fetchJob,
  setSelectedJob,
  createJob,
} from "../../store/Job/jobActions";
import { getDepartments } from "../../store/Department/deptSelector";
import { getDepartments as fetchDepartments } from "../../store/Department/deptActions";
import RootContainer from "../RootContainer";

interface JobBuilderImpactPageProps {
  jobId: number | null;
  job: Job | null;
  loadJob: (jobId: number) => void;
  departments: Department[];
  loadDepartments: () => void;
  handleCreateJob: (newJob: Job) => Promise<boolean>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
}

const JobBuilderImpactPage: React.FunctionComponent<
  JobBuilderImpactPageProps & InjectedIntlProps
> = ({
  jobId,
  job,
  loadJob,
  departments,
  loadDepartments,
  handleCreateJob,
  handleUpdateJob,
  intl,
}): React.ReactElement => {
  // Load Job and Departments from api
  useEffect((): void => {
    if (jobId !== null) {
      loadJob(jobId);
    }
  }, [jobId, loadJob]);
  useEffect((): void => {
    if (departments.length === 0) {
      loadDepartments();
    }
  }, [departments, loadDepartments]);

  const waitingForJob = jobId !== null && job === null;
  const handleModalCancel = (): void => {
    // Do nothing on cancel
  };
  const handleModalConfirm = (): void => {
    if (jobId !== null) {
      window.location.href = jobBuilderTasks(intl.locale, jobId);
    }
  };

  const handleSubmit = job ? handleUpdateJob : handleCreateJob;
  const handleReturn = (): void => {
    if (jobId !== null) {
      window.location.href = jobBuilderEnv(intl.locale, jobId);
    }
  };
  const progressTrackerItems: ProgressTrackerItem[] = [
    {
      state: waitingForJob ? "null" : jobBuilderIntroProgressState(job),
      label: intl.formatMessage(progressTrackerLabels.start),
      title: intl.formatMessage(progressTrackerTitles.welcome),
    },
    {
      state: waitingForJob
        ? "null"
        : jobBuilderDetailsProgressState(job, intl.locale),
      label: intl.formatMessage(progressTrackerLabels.step01),
      title: intl.formatMessage(progressTrackerTitles.jobInfo),
    },
    {
      state: waitingForJob
        ? "null"
        : jobBuilderEnvProgressState(job, intl.locale),
      label: intl.formatMessage(progressTrackerLabels.step02),
      title: intl.formatMessage(progressTrackerTitles.workEnv),
    },
    {
      state: "active",
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
          <h3
            data-c-font-size="h3"
            data-c-font-weight="bold"
            data-c-margin="bottom(double)"
          >
            <p>{intl.formatMessage(jobBuilderMessages.jobLoading)}</p>
          </h3>
        </div>
      ) : (
        <JobBuilderImpact
          job={job}
          departments={departments}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
): {
  job: Job | null;
  departments: Department[];
} => ({
  job: getSelectedJob(state),
  departments: getDepartments(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => void;
  loadDepartments: () => void;
  handleCreateJob: (newJob: Job) => Promise<boolean>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
} => ({
  loadJob: (jobId: number): void => {
    dispatch(fetchJob(jobId));
    dispatch(setSelectedJob(jobId));
  },
  loadDepartments: (): void => {
    dispatch(fetchDepartments());
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

const JobBuilderImpactPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobBuilderImpactPage));

if (document.getElementById("job-builder-impact")) {
  const container = document.getElementById(
    "job-builder-impact",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  ReactDOM.render(
    <RootContainer>
      <JobBuilderImpactPageContainer jobId={jobId} />
    </RootContainer>,
    container,
  );
}
