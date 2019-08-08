import React from "react";
import { InjectedIntlProps, FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import RootContainer from "../RootContainer";
import { Job, JobPosterKeyTask, Criteria, Skill } from "../../models/types";
import { VALID_COUNT } from "../JobBuilder/jobBuilderHelpers";
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
import {
  fetchJob,
  fetchJobTasks,
  fetchCriteria,
  batchUpdateCriteria,
} from "../../store/Job/jobActions";
import { fetchSkills } from "../../store/Skill/skillActions";
import { useLoader } from "../../helpers/customHooks";
import JobBuilderProgressTracker from "../JobBuilder/JobBuilderProgressTracker";

interface JobBuilderSkillsPageProps {
  jobId: number;
  job: Job | null;
  loadJob: (jobId: number) => Promise<void>;
  skills: Skill[];
  loadSkills: () => Promise<void>;
  keyTasks: JobPosterKeyTask[];
  loadTasks: (jobId: number) => Promise<void>;
  criteria: Criteria[];
  loadCriteria: (jobId: number) => Promise<void>;
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
  loadJob,
  skills,
  loadSkills,
  keyTasks,
  loadTasks,
  criteria,
  loadCriteria,
  handleSubmitCriteria,
  intl,
}): React.ReactElement => {
  // Trigger fetching of jobs, skills, tasks, and criteria on first load, or when jobId changes
  const isLoadingJob = useLoader((): Promise<void> => loadJob(jobId));
  const isLoadingSkills = useLoader(loadSkills);
  const isLoadingTasks = useLoader((): Promise<void> => loadTasks(jobId));
  const isLoadingCriteria = useLoader((): Promise<void> => loadCriteria(jobId));
  const dataIsLoading = isLoadingJob || isLoadingTasks || isLoadingCriteria;

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

  return (
    <section>
      <JobBuilderProgressTracker
        job={job}
        tasks={keyTasks}
        maxTasksCount={VALID_COUNT}
        criteria={criteria}
        dataIsLoading={dataIsLoading}
        currentPage="skills"
      />
      {isLoadingCriteria || isLoadingJob || isLoadingSkills || job === null ? (
        <div
          data-c-container="form"
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
                id="jobBuilderSkillsPage.loading"
                defaultMessage="Your job is loading..."
                description="Message indicating that the current job is still being loaded."
              />
            </p>
          </div>
        </div>
      ) : (
        <JobBuilderSkills
          job={job}
          keyTasks={keyTasks}
          initialCriteria={criteria}
          skills={skills}
          handleSubmit={handleSubmit}
          handleContinue={handleContinue}
        />
      )}
    </section>
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
  loadJob: (jobId: number) => Promise<void>;
  loadSkills: () => Promise<void>;
  loadTasks: (jobId: number) => Promise<void>;
  loadCriteria: (jobId: number) => Promise<void>;
  handleSubmitCriteria: (
    jobId: number,
    criteria: Criteria[],
  ) => Promise<Criteria[]>;
} => ({
  loadJob: async (jobId: number): Promise<void> => {
    await dispatch(fetchJob(jobId));
  },
  loadSkills: async (): Promise<void> => {
    await dispatch(fetchSkills());
  },
  loadTasks: async (jobId: number): Promise<void> => {
    await dispatch(fetchJobTasks(jobId));
  },
  loadCriteria: async (jobId: number): Promise<void> => {
    await dispatch(fetchCriteria(jobId));
  },
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
