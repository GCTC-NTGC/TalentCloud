/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { ApplicationReview } from "../../models/types";
import ApplicationReviewWithNav from "./ApplicationReviewWithNav";
import { Portal } from "../../models/app";
import { DispatchType } from "../../configureStore";
import { loadingMessages } from "../Application/applicationMessages";
import { useFetchApplication } from "../../hooks/applicationHooks";
import { updateApplicationReview } from "../../store/Application/applicationActions";
import RootContainer from "../RootContainer";

interface ApplicationReviewRootProps {
  applicationId: number;
  portal: Portal;
}

const ApplicationReviewRoot: React.FC<ApplicationReviewRootProps> = ({
  applicationId,
  portal,
}): React.ReactElement => {
  const intl = useIntl();
  const dispatch = useDispatch<DispatchType>();

  const application = useFetchApplication(applicationId, dispatch);
  const handleUpdateApplicationReview = async (
    editedApplicationReview: ApplicationReview,
  ): Promise<void> => {
    await dispatch(updateApplicationReview(editedApplicationReview));
  };

  return (
    <div className="applicant-review container--layout-xl">
      {application === null ? (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(2)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      ) : (
        <ApplicationReviewWithNav
          application={application}
          handleUpdateApplicationReview={handleUpdateApplicationReview}
          portal={portal}
        />
      )}
    </div>
  );
};

export default ApplicationReviewRoot;

const container = document.getElementById("application-review-container");
if (container !== null) {
  if ("applicationId" in container.dataset && "portal" in container.dataset) {
    const applicationId = Number(container.dataset.applicationId as string);
    const portal = container.dataset.portal as Portal;

    ReactDOM.render(
      <RootContainer>
        <ApplicationReviewRoot applicationId={applicationId} portal={portal} />
      </RootContainer>,
      container,
    );
  }
}
