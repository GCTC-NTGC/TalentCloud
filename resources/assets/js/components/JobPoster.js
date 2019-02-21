import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class JobPoster extends Component {
  render() {
    return (
      <a
        className="browse__index-job box med-1of2 lg-1of3"
        href="https://talent.local.ca/en/jobs/5"
        title="View the job post for dolorem."
      >
        <div className="browse__index-job-card">
          <div className="browse__index-job-card-title">
            <h3 className="heading--03">dolorem</h3>
            <span>Environment and Climate Change Canada</span>
          </div>

          <div className="browse__index-job-card-content flex-grid">
            <div className="box small-1of2">
              <span>Location</span>
              <p>Maximilliafurt, Northwest Territories</p>
            </div>

            <div className="box small-1of2">
              <span>Annual Salary Range</span>
              <p>$71,991 - $97,036</p>
            </div>

            <div className="box small-1of2">
              <span>Duration</span>
              <p>3 weeks.</p>
            </div>

            <div className="box small-1of2">
              <span>Remote Work</span>
              <p>Not Allowed</p>
            </div>
          </div>

          <div className="browse__index-job-card-metadata flex-grid">
            <div className="box small-1of2">
              <span>12 days until close</span>
            </div>
            <div className="box small-1of2">
              <span>0 applicants so far.</span>
            </div>
          </div>

          <div className="browse__index-job-card-cta">View Job</div>
        </div>
      </a>
    );
  }
}

if (document.getElementById("react-jobs")) {
  ReactDOM.render(<JobPoster />, document.getElementById("react-jobs"));
}
