import React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
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
import JobBuilderStepContainer from "../JobBuilder/JobBuilderStep";

interface JobTasksPageProps {
  jobId: number;
  job: Job | null;
  keyTasks: JobPosterKeyTask[];
  handleUpdateTasks: (
    jobId: number,
    tasks: JobPosterKeyTask[],
  ) => Promise<JobPosterKeyTask[]>;
}

const JobTasksPage: React.FunctionComponent<
  JobTasksPageProps & InjectedIntlProps
> = ({ jobId, job, keyTasks, handleUpdateTasks, intl }): React.ReactElement => {
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
    <JobBuilderStepContainer jobId={jobId} currentPage="tasks">
      {job !== null && (
        <JobTasks
          jobId={jobId}
          keyTasks={keyTasks}
          validCount={VALID_COUNT}
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
} => ({
  job: getJob(state, ownProps),
  keyTasks: getTasksByJob(state, ownProps),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleUpdateTasks: (
    jobId: number,
    tasks: JobPosterKeyTask[],
  ) => Promise<JobPosterKeyTask[]>;
} => ({
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
