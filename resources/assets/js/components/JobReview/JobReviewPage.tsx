import React, { useEffect } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import RootContainer from "../RootContainer";
import {
  Job,
  JobPosterKeyTask,
  Criteria,
  Skill,
  Manager,
  Department,
} from "../../models/types";
import { managerJobIndex, jobBuilderSkills } from "../../helpers/routes";
import { RootState } from "../../store/store";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../store/Job/jobSelector";
import { getSkills } from "../../store/Skill/skillSelector";
import { DispatchType } from "../../configureStore";
import { submitJobForReview } from "../../store/Job/jobActions";
import JobBuilderStepContainer from "../JobBuilder/JobBuilderStep";
import {
  isJobBuilderComplete,
  VALID_COUNT,
} from "../JobBuilder/jobBuilderHelpers";
import JobReview from "./JobReview";
import { getDepartments } from "../../store/Department/deptSelector";
import { getSelectedManager } from "../../store/Manager/managerSelector";
import {
  fetchManager,
  setSelectedManager,
} from "../../store/Manager/managerActions";

interface JobBuilderReviewPageProps {
  jobId: number;
  job: Job | null;
  skills: Skill[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
  departments: Department[];
  manager: Manager | null;
  handleSubmitJob: (job: Job) => Promise<void>;
  loadManager: (managerId: number) => Promise<void>;
}

const JobBuilderReviewPage: React.FunctionComponent<
  JobBuilderReviewPageProps & InjectedIntlProps
> = ({
  jobId,
  job,
  skills,
  keyTasks,
  criteria,
  departments,
  manager,
  handleSubmitJob,
  loadManager,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }

  useEffect((): void => {
    if (job && job.manager_id) {
      loadManager(job.manager_id);
    }
  }, [job, loadManager]);

  const handleReturn = (): void => {
    // Go to Previous page
    window.location.href = jobBuilderSkills(locale, jobId);
  };
  const handleContinue = (): void => {
    // Continue to next page
    window.location.href = managerJobIndex(locale);
  };
  const jobIsComplete =
    job !== null &&
    isJobBuilderComplete(job, keyTasks, VALID_COUNT, criteria, locale);

  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="review">
      {job !== null && (
        <JobReview
          job={job}
          manager={manager}
          tasks={keyTasks}
          criteria={criteria}
          skills={skills}
          departments={departments}
          validForSubmission={jobIsComplete}
          handleSubmit={handleSubmitJob}
          handleReturn={handleReturn}
          handleContinue={handleContinue}
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
  skills: Skill[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
  departments: Department[];
  manager: Manager | null;
} => ({
  job: getJob(state, ownProps),
  skills: getSkills(state),
  keyTasks: getTasksByJob(state, ownProps),
  criteria: getCriteriaByJob(state, ownProps),
  departments: getDepartments(state),
  manager: getSelectedManager(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleSubmitJob: (job: Job) => Promise<void>;
  loadManager: (managerId: number) => Promise<void>;
} => ({
  handleSubmitJob: async (job: Job): Promise<void> => {
    const result = await dispatch(submitJobForReview(job.id));
    if (result.error) {
      return Promise.reject(result.payload);
    }
    return Promise.resolve();
  },
  loadManager: async (managerId: number): Promise<void> => {
    const result = await dispatch(fetchManager(managerId));
    if (result.error) {
      return Promise.reject(result.payload);
    }
    const resultManager = await result.payload;
    dispatch(setSelectedManager(resultManager.id));
    return Promise.resolve();
  },
});

const JobReviewPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobBuilderReviewPage));

if (document.getElementById("job-builder-review")) {
  const container = document.getElementById(
    "job-builder-review",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  if (jobId) {
    ReactDOM.render(
      <RootContainer>
        <JobReviewPageContainer jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}
