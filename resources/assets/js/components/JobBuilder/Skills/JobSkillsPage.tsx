import React from "react";
import { WrappedComponentProps, injectIntl, useIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import RootContainer from "../../RootContainer";
import { Job, JobPosterKeyTask, Criteria, Skill } from "../../../models/types";
import JobSkills from "./JobSkills";
import { jobBuilderTasks, jobBuilderReview } from "../../../helpers/routes";
import { RootState } from "../../../store/store";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../../store/Job/jobSelector";
import { getSkills } from "../../../store/Skill/skillSelector";
import { DispatchType } from "../../../configureStore";
import { batchUpdateCriteria } from "../../../store/Job/jobActions";
import JobBuilderStepContainer from "../JobBuilderStep";
import { navigate } from "../../../helpers/router";
import { getLocale } from "../../../helpers/localize";

interface JobSkillsPageProps {
  jobId: number;
  job: Job | null;
  skills: Skill[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
  handleSubmitCriteria: (
    jobId: number,
    criteria: Criteria[],
  ) => Promise<Criteria[]>;
}

const JobSkillsPage: React.FunctionComponent<JobSkillsPageProps> = ({
  jobId,
  job,
  skills,
  keyTasks,
  criteria,
  handleSubmitCriteria,
}): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const handleReturn = (): void => {
    // Continue to next page
    navigate(jobBuilderTasks(locale, jobId));
  };
  const handleContinue = (): void => {
    // Continue to next page
    navigate(jobBuilderReview(locale, jobId));
  };

  const handleSubmit = (tasks: Criteria[]): Promise<Criteria[]> =>
    handleSubmitCriteria(jobId, tasks);
  const handleSkipToReview = async (): Promise<void> => {
    navigate(jobBuilderReview(locale, jobId));
  };
  // As long as Skills is the last step, we never need to show the Skip to Review button
  const jobIsComplete = false;
  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="skills">
      {job !== null && (
        <JobSkills
          job={job}
          keyTasks={keyTasks}
          initialCriteria={criteria}
          skills={skills}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
          handleContinue={handleContinue}
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
  skills: Skill[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
} => ({
  job: getJob(state, ownProps),
  skills: getSkills(state),
  keyTasks: getTasksByJob(state, ownProps),
  criteria: getCriteriaByJob(state, ownProps),
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
)(JobSkillsPage);

export default JobSkillsPageContainer;

if (document.getElementById("job-builder-skills")) {
  const container = document.getElementById(
    "job-builder-skills",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  if (jobId) {
    ReactDOM.render(
      <RootContainer>
        <JobSkillsPageContainer jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}
