import React, { useEffect, useState } from "react";
import { InjectedIntlProps, FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import RootContainer from "../RootContainer";
import { Job, JobPosterKeyTask, Criteria, Skill } from "../../models/types";
import {
  jobBuilderIntroProgressState,
  jobBuilderDetailsProgressState,
  jobImpactProgressState,
  jobBuilderEnvProgressState,
  VALID_COUNT,
  jobTasksProgressState,
} from "../JobBuilder/jobBuilderHelpers";
import {
  progressTrackerLabels,
  progressTrackerTitles,
  jobBuilderMessages,
} from "../JobBuilder/jobBuilderMessages";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import JobBuilderSkills from "./JobBuilderSkills";
import { managerJobIndex, jobBuilderTasks } from "../../helpers/routes";
import { ProgressTrackerItem } from "../ProgressTracker/types";
import { RootState } from "../../store/store";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../store/Job/jobSelector";
import { getSkills } from "../../store/Skill/skillSelector";
import { DispatchType } from "../../configureStore";
import { fetchJob, fetchJobTasks, fetchCriteria, batchUpdateCriteria } from "../../store/Job/jobActions";
import { fetchSkills } from "../../store/Skill/skillActions";

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
  const [isLoadingJob, setIsLoadingJob] = useState(false);
  useEffect((): void => {
    setIsLoadingJob(true);
    loadJob(jobId).finally((): void => {
      setIsLoadingJob(false);
    });
  }, [jobId, loadJob]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  useEffect((): void => {
    setIsLoadingSkills(true);
    loadSkills().finally((): void => {
      setIsLoadingSkills(false);
    });
  }, [loadSkills]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  useEffect((): void => {
    setIsLoadingTasks(true);
    loadTasks(jobId).finally((): void => {
      setIsLoadingTasks(false);
    });
  }, [jobId, loadTasks]);
  const [isLoadingCriteria, setIsLoadingCriteria] = useState(false);
  useEffect((): void => {
    setIsLoadingCriteria(true);
    loadCriteria(jobId).finally((): void => {
      setIsLoadingCriteria(false);
    });
  }, [jobId, loadCriteria]);

  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }

  const handleReturn = (): void => {
    // Continue to next page
    window.location.href = jobBuilderTasks(locale, jobId);
  };
  const handleContinue = (): void => {
    // Continue to next page
    window.location.href = managerJobIndex(locale);
  };

  const handleSubmit = (tasks: Criteria[]): Promise<Criteria[]> =>
    handleSubmitCriteria(jobId, tasks);

  const progressTrackerItems: ProgressTrackerItem[] = [
    {
      state: isLoadingJob ? "null" : jobBuilderIntroProgressState(job),
      label: intl.formatMessage(progressTrackerLabels.start),
      title: intl.formatMessage(progressTrackerTitles.welcome),
    },
    {
      state: isLoadingJob
        ? "null"
        : jobBuilderDetailsProgressState(job, locale),
      label: intl.formatMessage(progressTrackerLabels.step01),
      title: intl.formatMessage(progressTrackerTitles.jobInfo),
    },
    {
      state: isLoadingJob ? "null" : jobBuilderEnvProgressState(job, locale),
      label: intl.formatMessage(progressTrackerLabels.step02),
      title: intl.formatMessage(progressTrackerTitles.workEnv),
    },
    {
      state: isLoadingJob ? "null" : jobImpactProgressState(job, locale),
      label: intl.formatMessage(progressTrackerLabels.step03),
      title: intl.formatMessage(progressTrackerTitles.impact),
    },
    {
      state: isLoadingTasks
        ? "null"
        : jobTasksProgressState(keyTasks, VALID_COUNT, locale),
      label: intl.formatMessage(progressTrackerLabels.step04),
      title: intl.formatMessage(progressTrackerTitles.tasks),
    },
    {
      state: "active",
      label: intl.formatMessage(progressTrackerLabels.step05),
      title: intl.formatMessage(progressTrackerTitles.skills),
    },
    {
      state: "null",
      label: intl.formatMessage(progressTrackerLabels.finish),
      title: intl.formatMessage(progressTrackerTitles.review),
    },
  ];
  return (
    <section>
      <ProgressTracker
        items={progressTrackerItems}
        backgroundColor="black"
        fontColor="white"
        classNames="manager-jpb-tracker"
        itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
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
            <p>{intl.formatMessage(jobBuilderMessages.jobLoading)}</p>
          </div>
        </div>
      ) : (
        <JobBuilderSkills
          job={job}
          keyTasks={keyTasks}
          initialCriteria={criteria}
          skills={skills}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
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
  const container = document.getElementById("job-builder-skills") as HTMLElement;
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
