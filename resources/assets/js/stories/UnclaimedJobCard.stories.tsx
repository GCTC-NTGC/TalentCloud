import React from "react";
import { storiesOf } from "@storybook/react";
import { text, select, array } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import UnclaimedJobCard from "../components/UnclaimedJobCard";
import { JobStatus } from "../models/lookupConstants";

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

const unclaimedJobs = [
  {
    title: "CS01 - Front-end Developer",
    createdAt: "2019-MAY-02",
    status: JobStatus.Draft,
    hiringManagers: ["Rebecca Appleby"],
    hrAdvisors: [],
  },
  {
    title: "AS02 - Executive Assisstant",
    createdAt: "2019-MAR-12",
    status: JobStatus.Draft,
    hiringManagers: ["Rebecca Appleby"],
    hrAdvisors: ["Rebecca Appleby", "Jack Little"],
  },
  {
    title: "ET03 - Business Analyst",
    createdAt: "2019-DEC-02",
    status: JobStatus.Review,
    hiringManagers: ["Robin Browne"],
    hrAdvisors: [],
  },
  {
    title: "FG05 - Long-term Care Specialist",
    createdAt: "2019-MAY-14",
    status: JobStatus.Draft,
    hiringManagers: ["Braeden McDoogal"],
    hrAdvisors: ["Caitlyn Summers", "Jack Little"],
  },
  {
    title: "CS03 - Digital Product Designer",
    createdAt: "2019-JUL-24",
    status: JobStatus.Review,
    hiringManagers: ["Amelie Lachance"],
    hrAdvisors: [],
  },
];

stories
  .add(
    "Unclaimed",
    (): React.ReactElement => (
      <div data-c-container="large" data-c-padding="tb(triple)">
        <UnclaimedJobCard
          title={text("Title", "CS01 - Front-end Developer", "Props")}
          createdAt={text("Created At", "Created: 2019-MAY-02", "Props")}
          status={select("Status", statusOptions, JobStatus.Draft, "Props")}
          hiringManagers={array(
            "Hiring Managers",
            ["Rebecca Appleby"],
            ",",
            "Props",
          )}
          hrAdvisors={[]}
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
              createdAt,
              status,
              hiringManagers,
              hrAdvisors,
            }): React.ReactElement => {
              return (
                <UnclaimedJobCard
                  key={title}
                  title={title}
                  createdAt={createdAt}
                  status={status}
                  hiringManagers={hiringManagers}
                  hrAdvisors={hrAdvisors}
                />
              );
            },
          )}
        </div>
      </div>
    ),
  );
