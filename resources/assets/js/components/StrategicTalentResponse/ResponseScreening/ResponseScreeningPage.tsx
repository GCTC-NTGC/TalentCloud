/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React, { useEffect, useMemo } from "react";
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
  Email,
} from "../../../models/types";
import ApplicantBucket from "./ApplicantBucket";
import { Portal } from "../../../models/app";
import {
  fetchApplicationsForJob,
  updateApplicationReview as updateApplicationReviewAction,
  fetchReferenceEmails,
} from "../../../store/Application/applicationActions";
import {
  getApplicationsByJob,
  allIsFetchingReferenceEmailsByApplication,
  getAllReferenceEmails,
} from "../../../store/Application/applicationSelector";
import { RootState } from "../../../store/store";
import { getDepartments } from "../../../store/Department/deptSelector";
import { fakeReferenceEmail } from "../../../fakeData/fakeApplications";
import { hasKey } from "../../../helpers/queries";

interface ResponseScreeningPageProps {
  applications: Application[];
  departments: Department[];
  handleUpdateReview: (review: ApplicationReview) => Promise<ApplicationReview>;
  portal: Portal;
  referenceEmails: {
    director: {
      byApplicationId: {
        [applicationId: number]: Email;
      };
    };
    secondary: {
      byApplicationId: {
        [applicationId: number]: Email;
      };
    };
  };
  requestReferenceEmails: (applicationId: number) => void;
}

const ResponseScreeningPage: React.FC<ResponseScreeningPageProps> = ({
  applications,
  departments,
  handleUpdateReview,
  portal,
  referenceEmails,
  requestReferenceEmails,
}): React.ReactElement => (
  <>
    {Object.keys(ResponseScreeningBuckets).map((bucket) => {
      const bucketApplications = applications.filter((application) => {
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
          application.application_review === undefined ||
          application.application_review?.review_status_id === null ||
          application.application_review?.review_status_id ===
            ResponseReviewStatusId.AssessmentRequired ||
          application.application_review?.review_status_id ===
            ResponseReviewStatusId.ReadyForReference
        );
      });

      return (
        <ApplicantBucket
          key={bucket}
          applications={bucketApplications}
          bucket={bucket}
          departments={departments}
          handleUpdateReview={handleUpdateReview}
          portal={portal}
          referenceEmails={referenceEmails}
          requestReferenceEmails={requestReferenceEmails}
        />
      );
    })}
  </>
);

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

  const updateApplicationReview = async (
    review: ApplicationReview,
  ): Promise<ApplicationReview> => {
    const result = await dispatch(updateApplicationReviewAction(review));
    if (!result.error) {
      const resultReview = await result.payload;
      return resultReview;
    }
    return Promise.reject(result.payload);
  };

  // Load micro-reference emails
  const referenceEmails = useSelector(getAllReferenceEmails);
  const isFetchingReferenceEmails = useSelector(
    allIsFetchingReferenceEmailsByApplication,
  );
  const requestReferenceEmails = (applicationId: number): void => {
    if (isFetchingReferenceEmails[applicationId]) {
      return;
    }
    if (
      hasKey(referenceEmails.director.byApplicationId, applicationId) &&
      hasKey(referenceEmails.secondary.byApplicationId, applicationId)
    ) {
      return;
    }
    dispatch(fetchReferenceEmails(applicationId));
  };

  return (
    <ResponseScreeningPage
      applications={applications}
      departments={departments}
      handleUpdateReview={updateApplicationReview}
      portal={portal}
      referenceEmails={referenceEmails}
      requestReferenceEmails={requestReferenceEmails}
    />
  );
};

const container = document.getElementById("response-screening-wrapper");
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
