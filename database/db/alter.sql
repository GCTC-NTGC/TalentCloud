
--
-- Indexes for dumped tables
--

--
-- Indexes for table applicants
--
ALTER TABLE applicants
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY applicants_user_id_unique (user_id);

--
-- Indexes for table applicant_profile_answers
--
ALTER TABLE applicant_profile_answers
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY app_profile_answers_app_id_app_profile_question_id_unique (applicant_id,applicant_profile_question_id),
  ADD KEY applicant_profile_answers_applicant_id_index (applicant_id),
  ADD KEY applicant_profile_answers_applicant_profile_question_id_index (applicant_profile_question_id);

--
-- Indexes for table applicant_profile_questions
--
ALTER TABLE applicant_profile_questions
  ADD PRIMARY KEY (id);

--
-- Indexes for table applicant_profile_question_translations
--
ALTER TABLE applicant_profile_question_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY app_profile_ques_trans_app_profile_question_id_locale_unique (applicant_profile_question_id,locale),
  ADD KEY applicant_profile_question_trans_applicant_profile_question_idx (applicant_profile_question_id);

--
-- Indexes for table application_micro_references
--
ALTER TABLE application_micro_references
  ADD PRIMARY KEY (id),
  ADD KEY application_micro_references_job_application_id_index (job_application_id),
  ADD KEY application_micro_references_criteria_id_index (criteria_id),
  ADD KEY application_micro_references_micro_reference_id_index (micro_reference_id);

--
-- Indexes for table application_status
--
ALTER TABLE application_status
  ADD PRIMARY KEY (id);

--
-- Indexes for table application_status_translations
--
ALTER TABLE application_status_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY application_status_trans_application_status_id_locale_unique (application_status_id,locale),
  ADD KEY application_status_translations_application_status_id_index (application_status_id);

--
-- Indexes for table application_work_samples
--
ALTER TABLE application_work_samples
  ADD PRIMARY KEY (id),
  ADD KEY application_work_samples_job_application_id_index (job_application_id),
  ADD KEY application_work_samples_criteria_id_index (criteria_id),
  ADD KEY application_work_samples_work_sample_id_index (work_sample_id);

--
-- Indexes for table citizenship_declarations
--
ALTER TABLE citizenship_declarations
  ADD PRIMARY KEY (id);

--
-- Indexes for table citizenship_declaration_translations
--
ALTER TABLE citizenship_declaration_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY citiz_declaration_trans_citiz_declaration_id_locale_unique (citizenship_declaration_id,locale),
  ADD KEY citizenship_declaration_trans_citizenship_declaration_id_idx (citizenship_declaration_id);

--
-- Indexes for table criteria
--
ALTER TABLE criteria
  ADD PRIMARY KEY (id),
  ADD KEY criteria_criteria_type_id_index (criteria_type_id),
  ADD KEY criteria_job_poster_id_index (job_poster_id);

--
-- Indexes for table criteria_translations
--
ALTER TABLE criteria_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY criteria_translations_criteria_id_locale_unique (criteria_id,locale),
  ADD KEY criteria_translations_criteria_id_index (criteria_id),
  ADD KEY criteria_translations_name_index (name);

--
-- Indexes for table criteria_types
--
ALTER TABLE criteria_types
  ADD PRIMARY KEY (id);

--
-- Indexes for table criteria_type_translations
--
ALTER TABLE criteria_type_translations
  ADD PRIMARY KEY (id),
  ADD KEY criteria_type_translations_criteria_type_id_index (criteria_type_id);

--
-- Indexes for table departments
--
ALTER TABLE departments
  ADD PRIMARY KEY (id);

--
-- Indexes for table department_translations
--
ALTER TABLE department_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY department_translations_department_id_locale_unique (department_id,locale),
  ADD KEY department_translations_department_id_index (department_id);

--
-- Indexes for table experience_levels
--
ALTER TABLE experience_levels
  ADD PRIMARY KEY (id);

