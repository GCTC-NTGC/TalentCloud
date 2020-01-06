import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import JobIndexPage from "../../components/HRPortal/JobIndexPage";
import {
  fakeJobActions,
  fakeUnclaimedJobs,
} from "../../components/HRPortal/fixtures";

const stories = storiesOf("HR Portal|Job Index Page", module).addDecorator(
  withIntl,
);

stories
  .add(
    "Jobs",
    (): React.ReactElement => (
      <JobIndexPage
        jobActions={fakeJobActions}
        unclaimedJobs={fakeUnclaimedJobs.map(unclaimed => ({
          ...unclaimed,
          claimJob: action(`Claim Job ${unclaimed.jobLink.text}`),
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
