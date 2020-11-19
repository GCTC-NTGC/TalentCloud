/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import ApplicationRow from "../../components/ApplicationReview/ApplicationRow";
import {
  fakeApplication1,
  fakeApplicationReview,
} from "../../fakeData/fakeApplications";
import { ApplicationReview } from "../../models/types";
import { ReviewStatusId } from "../../models/lookupConstants";

const stories = storiesOf("Review Applications|Row", module).addDecorator(
  withIntl,
);

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const promiseAction = (name: string, review: ApplicationReview) => async () => {
  sleep(1000);
  action(name)();
  return review;
};

const sampleApplication = fakeApplication1();

const veteranApplication = fakeApplication1({
  veteran_status: { id: 2, name: "current" },
  application_review: fakeApplicationReview({
    review_status: undefined,
    review_status_id: null,
  }),
});

const priorityApplication = fakeApplication1({
  veteran_status: { id: 1, name: "none" },
  application_review: fakeApplicationReview({
    review_status: undefined,
    review_status_id: null,
    notes: null,
  }),
  applicant: {
    ...sampleApplication.applicant,
    user: { ...sampleApplication.applicant.user, is_priority: true },
  },
});

const reviewed = fakeApplication1({
  application_review: fakeApplicationReview({
    review_status: {
      id: ReviewStatusId.StillIn,
      name: "still_in",
    },
    review_status_id: ReviewStatusId.StillIn,
    notes: "This applicant passes consideration",
  }),
});

stories
  .add(
    "Veteran",
    (): React.ReactElement => (
      <section className="applicant-review container--layout-xl">
        <div className="applicant-category">
          <ApplicationRow
            application={veteranApplication}
            handleUpdateReview={() =>
              promiseAction(
                "Update Review",
                veteranApplication.application_review!,
              )()
            }
            portal={select("Portal", ["manager", "hr"], "manager")}
          />
        </div>
      </section>
    ),
  )
  .add(
    "Priority",
    (): React.ReactElement => (
      <section className="applicant-review container--layout-xl">
        <div className="applicant-category">
          <ApplicationRow
            application={priorityApplication}
            handleUpdateReview={() =>
              promiseAction(
                "Update Review",
                priorityApplication.application_review!,
              )()
            }
            portal={select("Portal", ["manager", "hr"], "manager")}
          />
        </div>
      </section>
    ),
  )
  .add(
    "Reviewed",
    (): React.ReactElement => (
      <section className="applicant-review container--layout-xl">
        <div className="applicant-category">
          <ApplicationRow
            application={reviewed}
            handleUpdateReview={() =>
              promiseAction("Update Review", reviewed.application_review!)()
            }
            portal={select("Portal", ["manager", "hr"], "manager")}
          />
        </div>
      </section>
    ),
  );
