import { Job, JobPosterKeyTask, Criteria } from "../../models/types";
import { ProgressTrackerState } from "../ProgressTracker/types";
import {
  jobBuilderIntro,
  jobBuilderDetails,
  jobBuilderEnv,
  jobBuilderImpact,
  jobBuilderTasks,
  jobBuilderSkills,
  jobBuilderReview,
} from "../../helpers/routes";
import {
  localizeField,
  localizeFieldNonNull,
  Locales,
} from "../../helpers/localize";

/** Job Builder Constants */
export const NUM_OF_TASKS = 6;

const isFilled = (value: any | null | undefined): boolean => {
  return value !== null && value !== undefined && value !== "";
};

const isEmpty = (value: any | null | undefined): boolean => {
  return value === null || value === undefined;
};

const jobIntroValues = (job: Job) => [
  job.department_id,
  localizeField("en", job, "division"),
  localizeField("fr", job, "division"),
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
  locale: Locales,
) => [
  job.term_qty,
  job.classification_id,
  job.classification_level,
  job.security_clearance_id,
  job.language_requirement_id,
  job.province_id,
  job.remote_work_allowed,
  job.telework_allowed_frequency_id,
  job.flexible_hours_frequency_id,
  localizeField(locale, job, "title"),
  localizeField(locale, job, "city"),
];

export const isJobBuilderDetailsComplete = (
  job: Job,
  locale: Locales,
): boolean => {
  return jobDetailsValues(job, locale).every(isFilled);
};

export const isJobBuilderDetailsUntouched = (
  job: Job,
  locale: Locales,
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
  locale: Locales,
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

const jobEnvValues = (
  job: Job,
  locale: Locales,
) => [
  job.team_size,
  job.fast_vs_steady,
  job.horizontal_vs_vertical,
  job.experimental_vs_ongoing,
  job.citizen_facing_vs_back_office,
  job.collaborative_vs_independent,
  job.work_env_features,
  localizeField(locale, job, "culture_summary"),
];
const jobEnvValuesOptional = (job: Job, locale: Locales): (string | null)[] => [
  localizeField(locale, job, "work_env_description"),
  localizeField(locale, job, "culture_special"),
];

const isJobBuilderEnvComplete = (job: Job, locale: Locales): boolean => {
  return jobEnvValues(job, locale).every(isFilled);
};
const isJobBuilderEnvUntouched = (job: Job, locale: Locales): boolean => {
  const allJobValues = [
    ...jobEnvValues(job, locale),
    ...jobEnvValuesOptional(job, locale),
  ];
  const nullableValues = allJobValues.filter(
    (item): boolean => typeof item !== "boolean",
  );
  return nullableValues.every(isEmpty);
};
export const jobBuilderEnvProgressState = (
  job: Job | null,
  locale: Locales,
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
  localizeField(locale, job, "dept_impact"),
  localizeField(locale, job, "team_impact"),
  localizeField(locale, job, "hire_impact"),
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
): boolean => isFilled(localizeFieldNonNull(locale, task, "description"));
const isJobTasksComplete = (
  tasks: JobPosterKeyTask[],
  locale: "en" | "fr",
): boolean => {
  return (
    tasks.length > 0 &&
    tasks.length <= NUM_OF_TASKS &&
    tasks.every((task): boolean => isKeyTaskComplete(task, locale))
  );
};
// FIXME: There is currently no way to know the difference between an empty list, and an untouched list of tasks
const isJobTasksUntouched = (tasks: JobPosterKeyTask[]): boolean =>
  tasks.length === 0;
export const jobTasksProgressState = (
  tasks: JobPosterKeyTask[],
  locale: "en" | "fr",
  allowUntouched = false,
): ProgressTrackerState => {
  if (allowUntouched && isJobTasksUntouched(tasks)) {
    return "null";
  }
  return isJobTasksComplete(tasks, locale) ? "complete" : "error";
};

const isCriterionComplete = (
  criterion: Criteria,
  locale: "en" | "fr",
): boolean => isFilled(localizeField(locale, criterion, "description"));
// FIXME: There is currently no way to know the difference between an untouched list, and one where criteria have been added then removed
const isCriteriaUntouched = (criteria: Criteria[]): boolean =>
  criteria.length === 0;
const isCriteriaComplete = (
  criteria: Criteria[],
  locale: "en" | "fr",
): boolean => {
  return (
    criteria.length > 0 &&
    criteria.every((criterion): boolean =>
      isCriterionComplete(criterion, locale),
    )
  );
};
export const criteriaProgressState = (
  criteria: Criteria[],
  locale: "en" | "fr",
  allowUntouched = false,
): ProgressTrackerState => {
  if (allowUntouched && isCriteriaUntouched(criteria)) {
    return "null";
  }
  return isCriteriaComplete(criteria, locale) ? "complete" : "error";
};

export const isJobBuilderComplete = (
  job: Job,
  tasks: JobPosterKeyTask[],
  criteria: Criteria[],
  locale: "en" | "fr",
): boolean => {
  return (
    isJobBuilderIntroComplete(job) &&
    isJobBuilderDetailsComplete(job, locale) &&
    isJobBuilderEnvComplete(job, locale) &&
    isJobImpactComplete(job, locale) &&
    isJobTasksComplete(tasks, locale) &&
    isCriteriaComplete(criteria, locale)
  );
};

export type JobBuilderPage =
  | "intro"
  | "details"
  | "env"
  | "impact"
  | "tasks"
  | "skills"
  | "review";

export const pageToUrlBuilder = (
  page: JobBuilderPage,
): ((locale: string, jobId?: number) => string) => {
  switch (page) {
    case "intro":
      return jobBuilderIntro;
    case "details":
      return jobBuilderDetails;
    case "env":
      return jobBuilderEnv;
    case "impact":
      return jobBuilderImpact;
    case "tasks":
      return jobBuilderTasks;
    case "skills":
      return jobBuilderSkills;
    case "review":
    default:
      return jobBuilderReview;
  }
};
