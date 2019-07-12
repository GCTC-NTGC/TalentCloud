import { Job } from "../../models/types";

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
): "active" | "complete" | "error" | "null" => {
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
): "active" | "complete" | "error" | "null" => {
  if (
    allowUntouched &&
    (job === null || isJobBuilderDetailsUntouched(job, locale))
  ) {
    return "null";
  }
  return job && isJobBuilderDetailsComplete(job, locale) ? "complete" : "error";
};

export default { isJobBuilderIntroComplete, isJobBuilderDetailsComplete };
