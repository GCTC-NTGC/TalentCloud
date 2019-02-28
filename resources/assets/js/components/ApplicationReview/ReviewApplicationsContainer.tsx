import React from "react";
import ReactDOM from "react-dom";
import { Job, Application, ReviewStatus, ApplicationReview } from "../types";
import ReviewApplications from "./ReviewApplications";
import { find } from "../../helpers/queries";
import route from "../../helpers/route";
import axios from "axios";

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

export default class ReviewApplicationsContainer extends React.Component<
  ReviewApplicationsProps,
  ReviewApplicationsState
> {
  public constructor(props: ReviewApplicationsProps) {
    super(props);
    this.state = {
      applications: props.initApplications,
      savingStatuses: props.initApplications.map(application => {
        return {
          applicationId: application.id,
          isSaving: false
        };
      })
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.updateReviewState = this.updateReviewState.bind(this);
    this.handleSavingStatusChange = this.handleSavingStatusChange.bind(this);
  }

  updateReviewState(applicationId: number, review: ApplicationReview): void {
    const updatedApplications = this.state.applications.map(application => {
      if (application.id === applicationId) {
        return Object.assign(application, { application_review: review });
      } else {
        return Object.assign({}, application);
      }
    });
    this.setState({ applications: updatedApplications }, () =>
      console.log("update happening")
    );
  }

  handleSavingStatusChange(applicationId: number, isSaving: boolean): void {
    const statuses = this.state.savingStatuses.map(item => {
      return item.applicationId == applicationId
        ? { applicationId: applicationId, isSaving: isSaving }
        : Object.assign({}, item);
    });
    this.setState({ savingStatuses: statuses });
  }

  submitReview(applicationId: number, review: ReviewSubmitForm): void {
    this.handleSavingStatusChange(applicationId, true);
    axios
      .put(route("application_reviews.update", applicationId), review)
      .then(response => {
        const newReview = response.data as ApplicationReview;
        this.updateReviewState(applicationId, newReview);
        this.handleSavingStatusChange(applicationId, false);
      })
      .catch(error => {
        //TODO: show errors nicer
        console.log(error);
        alert("Something went wrong, please try again later");
        this.handleSavingStatusChange(applicationId, false);
      });
  }

  handleStatusChange(applicationId: number, statusId: number | null): void {
    const application = find(this.state.applications, applicationId);
    if (application === null) {
      return;
    }
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      review_status_id: statusId
    });
    this.submitReview(applicationId, submitReview);
  }

  handleNotesChange(applicationId: number, notes: string | null): void {
    const application = find(this.state.applications, applicationId);
    if (application === null) {
      return;
    }
    const oldReview = application.application_review
      ? application.application_review
      : {};
    const submitReview = Object.assign(oldReview, {
      notes: notes
    });
    this.submitReview(applicationId, submitReview);
  }

  render(): React.ReactElement {
    const reviewStatusOptions = this.props.reviewStatuses.map(status => {
      return { value: status.id, label: status.name };
    });

    return (
      <ReviewApplications
        title={this.props.job.title}
        classification={this.props.job.classification}
        applications={this.state.applications}
        reviewStatusOptions={reviewStatusOptions}
        onStatusChange={this.handleStatusChange}
        onNotesChange={this.handleNotesChange}
        savingStatuses={this.state.savingStatuses}
      />
    );
  }
}

if (document.getElementById("review-applications-container")) {
  const container = document.getElementById(
    "review-applications-container"
  ) as HTMLElement;
  if (
    container.hasAttribute("data-job") &&
    container.hasAttribute("data-applications") &&
    container.hasAttribute("data-review-statuses")
  ) {
    const job = JSON.parse(container.getAttribute("data-job") as string);
    const applications = JSON.parse(container.getAttribute(
      "data-applications"
    ) as string);
    const reviewStatuses = JSON.parse(container.getAttribute(
      "data-review-statuses"
    ) as string);
    ReactDOM.render(
      <ReviewApplicationsContainer
        job={job}
        initApplications={applications}
        reviewStatuses={reviewStatuses}
      />,
      container
    );
  }
}
