import React, { useEffect } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import RootContainer from "../RootContainer";
import JobDetails from "./JobDetails";
import { DispatchType } from "../../configureStore";
import { fetchJob } from "../../store/Job/jobActions";
import { Job } from "../../models/types";
import { RootState } from "../../store/store";
import { getJob } from "../../store/Job/jobSelector";

interface JobDetailsPageProps {
  jobId: number | null;
  job: Job | null;
  dispatchFetchJob: (jobId: number) => void;
}

const JobDetailsPage: React.FunctionComponent<JobDetailsPageProps> = ({
  jobId,
  job,
  dispatchFetchJob,
}): React.ReactElement => {
  useEffect((): void => {
    if (jobId) {
      dispatchFetchJob(jobId);
    }
  }, [jobId]);
  const waitingForJob = jobId !== null && job === null;
  const handleModalCancel = (): void => {};
  const handleModalConfirm = (): void => {
    window.location.href = "/manager/jobs";
  }; // TODO: go to next page
  return (
    <div>
      {waitingForJob ? (
        <div
          data-c-container="form"
          data-c-padding="top(triple) bottom(triple)"
        >
          <h3
            data-c-font-size="h3"
            data-c-font-weight="bold"
            data-c-margin="bottom(double)"
          >
            Job Loading...
          </h3>
        </div>
      ) : (
        <JobDetails
          jobId={jobId}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: { jobId: number | null },
): {
  job: Job | null;
} => ({
  job:
    ownProps.jobId !== null
      ? getJob(state, ownProps as { jobId: number })
      : null,
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): { dispatchFetchJob: (jobId: number) => void } => ({
  dispatchFetchJob: (jobId: number): void => {
    dispatch(fetchJob(jobId));
  },
});

const JobDetailsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetailsPage);

if (document.getElementById("job-builder-details")) {
  const container = document.getElementById(
    "job-builder-details",
  ) as HTMLElement;
  const jobId = Number(container.getAttribute("data-job-id"));
  ReactDOM.render(
    <RootContainer>
      <JobDetailsPageContainer jobId={jobId} />
    </RootContainer>,
    container,
  );
}
