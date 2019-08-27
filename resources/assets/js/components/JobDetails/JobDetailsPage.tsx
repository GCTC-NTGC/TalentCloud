import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Job, JobPosterKeyTask, Criteria } from "../../models/types";
import { JobDetailsIntl } from "./JobDetails";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import { updateJob } from "../../store/Job/jobActions";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../store/Job/jobSelector";
import RootContainer from "../RootContainer";
import {
  jobBuilderEnv,
  jobBuilderIntro,
  jobBuilderReview,
} from "../../helpers/routes";
import JobBuilderStepContainer from "../JobBuilder/JobBuilderStep";
import {
  isJobBuilderComplete,
  VALID_COUNT,
} from "../JobBuilder/jobBuilderHelpers";
import { navigate } from "../../helpers/router";

interface JobDetailsPageProps {
  jobId: number;
  job: Job | null;
  // Tasks associated with the job, used to determine if its complete
  keyTasks: JobPosterKeyTask[];
  // Criteria associated with the job, used to determine if its complete
  criteria: Criteria[];
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
}

const JobDetailsPage: React.FunctionComponent<
  JobDetailsPageProps & InjectedIntlProps
> = ({
  jobId,
  job,
  handleUpdateJob,
  keyTasks,
  criteria,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const handleModalCancel = (): void => {};
  const handleModalConfirm = (): void => {
    if (job) {
      navigate(jobBuilderEnv(intl.locale, jobId));
    }
  };
  const handleSubmit = handleUpdateJob;
  const handleReturn = (): void => {
    navigate(jobBuilderIntro(locale, jobId));
  };
  const handleSkipToReview = async (): Promise<void> => {
    if (jobId !== null) {
      navigate(jobBuilderReview(locale, jobId));
    }
  };

  const jobIsComplete =
    job !== null &&
    isJobBuilderComplete(job, keyTasks, VALID_COUNT, criteria, locale);
  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="details">
      {job !== null && (
        <JobDetailsIntl
          job={job}
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
          jobIsComplete={jobIsComplete}
          handleSkipToReview={handleSkipToReview}
        />
      )}
    </JobBuilderStepContainer>
  );
};

const mapStateToPropsPage = (
  state: RootState,
  ownProps: { jobId: number },
): {
  job: Job | null;
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
} => ({
  job: getJob(state, ownProps),
  keyTasks: getTasksByJob(state, ownProps),
  criteria: getCriteriaByJob(state, ownProps),
});

const mapDispatchToPropsPage = (
  dispatch: DispatchType,
): {
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
} => ({
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

export default JobDetailsPageContainer;
