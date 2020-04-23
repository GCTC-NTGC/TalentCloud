import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import ApplicantBucket from "../../components/StrategicTalentResponse/ResponseScreening/ApplicantBucket";
import fakeApplications, {
  fakeReferenceEmail,
} from "../../fakeData/fakeApplications";
import fakeDepartments from "../../fakeData/fakeDepartments";
import { ApplicationReview } from "../../models/types";

const handleUpdateReview = (
  review: ApplicationReview,
): Promise<ApplicationReview> => Promise.resolve(review);

const stories = storiesOf(
  "Strategic Talent Response|Bucket",
  module,
).addDecorator(withIntl);

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendReferenceEmail(): Promise<void> {
  action("Send reference email")();
  return sleep(1000);
}

stories.add(
  "Consideration",
  (): React.ReactElement => {
    const applications = fakeApplications();
    const referenceEmails = applications.reduce(
      (accum, application) => {
        accum.director.byApplicationId[application.id] = fakeReferenceEmail({
          subject: "Director Reference Email",
        });
        accum.secondary.byApplicationId[application.id] = fakeReferenceEmail({
          subject: "Secondary Reference Email",
        });
        return accum;
      },
      {
        director: {
          byApplicationId: {},
        },
        secondary: {
          byApplicationId: {},
        },
      },
    );
    return (
      <div data-c-accordion-group="" className="response-accordion-group">
        <ApplicantBucket
          applications={applications}
          bucket="consideration"
          departments={fakeDepartments()}
          handleUpdateReview={handleUpdateReview}
          portal="manager"
          referenceEmails={referenceEmails}
          requestReferenceEmails={action("Fetch Reference Emails")}
          sendReferenceEmail={sendReferenceEmail}
        />
      </div>
    );
  },
);
