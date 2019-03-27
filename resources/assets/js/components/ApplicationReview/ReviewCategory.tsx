import React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import Swal from "sweetalert2";
import { Application } from "../types";
import { SelectOption } from "../Select";
import { applicationBucket } from "./helpers";
import ApplicantBucket from "./ApplicantBucket";
import { ReviewStatusId } from "../lookupConstants";

interface ReviewCategoryProps {
  title: FormattedMessage.MessageDescriptor;
  description: FormattedMessage.MessageDescriptor;
  showScreenOutAll: boolean;
  applications: Application[];
  reviewStatusOptions: SelectOption<number>[];
  onStatusChange: (applicationId: number, statusId: number | null) => void;
  onBulkStatusChange: (
    applicationIds: number[],
    statusId: number | null
  ) => void;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  savingStatuses: { applicationId: number; isSaving: boolean }[];
  prioritizeVeterans: boolean;
}

const ReviewCategory: React.StatelessComponent<
  ReviewCategoryProps & InjectedIntlProps
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
  intl
}: ReviewCategoryProps & InjectedIntlProps): React.ReactElement | null => {
  if (applications.length === 0) {
    return null;
  }

  const screenOutAll = (): void => {
    const applicationIds = applications.map(application => application.id);
    onBulkStatusChange(applicationIds, ReviewStatusId.ScreenedOut);
  };

  const handleScreenOutAllClick = (): void => {
    Swal.fire({
      title: "Are you sure you want to screen out all Optional candidates?",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      confirmButtonText: "Confirm"
    }).then(result => {
      if (result.value) {
        screenOutAll();
      }
    });
  };

  const buckets = [
    {
      title: {
        id: "priorityApplicants.title",
        defaultMessage: "<default/> Priority Applicants",
        description: "title of list of priority applicants"
      },
      description: {
        id: "priorityApplicants.description",
        defaultMessage:
          "<default/> These are priority applicants for this position. They must be reviewed and considered first.",
        description: "description of list of priority applicants"
      },
      applications: applications.filter(
        application => applicationBucket(application) === "priority"
      )
    },
    {
      title: {
        id: "veteransAndCitizens.title",
        defaultMessage: "<default/> Veterans and Canadian Citizens",
        description: "title of list of Veterans and Canadian citizens"
      },
      description: {
        id: "veteransAndCitizens.description",
        defaultMessage: "<default/> ",
        description: "description of list of Venterans and Canadian citizens"
      },
      applications: applications.filter(
        application => applicationBucket(application) === "citizen"
      )
    },
    {
      title: {
        id: "nonCitizens.title",
        defaultMessage: "<default/> Non-Canadian Citizens",
        description: "title of list of non-citizen applicants"
      },
      description: {
        id: "nonCitizens.description",
        defaultMessage: "<default/> ",
        description: "description of list of non-citizen applicants"
      },
      applications: applications.filter(
        application => applicationBucket(application) === "non-citizen"
      )
    },
    {
      title: {
        id: "essentialCriteriaFail.title",
        defaultMessage: "<default/> Don't Meet Essential Criteria",
        description:
          "title of list of applicants who do not meet the essential criteria"
      },
      description: {
        id: "essentialCriteriaFail.description",
        defaultMessage: "<default/> ",
        description:
          "description of list of applicants who do not meet the essential criteria"
      },
      applications: applications.filter(
        application => applicationBucket(application) === "unqualified"
      )
    }
  ];

  return (
    <div className="applicant-category">
      <h3 className="heading--03">{intl.formatMessage(title)}</h3>

      <p>{intl.formatMessage(description)}</p>

      {/* Category Action
                This section only exists for the "secondary" category, and should generate a confirmation dialogue that prompts the user to decide whether to screen ALL of the candidates in this category out or not.
            */}
      {showScreenOutAll && (
        <span className="category-action">
          <button
            className="button--outline"
            type="button"
            onClick={handleScreenOutAllClick}
          >
            <i className="fas fa-ban" />{" "}
            <FormattedMessage
              id="screenOutAll"
              defaultMessage="<default/> Screen All Optional Candidates Out"
              description="Button to screen out all optional candidates from competition with one click"
            />
          </button>
        </span>
      )}

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
