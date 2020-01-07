import React from "react";
import JobIndexHr from "./JobIndexHr";
import { JobCardProps } from "../JobCard";
import { Job, HrAdvisor } from "../../models/types";
import { classificationString, jobStatus } from "../../models/jobUtil";
import { localizeField, Locales } from "../../helpers/localize";
import {
  hrJobSummary,
  hrJobReview,
  hrJobPreview,
  hrScreeningPlan,
} from "../../helpers/routes";
import { defineMessages, IntlShape, useIntl } from "react-intl";

interface JobIndexHrPageProps {
  claimedJobIds: number[],
}

const messages = defineMessages({
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

const makeJobAction = (
  intl: IntlShape,
  locale: Locales,
  claimedJobIds: number[],
  job: Job,
): JobCardProps => {
  return {
    applicants: 0, // TODO: find real number of applicants.
    // TODO: is this intended to be a link as well, like activity?
    classification: classificationString(job),
    managerTime: 0, // TODO: This isn't recorded yet.
    userTime: 0, // TODO: This isn't recorded yet.
    owned: claimedJobIds.includes(job.id),
    title: localizeField(locale, job, "title") || "TITLE MISSING", // TODO: How did we deal with missing titles elsewhere?
    status: jobStatus(job),
    activity: {
      count: 0, // TODO: requires tracking which comments are "new"
      new: {
        url: hrJobSummary(locale, job.id), // TODO: this should include a #link
        text: intl.formatMessage(messages.viewActivity),
        title: "",
      },
    },
    draft: {
      url: hrJobReview(locale, job.id),
      text: intl.formatMessage(messages.reviewDraft),
      title: "",
    },
    preview: {
      url: hrJobPreview(locale, job.id),
      text: intl.formatMessage(messages.preview),
      title: "",
    },
    screeningPlan: {
      url: hrScreeningPlan(locale, job.id),
      text: intl.formatMessage(messages.screeningPlan),
      title: "",
    },
    summary: {
      url: hrJobSummary(locale, job.id),
      text: intl.formatMessage(messages.viewSummary),
      title: "",
    },
  };
};

const JobIndexHrPage: React.FC<JobIndexHrPageProps> = ({ claimedJobIds }) => {
  const intl = useIntl();
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }

  const jobActions = [];
  const unclaimedJobs = [];
  const departmentName = "dept";

  const jobToAction = (job: Job) =>
    makeJobAction(intl, locale, claimedJobIds, job);

  return (
    <JobIndexHr
      jobActions={jobActions}
      unclaimedJobs={unclaimedJobs}
      departmentName={departmentName}
    />
  );
};
