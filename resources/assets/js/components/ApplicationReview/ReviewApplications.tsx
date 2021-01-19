import React, { useCallback } from "react";
import dayjs from "dayjs";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";
import {
  Application,
  Comment,
  ApplicationReview,
  Job,
} from "../../models/types";
import { applicationCategory } from "./helpers";
import ReviewCategory from "./ReviewCategory";
import ActivityFeed from "../ActivityFeed";
import { applicantReviewLocations } from "../../models/localizedConstants";
import {
  LocationId,
  getKeyByValue,
  ClassificationId,
} from "../../models/lookupConstants";
import { Portal } from "../../models/app";
import { hasKey } from "../../helpers/queries";
import { localizeField, getLocale } from "../../helpers/localize";

const messages = defineMessages({
  underConsiderationTitle: {
    id: "review.applications.underConsideration.title",
    defaultMessage: "Under Consideration",
    description: "Under consideration category title",
  },
  underConsiderationDescription: {
    id: "review.applications.underConsideration.description",
    defaultMessage:
      "Review the applicants in the Veterans and Canadian Citizens section. If none or very few of these applicants meet the requirements, you can still consider non-Canadian Citizen applications in the Optional Consideration section",
    description: "Under consideration category description",
  },
  optionalConsiderationTitle: {
    id: "review.applications.optionalConsideration.title",
    defaultMessage: "Optional Consideration",
    description: "Optional consideration category title",
  },
  optionalConsiderationDescription: {
    id: "review.applications.optionalConsideration.description",
    defaultMessage:
      "In this group you will find the applicants who are not Canadian Citizens or do not claim to meet the essential criteria.",
    description: "Optional consideration category description",
  },
  screenedOutTitle: {
    id: "review.applications.screenedOut.title",
    defaultMessage: "No Longer Under Consideration",
    description: "Screened out category title",
  },
  screenedOutDescription: {
    id: "review.applications.screenedOut.description",
    defaultMessage: "These applications have already been screened out.",
    description: "Screened out category description",
  },
});

interface ReviewApplicationsProps {
  job: Job;
  applications: Application[];
  handleUpdateReview: (review: ApplicationReview) => Promise<void>;
  handleBatchUpdateApplicationReviews: (
    reviews: ApplicationReview[]
  ) => Promise<void>;
  portal: Portal;
}

const ReviewApplications: React.StatelessComponent<ReviewApplicationsProps> = ({
  job,
  applications,
  handleBatchUpdateApplicationReviews,
  handleUpdateReview,
  portal,
}: ReviewApplicationsProps): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const classification: string = getKeyByValue(
    ClassificationId,
    job.classification_id,
  );
  const categories = [
    {
      id: messages.underConsiderationTitle.id,
      title: intl.formatMessage(messages.underConsiderationTitle),
      description: intl.formatMessage(messages.underConsiderationDescription),
      showScreenOutAll: false,
      applications: applications.filter(
        (application) => applicationCategory(application) === "primary",
      ),
      prioritizeVeterans: false,
    },
    {
      id: messages.optionalConsiderationTitle.id,
      title: intl.formatMessage(messages.optionalConsiderationTitle),
      description: intl.formatMessage(
        messages.optionalConsiderationDescription,
      ),
      showScreenOutAll: true,
      applications: applications.filter(
        (application): boolean =>
          applicationCategory(application) === "optional",
      ),
      prioritizeVeterans: true,
    },
    {
      id: messages.screenedOutTitle.id,
      title: intl.formatMessage(messages.screenedOutTitle),
      description: intl.formatMessage(messages.screenedOutDescription),
      showScreenOutAll: false,
      applications: applications.filter(
        (application): boolean =>
          applicationCategory(application) === "screened-out",
      ),
      prioritizeVeterans: true,
    },
  ];

  const filterComments = useCallback(
    (comment: Comment): boolean =>
      hasKey(applicantReviewLocations, comment.location),
    [],
  );

  // TODO: Think more carefully about how to handle null fields
  const dayCount = dayjs().diff(
    job.close_date_time ? dayjs(job.close_date_time) : dayjs(),
    "day",
  );

  return (
    <section className="applicant-review container--layout-xl">
      <div className="flex-grid gutter">
        <div className="box med-1of2 job-title-wrapper">
          <span>
            {dayCount > 0 ? (
              <FormattedMessage
                id="review.applications.applicationsAfterClosed"
                defaultMessage="Applications for: {jobTitle} {jobClassification}"
                description="Welcome header on Job Applications index page"
                values={{
                  jobTitle: localizeField(locale, job, "title"),
                  jobClassification: classification,
                }}
              />
            ) : (
              <FormattedMessage
                id="review.applications.applicationsBeforeClosed"
                defaultMessage="Applications to date: {jobTitle} {jobClassification}"
                description="Welcome header on Job Applications index page"
                values={{
                  jobTitle: localizeField(locale, job, "title"),
                  jobClassification: classification,
                }}
              />
            )}
          </span>
        </div>

        <div className="box med-1of2 timer-wrapper">
          <i className="fas fa-stopwatch" />
          {` `}
          {dayCount >= 0 ? (
            <FormattedMessage
              id="job.daysAfterClosed"
              defaultMessage="{dayCount, plural,
              =0 {Closes Today}
            one {# Day Since Close}
          other {# Days Since Close}
        }"
              description="Shows the number of days after the job closed."
              values={{
                dayCount: Math.abs(dayCount),
              }}
            />
          ) : (
            <FormattedMessage
              id="job.daysBeforeClosed"
              defaultMessage="{dayCount, plural,
            one {# Day}
          other {# Days}
          } Until Close"
              description="Shows the number of days before the job closes."
              values={{
                dayCount: Math.abs(dayCount),
              }}
            />
          )}
        </div>
      </div>
      <div data-clone>
        <div data-c-margin="bottom(1)">
          <ActivityFeed
            jobId={job.id}
            isHrAdvisor={portal === "hr"}
            generalLocation={LocationId.applicantsGeneric}
            locationMessages={applicantReviewLocations}
            filterComments={filterComments}
          />
        </div>
      </div>
      {categories.map(
        (category): React.ReactElement => (
          <ReviewCategory
            key={category.id}
            {...category}
            handleUpdateReview={handleUpdateReview}
            handleBatchUpdateApplicationReviews={handleBatchUpdateApplicationReviews}
            portal={portal}
          />
        ),
      )}
    </section>
  );
};

export default ReviewApplications;
