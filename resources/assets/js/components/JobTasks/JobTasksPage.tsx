import React from "react";
import { InjectedIntlProps, FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { JobPosterKeyTask, Job } from "../../models/types";
import { VALID_COUNT } from "../JobBuilder/jobBuilderHelpers";
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
import JobBuilderProgressTracker from "../JobBuilder/JobBuilderProgressTracker";
import { useLoader } from "../../helpers/customHooks";

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
  const isLoadingJob = useLoader((): Promise<void> => loadJob(jobId));
  const isLoadingTasks = useLoader((): Promise<void> => loadTasks(jobId));
  const dataIsLoading = isLoadingJob || isLoadingTasks;

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

  return (
    <section>
      <JobBuilderProgressTracker
        job={job}
        tasks={keyTasks}
        maxTasksCount={VALID_COUNT}
        criteria={[]} // TODO: pass in actual Criteria
        dataIsLoading={dataIsLoading}
        currentPage="tasks"
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
