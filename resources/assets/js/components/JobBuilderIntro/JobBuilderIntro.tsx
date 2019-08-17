import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import IntroForm from "./IntroForm";
import {
  Job,
  Department,
  JobPosterKeyTask,
  Criteria,
} from "../../models/types";
import { RootState } from "../../store/store";
import {
  getSelectedJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../store/Job/jobSelector";
import { DispatchType } from "../../configureStore";
import {
  setSelectedJob,
  createJob,
  updateJob,
} from "../../store/Job/jobActions";
import RootContainer from "../RootContainer";
import { jobBuilderDetails } from "../../helpers/routes";
import JobBuilderStepContainer from "../JobBuilder/JobBuilderStep";
import { getDepartments } from "../../store/Department/deptSelector";
import {
  isJobBuilderComplete,
  VALID_COUNT,
} from "../JobBuilder/jobBuilderHelpers";
import { navigate } from "hookrouter";

interface JobBuilderIntroProps {
  // The id of the edited job, or null for a new job.
  jobId: number | null;
  // List of known department options.
  departments: Department[];
  // If not null, used to prepopulate form values.
  // Note: its possible for jobId to be non-null, but job to be null, if the data hasn't been loaded yet.
  job: Job | null;
  // Tasks associated with the job, if it exists
  keyTasks: JobPosterKeyTask[];
  // Criteria associated with the job, if it exists
  criteria: Criteria[];
  // Creates a new job. Must return the new job if successful.
  handleCreateJob: (newJob: Job) => Promise<Job>;
  // Updates an existing job. Must return the updated job if successful.
  handleUpdateJob: (newJob: Job) => Promise<Job>;
}

const JobBuilderIntro: React.FunctionComponent<
  JobBuilderIntroProps & InjectedIntlProps
> = ({
  jobId,
  job,
  departments,
  handleCreateJob,
  handleUpdateJob,
  keyTasks,
  criteria,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }
  const handleSubmit = job ? handleUpdateJob : handleCreateJob;

  const handleContinueEn = (newJob: Job): void => {
    // window.location.href = jobBuilderDetails("en", newJob.id);
    navigate(jobBuilderDetails("en", newJob.id));
  };
  const handleContinueFr = (newJob: Job): void => {
    navigate(jobBuilderDetails("fr", newJob.id));
  };

  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="intro">
      {/** Show the form when the existing job has loaded, or if this is a new job */}
      {(job !== null || jobId === null) && (
        <IntroForm
          job={job}
          departments={departments}
          handleSubmit={handleSubmit}
          handleContinueEn={handleContinueEn}
          handleContinueFr={handleContinueFr}
        />
      )}
    </JobBuilderStepContainer>
  );
};

const mapStateToProps = (
  state: RootState,
  { jobId }: { jobId: number | null },
): {
  job: Job | null;
  departments: Department[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
} => ({
  job: getSelectedJob(state),
  departments: getDepartments(state),
  keyTasks: jobId !== null ? getTasksByJob(state, { jobId }) : [],
  criteria: jobId !== null ? getCriteriaByJob(state, { jobId }) : [],
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleCreateJob: (newJob: Job) => Promise<Job>;
  handleUpdateJob: (newJob: Job) => Promise<Job>;
} => ({
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
