/* eslint-disable camelcase */
import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { defineMessages, IntlShape, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import JobIndexHr from "./JobIndexHr";
import { JobCardProps } from "../JobCard";
import { Job, Manager } from "../../models/types";
import { classificationString, jobStatus } from "../../models/jobUtil";
import { localizeField, Locales } from "../../helpers/localize";
import {
  hrJobSummary,
  hrJobReview,
  hrJobPreview,
  hrScreeningPlan,
} from "../../helpers/routes";
import { UnclaimedJobCardProps } from "../UnclaimedJobCard";
import { readableDateTime } from "../../helpers/dates";
import { find, stringNotEmpty } from "../../helpers/queries";
import {
  getHrAdvisor as fetchHrAdvisor,
  claimJob,
} from "../../store/HrAdvisor/hrAdvisorActions";
import { getHrAdvisor } from "../../store/HrAdvisor/hrAdvisorSelector";
import { RootState } from "../../store/store";
import { fetchJobIndex } from "../../store/Job/jobActions";
import { getAllJobs } from "../../store/Job/jobSelector";
import { departmentName } from "../../models/localizedConstants";
import RootContainer from "../RootContainer";
import {
  getManagers,
  getManagerIsUpdatingById,
} from "../../store/Manager/managerSelector";
import { fetchManager } from "../../store/Manager/managerActions";

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
): JobCardProps => {
  const jobTitle = localizeField(locale, job, "title");
  return {
    applicants: 0, // TODO: find real number of applicants.
    // TODO: is this intended to be a link as well, like activity?
    classification: classificationString(job),
    managerTime: 0, // TODO: This isn't recorded yet.
    userTime: 0, // TODO: This isn't recorded yet.
    owned: true,
    title: stringNotEmpty(jobTitle)
      ? jobTitle
      : intl.formatMessage(messages.titleMissing),
    status: jobStatus(job),
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
): UnclaimedJobCardProps => {
  const jobTitle = localizeField(locale, job, "title");
  return {
    jobLink: {
      url: hrJobPreview(locale, job.id),
      text: stringNotEmpty(jobTitle)
        ? jobTitle
        : intl.formatMessage(messages.titleMissing),
      title: "",
    },
    createdAt: readableDateTime(locale, job.created_at),
    status: jobStatus(job),
    hiringManagers: [
      manager !== null
        ? manager.full_name
        : intl.formatMessage(messages.loadingManager),
    ],
    hrAdvisors: [], // TODO: We can get all claims of an advisor, but don't have an api route for gettings advisors for a job!
    handleClaimJob,
  };
};

interface JobIndexHrPageProps {
  claimedJobIds: number[];
  department: string;
  jobs: Job[];
  managers: Manager[];
  handleClaimJob: (jobId: number) => void;
}

const JobIndexHrPage: React.FC<JobIndexHrPageProps> = ({
  claimedJobIds,
  department,
  jobs,
  managers,
  handleClaimJob,
}) => {
  const intl = useIntl();
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }

  const isClaimed = (job: Job): boolean => claimedJobIds.includes(job.id);
  const isUnclaimed = (job: Job): boolean => !isClaimed(job);

  const jobToAction = (job: Job): JobCardProps =>
    makeJobAction(intl, locale, job);

  const jobToUnclaimed = (job: Job): UnclaimedJobCardProps =>
    makeUnclaimedJob(
      intl,
      locale,
      () => handleClaimJob(job.id),
      find(managers, job.manager_id),
      job,
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
  const dispatch = useDispatch();

  // Request and select hrAdvisor
  useEffect(() => {
    dispatch(fetchHrAdvisor(hrAdvisorId));
  }, [dispatch, hrAdvisorId]);
  const hrAdvisor = useSelector((state: RootState) =>
    getHrAdvisor(state, { hrAdvisorId }),
  );

  // Request and select all jobs in department
  const departmentId = hrAdvisor?.department_id;
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
            (job: Job): boolean =>
              job.department_id === hrAdvisor.department_id,
          )
        : [],
    [allJobs, hrAdvisor],
  );

  // Request and select all managers belonging to the dept jobs
  const managers = useSelector(getManagers);
  const managersUpdating = useSelector(getManagerIsUpdatingById);
  deptJobs.forEach((job: Job): void => {
    if (
      find(managers, job.manager_id) === null &&
      managersUpdating[job.manager_id] !== true
    ) {
      dispatch(fetchManager(job.manager_id));
    }
  });

  // Make claim job function
  const claimJobForAdvisor = (jobId: number): any =>
    dispatch(claimJob(hrAdvisorId, jobId));

  const department =
    hrAdvisor !== null
      ? intl.formatMessage(departmentName(hrAdvisor.department_id))
      : intl.formatMessage(messages.departmentPlaceholder);

  return (
    <JobIndexHrPage
      claimedJobIds={hrAdvisor !== null ? hrAdvisor.claimed_job_ids : []}
      department={department}
      jobs={deptJobs}
      managers={managers}
      handleClaimJob={claimJobForAdvisor}
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
