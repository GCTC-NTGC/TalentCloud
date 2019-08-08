import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import WorkEnvForm from "./WorkEnvForm";
import { Job, JobPosterKeyTask, Criteria } from "../../models/types";
import { DispatchType } from "../../configureStore";
import { RootState } from "../../store/store";
import { updateJob } from "../../store/Job/jobActions";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../store/Job/jobSelector";
import RootContainer from "../RootContainer";
import { jobBuilderImpact } from "../../helpers/routes";
import JobBuilderStepContainer from "../JobBuilder/JobBuilderStep";
import {
  isJobBuilderComplete,
  VALID_COUNT,
} from "../JobBuilder/jobBuilderHelpers";

interface JobBuilderWorkEnvProps {
  // The id of the edited job, or null for a new job.
  jobId: number;
  // If not null, used to prepopulate form values.
  // Note: its possible for jobId to be non-null, but job to be null, if the data hasn't been loaded yet.
  job: Job | null;
  // Tasks associated with the job, used to determine if its complete
  keyTasks: JobPosterKeyTask[];
  // Criteria associated with the job, used to determine if its complete
  criteria: Criteria[];
  // Updates an existing job. Must return the updated job if successful.
  handleUpdateJob: (newJob: Job) => Promise<Job>;
}

const JobBuilderWorkEnv: React.FunctionComponent<
  JobBuilderWorkEnvProps & InjectedIntlProps
> = ({
  jobId,
  job,
  handleUpdateJob,
  keyTasks,
  criteria,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const handleSubmit = handleUpdateJob;
  const handleModalCancel = (): void => {};
  const handleModalConfirm = (): void => {
    window.location.href = jobBuilderImpact(intl.locale, jobId);
  };
  // TODO: use this to determine whether the SKIP TO REVIEW button should be shown
  const jobIsComplete =
    job !== null &&
    isJobBuilderComplete(job, keyTasks, VALID_COUNT, criteria, locale);
  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="env">
      {job !== null && (
        <WorkEnvForm
          job={job}
          handleSubmit={handleSubmit}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </JobBuilderStepContainer>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: { jobId: number },
): {
  job: Job | null;
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
} => ({
  job: getJob(state, ownProps),
  keyTasks: getTasksByJob(state, ownProps),
  criteria: getCriteriaByJob(state, ownProps),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleUpdateJob: (newJob: Job) => Promise<Job>;
} => ({
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
