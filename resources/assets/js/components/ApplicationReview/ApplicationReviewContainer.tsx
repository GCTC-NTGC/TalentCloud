import React from "react";
import ReactDOM from "react-dom";
import { Application, ReviewStatus } from "../types";
import ApplicationReview from "./ApplicationReview";
import axios from "axios";
import route from "../../helpers/route";

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
  ApplicationReviewContainerProps,
  ApplicationReviewContainerState
> {
  public constructor(props: ApplicationReviewContainerProps) {
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

  updateReviewState(review: ApplicationReview): void {
    const updatedApplication = Object.assign(this.state.application, {
      application_review: review
    });
    this.setState({ application: updatedApplication });
  }

  submitReview(review: ReviewSubmitForm): void {
    this.setState({ isSaving: true });
    axios
      .put(
        route("application_reviews.update", this.state.application.id),
        review
      )
      .then(response => {
        const newReview = response.data as ApplicationReview;
        this.updateReviewState(newReview);
        this.setState({ isSaving: false });
      })
      .catch(error => {
        //TODO: show errors nicer
        alert("Something went wrong, please try again later");
        this.setState({ isSaving: false });
      });
  }

  handleStatusChange(applicationId: number, statusId: number | null): void {
    const oldReview = this.state.application.application_review
      ? this.state.application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      review_status_id: statusId
    });
    this.submitReview(submitReview);
  }

  handleNotesChange(applicationId: number, notes: string | null): void {
    const oldReview = this.state.application.application_review
      ? this.state.application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      notes: notes
    });
    this.submitReview(submitReview);
  }

  render() {
    const reviewStatusOptions = this.props.reviewStatuses.map(status => {
      return { value: status.id, label: status.name };
    });
    return (
      <div className="applicant-review container--layout-xl">
        <ApplicationReview
          key={this.state.application.id}
          application={this.state.application}
          reviewStatusOptions={reviewStatusOptions}
          onStatusChange={this.handleStatusChange}
          onNotesChange={this.handleNotesChange}
          isSaving={this.state.isSaving}
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
    ReactDOM.render(
      <ApplicationReviewContainer
        initApplication={applications}
        reviewStatuses={reviewStatuses}
      />,
      container
    );
  }
}
