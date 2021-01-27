/* eslint camelcase: "off" */
import React from "react";
import ReactDOM from "react-dom";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../configureStore";
import {
  useFetchApplicationsByJob,
  useFetchJob,
} from "../../hooks/applicationHooks";
import { loadingMessages } from "../Application/applicationMessages";
import { ApplicationReview, Classification } from "../../models/types";
import ReviewApplications from "./ReviewApplications";
import RootContainer from "../RootContainer";
import { Portal } from "../../models/app";
import {
  updateApplicationReview,
  batchUpdateApplicationReviews,
} from "../../store/Application/applicationActions";
import { useLoadClassifications } from "../../hooks/jobBuilderHooks";

interface ReviewApplicationsRootProps {
  jobId: number;
  portal: Portal;
}

const ReviewApplicationsRoot: React.FC<ReviewApplicationsRootProps> = ({
  jobId,
  portal,
}): React.ReactElement => {
  const intl = useIntl();
  const dispatch = useDispatch<DispatchType>();

  const { classifications } = useLoadClassifications(dispatch);
  const applications = useFetchApplicationsByJob(jobId, dispatch);
  const job = useFetchJob(jobId, dispatch);
  const classificationKey: string =
    classifications.find(
      (item: Classification) => item.id === job?.classification_id,
    )?.key || "";
  const handleUpdateApplicationReview = async (
    editedApplicationReview: ApplicationReview,
  ): Promise<void> => {
    await dispatch(updateApplicationReview(editedApplicationReview));
  };
  const handleBatchUpdateApplicationReviews = async (
    editedApplicationReviews: ApplicationReview[],
  ): Promise<void> => {
    await dispatch(batchUpdateApplicationReviews(editedApplicationReviews));
  };

  return (
    <div data-clone>
      {job === null || applications === null ? (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(2)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      ) : (
        <ReviewApplications
          portal={portal}
          job={job}
          classificationKey={classificationKey}
          applications={applications}
          handleUpdateReview={handleUpdateApplicationReview}
          handleBatchUpdateApplicationReviews={
            handleBatchUpdateApplicationReviews
          }
        />
      )}
    </div>
  );
};

export default ReviewApplicationsRoot;

const container = document.getElementById("review-applications-container");
if (container !== null) {
  if ("jobId" in container.dataset && "portal" in container.dataset) {
    const jobId = Number(container.dataset.jobId as string);
    const portal = container.dataset.portal as Portal;

    ReactDOM.render(
      <RootContainer>
        <ReviewApplicationsRoot jobId={jobId} portal={portal} />
      </RootContainer>,
      container,
    );
  }
}
