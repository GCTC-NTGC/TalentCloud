import React, { useState } from "react";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Application, ApplicationReview } from "../../models/types";
import { applicationBucket } from "./helpers";
import ApplicantBucket from "./ApplicantBucket";
import { ReviewStatusId } from "../../models/lookupConstants";
import { copyToClipboard } from "../../helpers/clipboard";
import { Portal } from "../../models/app";

interface ReviewCategoryProps {
  title: string;
  description: string;
  showScreenOutAll: boolean;
  applications: Application[];
  handleBatchUpdateApplicationReviews: (
    applicationReviews: ApplicationReview[],
  ) => Promise<void>;
  handleUpdateReview: (review: ApplicationReview) => Promise<void>;
  prioritizeVeterans: boolean;
  portal: Portal;
}

const messages = defineMessages({
  priorityApplicantsTitle: {
    id: "review.applications.priorityApplicants.title",
    defaultMessage: "Priority Applicants",
    description: "title of list of priority applicants",
  },
  priorityApplicantsDescription: {
    id: "review.applications.priorityApplicants.description",
    defaultMessage:
      "These are priority applicants for this position. They must be reviewed and considered first.",
    description: "description of list of priority applicants",
  },
  veteransAndCitizensTitle: {
    id: "review.applications.veteransAndCitizens.title",
    defaultMessage: "Veterans and Canadian Citizens",
    description: "title of list of Veterans and Canadian citizens",
  },
  veteransAndCitizensDescriptions: {
    id: "review.applications.veteransAndCitizens.description",
    defaultMessage: " ",
    description: "description of list of Veterans and Canadian citizens",
  },
  nonCitizensTitle: {
    id: "review.applications.nonCitizens.title",
    defaultMessage: "Non-Canadian Citizens",
    description: "title of list of non-citizen applicants",
  },
  nonCitizensDescription: {
    id: "review.applications.nonCitizens.description",
    defaultMessage: " ",
    description: "description of list of non-citizen applicants",
  },
  unqualifiedTitle: {
    id: "review.applications.unqualified.title",
    defaultMessage: "Don't Meet Essential Criteria",
    description:
      "title of list of applicants who do not meet the essential criteria",
  },
  unqualifiedDescription: {
    id: "review.applications.unqualified.description",
    defaultMessage: " ",
    description:
      "description of list of applicants who do not meet the essential criteria",
  },
  confirmButton: {
    id: "review.applications.button.confirm",
    defaultMessage: "Confirm",
    description: "Confirm button for modal dialogue boxes",
  },
  screenOutAllConfirm: {
    id: "review.applications.screenOutAll.confirm",
    defaultMessage:
      "Are you sure you want to screen out all Optional candidates?",
    description:
      "Confirm dialogue text for screening out all optional candidates.",
  },
  buttonCopied: {
    id: "review.applications.button.copied",
    defaultMessage: "Copied!",
    description:
      "Confirmation for Button to copy all applicant emails in screening category.",
  },
  buttonCopyEmails: {
    id: "review.applications.button.copyEmails",
    defaultMessage: "Copy Emails",
    description: "Button to copy all applicant emails in screening category",
  },
});

const ReviewCategory: React.StatelessComponent<ReviewCategoryProps> = ({
  title,
  description,
  showScreenOutAll,
  applications,
  handleBatchUpdateApplicationReviews,
  prioritizeVeterans,
  handleUpdateReview,
  portal,
}: ReviewCategoryProps): React.ReactElement | null => {
  const intl = useIntl();
  const [justCopied, setJustCopied] = useState(false);
  if (applications.length === 0) {
    return null;
  }

  const screenOutAll = (): void => {
    const screenedOutApplications = applications.map(
      (application) =>
        ({
          ...application.application_review,
          review_status_id: ReviewStatusId.ScreenedOut,
        } as ApplicationReview),
    );
    handleBatchUpdateApplicationReviews(screenedOutApplications);
  };

  const handleScreenOutAllClick = (): void => {
    Swal.fire({
      title: intl.formatMessage(messages.screenOutAllConfirm),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      confirmButtonText: intl.formatMessage(messages.confirmButton),
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        screenOutAll();
      }
    });
  };

  const buckets = [
    {
      id: messages.priorityApplicantsTitle.id,
      title: intl.formatMessage(messages.priorityApplicantsTitle),
      description: intl.formatMessage(messages.priorityApplicantsDescription),
      applications: applications.filter(
        (application) => applicationBucket(application) === "priority",
      ),
    },
    {
      id: messages.veteransAndCitizensTitle.id,
      title: intl.formatMessage(messages.veteransAndCitizensTitle),
      description: intl.formatMessage(messages.veteransAndCitizensDescriptions),
      applications: applications.filter(
        (application) => applicationBucket(application) === "citizen",
      ),
    },
    {
      id: messages.nonCitizensTitle.id,
      title: intl.formatMessage(messages.nonCitizensTitle),
      description: intl.formatMessage(messages.nonCitizensDescription),
      applications: applications.filter(
        (application) => applicationBucket(application) === "non-citizen",
      ),
    },
    {
      id: messages.unqualifiedTitle.id,
      title: intl.formatMessage(messages.unqualifiedTitle),
      description: intl.formatMessage(messages.unqualifiedDescription),
      applications: applications.filter(
        (application) => applicationBucket(application) === "unqualified",
      ),
    },
  ];

  /* Code related to copying emails to clipboard */
  const nameEmails = applications.map((application) => {
    const { first_name, last_name, email } = application.applicant.user; // eslint-disable-line
    return `${first_name} ${last_name} <${email}>`; // eslint-disable-line
  });
  const emailList = nameEmails.join(",");
  const handleCopyClick = (event): void => {
    copyToClipboard(event, emailList).then(() => {
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    });
  };

  return (
    <div className="applicant-category">
      <h2 className="heading--03">{title}</h2>

      <p>{description}</p>

      <div className="flex-grid middle category-actions">
        <div className="box med-1of2">
          <button
            className="button--outline"
            type="button"
            onClick={handleCopyClick}
          >
            {justCopied
              ? intl.formatMessage(messages.buttonCopied)
              : intl.formatMessage(messages.buttonCopyEmails)}
          </button>
        </div>
        <div className="box med-1of2">
          {showScreenOutAll && (
            <button
              className="button--outline"
              type="button"
              onClick={handleScreenOutAllClick}
            >
              <i className="fas fa-ban" />
              &nbsp;
              <FormattedMessage
                id="review.applications.screenOutAll"
                defaultMessage="Screen All Optional Candidates Out"
                description="Button to screen out all optional candidates from competition with one click"
              />
            </button>
          )}
        </div>
      </div>

      {buckets.map((bucket) => (
        <ApplicantBucket
          key={bucket.id}
          {...bucket}
          handleUpdateReview={handleUpdateReview}
          prioritizeVeterans={prioritizeVeterans}
          portal={portal}
        />
      ))}
    </div>
  );
};

export default ReviewCategory;
