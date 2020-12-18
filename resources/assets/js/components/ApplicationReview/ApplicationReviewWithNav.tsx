import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Application, ApplicationReview } from "../../models/types";
import { Portal } from "../../models/app";
import ApplicationRow from "./ApplicationRow";
import {
  hrJobPreview,
  managerJobPreview,
  hrJobApplications,
  managerJobApplications,
} from "../../helpers/routes";

interface ApplicationReviewWithNavProps {
  application: Application;
  handleUpdateApplicationReview: (review: ApplicationReview) => Promise<void>;
  portal: Portal;
}

const ApplicationReviewWithNav: React.FC<ApplicationReviewWithNavProps> = ({
  application,
  handleUpdateApplicationReview,
  portal,
}): React.ReactElement => {
  const intl = useIntl();

  const jobUrlMap: { [key in typeof portal]: string } = {
    hr: hrJobPreview(intl.locale, application.job_poster_id),
    manager: managerJobPreview(intl.locale, application.job_poster_id),
  };

  const jobApplicationsUrlMap: { [key in typeof portal]: string } = {
    hr: hrJobApplications(intl.locale, application.job_poster_id),
    manager: managerJobApplications(intl.locale, application.job_poster_id),
  };

  const jobUrl = jobUrlMap[portal];
  const jobApplicationsUrl = jobApplicationsUrlMap[portal];

  return (
    <div>
      <div>
        <div className="manager-application-preview-actions flex-grid">
          <div className="box small-1of3">
            <button
              className="button--blue light-bg"
              type="button"
              onClick={() => {
                window.location.href = jobApplicationsUrl;
              }}
            >
              {`< `}
              <FormattedMessage
                id="application.review.backToApplicantList"
                defaultMessage="Save and Go Back to Applicant List"
                description="Back Button text"
              />
            </button>
          </div>
          <div className="box small-2of3">
            <a
              className="button--blue light-bg"
              href={jobUrl}
              style={{ marginRight: ".5rem" }}
            >
              <FormattedMessage
                id="application.review.button.viewJobPoster"
                defaultMessage="View Job Poster"
                description="View Job Poster Button text"
              />
            </a>
            <button
              className="button--blue light-bg"
              data-button-type="expand-all"
              type="button"
              id="expand-all"
            >
              <span className="expand">
                {" "}
                <FormattedMessage
                  id="application.review.expandAllSkills"
                  defaultMessage="Expand All Skills"
                  description="Expand All Skills Button text"
                />
              </span>
              <span className="collapse">
                {" "}
                <FormattedMessage
                  id="application.review.collapseAllSkills"
                  defaultMessage="Collapse All Skills"
                  description="Collapse All Skills Button text"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
      <ApplicationRow
        application={application}
        handleUpdateReview={handleUpdateApplicationReview}
        portal={portal}
      />
    </div>
  );
};

export default ApplicationReviewWithNav;
