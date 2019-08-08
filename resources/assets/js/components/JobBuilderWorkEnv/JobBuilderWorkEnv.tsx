import React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import WorkEnvForm from "./WorkEnvForm";
import { Job } from "../../models/types";
import { DispatchType } from "../../configureStore";
import { RootState } from "../../store/store";
import { updateJob, fetchJob } from "../../store/Job/jobActions";
import { getJob } from "../../store/Job/jobSelector";
import { VALID_COUNT } from "../JobBuilder/jobBuilderHelpers";
import RootContainer from "../RootContainer";
import { useLoader } from "../../helpers/customHooks";
import JobBuilderProgressTracker from "../JobBuilder/JobBuilderProgressTracker";
import { jobBuilderImpact } from "../../helpers/routes";

interface JobBuilderWorkEnvProps {
  // The id of the edited job, or null for a new job.
  jobId: number;
  // If not null, used to prepopulate form values.
  // Note: its possible for jobId to be non-null, but job to be null, if the data hasn't been loaded yet.
  job: Job | null;
  // This will be called when jobId is set and job is null. It should cause the job data to be loaded and passed in.
  loadJob: (jobId: number) => Promise<void>;
  // Updates an existing job. Must return the updated job if successful.
  handleUpdateJob: (newJob: Job) => Promise<Job>;
}

const JobBuilderWorkEnv: React.FunctionComponent<
  JobBuilderWorkEnvProps & InjectedIntlProps
> = ({ jobId, job, loadJob, handleUpdateJob, intl }): React.ReactElement => {
  const isLoadingJob = useLoader((): Promise<void> => loadJob(jobId));
  const handleSubmit = handleUpdateJob;
  const handleModalCancel = (): void => {};
  const handleModalConfirm = (): void => {
    window.location.href = jobBuilderImpact(intl.locale, jobId);
  };
  return (
    <section>
      <JobBuilderProgressTracker
        job={job}
        tasks={[]} // TODO: pass in actual Tasks
        maxTasksCount={VALID_COUNT}
        criteria={[]} // TODO: pass in actual Criteria
        dataIsLoading={isLoadingJob}
        currentPage="env"
      />
      {isLoadingJob ? (
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
                id="jobBuilderIntroPage.loading"
                defaultMessage="Your job is loading..."
                description="Message indicating that the current job is still being loaded."
              />
            </p>
          </div>
        </div>
      ) : (
        <WorkEnvForm
          job={job}
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
} => ({
  job: getJob(state, ownProps),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => Promise<void>;
  handleUpdateJob: (newJob: Job) => Promise<Job>;
} => ({
  loadJob: async (jobId: number): Promise<void> => {
    await dispatch(fetchJob(jobId));
  },
  handleUpdateJob: async (newJob: Job): Promise<Job> => {
    const result = await dispatch(updateJob(newJob));
    if (!result.error) {
      const resultJob = await result.payload;
      return resultJob;
    }
    return Promise.reject(result.payload);
  },
});

const JobBuilderWorkEnvContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobBuilderWorkEnv));

if (document.getElementById("job-builder-work-env")) {
  const container: HTMLElement = document.getElementById(
    "job-builder-work-env",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  if (jobId) {
    ReactDOM.render(
      <RootContainer>
        <JobBuilderWorkEnvContainer jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}

export default JobBuilderWorkEnvContainer;
