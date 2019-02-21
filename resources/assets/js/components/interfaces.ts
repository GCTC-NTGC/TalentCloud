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
  citizenship_declaration: CitizeshipDeclaration;
}

export interface CitizeshipDeclaration {
  id: number;
  name: string;
}