--
-- Indexes for table experience_level_translations
--
ALTER TABLE experience_level_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY experience_level_translations_experience_level_id_locale_unique (experience_level_id,locale),
  ADD KEY experience_level_translations_experience_level_id_index (experience_level_id);

--
-- Indexes for table file_types
--
ALTER TABLE file_types
  ADD PRIMARY KEY (id);

--
-- Indexes for table file_type_translations
--
ALTER TABLE file_type_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY file_type_translations_file_type_id_locale_unique (file_type_id,locale),
  ADD KEY file_type_translations_file_type_id_index (file_type_id);

--
-- Indexes for table job_applications
--
ALTER TABLE job_applications
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY job_applications_job_poster_id_applicant_id_unique (job_poster_id,applicant_id),
  ADD KEY job_applications_job_poster_id_index (job_poster_id),
  ADD KEY job_applications_application_status_id_index (application_status_id),
  ADD KEY job_applications_applicant_id_index (applicant_id);

--
-- Indexes for table job_application_answers
--
ALTER TABLE job_application_answers
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY job_appl_ans_job_poster_ques_id_job_appl_id_unique (job_poster_questions_id,job_application_id),
  ADD KEY job_application_answers_job_poster_questions_id_index (job_poster_questions_id),
  ADD KEY job_application_answers_job_application_id_index (job_application_id);

--
-- Indexes for table job_posters
--
ALTER TABLE job_posters
  ADD PRIMARY KEY (id),
  ADD KEY job_posters_job_term_id_index (job_term_id),
  ADD KEY job_posters_department_id_index (department_id),
  ADD KEY job_posters_province_id_index (province_id),
  ADD KEY job_posters_security_clearance_id_index (security_clearance_id),
  ADD KEY job_posters_language_requirement_id_index (language_requirement_id),
  ADD KEY job_posters_manager_id_index (manager_id);

--
-- Indexes for table job_poster_key_tasks
--
ALTER TABLE job_poster_key_tasks
  ADD PRIMARY KEY (id),
  ADD KEY job_poster_key_tasks_job_poster_id_index (job_poster_id);

--
-- Indexes for table job_poster_key_task_translations
--
ALTER TABLE job_poster_key_task_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY job_poster_key_task_trans_job_poster_key_task_id_locale_unique (job_poster_key_task_id,locale),
  ADD KEY job_poster_key_task_translations_job_poster_key_task_id_index (job_poster_key_task_id);

--
-- Indexes for table job_poster_questions
--
ALTER TABLE job_poster_questions
  ADD PRIMARY KEY (id),
  ADD KEY job_poster_questions_job_poster_id_index (job_poster_id);

--
-- Indexes for table job_poster_question_translations
--
ALTER TABLE job_poster_question_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY job_poster_question_trans_job_poster_question_id_locale_unique (job_poster_question_id,locale),
  ADD KEY job_poster_question_translations_job_poster_question_id_index (job_poster_question_id);

--
-- Indexes for table job_poster_translations
--
ALTER TABLE job_poster_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY job_poster_translations_job_poster_id_locale_unique (job_poster_id,locale),
  ADD KEY job_poster_translations_job_poster_id_index (job_poster_id);

--
-- Indexes for table job_terms
--
ALTER TABLE job_terms
  ADD PRIMARY KEY (id);

--
-- Indexes for table job_term_translations
--
ALTER TABLE job_term_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY job_term_translations_job_term_id_locale_unique (job_term_id,locale),
  ADD KEY job_term_translations_job_term_id_index (job_term_id);

--
-- Indexes for table language_requirements
--
ALTER TABLE language_requirements
  ADD PRIMARY KEY (id);

--
-- Indexes for table language_requirement_translations
--
ALTER TABLE language_requirement_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY lang_requirement_trans_lang_requirement_id_locale_unique (language_requirement_id,locale),
  ADD KEY language_requirement_translations_language_requirement_id_index (language_requirement_id);

