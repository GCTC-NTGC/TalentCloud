import { number } from "prop-types";

export interface Job {
  id: number;
  title: string;
  classification: string;
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
  application_review: ApplicationReview | null;
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
}

export interface ApplicationReview {
  id: number;
  review_status_id: number | null;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
  review_status: ReviewStatus | null;
}

type ReviewStatusName = "screened_out" | "still_thinking" | "still_in";

export interface ReviewStatus {
  id: number;
  name: ReviewStatusName;
}

export type SavedStatus = "saved" | "saving" | "unsaved";
export interface SavedStatusList {id: number, savedStatus: SavedStatus}[];
