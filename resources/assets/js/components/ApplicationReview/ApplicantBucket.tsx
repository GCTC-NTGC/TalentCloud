import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Application, ApplicationReview } from "../../models/types";
import ApplicationRow from "./ApplicationRow";
import {
  applicationCompare,
  applicationComparePrioritizeVeterans,
} from "./helpers";
import { Portal } from "../../models/app";

interface ApplicantBucketProps {
  title: string;
  description: string;
  applications: Application[];
  handleUpdateReview: (review: ApplicationReview) => Promise<void>;
  prioritizeVeterans: boolean;
  portal: Portal;
}

const ApplicantBucket: React.FC<ApplicantBucketProps> = ({
  title,
  description,
  applications,
  handleUpdateReview,
  prioritizeVeterans,
  portal,
}: ApplicantBucketProps): React.ReactElement | null => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (applications.length === 0) {
    return null;
  }

  const compareFunction = prioritizeVeterans
    ? applicationComparePrioritizeVeterans
    : applicationCompare;
  const sortedApplications = applications.slice().sort(compareFunction);
  return (
    <div className={`accordion applicant-bucket${isExpanded ? " active" : ""}`}>
      <button
        aria-expanded={isExpanded}
        className="accordion-trigger"
        tabIndex={0}
        type="button"
        onClick={(): void => {
          setIsExpanded(!isExpanded);
        }}
      >
        <span className="bucket-title">
          {title} ({applications.length})
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
      <div aria-hidden={!isExpanded} className="accordion-content">
        <p>{description}</p>

        {sortedApplications.map(
          (application: Application): React.ReactElement => (
            <ApplicationRow
              key={application.id}
              application={application}
              handleUpdateReview={handleUpdateReview}
              portal={portal}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default ApplicantBucket;
