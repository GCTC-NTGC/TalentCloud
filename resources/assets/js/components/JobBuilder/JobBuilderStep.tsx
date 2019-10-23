import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import nprogress from "nprogress";
import {
  Job,
  JobPosterKeyTask,
  Criteria,
  Skill,
  Department,
} from "../../models/types";
import { VALID_COUNT } from "./jobBuilderHelpers";
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
  setSelectedJob,
} from "../../store/Job/jobActions";
import { fetchSkills } from "../../store/Skill/skillActions";
import JobBuilderProgressTracker from "./JobBuilderProgressTracker";
import { getDepartments } from "../../store/Department/deptSelector";
import { getDepartments as fetchDepartments } from "../../store/Department/deptActions";
import { RootState } from "../../store/store";

export type JobBuilderPage =
  | "intro"
  | "details"
  | "env"
  | "impact"
  | "tasks"
  | "skills"
  | "review";

interface JobBuilderStepProps {
  jobId: number | null;
  job: Job | null;
  loadJob: (jobId: number) => Promise<void>;
  keyTasks: JobPosterKeyTask[];
  loadTasks: (jobId: number) => Promise<void>;
  criteria: Criteria[];
  loadCriteria: (jobId: number) => Promise<void>;
  // List of known department options.
  departments: Department[];
  // This is called when departments is empty to fetch departments.
  loadDepartments: () => Promise<void>;
  skills: Skill[];
  loadSkills: () => Promise<void>;
  currentPage: JobBuilderPage;
  children: React.ReactNode;
}

const JobBuilderStep: React.FunctionComponent<JobBuilderStepProps> = ({
  jobId,
  job,
  loadJob,
  keyTasks,
  loadTasks,
  criteria,
  loadCriteria,
  loadSkills,
  departments,
  loadDepartments,
  currentPage,
  children,
}): React.ReactElement => {
  // Trigger fetching of job details
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  useEffect((): (() => void) => {
    let isSubscribed = true;
    if (jobId) {
      setIsLoadingJob(true);
      loadJob(jobId).finally((): void => {
        if (isSubscribed) {
          setIsLoadingJob(false);
        }
      });
    }
    return (): void => {
      isSubscribed = false;
    };
  }, [jobId, loadJob]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  useEffect((): (() => void) => {
    let isSubscribed = true;
    if (jobId) {
      setIsLoadingTasks(true);
      loadTasks(jobId).finally((): void => {
        if (isSubscribed) {
          setIsLoadingTasks(false);
        }
      });
    }
    return (): void => {
      isSubscribed = false;
    };
  }, [jobId, loadTasks]);
  const [isLoadingCriteria, setIsLoadingCriteria] = useState(true);
  useEffect((): (() => void) => {
    let isSubscribed = true;
    if (jobId) {
      setIsLoadingCriteria(true);
      loadCriteria(jobId).finally((): void => {
        if (isSubscribed) {
          setIsLoadingCriteria(false);
        }
      });
    }
    return (): void => {
      isSubscribed = false;
    };
  }, [jobId, loadCriteria]);

  const dataIsLoading = isLoadingJob || isLoadingTasks || isLoadingCriteria;

  // Trigger fetching of other resources needed for Job Builder
  useEffect((): void => {
    if (departments.length === 0) {
      loadDepartments();
    }
  }, [departments, loadDepartments]);
  useEffect((): void => {
    loadSkills();
  }, [loadSkills]);

  useEffect((): void => {
    if (jobId !== null && job === null) {
      nprogress.start();
    } else if (currentPage !== "intro") {
      nprogress.done();
    }
  }, [currentPage, job, jobId]);

  return (
    <section>
      <JobBuilderProgressTracker
        job={job}
        tasks={keyTasks}
        maxTasksCount={VALID_COUNT}
        criteria={criteria}
        dataIsLoading={dataIsLoading}
        currentPage={currentPage}
      />
      {jobId !== null && job === null && (
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
                id="jobBuilder.loading"
                defaultMessage="Your job is loading..."
                description="Message indicating that the current job is still being loaded."
              />
            </p>
          </div>
        </div>
      )}
      {children}
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
  { jobId }: { jobId: number | null },
): {
  job: Job | null;
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
  skills: Skill[];
  departments: Department[];
} => ({
  job: jobId !== null ? getJob(state, { jobId }) : null,
  keyTasks: jobId !== null ? getTasksByJob(state, { jobId }) : [],
  criteria: jobId !== null ? getCriteriaByJob(state, { jobId }) : [],
  skills: getSkills(state),
  departments: getDepartments(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => Promise<void>;
  loadTasks: (jobId: number) => Promise<void>;
  loadCriteria: (jobId: number) => Promise<void>;
  loadSkills: () => Promise<void>;
  loadDepartments: () => Promise<void>;
} => ({
  loadJob: async (jobId: number): Promise<void> => {
    await dispatch(fetchJob(jobId));
    dispatch(setSelectedJob(jobId));
  },
  loadTasks: async (jobId: number): Promise<void> => {
    await dispatch(fetchJobTasks(jobId));
  },
  loadCriteria: async (jobId: number): Promise<void> => {
    await dispatch(fetchCriteria(jobId));
  },
  loadSkills: async (): Promise<void> => {
    await dispatch(fetchSkills());
  },
  loadDepartments: async (): Promise<void> => {
    await dispatch(fetchDepartments());
  },
});

export const JobBuilderStepContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobBuilderStep);

export default JobBuilderStepContainer;
