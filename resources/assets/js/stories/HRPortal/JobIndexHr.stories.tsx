import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import JobIndexHr from "../../components/HRPortal/JobIndexHr";
import { jobActions, unclaimedJobs } from "../../components/HRPortal/fixtures";

const stories = storiesOf("HR Portal|Job Index", module).addDecorator(withIntl);

stories
  .add(
    "Jobs",
    (): React.ReactElement => (
      <JobIndexHr
        jobActions={jobActions}
        unclaimedJobs={unclaimedJobs.map(unclaimed => ({
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
      <JobIndexHr
        jobActions={[]}
        unclaimedJobs={[]}
        departmentName={text(
          "Department",
          "Treasury Board of Canada Secretariat",
        )}
      />
    ),
  );
