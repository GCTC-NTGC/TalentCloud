import React from "react";
import { injectIntl, WrappedComponentProps, defineMessages } from "react-intl";
import className from "classnames";
import Swal, { SweetAlertResult } from "sweetalert2";
import * as routes from "../../helpers/routes";
import Select, { SelectOption } from "../Select";
import { Application } from "../../models/types";
import { ReviewStatusId } from "../../models/lookupConstants";
import { Portal } from "../../models/app";

export const messages = defineMessages({
  priorityLogo: {
    id: "application.review.priorityStatus.priorityLogoTitle",
    defaultMessage: "Talent cloud priority logo",
    description: "Title for Priority Logo Img",
  },
  priorityStatus: {
    id: "application.review.priorityStatus.priority",
    defaultMessage: "Priority",
    description: "Priority",
  },
  veteranLogo: {
    id: "application.review.veteranStatus.veteranLogoAlt",
    defaultMessage: "Talent cloud veteran logo",
    description: "Alt Text for Veteran Logo Img",
  },
  veteranStatus: {
    id: "application.review.veteranStatus.veteran",
    defaultMessage: "Veteran",
    description: "Veteran",
  },
  emailCandidate: {
    id: "application.review.emailCandidateLinkTitle",
    defaultMessage: "Email this candidate.",
    description: "Title, hover text, for email link.",
  },
  viewApplicationText: {
    id: "application.review.viewApplication",
    defaultMessage: "View Application",
    description: "Button text View Application",
  },
  viewApplicationTitle: {
    id: "application.review.viewApplicationLinkTitle",
    defaultMessage: "View this applicant's application.",
    description: "Title, hover text, for View Application Link",
  },
  viewProfileText: {
    id: "application.review.viewProfile",
    defaultMessage: "View Profile",
    description: "Button text View Profile",
  },
  viewProfileTitle: {
    id: "application.review.viewProfileLinkTitle",
    defaultMessage: "View this applicant's profile.",
    description: "Title, hover text, for View Profile Link",
  },
  decision: {
    id: "application.review.decision",
    defaultMessage: "Decision",
    description: "Decision dropdown label",
  },
  notReviewed: {
    id: "application.review.reviewStatus.notReviewed",
    defaultMessage: "Not Reviewed",
    description: "Decision dropdown label",
  },
  saving: {
    id: "application.review.button.saving",
    defaultMessage: "Saving...",
    description: "Dynamic Save button label",
  },
  save: {
    id: "application.review.button.save",
    defaultMessage: "Save",
    description: "Dynamic Save button label",
  },
  saved: {
    id: "application.review.button.saved",
    defaultMessage: "Saved",
    description: "Dynamic Save button label",
  },
  addNote: {
    id: "application.review.addNote",
    defaultMessage: "+ Add a Note",
    description: "Dynamic Note button label",
  },
  editNote: {
    id: "application.review.editNote",
    defaultMessage: "Edit Note",
    description: "Dynamic Note button label",
  },
  screenedOut: {
    id: "application.review.reviewStatus.screenedOut",
    defaultMessage: "Screened Out",
    description: "Dynamic Note button label",
  },
  stillThinking: {
    id: "application.review.reviewStatus.stillThinking",
    defaultMessage: "Still Thinking",
    description: "Dynamic Note button label",
  },
  stillIn: {
    id: "application.review.reviewStatus.stillIn",
    defaultMessage: "Still In",
    description: "Dynamic Note button label",
  },
  cancelButton: {
    id: "application.review.button.cancel",
    defaultMessage: "Cancel",
    description: "Cancel button label",
  },
  confirmButton: {
    id: "application.review.button.confirm",
    defaultMessage: "Confirm",
    description: "Confirm button for modal dialogue boxes",
  },
  screenOutConfirm: {
    id: "application.review.screenOutConfirm",
    defaultMessage: "Screen out the candidate?",
    description: "Are you sure you want to screen out the candidate warning",
  },
  screenInConfirm: {
    id: "application.review.screenInConfirm",
    defaultMessage: "Screen the candidate back in?",
    description: "Are you sure you want to screen in the candidate warning",
  },
  viewProfile: {
    id: "application.review.viewProfile",
    defaultMessage: "View Profile",
    description: "Button text View Profile",
  },
});

interface ApplicationReviewProps {
  application: Application;
  reviewStatusOptions: SelectOption[];
  onStatusChange: (applicationId: number, statusId: number | null) => void;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  isSaving: boolean;
  portal: Portal;
}

interface ApplicationReviewState {
  selectedStatusId: number | undefined;
}

class ApplicationReview extends React.Component<
  ApplicationReviewProps & WrappedComponentProps,
  ApplicationReviewState