--
-- Indexes for table managers
--
ALTER TABLE managers
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY managers_user_id_unique (user_id),
  ADD KEY managers_department_id_index (department_id);

--
-- Indexes for table manager_translations
--
ALTER TABLE manager_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY manager_translations_manager_id_locale_unique (manager_id,locale),
  ADD KEY manager_translations_manager_id_index (manager_id);

--
-- Indexes for table micro_references
--
ALTER TABLE micro_references
  ADD PRIMARY KEY (id),
  ADD KEY micro_references_relationship_id_index (relationship_id),
  ADD KEY micro_references_experience_level_id_index (experience_level_id);

--
-- Indexes for table migrations
--
ALTER TABLE migrations
  ADD PRIMARY KEY (id);

--
-- Indexes for table profile_pics
--
ALTER TABLE profile_pics
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY profile_pics_user_id_unique (user_id);

--
-- Indexes for table provinces
--
ALTER TABLE provinces
  ADD PRIMARY KEY (id);

--
-- Indexes for table province_translations
--
ALTER TABLE province_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY province_translations_province_id_locale_unique (province_id,locale),
  ADD KEY province_translations_province_id_index (province_id);

--
-- Indexes for table relationships
--
ALTER TABLE relationships
  ADD PRIMARY KEY (id);

--
-- Indexes for table relationship_translations
--
ALTER TABLE relationship_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY relationship_translations_relationship_id_locale_unique (relationship_id,locale),
  ADD KEY relationship_translations_relationship_id_index (relationship_id);

--
-- Indexes for table security_clearances
--
ALTER TABLE security_clearances
  ADD PRIMARY KEY (id);

--
-- Indexes for table security_clearance_translations
--
ALTER TABLE security_clearance_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY security_clearance_trans_security_clearance_id_locale_unique (security_clearance_id,locale),
  ADD KEY security_clearance_translations_security_clearance_id_index (security_clearance_id);

--
-- Indexes for table skill_declarations
--
ALTER TABLE skill_declarations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY skill_declarations_criteria_id_job_application_id_unique (criteria_id,job_application_id),
  ADD KEY skill_declarations_criteria_id_index (criteria_id),
  ADD KEY skill_declarations_job_application_id_index (job_application_id),
  ADD KEY skill_declarations_experience_level_id_index (experience_level_id),
  ADD KEY skill_declarations_skill_level_id_index (skill_level_id);

--
-- Indexes for table skill_levels
--
ALTER TABLE skill_levels
  ADD PRIMARY KEY (id);

--
-- Indexes for table skill_level_translations
--
ALTER TABLE skill_level_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY skill_level_translations_skill_level_id_locale_unique (skill_level_id,locale),
  ADD KEY skill_level_translations_skill_level_id_index (skill_level_id);

--
-- Indexes for table team_cultures
--
ALTER TABLE team_cultures
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY team_cultures_manager_id_unique (manager_id);

--
-- Indexes for table team_culture_translations
--
ALTER TABLE team_culture_translations
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY team_culture_translations_team_culture_id_locale_unique (team_culture_id,locale),
  ADD KEY team_culture_translations_team_culture_id_index (team_culture_id);

--
-- Indexes for table users
--
ALTER TABLE users
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY users_email_unique (email),
  ADD UNIQUE KEY users_open_id_sub_unique (open_id_sub),
  ADD KEY users_name_index (name),
  ADD KEY users_user_role_id_index (user_role_id);

--
-- Indexes for table user_roles
--
ALTER TABLE user_roles
  ADD PRIMARY KEY (id);

--
-- Indexes for table workplace_photos
--
ALTER TABLE workplace_photos
  ADD PRIMARY KEY (id);

--
-- Indexes for table workplace_photo_captions
--
ALTER TABLE workplace_photo_captions
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY workplace_photo_captions_work_environment_id_photo_name_unique (work_environment_id,photo_name),
  ADD UNIQUE KEY workplace_photo_captions_workplace_photo_id_unique (workplace_photo_id),
  ADD KEY workplace_photo_captions_work_environment_id_index (work_environment_id);

