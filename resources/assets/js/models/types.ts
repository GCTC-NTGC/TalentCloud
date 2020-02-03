/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import { ReviewStatusId, ReviewStatusName } from "./lookupConstants";
import { localizedField, localizedFieldNonNull } from "./app";

export interface Applicant {
  id: number;
  personal_website: string;
  tagline: string;
  twitter_username: string;
  linkedin_url: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  user: User;
}

export interface Application {
  id: number;
  job_poster_id: number;
  application_status_id: number;
  citizenship_declaration_id: number;
  veteran_status_id: number;
  preferred_language_id: number;
  applicant_id: number;
  applicant_snapshot_id: number;
  submission_signature: string;
  submission_date: string;
  experience_saved: boolean;
  created_at: Date;
  updated_at: Date;
  veteran_status: VeteranStatus;
  citizenship_declaration: CitizenshipDeclaration;
  applicant: Applicant;
  application_review: ApplicationReview | undefined;
  meets_essential_criteria: boolean;
}

export interface ApplicationReview {
  id: number;
  review_status_id: ReviewStatusId | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  review_status: ReviewStatus | null;
}

export interface Assessment {
  id: number;
  criterion_id: number;
  assessment_type_id: number;
}

export interface AssessmentPlanNotification {
  id: number;
  job_poster_id: number;
  type: string;
  criteria_id: number;
  criteria_type_id: number;
  criteria_type_id_new: number | null;
  skill_id: number;
  skill_id_new: number | null;
  skill_level_id: number;
  skill_level_id_new: number | null;
  acknowledged: boolean;
  created_at: Date;
}

export interface Classification {
  key: string;
}

type CitizenshipDeclarationName =
  | "citizen"
  | "permanent_resident"
  | "work_permit_open"
  | "work_permit_closed"
  | "not_entitled";
export interface CitizenshipDeclaration {
  id: number;
  name: CitizenshipDeclarationName;
}

export interface Comment {
  id: number;
  job_poster_id: number;
  user_id: number;
  comment: string;
  location: string;
  type_id: number | null;
  created_at: Date;
}

export interface Criteria {
  id: number;
  criteria_type_id: number; // asset or essential
  job_poster_id: number;
  skill_id: number;
  skill_level_id: number;
  description: localizedField;
  specificity: localizedField;
}

export interface Department {
  id: number;
  name: localizedFieldNonNull;
  impact: localizedFieldNonNull;
}

export interface HrAdvisor {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  department_id: number;
  claimed_job_ids: number[];
}

export interface Job {
  id: number;
  manager_id: number;
  chosen_lang: string | null;
  term_qty: number | null;
  open_date_time: Date | null;
  close_date_time: Date | null;
  start_date_time: Date | null;
  department_id: number | null;
  province_id: number | null;
  salary_min: number | null;
  salary_max: number | null;
  noc: number | null;
  job_status_id: number;
  classification_id: number | null;
  classification_level: number | null;
  security_clearance_id: number | null;
  language_requirement_id: number | null;
  remote_work_allowed: boolean;
  published_at: Date | null;
  review_requested_at: Date | null;
  team_size: number | null;
  work_env_features: { [feature: string]: boolean } | null;
  fast_vs_steady: number | null;
  horizontal_vs_vertical: number | null;
  experimental_vs_ongoing: number | null;
  citizen_facing_vs_back_office: number | null;
  collaborative_vs_independent: number | null;
  telework_allowed_frequency_id: number | null;
  flexible_hours_frequency_id: number | null;
  travel_requirement_id: number | null;
  overtime_requirement_id: number | null;
  created_at: Date;
  city: localizedField;
  title: localizedField;
  dept_impact: localizedField;
  team_impact: localizedField;
  hire_impact: localizedField;
  division: localizedField;
  education: localizedField;
  work_env_description: localizedField;
  culture_summary: localizedField;
  culture_special: localizedField;
}

export interface JobPosterKeyTask {
  id: number;
  job_poster_id: number;
  description: localizedFieldNonNull;
}

export interface Manager {
  id: number;
  user_id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  department_id: number | null;
  twitter_username: string | null;
  linkedin_url: string | null;
  is_demo_manager: boolean;
  division: localizedField;
  position: localizedField;
  leadership_style: localizedField;
  expectations: localizedField;
  employee_learning: localizedField;
  career_journey: localizedField;
  learning_path: localizedField;
  about_me: localizedField;
}

export interface RatingGuideAnswer {
  id: number;
  rating_guide_question_id: number;
  criterion_id: number | null;
  expected_answer: string | null;
}

export interface RatingGuideQuestion {
  id: number;
  job_poster_id: number;
  assessment_type_id: number;
  question: string | null;
}

export interface ReviewStatus {
  id: ReviewStatusId;
  name: ReviewStatusName;
}

export interface Skill {
  id: number;
  skill_type_id: number;
  name: localizedFieldNonNull;
  description: localizedFieldNonNull;
  is_culture_skill: boolean;
  is_future_skill: boolean;
  classifications: Classification[];
}

// Version of Assessment that hasn't been saved to server yet
export interface TempAssessment {
  id: number;
  criterion_id: number;
  assessment_type_id: number | null;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_confirmed: boolean;
  user_role_id: number;
  created_at: Date;
  updated_at: Date;
  is_priority: boolean;
  not_in_gov: boolean;
  gov_email: string;
}

type VeteranStatusName = "none" | "current" | "past";
export interface VeteranStatus {
  id: number;
  name: VeteranStatusName;
}
