

-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: talentcloud-db
-- Generation Time: Aug 20, 2018 at 05:32 PM
-- Server version: 5.6.41
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `talentcloud`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `id` int(10) UNSIGNED NOT NULL,
  `personal_website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagline` text COLLATE utf8mb4_unicode_ci,
  `twitter_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applicant_profile_answers`
--

CREATE TABLE `applicant_profile_answers` (
  `id` int(10) UNSIGNED NOT NULL,
  `applicant_id` int(10) UNSIGNED NOT NULL,
  `applicant_profile_question_id` int(10) UNSIGNED NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applicant_profile_questions`
--

CREATE TABLE `applicant_profile_questions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applicant_profile_question_translations`
--

CREATE TABLE `applicant_profile_question_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `applicant_profile_question_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `application_micro_references`
--

CREATE TABLE `application_micro_references` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_application_id` int(10) UNSIGNED NOT NULL,
  `criteria_id` int(10) UNSIGNED NOT NULL,
  `micro_reference_id` int(10) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `application_status`
--

CREATE TABLE `application_status` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `application_status_translations`
--

CREATE TABLE `application_status_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `application_status_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `application_work_samples`
--

CREATE TABLE `application_work_samples` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_application_id` int(10) UNSIGNED NOT NULL,
  `criteria_id` int(10) UNSIGNED NOT NULL,
  `work_sample_id` int(10) UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citizenship_declarations`
--

CREATE TABLE `citizenship_declarations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citizenship_declaration_translations`
--

CREATE TABLE `citizenship_declaration_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `citizenship_declaration_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE `criteria` (
  `id` int(10) UNSIGNED NOT NULL,
  `criteria_type_id` int(10) UNSIGNED NOT NULL,
  `job_poster_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `criteria_translations`
--

CREATE TABLE `criteria_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `criteria_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `criteria_types`
--

CREATE TABLE `criteria_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `criteria_type_translations`
--

CREATE TABLE `criteria_type_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `criteria_type_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_translations`
--

CREATE TABLE `department_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `department_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `experience_levels`
--

CREATE TABLE `experience_levels` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `experience_level_translations`
--

CREATE TABLE `experience_level_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `experience_level_id` int(10) UNSIGNED NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_types`
--

CREATE TABLE `file_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `file_type_translations`
--

CREATE TABLE `file_type_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `file_type_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `frequencies`
--

CREATE TABLE `frequencies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `frequncy`
--

CREATE TABLE `frequncy` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_poster_id` int(10) UNSIGNED NOT NULL,
  `application_status_id` int(10) UNSIGNED NOT NULL,
  `applicant_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_application_answers`
--

CREATE TABLE `job_application_answers` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_poster_questions_id` int(10) UNSIGNED NOT NULL,
  `job_application_id` int(10) UNSIGNED NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_posters`
--

CREATE TABLE `job_posters` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_term_id` int(10) UNSIGNED NOT NULL,
  `term_qty` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `open_date_time` datetime NOT NULL,
  `close_date_time` datetime NOT NULL,
  `start_date_time` datetime NOT NULL,
  `department_id` int(10) UNSIGNED NOT NULL,
  `province_id` int(10) UNSIGNED NOT NULL,
  `salary_min` int(11) DEFAULT NULL,
  `salary_max` int(11) DEFAULT NULL,
  `noc` int(11) NOT NULL,
  `classification` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `security_clearance_id` int(10) UNSIGNED NOT NULL,
  `language_requirement_id` int(10) UNSIGNED NOT NULL,
  `manager_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_poster_key_tasks`
--

CREATE TABLE `job_poster_key_tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_poster_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_poster_key_task_translations`
--

CREATE TABLE `job_poster_key_task_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_poster_key_task_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_poster_questions`
--

CREATE TABLE `job_poster_questions` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_poster_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_poster_question_translations`
--

CREATE TABLE `job_poster_question_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_poster_question_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_poster_translations`
--

CREATE TABLE `job_poster_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_poster_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` text COLLATE utf8mb4_unicode_ci,
  `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `impact` text COLLATE utf8mb4_unicode_ci,
  `branch` text COLLATE utf8mb4_unicode_ci,
  `division` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_terms`
--

CREATE TABLE `job_terms` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_term_translations`
--

CREATE TABLE `job_term_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_term_id` int(10) UNSIGNED NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `language_requirements`
--

CREATE TABLE `language_requirements` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `language_requirement_translations`
--

CREATE TABLE `language_requirement_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_requirement_id` int(10) UNSIGNED NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `managers`
--

CREATE TABLE `managers` (
  `id` int(10) UNSIGNED NOT NULL,
  `department_id` int(10) UNSIGNED DEFAULT NULL,
  `twitter_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `work_review_frequency_id` int(10) UNSIGNED NOT NULL,
  `stay_late_frequency_id` int(10) UNSIGNED NOT NULL,
  `engage_team_frequency_id` int(10) UNSIGNED NOT NULL,
  `development_opportunity_frequency_id` int(10) UNSIGNED NOT NULL,
  `refuse_low_value_work_frequency_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manager_translations`
--

CREATE TABLE `manager_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `about_me` text COLLATE utf8mb4_unicode_ci,
  `greatest_accomplishment` text COLLATE utf8mb4_unicode_ci,
  `branch` text COLLATE utf8mb4_unicode_ci,
  `division` text COLLATE utf8mb4_unicode_ci,
  `position` text COLLATE utf8mb4_unicode_ci,
  `leadership_style` text COLLATE utf8mb4_unicode_ci,
  `employee_learning` text COLLATE utf8mb4_unicode_ci,
  `expectations` text COLLATE utf8mb4_unicode_ci,
  `manager_id` int(10) UNSIGNED NOT NULL,
  `work_experience` text COLLATE utf8mb4_unicode_ci,
  `education` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `micro_references`
--

CREATE TABLE `micro_references` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relationship_id` int(10) UNSIGNED DEFAULT NULL,
  `observed_from_date` date DEFAULT NULL,
  `observed_until_date` date DEFAULT NULL,
  `experience_level_id` int(10) UNSIGNED DEFAULT NULL,
  `story` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(191, '2018_07_12_145513_create_applicant_profile_answers_table', 1),
(192, '2018_07_12_145513_create_applicant_profile_question_translations_table', 1),
(193, '2018_07_12_145513_create_applicant_profile_questions_table', 1),
(194, '2018_07_12_145513_create_applicants_table', 1),
(195, '2018_07_12_145513_create_application_micro_references_table', 1),
(196, '2018_07_12_145513_create_application_status_table', 1),
(197, '2018_07_12_145513_create_application_status_translations_table', 1),
(198, '2018_07_12_145513_create_application_work_samples_table', 1),
(199, '2018_07_12_145513_create_citizenship_declaration_translations_table', 1),
(200, '2018_07_12_145513_create_citizenship_declarations_table', 1),
(201, '2018_07_12_145513_create_criteria_table', 1),
(202, '2018_07_12_145513_create_criteria_translations_table', 1),
(203, '2018_07_12_145513_create_criteria_type_translations_table', 1),
(204, '2018_07_12_145513_create_criteria_types_table', 1),
(205, '2018_07_12_145513_create_department_translations_table', 1),
(206, '2018_07_12_145513_create_departments_table', 1),
(207, '2018_07_12_145513_create_experience_level_translations_table', 1),
(208, '2018_07_12_145513_create_experience_levels_table', 1),
(209, '2018_07_12_145513_create_file_type_translations_table', 1),
(210, '2018_07_12_145513_create_file_types_table', 1),
(211, '2018_07_12_145513_create_job_application_answers_table', 1),
(212, '2018_07_12_145513_create_job_applications_table', 1),
(213, '2018_07_12_145513_create_job_poster_key_task_translations_table', 1),
(214, '2018_07_12_145513_create_job_poster_key_tasks_table', 1),
(215, '2018_07_12_145513_create_job_poster_question_translations_table', 1),
(216, '2018_07_12_145513_create_job_poster_questions_table', 1),
(217, '2018_07_12_145513_create_job_poster_translations_table', 1),
(218, '2018_07_12_145513_create_job_posters_table', 1),
(219, '2018_07_12_145513_create_job_term_translations_table', 1),
(220, '2018_07_12_145513_create_job_terms_table', 1),
(221, '2018_07_12_145513_create_language_requirement_translations_table', 1),
(222, '2018_07_12_145513_create_language_requirements_table', 1),
(223, '2018_07_12_145513_create_manager_translations_table', 1),
(224, '2018_07_12_145513_create_managers_table', 1),
(225, '2018_07_12_145513_create_micro_references_table', 1),
(226, '2018_07_12_145513_create_profile_pics_table', 1),
(227, '2018_07_12_145513_create_province_translations_table', 1),
(228, '2018_07_12_145513_create_provinces_table', 1),
(229, '2018_07_12_145513_create_relationship_translations_table', 1),
(230, '2018_07_12_145513_create_relationships_table', 1),
(231, '2018_07_12_145513_create_security_clearance_translations_table', 1),
(232, '2018_07_12_145513_create_security_clearances_table', 1),
(233, '2018_07_12_145513_create_skill_declaration_table', 1),
(234, '2018_07_12_145513_create_skill_level_translations_table', 1),
(235, '2018_07_12_145513_create_skill_levels_table', 1),
(236, '2018_07_12_145513_create_team_culture_translations_table', 1),
(237, '2018_07_12_145513_create_team_cultures_table', 1),
(238, '2018_07_12_145513_create_user_roles_table', 1),
(239, '2018_07_12_145513_create_users_table', 1),
(240, '2018_07_12_145513_create_work_environments_table', 1),
(241, '2018_07_12_145513_create_work_samples_table', 1),
(242, '2018_07_12_145513_create_workplace_photo_captions_table', 1),
(243, '2018_07_12_145513_create_workplace_photos_table', 1),
(244, '2018_07_12_145517_add_foreign_keys_to_applicant_profile_answers_table', 1),
(245, '2018_07_12_145517_add_foreign_keys_to_applicant_profile_question_translations_table', 1),
(246, '2018_07_12_145517_add_foreign_keys_to_applicants_table', 1),
(247, '2018_07_12_145517_add_foreign_keys_to_application_micro_references_table', 1),
(248, '2018_07_12_145517_add_foreign_keys_to_application_status_translations_table', 1),
(249, '2018_07_12_145517_add_foreign_keys_to_application_work_samples_table', 1),
(250, '2018_07_12_145517_add_foreign_keys_to_citizenship_declaration_translations_table', 1),
(251, '2018_07_12_145517_add_foreign_keys_to_criteria_table', 1),
(252, '2018_07_12_145517_add_foreign_keys_to_criteria_translations_table', 1),
(253, '2018_07_12_145517_add_foreign_keys_to_criteria_type_translations_table', 1),
(254, '2018_07_12_145517_add_foreign_keys_to_department_translations_table', 1),
(255, '2018_07_12_145517_add_foreign_keys_to_experience_level_translations_table', 1),
(256, '2018_07_12_145517_add_foreign_keys_to_file_type_translations_table', 1),
(257, '2018_07_12_145517_add_foreign_keys_to_job_application_answers_table', 1),
(258, '2018_07_12_145517_add_foreign_keys_to_job_applications_table', 1),
(259, '2018_07_12_145517_add_foreign_keys_to_job_poster_key_task_translations_table', 1),
(260, '2018_07_12_145517_add_foreign_keys_to_job_poster_key_tasks_table', 1),
(261, '2018_07_12_145517_add_foreign_keys_to_job_poster_question_translations_table', 1),
(262, '2018_07_12_145517_add_foreign_keys_to_job_poster_questions_table', 1),
(263, '2018_07_12_145517_add_foreign_keys_to_job_poster_translations_table', 1),
(264, '2018_07_12_145517_add_foreign_keys_to_job_posters_table', 1),
(265, '2018_07_12_145517_add_foreign_keys_to_job_term_translations_table', 1),
(266, '2018_07_12_145517_add_foreign_keys_to_language_requirement_translations_table', 1),
(267, '2018_07_12_145517_add_foreign_keys_to_manager_translations_table', 1),
(268, '2018_07_12_145517_add_foreign_keys_to_managers_table', 1),
(269, '2018_07_12_145517_add_foreign_keys_to_micro_references_table', 1),
(270, '2018_07_12_145517_add_foreign_keys_to_profile_pics_table', 1),
(271, '2018_07_12_145517_add_foreign_keys_to_province_translations_table', 1),
(272, '2018_07_12_145517_add_foreign_keys_to_relationship_translations_table', 1),
(273, '2018_07_12_145517_add_foreign_keys_to_security_clearance_translations_table', 1),
(274, '2018_07_12_145517_add_foreign_keys_to_skill_declaration_table', 1),
(275, '2018_07_12_145517_add_foreign_keys_to_skill_level_translations_table', 1),
(276, '2018_07_12_145517_add_foreign_keys_to_team_culture_translations_table', 1),
(277, '2018_07_12_145517_add_foreign_keys_to_team_cultures_table', 1),
(278, '2018_07_12_145517_add_foreign_keys_to_users_table', 1),
(279, '2018_07_12_145517_add_foreign_keys_to_work_environments_table', 1),
(280, '2018_07_12_145517_add_foreign_keys_to_work_samples_table', 1),
(281, '2018_07_12_145517_add_foreign_keys_to_workplace_photo_captions_table', 1),
(282, '2018_07_19_161639_AddDepartmentForeignIdToManager', 1),
(283, '2018_08_10_201854_rename_applicant_linkedin_column', 1),
(284, '2018_08_16_211708_rename_manager_aboutme_col', 1),
(285, '2018_08_17_203204_create_frequency_lookup_table', 1),
(286, '2018_08_20_160509_reference_frequency_on_manager', 1),
(287, '2018_08_20_163214_reference_frequency_on_work_environment', 1);

-- --------------------------------------------------------

--
-- Table structure for table `profile_pics`
--

CREATE TABLE `profile_pics` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `image` blob NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `province_translations`
--

CREATE TABLE `province_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `province_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relationships`
--

CREATE TABLE `relationships` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relationship_translations`
--

CREATE TABLE `relationship_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `relationship_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `security_clearances`
--

CREATE TABLE `security_clearances` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `security_clearance_translations`
--

CREATE TABLE `security_clearance_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `security_clearance_id` int(10) UNSIGNED NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill_declarations`
--

CREATE TABLE `skill_declarations` (
  `id` int(10) UNSIGNED NOT NULL,
  `criteria_id` int(10) UNSIGNED NOT NULL,
  `job_application_id` int(10) UNSIGNED NOT NULL,
  `experience_level_id` int(10) UNSIGNED DEFAULT NULL,
  `skill_level_id` int(10) UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill_levels`
--

CREATE TABLE `skill_levels` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill_level_translations`
--

CREATE TABLE `skill_level_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `skill_level_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_cultures`
--

CREATE TABLE `team_cultures` (
  `id` int(10) UNSIGNED NOT NULL,
  `team_size` int(11) DEFAULT NULL,
  `gc_directory_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team_culture_translations`
--

CREATE TABLE `team_culture_translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `team_culture_id` int(10) UNSIGNED NOT NULL,
  `locale` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `narrative_text` text COLLATE utf8mb4_unicode_ci,
  `operating_context` text COLLATE utf8mb4_unicode_ci,
  `what_we_value` text COLLATE utf8mb4_unicode_ci,
  `how_we_work` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `user_role_id` int(10) UNSIGNED NOT NULL,
  `open_id_sub` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workplace_photos`
--

CREATE TABLE `workplace_photos` (
  `id` int(10) UNSIGNED NOT NULL,
  `image` blob NOT NULL,
  `mime_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workplace_photo_captions`
--

CREATE TABLE `workplace_photo_captions` (
  `id` int(10) UNSIGNED NOT NULL,
  `work_environment_id` int(10) UNSIGNED NOT NULL,
  `photo_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `workplace_photo_id` int(10) UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `work_environments`
--

CREATE TABLE `work_environments` (
  `id` int(10) UNSIGNED NOT NULL,
  `manager_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remote_work_allowed` tinyint(1) DEFAULT NULL,
  `telework_allowed_frequency_id` int(10) UNSIGNED NOT NULL,
  `flexible_hours_frequency_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `work_samples`
--

CREATE TABLE `work_samples` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci,
  `date_created` date DEFAULT NULL,
  `file_type_id` int(10) UNSIGNED DEFAULT NULL,
  `url` text COLLATE utf8mb4_unicode_ci,
  `story` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `applicants_user_id_unique` (`user_id`);

--
-- Indexes for table `applicant_profile_answers`
--
ALTER TABLE `applicant_profile_answers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `app_profile_answers_app_id_app_profile_question_id_unique` (`applicant_id`,`applicant_profile_question_id`),
  ADD KEY `applicant_profile_answers_applicant_id_index` (`applicant_id`),
  ADD KEY `applicant_profile_answers_applicant_profile_question_id_index` (`applicant_profile_question_id`);

--
-- Indexes for table `applicant_profile_questions`
--
ALTER TABLE `applicant_profile_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `applicant_profile_question_translations`
--
ALTER TABLE `applicant_profile_question_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `app_profile_ques_trans_app_profile_question_id_locale_unique` (`applicant_profile_question_id`,`locale`),
  ADD KEY `applicant_profile_question_trans_applicant_profile_question_idx` (`applicant_profile_question_id`);

--
-- Indexes for table `application_micro_references`
--
ALTER TABLE `application_micro_references`
  ADD PRIMARY KEY (`id`),
  ADD KEY `application_micro_references_job_application_id_index` (`job_application_id`),
  ADD KEY `application_micro_references_criteria_id_index` (`criteria_id`),
  ADD KEY `application_micro_references_micro_reference_id_index` (`micro_reference_id`);

--
-- Indexes for table `application_status`
--
ALTER TABLE `application_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `application_status_translations`
--
ALTER TABLE `application_status_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `application_status_trans_application_status_id_locale_unique` (`application_status_id`,`locale`),
  ADD KEY `application_status_translations_application_status_id_index` (`application_status_id`);

--
-- Indexes for table `application_work_samples`
--
ALTER TABLE `application_work_samples`
  ADD PRIMARY KEY (`id`),
  ADD KEY `application_work_samples_job_application_id_index` (`job_application_id`),
  ADD KEY `application_work_samples_criteria_id_index` (`criteria_id`),
  ADD KEY `application_work_samples_work_sample_id_index` (`work_sample_id`);

--
-- Indexes for table `citizenship_declarations`
--
ALTER TABLE `citizenship_declarations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `citizenship_declaration_translations`
--
ALTER TABLE `citizenship_declaration_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `citiz_declaration_trans_citiz_declaration_id_locale_unique` (`citizenship_declaration_id`,`locale`),
  ADD KEY `citizenship_declaration_trans_citizenship_declaration_id_idx` (`citizenship_declaration_id`);

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `criteria_criteria_type_id_index` (`criteria_type_id`),
  ADD KEY `criteria_job_poster_id_index` (`job_poster_id`);

--
-- Indexes for table `criteria_translations`
--
ALTER TABLE `criteria_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `criteria_translations_criteria_id_locale_unique` (`criteria_id`,`locale`),
  ADD KEY `criteria_translations_criteria_id_index` (`criteria_id`),
  ADD KEY `criteria_translations_name_index` (`name`);

--
-- Indexes for table `criteria_types`
--
ALTER TABLE `criteria_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `criteria_type_translations`
--
ALTER TABLE `criteria_type_translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `criteria_type_translations_criteria_type_id_index` (`criteria_type_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department_translations`
--
ALTER TABLE `department_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `department_translations_department_id_locale_unique` (`department_id`,`locale`),
  ADD KEY `department_translations_department_id_index` (`department_id`);

--
-- Indexes for table `experience_levels`
--
ALTER TABLE `experience_levels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experience_level_translations`
--
ALTER TABLE `experience_level_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `experience_level_translations_experience_level_id_locale_unique` (`experience_level_id`,`locale`),
  ADD KEY `experience_level_translations_experience_level_id_index` (`experience_level_id`);

--
-- Indexes for table `file_types`
--
ALTER TABLE `file_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `file_type_translations`
--
ALTER TABLE `file_type_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `file_type_translations_file_type_id_locale_unique` (`file_type_id`,`locale`),
  ADD KEY `file_type_translations_file_type_id_index` (`file_type_id`);

--
-- Indexes for table `frequencies`
--
ALTER TABLE `frequencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frequncy`
--
ALTER TABLE `frequncy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_applications_job_poster_id_applicant_id_unique` (`job_poster_id`,`applicant_id`),
  ADD KEY `job_applications_job_poster_id_index` (`job_poster_id`),
  ADD KEY `job_applications_application_status_id_index` (`application_status_id`),
  ADD KEY `job_applications_applicant_id_index` (`applicant_id`);

--
-- Indexes for table `job_application_answers`
--
ALTER TABLE `job_application_answers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_appl_ans_job_poster_ques_id_job_appl_id_unique` (`job_poster_questions_id`,`job_application_id`),
  ADD KEY `job_application_answers_job_poster_questions_id_index` (`job_poster_questions_id`),
  ADD KEY `job_application_answers_job_application_id_index` (`job_application_id`);

--
-- Indexes for table `job_posters`
--
ALTER TABLE `job_posters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_posters_job_term_id_index` (`job_term_id`),
  ADD KEY `job_posters_department_id_index` (`department_id`),
  ADD KEY `job_posters_province_id_index` (`province_id`),
  ADD KEY `job_posters_security_clearance_id_index` (`security_clearance_id`),
  ADD KEY `job_posters_language_requirement_id_index` (`language_requirement_id`),
  ADD KEY `job_posters_manager_id_index` (`manager_id`);

--
-- Indexes for table `job_poster_key_tasks`
--
ALTER TABLE `job_poster_key_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_poster_key_tasks_job_poster_id_index` (`job_poster_id`);

--
-- Indexes for table `job_poster_key_task_translations`
--
ALTER TABLE `job_poster_key_task_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_poster_key_task_trans_job_poster_key_task_id_locale_unique` (`job_poster_key_task_id`,`locale`),
  ADD KEY `job_poster_key_task_translations_job_poster_key_task_id_index` (`job_poster_key_task_id`);

--
-- Indexes for table `job_poster_questions`
--
ALTER TABLE `job_poster_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_poster_questions_job_poster_id_index` (`job_poster_id`);

--
-- Indexes for table `job_poster_question_translations`
--
ALTER TABLE `job_poster_question_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_poster_question_trans_job_poster_question_id_locale_unique` (`job_poster_question_id`,`locale`),
  ADD KEY `job_poster_question_translations_job_poster_question_id_index` (`job_poster_question_id`);

--
-- Indexes for table `job_poster_translations`
--
ALTER TABLE `job_poster_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_poster_translations_job_poster_id_locale_unique` (`job_poster_id`,`locale`),
  ADD KEY `job_poster_translations_job_poster_id_index` (`job_poster_id`);

--
-- Indexes for table `job_terms`
--
ALTER TABLE `job_terms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_term_translations`
--
ALTER TABLE `job_term_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_term_translations_job_term_id_locale_unique` (`job_term_id`,`locale`),
  ADD KEY `job_term_translations_job_term_id_index` (`job_term_id`);

--
-- Indexes for table `language_requirements`
--
ALTER TABLE `language_requirements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `language_requirement_translations`
--
ALTER TABLE `language_requirement_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lang_requirement_trans_lang_requirement_id_locale_unique` (`language_requirement_id`,`locale`),
  ADD KEY `language_requirement_translations_language_requirement_id_index` (`language_requirement_id`);

--
-- Indexes for table `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `managers_user_id_unique` (`user_id`),
  ADD KEY `managers_department_id_index` (`department_id`),
  ADD KEY `managers_work_review_frequency_id_foreign` (`work_review_frequency_id`),
  ADD KEY `managers_stay_late_frequency_id_foreign` (`stay_late_frequency_id`),
  ADD KEY `managers_engage_team_frequency_id_foreign` (`engage_team_frequency_id`),
  ADD KEY `managers_development_opportunity_frequency_id_foreign` (`development_opportunity_frequency_id`),
  ADD KEY `managers_refuse_low_value_work_frequency_id_foreign` (`refuse_low_value_work_frequency_id`);

--
-- Indexes for table `manager_translations`
--
ALTER TABLE `manager_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `manager_translations_manager_id_locale_unique` (`manager_id`,`locale`),
  ADD KEY `manager_translations_manager_id_index` (`manager_id`);

--
-- Indexes for table `micro_references`
--
ALTER TABLE `micro_references`
  ADD PRIMARY KEY (`id`),
  ADD KEY `micro_references_relationship_id_index` (`relationship_id`),
  ADD KEY `micro_references_experience_level_id_index` (`experience_level_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile_pics`
--
ALTER TABLE `profile_pics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profile_pics_user_id_unique` (`user_id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `province_translations`
--
ALTER TABLE `province_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `province_translations_province_id_locale_unique` (`province_id`,`locale`),
  ADD KEY `province_translations_province_id_index` (`province_id`);

--
-- Indexes for table `relationships`
--
ALTER TABLE `relationships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relationship_translations`
--
ALTER TABLE `relationship_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `relationship_translations_relationship_id_locale_unique` (`relationship_id`,`locale`),
  ADD KEY `relationship_translations_relationship_id_index` (`relationship_id`);

--
-- Indexes for table `security_clearances`
--
ALTER TABLE `security_clearances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `security_clearance_translations`
--
ALTER TABLE `security_clearance_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `security_clearance_trans_security_clearance_id_locale_unique` (`security_clearance_id`,`locale`),
  ADD KEY `security_clearance_translations_security_clearance_id_index` (`security_clearance_id`);

--
-- Indexes for table `skill_declarations`
--
ALTER TABLE `skill_declarations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `skill_declarations_criteria_id_job_application_id_unique` (`criteria_id`,`job_application_id`),
  ADD KEY `skill_declarations_criteria_id_index` (`criteria_id`),
  ADD KEY `skill_declarations_job_application_id_index` (`job_application_id`),
  ADD KEY `skill_declarations_experience_level_id_index` (`experience_level_id`),
  ADD KEY `skill_declarations_skill_level_id_index` (`skill_level_id`);

--
-- Indexes for table `skill_levels`
--
ALTER TABLE `skill_levels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill_level_translations`
--
ALTER TABLE `skill_level_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `skill_level_translations_skill_level_id_locale_unique` (`skill_level_id`,`locale`),
  ADD KEY `skill_level_translations_skill_level_id_index` (`skill_level_id`);

--
-- Indexes for table `team_cultures`
--
ALTER TABLE `team_cultures`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_cultures_manager_id_unique` (`manager_id`);

--
-- Indexes for table `team_culture_translations`
--
ALTER TABLE `team_culture_translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_culture_translations_team_culture_id_locale_unique` (`team_culture_id`,`locale`),
  ADD KEY `team_culture_translations_team_culture_id_index` (`team_culture_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_open_id_sub_unique` (`open_id_sub`),
  ADD KEY `users_name_index` (`name`),
  ADD KEY `users_user_role_id_index` (`user_role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workplace_photos`
--
ALTER TABLE `workplace_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workplace_photo_captions`
--
ALTER TABLE `workplace_photo_captions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `workplace_photo_captions_work_environment_id_photo_name_unique` (`work_environment_id`,`photo_name`),
  ADD UNIQUE KEY `workplace_photo_captions_workplace_photo_id_unique` (`workplace_photo_id`),
  ADD KEY `workplace_photo_captions_work_environment_id_index` (`work_environment_id`);

--
-- Indexes for table `work_environments`
--
ALTER TABLE `work_environments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `work_environments_manager_id_unique` (`manager_id`),
  ADD KEY `work_environments_telework_allowed_frequency_id_foreign` (`telework_allowed_frequency_id`),
  ADD KEY `work_environments_flexible_hours_frequency_id_foreign` (`flexible_hours_frequency_id`);

--
-- Indexes for table `work_samples`
--
ALTER TABLE `work_samples`
  ADD PRIMARY KEY (`id`),
  ADD KEY `work_samples_file_type_id_index` (`file_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applicant_profile_answers`
--
ALTER TABLE `applicant_profile_answers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applicant_profile_questions`
--
ALTER TABLE `applicant_profile_questions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applicant_profile_question_translations`
--
ALTER TABLE `applicant_profile_question_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `application_micro_references`
--
ALTER TABLE `application_micro_references`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `application_status`
--
ALTER TABLE `application_status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `application_status_translations`
--
ALTER TABLE `application_status_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `application_work_samples`
--
ALTER TABLE `application_work_samples`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizenship_declarations`
--
ALTER TABLE `citizenship_declarations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizenship_declaration_translations`
--
ALTER TABLE `citizenship_declaration_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `criteria_translations`
--
ALTER TABLE `criteria_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `criteria_types`
--
ALTER TABLE `criteria_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `criteria_type_translations`
--
ALTER TABLE `criteria_type_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_translations`
--
ALTER TABLE `department_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `experience_levels`
--
ALTER TABLE `experience_levels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `experience_level_translations`
--
ALTER TABLE `experience_level_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_types`
--
ALTER TABLE `file_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file_type_translations`
--
ALTER TABLE `file_type_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `frequencies`
--
ALTER TABLE `frequencies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `frequncy`
--
ALTER TABLE `frequncy`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_application_answers`
--
ALTER TABLE `job_application_answers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_posters`
--
ALTER TABLE `job_posters`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_poster_key_tasks`
--
ALTER TABLE `job_poster_key_tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_poster_key_task_translations`
--
ALTER TABLE `job_poster_key_task_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_poster_questions`
--
ALTER TABLE `job_poster_questions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_poster_question_translations`
--
ALTER TABLE `job_poster_question_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_poster_translations`
--
ALTER TABLE `job_poster_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_terms`
--
ALTER TABLE `job_terms`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_term_translations`
--
ALTER TABLE `job_term_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `language_requirements`
--
ALTER TABLE `language_requirements`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `language_requirement_translations`
--
ALTER TABLE `language_requirement_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `managers`
--
ALTER TABLE `managers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manager_translations`
--
ALTER TABLE `manager_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `micro_references`
--
ALTER TABLE `micro_references`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=288;

--
-- AUTO_INCREMENT for table `profile_pics`
--
ALTER TABLE `profile_pics`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `province_translations`
--
ALTER TABLE `province_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `relationships`
--
ALTER TABLE `relationships`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `relationship_translations`
--
ALTER TABLE `relationship_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `security_clearances`
--
ALTER TABLE `security_clearances`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `security_clearance_translations`
--
ALTER TABLE `security_clearance_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skill_declarations`
--
ALTER TABLE `skill_declarations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skill_levels`
--
ALTER TABLE `skill_levels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skill_level_translations`
--
ALTER TABLE `skill_level_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_cultures`
--
ALTER TABLE `team_cultures`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team_culture_translations`
--
ALTER TABLE `team_culture_translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workplace_photos`
--
ALTER TABLE `workplace_photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workplace_photo_captions`
--
ALTER TABLE `workplace_photo_captions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `work_environments`
--
ALTER TABLE `work_environments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `work_samples`
--
ALTER TABLE `work_samples`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `applicants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `applicant_profile_answers`
--
ALTER TABLE `applicant_profile_answers`
  ADD CONSTRAINT `applicant_profile_answers_applicant_id_foreign` FOREIGN KEY (`applicant_id`) REFERENCES `applicants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `applicant_profile_answers_applicant_profile_question_id_foreign` FOREIGN KEY (`applicant_profile_question_id`) REFERENCES `applicant_profile_questions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `applicant_profile_question_translations`
--
ALTER TABLE `applicant_profile_question_translations`
  ADD CONSTRAINT `applicant_profile_question_trans_applicant_profile_question_fk` FOREIGN KEY (`applicant_profile_question_id`) REFERENCES `applicant_profile_questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `application_micro_references`
--
ALTER TABLE `application_micro_references`
  ADD CONSTRAINT `application_micro_references_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `application_micro_references_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `application_micro_references_micro_reference_id_foreign` FOREIGN KEY (`micro_reference_id`) REFERENCES `micro_references` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `application_status_translations`
--
ALTER TABLE `application_status_translations`
  ADD CONSTRAINT `application_status_translations_application_status_id_foreign` FOREIGN KEY (`application_status_id`) REFERENCES `application_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `application_work_samples`
--
ALTER TABLE `application_work_samples`
  ADD CONSTRAINT `application_work_samples_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `application_work_samples_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `application_work_samples_work_sample_id_foreign` FOREIGN KEY (`work_sample_id`) REFERENCES `work_samples` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `citizenship_declaration_translations`
--
ALTER TABLE `citizenship_declaration_translations`
  ADD CONSTRAINT `citizenship_declaration_trans_citizenship_declaration_fk` FOREIGN KEY (`citizenship_declaration_id`) REFERENCES `citizenship_declarations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `criteria`
--
ALTER TABLE `criteria`
  ADD CONSTRAINT `criteria_criteria_type_id_foreign` FOREIGN KEY (`criteria_type_id`) REFERENCES `criteria_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `criteria_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `criteria_translations`
--
ALTER TABLE `criteria_translations`
  ADD CONSTRAINT `criteria_translations_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `criteria_type_translations`
--
ALTER TABLE `criteria_type_translations`
  ADD CONSTRAINT `criteria_type_translations_criteria_type_id_foreign` FOREIGN KEY (`criteria_type_id`) REFERENCES `criteria_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `department_translations`
--
ALTER TABLE `department_translations`
  ADD CONSTRAINT `department_translations_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `experience_level_translations`
--
ALTER TABLE `experience_level_translations`
  ADD CONSTRAINT `experience_level_translations_experience_level_id_foreign` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `file_type_translations`
--
ALTER TABLE `file_type_translations`
  ADD CONSTRAINT `file_type_translations_file_type_id_foreign` FOREIGN KEY (`file_type_id`) REFERENCES `file_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_applicant_id_foreign` FOREIGN KEY (`applicant_id`) REFERENCES `applicants` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `job_applications_application_status_id_foreign` FOREIGN KEY (`application_status_id`) REFERENCES `application_status` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `job_applications_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `job_application_answers`
--
ALTER TABLE `job_application_answers`
  ADD CONSTRAINT `job_application_answers_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `job_application_answers_job_poster_questions_id_foreign` FOREIGN KEY (`job_poster_questions_id`) REFERENCES `job_poster_questions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `job_posters`
--
ALTER TABLE `job_posters`
  ADD CONSTRAINT `job_posters_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `job_posters_job_term_id_foreign` FOREIGN KEY (`job_term_id`) REFERENCES `job_terms` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `job_posters_language_requirement_id_foreign` FOREIGN KEY (`language_requirement_id`) REFERENCES `language_requirements` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `job_posters_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `job_posters_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `job_posters_security_clearance_id_foreign` FOREIGN KEY (`security_clearance_id`) REFERENCES `security_clearances` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `job_poster_key_tasks`
--
ALTER TABLE `job_poster_key_tasks`
  ADD CONSTRAINT `job_poster_key_tasks_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_poster_key_task_translations`
--
ALTER TABLE `job_poster_key_task_translations`
  ADD CONSTRAINT `job_poster_key_task_translations_job_poster_key_task_id_foreign` FOREIGN KEY (`job_poster_key_task_id`) REFERENCES `job_poster_key_tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_poster_questions`
--
ALTER TABLE `job_poster_questions`
  ADD CONSTRAINT `job_poster_questions_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_poster_question_translations`
--
ALTER TABLE `job_poster_question_translations`
  ADD CONSTRAINT `job_poster_question_translations_job_poster_question_id_foreign` FOREIGN KEY (`job_poster_question_id`) REFERENCES `job_poster_questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_poster_translations`
--
ALTER TABLE `job_poster_translations`
  ADD CONSTRAINT `job_poster_translations_job_poster_id_foreign` FOREIGN KEY (`job_poster_id`) REFERENCES `job_posters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_term_translations`
--
ALTER TABLE `job_term_translations`
  ADD CONSTRAINT `job_term_translations_job_term_id_foreign` FOREIGN KEY (`job_term_id`) REFERENCES `job_terms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `language_requirement_translations`
--
ALTER TABLE `language_requirement_translations`
  ADD CONSTRAINT `language_requirement_trans_language_requirement_foreign` FOREIGN KEY (`language_requirement_id`) REFERENCES `language_requirements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `managers`
--
ALTER TABLE `managers`
  ADD CONSTRAINT `managers_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `managers_development_opportunity_frequency_id_foreign` FOREIGN KEY (`development_opportunity_frequency_id`) REFERENCES `frequencies` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `managers_engage_team_frequency_id_foreign` FOREIGN KEY (`engage_team_frequency_id`) REFERENCES `frequencies` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `managers_refuse_low_value_work_frequency_id_foreign` FOREIGN KEY (`refuse_low_value_work_frequency_id`) REFERENCES `frequencies` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `managers_stay_late_frequency_id_foreign` FOREIGN KEY (`stay_late_frequency_id`) REFERENCES `frequencies` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `managers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `managers_work_review_frequency_id_foreign` FOREIGN KEY (`work_review_frequency_id`) REFERENCES `frequencies` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `manager_translations`
--
ALTER TABLE `manager_translations`
  ADD CONSTRAINT `manager_translations_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `micro_references`
--
ALTER TABLE `micro_references`
  ADD CONSTRAINT `micro_references_experience_level_id_foreign` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_levels` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `micro_references_relationship_id_foreign` FOREIGN KEY (`relationship_id`) REFERENCES `relationships` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `profile_pics`
--
ALTER TABLE `profile_pics`
  ADD CONSTRAINT `profile_pics_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `province_translations`
--
ALTER TABLE `province_translations`
  ADD CONSTRAINT `province_translations_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `relationship_translations`
--
ALTER TABLE `relationship_translations`
  ADD CONSTRAINT `relationship_translations_relationship_id_foreign` FOREIGN KEY (`relationship_id`) REFERENCES `relationships` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `security_clearance_translations`
--
ALTER TABLE `security_clearance_translations`
  ADD CONSTRAINT `security_clearance_translations_security_clearance_id_foreign` FOREIGN KEY (`security_clearance_id`) REFERENCES `security_clearances` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `skill_declarations`
--
ALTER TABLE `skill_declarations`
  ADD CONSTRAINT `skill_declarations_criteria_id_foreign` FOREIGN KEY (`criteria_id`) REFERENCES `criteria` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_declarations_experience_level_id_foreign` FOREIGN KEY (`experience_level_id`) REFERENCES `experience_levels` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_declarations_job_application_id_foreign` FOREIGN KEY (`job_application_id`) REFERENCES `job_applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `skill_declarations_skill_level_id_foreign` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_levels` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `skill_level_translations`
--
ALTER TABLE `skill_level_translations`
  ADD CONSTRAINT `skill_level_translations_skill_level_id_foreign` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team_cultures`
--
ALTER TABLE `team_cultures`
  ADD CONSTRAINT `team_cultures_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team_culture_translations`
--
ALTER TABLE `team_culture_translations`
  ADD CONSTRAINT `team_culture_translations_team_culture_id_foreign` FOREIGN KEY (`team_culture_id`) REFERENCES `team_cultures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_user_role_id_foreign` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `workplace_photo_captions`
--
ALTER TABLE `workplace_photo_captions`
  ADD CONSTRAINT `workplace_photo_captions_work_environment_id_foreign` FOREIGN KEY (`work_environment_id`) REFERENCES `work_environments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `workplace_photo_captions_workplace_photo_id_foreign` FOREIGN KEY (`workplace_photo_id`) REFERENCES `workplace_photos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `work_environments`
--
ALTER TABLE `work_environments`
  ADD CONSTRAINT `work_environments_flexible_hours_frequency_id_foreign` FOREIGN KEY (`flexible_hours_frequency_id`) REFERENCES `frequencies` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `work_environments_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `work_environments_telework_allowed_frequency_id_foreign` FOREIGN KEY (`telework_allowed_frequency_id`) REFERENCES `frequencies` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `work_samples`
--
ALTER TABLE `work_samples`
  ADD CONSTRAINT `work_samples_file_type_id_foreign` FOREIGN KEY (`file_type_id`) REFERENCES `file_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;
