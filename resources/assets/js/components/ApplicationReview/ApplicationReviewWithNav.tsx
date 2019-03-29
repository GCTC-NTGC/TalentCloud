import React from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages
} from "react-intl";
import className from "classnames";
import Swal from "sweetalert2";
import route from "../../helpers/route";
import Select, { SelectOption } from "../Select";
import { Application } from "../types";
import { ReviewStatusId } from "../lookupConstants";

const messages = defineMessages({
  veteranLogo: {
    id: "veteranLogo",
    defaultMessage: "<default/> Talent cloud veteran logo",
    description: "Alt Text for Veteran Logo Img"
  },
  emailCandidate: {
    id: "emailCandidate",
    defaultMessage: "<default/> Email this candidate.",
    description: "Title, hover text, for email link."
  },
  viewApplicationTitle: {
    id: "viewApplication.title",
    defaultMessage: "<default/> View this applicant's application.",
    description: "Title, hover text, for View Applection Link"
  },
  viewProfileTitle: {
    id: "viewProfile.title",
    defaultMessage: "<default/> View this applicant's profile.",
    description: "Title, hover text, for View Profile Link"
  },
  decision: {
    id: "decision",
    defaultMessage: "<default/> Decision",
    description: "Decision dropdown label"
  },
  notReviewed: {
    id: "notReviewed",
    defaultMessage: "<default/> Not Reviewed",
    description: "Decision dropdown label"
  },
  saving: {
    id: "saving",
    defaultMessage: "<default/> Saving...",
    description: "Dynaming Save button label"
  },
  save: {
    id: "saving",
    defaultMessage: "<default/> Save",
    description: "Dynaming Save button label"
  },
  saved: {
    id: "saved",
    defaultMessage: "<default/> Saved",
    description: "Dynaming Save button label"
  },
  addNote: {
    id: "addNote",
    defaultMessage: "<default/> + Add a Note",
    description: "Dynaming Note button label"
  },
  editNote: {
    id: "editNote",
    defaultMessage: "<default/> Edit Note",
    description: "Dynaming Note button label"
  },
  screenedOut: {
    id: "screenedOut",
    defaultMessage: "<default/> Screened Out",
    description: "Dynaming Note button label"
  },
  stillThinking: {
    id: "stillThinking",
    defaultMessage: "<default/> Still Thinking",
    description: "Dynaming Note button label"
  },
  stillIn: {
    id: "stillIn",
    defaultMessage: "<default/> Still In",
    description: "Dynaming Note button label"
  }
});

interface ApplicationReviewWithNavProps {
  application: Application;
  reviewStatusOptions: SelectOption<number>[];
  onStatusChange: (
    applicationId: number,
    statusId: number | null
  ) => Promise<void>;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  isSaving: boolean;
}

interface ApplicationReviewWithNavState {
  selectedStatusId: number | undefined;
}

class ApplicationReviewWithNav extends React.Component<
  ApplicationReviewWithNavProps & InjectedIntlProps,
  ApplicationReviewWithNavState
> {
  public constructor(props: ApplicationReviewWithNavProps & InjectedIntlProps) {
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
    this.handleLinkClicked = this.handleLinkClicked.bind(this);
    this.isUnchanged = this.isUnchanged.bind(this);
  }

  /**
   * Returns true only if selectedStatusId matches the review
   * status of props.application
   */
  protected isUnchanged = (): boolean => {
    const { application } = this.props;
    const { selectedStatusId } = this.state;
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

  /**
   * When save is clicked, it is only necessary to save the status
   * @param event
   */
  protected handleSaveClicked(): Promise<void> {
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
      return Swal.fire({
        title: confirmText,
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#0A6CBC",
        cancelButtonColor: "#F94D4D",
        confirmButtonText: "Confirm"
      }).then(result => {
        if (result.value) {
          return onStatusChange(application.id, status);
        }
        return Promise.resolve();
      });
    }
    return onStatusChange(application.id, status);
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

  protected handleLinkClicked(url: string): void {
    if (this.isUnchanged()) {
      window.location.href = url;
      return;
    }
    this.handleSaveClicked()
      .then(() => {
        window.location.href = url;
      })
      .catch(() => {
        // do not navigate away from page
      });
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

  public render(): React.ReactElement {
    const { application, reviewStatusOptions, isSaving, intl } = this.props;
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

    const getSaveButtonText = (): string => {
      if (isSaving) {
        return intl.formatMessage(messages.saving);
      }
      if (this.isUnchanged()) {
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
      <div>
        <div>
          <div className="manager-application-preview-actions flex-grid">
            <div className="box small-1of3">
              <button
                className="button--blue light-bg"
                type="button"
                onClick={() =>
                  this.handleLinkClicked(
                    route(
                      "manager.jobs.applications",
                      application.job_poster_id
                    )
                  )
                }
              >
                &#60; Save and Go Back to Applicant List
              </button>
            </div>
            <div className="box small-2of3">
              <button
                className="button--blue light-bg"
                type="button"
                onClick={() =>
                  this.handleLinkClicked(
                    route("manager.jobs.show", application.job_poster_id)
                  )
                }
              >
                View JobPoster
              </button>
              <button
                className="button--blue light-bg"
                data-button-type="expand-all"
                type="button"
              >
                <span className="expand">Expand Accordions</span>
                <span className="collapse">Collapse Accordions</span>
              </button>
            </div>
          </div>
        </div>

        <form className="applicant-summary">
          <div className="flex-grid middle gutter">
            <div className="box lg-1of11 applicant-status">
              <i className={statusIconClass} />
            </div>

            <div className="box lg-2of11 applicant-information">
              <span className="name">{application.applicant.user.name}</span>
              <a
                href={`mailto: ${application.applicant.user.email}`}
                title={intl.formatMessage(messages.emailCandidate)}
              >
                {application.applicant.user.email}
              </a>
              {/* This span only shown for veterans */}
              {(application.veteran_status.name === "current" ||
                application.veteran_status.name === "past") && (
                <span className="veteran-status">
                  <img
                    alt={intl.formatMessage(messages.viewApplicationTitle)}
                    src="/images/icon_veteran.svg"
                  />
                  <FormattedMessage
                    id="veteran"
                    defaultMessage="<default/> Veteran"
                    description="Veteran"
                  />
                </span>
              )}
            </div>

            <div className="box lg-2of11 applicant-links">
              <a
                href={route("manager.applications.show", application)}
                title={intl.formatMessage(messages.viewApplicationTitle)}
              >
                <i className="fas fa-file-alt" />
                <FormattedMessage
                  id="viewApplication"
                  defaultMessage="<default/> View Application"
                  description="Button text View Application"
                />
              </a>
              <a
                href={route("manager.applicants.show", application.applicant)}
                title={intl.formatMessage(messages.viewProfileTitle)}
              >
                <i className="fas fa-user" />
                <FormattedMessage
                  id="viewProfile"
                  defaultMessage="<default/> View Profile"
                  description="Button text View Profile"
                />
              </a>
            </div>

            <div className="box lg-2of11 applicant-decision">
              <Select
                formName="review_status"
                htmlId={`review_status_${application.id}`}
                label={intl.formatMessage(messages.decision)}
                selected={selectedStatusId}
                nullSelection={intl.formatMessage(messages.notReviewed)}
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
      </div>
    );
  }
}

export default injectIntl(ApplicationReviewWithNav);
