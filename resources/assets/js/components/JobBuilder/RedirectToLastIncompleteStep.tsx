import React, { useEffect } from "react";
import { Job, JobPosterKeyTask, Criteria } from "../../models/types";

interface RedirectToLastIncompleteStepProps {
  job: Job | null;
  jobIsLoading: boolean;
  tasks: JobPosterKeyTask[];
  tasksIsLoading: boolean;
  criteria: Criteria[];
  criteriaIsLoading: boolean;
  redirect: (url: string) => void;
}

const RedirectToLastIncompleteStep: React.FunctionComponent<
  RedirectToLastIncompleteStepProps
> = ({
  job,
  jobIsLoading,
  tasks,
  tasksIsLoading,
  criteria,
  criteriaIsLoading,
  redirect,
}): React.ReactElement => {
  useEffect((): void => {
    redirect("/");
  }, [redirect]);

  return (
    <div>
      <p>Loading your job...</p>
    </div>
  );
};

export default RedirectToLastIncompleteStep;