> {
  public constructor(props: ApplicationReviewProps & WrappedComponentProps) {
    super(props);
    this.state = {
      selectedStatusId:
        props.application.application_review &&
        props.application.application_review.review_status_id
          ? props.application.application_review.review_status_id
          : undefined,
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);
    this.showNotes = this.showNotes.bind(this);
  }

  protected handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>,
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
    const { application, onStatusChange, intl } = this.props;
    const status = selectedStatusId || null;

    const sectionChange = (
      oldStatus: number | null,
      newStatus: number | null,
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
          ? intl.formatMessage(messages.screenOutConfirm)
          : intl.formatMessage(messages.screenInConfirm);
      Swal.fire({
        title: confirmText,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0A6CBC",
        cancelButtonColor: "#F94D4D",
        confirmButtonText: intl.formatMessage(messages.confirmButton),
        cancelButtonText: intl.formatMessage(messages.cancelButton),
      }).then((result: SweetAlertResult) => {
        if (result.value) {
          onStatusChange(application.id, status);
        }
      });
    } else {
      onStatusChange(application.id, status);
    }
  }

  protected showNotes(): void {
    const { application, onNotesChange, intl } = this.props;
    const notes =
      application.application_review && application.application_review.notes
        ? application.application_review.notes
        : "";
    Swal.fire({
      title: intl.formatMessage(messages.editNote),
      icon: "question",
      input: "textarea",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      cancelButtonText: intl.formatMessage(messages.cancelButton),
      confirmButtonText: intl.formatMessage(messages.save),
      inputValue: notes,
    }).then((result: SweetAlertResult) => {
      if (result && result.value !== undefined) {
        const value = result.value ? result.value : null;
        onNotesChange(application.id, value);
      }
    });
  }

  public render(): React.ReactElement {
    const {
      application,
      reviewStatusOptions,
      isSaving,
      intl,
      portal,
    } = this.props;
    const l10nReviewStatusOptions = reviewStatusOptions.map((status) => ({
      value: status.value,
      label: intl.formatMessage(messages[status.label]),
    }));
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
      "fa-exclamation-circle": reviewStatus === null,
    });
    const applicantUrlMap: { [key in typeof portal]: string } = {
      hr: routes.hrApplicantShow(
        intl.locale,
        application.id,
        application.job_poster_id,
      ),
      manager: routes.managerApplicantShow(
        intl.locale,
        application.id,
        application.job_poster_id,
      ),
    };
    const applicationUrlMap: { [key in typeof portal]: string } = {
      hr: routes.hrApplicationShow(
        intl.locale,
        application.id,
        application.job_poster_id,
      ),
      manager: routes.managerApplicationShow(
        intl.locale,
        application.id,
        application.job_poster_id,
      ),
    };
    const applicantUrl = applicantUrlMap[portal];
    const applicationUrl = applicationUrlMap[portal];

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
        return intl.formatMessage(messages.saving);
      }
      if (isUnchanged()) {
        return intl.formatMessage(messages.saved);
      }
      return intl.formatMessage(messages.save);
    };
    const saveButtonText = getSaveButtonText();
    const noteButtonText =
      application.application_review && application.application_review.notes
        ? intl.formatMessage(messages.editNote)
        : intl.formatMessage(messages.addNote);

    return (
      <form className="applicant-summary">
        <div className="flex-grid middle gutter">
          <div className="box lg-1of11 applicant-status">
            <i className={statusIconClass} />
          </div>

          <div className="box lg-2of11 applicant-information">
            <span
              className="name"
              data-name={`${application.applicant.user.first_name} ${application.applicant.user.last_name}`}
            >
              {application.applicant.user.first_name}{" "}
              {application.applicant.user.last_name}
            </span>
            <a
              href={`mailto: ${application.applicant.user.email}`}
              title={intl.formatMessage(messages.emailCandidate)}
              data-email={`${application.applicant.user.email}`}
              className="email"
            >
              {application.applicant.user.email}
            </a>
            {/* This span only shown for priority applicants */}
            {application.applicant.user.is_priority && (
              <span className="priority-status">
                <i
                  aria-hidden="true"
                  className="fab fa-product-hunt"
                  title={intl.formatMessage(messages.priorityLogo)}
                />
                {intl.formatMessage(messages.priorityStatus)}
              </span>
            )}
            {/* This span only shown for veterans */}
            {(application.veteran_status.name === "current" ||
              application.veteran_status.name === "past") && (
              <span className="veteran-status">
                <img
                  alt={intl.formatMessage(messages.veteranLogo)}
                  src={routes.imageUrl("icon_veteran.svg")}
                />{" "}
                {intl.formatMessage(messages.veteranStatus)}
              </span>
            )}
          </div>

          <div className="box lg-2of11 applicant-links">
            <a
              title={intl.formatMessage(messages.viewApplicationTitle)}
              href={applicationUrl}
            >
              <i className="fas fa-file-alt" />
              {intl.formatMessage(messages.viewApplicationText)}
            </a>
            <a
              title={intl.formatMessage(messages.viewProfileTitle)}
              href={applicantUrl}
            >
              <i className="fas fa-user" />
              {intl.formatMessage(messages.viewProfile)}
            </a>
          </div>

          <div className="box lg-2of11 applicant-decision" data-clone>
            <Select
              id={`review_status_${application.id}`}
              name="review_status"
              label={intl.formatMessage(messages.decision)}
              required={false}
              selected={selectedStatusId || null}
              nullSelection={intl.formatMessage(messages.notReviewed)}
              options={l10nReviewStatusOptions}
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

export default injectIntl(ApplicationReview);
