import { Job, JobPosterKeyTask } from "../../models/types";
import { ProgressTrackerState } from "../ProgressTracker/types";

/** Job Builder Constants */
export const VALID_COUNT = 6;

const isFilled = (value: any | null | undefined): boolean => {
  return value !== null && value !== undefined && value !== "";
};

const isEmpty = (value: any | null | undefined): boolean => {
  return value === null || value === undefined;
};

const jobIntroValues = (job: Job): (string | number | null)[] => [
  job.department_id,
  job.en.title,
  job.fr.title,
  job.en.division,
  job.fr.division,
];
const isJobBuilderIntroComplete = (job: Job): boolean => {
  return jobIntroValues(job).every(isFilled);
};
const isJobBuilderIntroUntouched = (job: Job): boolean =>
  jobIntroValues(job).every(isEmpty);

/**
 * Return the ProgressTrackerItem state for the intro step.
 * @param job
 * @param allowUntouched If allowUntouched is set to true, the state will be "null" (instead of "error") when the step has never been touched.
 */
export const jobBuilderIntroProgressState = (
  job: Job | null,
  allowUntouched = false,
): ProgressTrackerState => {
  if (allowUntouched && (job === null || isJobBuilderIntroUntouched(job))) {
    return "null";
  }
  return job && isJobBuilderIntroComplete(job) ? "complete" : "error";
};

const jobDetailsValues = (
  job: Job,
  locale: string,
): (string | number | null | boolean)[] => [
  job.term_qty,
  job.classification_code,
  job.classification_level,
  job.security_clearance_id,
  job.language_requirement_id,
  job.province_id,
  job.remote_work_allowed,
  job.telework_allowed_frequency_id,
  job.flexible_hours_frequency_id,
  job[locale].title,
  job[locale].city,
];

export const isJobBuilderDetailsComplete = (
  job: Job,
  locale: string,
): boolean => {
  return jobDetailsValues(job, locale).every(isFilled);
};

export const isJobBuilderDetailsUntouched = (
  job: Job,
  locale: string,
): boolean => {
  const nullableValues = jobDetailsValues(job, locale).filter(
    (item): boolean => typeof item !== "boolean",
  );
  return nullableValues.every(isEmpty);
};

/**
 *
 * @param job
 * @param locale
 * @param allowUntouched If allowUntouched is set to true, the state will be "null" (instead of "error") when the step has never been touched.
 */
export const jobBuilderDetailsProgressState = (
  job: Job | null,
  locale: string,
  allowUntouched = false,
): ProgressTrackerState => {
  if (
    allowUntouched &&
    (job === null || isJobBuilderDetailsUntouched(job, locale))
  ) {
    return "null";
  }
  return job && isJobBuilderDetailsComplete(job, locale) ? "complete" : "error";
};

const jobEnvValues = (job: Job, locale: string): (string | number | null)[] => [
  job.team_size,
  job.fast_vs_steady,
  job.horizontal_vs_vertical,
  job.experimental_vs_ongoing,
  job.citizen_facing_vs_back_office,
  job.collaborative_vs_independent,
  job.work_env_features,
  job[locale].culture_summary,
];
const jobEnvValuesOptional = (
  job: Job,
  locale: string,
): (string | number | null)[] => [
  job[locale].work_env_description,
  job[locale].culture_special,
];

const isJobBuilderEnvComplete = (job: Job, locale: string): boolean => {
  return jobEnvValues(job, locale).every(isFilled);
};
const isJobBuilderEnvUntouched = (job: Job, locale: string): boolean => {
  const allJobValues = {
    ...jobEnvValues(job, locale),
    ...jobEnvValuesOptional(job, locale),
  };
  const nullableValues = allJobValues.filter(
    (item): boolean => typeof item !== "boolean",
  );
  return nullableValues.every(isEmpty);
};
export const jobBuilderEnvProgressState = (
  job: Job | null,
  locale: string,
  allowUntouched = false,
): ProgressTrackerState => {
  if (
    allowUntouched &&
    (job === null || isJobBuilderEnvUntouched(job, locale))
  ) {
    return "null";
  }
  return job && isJobBuilderEnvComplete(job, locale) ? "complete" : "error";
};

const jobImpactValues = (job: Job, locale: "en" | "fr"): (string | null)[] => [
  job[locale].dept_impact,
  job[locale].team_impact,
  job[locale].hire_impact,
];
const isJobImpactComplete = (job: Job, locale: "en" | "fr"): boolean => {
  return jobImpactValues(job, locale).every(isFilled);
};
const isJobImpactUntouched = (job: Job, locale: "en" | "fr"): boolean => {
  return jobImpactValues(job, locale).every(isEmpty);
};
export const jobImpactProgressState = (
  job: Job | null,
  locale: "en" | "fr",
  allowUntouched = false,
): ProgressTrackerState => {
  if (allowUntouched && (job === null || isJobImpactUntouched(job, locale))) {
    return "null";
  }
  return job && isJobImpactComplete(job, locale) ? "complete" : "error";
};

const isKeyTaskComplete = (
  task: JobPosterKeyTask,
  locale: "en" | "fr",
): boolean => isFilled(task[locale].description);
const isJobTasksComplete = (
  tasks: JobPosterKeyTask[],
  maxCount: number,
  locale: "en" | "fr",
): boolean => {
  return (
    tasks.length > 0 &&
    tasks.length <= maxCount &&
    tasks.every((task): boolean => isKeyTaskComplete(task, locale))
  );
};
// FIXME: There is currently no way to know the difference between an empty list, and an untouched list of tasks
const isJobTasksUntouched = (tasks: JobPosterKeyTask[]): boolean =>
  tasks.length === 0;
export const jobTasksProgressState = (
  tasks: JobPosterKeyTask[],
  maxCount: number,
  locale: "en" | "fr",
  allowUntouched = false,
): ProgressTrackerState => {
  if (allowUntouched && isJobTasksUntouched(tasks)) {
    return "null";
  }
  return isJobTasksComplete(tasks, maxCount, locale) ? "complete" : "error";
};
