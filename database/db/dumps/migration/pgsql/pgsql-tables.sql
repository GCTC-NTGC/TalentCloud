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

\c talentcloud;

DROP DATABASE IF EXISTS testdb;

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
