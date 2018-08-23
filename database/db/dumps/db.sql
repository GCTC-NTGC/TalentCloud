CREATE DATABASE testdb;

\c testdb;

DROP DATABASE IF EXISTS talentcloud;

DROP ROLE IF EXISTS talentcloud;

CREATE ROLE talentcloud WITH LOGIN PASSWORD 'talentcloud';

CREATE DATABASE talentcloud
 WITH ENCODING='UTF8'
 OWNER=talentcloud
 CONNECTION LIMIT=25;

GRANT ALL PRIVILEGES ON DATABASE talentcloud TO talentcloud;

\c talentcloud talentcloud;

-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: talentcloud-db
-- Generation Time: Aug 01, 2018 at 07:41 PM
-- Server version: 5.6.41
-- PHP Version: 7.2.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

--
-- Table structure for table applicants
--

CREATE TABLE applicants (
  id int CHECK (id > 0) NOT NULL,
  personal_website varchar(191) DEFAULT NULL,
  tagline text,
  twitter_username varchar(191) DEFAULT NULL,
  linkedin_username varchar(191) DEFAULT NULL,
  user_id int CHECK (user_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table applicant_profile_answers
--

CREATE TABLE applicant_profile_answers (
  id int CHECK (id > 0) NOT NULL,
  applicant_id int CHECK (applicant_id > 0) NOT NULL,
  applicant_profile_question_id int CHECK (applicant_profile_question_id > 0) NOT NULL,
  answer text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table applicant_profile_questions
--

CREATE TABLE applicant_profile_questions (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table applicant_profile_question_translations
--

CREATE TABLE applicant_profile_question_translations (
  id int CHECK (id > 0) NOT NULL,
  applicant_profile_question_id int CHECK (applicant_profile_question_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value text NOT NULL,
  description text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table application_micro_references
--

CREATE TABLE application_micro_references (
  id int CHECK (id > 0) NOT NULL,
  job_application_id int CHECK (job_application_id > 0) NOT NULL,
  criteria_id int CHECK (criteria_id > 0) NOT NULL,
  micro_reference_id int CHECK (micro_reference_id > 0) NOT NULL,
  is_active smallint NOT NULL DEFAULT 1,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table application_status
--

CREATE TABLE application_status (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table application_status_translations
--

CREATE TABLE application_status_translations (
  id int CHECK (id > 0) NOT NULL,
  application_status_id int CHECK (application_status_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table application_work_samples
--

CREATE TABLE application_work_samples (
  id int CHECK (id > 0) NOT NULL,
  job_application_id int CHECK (job_application_id > 0) NOT NULL,
  criteria_id int CHECK (criteria_id > 0) NOT NULL,
  work_sample_id int CHECK (work_sample_id > 0) NOT NULL,
  is_active smallint NOT NULL DEFAULT 1,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table citizenship_declarations
--

CREATE TABLE citizenship_declarations (
  id int CHECK (id > 0) NOT NULL,
  name text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table citizenship_declaration_translations
--

CREATE TABLE citizenship_declaration_translations (
  id int CHECK (id > 0) NOT NULL,
  citizenship_declaration_id int CHECK (citizenship_declaration_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table criteria
--

CREATE TABLE criteria (
  id int CHECK (id > 0) NOT NULL,
  criteria_type_id int CHECK (criteria_type_id > 0) NOT NULL,
  job_poster_id int CHECK (job_poster_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table criteria_translations
--

CREATE TABLE criteria_translations (
  id int CHECK (id > 0) NOT NULL,
  criteria_id int CHECK (criteria_id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  description text,
  locale varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table criteria_types
--

CREATE TABLE criteria_types (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table criteria_type_translations
--

CREATE TABLE criteria_type_translations (
  id int CHECK (id > 0) NOT NULL,
  criteria_type_id int CHECK (criteria_type_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  description text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table departments
--

CREATE TABLE departments (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table department_translations
--

CREATE TABLE department_translations (
  id int CHECK (id > 0) NOT NULL,
  department_id int CHECK (department_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table experience_levels
--

CREATE TABLE experience_levels (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table experience_level_translations
--

CREATE TABLE experience_level_translations (
  id int CHECK (id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  experience_level_id int CHECK (experience_level_id > 0) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table file_types
--

CREATE TABLE file_types (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table file_type_translations
--

CREATE TABLE file_type_translations (
  id int CHECK (id > 0) NOT NULL,
  file_type_id int CHECK (file_type_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_applications
--

CREATE TABLE job_applications (
  id int CHECK (id > 0) NOT NULL,
  job_poster_id int CHECK (job_poster_id > 0) NOT NULL,
  application_status_id int CHECK (application_status_id > 0) NOT NULL,
  applicant_id int CHECK (applicant_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_application_answers
--

CREATE TABLE job_application_answers (
  id int CHECK (id > 0) NOT NULL,
  job_poster_questions_id int CHECK (job_poster_questions_id > 0) NOT NULL,
  job_application_id int CHECK (job_application_id > 0) NOT NULL,
  answer text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_posters
--

CREATE TABLE job_posters (
  id int CHECK (id > 0) NOT NULL,
  job_term_id int CHECK (job_term_id > 0) NOT NULL,
  term_qty varchar(191) NOT NULL,
  open_date_time timestamp(0) NOT NULL,
  close_date_time timestamp(0) NOT NULL,
  start_date_time timestamp(0) NOT NULL,
  department_id int CHECK (department_id > 0) NOT NULL,
  province_id int CHECK (province_id > 0) NOT NULL,
  salary_min int DEFAULT NULL,
  salary_max int DEFAULT NULL,
  noc int NOT NULL,
  classification varchar(191) NOT NULL,
  security_clearance_id int CHECK (security_clearance_id > 0) NOT NULL,
  language_requirement_id int CHECK (language_requirement_id > 0) NOT NULL,
  manager_id int CHECK (manager_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_poster_key_tasks
--

CREATE TABLE job_poster_key_tasks (
  id int CHECK (id > 0) NOT NULL,
  job_poster_id int CHECK (job_poster_id > 0) NOT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_poster_key_task_translations
--

CREATE TABLE job_poster_key_task_translations (
  id int CHECK (id > 0) NOT NULL,
  job_poster_key_task_id int CHECK (job_poster_key_task_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  description text NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_poster_questions
--

CREATE TABLE job_poster_questions (
  id int CHECK (id > 0) NOT NULL,
  job_poster_id int CHECK (job_poster_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_poster_question_translations
--

CREATE TABLE job_poster_question_translations (
  id int CHECK (id > 0) NOT NULL,
  job_poster_question_id int CHECK (job_poster_question_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  question text NOT NULL,
  description text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_poster_translations
--

CREATE TABLE job_poster_translations (
  id int CHECK (id > 0) NOT NULL,
  job_poster_id int CHECK (job_poster_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  city text,
  title text NOT NULL,
  impact text,
  branch text,
  division text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_terms
--

CREATE TABLE job_terms (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table job_term_translations
--

CREATE TABLE job_term_translations (
  id int CHECK (id > 0) NOT NULL,
  job_term_id int CHECK (job_term_id > 0) NOT NULL,
  value varchar(191) DEFAULT NULL,
  locale varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table language_requirements
--

CREATE TABLE language_requirements (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table language_requirement_translations
--

CREATE TABLE language_requirement_translations (
  id int CHECK (id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  language_requirement_id int CHECK (language_requirement_id > 0) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table managers
--

CREATE TABLE managers (
  id int CHECK (id > 0) NOT NULL,
  department_id int CHECK (department_id > 0) DEFAULT NULL,
  twitter_username varchar(191) DEFAULT NULL,
  linkedin_username varchar(191) DEFAULT NULL,
  user_id int CHECK (user_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table manager_translations
--

CREATE TABLE manager_translations (
  id int CHECK (id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  aboutme text,
  greatest_accomplishment text,
  branch text,
  division text,
  position text,
  leadership_style text,
  employee_learning text,
  expectations text,
  manager_id int CHECK (manager_id > 0) NOT NULL,
  review_options varchar(191) DEFAULT NULL,
  staylate varchar(191) DEFAULT NULL,
  engage varchar(191) DEFAULT NULL,
  opportunities varchar(191) DEFAULT NULL,
  low_value_work_requests varchar(191) DEFAULT NULL,
  work_experience text,
  education text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table micro_references
--

CREATE TABLE micro_references (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) DEFAULT NULL,
  email varchar(191) DEFAULT NULL,
  relationship_id int CHECK (relationship_id > 0) DEFAULT NULL,
  observed_from_date date DEFAULT NULL,
  observed_until_date date DEFAULT NULL,
  experience_level_id int CHECK (experience_level_id > 0) DEFAULT NULL,
  story text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table migrations
--

CREATE TABLE migrations (
  id int CHECK (id > 0) NOT NULL,
  migration varchar(191) NOT NULL,
  batch int NOT NULL
);

--
-- Dumping data for table migrations
--

INSERT INTO migrations (id, migration, batch) VALUES
(1, '2018_07_12_145513_create_applicant_profile_answers_table', 1),
(2, '2018_07_12_145513_create_applicant_profile_question_translations_table', 1),
(3, '2018_07_12_145513_create_applicant_profile_questions_table', 1),
(4, '2018_07_12_145513_create_applicants_table', 1),
(5, '2018_07_12_145513_create_application_micro_references_table', 1),
(6, '2018_07_12_145513_create_application_status_table', 1),
(7, '2018_07_12_145513_create_application_status_translations_table', 1),
(8, '2018_07_12_145513_create_application_work_samples_table', 1),
(9, '2018_07_12_145513_create_citizenship_declaration_translations_table', 1),
(10, '2018_07_12_145513_create_citizenship_declarations_table', 1),
(11, '2018_07_12_145513_create_criteria_table', 1),
(12, '2018_07_12_145513_create_criteria_translations_table', 1),
(13, '2018_07_12_145513_create_criteria_type_translations_table', 1),
(14, '2018_07_12_145513_create_criteria_types_table', 1),
(15, '2018_07_12_145513_create_department_translations_table', 1),
(16, '2018_07_12_145513_create_departments_table', 1),
(17, '2018_07_12_145513_create_experience_level_translations_table', 1),
(18, '2018_07_12_145513_create_experience_levels_table', 1),
(19, '2018_07_12_145513_create_file_type_translations_table', 1),
(20, '2018_07_12_145513_create_file_types_table', 1),
(21, '2018_07_12_145513_create_job_application_answers_table', 1),
(22, '2018_07_12_145513_create_job_applications_table', 1),
(23, '2018_07_12_145513_create_job_poster_key_task_translations_table', 1),
(24, '2018_07_12_145513_create_job_poster_key_tasks_table', 1),
(25, '2018_07_12_145513_create_job_poster_question_translations_table', 1),
(26, '2018_07_12_145513_create_job_poster_questions_table', 1),
(27, '2018_07_12_145513_create_job_poster_translations_table', 1),
(28, '2018_07_12_145513_create_job_posters_table', 1),
(29, '2018_07_12_145513_create_job_term_translations_table', 1),
(30, '2018_07_12_145513_create_job_terms_table', 1),
(31, '2018_07_12_145513_create_language_requirement_translations_table', 1),
(32, '2018_07_12_145513_create_language_requirements_table', 1),
(33, '2018_07_12_145513_create_manager_translations_table', 1),
(34, '2018_07_12_145513_create_managers_table', 1),
(35, '2018_07_12_145513_create_micro_references_table', 1),
(36, '2018_07_12_145513_create_profile_pics_table', 1),
(37, '2018_07_12_145513_create_province_translations_table', 1),
(38, '2018_07_12_145513_create_provinces_table', 1),
(39, '2018_07_12_145513_create_relationship_translations_table', 1),
(40, '2018_07_12_145513_create_relationships_table', 1),
(41, '2018_07_12_145513_create_security_clearance_translations_table', 1),
(42, '2018_07_12_145513_create_security_clearances_table', 1),
(43, '2018_07_12_145513_create_skill_declaration_table', 1),
(44, '2018_07_12_145513_create_skill_level_translations_table', 1),
(45, '2018_07_12_145513_create_skill_levels_table', 1),
(46, '2018_07_12_145513_create_team_culture_translations_table', 1),
(47, '2018_07_12_145513_create_team_cultures_table', 1),
(48, '2018_07_12_145513_create_user_roles_table', 1),
(49, '2018_07_12_145513_create_users_table', 1),
(50, '2018_07_12_145513_create_work_environments_table', 1),
(51, '2018_07_12_145513_create_work_samples_table', 1),
(52, '2018_07_12_145513_create_workplace_photo_captions_table', 1),
(53, '2018_07_12_145513_create_workplace_photos_table', 1),
(54, '2018_07_12_145517_add_foreign_keys_to_applicant_profile_answers_table', 1),
(55, '2018_07_12_145517_add_foreign_keys_to_applicant_profile_question_translations_table', 1),
(56, '2018_07_12_145517_add_foreign_keys_to_applicants_table', 1),
(57, '2018_07_12_145517_add_foreign_keys_to_application_micro_references_table', 1),
(58, '2018_07_12_145517_add_foreign_keys_to_application_status_translations_table', 1),
(59, '2018_07_12_145517_add_foreign_keys_to_application_work_samples_table', 1),
(60, '2018_07_12_145517_add_foreign_keys_to_citizenship_declaration_translations_table', 1),
(61, '2018_07_12_145517_add_foreign_keys_to_criteria_table', 1),
(62, '2018_07_12_145517_add_foreign_keys_to_criteria_translations_table', 1),
(63, '2018_07_12_145517_add_foreign_keys_to_criteria_type_translations_table', 1),
(64, '2018_07_12_145517_add_foreign_keys_to_department_translations_table', 1),
(65, '2018_07_12_145517_add_foreign_keys_to_experience_level_translations_table', 1),
(66, '2018_07_12_145517_add_foreign_keys_to_file_type_translations_table', 1),
(67, '2018_07_12_145517_add_foreign_keys_to_job_application_answers_table', 1),
(68, '2018_07_12_145517_add_foreign_keys_to_job_applications_table', 1),
(69, '2018_07_12_145517_add_foreign_keys_to_job_poster_key_task_translations_table', 1),
(70, '2018_07_12_145517_add_foreign_keys_to_job_poster_key_tasks_table', 1),
(71, '2018_07_12_145517_add_foreign_keys_to_job_poster_question_translations_table', 1),
(72, '2018_07_12_145517_add_foreign_keys_to_job_poster_questions_table', 1),
(73, '2018_07_12_145517_add_foreign_keys_to_job_poster_translations_table', 1),
(74, '2018_07_12_145517_add_foreign_keys_to_job_posters_table', 1),
(75, '2018_07_12_145517_add_foreign_keys_to_job_term_translations_table', 1),
(76, '2018_07_12_145517_add_foreign_keys_to_language_requirement_translations_table', 1),
(77, '2018_07_12_145517_add_foreign_keys_to_manager_translations_table', 1),
(78, '2018_07_12_145517_add_foreign_keys_to_managers_table', 1),
(79, '2018_07_12_145517_add_foreign_keys_to_micro_references_table', 1),
(80, '2018_07_12_145517_add_foreign_keys_to_profile_pics_table', 1),
(81, '2018_07_12_145517_add_foreign_keys_to_province_translations_table', 1),
(82, '2018_07_12_145517_add_foreign_keys_to_relationship_translations_table', 1),
(83, '2018_07_12_145517_add_foreign_keys_to_security_clearance_translations_table', 1),
(84, '2018_07_12_145517_add_foreign_keys_to_skill_declaration_table', 1),
(85, '2018_07_12_145517_add_foreign_keys_to_skill_level_translations_table', 1),
(86, '2018_07_12_145517_add_foreign_keys_to_team_culture_translations_table', 1),
(87, '2018_07_12_145517_add_foreign_keys_to_team_cultures_table', 1),
(88, '2018_07_12_145517_add_foreign_keys_to_users_table', 1),
(89, '2018_07_12_145517_add_foreign_keys_to_work_environments_table', 1),
(90, '2018_07_12_145517_add_foreign_keys_to_work_samples_table', 1),
(91, '2018_07_12_145517_add_foreign_keys_to_workplace_photo_captions_table', 1),
(92, '2018_07_19_161639_AddDepartmentForeignIdToManager', 1);

-- --------------------------------------------------------

--
-- Table structure for table profile_pics
--

CREATE TABLE profile_pics (
  id int CHECK (id > 0) NOT NULL,
  user_id int CHECK (user_id > 0) NOT NULL,
  image bytea NOT NULL,
  type varchar(191) NOT NULL,
  size int NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table provinces
--

CREATE TABLE provinces (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table province_translations
--

CREATE TABLE province_translations (
  id int CHECK (id > 0) NOT NULL,
  province_id int CHECK (province_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table relationships
--

CREATE TABLE relationships (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table relationship_translations
--

CREATE TABLE relationship_translations (
  id int CHECK (id > 0) NOT NULL,
  relationship_id int CHECK (relationship_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table security_clearances
--

CREATE TABLE security_clearances (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table security_clearance_translations
--

CREATE TABLE security_clearance_translations (
  id int CHECK (id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  security_clearance_id int CHECK (security_clearance_id > 0) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table skill_declarations
--

CREATE TABLE skill_declarations (
  id int CHECK (id > 0) NOT NULL,
  criteria_id int CHECK (criteria_id > 0) NOT NULL,
  job_application_id int CHECK (job_application_id > 0) NOT NULL,
  experience_level_id int CHECK (experience_level_id > 0) DEFAULT NULL,
  skill_level_id int CHECK (skill_level_id > 0) DEFAULT NULL,
  description text,
  is_active smallint NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table skill_levels
--

CREATE TABLE skill_levels (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table skill_level_translations
--

CREATE TABLE skill_level_translations (
  id int CHECK (id > 0) NOT NULL,
  skill_level_id int CHECK (skill_level_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  value varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table team_cultures
--

CREATE TABLE team_cultures (
  id int CHECK (id > 0) NOT NULL,
  team_size int DEFAULT NULL,
  gc_directory_url varchar(191) DEFAULT NULL,
  manager_id int CHECK (manager_id > 0) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table team_culture_translations
--

CREATE TABLE team_culture_translations (
  id int CHECK (id > 0) NOT NULL,
  team_culture_id int CHECK (team_culture_id > 0) NOT NULL,
  locale varchar(191) NOT NULL,
  narrative_text text,
  operating_context text,
  what_we_value text,
  how_we_work text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table users
--

CREATE TABLE users (
  id int CHECK (id > 0) NOT NULL,
  email varchar(191) NOT NULL,
  name varchar(191) DEFAULT NULL,
  is_confirmed smallint NOT NULL DEFAULT 0,
  user_role_id int CHECK (user_role_id > 0) NOT NULL,
  open_id_sub varchar(191) NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table user_roles
--

CREATE TABLE user_roles (
  id int CHECK (id > 0) NOT NULL,
  name varchar(191) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table workplace_photos
--

CREATE TABLE workplace_photos (
  id int CHECK (id > 0) NOT NULL,
  image bytea NOT NULL,
  mime_type varchar(191) NOT NULL,
  size int NOT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table workplace_photo_captions
--

CREATE TABLE workplace_photo_captions (
  id int CHECK (id > 0) NOT NULL,
  work_environment_id int CHECK (work_environment_id > 0) NOT NULL,
  photo_name varchar(191) NOT NULL,
  workplace_photo_id int CHECK (workplace_photo_id > 0) DEFAULT NULL,
  description text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table work_environments
--

CREATE TABLE work_environments (
  id int CHECK (id > 0) NOT NULL,
  manager_id int CHECK (manager_id > 0) NOT NULL,
  remote_allowed varchar(191) DEFAULT NULL,
  telework_allowed varchar(191) DEFAULT NULL,
  flexible_allowed varchar(191) DEFAULT NULL,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table work_samples
--

CREATE TABLE work_samples (
  id int CHECK (id > 0) NOT NULL,
  name text,
  date_created date DEFAULT NULL,
  file_type_id int CHECK (file_type_id > 0) DEFAULT NULL,
  url text,
  story text,
  created_at timestamp(0) NULL DEFAULT NULL,
  updated_at timestamp(0) NULL DEFAULT NULL
);

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
