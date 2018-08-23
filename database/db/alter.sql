CREATE SEQUENCE applicant_profile_answers_seq;

CREATE TABLE applicant_profile_answers (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('applicant_profile_answers_seq'),
  applicant_id int check (applicant_id > 0) NOT NULL,
  applicant_profile_question_id int check (applicant_profile_question_id > 0) NOT NULL,
  answer text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT applicant_profile_answers_applicant_id_foreign FOREIGN KEY (applicant_id) REFERENCES applicants (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT applicant_profile_answers_applicant_profile_question_id_foreign FOREIGN KEY (applicant_profile_question_id) REFERENCES applicant_profile_questions (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE INDEX applicant_profile_answers_applicant_id_index ON applicant_profile_answers (applicant_id);
CREATE INDEX applicant_profile_answers_applicant_profile_question_id_index ON applicant_profile_answers (applicant_profile_question_id);

CREATE SEQUENCE applicant_profile_question_translations_seq;

CREATE TABLE applicant_profile_question_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('applicant_profile_question_translations_seq'),
  applicant_profile_question_id int check (applicant_profile_question_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value text NOT NULL,
  description text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT applicant_profile_question_trans_applicant_profile_question_fk FOREIGN KEY (applicant_profile_question_id) REFERENCES applicant_profile_questions (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX applicant_profile_question_trans_applicant_profile_question_idx ON applicant_profile_question_translations (applicant_profile_question_id);

CREATE SEQUENCE applicant_profile_questions_seq;

CREATE TABLE applicant_profile_questions (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('applicant_profile_questions_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE applicants_seq;

CREATE TABLE applicants (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('applicants_seq'),
  personal_website varchar(191) DEFAULT NULL,
  tagline text,
  twitter_username varchar(191) DEFAULT NULL,
  linkedin_username varchar(191) DEFAULT NULL,
  user_id int check (user_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT applicants_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX applicants_user_id_index ON applicants (user_id);

CREATE SEQUENCE application_micro_references_seq;

CREATE TABLE application_micro_references (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('application_micro_references_seq'),
  job_application_id int check (job_application_id > 0) NOT NULL,
  criteria_id int check (criteria_id > 0) NOT NULL,
  micro_reference_id int check (micro_reference_id > 0) NOT NULL,
  is_active smallint NOT NULL DEFAULT '1',
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT application_micro_references_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES criteria (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT application_micro_references_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES job_applications (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT application_micro_references_micro_reference_id_foreign FOREIGN KEY (micro_reference_id) REFERENCES micro_references (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX application_micro_references_job_application_id_index ON application_micro_references (job_application_id);
CREATE INDEX application_micro_references_criteria_id_index ON application_micro_references (criteria_id);
CREATE INDEX application_micro_references_micro_reference_id_index ON application_micro_references (micro_reference_id);

CREATE SEQUENCE application_status_seq;

CREATE TABLE application_status (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('application_status_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE application_status_translations_seq;

CREATE TABLE application_status_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('application_status_translations_seq'),
  application_status_id int check (application_status_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT application_status_translations_application_status_id_foreign FOREIGN KEY (application_status_id) REFERENCES application_status (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX application_status_translations_application_status_id_index ON application_status_translations (application_status_id);

CREATE SEQUENCE application_work_samples_seq;

CREATE TABLE application_work_samples (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('application_work_samples_seq'),
  job_application_id int check (job_application_id > 0) NOT NULL,
  criteria_id int check (criteria_id > 0) NOT NULL,
  work_sample_id int check (work_sample_id > 0) NOT NULL,
  is_active smallint NOT NULL DEFAULT '1',
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT application_work_samples_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES criteria (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT application_work_samples_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES job_applications (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT application_work_samples_work_sample_id_foreign FOREIGN KEY (work_sample_id) REFERENCES work_samples (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX application_work_samples_job_application_id_index ON application_work_samples (job_application_id);
CREATE INDEX application_work_samples_criteria_id_index ON application_work_samples (criteria_id);
CREATE INDEX application_work_samples_work_sample_id_index ON application_work_samples (work_sample_id);

CREATE SEQUENCE base_content_seq;

CREATE TABLE base_content (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('base_content_seq'),
  base_content_type_id int check (base_content_type_id > 0) NOT NULL,
  key varchar(191) NOT NULL,
  value text NOT NULL,
  locale varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX base_content_base_content_type_id_index ON base_content (base_content_type_id);
CREATE INDEX base_content_key_index ON base_content (key);

CREATE SEQUENCE base_content_types_seq;

CREATE TABLE base_content_types (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('base_content_types_seq'),
  name varchar(191) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE citizenship_declaration_translations_seq;

CREATE TABLE citizenship_declaration_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('citizenship_declaration_translations_seq'),
  citizenship_declaration_id int check (citizenship_declaration_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT citizenship_declaration_trans_citizenship_declaration_fk FOREIGN KEY (citizenship_declaration_id) REFERENCES citizenship_declarations (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX citizenship_declaration_trans_citizenship_declaration_id_idx ON citizenship_declaration_translations (citizenship_declaration_id);

CREATE SEQUENCE citizenship_declarations_seq;

CREATE TABLE citizenship_declarations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('citizenship_declarations_seq'),
  name text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE criteria_seq;

CREATE TABLE criteria (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('criteria_seq'),
  criteria_type_id int check (criteria_type_id > 0) NOT NULL,
  job_poster_id int check (job_poster_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT criteria_criteria_type_id_foreign FOREIGN KEY (criteria_type_id) REFERENCES criteria_types (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT criteria_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX criteria_criteria_type_id_index ON criteria (criteria_type_id);
CREATE INDEX criteria_job_poster_id_index ON criteria (job_poster_id);

CREATE SEQUENCE criteria_translations_seq;

CREATE TABLE criteria_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('criteria_translations_seq'),
  criteria_id int check (criteria_id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  description text,
  locale varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT criteria_translations_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES criteria (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX criteria_translations_criteria_id_index ON criteria_translations (criteria_id);
CREATE INDEX criteria_translations_name_index ON criteria_translations (name);

CREATE SEQUENCE criteria_types_seq;

CREATE TABLE criteria_types (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('criteria_types_seq'),
  name varchar(191) NOT NULL,
  description varchar(191) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE department_translations_seq;

CREATE TABLE department_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('department_translations_seq'),
  department_id int check (department_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT department_translations_department_id_foreign FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX department_translations_department_id_index ON department_translations (department_id);

CREATE SEQUENCE departments_seq;

CREATE TABLE departments (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('departments_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE experience_level_translations_seq;

CREATE TABLE experience_level_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('experience_level_translations_seq'),
  locale varchar(191) NOT NULL,
  experience_level_id int check (experience_level_id > 0) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT experience_level_translations_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES experience_levels (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX experience_level_translations_experience_level_id_index ON experience_level_translations (experience_level_id);

CREATE SEQUENCE experience_levels_seq;

CREATE TABLE experience_levels (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('experience_levels_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE file_type_translations_seq;

CREATE TABLE file_type_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('file_type_translations_seq'),
  file_type_id int check (file_type_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT file_type_translations_file_type_id_foreign FOREIGN KEY (file_type_id) REFERENCES file_types (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX file_type_translations_file_type_id_index ON file_type_translations (file_type_id);

CREATE SEQUENCE file_types_seq;

CREATE TABLE file_types (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('file_types_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE job_application_answers_seq;

CREATE TABLE job_application_answers (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('job_application_answers_seq'),
  job_poster_questions_id int check (job_poster_questions_id > 0) NOT NULL,
  job_application_id int check (job_application_id > 0) NOT NULL,
  answer text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT job_application_answers_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES job_applications (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT job_application_answers_job_poster_questions_id_foreign FOREIGN KEY (job_poster_questions_id) REFERENCES job_poster_questions (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE INDEX job_application_answers_job_poster_questions_id_index ON job_application_answers (job_poster_questions_id);
CREATE INDEX job_application_answers_job_application_id_index ON job_application_answers (job_application_id);

CREATE SEQUENCE job_applications_seq;

CREATE TABLE job_applications (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('job_applications_seq'),
  job_poster_id int check (job_poster_id > 0) NOT NULL,
  application_status_id int check (application_status_id > 0) NOT NULL,
  applicant_id int check (applicant_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT job_applications_applicant_id_foreign FOREIGN KEY (applicant_id) REFERENCES applicants (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT job_applications_application_status_id_foreign FOREIGN KEY (application_status_id) REFERENCES application_status (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT job_applications_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE INDEX job_applications_job_poster_id_index ON job_applications (job_poster_id);
CREATE INDEX job_applications_application_status_id_index ON job_applications (application_status_id);
CREATE INDEX job_applications_applicant_id_index ON job_applications (applicant_id);

CREATE SEQUENCE job_poster_key_tasks_seq;

CREATE TABLE job_poster_key_tasks (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('job_poster_key_tasks_seq'),
  job_poster_id int check (job_poster_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  description text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT job_poster_key_tasks_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX job_poster_key_tasks_job_poster_id_index ON job_poster_key_tasks (job_poster_id);

CREATE SEQUENCE job_poster_questions_seq;

CREATE TABLE job_poster_questions (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('job_poster_questions_seq'),
  job_poster_id int check (job_poster_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  question text NOT NULL,
  description text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT job_poster_questions_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX job_poster_questions_job_poster_id_index ON job_poster_questions (job_poster_id);

CREATE SEQUENCE job_poster_translations_seq;

CREATE TABLE job_poster_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('job_poster_translations_seq'),
  job_poster_id int check (job_poster_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  city text,
  title text NOT NULL,
  impact text,
  branch text,
  division text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT job_poster_translations_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX job_poster_translations_job_poster_id_index ON job_poster_translations (job_poster_id);

CREATE SEQUENCE job_posters_seq;

CREATE TABLE job_posters (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('job_posters_seq'),
  job_term_id int check (job_term_id > 0) NOT NULL,
  term_qty varchar(191) NOT NULL,
  open_date_time timestamp(0) NOT NULL,
  close_date_time timestamp(0) NOT NULL,
  start_date_time timestamp(0) NOT NULL,
  department_id int check (department_id > 0) NOT NULL,
  province_id int check (province_id > 0) NOT NULL,
  salary_min int DEFAULT NULL,
  salary_max int DEFAULT NULL,
  noc int NOT NULL,
  classification varchar(191) NOT NULL,
  security_clearance_id int check (security_clearance_id > 0) NOT NULL,
  language_requirement_id int check (language_requirement_id > 0) NOT NULL,
  manager_id int check (manager_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT job_posters_department_id_foreign FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT job_posters_job_term_id_foreign FOREIGN KEY (job_term_id) REFERENCES job_terms (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT job_posters_language_requirement_id_foreign FOREIGN KEY (language_requirement_id) REFERENCES language_requirements (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT job_posters_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT job_posters_province_id_foreign FOREIGN KEY (province_id) REFERENCES provinces (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT job_posters_security_clearance_id_foreign FOREIGN KEY (security_clearance_id) REFERENCES security_clearances (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE INDEX job_posters_job_term_id_index ON job_posters (job_term_id);
CREATE INDEX job_posters_department_id_index ON job_posters (department_id);
CREATE INDEX job_posters_province_id_index ON job_posters (province_id);
CREATE INDEX job_posters_security_clearance_id_index ON job_posters (security_clearance_id);
CREATE INDEX job_posters_language_requirement_id_index ON job_posters (language_requirement_id);
CREATE INDEX job_posters_manager_id_index ON job_posters (manager_id);

CREATE SEQUENCE job_term_translations_seq;

CREATE TABLE job_term_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('job_term_translations_seq'),
  job_term_id int check (job_term_id > 0) NOT NULL,
  value varchar(191) DEFAULT NULL,
  locale varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT job_term_translations_job_term_id_foreign FOREIGN KEY (job_term_id) REFERENCES job_terms (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX job_term_translations_job_term_id_index ON job_term_translations (job_term_id);

CREATE SEQUENCE job_terms_seq;

CREATE TABLE job_terms (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('job_terms_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE language_requirement_translations_seq;

CREATE TABLE language_requirement_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('language_requirement_translations_seq'),
  locale varchar(191) NOT NULL,
  language_requirement_id int check (language_requirement_id > 0) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT language_requirement_trans_language_requirement_foreign FOREIGN KEY (language_requirement_id) REFERENCES language_requirements (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX language_requirement_translations_language_requirement_id_index ON language_requirement_translations (language_requirement_id);

CREATE SEQUENCE language_requirements_seq;

CREATE TABLE language_requirements (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('language_requirements_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE manager_translations_seq;

CREATE TABLE manager_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('manager_translations_seq'),
  locale varchar(191) NOT NULL,
  aboutme text,
  greatest_accomplishment text,
  branch text,
  division text,
  position text,
  leadership_style text,
  employee_learning text,
  expectations text,
  manager_id int check (manager_id > 0) NOT NULL,
  review_options varchar(191) DEFAULT NULL,
  staylate varchar(191) DEFAULT NULL,
  engage varchar(191) DEFAULT NULL,
  opportunities varchar(191) DEFAULT NULL,
  low_value_work_requests varchar(191) DEFAULT NULL,
  work_experience text,
  education text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT manager_translations_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX manager_translations_manager_id_index ON manager_translations (manager_id);

CREATE SEQUENCE manager_work_environment_seq;

CREATE TABLE manager_work_environment (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('manager_work_environment_seq'),
  manager_id int check (manager_id > 0) NOT NULL,
  work_environment_id int check (work_environment_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT manager_work_environment_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX manager_work_environment_manager_id_index ON manager_work_environment (manager_id);
CREATE INDEX manager_work_environment_work_environment_id_index ON manager_work_environment (work_environment_id);

CREATE SEQUENCE managers_seq;

CREATE TABLE managers (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('managers_seq'),
  department_id int check (department_id > 0) DEFAULT NULL,
  twitter_username varchar(191) DEFAULT NULL,
  linkedin_username varchar(191) DEFAULT NULL,
  user_id int check (user_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT managers_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX managers_department_id_index ON managers (department_id);
CREATE INDEX managers_user_id_index ON managers (user_id);

CREATE SEQUENCE micro_references_seq;

CREATE TABLE micro_references (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('micro_references_seq'),
  name varchar(191) DEFAULT NULL,
  email varchar(191) DEFAULT NULL,
  relationship_id int check (relationship_id > 0) DEFAULT NULL,
  observed_from_date date DEFAULT NULL,
  observed_until_date date DEFAULT NULL,
  experience_level_id int check (experience_level_id > 0) DEFAULT NULL,
  story text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT micro_references_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES experience_levels (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT micro_references_relationship_id_foreign FOREIGN KEY (relationship_id) REFERENCES relationships (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE INDEX micro_references_relationship_id_index ON micro_references (relationship_id);
CREATE INDEX micro_references_experience_level_id_index ON micro_references (experience_level_id);

CREATE SEQUENCE migrations_seq;

CREATE TABLE migrations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('migrations_seq'),
  migration varchar(191) NOT NULL,
  batch int NOT NULL,
  PRIMARY KEY (id)
)   ;

ALTER SEQUENCE migrations_seq RESTART WITH 88;

CREATE SEQUENCE profile_pics_seq;

CREATE TABLE profile_pics (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('profile_pics_seq'),
  user_id int check (user_id > 0) NOT NULL,
  image bytea NOT NULL,
  type varchar(191) NOT NULL,
  size int NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT profile_pics_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX profile_pics_user_id_index ON profile_pics (user_id);

CREATE SEQUENCE province_translations_seq;

CREATE TABLE province_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('province_translations_seq'),
  province_id int check (province_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT province_translations_province_id_foreign FOREIGN KEY (province_id) REFERENCES provinces (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX province_translations_province_id_index ON province_translations (province_id);

CREATE SEQUENCE provinces_seq;

CREATE TABLE provinces (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('provinces_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE relationship_translations_seq;

CREATE TABLE relationship_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('relationship_translations_seq'),
  relationship_id int check (relationship_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT relationship_translations_relationship_id_foreign FOREIGN KEY (relationship_id) REFERENCES relationships (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX relationship_translations_relationship_id_index ON relationship_translations (relationship_id);

CREATE SEQUENCE relationships_seq;

CREATE TABLE relationships (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('relationships_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE security_clearance_translations_seq;

CREATE TABLE security_clearance_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('security_clearance_translations_seq'),
  locale varchar(191) NOT NULL,
  security_clearance_id int check (security_clearance_id > 0) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT security_clearance_translations_security_clearance_id_foreign FOREIGN KEY (security_clearance_id) REFERENCES security_clearances (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX security_clearance_translations_security_clearance_id_index ON security_clearance_translations (security_clearance_id);

CREATE SEQUENCE security_clearances_seq;

CREATE TABLE security_clearances (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('security_clearances_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE skill_declaration_seq;

CREATE TABLE skill_declaration (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('skill_declaration_seq'),
  criteria_id int check (criteria_id > 0) NOT NULL,
  job_application_id int check (job_application_id > 0) NOT NULL,
  experience_level_id int check (experience_level_id > 0) DEFAULT NULL,
  skill_level_id int check (skill_level_id > 0) DEFAULT NULL,
  description text,
  is_active smallint NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT skill_declaration_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES criteria (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT skill_declaration_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES experience_levels (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT skill_declaration_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES job_applications (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT skill_declaration_skill_level_id_foreign FOREIGN KEY (skill_level_id) REFERENCES skill_levels (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE INDEX skill_declaration_criteria_id_index ON skill_declaration (criteria_id);
CREATE INDEX skill_declaration_job_application_id_index ON skill_declaration (job_application_id);
CREATE INDEX skill_declaration_experience_level_id_index ON skill_declaration (experience_level_id);
CREATE INDEX skill_declaration_skill_level_id_index ON skill_declaration (skill_level_id);

CREATE SEQUENCE skill_level_translations_seq;

CREATE TABLE skill_level_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('skill_level_translations_seq'),
  skill_level_id int check (skill_level_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT skill_level_translations_skill_level_id_foreign FOREIGN KEY (skill_level_id) REFERENCES skill_levels (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX skill_level_translations_skill_level_id_index ON skill_level_translations (skill_level_id);

CREATE SEQUENCE skill_levels_seq;

CREATE TABLE skill_levels (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('skill_levels_seq'),
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE team_culture_translations_seq;

CREATE TABLE team_culture_translations (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('team_culture_translations_seq'),
  team_culture_id int check (team_culture_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  narrative_text text,
  operating_context text,
  what_we_value text,
  how_we_work text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT team_culture_translations_team_culture_id_foreign FOREIGN KEY (team_culture_id) REFERENCES team_cultures (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX team_culture_translations_team_culture_id_index ON team_culture_translations (team_culture_id);

CREATE SEQUENCE team_cultures_seq;

CREATE TABLE team_cultures (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('team_cultures_seq'),
  team_size int DEFAULT NULL,
  gc_directory_url varchar(191) DEFAULT NULL,
  manager_id int check (manager_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
 ,
  CONSTRAINT team_cultures_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX team_cultures_manager_id_index ON team_cultures (manager_id);

CREATE SEQUENCE user_roles_seq;

CREATE TABLE user_roles (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('user_roles_seq'),
  name varchar(191) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE users_seq;

CREATE TABLE users (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('users_seq'),
  email varchar(191) NOT NULL,
  name varchar(191) DEFAULT NULL,
  is_confirmed smallint NOT NULL DEFAULT '0',
  user_role_id int check (user_role_id > 0) NOT NULL,
  open_id_sub varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT users_email_unique UNIQUE  (email),
  CONSTRAINT users_open_id_sub_unique UNIQUE  (open_id_sub)
);

CREATE INDEX users_name_index ON users (name);
CREATE INDEX users_user_role_id_index ON users (user_role_id);

CREATE SEQUENCE work_environments_seq;

CREATE TABLE work_environments (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('work_environments_seq'),
  remote_allowed varchar(191) DEFAULT NULL,
  telework_allowed varchar(191) DEFAULT NULL,
  flexible_allowed varchar(191) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE work_samples_seq;

CREATE TABLE work_samples (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('work_samples_seq'),
  name text,
  date_created date DEFAULT NULL,
  file_type_id int check (file_type_id > 0) DEFAULT NULL,
  url text,
  story text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT work_samples_file_type_id_foreign FOREIGN KEY (file_type_id) REFERENCES file_types (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE INDEX work_samples_file_type_id_index ON work_samples (file_type_id);

CREATE SEQUENCE workplace_photo_captions_seq;

CREATE TABLE workplace_photo_captions (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('workplace_photo_captions_seq'),
  work_environment_id int check (work_environment_id > 0) NOT NULL,
  photo_name varchar(191) DEFAULT NULL,
  workplace_photo_id int check (workplace_photo_id > 0) DEFAULT NULL,
  description text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT workplace_photo_captions_work_environment_id_foreign FOREIGN KEY (work_environment_id) REFERENCES work_environments (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT workplace_photo_captions_workplace_photo_id_foreign FOREIGN KEY (workplace_photo_id) REFERENCES workplace_photos (id) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE INDEX workplace_photo_captions_work_environment_id_index ON workplace_photo_captions (work_environment_id);
CREATE INDEX workplace_photo_captions_workplace_photo_id_index ON workplace_photo_captions (workplace_photo_id);

CREATE SEQUENCE workplace_photos_seq;

CREATE TABLE workplace_photos (
  id int check (id > 0) NOT NULL DEFAULT NEXTVAL ('workplace_photos_seq'),
  image bytea NOT NULL,
  mime_type varchar(191) NOT NULL,
  size int NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);
