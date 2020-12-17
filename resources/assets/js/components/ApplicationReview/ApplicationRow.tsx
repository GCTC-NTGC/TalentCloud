/* eslint-disable camelcase, @typescript-eslint/camelcase */
import React from "react";
import { useIntl, defineMessages } from "react-intl";
import { Formik, Form, FastField } from "formik";
import Swal, { SweetAlertResult } from "sweetalert2";
import classNames from "classnames";
import { Application, ApplicationReview } from "../../models/types";
import { Portal } from "../../models/app";
import { getLocale } from "../../helpers/localize";
import {
  getApplicantUrl,
  getApplicationUrl,
  imageUrl,
} from "../../helpers/routes";
import { ReviewStatusId } from "../../models/lookupConstants";
import AlertWhenUnsaved from "../Form/AlertWhenUnsaved";
import SelectInput from "../Form/SelectInput";

const messages = defineMessages({
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

interface FormValues {
  reviewStatus: ReviewStatusId | null;
  notes: string;
}

interface ApplicationRowProps {
  application: Application;
  handleUpdateReview: (review: ApplicationReview) => Promise<void>;
  portal: Portal;
}

const ApplicationRow: React.FC<ApplicationRowProps> = ({
  application,
  handleUpdateReview,
  portal,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const applicantUrl = getApplicantUrl(
    locale,
    portal,
    application.applicant_id,
    application.job_poster_id,
  );
  const applicationUrl = getApplicationUrl(
    locale,
    portal,
    application.id,
    application.job_poster_id,
  );

  const reviewOptions = [
    { value: 1, label: "Screened Out" },
    { value: 2, label: "Still Thinking" },
    { value: 3, label: "Still In" },
  ];

  const statusIconClass = classNames("fas", {
    "fa-ban":
      application.application_review?.review_status_id ===
      ReviewStatusId.ScreenedOut,
    "fa-question-circle":
      application.application_review?.review_status_id ===
      ReviewStatusId.StillThinking,
    "fa-check-circle":
      application.application_review?.review_status_id ===
      ReviewStatusId.StillIn,
    "fa-exclamation-circle":
      application.application_review?.review_status_id === null,
  });

  const noteButtonText =
    application.application_review && application.application_review.notes
      ? intl.formatMessage(messages.editNote)
      : intl.formatMessage(messages.addNote);

  const emptyReview: ApplicationReview = {
    id: 0,
    job_application_id: application.id,
    review_status_id: null,
    notes: null,
    created_at: new Date(),
    updated_at: new Date(),
    review_status: undefined,
    department_id: null,
    department: undefined,
    director_email_sent: false,
    reference_email_sent: false,
  };

  const validReviewStatus = (id: number | undefined | null): number | null => {
    if (id !== undefined && id !== null && id in ReviewStatusId) {
      return id;
    }
    return null;
  };

  const applicationReviewStatus = validReviewStatus(
    application.application_review?.review_status_id,
  );

  const initialValues: FormValues = {
    reviewStatus: applicationReviewStatus,
    notes: application.application_review?.notes || "",
  };

  const updateApplicationReview = (
    oldReview: ApplicationReview,
    values: FormValues,
  ): ApplicationReview => {
    const applicationReview: ApplicationReview = {
      ...oldReview,
      review_status_id: values.reviewStatus
        ? Number(values.reviewStatus)
        : null,
      notes: values.notes || null,
    };
    return applicationReview;
  };

  const handleNotesButtonClick = (
    notes: string,
    updateField: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => void,
  ): void => {
    Swal.fire({
      title: intl.formatMessage(messages.editNote),
      icon: "info",
      input: "textarea",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      cancelButtonText: intl.formatMessage(messages.cancelButton),
      confirmButtonText: intl.formatMessage(messages.save),
      inputValue: notes,
    }).then((result: SweetAlertResult) => {
      if (result && result.value !== undefined) {
        const value = result.value ? result.value : "";
        updateField("notes", value);
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }): void => {
        const review = updateApplicationReview(
          application.application_review || emptyReview,
          values,
        );
        handleUpdateReview(review)
          .then(() => {
            setSubmitting(false);
            resetForm();
          })
          .catch(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ values, dirty, isSubmitting, setFieldValue }): React.ReactElement => (
        <Form className="applicant-summary">
          <AlertWhenUnsaved />
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
                    src={imageUrl("icon_veteran.svg")}
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

            <div className="box lg-2of11 applicant-decision">
              <FastField
                id={`review_status_${application.id}`}
                name="reviewStatus"
                label={intl.formatMessage(messages.decision)}
                component={SelectInput}
                nullSelection={intl.formatMessage(messages.notReviewed)}
                options={reviewOptions}
              />
            </div>

            <div className="box lg-2of11 applicant-notes">
              <button
                className="button--outline"
                type="button"
                onClick={(): void =>
                  handleNotesButtonClick(values.notes, setFieldValue)
                }
              >
                {noteButtonText}
              </button>
            </div>

            <div className="box lg-2of11 applicant-save-button">
              <button
                className="button--blue light-bg"
                type="submit"
                disabled={!dirty || isSubmitting}
              >
                <span>
                  {dirty
                    ? intl.formatMessage(messages.save)
                    : intl.formatMessage(messages.saved)}
                </span>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ApplicationRow;
