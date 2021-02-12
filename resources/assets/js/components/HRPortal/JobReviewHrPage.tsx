import React, { useEffect, useCallback } from "react";
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
  User,
  Comment,
  Classification,
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
import { localizeField } from "../../helpers/localize";
import { getUserById } from "../../store/User/userSelector";
import { fetchUser } from "../../store/User/userActions";
import { hasKey } from "../../helpers/queries";
import { useLoadClassifications } from "../../hooks/classificationHooks";
import { DispatchType } from "../../configureStore";

interface JobReviewHrPageProps {
  jobId: number;
  job: Job | null;
  skills: Skill[];
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
  departments: Department[];
  manager: Manager | null;
  user: User | null;
}

const messages = defineMessages({
  loadingIcon: {
    id: "jobReviewHr.loadingIconText",
    defaultMessage: "Data is loading...",
    description: "Accessible text for the loading icon",
  },
});

const JobReviewHrPage: React.FunctionComponent<JobReviewHrPageProps> = ({
  jobId,
  job,
  skills,
  keyTasks,
  criteria,
  departments,
  manager,
  user,
}): React.ReactElement => {
  const intl = useIntl();
  const { locale } = intl;
  const dispatch = useDispatch<DispatchType>();
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unexpected locale");
  }
  const filterComments = useCallback(
    (comment: Comment): boolean => hasKey(jobReviewLocations, comment.location),
    [],
  );
  const { classifications } = useLoadClassifications(dispatch);
  const classificationKey: string =
    classifications.find(
      (item: Classification) => item.id === job?.classification_id,
    )?.key || "";
  return (
    <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
      {job !== null ? (
        <>
          <h3
            data-c-font-size="h3"
            data-c-font-weight="bold"
            data-c-margin="bottom(normal)"
          >
            <FormattedMessage
              id="jobReviewHr.reviewYourPoster"
              defaultMessage="Review Your Job Poster for:"
              description="Title for Review Job Poster section."
            />{" "}
            <span data-c-colour="c2">
              {localizeField(locale, job, "title")}
            </span>
          </h3>
          <p data-c-margin="bottom(double)">
            <FormattedMessage
              id="jobReviewHr.headsUp"
              defaultMessage="Just a heads up! We've rearranged some of your information to help you understand how an applicant will see it once published."
              description="Description under primary title of review section"
            />
          </p>
          <ActivityFeed
            jobId={job.id}
            isHrAdvisor
            generalLocation={LocationId.jobGeneric}
            locationMessages={jobReviewLocations}
            filterComments={filterComments}
          />
          <JobReviewDisplay
            job={job}
            classificationKey={classificationKey}
            manager={manager}
            user={user}
            tasks={keyTasks}
            criteria={criteria}
            skills={skills}
            departments={departments}
            hideBuilderLinks
          />
          <div data-c-grid="gutter">
            <div
              data-c-alignment="base(centre) tp(left)"
              data-c-grid-item="tp(1of2)"
              data-c-margin="top(normal) bottom(normal)"
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
        </>
      ) : (
        <div data-c-alignment="base(centre)">
          <Icon
            icon="fa fa-spinner fa-spin"
            accessibleText={intl.formatMessage(messages.loadingIcon)}
            sematicIcon
          />
        </div>
      )}
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

  // Load user after manager has loaded
  // eslint-disable-next-line camelcase
  const userId = manager?.user_id;
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);
  const user = useSelector((state: RootState) =>
    userId ? getUserById(state, { userId }) : null,
  );

  return (
    <JobReviewHrPage
      jobId={jobId}
      job={job}
      manager={manager}
      user={user}
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
