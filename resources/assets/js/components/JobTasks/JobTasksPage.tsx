import React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { JobPosterKeyTask, Job, Criteria } from "../../models/types";
import {
  VALID_COUNT,
  isJobBuilderComplete,
} from "../JobBuilder/jobBuilderHelpers";
import JobTasks from "./JobTasks";
import {
  jobBuilderSkills,
  jobBuilderImpact,
  jobBuilderReview,
} from "../../helpers/routes";
import { RootState } from "../../store/store";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../store/Job/jobSelector";
import { DispatchType } from "../../configureStore";
import { batchUpdateJobTasks } from "../../store/Job/jobActions";
import RootContainer from "../RootContainer";
import JobBuilderStepContainer from "../JobBuilder/JobBuilderStep";
import { navigate } from "../../helpers/router";

interface JobTasksPageProps {
  jobId: number;
  job: Job | null;
  keyTasks: JobPosterKeyTask[];
  // Criteria associated with the job, used to determine if its complete
  criteria: Criteria[];
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
  keyTasks,
  criteria,
  handleUpdateTasks,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }

  const handleModalCancel = (): void => {}; // No need to do anything.
  const handleModalConfirm = (): void => {
    // Continue to next page
    navigate(jobBuilderSkills(locale, jobId));
  };
  const handleSubmit = (
    tasks: JobPosterKeyTask[],
  ): Promise<JobPosterKeyTask[]> => handleUpdateTasks(jobId, tasks);
  const handleReturn = (): void => {
    navigate(jobBuilderImpact(locale, jobId));
  };
  const handleSkipToReview = async (): Promise<void> => {
    navigate(jobBuilderReview(locale, jobId));
  };
  const jobIsComplete =
    job !== null &&
    isJobBuilderComplete(job, keyTasks, VALID_COUNT, criteria, locale);
  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="tasks">
      {job !== null && (
        <JobTasks
          jobId={jobId}
          keyTasks={keyTasks}
          validCount={VALID_COUNT}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
          handleSkipToReview={handleSkipToReview}
          jobIsComplete={jobIsComplete}
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

export default JobTasksPageContainer;

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
