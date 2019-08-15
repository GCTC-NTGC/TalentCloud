import React from "react";
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
  User,
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
import { batchUpdateCriteria } from "../../store/Job/jobActions";
import JobBuilderStepContainer from "../JobBuilder/JobBuilderStep";
import {
  isJobBuilderComplete,
  VALID_COUNT,
} from "../JobBuilder/jobBuilderHelpers";
import JobReview from "./JobReview";
import { getDepartments } from "../../store/Department/deptSelector";

interface JobBuilderReviewPageProps {
  jobId: number;
  job: Job | null;
  skills: Skill[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
  departments: Department[];
  manager: Manager | null;
  managerUser: User | null;
  handleSubmitJob: (job: Job) => Promise<void>;
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
  managerUser,
  handleSubmitJob,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }

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
      {job !== null && manager !== null && managerUser !== null && (
        <JobReview
          job={job}
          manager={manager}
          managerName={managerUser.name}
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
} => ({
  job: getJob(state, ownProps),
  skills: getSkills(state),
  keyTasks: getTasksByJob(state, ownProps),
  criteria: getCriteriaByJob(state, ownProps),
  departments: getDepartments(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleSubmitCriteria: (
    jobId: number,
    criteria: Criteria[],
  ) => Promise<Criteria[]>;
} => ({
  handleSubmitCriteria: async (
    jobId: number,
    criteria: Criteria[],
  ): Promise<Criteria[]> => {
    const result = await dispatch(batchUpdateCriteria(jobId, criteria));
    if (result.error) {
      return Promise.reject(result.payload);
    }
    const resultCriteria = await result.payload;
    return resultCriteria;
  },
});

const JobSkillsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobBuilderSkillsPage));
