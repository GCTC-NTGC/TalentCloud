import React from "react";
import { storiesOf } from "@storybook/react";
import { text, array } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import UnclaimedJobCard from "../components/UnclaimedJobCard";
import {
  unclaimedJobs,
  jobPosterStatuses,
} from "../components/HRPortal/fixtures";

const stories = storiesOf("Components/Unclaimed Job Card", module).addDecorator(
  withIntl,
);

stories
  .add(
    "Unclaimed",
    (): React.ReactElement => (
      <div data-c-container="large" data-c-padding="tb(triple)">
        <UnclaimedJobCard
          id={1}
          jobLink={{
            url: text("Url", "", "Props"),
            title: "",
            text: text("Title", "CS01 - Front-end Developer", "Props"),
          }}
          reviewRequested={new Date()}
          status={jobPosterStatuses.Live}
          hiringManager={text("Hiring Manager", "Rebecca Appleby")}
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
          id={2}
          jobLink={{
            url: text("Url", "", "Props"),
            title: "",
            text: text("Title", "AS02 - Executive Assisstant", "Props"),
          }}
          reviewRequested={new Date()}
          status={jobPosterStatuses.Live}
          hiringManager={text("Hiring Managers", "Rebecca Appleby")}
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
              id,
              jobLink,
              reviewRequested,
              status,
              hiringManager,
              hrAdvisors,
            }): React.ReactElement => {
              return (
                <UnclaimedJobCard
                  id={id}
                  key={jobLink.text}
                  jobLink={jobLink}
                  reviewRequested={reviewRequested}
                  status={status}
                  hiringManager={hiringManager}
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
