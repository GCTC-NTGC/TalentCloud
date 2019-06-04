/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import { ReviewStatusId, ReviewStatusName } from "./lookupConstants";

export interface JobTranslation {
  city: string;
  title: string;
  impact: string;
  branch: string;
  division: string;
  education: string;
}

export interface Job {
  id: number;
  title: string;
  classification: string;
  close_date_time: Date;
  en: JobTranslation;
  fr: JobTranslation;
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
  exerience_saved: boolean;
  created_at: Date;
  updated_at: Date;
  veteran_status: VeteranStatus;
  citizenship_declaration: CitizeshipDeclaration;
  applicant: Applicant;
  application_review: ApplicationReview | undefined;
  meets_essential_criteria: boolean;
}

type VeteranStatusName = "none" | "current" | "past";
export interface VeteranStatus {
  id: number;
  name: VeteranStatusName;
}

type CitizenshipDeclarationName =
  | "citizen"
  | "permanent_resident"
  | "work_permit_open"
  | "work_permit_closed"
  | "not_entitled";
export interface CitizeshipDeclaration {
  id: number;
  name: CitizenshipDeclarationName;
}

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

export interface User {
  id: number;
  email: string;
  name: string;
  is_confirmed: boolean;
  user_role_id: number;
  created_at: Date;
  updated_at: Date;
  is_priority: boolean;
}

export interface ApplicationReview {
  id: number;
  review_status_id: ReviewStatusId | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  review_status: ReviewStatus | null;
}

export interface ReviewStatus {
  id: ReviewStatusId;
  name: ReviewStatusName;
}

export interface SkillTranslation {
  name: string;
  description: string;
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  skill_type_id: number;
  en: SkillTranslation;
  fr: SkillTranslation;
}

export interface Criteria {
  id: number;
  criteria_type_id: number; // asset or essential
  job_poster_id: number;
  skill_id: number;
  skill_level_id: number;
  description: string; // TODO: remove un-localized description
  skill: Skill; // TODO: remove skill from here
  en: {
    description: string;
  };
  fr: {
    description: string;
  };
}

export interface Assessment {
  id: number;
  criterion_id: number;
  assessment_type_id: number;
}

// Version of Assessment that hasn't been saved to server yet
export interface TempAssessment {
  id: number;
  criterion_id: number;
  assessment_type_id: number | null;
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

export interface AssessmentPlanNotification {
  id: number;
  job_poster_id: number;
  type: string;
  criteria_id: number;
  criteria_type_id: number;
  skill_id: number;
  skill_id_new: number | null;
  skill_level_id: number;
  skill_level_id_new: number | null;
  acknowledged: boolean;
  created_at: Date;
}
