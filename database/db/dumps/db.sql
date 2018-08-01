CREATE DATABASE  IF NOT EXISTS `talentcloud`;
USE `talentcloud`;
CREATE USER 'talentcloud'@'localhost' IDENTIFIED BY 'talentcloud';
GRANT ALL ON *.* TO 'talentcloud'@'localhost';
FLUSH PRIVILEGES;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=`TRADITIONAL,ALLOW_INVALID_DATES`;

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

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO applicant_profile_questions (name) VALUES ('My career journey so far...');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO applicant_profile_question_translations (applicant_profile_question_id,locale,value,description) VALUES (@base_table_id,'en','My career journey so far...','This is your chance to share the unique story of how you got to where you are now… and where you want to go from here.'),(@base_table_id,'fr','Mon parcours professionnel jusqu’à présent','Dans cette section, on t’invite à raconter le chemin unique que tu as parcouru jusqu’à maintenant, de même que tes aspirations professionnelles pour l’avenir.');
INSERT INTO applicant_profile_questions (name) VALUES ('My learning journey so far...');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO applicant_profile_question_translations (applicant_profile_question_id,locale,value,description) VALUES (@base_table_id,'en','My learning journey so far...','Learning never stops, and it comes to all of us in different ways. Whether it comes from formal education or life lessons, knowledge passed on from elders or things you’ve picked up along the way, here’s your chance to share a bit about this side of who you are.'),(@base_table_id,'fr','Mon parcours d’apprentissage jusqu’à présent','L’apprentissage ne s’arrête jamais, et il nous parvient à tous de différentes façons. Qu’il s’agisse d’une formation officielle, de leçons de vie ou encore de connaissances transmises par les aînés ou apprises en cours de route, fais-nous connaître ton parcours ici.');
INSERT INTO applicant_profile_questions (name) VALUES ('What I bring to a team...');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO applicant_profile_question_translations (applicant_profile_question_id,locale,value,description) VALUES (@base_table_id,'en','What I bring to a team...','People take note of the rock star and forget they are nothing without the band. Help potential teams and managers see what unique skills, attributes and knowledge you bring to help a team do great work.'),(@base_table_id,'fr','Ce que j’apporte à une équipe','Les gens remarquent les joueurs étoiles et oublient qu’ils ne sont rien sans les autres membres de leur équipe. Dans cette section, on t’invite à indiquer à tes équipes et gestionnaires potentiels les compétences, attributs et connaissances uniques que tu apportes aux équipes auxquelles tu te joins pour les aider à atteindre l’excellence.');
INSERT INTO applicant_profile_questions (name) VALUES ('I work best when...');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO applicant_profile_question_translations (applicant_profile_question_id,locale,value,description) VALUES (@base_table_id,'en','I work best when...','Introvert? Extrovert? Bit of both? Do you like tight deadlines or do you prefer to have time to process ideas? Do you work well independently or are team products more your thing? Here’s your chance to let a potential manager know what will let you give the team your best.'),(@base_table_id,'fr','Je travaille mieux lorsque...','Tu es introverti? Extraverti? Un peu des deux? Tu aimes les délais serrés, ou, au contraire, tu préfères avoir du temps pour étudier tes options? Tu as une bonne autonomie au travail? Tu aimes travailler en équipe? Voici ta chance d’indiquer à tes gestionnaires potentiels les conditions dans lesquelles tu performes le mieux au sein d’une équipe.');
INSERT INTO applicant_profile_questions (name) VALUES ('I learn best when...');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO applicant_profile_question_translations (applicant_profile_question_id,locale,value,description) VALUES (@base_table_id,'en','I learn best when...','Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.'),(@base_table_id,'fr','J’apprends mieux lorsque... ','Retiens-tu mieux l’information en la lisant, en la mettant en pratique, ou encore en observant son application? Es-tu de ceux qui apprennent rapidement, ou préfères-tu acquérir une expertise approfondie au fil du temps? Se joindre à une nouvelle équipe signifie apprendre de nouvelles choses. Décris ton style d’apprentissage à tes gestionnaires potentiels pour qu’ils puissent t’aider à te mettre au diapason et à mettre tes talents à contribution rapidement.');
INSERT INTO applicant_profile_questions (name) VALUES ('Types of teams I work well on...');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO applicant_profile_question_translations (applicant_profile_question_id,locale,value,description) VALUES (@base_table_id,'en','Types of teams I work well on...','Do you absorb information best by reading? By doing? Or are you a visual learner? Do you pick things up quickly or do you like to develop deep expertise over time? Joining a new team means learning new things. Help a potential manager understand your learning style so you can get up to speed and contributing quickly.'),(@base_table_id,'fr','Les types d’équipe dans lesquels je travaille bien ','Retiens-tu mieux l’information en la lisant, en la mettant en pratique, ou encore en observant son application? Es-tu de ceux qui apprennent rapidement, ou préfères-tu acquérir une expertise approfondie au fil du temps? Se joindre à une nouvelle équipe signifie apprendre de nouvelles choses. Décris ton style d’apprentissage à tes gestionnaires potentiels pour qu’ils puissent t’aider à te mettre au diapason et à mettre tes talents à contribution rapidement.');
INSERT INTO language_requirements (name) VALUES ('English essential');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO language_requirement_translations (language_requirement_id,locale,value) VALUES (@base_table_id,'en','English essential'),(@base_table_id,'fr','Anglais essentiel');
INSERT INTO language_requirements (name) VALUES ('French essential');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO language_requirement_translations (language_requirement_id,locale,value) VALUES (@base_table_id,'en','French essential'),(@base_table_id,'fr','Français essentiel');
INSERT INTO language_requirements (name) VALUES ('Bilingual');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO language_requirement_translations (language_requirement_id,locale,value) VALUES (@base_table_id,'en','Bilingual'),(@base_table_id,'fr','Bilingue');
INSERT INTO file_types (name) VALUES ('word document');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO file_type_translations (file_type_id,locale,value) VALUES (@base_table_id,'en','Word Document'),(@base_table_id,'fr','Document Word');
INSERT INTO file_types (name) VALUES ('powerpoint presentation');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO file_type_translations (file_type_id,locale,value) VALUES (@base_table_id,'en','PowerPoint Presentation'),(@base_table_id,'fr','Présentation PowerPoint');
INSERT INTO file_types (name) VALUES ('video');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO file_type_translations (file_type_id,locale,value) VALUES (@base_table_id,'en','Video'),(@base_table_id,'fr','Vidéo');
INSERT INTO file_types (name) VALUES ('article publication');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO file_type_translations (file_type_id,locale,value) VALUES (@base_table_id,'en','Article Publication'),(@base_table_id,'fr','Publication dArticle');
INSERT INTO file_types (name) VALUES ('other');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO file_type_translations (file_type_id,locale,value) VALUES (@base_table_id,'en','Other'),(@base_table_id,'fr','Autre');
INSERT INTO relationships (name) VALUES ('superior');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO relationship_translations (relationship_id,locale,value) VALUES (@base_table_id,'en','Superior'),(@base_table_id,'fr','Supérieur');
INSERT INTO relationships (name) VALUES ('coworker');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO relationship_translations (relationship_id,locale,value) VALUES (@base_table_id,'en','Coworker'),(@base_table_id,'fr','Collaborateur');
INSERT INTO relationships (name) VALUES ('subordinate');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO relationship_translations (relationship_id,locale,value) VALUES (@base_table_id,'en','Subordinate'),(@base_table_id,'fr','Subalterne');
INSERT INTO security_clearances (name) VALUES ('Reliability');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO security_clearance_translations (security_clearance_id,locale,value) VALUES (@base_table_id,'en','Reliability'),(@base_table_id,'fr','Fiabilité');
INSERT INTO security_clearances (name) VALUES ('Secret');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO security_clearance_translations (security_clearance_id,locale,value) VALUES (@base_table_id,'en','Secret'),(@base_table_id,'fr','Secret');
INSERT INTO security_clearances (name) VALUES ('Top Secret');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO security_clearance_translations (security_clearance_id,locale,value) VALUES (@base_table_id,'en','Top Secret'),(@base_table_id,'fr','Très secret');
INSERT INTO experience_levels (name) VALUES ('1 or Less years');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO experience_level_translations (experience_level_id,locale,value) VALUES (@base_table_id,'en','1 or less years'),(@base_table_id,'fr','Un an ou moins');
INSERT INTO experience_levels (name) VALUES ('2 - 3 years');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO experience_level_translations (experience_level_id,locale,value) VALUES (@base_table_id,'en','2 - 3 years'),(@base_table_id,'fr','2 - 3 ans');
INSERT INTO experience_levels (name) VALUES ('4 - 5 years');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO experience_level_translations (experience_level_id,locale,value) VALUES (@base_table_id,'en','4 - 5 years'),(@base_table_id,'fr','4 - 5 ans');
INSERT INTO experience_levels (name) VALUES ('6 - 7 years');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO experience_level_translations (experience_level_id,locale,value) VALUES (@base_table_id,'en','6 - 7 years'),(@base_table_id,'fr','6 - 7 ans');
INSERT INTO experience_levels (name) VALUES ('8 or More years');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO experience_level_translations (experience_level_id,locale,value) VALUES (@base_table_id,'en','8 or more years'),(@base_table_id,'fr','Huit ans ou plus');
INSERT INTO skill_levels (name) VALUES ('Basic');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO skill_level_translations (skill_level_id,locale,value) VALUES (@base_table_id,'en','Basic'),(@base_table_id,'fr','Débutant');
INSERT INTO skill_levels (name) VALUES ('Intermediate');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO skill_level_translations (skill_level_id,locale,value) VALUES (@base_table_id,'en','Intermediate'),(@base_table_id,'fr','Intermédiaire');
INSERT INTO skill_levels (name) VALUES ('Advanced');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO skill_level_translations (skill_level_id,locale,value) VALUES (@base_table_id,'en','Advanced'),(@base_table_id,'fr','Avancé');
INSERT INTO skill_levels (name) VALUES ('Expert');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO skill_level_translations (skill_level_id,locale,value) VALUES (@base_table_id,'en','Expert'),(@base_table_id,'fr','Expert');
INSERT INTO departments (name) VALUES ('Treasury Board of Canada Secretariat');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO department_translations (department_id,locale,value) VALUES (@base_table_id,'en','Treasury Board of Canada Secretariat'),(@base_table_id,'fr','Secrétariat du Conseil du Trésor du Canada');
INSERT INTO departments (name) VALUES ('Natural Resources Canada');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO department_translations (department_id,locale,value) VALUES (@base_table_id,'en','Natural Resources Canada'),(@base_table_id,'fr','Ressources naturelles Canada');
INSERT INTO departments (name) VALUES ('Transport Canada');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO department_translations (department_id,locale,value) VALUES (@base_table_id,'en','Transport Canada'),(@base_table_id,'fr','Transports Canada');
INSERT INTO departments (name) VALUES ('Environment and Climate Change Canada');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO department_translations (department_id,locale,value) VALUES (@base_table_id,'en','Environment and Climate Change Canada'),(@base_table_id,'fr','Environnement et Changement climatique Canada');
INSERT INTO departments (name) VALUES ('Employment and Social Development Canada');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO department_translations (department_id,locale,value) VALUES (@base_table_id,'en','Employment and Social Development Canada'),(@base_table_id,'fr','Emploi et Développement social Canada');
INSERT INTO provinces (name) VALUES ('Alberta');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Alberta'),(@base_table_id,'fr','Alberta');
INSERT INTO provinces (name) VALUES ('British Columbia');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','British Columbia'),(@base_table_id,'fr','Colombie-Britannique');
INSERT INTO provinces (name) VALUES ('Manitoba');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Manitoba'),(@base_table_id,'fr','Manitoba');
INSERT INTO provinces (name) VALUES ('Newfoundland and Labrador');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','New Brunswick'),(@base_table_id,'fr','Nouveau-Brunswick');
INSERT INTO provinces (name) VALUES ('New Brunswick');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Newfoundland and Labrador'),(@base_table_id,'fr','Terre-Neuve-et-Labrador');
INSERT INTO provinces (name) VALUES ('Nova Scotia');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Nova Scotia'),(@base_table_id,'fr','Nouvelle-Écosse');
INSERT INTO provinces (name) VALUES ('Nunavut');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Northwest Territories'),(@base_table_id,'fr','Territoires du Nord-Ouest');
INSERT INTO provinces (name) VALUES ('North West Territories');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Nunavut'),(@base_table_id,'fr','Nunavut');
INSERT INTO provinces (name) VALUES ('Ontario');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Ontario'),(@base_table_id,'fr','Ontario');
INSERT INTO provinces (name) VALUES ('Prince Edward Island');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Prince Edward Island'),(@base_table_id,'fr','Île-du-Prince-Édouard');
INSERT INTO provinces (name) VALUES ('Quebec');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Quebec'),(@base_table_id,'fr','Québec');
INSERT INTO provinces (name) VALUES ('Saskatchewan');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Saskatchewan'),(@base_table_id,'fr','Saskatchewan');
INSERT INTO provinces (name) VALUES ('Yukon');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO province_translations (province_id,locale,value) VALUES (@base_table_id,'en','Yukon'),(@base_table_id,'fr','Yukon');
INSERT INTO job_terms (name) VALUES ('week');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO job_term_translations (job_term_id,locale,value) VALUES (@base_table_id,'en','week'),(@base_table_id,'fr','semaine');
INSERT INTO job_terms (name) VALUES ('month');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO job_term_translations (job_term_id,locale,value) VALUES (@base_table_id,'en','month'),(@base_table_id,'fr','mois');
INSERT INTO job_terms (name) VALUES ('year');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO job_term_translations (job_term_id,locale,value) VALUES (@base_table_id,'en','year'),(@base_table_id,'fr','an');
INSERT INTO job_terms (name) VALUES ('permanent');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO job_term_translations (job_term_id,locale,value) VALUES (@base_table_id,'en','permanent'),(@base_table_id,'fr','permanent');
INSERT INTO citizenship_declarations (name) VALUES ('Canadian Citizen');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_translations (citizenship_declaration_id,locale,value) VALUES (@base_table_id,'en','Canadian Citizen'),(@base_table_id,'fr','Citoyen Canadien');
INSERT INTO citizenship_declarations (name) VALUES ('Permanent Resident of Canada');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_translations (citizenship_declaration_id,locale,value) VALUES (@base_table_id,'en','Permanent Resident of Canada'),(@base_table_id,'fr','Résident Permanent du Canada');
INSERT INTO citizenship_declarations (name) VALUES ('Open - Work Permit');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_translations (citizenship_declaration_id,locale,value) VALUES (@base_table_id,'en','Open - Work Permit'),(@base_table_id,'fr','Open - Permis de Travail');
INSERT INTO citizenship_declarations (name) VALUES ('Closed - Work Permit');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_translations (citizenship_declaration_id,locale,value) VALUES (@base_table_id,'en','Closed - Work Permit'),(@base_table_id,'fr','Fermé - Permis de Travail');
INSERT INTO citizenship_declarations (name) VALUES ('I am currently not entitled to work in Canada');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO citizenship_declaration_translations (citizenship_declaration_id,locale,value) VALUES (@base_table_id,'en','I am currently not entitled to work in Canada'),(@base_table_id,'fr','Je n\ai Actuellement pas le Droit de Travailler au Canada');
INSERT INTO application_status (name) VALUES ('Draft');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO application_status_translations (application_status_id,locale,value) VALUES (@base_table_id,'en','Draft'),(@base_table_id,'fr','Provisoire');
INSERT INTO application_status (name) VALUES ('Submitted');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO application_status_translations (application_status_id,locale,value) VALUES (@base_table_id,'en','Submitted'),(@base_table_id,'fr','Soumis');
INSERT INTO application_status (name) VALUES ('Requires Action');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO application_status_translations (application_status_id,locale,value) VALUES (@base_table_id,'en','Requires Action'),(@base_table_id,'fr','Nécessite une action');
INSERT INTO application_status (name) VALUES ('Under Review');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO application_status_translations (application_status_id,locale,value) VALUES (@base_table_id,'en','Under Review'),(@base_table_id,'fr','À létude');
INSERT INTO application_status (name) VALUES ('Rejected');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO application_status_translations (application_status_id,locale,value) VALUES (@base_table_id,'en','Rejected'),(@base_table_id,'fr','Rejeté');
INSERT INTO criteria_types (name) VALUES ('Essential');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO criteria_type_translations (criteria_type_id,locale,value,description) VALUES (@base_table_id,'en','Need to Have',''),(@base_table_id,'fr','Qualifications essentielles','');
INSERT INTO criteria_types (name) VALUES ('Asset');SELECT LAST_INSERT_ID() INTO @base_table_id;INSERT INTO criteria_type_translations (criteria_type_id,locale,value,description) VALUES (@base_table_id,'en','Nice to Have',''),(@base_table_id,'fr','Qualifications constituant un atout','');

INSERT INTO user_roles (name) VALUES('applicant'),('manager');
