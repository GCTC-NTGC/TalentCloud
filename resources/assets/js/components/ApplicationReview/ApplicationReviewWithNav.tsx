import React from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
} from "react-intl";
import className from "classnames";
import Swal, { SweetAlertResult } from "sweetalert2";
import * as routes from "../../helpers/routes";
import Select, { SelectOption } from "../Select";
import { Application } from "../../models/types";
import { ReviewStatusId } from "../../models/lookupConstants";
import { Portal } from "../../models/app";
import { messages } from "./ApplicationReview";

interface ApplicationReviewWithNavProps {
  application: Application;
  reviewStatusOptions: SelectOption[];
  onStatusChange: (
    applicationId: number,
    statusId: number | null,
  ) => Promise<void>;
  onNotesChange: (applicationId: number, notes: string | null) => void;
  isSaving: boolean;
  portal: Portal;
}

interface ApplicationReviewWithNavState {
  selectedStatusId: number | undefined;
}

class ApplicationReviewWithNav extends React.Component<
  ApplicationReviewWithNavProps & WrappedComponentProps,
  ApplicationReviewWithNavState
> {
  public constructor(
    props: ApplicationReviewWithNavProps & WrappedComponentProps,
  ) {
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
      return Swal.fire({
        title: confirmText,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0A6CBC",
        cancelButtonColor: "#F94D4D",
        confirmButtonText: intl.formatMessage(messages.confirmButton),
        cancelButtonText: intl.formatMessage(messages.cancelButton),
      }).then((result: SweetAlertResult) => {
        if (result.value) {
          return onStatusChange(application.id, status);
        }
        return Promise.resolve();
      });
    }
    return onStatusChange(application.id, status);
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
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const value =
      event.target.value && !Number.isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : undefined;
    this.setState({ selectedStatusId: value });
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
    const jobUrlMap: { [key in typeof portal]: string } = {
      hr: routes.hrJobPreview(intl.locale, application.job_poster_id),
      manager: routes.managerJobPreview(intl.locale, application.job_poster_id),
    };
    const jobApplicationsUrlMap: { [key in typeof portal]: string } = {
      hr: routes.hrJobApplications(intl.locale, application.job_poster_id),
      manager: routes.managerJobApplications(
        intl.locale,
        application.job_poster_id,
      ),
    };
    const applicantUrl = applicantUrlMap[portal];
    const applicationUrl = applicationUrlMap[portal];
    const jobUrl = jobUrlMap[portal];
    const jobApplicationsUrl = jobApplicationsUrlMap[portal];

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
                onClick={() => this.handleLinkClicked(jobApplicationsUrl)}
              >
                {`< `}
                <FormattedMessage
                  id="application.review.backToApplicantList"
                  defaultMessage="Save and Go Back to Applicant List"
                  description="Back Button text"
                />
              </button>
            </div>
            <div className="box small-2of3">
              <a
                className="button--blue light-bg"
                href={jobUrl}
                style={{ marginRight: ".5rem" }}
              >
                <FormattedMessage
                  id="application.review.button.viewJobPoster"
                  defaultMessage="View Job Poster"
                  description="View Job Poster Button text"
                />
              </a>
              <button
                className="button--blue light-bg"
                data-button-type="expand-all"
                type="button"
                id="expand-all"
              >
                <span className="expand">
                  {" "}
                  <FormattedMessage
                    id="application.review.expandAllSkills"
                    defaultMessage="Expand All Skills"
                    description="Expand All Skills Button text"
                  />
                </span>
                <span className="collapse">
                  {" "}
                  <FormattedMessage
                    id="application.review.collapseAllSkills"
                    defaultMessage="Collapse All Skills"
                    description="Collapse All Skills Button text"
                  />
                </span>
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
              <span className="name">
                {application.applicant.user.first_name}{" "}
                {application.applicant.user.last_name}
              </span>
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
                {intl.formatMessage(messages.viewProfileText)}
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
      </div>
    );
  }
}

export default injectIntl(ApplicationReviewWithNav);
