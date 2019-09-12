import React from "react";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { Application } from "../../models/types";
import { SelectOption } from "../Select";
import { applicationCategory } from "./helpers";
import ReviewCategory from "./ReviewCategory";

interface ReviewApplicationsProps {
  title: string;
  classification: string;
  closeDateTime: Date | null;
  applications: Application[];
  reviewStatusOptions: SelectOption[];
  onStatusChange: (applicationId: number, statusId: number | null) => void;
  onBulkStatusChange: (
    applicationIds: number[],
    statusId: number | null,
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
  savingStatuses,
}: ReviewApplicationsProps): React.ReactElement => {
  const categories = [
    {
      title: {
        id: "apl.underConsideration.title",
        defaultMessage: "Under Consideration",
        description: "Under consideration category title",
      },
      description: {
        id: "apl.underConsideration.description",
        defaultMessage:
          "Review the applicants in the Veterans and Canadian Citizens section. If none or very few of these applicants meet the requirements, you can still consider non-Canadian Citizen applications in the Optional Consideration section",
        description: "Under consideration category description",
      },
      showScreenOutAll: false,
      applications: applications.filter(
        application => applicationCategory(application) === "primary",
      ),
      prioritizeVeterans: false,
    },
    {
      title: {
        id: "apl.optionalConsideration.title",
        defaultMessage: "Optional Consideration",
        description: "Optional consideration category title",
      },
      description: {
        id: "apl.optionalConsideration.description",
        defaultMessage:
          "In this group you will find the applicants who are not Canadian Citizens or do not claim to meet the essential criteria.",
        description: "Optional consideration category description",
      },
      showScreenOutAll: true,
      applications: applications.filter(
        (application): boolean =>
          applicationCategory(application) === "optional",
      ),
      prioritizeVeterans: true,
    },
    {
      title: {
        id: "apl.screenedOut.title",
        defaultMessage: "No Longer Under Consideration",
        description: "Screened out category title",
      },
      description: {
        id: "apl.screenedOut.description",
        defaultMessage: "These applications have already been screened out.",
        description: "Screened out category description",
      },
      showScreenOutAll: false,
      applications: applications.filter(
        (application): boolean =>
          applicationCategory(application) === "screened-out",
      ),
      prioritizeVeterans: true,
    },
  ];

  return (
    <section className="applicant-review container--layout-xl">
      <div className="flex-grid gutter">
        <div className="box med-1of2 job-title-wrapper">
          <span>
            <FormattedMessage
              id="apl.indexPageTitle"
              defaultMessage="Applications for: {jobTitle} {jobClassification}"
              description="Welcome header on Job Applications index page"
              values={{
                jobTitle: title,
                jobClassification: classification,
              }}
            />
          </span>
        </div>

        <div className="box med-1of2 timer-wrapper">
          <i className="fas fa-stopwatch" />
          &nbsp;
          <FormattedMessage
            id="job.daysSinceClosed"
            defaultMessage="{dayCount, plural,
              =0 {No Days}
            one {# Day}
          other {# Days}
        } Since Close"
            description="Welcome header on app main page"
            values={{
              // TODO: Think more carefully about how to handle null fields
              dayCount: dayjs().diff(
                closeDateTime ? dayjs(closeDateTime) : dayjs(),
                "day",
              ),
            }}
          />
        </div>
      </div>
      {categories.map(
        (category): React.ReactElement => (
          <ReviewCategory
            key={category.title.id}
            {...category}
            reviewStatusOptions={reviewStatusOptions}
            onStatusChange={onStatusChange}
            onNotesChange={onNotesChange}
            savingStatuses={savingStatuses}
            onBulkStatusChange={onBulkStatusChange}
          />
        ),
      )}
    </section>
  );
};

export default ReviewApplications;
