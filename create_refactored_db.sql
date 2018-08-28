CREATE TABLE `applicant_profile_answers` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`applicant_id` int(10) unsigned NOT NULL,
`applicant_profile_question_id` int(10) unsigned NOT NULL,
`answer` text COLLATE utf8mb4_unicode_ci,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `applicant_profile_answers_applicant_id_index` (`applicant_id`),
KEY `applicant_profile_answers_applicant_profile_question_id_index` (`applicant_profile_question_id`),
CONSTRAINT `applicant_profile_answers_applicant_id_foreign` FOREIGN KEY (`applicant_id`) REFERENCES `applicants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `applicant_profile_answers_applicant_profile_question_id_foreign` FOREIGN KEY (`applicant_profile_question_id`) REFERENCES `applicant_profile_questions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `applicant_profile_question_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`applicant_profile_question_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` text COLLATE utf8mb4_unicode_ci NOT NULL,
`description` text COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `applicant_profile_question_trans_applicant_profile_question_idx` (`applicant_profile_question_id`),
CONSTRAINT `applicant_profile_question_trans_applicant_profile_question_fk` FOREIGN KEY (`applicant_profile_question_id`) REFERENCES `applicant_profile_questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `applicant_profile_questions` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `applicants` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`personal_website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`tagline` text COLLATE utf8mb4_unicode_ci,
`twitter_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`linkedin_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`user_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `applicants_user_id_index` (`user_id`),
CONSTRAINT `applicants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `application_micro_references` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_application_id` int(10) unsigned NOT NULL,
`criteria_id` int(10) unsigned NOT NULL,
`micro_reference_id` int(10) unsigned NOT NULL,
`is_active` tinyint(1) NOT NULL DEFAULT '1',
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `application_micro_references_job_application_id_index` (`job_application_id`),
KEY `application_micro_references_criteria_id_index` (`criteria_id`),
KEY `application_micro_references_micro_reference_id_index` (`micro_reference_id`),
CONSTRAINT `application_micro_references_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `application_micro_references_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `application_micro_references_micro_reference_id_foreign` FOREIGN KEY (`micro_reference_id`) REFERENCES `micro_references` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `application_status` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `application_status_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`application_status_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `application_status_translations_application_status_id_index` (`application_status_id`),
CONSTRAINT `application_status_translations_application_status_id_foreign` FOREIGN KEY (`application_status_id`) REFERENCES `application_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `application_work_samples` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_application_id` int(10) unsigned NOT NULL,
`criteria_id` int(10) unsigned NOT NULL,
`work_sample_id` int(10) unsigned NOT NULL,
`is_active` tinyint(1) NOT NULL DEFAULT '1',
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `application_work_samples_job_application_id_index` (`job_application_id`),
KEY `application_work_samples_criteria_id_index` (`criteria_id`),
KEY `application_work_samples_work_sample_id_index` (`work_sample_id`),
CONSTRAINT `application_work_samples_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `application_work_samples_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `application_work_samples_work_sample_id_foreign` FOREIGN KEY (`work_sample_id`) REFERENCES `work_samples` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `base_content` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`base_content_type_id` int(10) unsigned NOT NULL,
`key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` text COLLATE utf8mb4_unicode_ci NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `base_content_base_content_type_id_index` (`base_content_type_id`),
KEY `base_content_key_index` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `base_content_types` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `citizenship_declaration_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`citizenship_declaration_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` text COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `citizenship_declaration_trans_citizenship_declaration_id_idx` (`citizenship_declaration_id`),
CONSTRAINT `citizenship_declaration_trans_citizenship_declaration_fk` FOREIGN KEY (`citizenship_declaration_id`) REFERENCES `citizenship_declarations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `citizenship_declarations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` text COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `criteria` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`criteria_type_id` int(10) unsigned NOT NULL,
`job_poster_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `criteria_criteria_type_id_index` (`criteria_type_id`),
KEY `criteria_job_poster_id_index` (`job_poster_id`),
CONSTRAINT `criteria_criteria_type_id_foreign` FOREIGN KEY (`criteria_type_id`) REFERENCES `criteria_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `criteria_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `criteria_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`criteria_id` int(10) unsigned NOT NULL,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`description` text COLLATE utf8mb4_unicode_ci,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `criteria_translations_criteria_id_index` (`criteria_id`),
KEY `criteria_translations_name_index` (`name`),
CONSTRAINT `criteria_translations_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `criteria_types` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `department_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`department_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `department_translations_department_id_index` (`department_id`),
CONSTRAINT `department_translations_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `departments` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `experience_level_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`experience_level_id` int(10) unsigned NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `experience_level_translations_experience_level_id_index` (`experience_level_id`),
CONSTRAINT `experience_level_translations_experience_level_id_foreign` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `experience_levels` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `file_type_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`file_type_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `file_type_translations_file_type_id_index` (`file_type_id`),
CONSTRAINT `file_type_translations_file_type_id_foreign` FOREIGN KEY (`file_type_id`) REFERENCES `file_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `file_types` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_application_answers` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_poster_questions_id` int(10) unsigned NOT NULL,
`job_application_id` int(10) unsigned NOT NULL,
`answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `job_application_answers_job_poster_questions_id_index` (`job_poster_questions_id`),
KEY `job_application_answers_job_application_id_index` (`job_application_id`),
CONSTRAINT `job_application_answers_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `job_application_answers_job_poster_questions_id_foreign` FOREIGN KEY (`job_poster_questions_id`) REFERENCES `job_poster_questions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_applications` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_poster_id` int(10) unsigned NOT NULL,
`application_status_id` int(10) unsigned NOT NULL,
`applicant_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `job_applications_job_poster_id_index` (`job_poster_id`),
KEY `job_applications_application_status_id_index` (`application_status_id`),
KEY `job_applications_applicant_id_index` (`applicant_id`),
CONSTRAINT `job_applications_applicant_id_foreign` FOREIGN KEY (`applicant_id`) REFERENCES `applicants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `job_applications_application_status_id_foreign` FOREIGN KEY (`application_status_id`) REFERENCES `application_status` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `job_applications_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_poster_key_tasks` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_poster_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`description` text COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `job_poster_key_tasks_job_poster_id_index` (`job_poster_id`),
CONSTRAINT `job_poster_key_tasks_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_poster_questions` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_poster_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`question` text COLLATE utf8mb4_unicode_ci NOT NULL,
`description` text COLLATE utf8mb4_unicode_ci,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `job_poster_questions_job_poster_id_index` (`job_poster_id`),
CONSTRAINT `job_poster_questions_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_poster_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_poster_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`city` text COLLATE utf8mb4_unicode_ci,
`title` text COLLATE utf8mb4_unicode_ci NOT NULL,
`impact` text COLLATE utf8mb4_unicode_ci,
`branch` text COLLATE utf8mb4_unicode_ci,
`division` text COLLATE utf8mb4_unicode_ci,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `job_poster_translations_job_poster_id_index` (`job_poster_id`),
CONSTRAINT `job_poster_translations_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_posters` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_term_id` int(10) unsigned NOT NULL,
`term_qty` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`open_date_time` datetime NOT NULL,
`close_date_time` datetime NOT NULL,
`start_date_time` datetime NOT NULL,
`department_id` int(10) unsigned NOT NULL,
`province_id` int(10) unsigned NOT NULL,
`salary_min` int(11) DEFAULT NULL,
`salary_max` int(11) DEFAULT NULL,
`noc` int(11) NOT NULL,
`classification` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`security_clearance_id` int(10) unsigned NOT NULL,
`language_requirement_id` int(10) unsigned NOT NULL,
`manager_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `job_posters_job_term_id_index` (`job_term_id`),
KEY `job_posters_department_id_index` (`department_id`),
KEY `job_posters_province_id_index` (`province_id`),
KEY `job_posters_security_clearance_id_index` (`security_clearance_id`),
KEY `job_posters_language_requirement_id_index` (`language_requirement_id`),
KEY `job_posters_manager_id_index` (`manager_id`),
CONSTRAINT `job_posters_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `job_posters_job_term_id_foreign` FOREIGN KEY (`job_term_id`) REFERENCES `job_terms` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `job_posters_language_requirement_id_foreign` FOREIGN KEY (`language_requirement_id`) REFERENCES `language_requirements` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `job_posters_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `job_posters_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `job_posters_security_clearance_id_foreign` FOREIGN KEY (`security_clearance_id`) REFERENCES `security_clearances` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_term_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`job_term_id` int(10) unsigned NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `job_term_translations_job_term_id_index` (`job_term_id`),
CONSTRAINT `job_term_translations_job_term_id_foreign` FOREIGN KEY (`job_term_id`) REFERENCES `job_terms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_terms` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `language_requirement_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`language_requirement_id` int(10) unsigned NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `language_requirement_translations_language_requirement_id_index` (`language_requirement_id`),
CONSTRAINT `language_requirement_trans_language_requirement_foreign` FOREIGN KEY (`language_requirement_id`) REFERENCES `language_requirements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `language_requirements` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `manager_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`aboutme` text COLLATE utf8mb4_unicode_ci,
`greatest_accomplishment` text COLLATE utf8mb4_unicode_ci,
`branch` text COLLATE utf8mb4_unicode_ci,
`division` text COLLATE utf8mb4_unicode_ci,
`position` text COLLATE utf8mb4_unicode_ci,
`leadership_style` text COLLATE utf8mb4_unicode_ci,
`employee_learning` text COLLATE utf8mb4_unicode_ci,
`expectations` text COLLATE utf8mb4_unicode_ci,
`manager_id` int(10) unsigned NOT NULL,
`review_options` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`staylate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`engage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`opportunities` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`low_value_work_requests` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`work_experience` text COLLATE utf8mb4_unicode_ci,
`education` text COLLATE utf8mb4_unicode_ci,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `manager_translations_manager_id_index` (`manager_id`),
CONSTRAINT `manager_translations_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `manager_work_environment` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`manager_id` int(10) unsigned NOT NULL,
`work_environment_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `manager_work_environment_manager_id_index` (`manager_id`),
KEY `manager_work_environment_work_environment_id_index` (`work_environment_id`),
CONSTRAINT `manager_work_environment_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `managers` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`department_id` int(10) unsigned DEFAULT NULL,
`twitter_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`linkedin_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`user_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `managers_department_id_index` (`department_id`),
KEY `managers_user_id_index` (`user_id`),
CONSTRAINT `managers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `micro_references` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`relationship_id` int(10) unsigned DEFAULT NULL,
`observed_from_date` date DEFAULT NULL,
`observed_until_date` date DEFAULT NULL,
`experience_level_id` int(10) unsigned DEFAULT NULL,
`story` text COLLATE utf8mb4_unicode_ci,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `micro_references_relationship_id_index` (`relationship_id`),
KEY `micro_references_experience_level_id_index` (`experience_level_id`),
CONSTRAINT `micro_references_experience_level_id_foreign` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_levels` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `micro_references_relationship_id_foreign` FOREIGN KEY (`relationship_id`) REFERENCES `relationships` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `migrations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`batch` int(11) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `profile_pics` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`user_id` int(10) unsigned NOT NULL,
`image` blob NOT NULL,
`type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`size` int(11) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `profile_pics_user_id_index` (`user_id`),
CONSTRAINT `profile_pics_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `province_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`province_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `province_translations_province_id_index` (`province_id`),
CONSTRAINT `province_translations_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `provinces` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `relationship_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`relationship_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `relationship_translations_relationship_id_index` (`relationship_id`),
CONSTRAINT `relationship_translations_relationship_id_foreign` FOREIGN KEY (`relationship_id`) REFERENCES `relationships` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `relationships` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `security_clearance_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`security_clearance_id` int(10) unsigned NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `security_clearance_translations_security_clearance_id_index` (`security_clearance_id`),
CONSTRAINT `security_clearance_translations_security_clearance_id_foreign` FOREIGN KEY (`security_clearance_id`) REFERENCES `security_clearances` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `security_clearances` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `skill_declaration` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`criteria_id` int(10) unsigned NOT NULL,
`job_application_id` int(10) unsigned NOT NULL,
`experience_level_id` int(10) unsigned DEFAULT NULL,
`skill_level_id` int(10) unsigned DEFAULT NULL,
`description` text COLLATE utf8mb4_unicode_ci,
`is_active` tinyint(1) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `skill_declaration_criteria_id_index` (`criteria_id`),
KEY `skill_declaration_job_application_id_index` (`job_application_id`),
KEY `skill_declaration_experience_level_id_index` (`experience_level_id`),
KEY `skill_declaration_skill_level_id_index` (`skill_level_id`),
CONSTRAINT `skill_declaration_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `skill_declaration_experience_level_id_foreign` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_levels` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
CONSTRAINT `skill_declaration_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `skill_declaration_skill_level_id_foreign` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_levels` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `skill_level_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`skill_level_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `skill_level_translations_skill_level_id_index` (`skill_level_id`),
CONSTRAINT `skill_level_translations_skill_level_id_foreign` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `skill_levels` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `team_culture_translations` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`team_culture_id` int(10) unsigned NOT NULL,
`locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`narrative_text` text COLLATE utf8mb4_unicode_ci,
`operating_context` text COLLATE utf8mb4_unicode_ci,
`what_we_value` text COLLATE utf8mb4_unicode_ci,
`how_we_work` text COLLATE utf8mb4_unicode_ci,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `team_culture_translations_team_culture_id_index` (`team_culture_id`),
CONSTRAINT `team_culture_translations_team_culture_id_foreign` FOREIGN KEY (`team_culture_id`) REFERENCES `team_cultures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `team_cultures` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`team_size` int(11) DEFAULT NULL,
`gc_directory_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`manager_id` int(10) unsigned NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `team_cultures_manager_id_index` (`manager_id`),
CONSTRAINT `team_cultures_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_roles` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`is_confirmed` tinyint(1) NOT NULL DEFAULT '0',
`user_role_id` int(10) unsigned NOT NULL,
`open_id_sub` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `users_email_unique` (`email`),
UNIQUE KEY `users_open_id_sub_unique` (`open_id_sub`),
KEY `users_name_index` (`name`),
KEY `users_user_role_id_index` (`user_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `work_environments` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`remote_allowed` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`telework_allowed` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`flexible_allowed` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `work_samples` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` text COLLATE utf8mb4_unicode_ci,
`date_created` date DEFAULT NULL,
`file_type_id` int(10) unsigned DEFAULT NULL,
`url` text COLLATE utf8mb4_unicode_ci,
`story` text COLLATE utf8mb4_unicode_ci,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `work_samples_file_type_id_index` (`file_type_id`),
CONSTRAINT `work_samples_file_type_id_foreign` FOREIGN KEY (`file_type_id`) REFERENCES `file_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `workplace_photo_captions` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`work_environment_id` int(10) unsigned NOT NULL,
`photo_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`workplace_photo_id` int(10) unsigned DEFAULT NULL,
`description` text COLLATE utf8mb4_unicode_ci,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `workplace_photo_captions_work_environment_id_index` (`work_environment_id`),
KEY `workplace_photo_captions_workplace_photo_id_index` (`workplace_photo_id`),
CONSTRAINT `workplace_photo_captions_work_environment_id_foreign` FOREIGN KEY (`work_environment_id`) REFERENCES `work_environments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `workplace_photo_captions_workplace_photo_id_foreign` FOREIGN KEY (`workplace_photo_id`) REFERENCES `workplace_photos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `workplace_photos` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`image` blob NOT NULL,
`mime_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
`size` int(11) NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
