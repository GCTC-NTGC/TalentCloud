import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import ApplicantBucket from "../../components/StrategicTalentResponse/ResponseScreening/ApplicantBucket";
import fakeApplications from "../../fakeData/fakeApplications";
import fakeDepartments from "../../fakeData/fakeDepartments";
import { ApplicationReview } from "../../models/types";

const handleUpdateReview = (
  review: ApplicationReview,
): Promise<ApplicationReview> => Promise.resolve(review);

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
          handleUpdateReview={handleUpdateReview}
          portal="manager"
        />
      </div>
    );
  },
);
