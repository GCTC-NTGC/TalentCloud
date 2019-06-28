import { Job } from "../../models/types";

const isFilled = (value: any | null | undefined): boolean => {
  return value !== null && value !== undefined && value !== "";
};

export const isJobBuilderIntroComplete = (job: Job): boolean => {
  const jobIntroValues = [
    job.department_id,
    job.en.title,
    job.fr.title,
    job.en.division,
    job.fr.division,
  ];
  return jobIntroValues.every(isFilled);
};

export const isJobBuilderDetailsComplete = (
  job: Job,
  locale: string,
): boolean => {
  const jobDetailsValues = [
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
  return jobDetailsValues.every(isFilled);
};

export default { isJobBuilderIntroComplete, isJobBuilderDetailsComplete };
