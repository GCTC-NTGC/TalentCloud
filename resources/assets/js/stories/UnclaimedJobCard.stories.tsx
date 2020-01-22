import React from "react";
import { storiesOf } from "@storybook/react";
import { text, select, array } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import UnclaimedJobCard from "../components/UnclaimedJobCard";
import { JobStatus } from "../models/lookupConstants";
import { unclaimedJobs } from "../components/HRPortal/fixtures";

const stories = storiesOf("Components|Unclaimed Job Card", module).addDecorator(
  withIntl,
);

const statusOptions = {
  Approved: JobStatus.Approved,
  Closed: JobStatus.Closed,
  Complete: JobStatus.Complete,
  Draft: JobStatus.Draft,
  Open: JobStatus.Open,
  Review: JobStatus.Review,
};

stories
  .add(
    "Unclaimed",
    (): React.ReactElement => (
      <div data-c-container="large" data-c-padding="tb(triple)">
        <UnclaimedJobCard
          jobTitle={text("Title", "CS01 - Front-end Developer", "Props")}
          createdAt={text("Created At", "Created: 2019-MAY-02", "Props")}
          status={select("Status", statusOptions, JobStatus.Draft, "Props")}
          hiringManagers={array(
            "Hiring Managers",
            ["Rebecca Appleby"],
            ",",
            "Props",
          )}
          hrAdvisors={[]}
          handleClaimJob={action("Claim Job")}
        />
      </div>
    ),
  )
  .add(
    "Claimed",
    (): React.ReactElement => (
      <div data-c-container="large" data-c-padding="tb(triple)">
        <UnclaimedJobCard
          jobTitle={text("Title", "AS02 - Executive Assisstant", "Props")}
          createdAt={text("Created At", "Created: 2019-MAY-02", "Props")}
          status={select("Status", statusOptions, JobStatus.Draft, "Props")}
          hiringManagers={array(
            "Hiring Managers",
            ["Rebecca Appleby"],
            ",",
            "Props",
          )}
          hrAdvisors={array(
            "HR Managers",
            ["Rebecca Appleby", "Jack Little"],
            ",",
            "Props",
          )}
          handleClaimJob={action("Claim Job")}
        />
      </div>
    ),
  )
  .add(
    "Grid",
    (): React.ReactElement => (
      <div data-c-container="large" data-c-padding="tb(triple)">
        <div data-c-grid="gutter">
          {unclaimedJobs.map(
            ({
              jobTitle,
              createdAt,
              status,
              hiringManagers,
              hrAdvisors,
            }): React.ReactElement => {
              return (
                <UnclaimedJobCard
                  key={jobTitle}
                  jobTitle={jobTitle}
                  createdAt={createdAt}
                  status={status}
                  hiringManagers={hiringManagers}
                  hrAdvisors={hrAdvisors}
                  handleClaimJob={action("Claim Job")}
                />
              );
            },
          )}
        </div>
      </div>
    ),
  );
