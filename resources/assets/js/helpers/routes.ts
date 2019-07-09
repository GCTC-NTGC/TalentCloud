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
