import React from "react";
import className from "classnames";
import Swal from "sweetalert2";
import route from "../../helpers/route";
import Select, { SelectOption } from "../Select";
import { Application } from "../types";
import { ReviewStatusId } from "../lookupConstants";

interface ApplicationReviewProps {
  application: Application;
  reviewStatusOptions: SelectOption<number>[];
  onStatusChange: (applicationId: number, statusId: number | null) => void;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  isSaving: boolean;
}

interface ApplicationReviewState {
  selectedStatusId: number | undefined;
}

export default class ApplicationReview extends React.Component<
  ApplicationReviewProps,
  ApplicationReviewState
> {
  public constructor(props: ApplicationReviewProps) {
    super(props);
    this.state = {
      selectedStatusId:
        props.application.application_review &&
        props.application.application_review.review_status_id
          ? props.application.application_review.review_status_id
          : undefined
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);
    this.showNotes = this.showNotes.bind(this);
  }

  protected handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    const value =
      event.target.value && !Number.isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : undefined;
    this.setState({ selectedStatusId: value });
  }

  /**
   * When save is clicked, it is only necessary to save the status
   * @param event
   */
  protected handleSaveClicked(): void {
    const { selectedStatusId } = this.state;
    const { application, onStatusChange } = this.props;
    const status = selectedStatusId || null;

    const sectionChange = (
      oldStatus: number | null,
      newStatus: number | null
    ): boolean => {
      const oldIsScreenedOut: boolean =
        oldStatus === ReviewStatusId.ScreenedOut;
      const newIsScreenedOut: boolean =
        newStatus === ReviewStatusId.ScreenedOut;
      return oldIsScreenedOut !== newIsScreenedOut;
    };
    const oldStatus = application.application_review
      ? application.application_review.review_status_id
      : null;
    if (sectionChange(oldStatus, status)) {
      const confirmText =
        status === ReviewStatusId.ScreenedOut
          ? "Screen out the candidate?"
          : "Screen the candidate back in?";
      Swal.fire({
        title: confirmText,
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#0A6CBC",
        cancelButtonColor: "#F94D4D",
        confirmButtonText: "Conirm"
      }).then(result => {
        if (result.value) {
          onStatusChange(application.id, status);
        }
      });
    } else {
      onStatusChange(application.id, status);
    }
  }

  protected showNotes(): void {
    const { application, onNotesChange } = this.props;
    const notes =
      application.application_review && application.application_review.notes
        ? application.application_review.notes
        : "";
    Swal.fire({
      title: "Edit notes",
      type: "question",
      input: "textarea",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      confirmButtonText: "Save",
      inputValue: notes
    }).then(result => {
      if (result && result.value !== undefined) {
        const value = result.value ? result.value : null;
        onNotesChange(application.id, value);
      }
    });
  }

  public render(): React.ReactElement {
    const { application, reviewStatusOptions, isSaving } = this.props;
    const { selectedStatusId } = this.state;
    const reviewStatus =
      application.application_review &&
      application.application_review.review_status
        ? application.application_review.review_status.name
        : null;
    const statusIconClass = className("fas", {
      "fa-ban": reviewStatus === "screened_out",
      "fa-question-circle": reviewStatus === "still_thinking",
      "fa-check-circle": reviewStatus === "still_in",
      "fa-exclamation-circle": reviewStatus === null
    });

    /**
     * Returns true only if selectedStatusId matches the review
     * status of props.application
     */
    const isUnchanged = (): boolean => {
      if (
        application.application_review &&
        application.application_review.review_status_id
      ) {
        return (
          application.application_review.review_status_id === selectedStatusId
        );
      }
      return selectedStatusId === undefined;
    };

    const getSaveButtonText = (): string => {
      if (isSaving) {
        return "Saving...";
      }
      if (isUnchanged()) {
        return "Saved";
      }
      return "Save";
    };
    const saveButtonText = getSaveButtonText();
    const noteButtonText =
      application.application_review && application.application_review.notes
        ? "Edit Note"
        : "+ Add a Note";
    return (
      <form className="applicant-summary">
        <div className="flex-grid middle gutter">
          <div className="box lg-1of11 applicant-status">
            <i className={statusIconClass} />
          </div>

          <div className="box lg-2of11 applicant-information">
            <span className="name">{application.applicant.user.name}</span>
            <a
              href={`mailto: ${application.applicant.user.email}`}
              title="Email this candidate."
            >
              {application.applicant.user.email}
            </a>
            {/* This span only shown for veterans */}
            {(application.veteran_status.name === "current" ||
              application.veteran_status.name === "past") && (
              <span className="veteran-status">
                <img
                  alt="The Talent Cloud veteran icon."
                  src="/images/icon_veteran.svg"
                />
                Veteran
              </span>
            )}
          </div>

          <div className="box lg-2of11 applicant-links">
            <a
              href={route("manager.applications.show", application)}
              title="View this applicant's application."
            >
              <i className="fas fa-file-alt" />
              View Application
            </a>
            <a
              href={route("manager.applicants.show", application.applicant)}
              title="View this applicant's profile."
            >
              <i className="fas fa-user" />
              View Profile
            </a>
          </div>

          <div className="box lg-2of11 applicant-decision">
            <Select
              formName="review_status"
              htmlId={`review_status_${application.id}`}
              label="Decision"
              selected={selectedStatusId}
              nullSelection="Not Reviewed"
              options={reviewStatusOptions}
              onChange={this.handleStatusChange}
            />
          </div>

          <div className="box lg-2of11 applicant-notes">
            <button
              className="button--outline"
              type="button"
              onClick={this.showNotes}
            >
              {noteButtonText}
            </button>
          </div>

          <div className="box lg-2of11 applicant-save-button">
            <button
              className="button--blue light-bg"
              type="button"
              onClick={() => this.handleSaveClicked()}
            >
              <span>{saveButtonText}</span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
