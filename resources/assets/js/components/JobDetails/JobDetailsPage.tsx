import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Job } from "../../models/types";
import { JobDetailsIntl } from "./JobDetails";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import {
  fetchJob,
  createJob,
  updateJob,
  setSelectedJob,
} from "../../store/Job/jobActions";
import {
  getJob as selectJob,
  getSelectedJob,
} from "../../store/Job/jobSelector";
import RootContainer from "../RootContainer";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { ProgressTrackerItem } from "../ProgressTracker/types";

interface JobDetailsPageProps {
  jobId: number | null;
  job: Job | null;
  loadJob: (jobId: number) => void;
  handleCreateJob: (newJob: Job) => Promise<boolean>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
}

const JobDetailsPage: React.FunctionComponent<JobDetailsPageProps> = ({
  jobId,
  job,
  loadJob,
  handleCreateJob,
  handleUpdateJob,
}): React.ReactElement => {
  useEffect((): void => {
    if (jobId) {
      loadJob(jobId);
    }
  }, [jobId, loadJob]);

  const waitingForJob = jobId !== null && job === null;
  const handleModalCancel = (): void => {};
  const handleModalConfirm = (): void => {
    window.location.href = "/manager/jobs";
  }; // TODO: go to next page
  const handleSubmit = job ? handleUpdateJob : handleCreateJob;
  const progressTrackerItems: ProgressTrackerItem[] = [
    { state: "active", label: "Step 01", title: "Job Info" },
    { state: "complete", label: "Step 02", title: "Work Env." },
    { state: "error", label: "Step 03", title: "Impact" },
  ];
  return (
    <section>
      <ProgressTracker
        items={progressTrackerItems}
        backgroundColor="black"
        fontColor="white"
        classNames="manager-jpb-tracker"
        itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
      />
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
            <FormattedMessage
              id="jobDetailsPage.loading"
              defaultMessage="Job Loading..."
              description="Message indicating that the current job is still being loaded."
            />
          </h3>
        </div>
      ) : (
        <JobDetailsIntl
          job={job}
          handleSubmit={handleSubmit}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </section>
  );
};

const mapStateToPropsPage = (
  state: RootState,
): {
  job: Job | null;
  getJob: (jobId: number | null) => Job | null;
} => ({
  job: getSelectedJob(state),
  getJob: (jobId: number | null): Job | null =>
    jobId ? selectJob(state, { jobId }) : null,
});

const mapDispatchToPropsPage = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => void;
  handleCreateJob: (newJob: Job) => Promise<boolean>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
} => ({
  loadJob: (jobId: number): void => {
    dispatch(fetchJob(jobId));
    dispatch(setSelectedJob(jobId));
  },
  handleCreateJob: async (newJob: Job): Promise<boolean> => {
    const result = await dispatch(createJob(newJob));
    if (!result.error) {
      const resultJob = await result.payload;
      dispatch(setSelectedJob(resultJob.id));
    }
    return !result.error;
  },
  handleUpdateJob: async (newJob: Job): Promise<boolean> => {
    const result = await dispatch(updateJob(newJob));
    return !result.error;
  },
});

const JobDetailsPageContainer = connect(
  mapStateToPropsPage,
  mapDispatchToPropsPage,
)(JobDetailsPage);

if (document.getElementById("job-builder-details")) {
  const container = document.getElementById(
    "job-builder-details",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  ReactDOM.render(
    <RootContainer>
      <JobDetailsPageContainer jobId={jobId} />
    </RootContainer>,
    container,
  );
}
