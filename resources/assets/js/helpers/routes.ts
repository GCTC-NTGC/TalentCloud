function applicationShow(
  locale: string,
  prefix: string,
  applicationId: number,
): string {
  return `/${locale}/${prefix}/applications/${applicationId}`;
}

function applicantShow(
  locale: string,
  prefix: string,
  applicantId: number,
): string {
  return `/${locale}/${prefix}/applicants/${applicantId}`;
}

export function managerApplicationShow(
  locale: string,
  applicationId: number,
): string {
  return applicationShow(locale, "manager", applicationId);
}

export function managerApplicantShow(
  locale: string,
  applicantId: number,
): string {
  return applicantShow(locale, "manager", applicantId);
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

export function managerScreeningPlan(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/assessment-plan`;
}

export function applicationReviewUpdate(
  locale: string,
  applicationId: number,
): string {
  return `/api/applications/${applicationId}/review`;
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

export function hrJobIndex(locale: string): string {
  return `/${locale}/hr/jobs`;
}
export function hrJobSummary(locale: string, jobId: number): string {
  return `/${locale}/hr/jobs/${jobId}/summary`;
}
export function hrJobReview(locale: string, jobId: number): string {
  return `/${locale}/hr/jobs/${jobId}/review`;
}
export function hrJobPreview(locale: string, jobId: number): string {
  return `/${locale}/hr/jobs/${jobId}`;
}
export function hrScreeningPlan(locale: string, jobId: number): string {
  return `/${locale}/hr/jobs/${jobId}/assessment-plan`;
}
export function hrJobApplications(locale: string, jobId: number): string {
  return `/${locale}/hr/jobs/${jobId}/applications`;
}
export const hrApplicationShow = (
  locale: string,
  applicationId: number,
): string => applicationShow(locale, "hr", applicationId);
export const hrApplicantShow = (locale: string, applicantId: number): string =>
  applicantShow(locale, "hr", applicantId);

export function accountSettings(locale: string): string {
  return `/${locale}/settings`;
}
