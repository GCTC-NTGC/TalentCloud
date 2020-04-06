/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React, { useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { FastField, Formik, Form } from "formik";
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
import { localizeFieldNonNull, getLocale } from "../../../helpers/localize";

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
    description: "Label for 'Save Changes' button.",
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

interface ApplicationRowProps {
  application: Application;
  departmentEditable: boolean;
  departments: Department[];
  handleUpdateReview: (review: ApplicationReview) => void;
  portal: Portal;
}

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
      review_status_id: values.reviewStatus,
      department_id: values.department,
      notes: values.notes,
    };
    return applicationReview;
  };

  return (
    <div className="applicant">
      <Formik
        initialValues={{
          reviewStatus:
            application.application_review?.review_status_id || null,
          department: application.application_review?.department_id || null,
          notes: application.application_review?.notes || null,
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleUpdateReview(
            updateApplicationReview(
              application.application_review || emptyReview,
              values,
            ),
          );
          setSubmitting(false);
        }}
      >
        <Form data-c-grid="gutter(all, 1) middle">
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
            required
            nullSelection={intl.formatMessage(
              displayMessages.selectStatusDefault,
            )}
            options={reviewOptions}
          />
          {departmentEditable && (
            <FastField
              id={`department-allocation-select-${application.applicant_id}`}
              name="department"
              label={intl.formatMessage(displayMessages.selectDepartmentLabel)}
              grid="base(1of4)"
              component={SelectInput}
              required
              nullSelection={intl.formatMessage(
                displayMessages.selectDepartmentDefault,
              )}
              options={departmentOptions}
            />
          )}
          <div data-c-grid-item="base(1of4)" data-c-align="base(right)">
            <button
              data-c-button="outline(c1)"
              type="button"
              data-c-radius="rounded"
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
            >
              <span>
                <FormattedMessage {...displayMessages.save} />
              </span>
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

interface ApplicantBucketProps {
  applications: Application[];
  bucket: string;
  departments: Department[];
  handleUpdateReview: (review: ApplicationReview) => void;
  portal: Portal;
}

const ApplicantBucket: React.FC<ApplicantBucketProps> = ({
  applications,
  bucket,
  departments,
  handleUpdateReview,
  portal,
}): React.ReactElement => {
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
        data-c-accordion-trigger=""
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
          {applications.map(application => (
            <ApplicationRow
              key={application.id}
              application={application}
              departmentEditable={bucket === ResponseBuckets.Allocated}
              departments={departments}
              handleUpdateReview={handleUpdateReview}
              portal={portal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantBucket;
