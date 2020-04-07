import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withIntl } from "storybook-addon-intl";
import ApplicantBucket from "../../components/StrategicTalentResponse/ResponseScreening/ApplicantBucket";
import fakeApplications from "../../fakeData/fakeApplications";
import fakeDepartments from "../../fakeData/fakeDepartments";

const stories = storiesOf(
  "Strategic Talent Response|Bucket",
  module,
).addDecorator(withIntl);

stories.add(
  "Consideration",
  (): React.ReactElement => {
    return (
      <div data-c-accordion-group="" className="response-accordion-group">
        <ApplicantBucket
          applications={fakeApplications()}
          bucket="consideration"
          departments={fakeDepartments()}
          handleUpdateReview={action("Update Review")}
          portal="manager"
        />
      </div>
    );
  },
);
