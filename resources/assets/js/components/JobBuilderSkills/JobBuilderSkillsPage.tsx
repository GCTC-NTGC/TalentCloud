import React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import RootContainer from "../RootContainer";
import { Job, JobPosterKeyTask, Criteria, Skill } from "../../models/types";
import JobBuilderSkills from "./JobBuilderSkills";
import { managerJobIndex } from "../../helpers/routes";
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

interface JobBuilderSkillsPageProps {
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

const JobBuilderSkillsPage: React.FunctionComponent<
  JobBuilderSkillsPageProps & InjectedIntlProps
> = ({
  jobId,
  job,
  skills,
  keyTasks,
  criteria,
  handleSubmitCriteria,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }

  const handleContinue = (): void => {
    // Continue to next page
    window.location.href = managerJobIndex(locale);
  };

  const handleSubmit = (tasks: Criteria[]): Promise<Criteria[]> =>
    handleSubmitCriteria(jobId, tasks);
  // TODO: use this to determine whether the SKIP TO REVIEW button should be shown
  const jobIsComplete =
    job !== null &&
    isJobBuilderComplete(job, keyTasks, VALID_COUNT, criteria, locale);
  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="skills">
      {job !== null && (
        <JobBuilderSkills
          job={job}
          keyTasks={keyTasks}
          initialCriteria={criteria}
          skills={skills}
          handleSubmit={handleSubmit}
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
)(injectIntl(JobBuilderSkillsPage));

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
