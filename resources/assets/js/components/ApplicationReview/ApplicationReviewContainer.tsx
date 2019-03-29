/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React from "react";
import ReactDOM from "react-dom";

// Internationalizations
import {
  IntlProvider,
  addLocaleData,
  injectIntl,
  InjectedIntlProps
} from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_fr from "react-intl/locale-data/fr";

import camelCase from "lodash/camelCase";
import axios from "axios";
import Swal from "sweetalert2";
import messages_en from "./localizations/en.json";
import messages_fr from "./localizations/fr.json";
import { Application, ReviewStatus, ApplicationReview } from "../types";
import route from "../../helpers/route";
import ApplicationReviewWithNav from "./ApplicationReviewWithNav";

addLocaleData([...locale_en, ...locale_fr]);

const messages = {
  en: messages_en,
  fr: messages_fr
};

interface ApplicationReviewContainerProps {
  initApplication: Application;
  reviewStatuses: ReviewStatus[];
}

interface ApplicationReviewContainerState {
  application: Application;
  isSaving: boolean;
}

interface ReviewSubmitForm {
  review_status_id?: number | null;
  notes?: string | null;
}

export default class ApplicationReviewContainer extends React.Component<
  ApplicationReviewContainerProps & InjectedIntlProps,
  ApplicationReviewContainerState
> {
  public constructor(
    props: ApplicationReviewContainerProps & InjectedIntlProps
  ) {
    super(props);
    this.state = {
      application: props.initApplication,
      isSaving: false
    };
    this.submitReview = this.submitReview.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.updateReviewState = this.updateReviewState.bind(this);
  }

  protected updateReviewState(review: ApplicationReview): void {
    const { application } = this.state;
    const updatedApplication = Object.assign(application, {
      application_review: review
    });
    this.setState({
      application: updatedApplication
    });
  }

  protected submitReview(review: ReviewSubmitForm): Promise<void> {
    const { application } = this.state;
    this.setState({ isSaving: true });
    return axios
      .put(route("application_reviews.update", application.id), review)
      .then(response => {
        const newReview = response.data as ApplicationReview;
        this.updateReviewState(newReview);
        this.setState({ isSaving: false });
      })
      .catch(() => {
        this.setState({ isSaving: false });
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Something went while saving this review. Try again later."
        });
      });
  }

  protected handleStatusChange(
    applicationId: number,
    statusId: number | null
  ): Promise<void> {
    const { application } = this.state;
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      review_status_id: statusId
    });
    return this.submitReview(submitReview);
  }

  protected handleNotesChange(
    applicationId: number,
    notes: string | null
  ): void {
    const { application } = this.state;
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      notes
    });
    this.submitReview(submitReview);
  }

  public render(): React.ReactElement {
    const { reviewStatuses } = this.props;
    const { application, isSaving } = this.state;
    const reviewStatusOptions = reviewStatuses.map(status => ({
      value: status.id,
      label: camelCase(status.name)
    }));
    return (
      <div className="applicant-review container--layout-xl">
        <ApplicationReviewWithNav
          key={application.id}
          application={application}
          reviewStatusOptions={reviewStatusOptions}
          onStatusChange={this.handleStatusChange}
          onNotesChange={this.handleNotesChange}
          isSaving={isSaving}
        />
      </div>
    );
  }
}

if (document.getElementById("application-review-container")) {
  const container = document.getElementById(
    "application-review-container"
  ) as HTMLElement;
  if (
    container.hasAttribute("data-application") &&
    container.hasAttribute("data-review-statuses")
  ) {
    const applications = JSON.parse(container.getAttribute(
      "data-application"
    ) as string);
    const reviewStatuses = JSON.parse(container.getAttribute(
      "data-review-statuses"
    ) as string);
    const language = container.getAttribute("data-locale") as string;
    const ReviewContainer = injectIntl(ApplicationReviewContainer);
    ReactDOM.render(
      <IntlProvider locale={language} messages={messages[language]}>
        <ReviewContainer
          initApplication={applications}
          reviewStatuses={reviewStatuses}
        />
      </IntlProvider>,
      container
    );
  }
}
