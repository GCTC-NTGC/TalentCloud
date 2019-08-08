import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import IntroForm from "./IntroForm";
import { Job, Department } from "../../models/types";
import { RootState } from "../../store/store";
import { getSelectedJob } from "../../store/Job/jobSelector";
import { DispatchType } from "../../configureStore";
import {
  fetchJob,
  setSelectedJob,
  createJob,
  updateJob,
} from "../../store/Job/jobActions";
import RootContainer from "../RootContainer";
import { jobBuilderDetails } from "../../helpers/routes";
import { VALID_COUNT } from "../JobBuilder/jobBuilderHelpers";
import { getDepartments } from "../../store/Department/deptSelector";
import { getDepartments as fetchDepartments } from "../../store/Department/deptActions";
import { useLoader } from "../../helpers/customHooks";
import JobBuilderProgressTracker from "../JobBuilder/JobBuilderProgressTracker";

interface JobBuilderIntroProps {
  // The id of the edited job, or null for a new job.
  jobId: number | null;
  // List of known department options.
  departments: Department[];
  // This is called when departments is empty to fetch departments.
  loadDepartments: () => Promise<void>;
  // If not null, used to prepopulate form values.
  // Note: its possible for jobId to be non-null, but job to be null, if the data hasn't been loaded yet.
  job: Job | null;
  // This will be called when jobId is set and job is null. It should cause the job data to be loaded and passed in.
  loadJob: (jobId: number) => Promise<void>;
  // Creates a new job. Must return the new job if successful.
  handleCreateJob: (newJob: Job) => Promise<Job>;
  // Updates an existing job. Must return the updated job if successful.
  handleUpdateJob: (newJob: Job) => Promise<Job>;
}

const JobBuilderIntro: React.FunctionComponent<JobBuilderIntroProps> = ({
  jobId,
  job,
  departments,
  loadDepartments,
  loadJob,
  handleCreateJob,
  handleUpdateJob,
}): React.ReactElement => {
  const isLoadingJob = useLoader(
    (): Promise<void> => {
      if (jobId !== null) {
        return loadJob(jobId);
      }
      return Promise.resolve();
    },
  );
  useLoader(loadDepartments);
  const handleSubmit = job ? handleUpdateJob : handleCreateJob;

  const handleContinueEn = (newJob: Job): void => {
    window.location.href = jobBuilderDetails("en", newJob.id);
  };
  const handleContinueFr = (newJob: Job): void => {
    window.location.href = jobBuilderDetails("fr", newJob.id);
  };

  return (
    <section>
      <JobBuilderProgressTracker
        job={job}
        tasks={[]} // TODO: pass in actual Tasks
        maxTasksCount={VALID_COUNT}
        criteria={[]} // TODO: pass in actual Criteria
        dataIsLoading={isLoadingJob}
        currentPage="intro"
      />
      {isLoadingJob ? (
        <div
          data-c-container="copy"
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
        <IntroForm
          job={job}
          departments={departments}
          handleSubmit={handleSubmit}
          handleContinueEn={handleContinueEn}
          handleContinueFr={handleContinueFr}
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
  loadJob: (jobId: number) => Promise<void>;
  loadDepartments: () => Promise<void>;
  handleCreateJob: (newJob: Job) => Promise<Job>;
  handleUpdateJob: (newJob: Job) => Promise<Job>;
} => ({
  loadJob: async (jobId: number): Promise<void> => {
    dispatch(setSelectedJob(jobId));
    await dispatch(fetchJob(jobId));
  },
  loadDepartments: async (): Promise<void> => {
    await dispatch(fetchDepartments());
  },
  handleCreateJob: async (newJob: Job): Promise<Job> => {
    const result = await dispatch(createJob(newJob));
    if (!result.error) {
      const resultJob = await result.payload;
      dispatch(setSelectedJob(resultJob.id));
      return resultJob;
    }
    return Promise.reject(result.payload);
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

const JobBuilderIntroPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobBuilderIntro));

if (document.getElementById("job-builder-intro")) {
  const container: HTMLElement = document.getElementById(
    "job-builder-intro",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  ReactDOM.render(
    <RootContainer>
      <JobBuilderIntroPageContainer jobId={jobId} />
    </RootContainer>,
    container,
  );
}

export default JobBuilderIntroPageContainer;
