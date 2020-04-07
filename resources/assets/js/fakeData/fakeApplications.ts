/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import {
  Application,
  ApplicationNormalized,
  ApplicationReview,
} from "../models/types";

export const fakeApplicationReview = (
  overrides: Partial<ApplicationReview> = {},
): ApplicationReview => ({
  id: 1,
  job_application_id: 1,
  review_status_id: 6,
  notes: "Here's some notes.",
  created_at: new Date("2020-01-02"),
  updated_at: new Date("2020-01-02"),
  review_status: {
    id: 6,
    name: "assessment_required",
  },
  department_id: null,
  department: null,
  ...overrides,
});

export const fakeApplicationNormalized = (
  overrides: Partial<ApplicationNormalized> = {},
): Application => ({
  id: 1,
  job_poster_id: 1,
  application_status_id: 1,
  citizenship_declaration_id: 1,
  veteran_status_id: 1,
  preferred_language_id: 1,
  applicant_id: 1,
  applicant_snapshot_id: 1,
  submission_signature: "signed",
  submission_date: "2020-01-01",
  experience_saved: true,
  created_at: new Date("2020-01-01"),
  updated_at: new Date("2020-01-01"),
  veteran_status: {
    id: 1,
    name: "none",
  },
  citizenship_declaration: {
    id: 1,
    name: "citizen",
  },
  applicant: {
    id: 1,
    personal_website: "www.somesite.com",
    tagline: "Tagline",
    twitter_username: "someperson",
    linkedin_url: "linkedin.com/someperson",
    user_id: 1,
    created_at: new Date("2019-12-31"),
    updated_at: new Date("2019-12-31"),
    user: {
      id: 1,
      first_name: "Frankie",
      last_name: "Lambda",
      full_name: "Frankie Lambda",
      email: "frankie.lambda@canada.ca",
      is_confirmed: true,
      user_role_id: 1,
      created_at: new Date("2019-12-31"),
      updated_at: new Date("2019-12-31"),
      is_priority: false,
      not_in_gov: false,
      gov_email: "frankie.lambda@canada.ca",
      department_id: 1,
      user_role: {
        id: 1,
        key: "basic",
        created_at: new Date("2019-01-01"),
        updated_at: new Date("2019-01-01"),
        name: {
          en: "Applicant",
          fr: "Applicant",
        },
      },
    },
  },
  application_review: undefined,
  meets_essential_criteria: true,
  ...overrides,
});

export const fakeApplication = (
  overrides: Partial<Application> = {},
): Application => {
  const normalizedOverrides = {
    id: 1,
    ...overrides,
  };
  const reviewOverrides = {
    id: normalizedOverrides.id,
    job_application_id: normalizedOverrides.id,
    ...(normalizedOverrides.application_review ?? {}),
  };
  return {
    ...fakeApplicationNormalized(normalizedOverrides),
    application_review: fakeApplicationReview(reviewOverrides),
    ...overrides,
  };
};

export const fakeApplication1 = (
  overrides: Partial<Application> = {},
): Application => {
  return fakeApplication({ id: 1, ...overrides });
};

export const fakeApplication2 = (
  overrides: Partial<Application> = {},
): Application => {
  return fakeApplication({
    id: 2,
    job_poster_id: 2,
    applicant_id: 2,
    ...overrides,
  });
};

export const fakeApplication3 = (
  overrides: Partial<Application> = {},
): Application => {
  return fakeApplication({
    id: 3,
    job_poster_id: 3,
    applicant_id: 3,
    ...overrides,
  });
};

const fakeApplications = (): Application[] => [
  fakeApplication1(),
  fakeApplication2(),
  fakeApplication3(),
];

export default fakeApplications;
