import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DispatchType } from "../configureStore";
import {
  Classification,
  Criteria,
  Department,
  Job,
  JobPosterKeyTask,
  Skill,
} from "../models/types";
import {
  getDepartments,
  departmentsIsLoading,
} from "../store/Department/deptSelector";
import { getDepartments as fetchDepartments } from "../store/Department/deptActions";
import {
  getCriteriaByJob,
  getCriteriaForJobIsUpdating,
  getJob,
  getJobIsUpdating,
  getTasksByJob,
  getTasksForJobIsUpdating,
} from "../store/Job/jobSelector";
import { RootState } from "../store/store";
import {
  fetchCriteria,
  fetchJob,
  setSelectedJob,
} from "../store/Job/jobActions";
import { getSkills, getSkillsUpdating } from "../store/Skill/skillSelector";
import { fetchSkills } from "../store/Skill/skillActions";
import { getClassifications, classificationsIsLoading } from "../store/Classification/classificationSelector";
import { loadClassificationsIntoState } from "../store/Classification/classificationActions";

export function useLoadJob(
  jobId: number | null,
  dispatch: DispatchType,
): { job: Job | null; isLoadingJob: boolean } {
  const job = useSelector((state: RootState) =>
    jobId !== null ? getJob(state, { jobId }) : null,
  );
  const isLoadingJob = useSelector((state: RootState) =>
    jobId !== null ? getJobIsUpdating(state, jobId) : false,
  );
  useEffect(() => {
    if (jobId !== null && job === null && !isLoadingJob) {
      dispatch(fetchJob(jobId));
    }
  }, [jobId, job, isLoadingJob, dispatch]);
  useEffect(() => {
    dispatch(setSelectedJob(jobId));
  }, [jobId, dispatch]);
  return { job, isLoadingJob };
}

export function useLoadTasks(
  jobId: number | null,
  dispatch: DispatchType,
): { tasks: JobPosterKeyTask[]; isLoadingTasks: boolean } {
  const tasks = useSelector((state: RootState) =>
    jobId !== null ? getTasksByJob(state, { jobId }) : [],
  );
  const isLoadingTasks = useSelector((state: RootState) =>
    jobId !== null ? getTasksForJobIsUpdating(state, jobId) : false,
  );
  const [hasFetchedTasks, setHasFetchedTasks] = useState(false);
  useEffect((): (() => void) => {
    let isSubscribed = true;
    if (jobId && tasks.length === 0 && !isLoadingTasks && !hasFetchedTasks) {
      setHasFetchedTasks(true);
      dispatch(fetchJob(jobId)).catch((): void => {
        if (isSubscribed) {
          setHasFetchedTasks(false);
        }
      });
    }
    return (): void => {
      isSubscribed = false;
    };
  }, [jobId, tasks.length, isLoadingTasks, hasFetchedTasks, dispatch]);
  return { tasks, isLoadingTasks };
}

export function useLoadCriteria(
  jobId: number | null,
  dispatch: DispatchType,
): {
  criteria: Criteria[];
  isLoadingCriteria: boolean;
} {
  const criteria = useSelector((state: RootState) =>
    jobId ? getCriteriaByJob(state, { jobId }) : [],
  );
  const isLoadingCriteria = useSelector((state: RootState) =>
    jobId ? getCriteriaForJobIsUpdating(state, jobId) : false,
  );
  const [hasFetchedCriteria, setHasFetchedCriteria] = useState(false);
  useEffect((): (() => void) => {
    let isSubscribed = true;
    if (
      jobId &&
      criteria.length === 0 &&
      !isLoadingCriteria &&
      !hasFetchedCriteria
    ) {
      setHasFetchedCriteria(true);
      dispatch(fetchCriteria(jobId)).catch((): void => {
        if (isSubscribed) {
          setHasFetchedCriteria(false);
        }
      });
    }
    return (): void => {
      isSubscribed = false;
    };
  }, [jobId, criteria.length, isLoadingCriteria, hasFetchedCriteria, dispatch]);
  return { criteria, isLoadingCriteria };
}

export function useLoadDepartments(
  dispatch: DispatchType,
): {
  departments: Department[];
  isLoadingDepartments: boolean;
} {
  const departments = useSelector(getDepartments);
  const isLoading = useSelector(departmentsIsLoading);
  useEffect((): void => {
    if (departments.length === 0 && !isLoading) {
      dispatch(fetchDepartments());
    }
  }, [departments.length, isLoading, dispatch]);
  return { departments, isLoadingDepartments: isLoading };
}

export function useLoadClassifications(
  dispatch: DispatchType,
) : {
  classifications: Classification[];
  isLoadingDepartments: boolean;
} {

  const classifications = useSelector(getClassifications);
  const isLoading = useSelector(classificationsIsLoading);

  useEffect((): void => {
    if (classifications.length === 0 && !isLoading) {
      dispatch(loadClassificationsIntoState());
    }
  }, [classifications.length, isLoading, dispatch]);

  return { classifications, isLoadingDepartments: isLoading };
}

export function useLoadSkills(
  dispatch: DispatchType,
): {
  skills: Skill[];
  isLoadingSkills: boolean;
} {
  const skills = useSelector(getSkills);
  const isLoading = useSelector(getSkillsUpdating);
  useEffect((): void => {
    if (skills.length === 0 && !isLoading) {
      dispatch(fetchSkills());
    }
  }, [skills.length, isLoading, dispatch]);
  return { skills, isLoadingSkills: isLoading };
}