--
-- Indexes for table work_environments
--
ALTER TABLE work_environments
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY work_environments_manager_id_unique (manager_id);

--
-- Indexes for table work_samples
--
ALTER TABLE work_samples
  ADD PRIMARY KEY (id),
  ADD KEY work_samples_file_type_id_index (file_type_id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table applicants
--
ALTER TABLE applicants
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table applicant_profile_answers
--
ALTER TABLE applicant_profile_answers
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table applicant_profile_questions
--
ALTER TABLE applicant_profile_questions
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table applicant_profile_question_translations
--
ALTER TABLE applicant_profile_question_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table application_micro_references
--
ALTER TABLE application_micro_references
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table application_status
--
ALTER TABLE application_status
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table application_status_translations
--
ALTER TABLE application_status_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table application_work_samples
--
ALTER TABLE application_work_samples
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table citizenship_declarations
--
ALTER TABLE citizenship_declarations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table citizenship_declaration_translations
--
ALTER TABLE citizenship_declaration_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table criteria
--
ALTER TABLE criteria
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table criteria_translations
--
ALTER TABLE criteria_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table criteria_types
--
ALTER TABLE criteria_types
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table criteria_type_translations
--
ALTER TABLE criteria_type_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table departments
--
ALTER TABLE departments
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table department_translations
--
ALTER TABLE department_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table experience_levels
--
ALTER TABLE experience_levels
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table experience_level_translations
--
ALTER TABLE experience_level_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table file_types
--
ALTER TABLE file_types
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table file_type_translations
--
ALTER TABLE file_type_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_applications
--
ALTER TABLE job_applications
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_application_answers
--
ALTER TABLE job_application_answers
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_posters
--
ALTER TABLE job_posters
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_poster_key_tasks
--
ALTER TABLE job_poster_key_tasks
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_poster_key_task_translations
--
ALTER TABLE job_poster_key_task_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_poster_questions
--
ALTER TABLE job_poster_questions
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_poster_question_translations
--
ALTER TABLE job_poster_question_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_poster_translations
--
ALTER TABLE job_poster_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_terms
--
ALTER TABLE job_terms
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table job_term_translations
--
ALTER TABLE job_term_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table language_requirements
--
ALTER TABLE language_requirements
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table language_requirement_translations
--
ALTER TABLE language_requirement_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table managers
--
ALTER TABLE managers
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table manager_translations
--
ALTER TABLE manager_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table micro_references
--
ALTER TABLE micro_references
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table migrations
--
ALTER TABLE migrations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table profile_pics
--
ALTER TABLE profile_pics
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table provinces
--
ALTER TABLE provinces
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table province_translations
--
ALTER TABLE province_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table relationships
--
ALTER TABLE relationships
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table relationship_translations
--
ALTER TABLE relationship_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table security_clearances
--
ALTER TABLE security_clearances
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table security_clearance_translations
--
ALTER TABLE security_clearance_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table skill_declarations
--
ALTER TABLE skill_declarations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table skill_levels
--
ALTER TABLE skill_levels
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table skill_level_translations
--
ALTER TABLE skill_level_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table team_cultures
--
ALTER TABLE team_cultures
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table team_culture_translations
--
ALTER TABLE team_culture_translations
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table users
--
ALTER TABLE users
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table user_roles
--
ALTER TABLE user_roles
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table workplace_photos
--
ALTER TABLE workplace_photos
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table workplace_photo_captions
--
ALTER TABLE workplace_photo_captions
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table work_environments
--
ALTER TABLE work_environments
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table work_samples
--
ALTER TABLE work_samples
  MODIFY id cast(10 as int) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table applicants
--
ALTER TABLE applicants
  ADD CONSTRAINT applicants_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table applicant_profile_answers
--
ALTER TABLE applicant_profile_answers
  ADD CONSTRAINT applicant_profile_answers_applicant_id_foreign FOREIGN KEY (applicant_id) REFERENCES applicants (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT applicant_profile_answers_applicant_profile_question_id_foreign FOREIGN KEY (applicant_profile_question_id) REFERENCES applicant_profile_questions (id) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table applicant_profile_question_translations
--
ALTER TABLE applicant_profile_question_translations
  ADD CONSTRAINT applicant_profile_question_trans_applicant_profile_question_fk FOREIGN KEY (applicant_profile_question_id) REFERENCES applicant_profile_questions (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table application_micro_references
--
ALTER TABLE application_micro_references
  ADD CONSTRAINT application_micro_references_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES criteria (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT application_micro_references_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES job_applications (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT application_micro_references_micro_reference_id_foreign FOREIGN KEY (micro_reference_id) REFERENCES micro_references (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table application_status_translations
--
ALTER TABLE application_status_translations
  ADD CONSTRAINT application_status_translations_application_status_id_foreign FOREIGN KEY (application_status_id) REFERENCES application_status (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table application_work_samples
--
ALTER TABLE application_work_samples
  ADD CONSTRAINT application_work_samples_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES criteria (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT application_work_samples_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES job_applications (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT application_work_samples_work_sample_id_foreign FOREIGN KEY (work_sample_id) REFERENCES work_samples (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table citizenship_declaration_translations
--
ALTER TABLE citizenship_declaration_translations
  ADD CONSTRAINT citizenship_declaration_trans_citizenship_declaration_fk FOREIGN KEY (citizenship_declaration_id) REFERENCES citizenship_declarations (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table criteria
--
ALTER TABLE criteria
  ADD CONSTRAINT criteria_criteria_type_id_foreign FOREIGN KEY (criteria_type_id) REFERENCES criteria_types (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT criteria_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table criteria_translations
--
ALTER TABLE criteria_translations
  ADD CONSTRAINT criteria_translations_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES criteria (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table criteria_type_translations
--
ALTER TABLE criteria_type_translations
  ADD CONSTRAINT criteria_type_translations_criteria_type_id_foreign FOREIGN KEY (criteria_type_id) REFERENCES criteria_types (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table department_translations
--
ALTER TABLE department_translations
  ADD CONSTRAINT department_translations_department_id_foreign FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table experience_level_translations
--
ALTER TABLE experience_level_translations
  ADD CONSTRAINT experience_level_translations_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES experience_levels (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table file_type_translations
--
ALTER TABLE file_type_translations
  ADD CONSTRAINT file_type_translations_file_type_id_foreign FOREIGN KEY (file_type_id) REFERENCES file_types (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table job_applications
--
ALTER TABLE job_applications
  ADD CONSTRAINT job_applications_applicant_id_foreign FOREIGN KEY (applicant_id) REFERENCES applicants (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT job_applications_application_status_id_foreign FOREIGN KEY (application_status_id) REFERENCES application_status (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT job_applications_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table job_application_answers
--
ALTER TABLE job_application_answers
  ADD CONSTRAINT job_application_answers_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES job_applications (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT job_application_answers_job_poster_questions_id_foreign FOREIGN KEY (job_poster_questions_id) REFERENCES job_poster_questions (id) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table job_posters
--
ALTER TABLE job_posters
  ADD CONSTRAINT job_posters_department_id_foreign FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT job_posters_job_term_id_foreign FOREIGN KEY (job_term_id) REFERENCES job_terms (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT job_posters_language_requirement_id_foreign FOREIGN KEY (language_requirement_id) REFERENCES language_requirements (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT job_posters_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT job_posters_province_id_foreign FOREIGN KEY (province_id) REFERENCES provinces (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT job_posters_security_clearance_id_foreign FOREIGN KEY (security_clearance_id) REFERENCES security_clearances (id) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table job_poster_key_tasks
--
ALTER TABLE job_poster_key_tasks
  ADD CONSTRAINT job_poster_key_tasks_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table job_poster_key_task_translations
--
ALTER TABLE job_poster_key_task_translations
  ADD CONSTRAINT job_poster_key_task_translations_job_poster_key_task_id_foreign FOREIGN KEY (job_poster_key_task_id) REFERENCES job_poster_key_tasks (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table job_poster_questions
--
ALTER TABLE job_poster_questions
  ADD CONSTRAINT job_poster_questions_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table job_poster_question_translations
--
ALTER TABLE job_poster_question_translations
  ADD CONSTRAINT job_poster_question_translations_job_poster_question_id_foreign FOREIGN KEY (job_poster_question_id) REFERENCES job_poster_questions (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table job_poster_translations
--
ALTER TABLE job_poster_translations
  ADD CONSTRAINT job_poster_translations_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES job_posters (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table job_term_translations
--
ALTER TABLE job_term_translations
  ADD CONSTRAINT job_term_translations_job_term_id_foreign FOREIGN KEY (job_term_id) REFERENCES job_terms (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table language_requirement_translations
--
ALTER TABLE language_requirement_translations
  ADD CONSTRAINT language_requirement_trans_language_requirement_foreign FOREIGN KEY (language_requirement_id) REFERENCES language_requirements (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table managers
--
ALTER TABLE managers
  ADD CONSTRAINT managers_department_id_foreign FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT managers_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table manager_translations
--
ALTER TABLE manager_translations
  ADD CONSTRAINT manager_translations_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table micro_references
--
ALTER TABLE micro_references
  ADD CONSTRAINT micro_references_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES experience_levels (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT micro_references_relationship_id_foreign FOREIGN KEY (relationship_id) REFERENCES relationships (id) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table profile_pics
--
ALTER TABLE profile_pics
  ADD CONSTRAINT profile_pics_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table province_translations
--
ALTER TABLE province_translations
  ADD CONSTRAINT province_translations_province_id_foreign FOREIGN KEY (province_id) REFERENCES provinces (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table relationship_translations
--
ALTER TABLE relationship_translations
  ADD CONSTRAINT relationship_translations_relationship_id_foreign FOREIGN KEY (relationship_id) REFERENCES relationships (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table security_clearance_translations
--
ALTER TABLE security_clearance_translations
  ADD CONSTRAINT security_clearance_translations_security_clearance_id_foreign FOREIGN KEY (security_clearance_id) REFERENCES security_clearances (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table skill_declarations
--
ALTER TABLE skill_declarations
  ADD CONSTRAINT skill_declarations_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES criteria (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT skill_declarations_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES experience_levels (id) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT skill_declarations_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES job_applications (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT skill_declarations_skill_level_id_foreign FOREIGN KEY (skill_level_id) REFERENCES skill_levels (id) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table skill_level_translations
--
ALTER TABLE skill_level_translations
  ADD CONSTRAINT skill_level_translations_skill_level_id_foreign FOREIGN KEY (skill_level_id) REFERENCES skill_levels (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table team_cultures
--
ALTER TABLE team_cultures
  ADD CONSTRAINT team_cultures_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table team_culture_translations
--
ALTER TABLE team_culture_translations
  ADD CONSTRAINT team_culture_translations_team_culture_id_foreign FOREIGN KEY (team_culture_id) REFERENCES team_cultures (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table users
--
ALTER TABLE users
  ADD CONSTRAINT users_user_role_id_foreign FOREIGN KEY (user_role_id) REFERENCES user_roles (id) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table workplace_photo_captions
--
ALTER TABLE workplace_photo_captions
  ADD CONSTRAINT workplace_photo_captions_work_environment_id_foreign FOREIGN KEY (work_environment_id) REFERENCES work_environments (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT workplace_photo_captions_workplace_photo_id_foreign FOREIGN KEY (workplace_photo_id) REFERENCES workplace_photos (id) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table work_environments
--
ALTER TABLE work_environments
  ADD CONSTRAINT work_environments_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES managers (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table work_samples
--
ALTER TABLE work_samples
  ADD CONSTRAINT work_samples_file_type_id_foreign FOREIGN KEY (file_type_id) REFERENCES file_types (id) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
