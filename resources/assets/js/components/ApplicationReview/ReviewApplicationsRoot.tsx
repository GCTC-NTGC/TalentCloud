/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React from "react";
import ReactDOM from "react-dom";

// Internationalizations
import { injectIntl, defineMessages, WrappedComponentProps } from "react-intl";

import camelCase from "lodash/camelCase";
import Swal from "sweetalert2";
import {
  Job,
  Application,
  ReviewStatus,
  ApplicationReview,
} from "../../models/types";
import ReviewApplications from "./ReviewApplications";
import { find } from "../../helpers/queries";
import * as routes from "../../helpers/routes";
import { classificationString } from "../../models/jobUtil";
import { axios } from "../../api/base";
import IntlContainer from "../../IntlContainer";

interface ReviewApplicationsProps {
  job: Job;
  initApplications: Application[];
  reviewStatuses: ReviewStatus[];
}

interface ReviewApplicationsState {
  applications: Application[];
  savingStatuses: { applicationId: number; isSaving: boolean }[];
}

interface ReviewSubmitForm {
  review_status_id?: number | null;
  notes?: string | null;
}

const localizations = defineMessages({
  oops: {
    id: "alert.oops",
    defaultMessage: "Save",
    description: "Dynamic Save button label",
  },
  somethingWrong: {
    id: "apl.reviewSaveFailed",
    defaultMessage:
      "Something went wrong while saving a review. Try again later.",
    description: "Dynamic Save button label",
  },
});

class ReviewApplicationsRoot extends React.Component<
  ReviewApplicationsProps & WrappedComponentProps,
  ReviewApplicationsState
> {
  public constructor(props: ReviewApplicationsProps & WrappedComponentProps) {
    super(props);
    this.state = {
      applications: props.initApplications,
      savingStatuses: props.initApplications.map(application => ({
        applicationId: application.id,
        isSaving: false,
      })),
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleBulkStatusChange = this.handleBulkStatusChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.updateReviewState = this.updateReviewState.bind(this);
    this.handleSavingStatusChange = this.handleSavingStatusChange.bind(this);
  }

  protected updateReviewState(
    applicationId: number,
    review: ApplicationReview,
  ): void {
    const { applications } = this.state;
    const updatedApplications = applications.map(application => {
      if (application.id === applicationId) {
        return Object.assign(application, { application_review: review });
      }
      return { ...application };
    });
    this.setState({ applications: updatedApplications });
  }

  protected handleSavingStatusChange(
    applicationId: number,
    isSaving: boolean,
  ): void {
    const { savingStatuses } = this.state;
    const statuses = savingStatuses.map(item =>
      item.applicationId === applicationId
        ? { applicationId, isSaving }
        : { ...item },
    );
    this.setState({ savingStatuses: statuses });
  }

  protected submitReview(
    applicationId: number,
    review: ReviewSubmitForm,
  ): void {
    const { intl } = this.props;
    this.handleSavingStatusChange(applicationId, true);
    axios
      .put(routes.applicationReviewUpdate(intl.locale, applicationId), review)
      .then(response => {
        const newReview = response.data as ApplicationReview;
        this.updateReviewState(applicationId, newReview);
        this.handleSavingStatusChange(applicationId, false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: intl.formatMessage(localizations.oops),
          text: intl.formatMessage(localizations.somethingWrong),
        });
        this.handleSavingStatusChange(applicationId, false);
      });
  }

  protected handleStatusChange(
    applicationId: number,
    statusId: number | null,
  ): void {
    const { applications } = this.state;
    const application = find(applications, applicationId);
    if (application === null) {
      return;
    }
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      review_status_id: statusId,
    });
    this.submitReview(applicationId, submitReview);
  }

  protected handleBulkStatusChange(
    applicationIds: number[],
    statusId: number | null,
  ): void {
    const { applications } = this.state;
    const { intl } = this.props;
    const changedApplications = applications.filter(application =>
      applicationIds.includes(application.id),
    );
    let errorThrown = false;
    changedApplications.map(application => {
      const oldReview = application.application_review
        ? application.application_review
        : {};
      const submitReview = Object.assign(oldReview, {
        review_status_id: statusId,
      });
      this.handleSavingStatusChange(application.id, true);
      const request = axios
        .put(
          routes.applicationReviewUpdate(intl.locale, application.id),
          submitReview,
        )
        .then(response => {
          const newReview = response.data as ApplicationReview;
          this.updateReviewState(application.id, newReview);
          this.handleSavingStatusChange(application.id, false);
        })
        .catch(() => {
          this.handleSavingStatusChange(application.id, false);
          // Only show error modal first time a request fails
          if (!errorThrown) {
            errorThrown = true;
            Swal.fire({
              icon: "error",
              title: intl.formatMessage(localizations.oops),
              text: intl.formatMessage(localizations.somethingWrong),
            });
          }
        });
      return request;
    });
  }

  protected handleNotesChange(
    applicationId: number,
    notes: string | null,
  ): void {
    const { applications } = this.state;
    const application = find(applications, applicationId);
    if (application === null) {
      return;
    }
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      notes,
    });
    this.submitReview(applicationId, submitReview);
  }

  public render(): React.ReactElement {
    const { applications, savingStatuses } = this.state;
    const { reviewStatuses, job } = this.props;
    const { intl } = this.props;

    const reviewStatusOptions = reviewStatuses.map(status => ({
      value: status.id,
      label: camelCase(status.name),
    }));

    return (
      <ReviewApplications
        title={job[intl.locale].title}
        classification={classificationString(job)}
        closeDateTime={job.close_date_time}
        applications={applications}
        reviewStatusOptions={reviewStatusOptions}
        onStatusChange={this.handleStatusChange}
        onBulkStatusChange={this.handleBulkStatusChange}
        onNotesChange={this.handleNotesChange}
        savingStatuses={savingStatuses}
      />
    );
  }
}

if (document.getElementById("review-applications-container")) {
  const container = document.getElementById(
    "review-applications-container",
  ) as HTMLElement;
  if (
    container.hasAttribute("data-job") &&
    container.hasAttribute("data-applications") &&
    container.hasAttribute("data-review-statuses") &&
    container.hasAttribute("data-locale")
  ) {
    const job = JSON.parse(container.getAttribute("data-job") as string);
    const applications = JSON.parse(container.getAttribute(
      "data-applications",
    ) as string);
    const reviewStatuses = JSON.parse(container.getAttribute(
      "data-review-statuses",
    ) as string);
    const language = container.getAttribute("data-locale") as string;
    const IntlReviewApplicationsRoot = injectIntl(ReviewApplicationsRoot);
    ReactDOM.render(
      <IntlContainer locale={language}>
        <IntlReviewApplicationsRoot
          job={job}
          initApplications={applications}
          reviewStatuses={reviewStatuses}
        />
      </IntlContainer>,
      container,
    );
  }
}

export default injectIntl(ReviewApplicationsRoot);
