/* eslint-disable camelcase */
import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { defineMessages, IntlShape, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import JobIndexHr from "./JobIndexHr";
import { JobCardProps } from "../JobCard";
import { Job, Manager, JobPosterStatus } from "../../models/types";
import {
  classificationString,
  emptyJobPosterStatus,
} from "../../models/jobUtil";
import { localizeField, Locales, getLocale } from "../../helpers/localize";
import {
  hrJobSummary,
  hrJobReview,
  hrJobPreview,
  hrScreeningPlan,
} from "../../helpers/routes";
import { UnclaimedJobCardProps } from "../UnclaimedJobCard";
import { find, stringNotEmpty } from "../../helpers/queries";
import {
  getHrAdvisor as fetchHrAdvisor,
  claimJob,
} from "../../store/HrAdvisor/hrAdvisorActions";
import { getHrAdvisor } from "../../store/HrAdvisor/hrAdvisorSelector";
import { RootState } from "../../store/store";
import { fetchJobIndex } from "../../store/Job/jobActions";
import { getAllJobs } from "../../store/Job/jobSelector";
import RootContainer from "../RootContainer";
import { getManagers } from "../../store/Manager/managerSelector";
import { fetchManager } from "../../store/Manager/managerActions";
import { getDepartmentById } from "../../store/Department/deptSelector";
import { getDepartments } from "../../store/Department/deptActions";
import {
  getJobStatuses,
  jobStatusesLoading,
} from "../../store/JobPosterStatus/jobStatusSelector";
import { fetchJobPosterStatuses } from "../../store/JobPosterStatus/jobStatusActions";
import { getUserById } from "../../store/User/userSelector";
import { fetchUser } from "../../store/User/userActions";

const buttonMessages = defineMessages({
  reviewDraft: {
    id: "hrJobIndex.reviewDraft",
    defaultMessage: "Review Draft",
    description: "Text for the link to review job draft.",
  },
  preview: {
    id: "hrJobIndex.preview",
    defaultMessage: "Preview Poster",
    description: "Text for the link to preview the job poster.",
  },
  screeningPlan: {
    id: "hrJobIndex.viewScreeningPlan",
    defaultMessage: "View Assessment Plan",
    description: "Text for the link to view the Screening Plan.",
  },
  viewActivity: {
    id: "hrJobIndex.viewActivity",
    defaultMessage: "View Activity",
    description: "Text for the link to view new entries in the activity feed.",
  },
  viewSummary: {
    id: "hrJobIndex.viewSummary",
    defaultMessage: "View Summary",
    description: "Text for the link to the Job Summary page.",
  },
});

const messages = defineMessages({
  loadingManager: {
    id: "hrJobIndex.managerLoading",
    defaultMessage: "Loading...",
    description: "Placehold text for a manager's name, while data is loading.",
  },
  titleMissing: {
    id: "hrJobIndex.jobTitleMissing",
    defaultMessage: "Title Missing",
    description: "Placeholder text for a missing Job title.",
  },
  departmentPlaceholder: {
    id: "hrJobIndex.departmentPlaceholder",
    defaultMessage: "[Department loading]",
    description: "Placeholder for department name while it hasn't been loaded.",
  },
});

const makeJobAction = (
  intl: IntlShape,
  locale: Locales,
  job: Job,
  jobPosterStatuses: JobPosterStatus[]
): JobCardProps => {
  const jobTitle = localizeField(locale, job, "title");
  return {
    id: job.id,
    applicants: 0, // TODO: find real number of applicants.
    // TODO: is this intended to be a link as well, like activity?
    classification: classificationString(job),
    managerTime: 0, // TODO: This isn't recorded yet.
    userTime: 0, // TODO: This isn't recorded yet.
    owned: true,
    title: stringNotEmpty(jobTitle)
      ? jobTitle
      : intl.formatMessage(messages.titleMissing),
    status:
      find(jobPosterStatuses, job.job_poster_status_id) ??
      emptyJobPosterStatus(),
    activity: {
      count: 0, // TODO: requires tracking which comments are "new"
      new: {
        url: hrJobSummary(locale, job.id), // TODO: this should include a #link
        text: intl.formatMessage(buttonMessages.viewActivity),
        title: "",
      },
    },
    draft: {
      url: hrJobReview(locale, job.id),
      text: intl.formatMessage(buttonMessages.reviewDraft),
      title: "",
    },
    preview: {
      url: hrJobPreview(locale, job.id),
      text: intl.formatMessage(buttonMessages.preview),
      title: "",
    },
    screeningPlan: {
      url: hrScreeningPlan(locale, job.id),
      text: intl.formatMessage(buttonMessages.screeningPlan),
      title: "",
    },
    summary: {
      url: hrJobSummary(locale, job.id),
      text: intl.formatMessage(buttonMessages.viewSummary),
      title: "",
    },
  };
};

const makeUnclaimedJob = (
  intl: IntlShape,
  locale: Locales,
  handleClaimJob: () => void,
  manager: Manager | null,
  job: Job,
  jobPosterStatuses: JobPosterStatus[],
): UnclaimedJobCardProps => {
  const jobTitle = localizeField(locale, job, "title");
  return {
    id: job.id,
    jobLink: {
      url: hrJobPreview(locale, job.id),
      text: stringNotEmpty(jobTitle)
        ? jobTitle
        : intl.formatMessage(messages.titleMissing),
      title: "",
    },
    reviewRequested: undefined, // TODO: use job_poster_status_histories to determine when this left draft status
    status:
      find(jobPosterStatuses, job.job_poster_status_id) ??
      emptyJobPosterStatus(),
    hiringManager:
      manager !== null
        ? manager.full_name
        : intl.formatMessage(messages.loadingManager),
    hrAdvisors: [], // TODO: We can get all claims of an advisor, but don't have an api route for getting advisors for a job!
    handleClaimJob,
  };
};

interface JobIndexHrPageProps {
  claimedJobIds: number[];
  department: string;
  jobs: Job[];
  managers: Manager[];
  // user: User | null;
  handleClaimJob: (jobId: number) => void;
  jobPosterStatuses: JobPosterStatus[];
}

const JobIndexHrPage: React.FC<JobIndexHrPageProps> = ({
  claimedJobIds,
  department,
  jobs,
  managers,
  handleClaimJob,
  jobPosterStatuses,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const isClaimed = (job: Job): boolean => claimedJobIds.includes(job.id);
  const isUnclaimed = (job: Job): boolean => !isClaimed(job);

  const jobToAction = (job: Job): JobCardProps =>
    makeJobAction(intl, locale, job, jobPosterStatuses);

  const jobToUnclaimed = (job: Job): UnclaimedJobCardProps =>
    makeUnclaimedJob(
      intl,
      locale,
      () => handleClaimJob(job.id),
      find(managers, job.manager_id),
      job,
      jobPosterStatuses,
    );

  const jobActions = jobs.filter(isClaimed).map(jobToAction);

  const unclaimedJobs = jobs.filter(isUnclaimed).map(jobToUnclaimed);

  return (
    <JobIndexHr
      jobActions={jobActions}
      unclaimedJobs={unclaimedJobs}
      departmentName={department}
    />
  );
};

interface JobIndexHrDataFetcherProps {
  hrAdvisorId: number;
}

const JobIndexHrDataFetcher: React.FC<JobIndexHrDataFetcherProps> = ({
  hrAdvisorId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch();

  // Request and select hrAdvisor
  useEffect(() => {
    dispatch(fetchHrAdvisor(hrAdvisorId));
  }, [dispatch, hrAdvisorId]);
  const hrAdvisor = useSelector((state: RootState) =>
    getHrAdvisor(state, { hrAdvisorId }),
  );

  const userId = hrAdvisor?.user_id;
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);
  const user = useSelector((state: RootState) =>
    userId ? getUserById(state, { userId }) : null,
  );

  // Request and select all jobs in department
  const departmentId = user?.department_id;
  useEffect(() => {
    if (departmentId) {
      const filters = new Map();
      filters.set("department_id", departmentId);
      dispatch(fetchJobIndex(filters));
    }
  }, [departmentId, dispatch]);
  const allJobs = useSelector(getAllJobs);
  const deptJobs = useMemo(
    () =>
      hrAdvisor !== null
        ? allJobs.filter(
            (job: Job): boolean => job.department_id === user?.department_id,
          )
        : [],
    [allJobs, hrAdvisor, user],
  );

  // Request and select all managers belonging to the dept jobs
  const managers = useSelector(getManagers);
  useEffect(() => {
    const uniqueManagers: number[] = [];
    deptJobs.forEach((job: Job): void => {
      if (!uniqueManagers.includes(job.manager_id)) {
        dispatch(fetchManager(job.manager_id));
      }
      uniqueManagers.push(job.manager_id);
    });
  }, [deptJobs, dispatch]);

  // Load department names
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);
  const department = useSelector((state: RootState) =>
    user !== null ? getDepartmentById(state, user?.department_id || 0) : null,
  );
  const departmentName =
    (department !== null ? localizeField(locale, department, "name") : null) ||
    intl.formatMessage(messages.departmentPlaceholder);

  // Load Job Poster Statuses
  const jobPosterStatuses = useSelector(getJobStatuses);
  const isJobStatusesLoading = useSelector(jobStatusesLoading);
  useEffect(() => {
    if (jobPosterStatuses.length == 0 && !isJobStatusesLoading) {
      dispatch(fetchJobPosterStatuses());
    }
  }, [dispatch, jobPosterStatuses, isJobStatusesLoading]);

  // Make claim job function
  const claimJobForAdvisor = (jobId: number): boolean =>
    dispatch(claimJob(hrAdvisorId, jobId));

  return (
    <JobIndexHrPage
      claimedJobIds={hrAdvisor !== null ? hrAdvisor.claimed_job_ids : []}
      department={departmentName}
      jobs={deptJobs}
      managers={managers}
      handleClaimJob={claimJobForAdvisor}
      jobPosterStatuses={jobPosterStatuses}
    />
  );
};

const container = document.getElementById("job-index-hr");
if (container !== null) {
  if ("hrAdvisorId" in container.dataset) {
    const hrAdvisorId = Number(container.dataset.hrAdvisorId as string);
    ReactDOM.render(
      <RootContainer>
        <JobIndexHrDataFetcher hrAdvisorId={hrAdvisorId} />
      </RootContainer>,
      container,
    );
  }
}

export default JobIndexHrPage;
