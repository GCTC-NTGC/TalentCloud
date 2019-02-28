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
}

export default class ReviewApplicationsContainer extends React.Component<
  ReviewApplicationsProps,
  ReviewApplicationsState
> {
  public constructor(props: ReviewApplicationsProps) {
    super(props);
    this.state = {
      applications: props.initApplications
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.updateReview = this.updateReview.bind(this);
  }

  updateReview(applicationId: number, review: ApplicationReview): void {
    const updatedApplications = this.state.applications.map(application => {
      if (application.id === applicationId) {
        return Object.assign(application, {application_review: review});
      } else {
        return application;
      }
    });
    this.setState({applications: updatedApplications});
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
    //TODO: set ui to loading
    axios
      .put(route("application_reviews.update", applicationId), submitReview)
      .then(response => {
        const newReview = response.data as ApplicationReview;
        this.updateReview(applicationId, newReview);
      })
      .catch(error => {
        //TODO: show errors nicer
        console.log(error);
        alert("Something went wrong, please try again later")
      });
  }

  handleNotesChange(applicationId: number, notes: string | null): void {
    //TODO: finish me
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
