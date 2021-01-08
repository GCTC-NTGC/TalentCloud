import React, { FunctionComponent, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import nprogress from "nprogress";
import { Job, JobPosterKeyTask, Criteria, Classification } from "../../models/types";
import { JobBuilderPage } from "./jobBuilderHelpers";
import { DispatchType } from "../../configureStore";
import JobBuilderProgressTracker from "./JobBuilderProgressTracker";
import {
  useLoadCriteria,
  useLoadDepartments,
  useLoadClassifications,
  useLoadJob,
  useLoadSkills,
  useLoadTasks,
} from "../../hooks/jobBuilderHooks";

interface JobBuilderStepProps {
  jobId: number | null;
  job: Job | null;
  keyTasks: JobPosterKeyTask[];
  criteria: Criteria[];
  currentPage: JobBuilderPage | null;
  dataIsLoading: boolean;
}

const JobBuilderStep: React.FunctionComponent<JobBuilderStepProps> = ({
  jobId,
  job,
  keyTasks,
  criteria,
  currentPage,
  dataIsLoading,
  children,
}): React.ReactElement => {

  useEffect((): void => {
    if (jobId !== null && job === null) {
      nprogress.start();
    } else if (currentPage !== "intro") {
      nprogress.done();
    }
  }, [currentPage, job, jobId]);

  return (
    <section>
      <JobBuilderProgressTracker
        job={job}
        jobId={jobId}
        tasks={keyTasks}
        criteria={criteria}
        dataIsLoading={dataIsLoading}
        currentPage={currentPage}
      />
      {jobId !== null && job === null && (
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
                id="jobBuilder.loading"
                defaultMessage="Your job is loading..."
                description="Message indicating that the current job is still being loaded."
              />
            </p>
          </div>
        </div>
      )}
      {children}
    </section>
  );
};

export const JobBuilderStepContainer: FunctionComponent<{
  jobId: number | null;
  currentPage: JobBuilderPage | null;
  forceIsLoading?: boolean;
}> = ({ jobId, currentPage, forceIsLoading, children }) => {
  const dispatch = useDispatch<DispatchType>();

  // Trigger fetching of job details
  const { job, isLoadingJob } = useLoadJob(jobId, dispatch);
  const { tasks, isLoadingTasks } = useLoadTasks(jobId, dispatch);
  const { criteria, isLoadingCriteria } = useLoadCriteria(jobId, dispatch);

  // Trigger fetching of other resources needed for Job Builder
  const { isLoadingDepartments } = useLoadDepartments(dispatch);
  const { isLoadingSkills } = useLoadSkills(dispatch);

  const { isLoadingClassifications } = useLoadClassifications(dispatch);

  const dataIsLoading =
    forceIsLoading ||
    isLoadingJob ||
    isLoadingTasks ||
    isLoadingCriteria ||
    isLoadingDepartments ||
    isLoadingSkills ||
    isLoadingClassifications;

  return (
    <JobBuilderStep
      jobId={jobId}
      currentPage={currentPage}
      job={job}
      keyTasks={tasks}
      criteria={criteria}
      dataIsLoading={dataIsLoading}
    >
      {children}
    </JobBuilderStep>
  );
};

export default JobBuilderStepContainer;
