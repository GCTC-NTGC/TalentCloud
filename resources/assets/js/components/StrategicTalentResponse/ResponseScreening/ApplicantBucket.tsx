/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React, { useState, useEffect } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { FastField, Formik, Form, useFormikContext } from "formik";
import Swal from "sweetalert2";
import SelectInput from "../../Form/SelectInput";
import {
  Application,
  Department,
  ApplicationReview,
} from "../../../models/types";
import { Portal } from "../../../models/app";
import * as routes from "../../../helpers/routes";
import {
  ResponseScreeningBuckets,
  ResponseReviewStatuses,
} from "../../../models/localizedConstants";
import { ResponseScreeningBuckets as ResponseBuckets } from "../../../models/lookupConstants";
import {
  localizeFieldNonNull,
  getLocale,
  Locales,
} from "../../../helpers/localize";

const displayMessages = defineMessages({
  viewApplication: {
    id: "responseScreening.bucket.viewApplicationLabel",
    defaultMessage: "View Application",
    description: "Label for 'View Application' link.",
  },
  viewProfile: {
    id: "responseScreening.bucket.viewProfileLabel",
    defaultMessage: "View Profile",
    description: "Label for 'View Profile' link.",
  },
  notes: {
    id: "responseScreening.bucket.notesLabel",
    defaultMessage: "Add/Edit Notes",
    description: "Label for 'Add/Edit Notes' button.",
  },
  save: {
    id: "responseScreening.bucket.saveLabel",
    defaultMessage: "Save Changes",
    description: "Label for 'Save Changes' button when changes are unsaved.",
  },
  saving: {
    id: "responseScreening.bucket.savingLabel",
    defaultMessage: "Saving...",
    description:
      "Label for 'Save Changes' button when form submission is in progress.",
  },
  saved: {
    id: "responseScreening.bucket.savedLabel",
    defaultMessage: "Saved",
    description:
      "Label for 'Save Changes' button when form submission succeeded.",
  },
  cancel: {
    id: "responseScreening.bucket.cancelLabel",
    defaultMessage: "Cancel",
    description: "Label for 'Cancel' button.",
  },
  selectStatusDefault: {
    id: "responseScreening.bucket.selectStatusDefault",
    defaultMessage: "Select a status...",
    description: "Default option text for the Status dropdown.",
  },
  selectStatusLabel: {
    id: "responseScreening.bucket.selectStatusLabel",
    defaultMessage: "Review Status",
    description: "Label for the Status dropdown.",
  },
  selectDepartmentDefault: {
    id: "responseScreening.bucket.selectDepartmentDefault",
    defaultMessage: "Select a department...",
    description: "Default option text for the Department dropdown.",
  },
  selectDepartmentLabel: {
    id: "responseScreening.bucket.selectDepartmentLabel",
    defaultMessage: "Department Allocation",
    description: "Label for the Department dropdown.",
  },
  clickView: {
    id: "responseScreening.bucket.accessibleViewLabel",
    defaultMessage: "Click to view...",
    description: "Accessible text for screen reading accordion elements.",
  },
  noApplicants: {
    id: "responseScreening.bucket.noApplicants",
    defaultMessage: "There are currently no applicants in this bucket.",
    description: "Fallback label for a bucket with no applicants.",
  },
});

enum IconStatus {
  ASSESSMENT = "question",
  READY = "check",
  RECEIVED = "exclamation",
}

interface StatusIconProps {
  status: IconStatus;
  color: string;
  small: boolean;
}

const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  color,
  small,
}): React.ReactElement => {
  return (
    <i
      className={`fas fa-${status}-circle`}
      data-c-color={color}
      data-c-font-size={small ? "small" : ""}
    />
  );
};

// Kinda weird "empty" component that hooks into Formik's
// context, listens to the 'dirty' prop, and registers
// a beforeunload listener to fire if a user attempts to
// leave with unsaved work.
// https://github.com/jaredpalmer/formik/issues/1657#issuecomment-509388871
const AlertWhenUnsaved = (): React.ReactElement => {
  const { dirty } = useFormikContext();
  const handleUnload = (event: BeforeUnloadEvent): void => {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave with unsaved changes?";
  };

  useEffect(() => {
    if (dirty) {
      window.addEventListener("beforeunload", handleUnload);
    }
    return (): void => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dirty]);

  return <></>;
};

interface ApplicationRowProps {
  application: Application;
  departmentEditable: boolean;
  departments: Department[];
  handleUpdateReview: (review: ApplicationReview) => Promise<ApplicationReview>;
  portal: Portal;
}

// TODO: Sort applications by status/note content
// Sort out Allocated vs Unavailable across Job Posters.

