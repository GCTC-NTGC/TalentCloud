import React, { useEffect } from "react";
import { useIntl, FormattedMessage } from "react-intl";
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
import Icon from "../Icon";
import ActivityFeed from "../ActivityFeed";
import { jobReviewLocations } from "../../models/localizedConstants";
import { LocationId } from "../../models/lookupConstants";

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
  return (
    <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
      {job !== null ? (
        <>
          <h3
            data-c-font-size="h3"
            data-c-font-weight="bold"
            data-c-margin="bottom(double)"
          >
            <FormattedMessage
              id="jobReviewHr.reviewYourPoster"
              defaultMessage="Review Your Job Poster for:"
              description="Title for Review Job Poster section."
            />{" "}
            <span data-c-colour="c2">{job[locale].title}</span>
          </h3>
          <p>
            <FormattedMessage
              id="jobReviewHr.headsUp"
              defaultMessage="Just a heads up! We've rearranged some of your information to help you
            understand how an applicant will see it once published."
              description="Description under primary title of review section"
            />
          </p>
          <ActivityFeed
            jobId={job.id}
            isHrAdvisor
            generalLocation={LocationId.jobGeneric}
            locationMessages={jobReviewLocations}
          />
          <JobReviewDisplay
            job={job}
            manager={manager}
            tasks={keyTasks}
            criteria={criteria}
            skills={skills}
            departments={departments}
            hideBuilderLinks
          />
        </>
      ) : (
        <div data-c-alignment="base(centre)">
          <Icon
            icon="fa fa-spinner fa-spin"
            accessibleText="Data is loading..."
            sematicIcon
          />
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
  // eslint-disable-next-line camelcase
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
