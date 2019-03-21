import React from "react";
import { Application } from "../types";
import { SelectOption } from "../Select";
import ApplicationReview from "./ApplicationReview";
import { whereFirst } from "../../helpers/queries";
import {
  applicationCompare,
  applicationComparePrioritizeVeterans
} from "./helpers";

interface ApplicantBucketProps {
  title: string;
  description: string;
  applications: Application[];
  reviewStatusOptions: SelectOption<number>[];
  onStatusChange: (applicationId: number, statusId: number | null) => void;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  savingStatuses: { applicationId: number; isSaving: boolean }[];
  prioritizeVeterans: boolean;
}

const ApplicantBucket: React.StatelessComponent<ApplicantBucketProps> = ({
  title,
  description,
  applications,
  reviewStatusOptions,
  onStatusChange,
  onNotesChange,
  savingStatuses,
  prioritizeVeterans
}: ApplicantBucketProps): React.ReactElement | null => {
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
          <i className="fas fa-ban" /> {title} ({applications.length})
        </span>

        <span className="invisible">
          Toggle this step to view relevant applicants.
        </span>

        <i className="fas fa-chevron-up" />
      </button>

      {/* Accordion Content */}
      <div aria-hidden="true" className="accordion-content">
        <p>{description}</p>

        {sortedApplications.map(application => (
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
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicantBucket;
