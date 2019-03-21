/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Application, ReviewStatus } from "../types";
import ApplicationReview from "./ApplicationReview";
import route from "../../helpers/route";
import ApplicationReviewNav from "./ApplicationReviewNav";

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

  protected updateReviewState(review: ApplicationReview): void {
    const { application } = this.state;
    const updatedApplication = Object.assign(application, {
      application_review: review
    });
    this.setState({ application: updatedApplication });
  }

  protected submitReview(review: ReviewSubmitForm): void {
    const { application } = this.state;
    this.setState({ isSaving: true });
    axios
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
  ): void {
    const { application } = this.state;
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      review_status_id: statusId
    });
    this.submitReview(submitReview);
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
      label: status.name
    }));
    const applicationReview = (
      <ApplicationReview
        key={application.id}
        application={application}
        reviewStatusOptions={reviewStatusOptions}
        onStatusChange={this.handleStatusChange}
        onNotesChange={this.handleNotesChange}
        isSaving={isSaving}
      />
    );
    return (
      <div className="applicant-review container--layout-xl">
        <ApplicationReviewNav
          applicationReview={applicationReview}
          jobPosterId={application.job_poster_id}
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
