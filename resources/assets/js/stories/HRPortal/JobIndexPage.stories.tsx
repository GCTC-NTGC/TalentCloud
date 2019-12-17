import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import JobIndexPage from "../../components/HRPortal/JobIndexPage";
import { jobActions, unclaimedJobs } from "../../components/HRPortal/fixtures";

const stories = storiesOf("HR Portal|Job Index Page", module).addDecorator(
  withIntl,
);

stories
  .add(
    "Jobs",
    (): React.ReactElement => (
      <JobIndexPage
        jobActions={jobActions}
        unclaimedJobs={unclaimedJobs.map(unclaimed => ({
          ...unclaimed,
          claimJob: action(`Claim Job ${unclaimed.title}`),
        }))}
        departmentName={text(
          "Department",
          "Treasury Board of Canada Secretariat",
        )}
      />
    ),
  )
  .add(
    "No Jobs",
    (): React.ReactElement => (
      <JobIndexPage
        jobActions={[]}
        unclaimedJobs={[]}
        departmentName={text(
          "Department",
          "Treasury Board of Canada Secretariat",
        )}
      />
    ),
  );
