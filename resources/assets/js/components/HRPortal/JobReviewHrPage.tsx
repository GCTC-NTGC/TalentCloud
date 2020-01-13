import React, { useEffect } from "react";
import { WrappedComponentProps, injectIntl, useIntl } from "react-intl";
import nprogress from "nprogress";
import { connect, useDispatch, useSelector } from "react-redux";
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
import {
  managerJobIndex,
  jobBuilderSkills,
  hrJobSummary,
} from "../../helpers/routes";
import { RootState } from "../../store/store";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../store/Job/jobSelector";
import { getSkills } from "../../store/Skill/skillSelector";
import { DispatchType } from "../../configureStore";
import {
  submitJobForReview,
  fetchJob,
  fetchJobTasks,
  fetchCriteria,
} from "../../store/Job/jobActions";
import { getDepartments as fetchDepartments } from "../../store/Department/deptActions";
import { getDepartments } from "../../store/Department/deptSelector";
import {
  getSelectedManager,
  getManagerById,
} from "../../store/Manager/managerSelector";
import {
  fetchManager,
  setSelectedManager,
} from "../../store/Manager/managerActions";
import { navigate } from "../../helpers/router";
import { isJobBuilderComplete } from "../JobBuilder/jobBuilderHelpers";
import JobReview from "../JobBuilder/Review/JobReview";
import { fetchSkills } from "../../store/Skill/skillActions";

interface JobReviewHrPageProps {
  jobId: number;
  job: Job | null;
  skills: Skill[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
  departments: Department[];
  manager: Manager | null;
}

const JobReviewHrPage: React.FunctionComponent<JobReviewHrPageProps> = ({
  jobId,
  job,
  skills,
  keyTasks,
  criteria,
  departments,
  manager,
}): React.ReactElement => {
  const { locale } = useIntl();
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }

  const handleReturn = (): void => {
    // Go to Previous page
    navigate(hrJobSummary(locale, jobId));
  };
  const handleContinue = (): void => {
    // do nothing
  };
  const handleSubmitJob = async (): Promise<void> => {
    // do nothing
  };
  const jobIsComplete =
    job !== null && isJobBuilderComplete(job, keyTasks, criteria, locale);

  return job !== null ? (
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
  ) : (
    <h3>Data is loading</h3> // TODO:
  );
};

const JobReviewHrDataFetcher: React.FC<{ jobId: number }> = ({ jobId }) => {
  const dispatch = useDispatch();

  // Request and select the job
  useEffect(() => {
    dispatch(fetchJob(jobId));
  }, [dispatch, jobId]);
  const job = useSelector((state: RootState) => getJob(state, { jobId }));

  // Request and select the job tasks
  useEffect(() => {
    dispatch(fetchJobTasks(jobId));
  }, [dispatch, jobId]);
  const tasks = useSelector((state: RootState) =>
    getTasksByJob(state, { jobId }),
  );

  // Request and select job criteria
  useEffect(() => {
    dispatch(fetchCriteria(jobId));
  }, [dispatch, jobId]);
  const criteria = useSelector((state: RootState) =>
    getCriteriaByJob(state, { jobId }),
  );

  // Load all skills
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);
  const skills = useSelector(getSkills);

  // Load all departments
  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);
  const departments = useSelector(getDepartments);

  // Load manager after Job has loaded
  const managerId = job?.manager_id;
  useEffect(() => {
    if (managerId) {
      dispatch(fetchManager(managerId));
    }
  }, [dispatch, managerId]);
  const manager = useSelector((state: RootState) =>
    managerId ? getManagerById(state, { managerId }) : null,
  );

  return (
    <JobReviewHrPage
      jobId={jobId}
      job={job}
      manager={manager}
      keyTasks={tasks}
      criteria={criteria}
      skills={skills}
      departments={departments}
    ></JobReviewHrPage>
  );
};

export default JobReviewHrDataFetcher;

const container = document.getElementById("job-review-hr");
if (container !== null) {
  if ("jobId" in container.dataset) {
    const jobId = Number(container.dataset.jobId as string);
    ReactDOM.render(
      <RootContainer>
        <JobReviewHrDataFetcher jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}
