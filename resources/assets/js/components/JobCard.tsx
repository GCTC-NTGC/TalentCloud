import React from "react";
import { useIntl, defineMessages, FormattedMessage } from "react-intl";

export enum JobStatus {
  Approved = "Approved",
  Closed = "Closed",
  Complete = "Complete",
  Draft = "Draft",
  Published = "Published",
  Review = "Review",
}

interface Link {
  url: string | null;
  text: string;
  title: string;
}

interface Activity {
  count: number;
  new: Link;
}

const statuses = defineMessages({
  Approved: {
    id: "jobCard.status.approved",
    description: "Text displayed for a Job Status of Approved.",
    defaultMessage: "Approved",
  },
  Closed: {
    id: "jobCard.status.closed",
    description: "Text displayed for a Job Status of Closed.",
    defaultMessage: "Closed",
  },
  Complete: {
    id: "jobCard.status.complete",
    description: "Text displayed for a Job Status of Complete.",
    defaultMessage: "Complete",
  },
  Draft: {
    id: "jobCard.status.draft",
    description: "Text displayed for a Job Status of Draft.",
    defaultMessage: "Draft",
  },
  Published: {
    id: "jobCard.status.published",
    description: "Text displayed for a Job Status of Published.",
    defaultMessage: "Published",
  },
  Review: {
    id: "jobCard.status.review",
    description: "Text displayed for a Job Status of In Review.",
    defaultMessage: "In Review",
  },
});

interface StatusPillProps {
  status: JobStatus;
  text: string;
}

const StatusPill: React.FC<StatusPillProps> = ({ text, status }) => (
  <span
    data-c-tag={status === JobStatus.Published ? "go" : "c1"}
    data-c-font-size="small"
    data-c-radius="pill"
    data-c-margin="right(half)"
  >
    {text}
  </span>
);

interface JobCardProps {
  activity: Activity;
  applicants: number;
  classification: string;
  draft: Link;
  managerTime: number;
  owned: boolean;
  preview: Link;
  screeningPlan: Link;
  summary: Link;
  status: JobStatus;
  title: string;
  userTime: number;
}

const JobCard: React.FC<JobCardProps> = ({
  activity,
  applicants,
  classification,
  draft,
  managerTime,
  owned,
  preview,
  screeningPlan,
  status,
  summary,
  title,
  userTime,
}) => {
  const intl = useIntl();
  return (
    <div
      data-c-card=""
      data-c-background="white(100)"
      data-c-radius="rounded"
      data-tc-status="in review"
      data-c-padding="all(normal)"
      data-c-margin="bottom(normal)"
    >
      <div data-c-grid="gutter middle">
        <div data-c-grid-item="tl(5of10)">
          <h2 data-c-margin="bottom(normal)" data-c-font-size="h3">
            {`${classification} - `}
            <span data-c-font-weight="bold" data-c-margin="right(normal)">
              {title}
            </span>
            <StatusPill
              text={intl.formatMessage(statuses[status])}
              status={status}
            />
          </h2>

          <p data-c-font-size="small" data-c-margin="top(normal)">
            {draft.url !== null ? (
              <a
                href={draft.url}
                title={draft.title}
                data-c-margin="right(half)"
              >
                {draft.text}
              </a>
            ) : (
              <span data-c-color="gray" data-c-margin="right(half)">
                {draft.text}
              </span>
            )}
            {preview.url !== null ? (
              <a
                href={preview.url}
                title={preview.title}
                data-c-margin="right(half)"
              >
                {preview.text}
              </a>
            ) : (
              <span data-c-color="gray" data-c-margin="right(half)">
                {preview.text}
              </span>
            )}
            {screeningPlan.url !== null ? (
              <a
                href={screeningPlan.url}
                title={screeningPlan.title}
                data-c-margin="right(half)"
              >
                {screeningPlan.text}
              </a>
            ) : (
              <span data-c-color="gray" data-c-margin="right(half)">
                {screeningPlan.text}
              </span>
            )}
            <span data-c-color="gray" data-c-margin="right(half)">
              <FormattedMessage
                id="jobCard.applicants"
                defaultMessage={`{applicants, plural,
                  =0 {No Applicants}
                  one {# Applicant}
                  other {# Applicants}
                }`}
                description="Text displaying how many applicants have applied to this Job."
                values={{
                  applicants,
                }}
              />
            </span>
          </p>
        </div>
        <div data-c-grid-item="tl(3of10)">
          <div data-c-grid="gutter">
            <div data-c-grid-item="base(1of1)">
              <p data-c-font-size="small">
                <FormattedMessage
                  id="jobCard.managerTime"
                  defaultMessage={`Time with Manager: {managerTime, plural,
                    one {# day}
                    other {# days}
                  }`}
                  description="Text displaying how long a job post has been claimed by a manager."
                  values={{
                    managerTime,
                  }}
                />
              </p>
              <p data-c-font-size="small" className={owned ? "pulse" : ""}>
                <FormattedMessage
                  id="jobCard.userTime"
                  defaultMessage={`Time with you: <s>{userTime, plural,
                    one {# day}
                    other {# days}
                  }</s>`}
                  description="Text displaying how long a job has been claimed by the current user."
                  values={{
                    s: (msg): JSX.Element => <span>{msg}</span>,
                    userTime,
                  }}
                />
              </p>
              {activity.count > 0 && activity.new.url !== null ? (
                <a
                  href={activity.new.url}
                  title={activity.new.title}
                  data-c-font-size="small"
                  data-c-margin="top(half)"
                  data-c-color="stop"
                >
                  {`${activity.new.text} (${activity.count})`}
                </a>
              ) : (
                <p
                  data-c-font-size="small"
                  data-c-margin="top(half)"
                  data-c-color="gray"
                >
                  <FormattedMessage
                    id="jobCard.noActivity"
                    defaultMessage="No New Activity"
                    description="Fallback text for no new activity on a Job."
                  />
                </p>
              )}
            </div>
          </div>
        </div>
        <div data-c-grid-item="tl(2of10)" data-c-align="base(center)">
          <a
            href={summary.url !== null ? summary.url : "#"}
            title={summary.title}
            data-c-button="solid(c1)"
            data-c-radius="rounded"
          >
            {summary.text}
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