const ApplicationRow: React.FC<ApplicationRowProps> = ({
  application,
  departmentEditable,
  departments,
  handleUpdateReview,
  portal,
}): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const applicantUrlMap: { [key in typeof portal]: string } = {
    hr: routes.hrApplicantShow(intl.locale, application.id),
    manager: routes.managerApplicantShow(intl.locale, application.id),
  };
  const applicationUrlMap: { [key in typeof portal]: string } = {
    hr: routes.hrApplicationShow(intl.locale, application.id),
    manager: routes.managerApplicationShow(intl.locale, application.id),
  };
  const applicantUrl = applicantUrlMap[portal];
  const applicationUrl = applicationUrlMap[portal];

  const reviewOptions = Object.values(ResponseReviewStatuses).map((status): {
    value: number;
    label: string;
  } => ({
    value: status.id,
    label: intl.formatMessage(status.name),
  }));

  const departmentOptions = departments.map(department => ({
    value: department.id,
    label: localizeFieldNonNull(locale, department, "name"),
  }));

  let rowIcon: React.ReactElement;

  switch (application.application_review?.review_status_id) {
    case 4:
    case 5:
    case 7:
      rowIcon = (
        <StatusIcon status={IconStatus.READY} color="go" small={false} />
      );
      break;
    case 6:
      rowIcon = (
        <StatusIcon status={IconStatus.ASSESSMENT} color="slow" small={false} />
      );
      break;
    default:
      rowIcon = (
        <StatusIcon status={IconStatus.RECEIVED} color="c1" small={false} />
      );
  }

  const emptyReview: ApplicationReview = {
    id: 0,
    job_application_id: application.id,
    review_status_id: null,
    department_id: null,
    notes: null,
    created_at: new Date(),
    updated_at: new Date(),
    department: null,
    review_status: null,
  };

  const updateApplicationReview = (
    oldReview: ApplicationReview,
    values,
  ): ApplicationReview => {
    const applicationReview: ApplicationReview = {
      ...oldReview,
      review_status_id: values.reviewStatus
        ? Number(values.reviewStatus)
        : null,
      department_id: values.department ? Number(values.department) : null,
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
      title: intl.formatMessage(displayMessages.notes),
      icon: "info",
      input: "textarea",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      cancelButtonText: intl.formatMessage(displayMessages.cancel),
      confirmButtonText: intl.formatMessage(displayMessages.save),
      inputValue: notes,
    }).then(result => {
      if (result && result.value !== undefined) {
        const value = result.value ? result.value : "";
        updateField("notes", value);
      }
    });
  };

  return (
    <div className="applicant">
      <Formik
        initialValues={{
          reviewStatus:
            application.application_review?.review_status_id || null,
          department: application.application_review?.department_id || null,
          notes: application.application_review?.notes || "",
        }}
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
        {({
          values,
          dirty,
          isSubmitting,
          setFieldValue,
        }): React.ReactElement => (
          <Form data-c-grid="gutter(all, 1) middle">
            <AlertWhenUnsaved />
            <div data-c-grid-item="base(1of4)">
              <div>
                {rowIcon}
                <div>
                  <p data-c-font-weight="bold" data-c-font-size="h4">
                    {application.applicant.user.full_name}
                  </p>
                  <p data-c-margin="bottom(.5)">
                    <a
                      href={`mailto:${application.applicant.user.email}`}
                      title=""
                    >
                      {application.applicant.user.email}
                    </a>
                  </p>
                  <p data-c-font-size="small">
                    <a href={applicationUrl} title="" data-c-margin="right(.5)">
                      <FormattedMessage {...displayMessages.viewApplication} />
                    </a>
                    <a href={applicantUrl} title="">
                      <FormattedMessage {...displayMessages.viewProfile} />
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <FastField
              id={`review-status-select-${application.applicant_id}`}
              name="reviewStatus"
              label={intl.formatMessage(displayMessages.selectStatusLabel)}
              grid="base(1of4)"
              component={SelectInput}
              nullSelection={intl.formatMessage(
                displayMessages.selectStatusDefault,
              )}
              options={reviewOptions}
            />
            {departmentEditable && (
              <FastField
                id={`department-allocation-select-${application.applicant_id}`}
                name="department"
                label={intl.formatMessage(
                  displayMessages.selectDepartmentLabel,
                )}
                grid="base(1of4)"
                component={SelectInput}
                nullSelection={intl.formatMessage(
                  displayMessages.selectDepartmentDefault,
                )}
                options={departmentOptions}
              />
            )}
            <div
              data-c-grid-item={`base(${departmentEditable ? 1 : 2}of4)`}
              data-c-align="base(right)"
            >
              <button
                data-c-button="outline(c1)"
                type="button"
                data-c-radius="rounded"
                onClick={(): void =>
                  handleNotesButtonClick(values.notes, setFieldValue)
                }
              >
                <i className="fas fa-plus" />
                <span>
                  <FormattedMessage {...displayMessages.notes} />
                </span>
              </button>
              <button
                data-c-button="solid(c1)"
                type="submit"
                data-c-radius="rounded"
                disabled={isSubmitting}
              >
                <span>
                  {dirty ? (
                    <FormattedMessage {...displayMessages.save} />
                  ) : (
                    <FormattedMessage {...displayMessages.saved} />
                  )}
                </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const applicationSort = (locale: Locales) => {
  return (first: Application, second: Application): number => {
    // Applications without a review status should appear first
    if (
      first.application_review === undefined &&
      second.application_review !== undefined
    ) {
      return -1;
    }
    if (
      first.application_review !== undefined &&
      second.application_review === undefined
    ) {
      return 1;
    }
    // Applications with a review status should be grouped by status
    if (first.application_review && second.application_review) {
      if (
        first.application_review.review_status_id &&
        second.application_review.review_status_id
      ) {
        if (
          first.application_review.review_status_id <
          second.application_review.review_status_id
        ) {
          return -1;
        }
        if (
          first.application_review.review_status_id >
          second.application_review.review_status_id
        ) {
          return 1;
        }
      }
      // Applications without a Department should appear first
      if (
        first.application_review.department === null &&
        second.application_review.department !== null
      ) {
        return -1;
      }
      if (
        first.application_review.department !== null &&
        second.application_review.department === null
      ) {
        return 1;
      }
      // Applications with a Department set should be grouped by Department
      if (
        first.application_review.department &&
        second.application_review.department
      ) {
        const firstDepartmentName = localizeFieldNonNull(
          locale,
          first.application_review.department,
          "name",
        ).toUpperCase();
        const secondDepartmentName = localizeFieldNonNull(
          locale,
          second.application_review.department,
          "name",
        ).toUpperCase();
        if (firstDepartmentName < secondDepartmentName) {
          return -1;
        }
        if (firstDepartmentName > secondDepartmentName) {
          return 1;
        }
        return 0;
      }
    }
    return 0;
  };
};

interface ApplicantBucketProps {
  applications: Application[];
  bucket: string;
  departments: Department[];
  handleUpdateReview: (review: ApplicationReview) => Promise<ApplicationReview>;
  portal: Portal;
}

const ApplicantBucket: React.FC<ApplicantBucketProps> = ({
  applications,
  bucket,
  departments,
  handleUpdateReview,
  portal,
}): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const [isExpanded, setIsExpanded] = useState(false);
  const {
    title: bucketTitle,
    description: bucketDescription,
  } = ResponseScreeningBuckets[bucket];

  const handleExpandClick = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      data-c-accordion=""
      data-c-background="white(100)"
      data-c-margin="top(.5)"
      data-c-card=""
      className={isExpanded ? "active" : ""}
    >
      <button
        aria-expanded={isExpanded}
        data-c-accordion-trigger
        tabIndex={0}
        type="button"
        onClick={handleExpandClick}
      >
        <div data-c-padding="top(normal) right bottom(normal) left(normal)">
          <p data-c-font-weight="bold" data-c-font-size="h3">
            <FormattedMessage {...bucketTitle} /> ({applications.length})
          </p>
          <p data-c-margin="top(quarter)" data-c-colour="gray">
            {bucket === ResponseBuckets.Consideration ? (
              <FormattedMessage
                id={ResponseScreeningBuckets.consideration.title.id}
                defaultMessage={
                  ResponseScreeningBuckets.consideration.description
                    .defaultMessage
                }
                description={
                  ResponseScreeningBuckets.consideration.description.description
                }
                values={{
                  iconAssessment: (
                    <StatusIcon
                      status={IconStatus.ASSESSMENT}
                      color="slow"
                      small
                    />
                  ),
                  iconReady: (
                    <StatusIcon status={IconStatus.READY} color="go" small />
                  ),
                  iconReceived: (
                    <StatusIcon status={IconStatus.RECEIVED} color="c1" small />
                  ),
                }}
              />
            ) : (
              <FormattedMessage {...bucketDescription} />
            )}
          </p>
        </div>
        <span data-c-visibility="invisible">
          <FormattedMessage {...displayMessages.clickView} />
        </span>
        {isExpanded ? (
          <i
            aria-hidden="true"
            className="fas fa-minus"
            data-c-accordion-remove=""
            data-c-colour="black"
          />
        ) : (
          <i
            aria-hidden="true"
            className="fas fa-plus"
            data-c-accordion-add=""
            data-c-colour="black"
          />
        )}
      </button>
      <div
        aria-hidden={!isExpanded}
        data-c-accordion-content=""
        data-c-padding="right(normal) left(normal)"
      >
        <div data-c-padding="bottom(normal)">
          {isExpanded &&
            applications.length > 0 &&
            applications
              .sort(applicationSort(locale))
              .map(application => (
                <ApplicationRow
                  key={application.id}
                  application={application}
                  departmentEditable={bucket === ResponseBuckets.Allocated}
                  departments={departments}
                  handleUpdateReview={handleUpdateReview}
                  portal={portal}
                />
              ))}
          {isExpanded && applications.length === 0 && (
            <div data-c-padding="bottom(normal)">
              <div
                data-c-border="all(thin, solid, gray)"
                data-c-background="gray(10)"
                data-c-padding="all(1)"
                data-c-radius="rounded"
                data-c-align="base(center)"
              >
                <p data-c-color="gray">
                  <FormattedMessage {...displayMessages.noApplicants} />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantBucket;
