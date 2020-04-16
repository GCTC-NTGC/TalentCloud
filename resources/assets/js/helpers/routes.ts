function applicationShow(
  locale: string,
  prefix: string,
  applicationId: number,
  jobId: number,
): string {
  return `/${locale}/${prefix}/jobs/${jobId}/applications/${applicationId}`;
}

function applicantShow(
  locale: string,
  prefix: string,
  applicantId: number,
  jobId: number,
): string {
  return `/${locale}/${prefix}/jobs/${jobId}/applicants/${applicantId}`;
}

export function managerApplicationShow(
  locale: string,
  applicationId: number,
  jobId: number,
): string {
  return applicationShow(locale, "manager", applicationId, jobId);
}

export function managerApplicantShow(
  locale: string,
  applicantId: number,
  jobId: number,
): string {
  return applicantShow(locale, "manager", applicantId, jobId);
}

export function managerEditProfile(locale: string): string {
  return `/${locale}/manager/profile`;
}

export function managerJobIndex(locale: string): string {
  return `/${locale}/manager/jobs`;
}

export function managerJobSummary(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}`;
}

export function managerJobPreview(locale: string, jobId: number): string {
  return `/${locale}/manager/jobs/${jobId}/preview`;
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
  return `/${locale}/hr/jobs/${jobId}`;
}
export function hrJobReview(locale: string, jobId: number): string {
  return `/${locale}/hr/jobs/${jobId}/review`;
}
export function hrJobPreview(locale: string, jobId: number): string {
  return `/${locale}/hr/jobs/${jobId}/preview`;
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
  jobId: number,
): string => applicationShow(locale, "hr", applicationId, jobId);
export const hrApplicantShow = (
  locale: string,
  applicantId: number,
  jobId: number,
): string => applicantShow(locale, "hr", applicantId, jobId);

export function accountSettings(locale: string): string {
  return `/${locale}/settings`;
}
