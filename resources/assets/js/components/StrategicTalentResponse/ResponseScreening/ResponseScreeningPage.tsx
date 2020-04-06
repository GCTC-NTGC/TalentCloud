/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import RootContainer from "../../RootContainer";
import {
  ResponseScreeningBuckets as BucketTypes,
  ResponseReviewStatusId,
} from "../../../models/lookupConstants";
import { ResponseScreeningBuckets } from "../../../models/localizedConstants";
import { getDepartments as getDepartmentsAction } from "../../../store/Department/deptActions";
import {
  Application,
  Department,
  ApplicationReview,
} from "../../../models/types";
import ApplicantBucket from "./ApplicantBucket";
import { Portal } from "../../../models/app";
import {
  fetchApplicationsForJob,
  updateApplicationReview as updateApplicationReviewAction,
} from "../../../store/Application/applicationActions";
import { getApplicationsByJob } from "../../../store/Application/applicationSelector";
import { RootState } from "../../../store/store";
import { getDepartments } from "../../../store/Department/deptSelector";

interface ResponseScreeningPageProps {
  applications: Application[];
  departments: Department[];
  handleUpdateReview: (review: ApplicationReview) => void;
  portal: Portal;
}

const ResponseScreeningPage: React.FC<ResponseScreeningPageProps> = ({
  applications,
  departments,
  handleUpdateReview,
  portal,
}): React.ReactElement => {
  return (
    <>
      {Object.keys(ResponseScreeningBuckets).map(bucket => {
        const bucketApplications = applications.filter(application => {
          if (bucket === BucketTypes.ReadyToAllocate) {
            return (
              application.application_review?.review_status_id ===
              ResponseReviewStatusId.ReadyToAllocate
            );
          }
          if (bucket === BucketTypes.Allocated) {
            return (
              application.application_review?.review_status_id ===
              ResponseReviewStatusId.Allocated
            );
          }
          if (bucket === BucketTypes.Unavailable) {
            return (
              application.application_review?.review_status_id ===
              ResponseReviewStatusId.NotAvailable
            );
          }
          if (bucket === BucketTypes.DoesNotQualify) {
            return (
              application.application_review?.review_status_id ===
              ResponseReviewStatusId.ScreenedOut
            );
          }
          // Multiple statuses appear in the "Under Consideration" bucket
          return (
            application.application_review === null ||
            application.application_review?.review_status_id ===
              ResponseReviewStatusId.AssessmentRequired ||
            application.application_review?.review_status_id ===
              ResponseReviewStatusId.ReadyForReference
          );
        });

        return (
          <ApplicantBucket
            applications={bucketApplications}
            bucket={bucket}
            departments={departments}
            handleUpdateReview={handleUpdateReview}
            portal={portal}
          />
        );
      })}
    </>
  );
};

interface ResponseScreeningDataFetcherProps {
  jobId: number;
  portal: Portal;
}

const ResponseScreeningDataFetcher: React.FC<ResponseScreeningDataFetcherProps> = ({
  jobId,
  portal,
}) => {
  const dispatch = useDispatch();

  // Load Applications for provided Job
  useEffect(() => {
    dispatch(fetchApplicationsForJob(jobId));
  }, [dispatch, jobId]);
  const applications = useSelector((state: RootState) =>
    getApplicationsByJob(state, { jobId }),
  );

  // Load all departments
  useEffect(() => {
    dispatch(getDepartmentsAction());
  }, [dispatch]);
  const departments = useSelector(getDepartments);

  const updateApplicationReview = (review: ApplicationReview) => {
    dispatch(updateApplicationReviewAction(review));
  };

  return (
    <ResponseScreeningPage
      applications={applications}
      departments={departments}
      handleUpdateReview={updateApplicationReview}
      portal={portal}
    />
  );
};

const container = document.getElementById("job-index-hr");
if (container !== null) {
  if ("jobId" in container.dataset && "portal" in container.dataset) {
    const jobId = Number(container.dataset.jobId as string);
    const portal = container.dataset.portal as Portal;
    ReactDOM.render(
      <RootContainer>
        <ResponseScreeningDataFetcher jobId={jobId} portal={portal} />
      </RootContainer>,
      container,
    );
  }
}
