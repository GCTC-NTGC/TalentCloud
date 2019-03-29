import React, { ReactElement } from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import route from "../../helpers/route";

interface ApplicationReviewNavProps {
  applicationReview: ReactElement;
  jobPosterId: number;
}

const ApplicationReviewNav: React.FunctionComponent<
  ApplicationReviewNavProps & InjectedIntlProps
> = ({
  applicationReview,
  jobPosterId
}: ApplicationReviewNavProps & InjectedIntlProps): React.ReactElement => {
  return (
    <div>
      <div className="container--layout-xl">
        <div className="manager-application-preview-actions flex-grid gutter">
          <div className="box small-1of3">
            <a
              className="button--blue"
              href={route("manager.jobs.applications", jobPosterId)}
            >
              Back to Applications
            </a>
          </div>
          <div className="box small-1of3">
            <a
              className="button--blue"
              href={route("manager.jobs.show", jobPosterId)}
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

export default injectIntl(ApplicationReviewNav);
