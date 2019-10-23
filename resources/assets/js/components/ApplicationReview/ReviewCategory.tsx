import React, { useState } from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
  defineMessages,
  MessageDescriptor,
} from "react-intl";
import Swal from "sweetalert2";
import { Application } from "../../models/types";
import { SelectOption } from "../Select";
import { applicationBucket } from "./helpers";
import ApplicantBucket from "./ApplicantBucket";
import { ReviewStatusId } from "../../models/lookupConstants";
import { copyToClipboard } from "../../helpers/clipboard";

interface ReviewCategoryProps {
  title: MessageDescriptor;
  description: MessageDescriptor;
  showScreenOutAll: boolean;
  applications: Application[];
  reviewStatusOptions: SelectOption[];
  onStatusChange: (applicationId: number, statusId: number | null) => void;
  onBulkStatusChange: (
    applicationIds: number[],
    statusId: number | null,
  ) => void;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  savingStatuses: { applicationId: number; isSaving: boolean }[];
  prioritizeVeterans: boolean;
}

const localizations = defineMessages({
  confirmButton: {
    id: "button.confirm",
    defaultMessage: "Confirm",
    description: "Confirm button for modal dialogue boxes",
  },
  screenOutAllConfirm: {
    id: "apl.screenOutAll.confirm",
    defaultMessage:
      "Are you sure you want to screen out all Optional candidates?",
    description:
      "Confirm dialogue text for screening out all optional candidates.",
  },
});

const ReviewCategory: React.StatelessComponent<
  ReviewCategoryProps & WrappedComponentProps
> = ({
  title,
  description,
  showScreenOutAll,
  applications,
  reviewStatusOptions,
  onStatusChange,
  onBulkStatusChange,
  onNotesChange,
  savingStatuses,
  prioritizeVeterans,
  intl,
}: ReviewCategoryProps & WrappedComponentProps): React.ReactElement | null => {
  if (applications.length === 0) {
    return null;
  }

  const screenOutAll = (): void => {
    const applicationIds = applications.map(application => application.id);
    onBulkStatusChange(applicationIds, ReviewStatusId.ScreenedOut);
  };

  const handleScreenOutAllClick = (): void => {
    Swal.fire({
      title: intl.formatMessage(localizations.screenOutAllConfirm),
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      confirmButtonText: intl.formatMessage(localizations.confirmButton),
    }).then(result => {
      if (result.value) {
        screenOutAll();
      }
    });
  };

  const buckets = [
    {
      title: {
        id: "apl.priorityApplicants.title",
        defaultMessage: "Priority Applicants",
        description: "title of list of priority applicants",
      },
      description: {
        id: "apl.priorityApplicants.description",
        defaultMessage:
          "These are priority applicants for this position. They must be reviewed and considered first.",
        description: "description of list of priority applicants",
      },
      applications: applications.filter(
        application => applicationBucket(application) === "priority",
      ),
    },
    {
      title: {
        id: "apl.veteransAndCitizens.title",
        defaultMessage: "Veterans and Canadian Citizens",
        description: "title of list of Veterans and Canadian citizens",
      },
      description: {
        id: "apl.veteransAndCitizens.description",
        defaultMessage: "",
        description: "description of list of Veterans and Canadian citizens",
      },
      applications: applications.filter(
        application => applicationBucket(application) === "citizen",
      ),
    },
    {
      title: {
        id: "apl.nonCitizens.title",
        defaultMessage: "Non-Canadian Citizens",
        description: "title of list of non-citizen applicants",
      },
      description: {
        id: "apl.nonCitizens.description",
        defaultMessage: "",
        description: "description of list of non-citizen applicants",
      },
      applications: applications.filter(
        application => applicationBucket(application) === "non-citizen",
      ),
    },
    {
      title: {
        id: "apl.unqualified.title",
        defaultMessage: "Don't Meet Essential Criteria",
        description:
          "title of list of applicants who do not meet the essential criteria",
      },
      description: {
        id: "apl.unqualified.description",
        defaultMessage: "",
        description:
          "description of list of applicants who do not meet the essential criteria",
      },
      applications: applications.filter(
        application => applicationBucket(application) === "unqualified",
      ),
    },
  ];

  /* Code related to copying emails to clipboard */
  const [justCopied, setJustCopied] = useState(false);
  const nameEmails = applications.map(application => {
    const { first_name, last_name, email } = application.applicant.user; // eslint-disable-line
    return `${first_name} ${last_name} <${email}>`; // eslint-disable-line
  });
  const emailList = nameEmails.join(",");
  const handleCopyClick = (): void => {
    copyToClipboard(emailList);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1000);
  };

  return (
    <div className="applicant-category">
      <h2 className="heading--03">{intl.formatMessage(title)}</h2>

      <p>{intl.formatMessage(description)}</p>

      <div className="flex-grid middle category-actions">
        <div className="box med-1of2">
          <button
            className="button--outline"
            type="button"
            onClick={handleCopyClick}
          >
            {justCopied ? (
              <FormattedMessage
                id="button.copied"
                defaultMessage="Copied!"
                description="Confirmation for Button to copy all applicant emails in screening category"
              />
            ) : (
              <FormattedMessage
                id="button.copyEmails"
                defaultMessage="Copy Emails"
                description="Button to copy all applicant emails in screening category"
              />
            )}
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
                id="apl.screenOutAll"
                defaultMessage="Screen All Optional Candidates Out"
                description="Button to screen out all optional candidates from competition with one click"
              />
            </button>
          )}
        </div>
      </div>

      {buckets.map(bucket => (
        <ApplicantBucket
          key={bucket.title.id}
          {...bucket}
          reviewStatusOptions={reviewStatusOptions}
          onStatusChange={onStatusChange}
          onNotesChange={onNotesChange}
          savingStatuses={savingStatuses}
          prioritizeVeterans={prioritizeVeterans}
        />
      ))}
    </div>
  );
};

export default injectIntl(ReviewCategory);
