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
  Application,
  ReviewStatus,
  ApplicationReview,
} from "../../models/types";
import * as route from "../../helpers/routes";
import ApplicationReviewWithNav from "./ApplicationReviewWithNav";

addLocaleData([...locale_en, ...locale_fr]);

const messages = {
  en: messages_en,
  fr: messages_fr,
};

interface ApplicationReviewRootProps {
  initApplication: Application;
  reviewStatuses: ReviewStatus[];
}

interface ApplicationReviewRootState {
  application: Application;
  isSaving: boolean;
}

interface ReviewSubmitForm {
  review_status_id?: number | null;
  notes?: string | null;
}

const localizations = defineMessages({
  oops: {
    id: "alert.oops",
    defaultMessage: "Oops...",
    description: "Modal notification text indicating something went wrong.",
  },
  somethingWrong: {
    id: "apl.reviewSaveFailed",
    defaultMessage:
      "Something went wrong while saving a review. Try again later.",
    description: "Error message for error while saving an application review.",
  },
});

class ApplicationReviewRoot extends React.Component<
  ApplicationReviewRootProps & InjectedIntlProps,
  ApplicationReviewRootState
> {
  public constructor(
    props: ApplicationReviewRootProps & InjectedIntlProps,
  ) {
    super(props);
    this.state = {
      application: props.initApplication,
      isSaving: false,
    };
    this.submitReview = this.submitReview.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.updateReviewState = this.updateReviewState.bind(this);
  }

  protected updateReviewState(review: ApplicationReview): void {
    const { application } = this.state;
    const updatedApplication = Object.assign(application, {
      application_review: review,
    });
    this.setState({
      application: updatedApplication,
    });
  }

  protected submitReview(review: ReviewSubmitForm): Promise<void> {
    const { application } = this.state;
    const { intl } = this.props;
    this.setState({ isSaving: true });
    return axios
      .put(route.applicationReviewUpdate(intl.locale, application.id), review)
      .then(response => {
        const newReview = response.data as ApplicationReview;
        this.updateReviewState(newReview);
        this.setState({ isSaving: false });
      })
      .catch(() => {
        this.setState({ isSaving: false });
        Swal.fire({
          type: "error",
          title: intl.formatMessage(localizations.oops),
          text: intl.formatMessage(localizations.somethingWrong),
        });
      });
  }

  protected handleStatusChange(
    applicationId: number,
    statusId: number | null,
  ): Promise<void> {
    const { application } = this.state;
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      review_status_id: statusId,
    });
    return this.submitReview(submitReview);
  }

  protected handleNotesChange(
    applicationId: number,
    notes: string | null,
  ): void {
    const { application } = this.state;
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      notes,
    });
    this.submitReview(submitReview);
  }

  public render(): React.ReactElement {
    const { reviewStatuses } = this.props;
    const { application, isSaving } = this.state;
    const reviewStatusOptions = reviewStatuses.map(status => ({
      value: status.id,
      label: camelCase(status.name),
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
    "application-review-container",
  ) as HTMLElement;
  if (
    container.hasAttribute("data-application") &&
    container.hasAttribute("data-review-statuses")
  ) {
    const applications = JSON.parse(container.getAttribute(
      "data-application",
    ) as string);
    const reviewStatuses = JSON.parse(container.getAttribute(
      "data-review-statuses",
    ) as string);
    const language = container.getAttribute("data-locale") as string;
    const IntlApplicationReviewRoot = injectIntl(
      ApplicationReviewRoot,
    );
    ReactDOM.render(
      <IntlProvider locale={language} messages={messages[language]}>
        <IntlApplicationReviewRoot
          initApplication={applications}
          reviewStatuses={reviewStatuses}
        />
      </IntlProvider>,
      container,
    );
  }
}

export default injectIntl(ApplicationReviewRoot);
