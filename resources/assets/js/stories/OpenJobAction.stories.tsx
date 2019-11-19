import React from "react";
import { storiesOf } from "@storybook/react";
import { text, select, array } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import OpenJobAction from "../components/OpenJobAction";
import { JobStatus } from "../models/types";

const stories = storiesOf("Components|Open Job Action", module).addDecorator(
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
        <OpenJobAction
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
        <OpenJobAction
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
  );
