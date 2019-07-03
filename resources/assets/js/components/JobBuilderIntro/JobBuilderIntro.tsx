import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import IntroForm from "./IntroForm";
import { Job } from "../../models/types";
import { ProgressTrackerItem } from "../ProgressTracker/types";
import { RootState } from "../../store/store";
import { getSelectedJob } from "../../store/Job/jobSelector";
import { DispatchType } from "../../configureStore";
import {
  fetchJob,
  setSelectedJob,
  createJob,
  updateJob,
} from "../../store/Job/jobActions";
import RootContainer from "../RootContainer";
import { jobBuilderDetails } from "../../helpers/routes";

interface JobBuilderIntroProps {
  // The id of the edited job, or null for a new job.
  jobId: number | null;
  // If not null, used to prepopulate form values.
  // Note: its possible for jobId to be non-null, but job to be null, if the data hasn't been loaded yet.
  job: Job | null;
  // This will be called when jobId is set and job is null. It should cause the job data to be loaded and passed in.
  loadJob: (jobId: number) => void;
  // Creates a new job. Must return the new job if successful.
  handleCreateJob: (newJob: Job) => Promise<Job>;
  // Updates an existing job. Must return the updated job if successful.
  handleUpdateJob: (newJob: Job) => Promise<Job>;
}

const JobBuilderIntro: React.FunctionComponent<JobBuilderIntroProps> = ({
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
  const handleSubmit = job ? handleUpdateJob : handleCreateJob;

  const handleContinueEn = (newJob: Job): void => {
    window.location.href = jobBuilderDetails("en", newJob.id);
  };
  const handleContinueFr = (newJob: Job): void => {
    window.location.href = jobBuilderDetails("fr", newJob.id);
  };
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
              id="jobBuilderIntroPage.loading"
              defaultMessage="Job Loading..."
              description="Message indicating that the current job is still being loaded."
            />
          </h3>
        </div>
      ) : (
        <IntroForm
          job={job}
          handleSubmit={handleSubmit}
          handleContinueEn={handleContinueEn}
          handleContinueFr={handleContinueFr}
        />
      )}
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
): {
  job: Job | null;
} => ({
  job: getSelectedJob(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => void;
  handleCreateJob: (newJob: Job) => Promise<Job>;
  handleUpdateJob: (newJob: Job) => Promise<Job>;
} => ({
  loadJob: (jobId: number): void => {
    dispatch(fetchJob(jobId));
    dispatch(setSelectedJob(jobId));
  },
  handleCreateJob: async (newJob: Job): Promise<Job> => {
    const result = await dispatch(createJob(newJob));
    if (!result.error) {
      const resultJob = await result.payload;
      dispatch(setSelectedJob(resultJob.id));
      return resultJob;
    }
    return Promise.reject(result.payload);
  },
  handleUpdateJob: async (newJob: Job): Promise<Job> => {
    const result = await dispatch(updateJob(newJob));
    if (!result.error) {
      const resultJob = await result.payload;
      return resultJob;
    }
    return Promise.reject(result.payload);
  },
});

const JobBuilderIntroPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobBuilderIntro);

if (document.getElementById("job-builder-intro")) {
  const container: HTMLElement = document.getElementById(
    "job-builder-intro",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  ReactDOM.render(
    <RootContainer>
      <JobBuilderIntroPageContainer jobId={jobId} />
    </RootContainer>,
    container,
  );
}

export default JobBuilderIntroPageContainer;
