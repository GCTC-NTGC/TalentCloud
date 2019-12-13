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
  Published: JobStatus.Published,
  Review: JobStatus.Review,
};

stories
  .add(
    "Unclaimed",
    (): React.ReactElement => (
      <div data-c-container="large" data-c-padding="tb(triple)">
        <UnclaimedJobCard
          title={text("Title", "CS01 - Front-end Developer", "Props")}
          url={text("Url", "", "Props")}
          createdAt={text("Created At", "Created: 2019-MAY-02", "Props")}
          status={select("Status", statusOptions, JobStatus.Draft, "Props")}
          hiringManagers={array(
            "Hiring Managers",
            ["Rebecca Appleby"],
            ",",
            "Props",
          )}
          hrAdvisors={[]}
          claimJob={action("Claim Job")}
        />
      </div>
    ),
  )
  .add(
    "Claimed",
    (): React.ReactElement => (
      <div data-c-container="large" data-c-padding="tb(triple)">
        <UnclaimedJobCard
          title={text("Title", "AS02 - Executive Assisstant", "Props")}
          url={text("Url", "", "Props")}
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
          claimJob={action("Claim Job")}
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
              title,
              url,
              createdAt,
              status,
              hiringManagers,
              hrAdvisors,
            }): React.ReactElement => {
              return (
                <UnclaimedJobCard
                  key={title}
                  title={title}
                  url={url}
                  createdAt={createdAt}
                  status={status}
                  hiringManagers={hiringManagers}
                  hrAdvisors={hrAdvisors}
                  claimJob={action("Claim Job")}
                />
              );
            },
          )}
        </div>
      </div>
    ),
  );
