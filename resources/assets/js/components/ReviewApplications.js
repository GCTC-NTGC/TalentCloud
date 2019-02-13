import React, { Component } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Reference from "./Reference";

const ApplicationReview = (props) => {
    return (
        <p>
            There is an applicant named{" "}
            {props.application.applicant.user.name}
        </p>
    );
}

export default class ReviewApplications extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.applications.length == 0) {
            var content = <p>There are no applicants yet</p>;
        } else {
            var content = (
                <ul>
                    {this.props.applications.map(application => (
                        <li>
                            <ApplicationReview applicant={applicaiton}></ApplicationReview>
                        </li>
                    ))}
                </ul>
            );
        }

        return (
            <div className="container--layout">
                Hello World. I'm the Review Applications page.
                <p>{this.props.job.title}</p>
            </div>
        );
    }
}

if (document.getElementById("review-applications")) {
    const container = document.getElementById("review-applications");
    const job = JSON.parse(container.getAttribute("data-job"));
    const applications = JSON.parse(
        container.getAttribute("data-applications")
    );
    ReactDOM.render(
        <ReviewApplications job={job} applications={applications} />,
        container
    );
}
