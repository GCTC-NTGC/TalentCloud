import React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { JobStatus } from "../models/lookupConstants";
import { Link } from "../models/app";
import { JobPosterStatus } from "../models/types";
import { localizeFieldNonNull, getLocale } from "../helpers/localize";

interface Activity {
  count: number;
  new: Link;
}

interface StatusPillProps {
  status: JobPosterStatus;
  text: string;
}

const StatusPill: React.FC<StatusPillProps> = ({ text, status }) => (
  <span
    data-c-tag={status.key === JobStatus.Completed ? "go" : "c1"}
    data-c-font-size="small"
    data-c-radius="pill"
    data-c-margin="right(half)"
  >
    {text}
  </span>
);

export interface JobCardProps {
  id: number;
  activity: Activity;
  classification: string;
  draft: Link;
  managerTime: number;
  owned: boolean;
  preview: Link;
  screeningPlan: Link;
  summary: Link;
  applicants: Link;
  status: JobPosterStatus;
  title: string;
  userTime: number;
}

const JobCard: React.FC<JobCardProps> = ({
  activity,
  classification,
  draft,
  managerTime,
  owned,
  preview,
  screeningPlan,
  status,
  summary,
  applicants,
  title,
  userTime,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
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
              text={localizeFieldNonNull(locale, status, "name")}
              status={status}
            />
          </h2>

          <p data-c-font-size="small" data-c-margin="top(normal)">
            {draft.url.length > 0 ? (
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
            {preview.url.length > 0 ? (
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
            {screeningPlan.url.length > 0 ? (
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
            {applicants.url.length > 0 ? (
              <a
                href={applicants.url}
                title={applicants.title}
                data-c-margin="right(half)"
              >
                {applicants.text}
              </a>
            ) : (
              <span data-c-color="gray" data-c-margin="right(half)">
                {applicants.text}
              </span>
            )}
          </p>
        </div>
        <div data-c-grid-item="tl(3of10)">
          <div data-c-grid="gutter">
            <div data-c-grid-item="base(1of1)">
              <p data-c-font-size="small">
                <FormattedMessage
                  id="jobCard.managerTime"
                  defaultMessage="Time with Manager: {managerTime, plural, one {# day} other {# days}}"
                  description="Text displaying how long a job post has been claimed by a manager."
                  values={{
                    managerTime,
                  }}
                />
              </p>
              <p data-c-font-size="small" className={owned ? "pulse" : ""}>
                <FormattedMessage
                  id="jobCard.userTime"
                  defaultMessage="Time with you: <s>{userTime, plural, one {# day} other {# days}}</s>"
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
