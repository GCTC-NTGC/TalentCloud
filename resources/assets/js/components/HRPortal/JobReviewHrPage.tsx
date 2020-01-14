import React, { useEffect } from "react";
import { useIntl, FormattedMessage, defineMessages } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
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
import { hrJobSummary } from "../../helpers/routes";
import { RootState } from "../../store/store";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../store/Job/jobSelector";
import { getSkills } from "../../store/Skill/skillSelector";
import {
  fetchJob,
  fetchJobTasks,
  fetchCriteria,
} from "../../store/Job/jobActions";
import { getDepartments as fetchDepartments } from "../../store/Department/deptActions";
import { getDepartments } from "../../store/Department/deptSelector";
import { getManagerById } from "../../store/Manager/managerSelector";
import { fetchManager } from "../../store/Manager/managerActions";
import { JobReviewDisplay } from "../JobBuilder/Review/JobReview";
import { fetchSkills } from "../../store/Skill/skillActions";

const jobReviewMessages = defineMessages({
  dataIsLoading: {
    id: "hrReviewPage.dataLoading",
    defaultMessage: "Data is loading...",
    description: "Placeholder text as job data is loading.",
  },
});

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
  const { locale, formatMessage } = useIntl();
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }
  return (
    <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
      {job !== null ? (
        <JobReviewDisplay
          job={job}
          manager={manager}
          tasks={keyTasks}
          criteria={criteria}
          skills={skills}
          departments={departments}
          hideBuilderLinks
        />
      ) : (
        <div data-c-alignment="base(centre)">
          <i
            aria-hidden="true"
            className="fa fa-spinner fa-spin"
            title={formatMessage(jobReviewMessages.dataIsLoading)}
          />
          <span data-c-visibility="invisible">
            {formatMessage(jobReviewMessages.dataIsLoading)}
          </span>
        </div>
      )}
      <div data-c-grid="gutter">
        <div data-c-grid-item="base(1of1)">
          <hr data-c-margin="top(normal) bottom(normal)" />
        </div>
        <div
          data-c-alignment="base(centre) tp(left)"
          data-c-grid-item="tp(1of2)"
        >
          <a href={hrJobSummary(locale, jobId)} title="">
            <FormattedMessage
              id="jobReviewHr.summaryLink"
              defaultMessage="Return to Summary"
              description="Text for the Return to Summary link."
            />
          </a>
        </div>
      </div>
    </div>
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
    />
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
