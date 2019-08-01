export function managerApplicationShow(
  locale: string,
  applicationId: number,
): string {
  return `/${locale}/manager/applications/${applicationId}`;
}

export function managerApplicantShow(
  locale: string,
  applicantId: number,
): string {
  return `/${locale}/manager/applicants/${applicantId}`;
}

export function managerJobIndex(locale: string): string {
  return `/${locale}/manager/jobs`;
}

export function managerJobShow(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}`;
}

export function managerJobApplications(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/applications`;
}

export function applicationReviewUpdate(
  locale: string,
  applicationId: number,
): string {
  return `/${locale}/applications/${applicationId}/review`;
}

export function jobBuilderDetails(locale: string, jobId?: number): string {
  if (jobId) {
    return `/${locale}/manager/jobs/${jobId}/builder/details`;
  }
  return `/${locale}/manager/job-builder/details`;
}

export function jobBuilderEnv(locale: string, jobId?: number): string {
  if (jobId) {
    return `/${locale}/manager/jobs/${jobId}/builder/environment`;
  }
  return `/${locale}/manager/job-builder/environment`;
}

export function jobBuilderImpact(locale: string, jobId?: number): string {
  if (jobId) {
    return `/${locale}/manager/jobs/${jobId}/builder/impact`;
  }
  return `/${locale}/manager/job-builder/impact`;
}

export function jobBuilderTasks(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/builder/tasks`;
}

export function jobBuilderSkills(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/builder/skills`;
}
