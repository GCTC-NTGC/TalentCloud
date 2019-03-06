import React from "react";
import { Application } from "../types";
import { SelectOption } from "../Select";
import { applicationBucket } from "./helpers";
import ApplicantBucket from "./ApplicantBucket";
import { ReviewStatusId } from "../lookupConstants";
import Swal from "sweetalert2";

interface ReviewCategoryProps {
  title: string;
  description: string;
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

const ReviewCategory: React.StatelessComponent<ReviewCategoryProps> = (
  props
): React.ReactElement | null => {
  if (props.applications.length === 0) {
    return null;
  }

  const screenOutAll = (): void => {
    const applicationIds = props.applications.map(
      application => application.id
    );
    props.onBulkStatusChange(applicationIds, ReviewStatusId.ScreenedOut);
  };

  const handleScreenOutAllClick = (): void => {
    Swal.fire({
      title: "Are you sure you want to screen out all Optional candidates?",
      type: "question",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      confirmButtonText: "Conirm"
    }).then(result => {
      if (result.value) {
        screenOutAll();
      }
    });
  };

  const buckets = [
    {
      title: "Priority Applicants",
      description:
        "These are priority applicants for this position. They must be reviewed and considered first.",
      applications: props.applications.filter(
        application => applicationBucket(application) === "priority"
      )
    },
    {
      title: "Veterans and Canadian Citizens",
      description: "",
      applications: props.applications.filter(
        application => applicationBucket(application) === "citizen"
      )
    },
    {
      title: "Non-Canadian Citizens",
      description: "",
      applications: props.applications.filter(
        application => applicationBucket(application) === "non-citizen"
      )
    },
    {
      title: "Don't Meed Essential Criteria",
      description: "",
      applications: props.applications.filter(
        application => applicationBucket(application) === "unqualified"
      )
    }
  ];

  return (
    <div className="applicant-category">
      <h3 className="heading--03">
        <i className="fas fa-ban" /> {props.title}
      </h3>

      <p>{props.description}</p>

      {/* Category Action
                This section only exists for the "secondary" category, and should generate a confirmation dialogue that prompts the user to decide whether to screen ALL of the candidates in this category out or not.
            */}
      {props.showScreenOutAll && (
        <span className="category-action">
          <button
            className="button--outline"
            type="button"
            onClick={handleScreenOutAllClick}
          >
            <i className="fas fa-ban" /> Screen All Optional Candidates Out
          </button>
        </span>
      )}

      {buckets.map(bucket => (
        <ApplicantBucket
          key={bucket.title}
          {...bucket}
          reviewStatusOptions={props.reviewStatusOptions}
          onStatusChange={props.onStatusChange}
          onNotesChange={props.onNotesChange}
          savingStatuses={props.savingStatuses}
          prioritizeVeterans={props.prioritizeVeterans}
        />
      ))}
    </div>
  );
};

export default ReviewCategory;
