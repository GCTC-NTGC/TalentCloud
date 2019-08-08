import React from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, FormattedMessage, injectIntl } from "react-intl";
import ReactDOM from "react-dom";
import { Department, Job } from "../../models/types";
import { VALID_COUNT } from "../JobBuilder/jobBuilderHelpers";
import JobBuilderImpact from "./JobBuilderImpact";
import { jobBuilderTasks } from "../../helpers/routes";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import { updateJob, fetchJob } from "../../store/Job/jobActions";
import { getDepartments } from "../../store/Department/deptSelector";
import { getDepartments as fetchDepartments } from "../../store/Department/deptActions";
import RootContainer from "../RootContainer";
import { useLoader } from "../../helpers/customHooks";
import JobBuilderProgressTracker from "../JobBuilder/JobBuilderProgressTracker";
import { getJob } from "../../store/Job/jobSelector";

interface JobBuilderImpactPageProps {
  jobId: number;
  job: Job | null;
  loadJob: (jobId: number) => Promise<void>;
  departments: Department[];
  loadDepartments: () => Promise<void>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
}

const JobBuilderImpactPage: React.FunctionComponent<
  JobBuilderImpactPageProps & InjectedIntlProps
> = ({
  jobId,
  job,
  loadJob,
  departments,
  loadDepartments,
  handleUpdateJob,
  intl,
}): React.ReactElement => {
  // Load Job and Departments from api
  const isLoadingJob = useLoader((): Promise<void> => loadJob(jobId));
  const isLoadingDepartments = useLoader(loadDepartments);
  const handleModalCancel = (): void => {
    // Do nothing on cancel
  };
  const handleModalConfirm = (): void => {
    window.location.href = jobBuilderTasks(intl.locale, jobId);
  }; // TODO: go to next page
  const handleSubmit = handleUpdateJob;
  return (
    <section>
      <JobBuilderProgressTracker
        job={job}
        tasks={[]} // TODO: pass in actual Tasks
        maxTasksCount={VALID_COUNT}
        criteria={[]} // TODO: pass in actual Criteria
        dataIsLoading={isLoadingJob}
        currentPage="impact"
      />
      {isLoadingJob || isLoadingDepartments || job === null ? (
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
              id="jobBuilderImpact.jobloading"
              defaultMessage="Job Loading..."
              description="Message indicating that the current job is still being loaded."
            />
          </h3>
        </div>
      ) : (
        <JobBuilderImpact
          job={job}
          departments={departments}
          handleSubmit={handleSubmit}
          handleModalCancel={handleModalCancel}
          handleModalConfirm={handleModalConfirm}
        />
      )}
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: { jobId: number },
): {
  job: Job | null;
  departments: Department[];
} => ({
  job: getJob(state, ownProps),
  departments: getDepartments(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  loadJob: (jobId: number) => Promise<void>;
  loadDepartments: () => Promise<void>;
  handleUpdateJob: (newJob: Job) => Promise<boolean>;
} => ({
  loadJob: async (jobId: number): Promise<void> => {
    await dispatch(fetchJob(jobId));
  },
  loadDepartments: async (): Promise<void> => {
    await dispatch(fetchDepartments());
  },
  handleUpdateJob: async (newJob: Job): Promise<boolean> => {
    const result = await dispatch(updateJob(newJob));
    return !result.error;
  },
});

const JobBuilderImpactPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobBuilderImpactPage));

if (document.getElementById("job-builder-impact")) {
  const container = document.getElementById(
    "job-builder-impact",
  ) as HTMLElement;
  const jobIdAttr = container.getAttribute("data-job-id");
  const jobId = jobIdAttr ? Number(jobIdAttr) : null;
  if (jobId) {
    ReactDOM.render(
      <RootContainer>
        <JobBuilderImpactPageContainer jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}
