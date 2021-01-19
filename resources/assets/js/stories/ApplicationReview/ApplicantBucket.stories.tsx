/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { select, text, boolean } from "@storybook/addon-knobs";
import ApplicantBucket from "../../components/ApplicationReview/ApplicantBucket";
import {
  fakeApplication4,
  fakeApplication5,
  fakeApplication6,
} from "../../fakeData/fakeApplications";

const stories = storiesOf("Review Applications/Bucket", module).addDecorator(
  withIntl,
);

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const promiseAction = (name: string) => async () => {
  sleep(1000);
  action(name)();
};

stories.add(
  "Not Reviewed",
  (): React.ReactElement => (
    <section className="applicant-review container--layout-xl">
      <div className="applicant-category">
        <ApplicantBucket
          applications={[
            fakeApplication4(),
            fakeApplication5(),
            fakeApplication6(),
          ]}
          title={text("Title", "Optional Consideration")}
          description={text(
            "Description",
            "This category is for candidates that have not yet been screened.",
          )}
          prioritizeVeterans={boolean("Prioritize Veterans", false)}
          handleUpdateReview={() => promiseAction("Update Review")()}
          portal={select("Portal", ["manager", "hr"], "manager")}
        />
      </div>
    </section>
  ),
);
