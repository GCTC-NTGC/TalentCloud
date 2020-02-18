import React, { useEffect } from "react";
import nprogress from "nprogress";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
} from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import IntroForm from "./IntroForm";
import {
  Job,
  Department,
  JobPosterKeyTask,
  Criteria,
  Manager,
  User,
} from "../../../models/types";
import { RootState } from "../../../store/store";
import {
  getSelectedJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../../store/Job/jobSelector";
import { DispatchType } from "../../../configureStore";
import {
  setSelectedJob,
  createJob,
  updateJob,
} from "../../../store/Job/jobActions";
import RootContainer from "../../RootContainer";
import { jobBuilderDetails } from "../../../helpers/routes";
import JobBuilderStepContainer from "../JobBuilderStep";
import { getDepartments } from "../../../store/Department/deptSelector";
import { navigate } from "../../../helpers/router";
import { getSelectedManager } from "../../../store/Manager/managerSelector";
import {
  updateManager,
  setSelectedManager,
  fetchManager,
  fetchCurrentManager,
} from "../../../store/Manager/managerActions";
import { getUserById } from "../../../store/User/userSelector";
import { fetchUser } from "../../../store/User/userActions";

interface JobBuilderIntroProps {
  // The id of the edited job, or null for a new job.
  jobId: number | null;
  // List of known department options.
  departments: Department[];
  // If not null, used to prepopulate form values.
  // Note: its possible for jobId to be non-null, but job to be null, if the data hasn't been loaded yet.
  job: Job | null;
  // The manager of this job.
  manager: Manager | null;
  // The user associated with the manager.
  user: User | null;
  // Creates a new job. Must return the new job if successful.
  handleCreateJob: (newJob: Job) => Promise<Job>;
  // Updates an existing job. Must return the updated job if successful.
  handleUpdateJob: (newJob: Job) => Promise<Job>;
  // Updates an existing Manager. Must return the updated manager if successful.
  handleUpdateManager: (manager: Manager) => Promise<Manager>;
  // Load a manager with a particular id.
  loadManager: (managerId: number) => Promise<void>;
  // Load the manager profile of the current authenticated user.
  loadCurrentManager: () => Promise<void>;
  handleFetchUser: (userId: number) => Promise<void>;
}

const JobBuilderIntro: React.FunctionComponent<JobBuilderIntroProps &
  WrappedComponentProps> = ({
  jobId,
  manager,
  user,
  job,
  departments,
  handleCreateJob,
  handleUpdateJob,
  handleUpdateManager,
  loadManager,
  loadCurrentManager,
  handleFetchUser,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }
  useEffect((): void => {
    if (manager === null) {
      nprogress.start();
      if (jobId === null) {
        loadCurrentManager();
      }
      if (job !== null) {
        loadManager(job.manager_id);
      }
    } else {
      nprogress.done();
    }
  }, [manager, jobId, job, loadCurrentManager, loadManager]);

  // Load user after Manager has loaded
  // eslint-disable-next-line camelcase
  const userId = manager?.user_id;
  useEffect((): void => {
    if (userId) {
      handleFetchUser(userId);
    }
  }, [handleFetchUser, userId]);

  const submitJob = job ? handleUpdateJob : handleCreateJob;
  const handleSubmit = async (
    updatedJob: Job,
    updatedManager: Manager,
  ): Promise<Job> => {
    const jobPromise = submitJob(updatedJob);
    await handleUpdateManager(updatedManager);
    return jobPromise;
  };

  const handleContinue = (chosenLang: string, newJob: Job): void => {
    if (locale === chosenLang) {
      navigate(jobBuilderDetails(chosenLang, newJob.id));
    } else {
      const baseUrl = window.location.origin;
      window.location.href = `${baseUrl}${jobBuilderDetails(
        chosenLang,
        newJob.id,
      )}`;
    }
  };

  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="intro">
      {/** Show the form when the existing job has loaded, or if this is a new job */}
      {manager === null && (
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
                id="jobBuilder.intro.managerLoading"
                defaultMessage="Your Manager Profile is loading..."
                description="Message indicating that the manager profile is still being loaded."
              />
            </p>
          </div>
        </div>
      )}
      {manager !== null &&
        user !== null &&
        (job !== null || jobId === null) && (
          <IntroForm
            job={job}
            manager={manager}
            user={user}
            departments={departments}
            handleSubmit={handleSubmit}
            handleContinue={handleContinue}
          />
        )}
    </JobBuilderStepContainer>
  );
};

const mapStateToProps = (
  state: RootState,
  { jobId }: { jobId: number | null },
): {
  job: Job | null;
  manager: Manager | null;
  departments: Department[];
  user: User | null;
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
} => ({
  job: getSelectedJob(state),
  manager: getSelectedManager(state),
  departments: getDepartments(state),
  user: getUserById(state, {
    // eslint-disable-next-line camelcase, @typescript-eslint/camelcase
    userId: getSelectedManager(state)?.user_id || 0,
  }),
  keyTasks: jobId !== null ? getTasksByJob(state, { jobId }) : [],
  criteria: jobId !== null ? getCriteriaByJob(state, { jobId }) : [],
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleCreateJob: (newJob: Job) => Promise<Job>;
  handleUpdateJob: (newJob: Job) => Promise<Job>;
  handleUpdateManager: (newManager: Manager) => Promise<Manager>;
  loadManager: (id: number) => Promise<void>;
  loadCurrentManager: () => Promise<void>;
  handleFetchUser: (userId: number) => Promise<void>;
} => ({
  handleCreateJob: async (newJob: Job): Promise<Job> => {
    const result = await dispatch(createJob(newJob));
    if (!result.error) {
      const resultJob = await result.payload;
      dispatch(setSelectedJob(resultJob.id));
      return resultJob;
    }
    return Promise.reject(result.payload);
  },
  handleUpdateJob: async (newJob: Job): Promise<Job> => {
    const result = await dispatch(updateJob(newJob));
    if (!result.error) {
      const resultJob = await result.payload;
      return resultJob;
    }
    return Promise.reject(result.payload);
  },
  handleUpdateManager: async (newManager: Manager): Promise<Manager> => {
    const result = await dispatch(updateManager(newManager));
    if (!result.error) {
      const resultManager = await result.payload;
      dispatch(setSelectedManager(resultManager.id));
      return resultManager;
    }
    return Promise.reject(result.payload);
  },
  loadManager: async (id: number): Promise<void> => {
    const result = await dispatch(fetchManager(id));
    if (!result.error) {
      const resultManager = await result.payload;
      dispatch(setSelectedManager(resultManager.id));
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  },
  loadCurrentManager: async (): Promise<void> => {
    const result = await dispatch(fetchCurrentManager());
    if (!result.error) {
      const resultManager = await result.payload;
      dispatch(setSelectedManager(resultManager.id));
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  },
  handleFetchUser: async (userId: number): Promise<void> => {
    const result = await dispatch(fetchUser(userId));
    if (!result.error) {
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  },
});

const JobBuilderIntroPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobBuilderIntro));

if (document.getElementById("job-builder-intro")) {
  const container: HTMLElement = document.getElementById(
    "job-builder-intro",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;

  ReactDOM.render(
    <RootContainer>
      <JobBuilderIntroPageContainer jobId={jobId} />
    </RootContainer>,
    container,
  );
}

export default JobBuilderIntroPageContainer;
