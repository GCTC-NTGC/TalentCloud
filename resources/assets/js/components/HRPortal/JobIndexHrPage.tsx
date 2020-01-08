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
import { find, stringNotEmpty } from "../../helpers/queries";

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

const messages = defineMessages({
  loadingManager: {
    id: "hrJobIndex.managerLoading",
    defaultMessage: "Loading...",
    description: "Placehold text for a manager's name, while data is loading.",
  },
  titleMissing: {
    id: "hrJobIndex.jobTitleMissing",
    defaultMessage: "Title Missing",
    description: "Placeholder text for a missing Job title."
  }
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
    title: stringNotEmpty(jobTitle) ? jobTitle : intl.formatMessage(messages.titleMissing),
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
