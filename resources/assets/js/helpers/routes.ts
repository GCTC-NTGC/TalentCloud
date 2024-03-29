import { Locales } from "./localize";
import { Portal } from "../models/app";

/* eslint-disable no-useless-escape */
function stripTrailingSlash(str: string): string {
  return str.endsWith("/") ? str.slice(0, -1) : str;
}

function isValidUrl(str: string): boolean {
  if (str.startsWith("http://") || str.startsWith("https://")) {
    try {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const url = new URL(str);
    } catch (_) {
      return false;
    }
    return true;
  }
  return false;
}

export function baseUrl(): string {
  const base = document.querySelector("meta[name='base-url']");
  if (base !== null) {
    return stripTrailingSlash(base.getAttribute("content") ?? "");
  }
  return "";
}

export function basePathname(): string {
  const base = baseUrl();
  return isValidUrl(base) ? new URL(baseUrl()).pathname : "";
}

export function baseApiUrl(version = 1): string {
  return `${baseUrl()}/api/v${version}`;
}

/**
 *
 * @param imgFile The name of the img file, not including the /images/ path.
 */
export function imageUrl(imgFile: string): string {
  return `${baseUrl()}/images/${imgFile}`;
}

/**
 * Removes the base url or base pathname if the given url starts with them.
 * @param url
 */
export function removeBaseUrl(url: string): string {
  const base = baseUrl();
  if (url.startsWith(base)) {
    return url.substr(base.length);
  }
  const basePath = basePathname();
  if (url.startsWith(basePath)) {
    return url.substr(basePath.length);
  }
  return url;
}

export function jobShow(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/jobs/${jobId}`;
}

function applicationShow(
  locale: string,
  prefix: string,
  applicationId: number,
  jobId: number,
): string {
  return `${baseUrl()}/${locale}/${prefix}/jobs/${jobId}/applications/${applicationId}`;
}

function applicantShow(
  locale: string,
  prefix: string,
  applicantId: number,
  jobId: number,
): string {
  return `${baseUrl()}/${locale}/${prefix}/jobs/${jobId}/applicants/${applicantId}`;
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
  return `${baseUrl()}/${locale}/manager/profile`;
}

export function managerJobIndex(locale: string): string {
  return `${baseUrl()}/${locale}/manager/jobs`;
}

export function managerJobSummary(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}`;
}

export function managerJobPreview(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/preview`;
}

export function managerJobApplications(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/applications`;
}

export function managerScreeningPlan(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/assessment-plan`;
}

export function applicationReviewUpdate(
  locale: string,
  applicationId: number,
): string {
  return `${baseApiUrl()}/applications/${applicationId}/review`;
}

export function jobBuilderIntro(locale: string, jobId?: number): string {
  if (jobId) {
    return `${baseUrl()}/${locale}/manager/jobs/${jobId}/builder/intro`;
  }
  return `${baseUrl()}/${locale}/manager/job-builder/intro`;
}

export function jobBuilderDetails(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/builder/details`;
}

export function jobBuilderEnv(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/builder/environment`;
}

export function jobBuilderImpact(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/builder/impact`;
}

export function jobBuilderTasks(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/builder/tasks`;
}

export function jobBuilderSkills(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/builder/skills`;
}

export function jobBuilderReview(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/manager/jobs/${jobId}/builder/review`;
}

type FaqSection = "manager-who" | "levels";

export function applicantFaq(locale: string, faqSection?: FaqSection): string {
  const base = `${baseUrl()}/${locale}/faq`;
  if (faqSection) {
    return `${base}#${faqSection}`;
  }
  return base;
}

export function managerFaq(locale: string, faqSection?: FaqSection): string {
  const base = `${baseUrl()}/${locale}/manager/faq`;
  if (faqSection) {
    return `${base}#${faqSection}`;
  }
  return base;
}

export function hrJobIndex(locale: string): string {
  return `${baseUrl()}/${locale}/hr/jobs`;
}
export function hrJobSummary(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/hr/jobs/${jobId}`;
}
export function hrJobReview(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/hr/jobs/${jobId}/review`;
}
export function hrJobPreview(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/hr/jobs/${jobId}/preview`;
}
export function hrScreeningPlan(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/hr/jobs/${jobId}/assessment-plan`;
}
export function hrJobApplications(locale: string, jobId: number): string {
  return `${baseUrl()}/${locale}/hr/jobs/${jobId}/applications`;
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
  return `${baseUrl()}/${locale}/settings`;
}

export function applicationIndex(locale: Locales): string {
  return `${baseUrl()}/${locale}/applications`;
}

function baseApplicationUrl(locale: Locales, applicationId) {
  return `${baseUrl()}/${locale}/applications/${applicationId}`;
}
export function applicationWelcome(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/welcome`;
}
export function applicationBasic(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/basic`;
}
export function applicationExperienceIntro(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/experience-intro`;
}
export function applicationExperience(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/experience`;
}
export function applicationSkillsIntro(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/skills-intro`;
}
export function applicationSkills(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/skills`;
}
export function applicationFit(locale: Locales, applicationId: number): string {
  return `${baseApplicationUrl(locale, applicationId)}/fit`;
}
export function applicationReview(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/review`;
}
export function applicationSubmission(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/submission`;
}
export function applicationNextSteps(
  locale: Locales,
  applicationId: number,
): string {
  return `${baseApplicationUrl(locale, applicationId)}/next`;
}

/**
 * Converts a string to a url safe equivalent.
 * @param string Any input text.
 * @returns url safe string.
 */
export function slugify(string: string): string {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const getApplicantUrl = (
  locale: Locales,
  portal: Portal,
  applicantId: number,
  jobId: number,
): string => {
  const applicantUrlMap: { [key in typeof portal]: string } = {
    hr: hrApplicantShow(locale, applicantId, jobId),
    manager: managerApplicantShow(locale, applicantId, jobId),
  };

  return applicantUrlMap[portal];
};

export const getApplicationUrl = (
  locale: Locales,
  portal: Portal,
  applicationId: number,
  jobId: number,
): string => {
  const applicationUrlMap: { [key in typeof portal]: string } = {
    hr: hrApplicationShow(locale, applicationId, jobId),
    manager: managerApplicationShow(locale, applicationId, jobId),
  };

  return applicationUrlMap[portal];
};

const baseApplicantProfileUrl = (
  locale: Locales,
  applicantId: number,
): string => {
  return `${baseUrl()}/${locale}/profile/${applicantId}`;
};

export const getApplicantExperienceUrl = (
  locale: Locales,
  applicantId: number,
): string => `${baseApplicantProfileUrl(locale, applicantId)}/experience`;

export const getApplicantSkillsUrl = (
  locale: Locales,
  applicantId: number,
): string => `${baseApplicantProfileUrl(locale, applicantId)}/skills`;
