import React, { useEffect } from "react";
import { InjectedIntlProps, FormattedMessage } from "react-intl";
import { Department, Job } from "../../models/types";
import { ProgressTrackerItem } from "../ProgressTracker/types";
import {
  isJobBuilderIntroComplete,
  isJobBuilderDetailsComplete,
  jobBuilderDetailsProgressState,
  jobBuilderIntroProgressState,
  jobBuilderEnvProgressState,
} from "../JobBuilder/jobBuilderHelpers";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import JobBuilderImpact from "./JobBuilderImpact";
import {
  progressTrackerLabels,
  progressTrackerTitles,
} from "../JobBuilder/jobBuilderMessages";
import { managerJobIndex } from "../../helpers/routes";

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
    window.location.href = managerJobIndex(intl.locale);
  }; // TODO: go to next page
  const handleSubmit = job ? handleUpdateJob : handleCreateJob;
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
            <FormattedMessage
              id="jobBuilderImpact.jobloading"
              defaultMessage="Job Loading..."
              description="Message indicating that the current job is still being loaded."
            />
          </h3>
        </div>
      ) : (
        <JobBuilderImpact
          job={job}
          departments={departments}
          handleSubmit={handleSubmit}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </section>
  );
};

export default JobBuilderImpactPage;
