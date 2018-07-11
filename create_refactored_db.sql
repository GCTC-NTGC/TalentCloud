CREATE TABLE `application_micro_references` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_application_id` int(10) unsigned zerofill NOT NULL,
  `criteria_id` int(10) unsigned zerofill NOT NULL,
  `micro_reference_id` int(10) unsigned zerofill NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_application_micro_reference_application_id_idx` (`job_application_id`),
  KEY `fk_application_micro_reference_criteria_id_idx` (`criteria_id`),
  KEY `fk_application_micro_reference_micro_reference_id_idx` (`micro_reference_id`),
  CONSTRAINT `fk_application_micro_reference_application_id` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_application_micro_reference_criteria_id` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_application_micro_reference_micro_reference_id` FOREIGN KEY (`micro_reference_id`) REFERENCES `micro_references` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `application_status` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `application_status_translations` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `application_status_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `application_status` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`application_status_translations_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `application_work_samples` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_application_id` int(10) unsigned zerofill NOT NULL,
  `criteria_id` int(10) unsigned zerofill NOT NULL,
  `work_sample_id` int(10) unsigned zerofill NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_application_work_sample_application_id_idx` (`job_application_id`),
  KEY `fk_application_work_sample_criteria_id_idx` (`criteria_id`),
  KEY `fk_application_work_sample_id_idx` (`work_sample_id`),
  CONSTRAINT `fk_application_work_sample_application_id` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_application_work_sample_criteria_id` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_application_work_sample_id` FOREIGN KEY (`work_sample_id`) REFERENCES `work_samples` (`work_sample_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `base_content` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `base_content_type_id` int(10) unsigned zerofill NOT NULL,
  `key` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `value` text COLLATE utf8_unicode_ci NOT NULL,
  `locale` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `base_content_types` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `citizenship_declarations` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `citizenship_declaration_translations` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `citizenship_declaration_id` int(10) NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk__citizenship_declaration_translations__citizenship_declaration` FOREIGN KEY (`citizenship_declaration_id`) REFERENCES `citizenship_declaration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `city` (
  `city_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `city_gps_coords` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city_common_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `city_translations` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `city_id` int(10) NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `criteria` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `criteria_type_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_criteria_criteria_type_id_idx` (`criteria_type_id`),
    KEY `fk_criteria_job_poster_idx` (`job_poster_id`),
  CONSTRAINT `fk_criteria_criteria_type_id` FOREIGN KEY (`criteria_type_id`) REFERENCES `criteria_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_criteria_job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `criteria_translations` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `criteria_id` int(10) unsigned zerofill NOT NULL,
  `name` text NOT NULL,
  `description` text,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_criteria_translations__criteria_idx` (`criteria_id`),
  CONSTRAINT `fk_criteria_translations__criteria` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `criteria_types` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(140) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `db_version` (
  `version` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `departments` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `department_translations` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `department_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_department_translations_department_id_idx` (`department_id`),
  CONSTRAINT `fk_department_translations_department_id` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `experience_level` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(65) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `experience_level_translations` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `experience_level_id` int(10) unsigned zerofill NOT NULL,
  `name` varchar(65) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_experience_level_id_idx` (`experience_level_id`),
  CONSTRAINT `fk_experience_level_translations_experience_level_id` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `file_type` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `file_type_translations` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `file_type_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_file_type_translations_file_type_id_idx` (`file_type_id`),
    CONSTRAINT `fk_file_type_translations_file_type_id` FOREIGN KEY (`file_type_id`) REFERENCES `file_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `job_application_answers` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_question_id` int(10) unsigned zerofill NOT NULL,
  `job_application_id` int(10) unsigned zerofill NOT NULL,
  `answer` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__job_application_answer__job_application_idx` (`job_application_id`),
  CONSTRAINT `fk__job_application_answer__job_application` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk__job_application_answer__job_poster_question` FOREIGN KEY (`job_poster_question_id`) REFERENCES `job_poster_question` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_level` (
  `job_level_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_level` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_poster` (
  `job_poster_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_term_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_term_qty` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_job_min_level_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_job_max_level_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_open_date_time` datetime NOT NULL,
  `job_poster_close_date_time` datetime NOT NULL,
  `job_poster_start_date` datetime NOT NULL,
  `job_poster_department_id` int(10) NOT NULL,
  `job_poster_province_id` int(10) NOT NULL,
  `job_poster_remuneration_min` int(9) DEFAULT NULL,
  `job_poster_remuneration_max` int(9) DEFAULT NULL,
  `job_poster_noc` int(4) NOT NULL,
  `job_poster_classification` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_clearance_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_language_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_poster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_applications` (
  `job_application_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `application_job_poster_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_application_status_id` int(10) unsigned zerofill NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_application_id`),
  KEY `fk__job_poster_application__job_poster_idx` (`application_job_poster_id`),
  KEY `fk__job_poster_application__application_status_idx` (`job_poster_application_status_id`),
  KEY `fk__job_poster_application__user_idx` (`user_id`),
  CONSTRAINT `fk__job_poster_application__application_status` FOREIGN KEY (`job_poster_application_status_id`) REFERENCES `application_status` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__job_poster_application__job_poster` FOREIGN KEY (`application_job_poster_id`) REFERENCES `job_poster` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__job_poster_application__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_poster_core_competency` (
  `job_poster_core_competency_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `core_competency` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_core_competency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_poster_translations` (
  `job_poster_translations` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_desc_title` text COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_desc_content` text COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_city` text COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_title` text COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_impact` text COLLATE utf8_unicode_ci NOT NULL,
  `branch` text COLLATE utf8_unicode_ci,
  `divisions` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`job_poster_translations`),
  KEY `fk__job_poster_translations__job_poster_idx` (`job_poster_id`),
    CONSTRAINT `fk__job_poster_translations__job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_poster_developing_competency` (
  `job_poster_developing_competency_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `developing_competency` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_developing_competency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_poster_key_task` (
  `job_poster_key_task_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `task` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_poster_key_task_id`),
  KEY `fk__job_poster_key_task__job_poster_idx` (`job_poster_id`),
    CONSTRAINT `fk__job_poster_key_task__job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_poster_question` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `question` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk__job_poster_question__job_poster_idx` (`job_poster_id`),
    CONSTRAINT `fk__job_poster_question__job_poster` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_poster_to_manager_user_id` (
  `job_poster_id` int(10) unsigned zerofill NOT NULL,
  `user_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_poster_id`,`user_id`),
  KEY `fk_job_poster_to_manager_user_id_user_id_idx` (`user_id`),
  CONSTRAINT `fk_job_poster_to_manager_user_id_job_poster_id` FOREIGN KEY (`job_poster_id`) REFERENCES `job_poster` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_poster_to_manager_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_poster_v1` (
  `job_poster_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_number` int(10) unsigned zerofill NOT NULL,
  `job_poster_title` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_description` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `job_term_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_term_qty` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `job_poster_job_min_level_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_job_max_level_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_start_date` datetime NOT NULL,
  `job_poster_end_date` datetime NOT NULL,
  `job_poster_close_date_time` datetime NOT NULL,
  `job_poster_department_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_location_province_id` int(10) unsigned zerofill NOT NULL,
  `job_poster_location_city_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`job_poster_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_seeker_profile` (
  `job_seeker_profile_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_seeker_profile_link` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job_seeker_profile_tagline` text COLLATE utf8_unicode_ci,
  `job_seeker_profile_twitter_link` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job_seeker_profile_linkedin_link` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`job_seeker_profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_seeker_profile_answer` (
  `job_seeker_profile_id` int(10) unsigned zerofill NOT NULL,
  `job_seeker_profile_question_id` int(10) unsigned zerofill NOT NULL,
  `answer` text,
  PRIMARY KEY (`job_seeker_profile_id`,`job_seeker_profile_question_id`),
  KEY `fk_job_seeker_profile_question_id_idx` (`job_seeker_profile_question_id`),
  CONSTRAINT `fk_job_seeker_profile_answer_question_id` FOREIGN KEY (`job_seeker_profile_question_id`) REFERENCES `job_seeker_profile_question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_seeker_profile_id` FOREIGN KEY (`job_seeker_profile_id`) REFERENCES `job_seeker_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `job_seeker_profile_question` (
  `job_seeker_profile_question_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `common_name` varchar(60) NOT NULL,
  PRIMARY KEY (`job_seeker_profile_question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `job_seeker_profile_question_translations` (
  `job_seeker_profile_question_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `question` varchar(60) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`job_seeker_profile_question_id`,`locale_id`),
    CONSTRAINT `fk_job_seeker_profile_question_id` FOREIGN KEY (`job_seeker_profile_question_id`) REFERENCES `job_seeker_profile_question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `job_term` (
  `job_term_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_term_common_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_term_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `job_term_translations` (
  `job_term_translations_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `job_term_id` int(10) unsigned zerofill NOT NULL,
  `job_term` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`job_term_translations_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `language_requirement` (
  `language_requirement_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `language_requirement_common_name` varchar(65) NOT NULL,
  PRIMARY KEY (`language_requirement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `language_requirement_translations` (
  `language_requirement_translations_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `language_requirement_id` int(10) unsigned zerofill NOT NULL,
  `language_requirement_translations_name` varchar(65) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`language_requirement_translations_id`),
  KEY `fk_language_requirement_id_idx` (`language_requirement_id`),
  CONSTRAINT `fk_language_requirement_translations_language_requirement_id` FOREIGN KEY (`language_requirement_id`) REFERENCES `language_requirement` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `locale` (
  `id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `locale_iso` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `manager_profile_to_team_culture` (
  `user_manager_profile_id` int(10) unsigned zerofill NOT NULL,
  `team_culture_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`),
  KEY `fk__manager_profile_to_team_culture__team_culture_idx` (`team_culture_id`),
  CONSTRAINT `fk__manager_profile_to_team_culture__manager_profile` FOREIGN KEY (`user_manager_profile_id`) REFERENCES `user_manager_profile` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk__manager_profile_to_team_culture__team_culture` FOREIGN KEY (`team_culture_id`) REFERENCES `team_culture` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `manager_profile_to_work_environment` (
  `user_manager_profile_id` int(10) unsigned zerofill NOT NULL,
  `work_environment_id` int(10) NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`),
  CONSTRAINT `fk_manager_profile_to_work_environment_manager_profile_id` FOREIGN KEY (`user_manager_profile_id`) REFERENCES `user_manager_profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `micro_references` (
  `micro_reference_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `micro_reference_name` varchar(45) DEFAULT NULL,
  `micro_reference_email` varchar(45) DEFAULT NULL,
  `micro_reference_relationship_id` int(10) unsigned zerofill DEFAULT NULL,
  `micro_reference_observed_from_date` date DEFAULT NULL,
  `micro_reference_observed_until_date` date DEFAULT NULL,
  `micro_reference_experience_level_id` int(10) unsigned zerofill DEFAULT NULL,
  `micro_reference_story` text,
  PRIMARY KEY (`micro_reference_id`),
  KEY `fk_micro_reference_relationship_id_idx` (`micro_reference_relationship_id`),
  KEY `fk_micro_reference_experience_level_id_idx` (`micro_reference_experience_level_id`),
  CONSTRAINT `fk_micro_reference_experience_level_id` FOREIGN KEY (`micro_reference_experience_level_id`) REFERENCES `experience_level` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_micro_reference_relationship_id` FOREIGN KEY (`micro_reference_relationship_id`) REFERENCES `relationship` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `profile_pic` (
  `user_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `image` longblob NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_profile_pic_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `province` (
  `province_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `province_common_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`province_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `province_translations` (
  `province_translations_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `province_translations_province_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `province_translations_name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`province_translations_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `relationship` (
  `relationship_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `relationship_name` varchar(45) NOT NULL,
  PRIMARY KEY (`relationship_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `relationship_translations` (
  `relationship_translations_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `relationship_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `relationship_translations_name` varchar(45) NOT NULL,
  PRIMARY KEY (`relationship_translations_id`),
  KEY `fk_relationship_translations_relationship_id_idx` (`relationship_id`),
    CONSTRAINT `fk_relationship_translations_relationship_id` FOREIGN KEY (`relationship_id`) REFERENCES `relationship` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `security_clearance` (
  `security_clearance_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `security_clearance_common_name` varchar(65) NOT NULL,
  PRIMARY KEY (`security_clearance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `security_clearance_translations` (
  `security_clearance_translations_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `security_clearance_id` int(10) unsigned zerofill NOT NULL,
  `security_clearance_translations_name` varchar(65) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`security_clearance_translations_id`),
  KEY `fk_security_clearance_id_idx` (`security_clearance_id`),
  CONSTRAINT `fk_security_clearance_translations_security_clearance_id` FOREIGN KEY (`security_clearance_id`) REFERENCES `security_clearance` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `skill_declaration` (
  `skill_declaration_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `criteria_id` int(10) unsigned zerofill NOT NULL,
  `job_application_id` int(10) unsigned zerofill NOT NULL,
  `experience_level_id` int(10) unsigned zerofill DEFAULT NULL,
  `skill_level_id` int(10) unsigned zerofill DEFAULT NULL,
  `description` mediumtext,
  `is_active` tinyint(4) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`skill_declaration_id`),
  KEY `fk_experience_level_id_idx` (`experience_level_id`),
  KEY `fk_skill_level_id_idx` (`skill_level_id`),
  KEY `fk_skill_declaration_criteria_id_idx` (`criteria_id`),
  KEY `fk_skill_declaration_application_id_idx` (`job_application_id`),
  CONSTRAINT `fk_skill_declaration_application_id` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_criteria_id` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_experience_level_id` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_level` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_skill_declaration_skill_level_id` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `skill_translations` (
  `skill_translations_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `skill_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `skill_translations_name` varchar(65) NOT NULL,
  PRIMARY KEY (`skill_translations_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `skill_level` (
  `skill_level_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `skill_level_common_name` varchar(65) NOT NULL,
  PRIMARY KEY (`skill_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `skill_level_translations` (
  `skill_level_translations_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `skill_level_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `skill_level_translations_name` varchar(65) NOT NULL,
  PRIMARY KEY (`skill_level_translations_id`),
  KEY `fk_skill_level_id_idx` (`skill_level_id`),
  CONSTRAINT `fk_skill_level_translations_skill_level_id` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `team_culture` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `team_size` int(10) NOT NULL,
  `gc_directory_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `team_culture_translations` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `team_culture_id` int(10) unsigned zerofill NOT NULL,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `narrative_text` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `operating_context` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `what_we_value` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `how_we_work` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user` (
  `user_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `email` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_confirmed` tinyint(1) DEFAULT '0',
  `user_role_id` int(10) unsigned zerofill NOT NULL,
  `open_id` int(10) NOT NULL,
  PRIMARY KEY (`user_id`,`open_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `open_id_UNIQUE` (`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user_job_seeker_profiles` (
  `user_id` int(10) unsigned zerofill NOT NULL,
  `job_seeker_profile_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`user_id`,`job_seeker_profile_id`),
  KEY `fk_user_job_seeker_profiles_profile_id_idx` (`job_seeker_profile_id`),
  CONSTRAINT `fk_user_job_seeker_profiles_profile_id` FOREIGN KEY (`job_seeker_profile_id`) REFERENCES `job_seeker_profile` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_user_job_seeker_profiles_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user_manager_profile` (
  `user_manager_profile_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_manager_profile_department_id` int(10) DEFAULT NULL,
  `user_manager_profile_twitter` varchar(65) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_linkedin` varchar(260) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned zerofill NOT NULL,
  PRIMARY KEY (`user_manager_profile_id`),
  KEY `fk__user_manager_profile__user_idx` (`user_id`),
  CONSTRAINT `fk__user_manager_profile__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user_manager_profile_translations` (
  `user_manager_profile_translations_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `locale` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_manager_profile_translations_aboutme` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_translations_proud` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_translations_branch` text COLLATE utf8_unicode_ci,
  `user_manager_profile_translations_division` text COLLATE utf8_unicode_ci,
  `user_manager_profile_translations_position` text COLLATE utf8_unicode_ci,
  `user_manager_profile_translations_lead_style` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_translations_emp_learn` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_translations_expectations` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_id` int(10) unsigned zerofill NOT NULL,
  `user_manager_profile_review_options` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_staylate` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_engage` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_devops` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_lvwRequests` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_manager_profile_work_experience` mediumtext COLLATE utf8_unicode_ci,
  `user_manager_profile_education` mediumtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`user_manager_profile_translations_id`),
  KEY `fk_user_manager_profile_translations_manager_profile_id_idx` (`user_manager_profile_id`),
  CONSTRAINT `fk_user_manager_profile_translations_manager_profile_id` FOREIGN KEY (`user_manager_profile_id`) REFERENCES `user_manager_profile` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user_role` (
  `user_role_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_role` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user_token` (
  `user_token_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned zerofill NOT NULL,
  `access_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `expires_in` int(5) NOT NULL,
  `token_type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `scope` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `work_environment` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `remote_allowed` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `telework_allowed` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `flexible_allowed` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `work_samples` (
  `work_sample_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `work_sample_name` text,
  `work_sample_date_created` date DEFAULT NULL,
  `file_type_id` int(10) unsigned zerofill DEFAULT NULL,
  `work_sample_url` text,
  `work_sample_story` text,
  PRIMARY KEY (`work_sample_id`),
  KEY `fk_work_sample_file_type_id_idx` (`file_type_id`),
  CONSTRAINT `fk_work_sample_file_type_id` FOREIGN KEY (`file_type_id`) REFERENCES `file_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `workplace_photo` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `image` longblob NOT NULL,
  `mime_type` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `workplace_photo_caption` (
  `work_environment_id` int(10) unsigned zerofill NOT NULL,
  `photo_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `workplace_photo_id` int(10) unsigned zerofill DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`work_environment_id`,`photo_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
