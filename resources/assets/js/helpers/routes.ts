type Locale = "en" | "fr";

export function managerApplicationShow(
  locale: Locale,
  applicationId: number
): string {
  return `/${locale}/manager/applications/${applicationId}`;
}

export function managerApplicantShow(
  locale: Locale,
  applicantId: number
): string {
  return `/${locale}/manager/applicants/${applicantId}`;
}

export function managerJobShow(locale: Locale, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}`;
}

export function managerJobApplications(locale: Locale, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/applications`;
}

export function applicationReviewUpdate(
  locale: Locale,
  applicationId: number
): string {
  return `/${locale}/applications/${applicationId}/review`;
}
