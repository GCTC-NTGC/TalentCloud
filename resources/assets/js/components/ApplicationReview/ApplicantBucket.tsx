import React from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
  MessageDescriptor,
} from "react-intl";
import { Application } from "../../models/types";
import { SelectOption } from "../Select";
import ApplicationReview from "./ApplicationReview";
import { whereFirst } from "../../helpers/queries";
import {
  applicationCompare,
  applicationComparePrioritizeVeterans,
} from "./helpers";
import { Portal } from "../../models/app";

interface ApplicantBucketProps {
  title: MessageDescriptor;
  description: MessageDescriptor;
  applications: Application[];
  reviewStatusOptions: SelectOption[];
  onStatusChange: (applicationId: number, statusId: number | null) => void;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  savingStatuses: { applicationId: number; isSaving: boolean }[];
  prioritizeVeterans: boolean;
  portal: Portal;
}

const ApplicantBucket: React.StatelessComponent<ApplicantBucketProps &
  WrappedComponentProps> = ({
  title,
  description,
  applications,
  reviewStatusOptions,
  onStatusChange,
  onNotesChange,
  savingStatuses,
  prioritizeVeterans,
  portal,
  intl,
}: ApplicantBucketProps & WrappedComponentProps): React.ReactElement | null => {
  if (applications.length === 0) {
    return null;
  }

  const compareFunction = prioritizeVeterans
    ? applicationComparePrioritizeVeterans
    : applicationCompare;
  const sortedApplications = applications.slice().sort(compareFunction);
  return (
    <div className="accordion applicant-bucket">
      <button
        aria-expanded="false"
        className="accordion-trigger"
        tabIndex={0}
        type="button"
      >
        <span className="bucket-title">
          {intl.formatMessage(title)} ({applications.length})
        </span>

        <span className="invisible">
          <FormattedMessage
            id="button.toggleAccordion"
            defaultMessage="Toggle this step to view relevant applicants."
            description="Instructions to reveal hidden list data."
          />
        </span>

        <i className="fas fa-chevron-up" />
      </button>

      {/* Accordion Content */}
      <div aria-hidden="true" className="accordion-content">
        <p>{intl.formatMessage(description)}</p>

        {sortedApplications.map(
          (application: Application): React.ReactElement => (
            <ApplicationReview
              key={application.id}
              application={application}
              reviewStatusOptions={reviewStatusOptions}
              onStatusChange={onStatusChange}
              onNotesChange={onNotesChange}
              isSaving={
                whereFirst(savingStatuses, "applicationId", application.id)
                  .isSaving
              }
              portal={portal}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default injectIntl(ApplicantBucket);
