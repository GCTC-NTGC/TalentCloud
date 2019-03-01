import React from "react";
import className from "classnames";
import route from "../../helpers/route";
import Select, { SelectOption } from "../Select";
import { Application } from "../types";
import { ReviewStatusId } from "../lookupConstants";
import Swal from "sweetalert2";

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
        this.props.application.application_review &&
        this.props.application.application_review.review_status_id
          ? this.props.application.application_review.review_status_id
          : undefined
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);
    this.showNotes = this.showNotes.bind(this);
  }

  handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const value =
      event.target.value && !isNaN(parseInt(event.target.value))
        ? parseInt(event.target.value)
        : undefined;
    this.setState({ selectedStatusId: value });
  }

  /**
   * When save is clicked, it is only necessary to save the status
   * @param event
   */
  handleSaveClicked(): void {
    const status = this.state.selectedStatusId
      ? this.state.selectedStatusId
      : null;

    const sectionChange = (
      oldStatus: number | null,
      newStatus: number | null
    ): boolean => {
      const oldIsScreenedOut: boolean =
        oldStatus === ReviewStatusId.ScreenedOut;
      const newIsScreenedOut: boolean =
        newStatus === ReviewStatusId.ScreenedOut;
      return oldIsScreenedOut != newIsScreenedOut;
    };
    const oldStatus = this.props.application.application_review
      ? this.props.application.application_review.review_status_id
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
          this.props.onStatusChange(this.props.application.id, status);
        }
      });
    } else {
      this.props.onStatusChange(this.props.application.id, status);
    }
  }

  showNotes(): void {
    const notes =
      this.props.application.application_review &&
      this.props.application.application_review &&
      this.props.application.application_review.notes
        ? this.props.application.application_review.notes
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
      if (result && result.value != undefined) {
        const value = result.value ? result.value : null;
        this.props.onNotesChange(this.props.application.id, value);
      }
    });
  }

  render() {
    const reviewStatus =
      this.props.application.application_review &&
      this.props.application.application_review.review_status
        ? this.props.application.application_review.review_status.name
        : null;
    const statusIconClass = className("fas", {
      "fa-ban": reviewStatus == "screened_out",
      "fa-question-circle": reviewStatus == "still_thinking",
      "fa-check-circle": reviewStatus == "still_in",
      "fa-exclamation-circle": reviewStatus == null
    });

    /**
     * Returns true only if this.state.selectedStatusId matches the review
     * status of props.application
     */
    const isUnchanged = (): boolean => {
      if (
        this.props.application.application_review &&
        this.props.application.application_review.review_status_id
      ) {
        return (
          this.props.application.application_review.review_status_id ===
          this.state.selectedStatusId
        );
      } else {
        return this.state.selectedStatusId === undefined;
      }
    };

    const getSaveButtonText = (): string => {
      if (this.props.isSaving) {
        return "Saving...";
      } else if (isUnchanged()) {
        return "Saved";
      } else {
        return "Save";
      }
    };
    const saveButtonText = getSaveButtonText();
    const noteButtonText =
      this.props.application.application_review &&
      this.props.application.application_review.notes
        ? "Edit Note"
        : "+ Add a Note";
    return (
      <form className="applicant-summary">
        <div className="flex-grid middle gutter">
          <div className="box lg-1of11 applicant-status">
            <i className={statusIconClass} />
          </div>

          <div className="box lg-2of11 applicant-information">
            <span className="name">
              {this.props.application.applicant.user.name}
            </span>
            <a
              href={"mailto:" + this.props.application.applicant.user.email}
              title="Email this candidate."
            >
              {this.props.application.applicant.user.email}
            </a>
            {/* This span only shown for veterans */}
            {(this.props.application.veteran_status.name == "current" ||
              this.props.application.veteran_status.name == "past") && (
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
              href={route("manager.applications.show", this.props.application)}
              title="View this applicant's application."
            >
              <i className="fas fa-file-alt" />
              View Application
            </a>
            <a
              href={route(
                "manager.applicants.show",
                this.props.application.applicant
              )}
              title="View this applicant's profile."
            >
              <i className="fas fa-user" />
              View Profile
            </a>
          </div>

          <div className="box lg-2of11 applicant-decision">
            <Select
              formName="review_status"
              htmlId={"review_status_" + this.props.application.id}
              label="Decision"
              selected={this.state.selectedStatusId}
              nullSelection="Not Reviewed"
              options={this.props.reviewStatusOptions}
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
