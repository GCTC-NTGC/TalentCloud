import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import ApplicantBucket from "../../components/StrategicTalentResponse/ResponseScreening/ApplicantBucket";
import fakeApplications from "../../fakeData/fakeApplications";

const stories = storiesOf(
  "Strategic Talent Response|Bucket",
  module,
).addDecorator(withIntl);

stories.add(
  "Consideration",
  (): React.ReactElement => (
    <div data-c-accordion-group="" className="response-accordion-group">
      <ApplicantBucket
        bucket="consideration"
        applications={fakeApplications()}
        portal="manager"
      />
    </div>
  ),
);
