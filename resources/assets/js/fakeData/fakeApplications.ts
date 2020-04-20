/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import {
  Application,
  ApplicationNormalized,
  ApplicationReview,
  Email,
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
): ApplicationNormalized => ({
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

export const fakeApplications = (): Application[] => [
  fakeApplication1(),
  fakeApplication2(),
  fakeApplication3(),
];

const defaultEmailBody = `Dear [Name]:

GC Talent Reserve [link to website] is a centrally coordinated, whole-of-government platform for talent mobilization in a crisis situation.

This exercise will only take 3-5 minutes of your time and will be a help to the Government of Canada in its efforts to respond to these exceptional circumstances. Please help others by reading this through and completing the questions.

[Name of candidate] has put their name forward to participate in the Government of Canada’s response to COVID-19. As part of the process to help determine how their skills may be best repurposed, they have identified you as a reference and the delegated authority who can approve their participation.

Do you approve [Name of candidate] for putting their name forward to the GC Talent Reserve?

Please confirm if [Name of candidate] is a current indeterminate employee or a term employee.

Please take 5 minutes to confirm if [Name of candidate] has the following skills by putting an “x” beside the appropriate level.

Skill #1
  * Strongly in evidence
  * Moderately in evidence
  * Weakly in evidence
  * Not in evidence

Skill #2
  * Strongly in evidence
  * Moderately in evidence
  * Weakly in evidence
  * Not in evidence

Skill #3
  * Strongly in evidence
  * Moderately in evidence
  * Weakly in evidence
  * Not in evidence

Overall, how would you feel about recommending this person for this type of work in Government? Please put an “x” beside the appropriate level.

Top recommendation
  - [ ] Strongly recommend
  - [ ] Recommend
  - [ ] Recommend with reservations
  - [ ] Do not recommend

Does the employee have any particular strengths you would like to highlight that might be relevant for assisting another department in critical need of talent for this type or work? (This question is optional)

Does the employee have any weaknesses you feel should be mentioned that might be relevant to the employee’s ability to be an asset to a department in critical need of talent for this type or work?  (This question is optional)

Thank you for helping the Government of Canada to navigate this exceptional circumstance.

If you have any questions, do not hesitate to email us at any time.

Best regards,
The Talent Cloud team`;

export const fakeReferenceEmail = (overrides: Partial<Email>): Email => ({
  from: [
    {
      name: "Talent Cloud",
      address: "talent.cloud@canada.test",
    },
  ],
  to: [
    {
      name: "Sam References",
      address: "sam.ref@person.test",
    },
  ],
  cc: [
    {
      name: "First HrAdvisor",
      address: "first.hr.advisor@canada.test",
    },
    {
      name: "Second HrAdvisor",
      address: "second.hr.advisor@canada.test",
    },
  ],
  bcc: [],
  subject: "Reference Requested - GC Talent Reserve",
  body: defaultEmailBody,
  ...overrides,
});

export default fakeApplications;
