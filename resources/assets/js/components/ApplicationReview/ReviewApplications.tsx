import React from "react";
import moment from "moment";
import { Application } from "../types";
import { SelectOption } from "../Select";
import { applicationCategory } from "./helpers";
import ReviewCategory from "./ReviewCategory";

interface ReviewApplicationsProps {
  title: string;
  classification: string;
  closeDateTime: Date;
  applications: Application[];
  reviewStatusOptions: SelectOption<number>[];
  onStatusChange: (applicationId: number, statusId: number | null) => void;
  onBulkStatusChange: (
    applicationIds: number[],
    statusId: number | null
  ) => void;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  savingStatuses: { applicationId: number; isSaving: boolean }[];
}

const ReviewApplications: React.StatelessComponent<ReviewApplicationsProps> = ({
  title,
  classification,
  closeDateTime,
  applications,
  reviewStatusOptions,
  onStatusChange,
  onBulkStatusChange,
  onNotesChange,
  savingStatuses
}: ReviewApplicationsProps): React.ReactElement => {
  const categories = [
    {
      title: "Under Consideration",
      description:
        "Review the applicants in the Veterans and Canadian Citizens section. If none or very few of these applicants meet the requirements, you can still consider non-Canadian Citizen applications in the Optional Considerations section",
      showScreenOutAll: false,
      applications: applications.filter(
        application => applicationCategory(application) === "primary"
      ),
      prioritizeVeterans: false
    },
    {
      title: "Optional Consideration",
      description:
        "In this group you will find the applicants who are not Canadian Citizens or do not claim to meet the essential criteria.",
      showScreenOutAll: true,
      applications: applications.filter(
        application => applicationCategory(application) === "optional"
      ),
      prioritizeVeterans: true
    },
    {
      title: "No Longer Under Consideration",
      description: "These applications have already been screened out.",
      showScreenOutAll: false,
      applications: applications.filter(
        application => applicationCategory(application) === "screened-out"
      ),
      prioritizeVeterans: true
    }
  ];

  return (
    <section className="applicant-review container--layout-xl">
      <div className="flex-grid gutter">
        <div className="box med-1of2 job-title-wrapper">
          <span>
            Viewing Applicants for: {title} ({classification})
          </span>
        </div>

        <div className="box med-1of2 timer-wrapper">
          <span>
            <i className="fas fa-stopwatch" />{" "}
            {moment().diff(moment(closeDateTime), "days")} Days Since Close
          </span>
        </div>
      </div>

      <div className="priority-alert">
        <h3>
          <i className="fas fa-bell" /> Temporary Priority Alert
        </h3>

        <p>
          Contact Talent Cloud to get a list of priorities that applied to this
          position. They must be reviewed and considered first.
        </p>
      </div>
      {categories.map(category => (
        <ReviewCategory
          key={category.title}
          {...category}
          reviewStatusOptions={reviewStatusOptions}
          onStatusChange={onStatusChange}
          onNotesChange={onNotesChange}
          savingStatuses={savingStatuses}
          onBulkStatusChange={onBulkStatusChange}
        />
      ))}
    </section>
  );
};

export default ReviewApplications;
