import React from "react";
import moment from "moment";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
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
      title: {
        id: "underConsideration.title",
        defaultMessage: "DT Under Consideration",
        description: "Under construction category title"
      },
      description: {
        id: "underConsideration.description",
        defaultMessage:
          "DT Review the applicants in the Veterans and Canadian Citizens section. If none or very few of these applicants meet the requirements, you can still consider non- candian - citizen applications in the Optional Consideration section",
        description: "Under construction category description"
      },
      showScreenOutAll: false,
      applications: applications.filter(
        application => applicationCategory(application) === "primary"
      ),
      prioritizeVeterans: false
    },
    {
      title: {
        id: "optionalConsideration.title",
        defaultMessage: "DT Optional Consideration",
        description: "Optional consideration category title"
      },
      description: {
        id: "optionalConsideration.description",
        defaultMessage:
          "DT In this group you will find the applicants who are not Canadian Citizens or do not claim to meet the essential criteria.",
        description: "Optional consideration category description"
      },
      showScreenOutAll: true,
      applications: applications.filter(
        application => applicationCategory(application) === "optional"
      ),
      prioritizeVeterans: true
    },
    {
      title: {
        id: "screenedOut.title",
        defaultMessage: "DT No Longer Under Consideration",
        description: "Screened out category title"
      },
      description: {
        id: "screenedOut.description",
        defaultMessage:
          "DT These applications have allready been screened out.",
        description: "Screened out category description"
      },
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
            <FormattedMessage
              id="app.title"
              defaultMessage="Applications for default string: {job_title} {job_classification}"
              description="Welcome header on app main page"
              values={{
                job_title: title,
                job_classification: classification
              }}
            />
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
          <i className="fas fa-bell" />
          <FormattedMessage
            id="temporary_priority_alert"
            defaultMessage="Default: Temporary Priority Alert"
            description="Alert Notice Priorites must be reviewed first get a list"
          />
        </h3>

        <p>
          <FormattedMessage
            id="get_priority_list"
            defaultMessage="Default: Contact Talent Cloud to get a list of priorities that applied to this
          position. They must be reviewed and considered first."
            description="Alert Notice for Priorities description text"
          />
        </p>
      </div>
      {categories.map(category => (
        <ReviewCategory
          key={category.title.id}
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
