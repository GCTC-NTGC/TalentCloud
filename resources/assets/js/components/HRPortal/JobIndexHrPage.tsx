import React from "react";
import JobIndexHr from "./JobIndexHr";
import { JobCardProps } from "../JobCard";
import { Job, HrAdvisor, Manager } from "../../models/types";
import { classificationString, jobStatus } from "../../models/jobUtil";
import { localizeField, Locales } from "../../helpers/localize";
import {
  hrJobSummary,
  hrJobReview,
  hrJobPreview,
  hrScreeningPlan,
} from "../../helpers/routes";
import { defineMessages, IntlShape, useIntl } from "react-intl";
import { UnclaimedJobCardProps } from "../UnclaimedJobCard";
import { readableDateTime } from "../../helpers/dates";
import { find } from "../../helpers/queries";

interface JobIndexHrPageProps {
  claimedJobIds: number[];
  department: string;
  jobs: Job[];
  managers: Manager[];
  claimJob: (jobId: number) => void;
}

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

const loadingMessages = defineMessages({
  loadingManager: {
    id: "hrJobIndex.managerLoading",
    defaultMessage: "Loading...",
    description: "Placehold text for a manager's name, while data is loading.",
  },
});

const makeJobAction = (
  intl: IntlShape,
  locale: Locales,
  job: Job,
): JobCardProps => {
  return {
    applicants: 0, // TODO: find real number of applicants.
    // TODO: is this intended to be a link as well, like activity?
    classification: classificationString(job),
    managerTime: 0, // TODO: This isn't recorded yet.
    userTime: 0, // TODO: This isn't recorded yet.
    owned: true,
    title: localizeField(locale, job, "title") || "TITLE MISSING", // TODO: How did we deal with missing titles elsewhere?
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
  claimJob: () => void,
  manager: Manager | null,
  job: Job,
): UnclaimedJobCardProps => {
  return {
    jobLink: {
      url: hrJobPreview(locale, job.id),
      text: localizeField(locale, job, "title") || "TITLE MISSING", // TODO: How did we deal with missing titles elsewhere?
      title: "",
    },
    createdAt: readableDateTime(locale, job.created_at),
    status: jobStatus(job),
    hiringManagers: [
      manager !== null
        ? manager.full_name
        : intl.formatMessage(loadingMessages.loadingManager),
    ],
    hrAdvisors: [], // TODO: We can get all claims of an advisor, but don't have an api route for gettings advisors for a job!
    claimJob,
  };
};

const JobIndexHrPage: React.FC<JobIndexHrPageProps> = ({
  claimedJobIds,
  department,
  jobs,
  managers,
  claimJob,
}) => {
  const intl = useIntl();
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }

  const isClaimed = (job: Job) => claimedJobIds.includes(job.id);
  const isUnclaimed = (job: Job) => !isClaimed(job);

  const jobToAction = (job: Job) => makeJobAction(intl, locale, job);

  const jobToUnclaimed = (job: Job) =>
    makeUnclaimedJob(
      intl,
      locale,
      () => claimJob(job.id),
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
