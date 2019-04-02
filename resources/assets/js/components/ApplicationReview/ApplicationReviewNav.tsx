import React, { ReactElement } from "react";
import * as routes from "../../helpers/routes";

interface ApplicationReviewNavProps {
  applicationReview: ReactElement;
  jobPosterId: number;
}

const ApplicationReviewNav: React.FunctionComponent<
  ApplicationReviewNavProps
> = ({
  applicationReview,
  jobPosterId
}: ApplicationReviewNavProps): React.ReactElement => {
  return (
    <div>
      <div className="container--layout-xl">
        <div className="manager-application-preview-actions flex-grid gutter">
          <div className="box small-1of3">
            <a
              className="button--blue"
              href={routes.managerJobApplications("en", jobPosterId)}
            >
              Back to Applications
            </a>
          </div>
          <div className="box small-1of3">
            <a
              className="button--blue"
              href={routes.managerJobShow("en", jobPosterId)}
            >
              View JobPoster
            </a>
          </div>
          <div className="box small-1of3">
            <button
              className="button--blue"
              data-button-type="expand-all"
              type="button"
            >
              <span className="expand">Expand Accordions</span>
              <span className="collapse">Collapse Accordions</span>
            </button>
          </div>
        </div>
      </div>
      {applicationReview}
    </div>
  );
};

export default ApplicationReviewNav;
