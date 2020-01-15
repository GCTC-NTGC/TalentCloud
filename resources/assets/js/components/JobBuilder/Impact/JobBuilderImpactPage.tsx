import React from "react";
import { connect } from "react-redux";
import { WrappedComponentProps, injectIntl } from "react-intl";
import ReactDOM from "react-dom";
import {
  Department,
  Job,
  JobPosterKeyTask,
  Criteria,
} from "../../../models/types";
import JobBuilderImpact from "./JobBuilderImpact";
import {
  jobBuilderTasks,
  jobBuilderEnv,
  jobBuilderReview,
} from "../../../helpers/routes";
import { RootState } from "../../../store/store";
import { DispatchType } from "../../../configureStore";
import { updateJob } from "../../../store/Job/jobActions";
import { getDepartments } from "../../../store/Department/deptSelector";
import RootContainer from "../../RootContainer";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../../store/Job/jobSelector";
import JobBuilderStepContainer from "../JobBuilderStep";
import { isJobBuilderComplete } from "../jobBuilderHelpers";
import { navigate } from "../../../helpers/router";

interface JobBuilderImpactPageProps {
  jobId: number;
  job: Job | null;
  departments: Department[];
  // Tasks associated with the job, used to determine if its complete
  keyTasks: JobPosterKeyTask[];
  // Criteria associated with the job, used to determine if its complete
  criteria: Criteria[];
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
}

const JobBuilderImpactPage: React.FunctionComponent<JobBuilderImpactPageProps &
  WrappedComponentProps> = ({
  jobId,
  job,
  departments,
  keyTasks,
  criteria,
  handleUpdateJob,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const handleModalCancel = (): void => {
    // Do nothing on cancel
  };
  const handleModalConfirm = (): void => {
    navigate(jobBuilderTasks(locale, jobId));
  };
  const handleSubmit = handleUpdateJob;
  const handleReturn = (): void => {
    if (jobId !== null) {
      navigate(jobBuilderEnv(locale, jobId));
    }
  };
  const handleSkipToReview = async (): Promise<void> => {
    if (jobId !== null) {
      navigate(jobBuilderReview(locale, jobId));
    }
  };
  const jobIsComplete =
    job !== null && isJobBuilderComplete(job, keyTasks, criteria, locale);
  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="impact">
      {job !== null && (
        <JobBuilderImpact
          job={job}
          departments={departments}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
          jobIsComplete={jobIsComplete}
          handleSkipToReview={handleSkipToReview}
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
  departments: Department[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
} => ({
  job: getJob(state, ownProps),
  departments: getDepartments(state),
  keyTasks: getTasksByJob(state, ownProps),
  criteria: getCriteriaByJob(state, ownProps),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
} => ({
  handleUpdateJob: async (newJob: Job): Promise<boolean> => {
    const result = await dispatch(updateJob(newJob));
    return !result.error;
  },
});

export const JobBuilderImpactPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobBuilderImpactPage));

export default JobBuilderImpactPageContainer;

if (document.getElementById("job-builder-impact")) {
  const container = document.getElementById(
    "job-builder-impact",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  if (jobId) {
    ReactDOM.render(
      <RootContainer>
        <JobBuilderImpactPageContainer jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}
