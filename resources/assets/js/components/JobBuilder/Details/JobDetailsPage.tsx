import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { WrappedComponentProps, injectIntl } from "react-intl";
import { Job, JobPosterKeyTask, Criteria, Classification } from "../../../models/types";
import { JobDetails } from "./JobDetails";
import { RootState } from "../../../store/store";
import { DispatchType } from "../../../configureStore";
import { updateJob } from "../../../store/Job/jobActions";
import {
  getJob,
  getTasksByJob,
  getCriteriaByJob,
} from "../../../store/Job/jobSelector";
import RootContainer from "../../RootContainer";
import {
  jobBuilderEnv,
  jobBuilderIntro,
  jobBuilderReview,
} from "../../../helpers/routes";
import JobBuilderStepContainer from "../JobBuilderStep";
import { isJobBuilderComplete } from "../jobBuilderHelpers";
import { navigate } from "../../../helpers/router";
import { useDispatch, useSelector } from "react-redux";
//import { loadClassificationsIntoState } from "../../../../js/store/Classification/classificationActions"
import { getClassifications, getClassificationById } from "../../../../js/store/Classification/classificationSelector"

interface JobDetailsPageProps {
  jobId: number;
  job: Job | null;
  // Tasks associated with the job, used to determine if its complete
  keyTasks: JobPosterKeyTask[];
  // Criteria associated with the job, used to determine if its complete
  criteria: Criteria[];
  classifications: Classification[];
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
}


const JobDetailsPage: React.FunctionComponent<JobDetailsPageProps &
  WrappedComponentProps> = ({
  jobId,
  job,
  classifications,
  handleUpdateJob,
  keyTasks,
  criteria,
  intl,
}): React.ReactElement => {

  const dispatch = useDispatch();

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
    job !== null && isJobBuilderComplete(job, keyTasks, criteria, locale);
  return (
    <JobBuilderStepContainer jobId={jobId} currentPage="details">
      {job !== null && (
        <JobDetails
          job={job}
          classifications={classifications}
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
  classifications: Classification[]
} => ({
  job: getJob(state, ownProps),
  keyTasks: getTasksByJob(state, ownProps),
  criteria: getCriteriaByJob(state, ownProps),
  classifications: getClassifications(state),
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
