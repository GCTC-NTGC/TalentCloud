import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { JobStatus } from "../models/lookupConstants";
import { Link } from "../models/app";
import { jobStatus } from "../models/localizedConstants";

export interface UnclaimedJobCardProps {
  jobLink: Link;
  createdAt: string;
  status: JobStatus;
  hiringManagers: string[];
  hrAdvisors: string[];
  handleClaimJob: () => void;
}

const UnclaimedJobCard: React.FunctionComponent<UnclaimedJobCardProps> = ({
  jobLink,
  createdAt,
  status,
  hiringManagers,
  hrAdvisors,
  handleClaimJob,
}) => {
  const intl = useIntl();
  return (
    <div
      data-c-grid-item="tp(1of2) tl(1of3) equal-col"
      className="tc-hr-job-card"
    >
      <div data-c-card data-c-radius="rounded" data-c-background="white(100)">
        <a
          href={jobLink.url}
          title={jobLink.title}
          style={{ textDecoration: "none" }}
        >
          <div data-c-background="black(100)" data-c-padding="all(normal)">
            <div data-c-grid="gutter middle">
              <div data-c-grid-item="base(1of1)">
                <p
                  data-c-font-size="h4"
                  data-c-colour="white"
                  data-c-font-style="underline"
                >
                  {jobLink.text}
                </p>
              </div>
              <div data-c-grid-item="base(1of2)">
                <p data-c-colour="white" data-c-font-size="small">
                  <FormattedMessage
                    id="openJobCard.createdAt"
                    description="Header for when Job Poster was created."
                    defaultMessage="Created: "
                  />
                  {createdAt}
                </p>
              </div>
              <div data-c-grid-item="base(1of2)" data-c-align="base(right)">
                <span
                  data-c-color="white"
                  data-c-border="all(thin, solid, white)"
                  data-c-padding="tb(quarter) rl(half)"
                  data-c-font-size="small"
                  data-c-radius="pill"
                >
                  {intl.formatMessage(jobStatus(status))}
                </span>
              </div>
            </div>
          </div>
          <div data-c-padding="all(normal)">
            <p data-c-color="black" data-c-margin="bottom(normal)">
              <FormattedMessage
                id="openJobCard.hiringManager"
                description="Header before list of hiring managers."
                defaultMessage="Hiring Managers: "
              />

              {hiringManagers.map((manager, index): string => {
                const comma =
                  hiringManagers.length !== 1 &&
                  index + 1 !== hiringManagers.length
                    ? ","
                    : " ";
                return `${manager}${comma} `;
              })}
            </p>

            {hrAdvisors.length > 0 ? (
              <p data-c-color="black" data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="openJobCard.hrAdvisors"
                  description="Header before list of HR advisors."
                  defaultMessage="HR Advisors: "
                />
                {hrAdvisors.map((advisor, index): string => {
                  const comma =
                    hrAdvisors.length !== 1 && index + 1 !== hrAdvisors.length
                      ? ","
                      : " ";
                  return `${advisor}${comma} `;
                })}
              </p>
            ) : (
              <p data-c-color="stop" data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="openJobCard.unclaimed"
                  description="Message displayed if not HR managers have claimed a job."
                  defaultMessage="Unclaimed"
                />
              </p>
            )}
          </div>
        </a>
        <div
          data-c-padding="all(normal)"
          data-c-border="top(thin, solid, black)"
          data-c-align="base(right)"
        >
          <button
            data-c-button="solid(c2)"
            data-c-radius="rounded"
            type="button"
            onClick={handleClaimJob}
          >
            <span data-c-color="black">
              +{" "}
              <span data-c-font-style="underline">
                <FormattedMessage
                  id="openJobCard.claimJob"
                  description="Message indicating the event of clicking on the job card."
                  defaultMessage="Claim This Job"
                />
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnclaimedJobCard;
