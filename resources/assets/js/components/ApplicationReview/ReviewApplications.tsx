import React from "react";
import ReactDOM from "react-dom";
import { Job, Application, ReviewStatus } from "../types";
import ReviewList from "./ReviewList";

interface ReviewApplicationsProps {
  job: Job;
  initApplications: Application[];
  reviewStatuses: ReviewStatus[];
}

interface ReviewApplicationsState {
  applications: Application[];
}

export default class ReviewApplications extends React.Component<
  ReviewApplicationsProps,
  ReviewApplicationsState
  > {
  public constructor(props: ReviewApplicationsProps) {
    super(props);
    this.state = {
      applications: props.initApplications
    };
  }

  public render(): React.ReactElement {
    const reviewStatusOptions = this.props.reviewStatuses.map(status => {
      return { value: status.id, label: status.name };
    });

    return (
      <ReviewList
        title={this.props.job.title}
        classification={this.props.job.classification}
        applications={this.state.applications}
        reviewStatusOptions={reviewStatusOptions}
      />
    );
  }
}

if (document.getElementById("review-applications")) {
  const container = document.getElementById(
    "review-applications"
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
      <ReviewApplications
        job={job}
        initApplications={applications}
        reviewStatuses={reviewStatuses}
      />,
      container
    );
  }
}
