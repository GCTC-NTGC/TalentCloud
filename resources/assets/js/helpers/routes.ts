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

export function managerEditProfile(locale: string): string {
  return `/${locale}/manager/profile`;
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

export function jobBuilderIntro(locale: string, jobId?: number): string {
  if (jobId) {
    return `/${locale}/manager/jobs/${jobId}/builder/intro`;
  }
  return `/${locale}/manager/job-builder/intro`;
}

export function jobBuilderDetails(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/builder/details`;
}

export function jobBuilderEnv(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/builder/environment`;
}

export function jobBuilderImpact(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/builder/impact`;
}

export function jobBuilderTasks(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/builder/tasks`;
}

export function jobBuilderSkills(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/builder/skills`;
}

export function jobBuilderReview(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/builder/review`;
}

type FaqSection = "manager-who";

export function managerFaq(locale: string, faqSection?: FaqSection): string {
  const base = `/${locale}/manager/faq`;
  if (faqSection) {
    return `${base}#${faqSection}`;
  }
  return base;
}
