/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React from "react";
import ReactDOM from "react-dom";

// Internationalizations
import {
  IntlProvider,
  addLocaleData,
  injectIntl,
  InjectedIntlProps,
  defineMessages,
} from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_fr from "react-intl/locale-data/fr";

import camelCase from "lodash/camelCase";
import axios from "axios";
import Swal from "sweetalert2";
import messages_en from "../../localizations/en.json";
import messages_fr from "../../localizations/fr.json";
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

addLocaleData([...locale_en, ...locale_fr]);

const messages = {
  en: messages_en,
  fr: messages_fr,
};

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

class ReviewApplicationsContainer extends React.Component<
  ReviewApplicationsProps & InjectedIntlProps,
  ReviewApplicationsState
> {
  public constructor(props: ReviewApplicationsProps & InjectedIntlProps) {
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
      return Object.assign({}, application);
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
        : Object.assign({}, item),
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
          type: "error",
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
              type: "error",
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
    const IntlReviewApplicationsContainer = injectIntl(
      ReviewApplicationsContainer,
    );
    ReactDOM.render(
      <IntlProvider locale={language} messages={messages[language]}>
        <IntlReviewApplicationsContainer
          job={job}
          initApplications={applications}
          reviewStatuses={reviewStatuses}
        />
      </IntlProvider>,
      container,
    );
  }
}

export default injectIntl(ReviewApplicationsContainer);
