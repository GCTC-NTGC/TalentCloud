import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Job } from "../../models/types";
import { JobDetailsIntl } from "./JobDetails";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import { fetchJob, updateJob } from "../../store/Job/jobActions";
import { getJob } from "../../store/Job/jobSelector";
import RootContainer from "../RootContainer";
import { VALID_COUNT } from "../JobBuilder/jobBuilderHelpers";
import { jobBuilderEnv } from "../../helpers/routes";
import { useLoader } from "../../helpers/customHooks";
import JobBuilderProgressTracker from "../JobBuilder/JobBuilderProgressTracker";

interface JobDetailsPageProps {
  jobId: number;
  job: Job | null;
  loadJob: (jobId: number) => Promise<void>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
}

const JobDetailsPage: React.FunctionComponent<
  JobDetailsPageProps & InjectedIntlProps
> = ({ jobId, job, loadJob, handleUpdateJob, intl }): React.ReactElement => {
  const isLoadingJob = useLoader((): Promise<void> => loadJob(jobId));
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const handleModalCancel = (): void => {};
  const handleModalConfirm = (): void => {
    if (job) {
      window.location.href = jobBuilderEnv(intl.locale, job.id);
    }
    // TODO: what do if selectJob not set yet?
  };
  const handleSubmit = handleUpdateJob;
  return (
    <section>
      <JobBuilderProgressTracker
        job={job}
        tasks={[]} // TODO: pass in actual Tasks
        maxTasksCount={VALID_COUNT}
        criteria={[]} // TODO: pass in actual Criteria
        dataIsLoading={isLoadingJob}
        currentPage="details"
      />
      {isLoadingJob ? (
        <div
          data-c-container="form"
          data-c-padding="top(triple) bottom(triple)"
        >
          <div
            data-c-background="white(100)"
            data-c-card
            data-c-padding="all(double)"
            data-c-radius="rounded"
            data-c-align="base(centre)"
          >
            <p>
              <FormattedMessage
                id="jobBuilderIntroPage.loading"
                defaultMessage="Your job is loading..."
                description="Message indicating that the current job is still being loaded."
              />
            </p>
          </div>
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
  ownProps: { jobId: number },
): {
  job: Job | null;
} => ({
  job: getJob(state, ownProps),
});

const mapDispatchToPropsPage = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => Promise<void>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
} => ({
  loadJob: async (jobId: number): Promise<void> => {
    await dispatch(fetchJob(jobId));
  },
  handleUpdateJob: async (newJob: Job): Promise<boolean> => {
    const result = await dispatch(updateJob(newJob));
    return !result.error;
  },
});

const JobDetailsPageContainer = connect(
  mapStateToPropsPage,
  mapDispatchToPropsPage,
)(injectIntl(JobDetailsPage));

if (document.getElementById("job-builder-details")) {
  const container = document.getElementById(
    "job-builder-details",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  if (jobId) {
    ReactDOM.render(
      <RootContainer>
        <JobDetailsPageContainer jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}
