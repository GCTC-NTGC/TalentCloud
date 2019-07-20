import React, { useEffect, useState } from "react";
import { Job, JobPosterKeyTask, Criteria, Skill } from "../../models/types";
import { InjectedIntlProps, FormattedMessage } from "react-intl";
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
} from "../JobBuilder/jobBuilderMessages";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import JobBuilderSkills from "./JobBuilderSkills";
import { managerJobIndex } from "../../helpers/routes";

interface JobBuilderSkillsPageProps {
  jobId: number;
  job: Job | null;
  loadJob: (jobId: number) => Promise<void>;
  skills: Skill[];
  loadSkills: () => Promise<void>;
  // Included just to check progress state
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
