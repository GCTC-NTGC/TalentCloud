--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 9.6.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: talentcloud; Type: SCHEMA; Schema: -; Owner: talentcloud
--

CREATE SCHEMA talentcloud;


ALTER SCHEMA talentcloud OWNER TO talentcloud;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: applicant_profile_answers; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.applicant_profile_answers (
    id integer NOT NULL,
    applicant_id integer NOT NULL,
    applicant_profile_question_id integer NOT NULL,
    answer text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.applicant_profile_answers OWNER TO talentcloud;

--
-- Name: applicant_profile_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.applicant_profile_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.applicant_profile_answers_id_seq OWNER TO talentcloud;

--
-- Name: applicant_profile_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.applicant_profile_answers_id_seq OWNED BY public.applicant_profile_answers.id;


--
-- Name: applicant_profile_question_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.applicant_profile_question_translations (
    id integer NOT NULL,
    applicant_profile_question_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value text NOT NULL,
    description text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.applicant_profile_question_translations OWNER TO talentcloud;

--
-- Name: applicant_profile_question_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.applicant_profile_question_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.applicant_profile_question_translations_id_seq OWNER TO talentcloud;

--
-- Name: applicant_profile_question_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.applicant_profile_question_translations_id_seq OWNED BY public.applicant_profile_question_translations.id;


--
-- Name: applicant_profile_questions; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.applicant_profile_questions (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.applicant_profile_questions OWNER TO talentcloud;

--
-- Name: applicant_profile_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.applicant_profile_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.applicant_profile_questions_id_seq OWNER TO talentcloud;

--
-- Name: applicant_profile_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.applicant_profile_questions_id_seq OWNED BY public.applicant_profile_questions.id;


--
-- Name: applicants; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.applicants (
    id integer NOT NULL,
    personal_website character varying(191),
    tagline text,
    twitter_username character varying(191),
    linkedin_url character varying(191),
    user_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.applicants OWNER TO talentcloud;

--
-- Name: applicants_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.applicants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.applicants_id_seq OWNER TO talentcloud;

--
-- Name: applicants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.applicants_id_seq OWNED BY public.applicants.id;


--
-- Name: application_micro_references; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.application_micro_references (
    id integer NOT NULL,
    job_application_id integer NOT NULL,
    criteria_id integer NOT NULL,
    micro_reference_id integer NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.application_micro_references OWNER TO talentcloud;

--
-- Name: application_micro_references_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.application_micro_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.application_micro_references_id_seq OWNER TO talentcloud;

--
-- Name: application_micro_references_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.application_micro_references_id_seq OWNED BY public.application_micro_references.id;


--
-- Name: application_status; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.application_status (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.application_status OWNER TO talentcloud;

--
-- Name: application_status_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.application_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.application_status_id_seq OWNER TO talentcloud;

--
-- Name: application_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.application_status_id_seq OWNED BY public.application_status.id;


--
-- Name: application_status_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.application_status_translations (
    id integer NOT NULL,
    application_status_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.application_status_translations OWNER TO talentcloud;

--
-- Name: application_status_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.application_status_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.application_status_translations_id_seq OWNER TO talentcloud;

--
-- Name: application_status_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.application_status_translations_id_seq OWNED BY public.application_status_translations.id;


--
-- Name: application_work_samples; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.application_work_samples (
    id integer NOT NULL,
    job_application_id integer NOT NULL,
    criteria_id integer NOT NULL,
    work_sample_id integer NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.application_work_samples OWNER TO talentcloud;

--
-- Name: application_work_samples_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.application_work_samples_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.application_work_samples_id_seq OWNER TO talentcloud;

--
-- Name: application_work_samples_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.application_work_samples_id_seq OWNED BY public.application_work_samples.id;


--
-- Name: citizenship_declaration_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.citizenship_declaration_translations (
    id integer NOT NULL,
    citizenship_declaration_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.citizenship_declaration_translations OWNER TO talentcloud;

--
-- Name: citizenship_declaration_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.citizenship_declaration_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.citizenship_declaration_translations_id_seq OWNER TO talentcloud;

--
-- Name: citizenship_declaration_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.citizenship_declaration_translations_id_seq OWNED BY public.citizenship_declaration_translations.id;


--
-- Name: citizenship_declarations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.citizenship_declarations (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.citizenship_declarations OWNER TO talentcloud;

--
-- Name: citizenship_declarations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.citizenship_declarations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.citizenship_declarations_id_seq OWNER TO talentcloud;

--
-- Name: citizenship_declarations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.citizenship_declarations_id_seq OWNED BY public.citizenship_declarations.id;


--
-- Name: criteria; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.criteria (
    id integer NOT NULL,
    criteria_type_id integer NOT NULL,
    job_poster_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.criteria OWNER TO talentcloud;

--
-- Name: criteria_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.criteria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.criteria_id_seq OWNER TO talentcloud;

--
-- Name: criteria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.criteria_id_seq OWNED BY public.criteria.id;


--
-- Name: criteria_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.criteria_translations (
    id integer NOT NULL,
    criteria_id integer NOT NULL,
    name character varying(191) NOT NULL,
    description text,
    locale character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.criteria_translations OWNER TO talentcloud;

--
-- Name: criteria_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.criteria_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.criteria_translations_id_seq OWNER TO talentcloud;

--
-- Name: criteria_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.criteria_translations_id_seq OWNED BY public.criteria_translations.id;


--
-- Name: criteria_type_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.criteria_type_translations (
    id integer NOT NULL,
    criteria_type_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    description text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.criteria_type_translations OWNER TO talentcloud;

--
-- Name: criteria_type_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.criteria_type_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.criteria_type_translations_id_seq OWNER TO talentcloud;

--
-- Name: criteria_type_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.criteria_type_translations_id_seq OWNED BY public.criteria_type_translations.id;


--
-- Name: criteria_types; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.criteria_types (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.criteria_types OWNER TO talentcloud;

--
-- Name: criteria_types_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.criteria_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.criteria_types_id_seq OWNER TO talentcloud;

--
-- Name: criteria_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.criteria_types_id_seq OWNED BY public.criteria_types.id;


--
-- Name: department_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.department_translations (
    id integer NOT NULL,
    department_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.department_translations OWNER TO talentcloud;

--
-- Name: department_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.department_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.department_translations_id_seq OWNER TO talentcloud;

--
-- Name: department_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.department_translations_id_seq OWNED BY public.department_translations.id;


--
-- Name: departments; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.departments OWNER TO talentcloud;

--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.departments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departments_id_seq OWNER TO talentcloud;

--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- Name: experience_level_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.experience_level_translations (
    id integer NOT NULL,
    locale character varying(191) NOT NULL,
    experience_level_id integer NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.experience_level_translations OWNER TO talentcloud;

--
-- Name: experience_level_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.experience_level_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.experience_level_translations_id_seq OWNER TO talentcloud;

--
-- Name: experience_level_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.experience_level_translations_id_seq OWNED BY public.experience_level_translations.id;


--
-- Name: experience_levels; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.experience_levels (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.experience_levels OWNER TO talentcloud;

--
-- Name: experience_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.experience_levels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.experience_levels_id_seq OWNER TO talentcloud;

--
-- Name: experience_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.experience_levels_id_seq OWNED BY public.experience_levels.id;


--
-- Name: file_type_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.file_type_translations (
    id integer NOT NULL,
    file_type_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.file_type_translations OWNER TO talentcloud;

--
-- Name: file_type_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.file_type_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.file_type_translations_id_seq OWNER TO talentcloud;

--
-- Name: file_type_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.file_type_translations_id_seq OWNED BY public.file_type_translations.id;


--
-- Name: file_types; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.file_types (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.file_types OWNER TO talentcloud;

--
-- Name: file_types_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.file_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.file_types_id_seq OWNER TO talentcloud;

--
-- Name: file_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.file_types_id_seq OWNED BY public.file_types.id;


--
-- Name: job_application_answers; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_application_answers (
    id integer NOT NULL,
    job_poster_questions_id integer NOT NULL,
    job_application_id integer NOT NULL,
    answer text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_application_answers OWNER TO talentcloud;

--
-- Name: job_application_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_application_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_application_answers_id_seq OWNER TO talentcloud;

--
-- Name: job_application_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_application_answers_id_seq OWNED BY public.job_application_answers.id;


--
-- Name: job_applications; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_applications (
    id integer NOT NULL,
    job_poster_id integer NOT NULL,
    application_status_id integer NOT NULL,
    applicant_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_applications OWNER TO talentcloud;

--
-- Name: job_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_applications_id_seq OWNER TO talentcloud;

--
-- Name: job_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_applications_id_seq OWNED BY public.job_applications.id;


--
-- Name: job_poster_key_task_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_poster_key_task_translations (
    id integer NOT NULL,
    job_poster_key_task_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    description text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_poster_key_task_translations OWNER TO talentcloud;

--
-- Name: job_poster_key_task_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_poster_key_task_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_poster_key_task_translations_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_key_task_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_poster_key_task_translations_id_seq OWNED BY public.job_poster_key_task_translations.id;


--
-- Name: job_poster_key_tasks; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_poster_key_tasks (
    id integer NOT NULL,
    job_poster_id integer NOT NULL
);


ALTER TABLE public.job_poster_key_tasks OWNER TO talentcloud;

--
-- Name: job_poster_key_tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_poster_key_tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_poster_key_tasks_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_key_tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_poster_key_tasks_id_seq OWNED BY public.job_poster_key_tasks.id;


--
-- Name: job_poster_question_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_poster_question_translations (
    id integer NOT NULL,
    job_poster_question_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    question text NOT NULL,
    description text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_poster_question_translations OWNER TO talentcloud;

--
-- Name: job_poster_question_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_poster_question_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_poster_question_translations_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_question_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_poster_question_translations_id_seq OWNED BY public.job_poster_question_translations.id;


--
-- Name: job_poster_questions; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_poster_questions (
    id integer NOT NULL,
    job_poster_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_poster_questions OWNER TO talentcloud;

--
-- Name: job_poster_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_poster_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_poster_questions_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_poster_questions_id_seq OWNED BY public.job_poster_questions.id;


--
-- Name: job_poster_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_poster_translations (
    id integer NOT NULL,
    job_poster_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    city text,
    title text NOT NULL,
    impact text,
    branch text,
    division text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_poster_translations OWNER TO talentcloud;

--
-- Name: job_poster_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_poster_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_poster_translations_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_poster_translations_id_seq OWNED BY public.job_poster_translations.id;


--
-- Name: job_posters; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_posters (
    id integer NOT NULL,
    job_term_id integer NOT NULL,
    term_qty character varying(191) NOT NULL,
    open_date_time timestamp(0) without time zone NOT NULL,
    close_date_time timestamp(0) without time zone NOT NULL,
    start_date_time timestamp(0) without time zone NOT NULL,
    department_id integer NOT NULL,
    province_id integer NOT NULL,
    salary_min integer,
    salary_max integer,
    noc integer NOT NULL,
    classification character varying(191) NOT NULL,
    security_clearance_id integer NOT NULL,
    language_requirement_id integer NOT NULL,
    manager_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_posters OWNER TO talentcloud;

--
-- Name: job_posters_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_posters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_posters_id_seq OWNER TO talentcloud;

--
-- Name: job_posters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_posters_id_seq OWNED BY public.job_posters.id;


--
-- Name: job_term_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_term_translations (
    id integer NOT NULL,
    job_term_id integer NOT NULL,
    value character varying(191),
    locale character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_term_translations OWNER TO talentcloud;

--
-- Name: job_term_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_term_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_term_translations_id_seq OWNER TO talentcloud;

--
-- Name: job_term_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_term_translations_id_seq OWNED BY public.job_term_translations.id;


--
-- Name: job_terms; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.job_terms (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.job_terms OWNER TO talentcloud;

--
-- Name: job_terms_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.job_terms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_terms_id_seq OWNER TO talentcloud;

--
-- Name: job_terms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.job_terms_id_seq OWNED BY public.job_terms.id;


--
-- Name: language_requirement_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.language_requirement_translations (
    id integer NOT NULL,
    locale character varying(191) NOT NULL,
    language_requirement_id integer NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.language_requirement_translations OWNER TO talentcloud;

--
-- Name: language_requirement_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.language_requirement_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.language_requirement_translations_id_seq OWNER TO talentcloud;

--
-- Name: language_requirement_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.language_requirement_translations_id_seq OWNED BY public.language_requirement_translations.id;


--
-- Name: language_requirements; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.language_requirements (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.language_requirements OWNER TO talentcloud;

--
-- Name: language_requirements_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.language_requirements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.language_requirements_id_seq OWNER TO talentcloud;

--
-- Name: language_requirements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.language_requirements_id_seq OWNED BY public.language_requirements.id;


--
-- Name: manager_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.manager_translations (
    id integer NOT NULL,
    locale character varying(191) NOT NULL,
    aboutme text,
    greatest_accomplishment text,
    branch text,
    division text,
    "position" text,
    leadership_style text,
    employee_learning text,
    expectations text,
    manager_id integer NOT NULL,
    review_options character varying(191),
    staylate character varying(191),
    engage character varying(191),
    opportunities character varying(191),
    low_value_work_requests character varying(191),
    work_experience text,
    education text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.manager_translations OWNER TO talentcloud;

--
-- Name: manager_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.manager_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.manager_translations_id_seq OWNER TO talentcloud;

--
-- Name: manager_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.manager_translations_id_seq OWNED BY public.manager_translations.id;


--
-- Name: managers; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.managers (
    id integer NOT NULL,
    department_id integer,
    twitter_username character varying(191),
    linkedin_username character varying(191),
    user_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.managers OWNER TO talentcloud;

--
-- Name: managers_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.managers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.managers_id_seq OWNER TO talentcloud;

--
-- Name: managers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.managers_id_seq OWNED BY public.managers.id;


--
-- Name: micro_references; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.micro_references (
    id integer NOT NULL,
    name character varying(191),
    email character varying(191),
    relationship_id integer,
    observed_from_date date,
    observed_until_date date,
    experience_level_id integer,
    story text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.micro_references OWNER TO talentcloud;

--
-- Name: micro_references_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.micro_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.micro_references_id_seq OWNER TO talentcloud;

--
-- Name: micro_references_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.micro_references_id_seq OWNED BY public.micro_references.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(191) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO talentcloud;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO talentcloud;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: profile_pics; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.profile_pics (
    id integer NOT NULL,
    user_id integer NOT NULL,
    image bytea NOT NULL,
    type character varying(191) NOT NULL,
    size integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.profile_pics OWNER TO talentcloud;

--
-- Name: profile_pics_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.profile_pics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_pics_id_seq OWNER TO talentcloud;

--
-- Name: profile_pics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.profile_pics_id_seq OWNED BY public.profile_pics.id;


--
-- Name: province_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.province_translations (
    id integer NOT NULL,
    province_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.province_translations OWNER TO talentcloud;

--
-- Name: province_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.province_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.province_translations_id_seq OWNER TO talentcloud;

--
-- Name: province_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.province_translations_id_seq OWNED BY public.province_translations.id;


--
-- Name: provinces; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.provinces (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.provinces OWNER TO talentcloud;

--
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.provinces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.provinces_id_seq OWNER TO talentcloud;

--
-- Name: provinces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.provinces_id_seq OWNED BY public.provinces.id;


--
-- Name: relationship_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.relationship_translations (
    id integer NOT NULL,
    relationship_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.relationship_translations OWNER TO talentcloud;

--
-- Name: relationship_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.relationship_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relationship_translations_id_seq OWNER TO talentcloud;

--
-- Name: relationship_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.relationship_translations_id_seq OWNED BY public.relationship_translations.id;


--
-- Name: relationships; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.relationships (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.relationships OWNER TO talentcloud;

--
-- Name: relationships_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.relationships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.relationships_id_seq OWNER TO talentcloud;

--
-- Name: relationships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.relationships_id_seq OWNED BY public.relationships.id;


--
-- Name: security_clearance_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.security_clearance_translations (
    id integer NOT NULL,
    locale character varying(191) NOT NULL,
    security_clearance_id integer NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.security_clearance_translations OWNER TO talentcloud;

--
-- Name: security_clearance_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.security_clearance_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.security_clearance_translations_id_seq OWNER TO talentcloud;

--
-- Name: security_clearance_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.security_clearance_translations_id_seq OWNED BY public.security_clearance_translations.id;


--
-- Name: security_clearances; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.security_clearances (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.security_clearances OWNER TO talentcloud;

--
-- Name: security_clearances_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.security_clearances_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.security_clearances_id_seq OWNER TO talentcloud;

--
-- Name: security_clearances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.security_clearances_id_seq OWNED BY public.security_clearances.id;


--
-- Name: skill_declarations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.skill_declarations (
    id integer NOT NULL,
    criteria_id integer NOT NULL,
    job_application_id integer NOT NULL,
    experience_level_id integer,
    skill_level_id integer,
    description text,
    is_active boolean NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.skill_declarations OWNER TO talentcloud;

--
-- Name: skill_declarations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.skill_declarations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skill_declarations_id_seq OWNER TO talentcloud;

--
-- Name: skill_declarations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.skill_declarations_id_seq OWNED BY public.skill_declarations.id;


--
-- Name: skill_level_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.skill_level_translations (
    id integer NOT NULL,
    skill_level_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.skill_level_translations OWNER TO talentcloud;

--
-- Name: skill_level_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.skill_level_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skill_level_translations_id_seq OWNER TO talentcloud;

--
-- Name: skill_level_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.skill_level_translations_id_seq OWNED BY public.skill_level_translations.id;


--
-- Name: skill_levels; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.skill_levels (
    id integer NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.skill_levels OWNER TO talentcloud;

--
-- Name: skill_levels_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.skill_levels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.skill_levels_id_seq OWNER TO talentcloud;

--
-- Name: skill_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.skill_levels_id_seq OWNED BY public.skill_levels.id;


--
-- Name: team_culture_translations; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.team_culture_translations (
    id integer NOT NULL,
    team_culture_id integer NOT NULL,
    locale character varying(191) NOT NULL,
    narrative_text text,
    operating_context text,
    what_we_value text,
    how_we_work text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.team_culture_translations OWNER TO talentcloud;

--
-- Name: team_culture_translations_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.team_culture_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_culture_translations_id_seq OWNER TO talentcloud;

--
-- Name: team_culture_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.team_culture_translations_id_seq OWNED BY public.team_culture_translations.id;


--
-- Name: team_cultures; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.team_cultures (
    id integer NOT NULL,
    team_size integer,
    gc_directory_url character varying(191),
    manager_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.team_cultures OWNER TO talentcloud;

--
-- Name: team_cultures_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.team_cultures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_cultures_id_seq OWNER TO talentcloud;

--
-- Name: team_cultures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.team_cultures_id_seq OWNED BY public.team_cultures.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    name character varying(191),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.user_roles OWNER TO talentcloud;

--
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.user_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_roles_id_seq OWNER TO talentcloud;

--
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(191) NOT NULL,
    name character varying(191),
    is_confirmed boolean DEFAULT false NOT NULL,
    user_role_id integer NOT NULL,
    open_id_sub character varying(191) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO talentcloud;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO talentcloud;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: work_environments; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.work_environments (
    id integer NOT NULL,
    manager_id integer NOT NULL,
    remote_allowed character varying(191),
    telework_allowed character varying(191),
    flexible_allowed character varying(191),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.work_environments OWNER TO talentcloud;

--
-- Name: work_environments_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.work_environments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.work_environments_id_seq OWNER TO talentcloud;

--
-- Name: work_environments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.work_environments_id_seq OWNED BY public.work_environments.id;


--
-- Name: work_samples; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.work_samples (
    id integer NOT NULL,
    name text,
    date_created date,
    file_type_id integer,
    url text,
    story text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.work_samples OWNER TO talentcloud;

--
-- Name: work_samples_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.work_samples_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.work_samples_id_seq OWNER TO talentcloud;

--
-- Name: work_samples_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.work_samples_id_seq OWNED BY public.work_samples.id;


--
-- Name: workplace_photo_captions; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.workplace_photo_captions (
    id integer NOT NULL,
    work_environment_id integer NOT NULL,
    photo_name character varying(191) NOT NULL,
    workplace_photo_id integer,
    description text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.workplace_photo_captions OWNER TO talentcloud;

--
-- Name: workplace_photo_captions_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.workplace_photo_captions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workplace_photo_captions_id_seq OWNER TO talentcloud;

--
-- Name: workplace_photo_captions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.workplace_photo_captions_id_seq OWNED BY public.workplace_photo_captions.id;


--
-- Name: workplace_photos; Type: TABLE; Schema: public; Owner: talentcloud
--

CREATE TABLE public.workplace_photos (
    id integer NOT NULL,
    image bytea NOT NULL,
    mime_type character varying(191) NOT NULL,
    size integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.workplace_photos OWNER TO talentcloud;

--
-- Name: workplace_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: talentcloud
--

CREATE SEQUENCE public.workplace_photos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workplace_photos_id_seq OWNER TO talentcloud;

--
-- Name: workplace_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: talentcloud
--

ALTER SEQUENCE public.workplace_photos_id_seq OWNED BY public.workplace_photos.id;


--
-- Name: applicant_profile_answers; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.applicant_profile_answers (
    id bigint NOT NULL,
    applicant_id bigint NOT NULL,
    applicant_profile_question_id bigint NOT NULL,
    answer text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.applicant_profile_answers OWNER TO talentcloud;

--
-- Name: applicant_profile_answers_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.applicant_profile_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.applicant_profile_answers_id_seq OWNER TO talentcloud;

--
-- Name: applicant_profile_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.applicant_profile_answers_id_seq OWNED BY talentcloud.applicant_profile_answers.id;


--
-- Name: applicant_profile_question_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.applicant_profile_question_translations (
    id bigint NOT NULL,
    applicant_profile_question_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value text NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.applicant_profile_question_translations OWNER TO talentcloud;

--
-- Name: applicant_profile_question_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.applicant_profile_question_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.applicant_profile_question_translations_id_seq OWNER TO talentcloud;

--
-- Name: applicant_profile_question_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.applicant_profile_question_translations_id_seq OWNED BY talentcloud.applicant_profile_question_translations.id;


--
-- Name: applicant_profile_questions; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.applicant_profile_questions (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.applicant_profile_questions OWNER TO talentcloud;

--
-- Name: applicant_profile_questions_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.applicant_profile_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.applicant_profile_questions_id_seq OWNER TO talentcloud;

--
-- Name: applicant_profile_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.applicant_profile_questions_id_seq OWNED BY talentcloud.applicant_profile_questions.id;


--
-- Name: applicants; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.applicants (
    id bigint NOT NULL,
    personal_website character varying(191),
    tagline text,
    twitter_username character varying(191),
    linkedin_url character varying(191),
    user_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.applicants OWNER TO talentcloud;

--
-- Name: applicants_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.applicants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.applicants_id_seq OWNER TO talentcloud;

--
-- Name: applicants_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.applicants_id_seq OWNED BY talentcloud.applicants.id;


--
-- Name: application_micro_references; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.application_micro_references (
    id bigint NOT NULL,
    job_application_id bigint NOT NULL,
    criteria_id bigint NOT NULL,
    micro_reference_id bigint NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.application_micro_references OWNER TO talentcloud;

--
-- Name: application_micro_references_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.application_micro_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.application_micro_references_id_seq OWNER TO talentcloud;

--
-- Name: application_micro_references_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.application_micro_references_id_seq OWNED BY talentcloud.application_micro_references.id;


--
-- Name: application_status; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.application_status (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.application_status OWNER TO talentcloud;

--
-- Name: application_status_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.application_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.application_status_id_seq OWNER TO talentcloud;

--
-- Name: application_status_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.application_status_id_seq OWNED BY talentcloud.application_status.id;


--
-- Name: application_status_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.application_status_translations (
    id bigint NOT NULL,
    application_status_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.application_status_translations OWNER TO talentcloud;

--
-- Name: application_status_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.application_status_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.application_status_translations_id_seq OWNER TO talentcloud;

--
-- Name: application_status_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.application_status_translations_id_seq OWNED BY talentcloud.application_status_translations.id;


--
-- Name: application_work_samples; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.application_work_samples (
    id bigint NOT NULL,
    job_application_id bigint NOT NULL,
    criteria_id bigint NOT NULL,
    work_sample_id bigint NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.application_work_samples OWNER TO talentcloud;

--
-- Name: application_work_samples_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.application_work_samples_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.application_work_samples_id_seq OWNER TO talentcloud;

--
-- Name: application_work_samples_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.application_work_samples_id_seq OWNED BY talentcloud.application_work_samples.id;


--
-- Name: citizenship_declaration_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.citizenship_declaration_translations (
    id bigint NOT NULL,
    citizenship_declaration_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.citizenship_declaration_translations OWNER TO talentcloud;

--
-- Name: citizenship_declaration_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.citizenship_declaration_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.citizenship_declaration_translations_id_seq OWNER TO talentcloud;

--
-- Name: citizenship_declaration_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.citizenship_declaration_translations_id_seq OWNED BY talentcloud.citizenship_declaration_translations.id;


--
-- Name: citizenship_declarations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.citizenship_declarations (
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.citizenship_declarations OWNER TO talentcloud;

--
-- Name: citizenship_declarations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.citizenship_declarations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.citizenship_declarations_id_seq OWNER TO talentcloud;

--
-- Name: citizenship_declarations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.citizenship_declarations_id_seq OWNED BY talentcloud.citizenship_declarations.id;


--
-- Name: criteria; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.criteria (
    id bigint NOT NULL,
    criteria_type_id bigint NOT NULL,
    job_poster_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.criteria OWNER TO talentcloud;

--
-- Name: criteria_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.criteria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.criteria_id_seq OWNER TO talentcloud;

--
-- Name: criteria_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.criteria_id_seq OWNED BY talentcloud.criteria.id;


--
-- Name: criteria_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.criteria_translations (
    id bigint NOT NULL,
    criteria_id bigint NOT NULL,
    name character varying(191) NOT NULL,
    description text,
    locale character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.criteria_translations OWNER TO talentcloud;

--
-- Name: criteria_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.criteria_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.criteria_translations_id_seq OWNER TO talentcloud;

--
-- Name: criteria_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.criteria_translations_id_seq OWNED BY talentcloud.criteria_translations.id;


--
-- Name: criteria_type_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.criteria_type_translations (
    id bigint NOT NULL,
    criteria_type_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.criteria_type_translations OWNER TO talentcloud;

--
-- Name: criteria_type_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.criteria_type_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.criteria_type_translations_id_seq OWNER TO talentcloud;

--
-- Name: criteria_type_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.criteria_type_translations_id_seq OWNED BY talentcloud.criteria_type_translations.id;


--
-- Name: criteria_types; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.criteria_types (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.criteria_types OWNER TO talentcloud;

--
-- Name: criteria_types_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.criteria_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.criteria_types_id_seq OWNER TO talentcloud;

--
-- Name: criteria_types_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.criteria_types_id_seq OWNED BY talentcloud.criteria_types.id;


--
-- Name: department_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.department_translations (
    id bigint NOT NULL,
    department_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.department_translations OWNER TO talentcloud;

--
-- Name: department_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.department_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.department_translations_id_seq OWNER TO talentcloud;

--
-- Name: department_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.department_translations_id_seq OWNED BY talentcloud.department_translations.id;


--
-- Name: departments; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.departments (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.departments OWNER TO talentcloud;

--
-- Name: departments_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.departments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.departments_id_seq OWNER TO talentcloud;

--
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.departments_id_seq OWNED BY talentcloud.departments.id;


--
-- Name: experience_level_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.experience_level_translations (
    id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    experience_level_id bigint NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.experience_level_translations OWNER TO talentcloud;

--
-- Name: experience_level_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.experience_level_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.experience_level_translations_id_seq OWNER TO talentcloud;

--
-- Name: experience_level_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.experience_level_translations_id_seq OWNED BY talentcloud.experience_level_translations.id;


--
-- Name: experience_levels; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.experience_levels (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.experience_levels OWNER TO talentcloud;

--
-- Name: experience_levels_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.experience_levels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.experience_levels_id_seq OWNER TO talentcloud;

--
-- Name: experience_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.experience_levels_id_seq OWNED BY talentcloud.experience_levels.id;


--
-- Name: file_type_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.file_type_translations (
    id bigint NOT NULL,
    file_type_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.file_type_translations OWNER TO talentcloud;

--
-- Name: file_type_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.file_type_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.file_type_translations_id_seq OWNER TO talentcloud;

--
-- Name: file_type_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.file_type_translations_id_seq OWNED BY talentcloud.file_type_translations.id;


--
-- Name: file_types; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.file_types (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.file_types OWNER TO talentcloud;

--
-- Name: file_types_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.file_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.file_types_id_seq OWNER TO talentcloud;

--
-- Name: file_types_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.file_types_id_seq OWNED BY talentcloud.file_types.id;


--
-- Name: frequencies; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.frequencies (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.frequencies OWNER TO talentcloud;

--
-- Name: frequencies_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.frequencies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.frequencies_id_seq OWNER TO talentcloud;

--
-- Name: frequencies_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.frequencies_id_seq OWNED BY talentcloud.frequencies.id;


--
-- Name: frequncy; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.frequncy (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.frequncy OWNER TO talentcloud;

--
-- Name: frequncy_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.frequncy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.frequncy_id_seq OWNER TO talentcloud;

--
-- Name: frequncy_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.frequncy_id_seq OWNED BY talentcloud.frequncy.id;


--
-- Name: job_application_answers; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_application_answers (
    id bigint NOT NULL,
    job_poster_questions_id bigint NOT NULL,
    job_application_id bigint NOT NULL,
    answer text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_application_answers OWNER TO talentcloud;

--
-- Name: job_application_answers_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_application_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_application_answers_id_seq OWNER TO talentcloud;

--
-- Name: job_application_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_application_answers_id_seq OWNED BY talentcloud.job_application_answers.id;


--
-- Name: job_applications; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_applications (
    id bigint NOT NULL,
    job_poster_id bigint NOT NULL,
    application_status_id bigint NOT NULL,
    applicant_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_applications OWNER TO talentcloud;

--
-- Name: job_applications_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_applications_id_seq OWNER TO talentcloud;

--
-- Name: job_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_applications_id_seq OWNED BY talentcloud.job_applications.id;


--
-- Name: job_poster_key_task_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_poster_key_task_translations (
    id bigint NOT NULL,
    job_poster_key_task_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_poster_key_task_translations OWNER TO talentcloud;

--
-- Name: job_poster_key_task_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_poster_key_task_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_poster_key_task_translations_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_key_task_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_poster_key_task_translations_id_seq OWNED BY talentcloud.job_poster_key_task_translations.id;


--
-- Name: job_poster_key_tasks; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_poster_key_tasks (
    id bigint NOT NULL,
    job_poster_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_poster_key_tasks OWNER TO talentcloud;

--
-- Name: job_poster_key_tasks_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_poster_key_tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_poster_key_tasks_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_key_tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_poster_key_tasks_id_seq OWNED BY talentcloud.job_poster_key_tasks.id;


--
-- Name: job_poster_question_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_poster_question_translations (
    id bigint NOT NULL,
    job_poster_question_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    question text NOT NULL,
    description text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_poster_question_translations OWNER TO talentcloud;

--
-- Name: job_poster_question_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_poster_question_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_poster_question_translations_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_question_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_poster_question_translations_id_seq OWNED BY talentcloud.job_poster_question_translations.id;


--
-- Name: job_poster_questions; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_poster_questions (
    id bigint NOT NULL,
    job_poster_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_poster_questions OWNER TO talentcloud;

--
-- Name: job_poster_questions_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_poster_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_poster_questions_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_poster_questions_id_seq OWNED BY talentcloud.job_poster_questions.id;


--
-- Name: job_poster_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_poster_translations (
    id bigint NOT NULL,
    job_poster_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    city text,
    title text NOT NULL,
    impact text,
    branch text,
    division text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_poster_translations OWNER TO talentcloud;

--
-- Name: job_poster_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_poster_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_poster_translations_id_seq OWNER TO talentcloud;

--
-- Name: job_poster_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_poster_translations_id_seq OWNED BY talentcloud.job_poster_translations.id;


--
-- Name: job_posters; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_posters (
    id bigint NOT NULL,
    job_term_id bigint NOT NULL,
    term_qty character varying(191) NOT NULL,
    open_date_time timestamp with time zone NOT NULL,
    close_date_time timestamp with time zone NOT NULL,
    start_date_time timestamp with time zone NOT NULL,
    department_id bigint NOT NULL,
    province_id bigint NOT NULL,
    salary_min bigint,
    salary_max bigint,
    noc bigint NOT NULL,
    classification character varying(191) NOT NULL,
    security_clearance_id bigint NOT NULL,
    language_requirement_id bigint NOT NULL,
    manager_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_posters OWNER TO talentcloud;

--
-- Name: job_posters_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_posters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_posters_id_seq OWNER TO talentcloud;

--
-- Name: job_posters_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_posters_id_seq OWNED BY talentcloud.job_posters.id;


--
-- Name: job_term_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_term_translations (
    id bigint NOT NULL,
    job_term_id bigint NOT NULL,
    value character varying(191),
    locale character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_term_translations OWNER TO talentcloud;

--
-- Name: job_term_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_term_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_term_translations_id_seq OWNER TO talentcloud;

--
-- Name: job_term_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_term_translations_id_seq OWNED BY talentcloud.job_term_translations.id;


--
-- Name: job_terms; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.job_terms (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.job_terms OWNER TO talentcloud;

--
-- Name: job_terms_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.job_terms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.job_terms_id_seq OWNER TO talentcloud;

--
-- Name: job_terms_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.job_terms_id_seq OWNED BY talentcloud.job_terms.id;


--
-- Name: language_requirement_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.language_requirement_translations (
    id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    language_requirement_id bigint NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.language_requirement_translations OWNER TO talentcloud;

--
-- Name: language_requirement_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.language_requirement_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.language_requirement_translations_id_seq OWNER TO talentcloud;

--
-- Name: language_requirement_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.language_requirement_translations_id_seq OWNED BY talentcloud.language_requirement_translations.id;


--
-- Name: language_requirements; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.language_requirements (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.language_requirements OWNER TO talentcloud;

--
-- Name: language_requirements_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.language_requirements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.language_requirements_id_seq OWNER TO talentcloud;

--
-- Name: language_requirements_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.language_requirements_id_seq OWNED BY talentcloud.language_requirements.id;


--
-- Name: manager_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.manager_translations (
    id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    about_me text,
    greatest_accomplishment text,
    branch text,
    division text,
    "position" text,
    leadership_style text,
    employee_learning text,
    expectations text,
    manager_id bigint NOT NULL,
    work_experience text,
    education text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.manager_translations OWNER TO talentcloud;

--
-- Name: manager_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.manager_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.manager_translations_id_seq OWNER TO talentcloud;

--
-- Name: manager_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.manager_translations_id_seq OWNED BY talentcloud.manager_translations.id;


--
-- Name: managers; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.managers (
    id bigint NOT NULL,
    department_id bigint,
    twitter_username character varying(191),
    linkedin_username character varying(191),
    user_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    work_review_frequency_id bigint NOT NULL,
    stay_late_frequency_id bigint NOT NULL,
    engage_team_frequency_id bigint NOT NULL,
    development_opportunity_frequency_id bigint NOT NULL,
    refuse_low_value_work_frequency_id bigint NOT NULL
);


ALTER TABLE talentcloud.managers OWNER TO talentcloud;

--
-- Name: managers_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.managers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.managers_id_seq OWNER TO talentcloud;

--
-- Name: managers_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.managers_id_seq OWNED BY talentcloud.managers.id;


--
-- Name: micro_references; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.micro_references (
    id bigint NOT NULL,
    name character varying(191),
    email character varying(191),
    relationship_id bigint,
    observed_from_date date,
    observed_until_date date,
    experience_level_id bigint,
    story text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.micro_references OWNER TO talentcloud;

--
-- Name: micro_references_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.micro_references_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.micro_references_id_seq OWNER TO talentcloud;

--
-- Name: micro_references_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.micro_references_id_seq OWNED BY talentcloud.micro_references.id;


--
-- Name: migrations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.migrations (
    id bigint NOT NULL,
    migration character varying(191) NOT NULL,
    batch bigint NOT NULL
);


ALTER TABLE talentcloud.migrations OWNER TO talentcloud;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.migrations_id_seq OWNER TO talentcloud;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.migrations_id_seq OWNED BY talentcloud.migrations.id;


--
-- Name: profile_pics; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.profile_pics (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    image bytea NOT NULL,
    type character varying(191) NOT NULL,
    size bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.profile_pics OWNER TO talentcloud;

--
-- Name: profile_pics_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.profile_pics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.profile_pics_id_seq OWNER TO talentcloud;

--
-- Name: profile_pics_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.profile_pics_id_seq OWNED BY talentcloud.profile_pics.id;


--
-- Name: province_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.province_translations (
    id bigint NOT NULL,
    province_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.province_translations OWNER TO talentcloud;

--
-- Name: province_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.province_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.province_translations_id_seq OWNER TO talentcloud;

--
-- Name: province_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.province_translations_id_seq OWNED BY talentcloud.province_translations.id;


--
-- Name: provinces; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.provinces (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.provinces OWNER TO talentcloud;

--
-- Name: provinces_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.provinces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.provinces_id_seq OWNER TO talentcloud;

--
-- Name: provinces_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.provinces_id_seq OWNED BY talentcloud.provinces.id;


--
-- Name: relationship_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.relationship_translations (
    id bigint NOT NULL,
    relationship_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.relationship_translations OWNER TO talentcloud;

--
-- Name: relationship_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.relationship_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.relationship_translations_id_seq OWNER TO talentcloud;

--
-- Name: relationship_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.relationship_translations_id_seq OWNED BY talentcloud.relationship_translations.id;


--
-- Name: relationships; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.relationships (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.relationships OWNER TO talentcloud;

--
-- Name: relationships_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.relationships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.relationships_id_seq OWNER TO talentcloud;

--
-- Name: relationships_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.relationships_id_seq OWNED BY talentcloud.relationships.id;


--
-- Name: security_clearance_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.security_clearance_translations (
    id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    security_clearance_id bigint NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.security_clearance_translations OWNER TO talentcloud;

--
-- Name: security_clearance_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.security_clearance_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.security_clearance_translations_id_seq OWNER TO talentcloud;

--
-- Name: security_clearance_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.security_clearance_translations_id_seq OWNED BY talentcloud.security_clearance_translations.id;


--
-- Name: security_clearances; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.security_clearances (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.security_clearances OWNER TO talentcloud;

--
-- Name: security_clearances_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.security_clearances_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.security_clearances_id_seq OWNER TO talentcloud;

--
-- Name: security_clearances_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.security_clearances_id_seq OWNED BY talentcloud.security_clearances.id;


--
-- Name: skill_declarations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.skill_declarations (
    id bigint NOT NULL,
    criteria_id bigint NOT NULL,
    job_application_id bigint NOT NULL,
    experience_level_id bigint,
    skill_level_id bigint,
    description text,
    is_active boolean NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.skill_declarations OWNER TO talentcloud;

--
-- Name: skill_declarations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.skill_declarations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.skill_declarations_id_seq OWNER TO talentcloud;

--
-- Name: skill_declarations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.skill_declarations_id_seq OWNED BY talentcloud.skill_declarations.id;


--
-- Name: skill_level_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.skill_level_translations (
    id bigint NOT NULL,
    skill_level_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    value character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.skill_level_translations OWNER TO talentcloud;

--
-- Name: skill_level_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.skill_level_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.skill_level_translations_id_seq OWNER TO talentcloud;

--
-- Name: skill_level_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.skill_level_translations_id_seq OWNED BY talentcloud.skill_level_translations.id;


--
-- Name: skill_levels; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.skill_levels (
    id bigint NOT NULL,
    name character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.skill_levels OWNER TO talentcloud;

--
-- Name: skill_levels_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.skill_levels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.skill_levels_id_seq OWNER TO talentcloud;

--
-- Name: skill_levels_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.skill_levels_id_seq OWNED BY talentcloud.skill_levels.id;


--
-- Name: team_culture_translations; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.team_culture_translations (
    id bigint NOT NULL,
    team_culture_id bigint NOT NULL,
    locale character varying(191) NOT NULL,
    narrative_text text,
    operating_context text,
    what_we_value text,
    how_we_work text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.team_culture_translations OWNER TO talentcloud;

--
-- Name: team_culture_translations_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.team_culture_translations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.team_culture_translations_id_seq OWNER TO talentcloud;

--
-- Name: team_culture_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.team_culture_translations_id_seq OWNED BY talentcloud.team_culture_translations.id;


--
-- Name: team_cultures; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.team_cultures (
    id bigint NOT NULL,
    team_size bigint,
    gc_directory_url character varying(191),
    manager_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.team_cultures OWNER TO talentcloud;

--
-- Name: team_cultures_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.team_cultures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.team_cultures_id_seq OWNER TO talentcloud;

--
-- Name: team_cultures_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.team_cultures_id_seq OWNED BY talentcloud.team_cultures.id;


--
-- Name: user_roles; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.user_roles (
    id bigint NOT NULL,
    name character varying(191),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.user_roles OWNER TO talentcloud;

--
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.user_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.user_roles_id_seq OWNER TO talentcloud;

--
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.user_roles_id_seq OWNED BY talentcloud.user_roles.id;


--
-- Name: users; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.users (
    id bigint NOT NULL,
    email character varying(191) NOT NULL,
    name character varying(191),
    is_confirmed boolean DEFAULT false NOT NULL,
    user_role_id bigint NOT NULL,
    open_id_sub character varying(191) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.users OWNER TO talentcloud;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.users_id_seq OWNER TO talentcloud;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.users_id_seq OWNED BY talentcloud.users.id;


--
-- Name: work_environments; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.work_environments (
    id bigint NOT NULL,
    manager_id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    remote_work_allowed boolean,
    telework_allowed_frequency_id bigint NOT NULL,
    flexible_hours_frequency_id bigint NOT NULL
);


ALTER TABLE talentcloud.work_environments OWNER TO talentcloud;

--
-- Name: work_environments_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.work_environments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.work_environments_id_seq OWNER TO talentcloud;

--
-- Name: work_environments_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.work_environments_id_seq OWNED BY talentcloud.work_environments.id;


--
-- Name: work_samples; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.work_samples (
    id bigint NOT NULL,
    name text,
    date_created date,
    file_type_id bigint,
    url text,
    story text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.work_samples OWNER TO talentcloud;

--
-- Name: work_samples_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.work_samples_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.work_samples_id_seq OWNER TO talentcloud;

--
-- Name: work_samples_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.work_samples_id_seq OWNED BY talentcloud.work_samples.id;


--
-- Name: workplace_photo_captions; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.workplace_photo_captions (
    id bigint NOT NULL,
    work_environment_id bigint NOT NULL,
    photo_name character varying(191) NOT NULL,
    workplace_photo_id bigint,
    description text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.workplace_photo_captions OWNER TO talentcloud;

--
-- Name: workplace_photo_captions_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.workplace_photo_captions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.workplace_photo_captions_id_seq OWNER TO talentcloud;

--
-- Name: workplace_photo_captions_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.workplace_photo_captions_id_seq OWNED BY talentcloud.workplace_photo_captions.id;


--
-- Name: workplace_photos; Type: TABLE; Schema: talentcloud; Owner: talentcloud
--

CREATE TABLE talentcloud.workplace_photos (
    id bigint NOT NULL,
    image bytea NOT NULL,
    mime_type character varying(191) NOT NULL,
    size bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE talentcloud.workplace_photos OWNER TO talentcloud;

--
-- Name: workplace_photos_id_seq; Type: SEQUENCE; Schema: talentcloud; Owner: talentcloud
--

CREATE SEQUENCE talentcloud.workplace_photos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE talentcloud.workplace_photos_id_seq OWNER TO talentcloud;

--
-- Name: workplace_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: talentcloud; Owner: talentcloud
--

ALTER SEQUENCE talentcloud.workplace_photos_id_seq OWNED BY talentcloud.workplace_photos.id;


--
-- Name: applicant_profile_answers id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_answers ALTER COLUMN id SET DEFAULT nextval('public.applicant_profile_answers_id_seq'::regclass);


--
-- Name: applicant_profile_question_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_question_translations ALTER COLUMN id SET DEFAULT nextval('public.applicant_profile_question_translations_id_seq'::regclass);


--
-- Name: applicant_profile_questions id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_questions ALTER COLUMN id SET DEFAULT nextval('public.applicant_profile_questions_id_seq'::regclass);


--
-- Name: applicants id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicants ALTER COLUMN id SET DEFAULT nextval('public.applicants_id_seq'::regclass);


--
-- Name: application_micro_references id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_micro_references ALTER COLUMN id SET DEFAULT nextval('public.application_micro_references_id_seq'::regclass);


--
-- Name: application_status id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_status ALTER COLUMN id SET DEFAULT nextval('public.application_status_id_seq'::regclass);


--
-- Name: application_status_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_status_translations ALTER COLUMN id SET DEFAULT nextval('public.application_status_translations_id_seq'::regclass);


--
-- Name: application_work_samples id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_work_samples ALTER COLUMN id SET DEFAULT nextval('public.application_work_samples_id_seq'::regclass);


--
-- Name: citizenship_declaration_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.citizenship_declaration_translations ALTER COLUMN id SET DEFAULT nextval('public.citizenship_declaration_translations_id_seq'::regclass);


--
-- Name: citizenship_declarations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.citizenship_declarations ALTER COLUMN id SET DEFAULT nextval('public.citizenship_declarations_id_seq'::regclass);


--
-- Name: criteria id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria ALTER COLUMN id SET DEFAULT nextval('public.criteria_id_seq'::regclass);


--
-- Name: criteria_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_translations ALTER COLUMN id SET DEFAULT nextval('public.criteria_translations_id_seq'::regclass);


--
-- Name: criteria_type_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_type_translations ALTER COLUMN id SET DEFAULT nextval('public.criteria_type_translations_id_seq'::regclass);


--
-- Name: criteria_types id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_types ALTER COLUMN id SET DEFAULT nextval('public.criteria_types_id_seq'::regclass);


--
-- Name: department_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.department_translations ALTER COLUMN id SET DEFAULT nextval('public.department_translations_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- Name: experience_level_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.experience_level_translations ALTER COLUMN id SET DEFAULT nextval('public.experience_level_translations_id_seq'::regclass);


--
-- Name: experience_levels id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.experience_levels ALTER COLUMN id SET DEFAULT nextval('public.experience_levels_id_seq'::regclass);


--
-- Name: file_type_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.file_type_translations ALTER COLUMN id SET DEFAULT nextval('public.file_type_translations_id_seq'::regclass);


--
-- Name: file_types id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.file_types ALTER COLUMN id SET DEFAULT nextval('public.file_types_id_seq'::regclass);


--
-- Name: job_application_answers id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_application_answers ALTER COLUMN id SET DEFAULT nextval('public.job_application_answers_id_seq'::regclass);


--
-- Name: job_applications id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_applications ALTER COLUMN id SET DEFAULT nextval('public.job_applications_id_seq'::regclass);


--
-- Name: job_poster_key_task_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_key_task_translations ALTER COLUMN id SET DEFAULT nextval('public.job_poster_key_task_translations_id_seq'::regclass);


--
-- Name: job_poster_key_tasks id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_key_tasks ALTER COLUMN id SET DEFAULT nextval('public.job_poster_key_tasks_id_seq'::regclass);


--
-- Name: job_poster_question_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_question_translations ALTER COLUMN id SET DEFAULT nextval('public.job_poster_question_translations_id_seq'::regclass);


--
-- Name: job_poster_questions id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_questions ALTER COLUMN id SET DEFAULT nextval('public.job_poster_questions_id_seq'::regclass);


--
-- Name: job_poster_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_translations ALTER COLUMN id SET DEFAULT nextval('public.job_poster_translations_id_seq'::regclass);


--
-- Name: job_posters id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_posters ALTER COLUMN id SET DEFAULT nextval('public.job_posters_id_seq'::regclass);


--
-- Name: job_term_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_term_translations ALTER COLUMN id SET DEFAULT nextval('public.job_term_translations_id_seq'::regclass);


--
-- Name: job_terms id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_terms ALTER COLUMN id SET DEFAULT nextval('public.job_terms_id_seq'::regclass);


--
-- Name: language_requirement_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.language_requirement_translations ALTER COLUMN id SET DEFAULT nextval('public.language_requirement_translations_id_seq'::regclass);


--
-- Name: language_requirements id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.language_requirements ALTER COLUMN id SET DEFAULT nextval('public.language_requirements_id_seq'::regclass);


--
-- Name: manager_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.manager_translations ALTER COLUMN id SET DEFAULT nextval('public.manager_translations_id_seq'::regclass);


--
-- Name: managers id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.managers ALTER COLUMN id SET DEFAULT nextval('public.managers_id_seq'::regclass);


--
-- Name: micro_references id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.micro_references ALTER COLUMN id SET DEFAULT nextval('public.micro_references_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: profile_pics id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.profile_pics ALTER COLUMN id SET DEFAULT nextval('public.profile_pics_id_seq'::regclass);


--
-- Name: province_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.province_translations ALTER COLUMN id SET DEFAULT nextval('public.province_translations_id_seq'::regclass);


--
-- Name: provinces id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.provinces ALTER COLUMN id SET DEFAULT nextval('public.provinces_id_seq'::regclass);


--
-- Name: relationship_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.relationship_translations ALTER COLUMN id SET DEFAULT nextval('public.relationship_translations_id_seq'::regclass);


--
-- Name: relationships id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.relationships ALTER COLUMN id SET DEFAULT nextval('public.relationships_id_seq'::regclass);


--
-- Name: security_clearance_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.security_clearance_translations ALTER COLUMN id SET DEFAULT nextval('public.security_clearance_translations_id_seq'::regclass);


--
-- Name: security_clearances id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.security_clearances ALTER COLUMN id SET DEFAULT nextval('public.security_clearances_id_seq'::regclass);


--
-- Name: skill_declarations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_declarations ALTER COLUMN id SET DEFAULT nextval('public.skill_declarations_id_seq'::regclass);


--
-- Name: skill_level_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_level_translations ALTER COLUMN id SET DEFAULT nextval('public.skill_level_translations_id_seq'::regclass);


--
-- Name: skill_levels id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_levels ALTER COLUMN id SET DEFAULT nextval('public.skill_levels_id_seq'::regclass);


--
-- Name: team_culture_translations id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.team_culture_translations ALTER COLUMN id SET DEFAULT nextval('public.team_culture_translations_id_seq'::regclass);


--
-- Name: team_cultures id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.team_cultures ALTER COLUMN id SET DEFAULT nextval('public.team_cultures_id_seq'::regclass);


--
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('public.user_roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: work_environments id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.work_environments ALTER COLUMN id SET DEFAULT nextval('public.work_environments_id_seq'::regclass);


--
-- Name: work_samples id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.work_samples ALTER COLUMN id SET DEFAULT nextval('public.work_samples_id_seq'::regclass);


--
-- Name: workplace_photo_captions id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.workplace_photo_captions ALTER COLUMN id SET DEFAULT nextval('public.workplace_photo_captions_id_seq'::regclass);


--
-- Name: workplace_photos id; Type: DEFAULT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.workplace_photos ALTER COLUMN id SET DEFAULT nextval('public.workplace_photos_id_seq'::regclass);


--
-- Name: applicant_profile_answers id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_answers ALTER COLUMN id SET DEFAULT nextval('talentcloud.applicant_profile_answers_id_seq'::regclass);


--
-- Name: applicant_profile_question_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_question_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.applicant_profile_question_translations_id_seq'::regclass);


--
-- Name: applicant_profile_questions id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_questions ALTER COLUMN id SET DEFAULT nextval('talentcloud.applicant_profile_questions_id_seq'::regclass);


--
-- Name: applicants id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicants ALTER COLUMN id SET DEFAULT nextval('talentcloud.applicants_id_seq'::regclass);


--
-- Name: application_micro_references id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_micro_references ALTER COLUMN id SET DEFAULT nextval('talentcloud.application_micro_references_id_seq'::regclass);


--
-- Name: application_status id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_status ALTER COLUMN id SET DEFAULT nextval('talentcloud.application_status_id_seq'::regclass);


--
-- Name: application_status_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_status_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.application_status_translations_id_seq'::regclass);


--
-- Name: application_work_samples id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_work_samples ALTER COLUMN id SET DEFAULT nextval('talentcloud.application_work_samples_id_seq'::regclass);


--
-- Name: citizenship_declaration_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.citizenship_declaration_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.citizenship_declaration_translations_id_seq'::regclass);


--
-- Name: citizenship_declarations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.citizenship_declarations ALTER COLUMN id SET DEFAULT nextval('talentcloud.citizenship_declarations_id_seq'::regclass);


--
-- Name: criteria id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria ALTER COLUMN id SET DEFAULT nextval('talentcloud.criteria_id_seq'::regclass);


--
-- Name: criteria_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.criteria_translations_id_seq'::regclass);


--
-- Name: criteria_type_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria_type_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.criteria_type_translations_id_seq'::regclass);


--
-- Name: criteria_types id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria_types ALTER COLUMN id SET DEFAULT nextval('talentcloud.criteria_types_id_seq'::regclass);


--
-- Name: department_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.department_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.department_translations_id_seq'::regclass);


--
-- Name: departments id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.departments ALTER COLUMN id SET DEFAULT nextval('talentcloud.departments_id_seq'::regclass);


--
-- Name: experience_level_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.experience_level_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.experience_level_translations_id_seq'::regclass);


--
-- Name: experience_levels id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.experience_levels ALTER COLUMN id SET DEFAULT nextval('talentcloud.experience_levels_id_seq'::regclass);


--
-- Name: file_type_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.file_type_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.file_type_translations_id_seq'::regclass);


--
-- Name: file_types id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.file_types ALTER COLUMN id SET DEFAULT nextval('talentcloud.file_types_id_seq'::regclass);


--
-- Name: frequencies id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.frequencies ALTER COLUMN id SET DEFAULT nextval('talentcloud.frequencies_id_seq'::regclass);


--
-- Name: frequncy id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.frequncy ALTER COLUMN id SET DEFAULT nextval('talentcloud.frequncy_id_seq'::regclass);


--
-- Name: job_application_answers id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_application_answers ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_application_answers_id_seq'::regclass);


--
-- Name: job_applications id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_applications ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_applications_id_seq'::regclass);


--
-- Name: job_poster_key_task_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_key_task_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_poster_key_task_translations_id_seq'::regclass);


--
-- Name: job_poster_key_tasks id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_key_tasks ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_poster_key_tasks_id_seq'::regclass);


--
-- Name: job_poster_question_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_question_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_poster_question_translations_id_seq'::regclass);


--
-- Name: job_poster_questions id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_questions ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_poster_questions_id_seq'::regclass);


--
-- Name: job_poster_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_poster_translations_id_seq'::regclass);


--
-- Name: job_posters id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_posters ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_posters_id_seq'::regclass);


--
-- Name: job_term_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_term_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_term_translations_id_seq'::regclass);


--
-- Name: job_terms id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_terms ALTER COLUMN id SET DEFAULT nextval('talentcloud.job_terms_id_seq'::regclass);


--
-- Name: language_requirement_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.language_requirement_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.language_requirement_translations_id_seq'::regclass);


--
-- Name: language_requirements id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.language_requirements ALTER COLUMN id SET DEFAULT nextval('talentcloud.language_requirements_id_seq'::regclass);


--
-- Name: manager_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.manager_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.manager_translations_id_seq'::regclass);


--
-- Name: managers id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers ALTER COLUMN id SET DEFAULT nextval('talentcloud.managers_id_seq'::regclass);


--
-- Name: micro_references id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.micro_references ALTER COLUMN id SET DEFAULT nextval('talentcloud.micro_references_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.migrations ALTER COLUMN id SET DEFAULT nextval('talentcloud.migrations_id_seq'::regclass);


--
-- Name: profile_pics id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.profile_pics ALTER COLUMN id SET DEFAULT nextval('talentcloud.profile_pics_id_seq'::regclass);


--
-- Name: province_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.province_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.province_translations_id_seq'::regclass);


--
-- Name: provinces id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.provinces ALTER COLUMN id SET DEFAULT nextval('talentcloud.provinces_id_seq'::regclass);


--
-- Name: relationship_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.relationship_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.relationship_translations_id_seq'::regclass);


--
-- Name: relationships id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.relationships ALTER COLUMN id SET DEFAULT nextval('talentcloud.relationships_id_seq'::regclass);


--
-- Name: security_clearance_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.security_clearance_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.security_clearance_translations_id_seq'::regclass);


--
-- Name: security_clearances id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.security_clearances ALTER COLUMN id SET DEFAULT nextval('talentcloud.security_clearances_id_seq'::regclass);


--
-- Name: skill_declarations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_declarations ALTER COLUMN id SET DEFAULT nextval('talentcloud.skill_declarations_id_seq'::regclass);


--
-- Name: skill_level_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_level_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.skill_level_translations_id_seq'::regclass);


--
-- Name: skill_levels id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_levels ALTER COLUMN id SET DEFAULT nextval('talentcloud.skill_levels_id_seq'::regclass);


--
-- Name: team_culture_translations id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.team_culture_translations ALTER COLUMN id SET DEFAULT nextval('talentcloud.team_culture_translations_id_seq'::regclass);


--
-- Name: team_cultures id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.team_cultures ALTER COLUMN id SET DEFAULT nextval('talentcloud.team_cultures_id_seq'::regclass);


--
-- Name: user_roles id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.user_roles ALTER COLUMN id SET DEFAULT nextval('talentcloud.user_roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.users ALTER COLUMN id SET DEFAULT nextval('talentcloud.users_id_seq'::regclass);


--
-- Name: work_environments id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.work_environments ALTER COLUMN id SET DEFAULT nextval('talentcloud.work_environments_id_seq'::regclass);


--
-- Name: work_samples id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.work_samples ALTER COLUMN id SET DEFAULT nextval('talentcloud.work_samples_id_seq'::regclass);


--
-- Name: workplace_photo_captions id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.workplace_photo_captions ALTER COLUMN id SET DEFAULT nextval('talentcloud.workplace_photo_captions_id_seq'::regclass);


--
-- Name: workplace_photos id; Type: DEFAULT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.workplace_photos ALTER COLUMN id SET DEFAULT nextval('talentcloud.workplace_photos_id_seq'::regclass);


--
-- Data for Name: applicant_profile_answers; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.applicant_profile_answers (id, applicant_id, applicant_profile_question_id, answer, created_at, updated_at) FROM stdin;
\.


--
-- Name: applicant_profile_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.applicant_profile_answers_id_seq', 1, false);


--
-- Data for Name: applicant_profile_question_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.applicant_profile_question_translations (id, applicant_profile_question_id, locale, value, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: applicant_profile_question_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.applicant_profile_question_translations_id_seq', 1, false);


--
-- Data for Name: applicant_profile_questions; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.applicant_profile_questions (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: applicant_profile_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.applicant_profile_questions_id_seq', 1, false);


--
-- Data for Name: applicants; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.applicants (id, personal_website, tagline, twitter_username, linkedin_url, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: applicants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.applicants_id_seq', 1, false);


--
-- Data for Name: application_micro_references; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.application_micro_references (id, job_application_id, criteria_id, micro_reference_id, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Name: application_micro_references_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.application_micro_references_id_seq', 1, false);


--
-- Data for Name: application_status; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.application_status (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: application_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.application_status_id_seq', 1, false);


--
-- Data for Name: application_status_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.application_status_translations (id, application_status_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: application_status_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.application_status_translations_id_seq', 1, false);


--
-- Data for Name: application_work_samples; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.application_work_samples (id, job_application_id, criteria_id, work_sample_id, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Name: application_work_samples_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.application_work_samples_id_seq', 1, false);


--
-- Data for Name: citizenship_declaration_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.citizenship_declaration_translations (id, citizenship_declaration_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: citizenship_declaration_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.citizenship_declaration_translations_id_seq', 1, false);


--
-- Data for Name: citizenship_declarations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.citizenship_declarations (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: citizenship_declarations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.citizenship_declarations_id_seq', 1, false);


--
-- Data for Name: criteria; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.criteria (id, criteria_type_id, job_poster_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: criteria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.criteria_id_seq', 1, false);


--
-- Data for Name: criteria_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.criteria_translations (id, criteria_id, name, description, locale, created_at, updated_at) FROM stdin;
\.


--
-- Name: criteria_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.criteria_translations_id_seq', 1, false);


--
-- Data for Name: criteria_type_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.criteria_type_translations (id, criteria_type_id, locale, value, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: criteria_type_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.criteria_type_translations_id_seq', 1, false);


--
-- Data for Name: criteria_types; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.criteria_types (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: criteria_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.criteria_types_id_seq', 1, false);


--
-- Data for Name: department_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.department_translations (id, department_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: department_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.department_translations_id_seq', 1, false);


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.departments (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.departments_id_seq', 1, false);


--
-- Data for Name: experience_level_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.experience_level_translations (id, locale, experience_level_id, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: experience_level_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.experience_level_translations_id_seq', 1, false);


--
-- Data for Name: experience_levels; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.experience_levels (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: experience_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.experience_levels_id_seq', 1, false);


--
-- Data for Name: file_type_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.file_type_translations (id, file_type_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: file_type_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.file_type_translations_id_seq', 1, false);


--
-- Data for Name: file_types; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.file_types (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: file_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.file_types_id_seq', 1, false);


--
-- Data for Name: job_application_answers; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_application_answers (id, job_poster_questions_id, job_application_id, answer, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_application_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_application_answers_id_seq', 1, false);


--
-- Data for Name: job_applications; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_applications (id, job_poster_id, application_status_id, applicant_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_applications_id_seq', 1, false);


--
-- Data for Name: job_poster_key_task_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_poster_key_task_translations (id, job_poster_key_task_id, locale, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_key_task_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_poster_key_task_translations_id_seq', 1, false);


--
-- Data for Name: job_poster_key_tasks; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_poster_key_tasks (id, job_poster_id) FROM stdin;
\.


--
-- Name: job_poster_key_tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_poster_key_tasks_id_seq', 1, false);


--
-- Data for Name: job_poster_question_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_poster_question_translations (id, job_poster_question_id, locale, question, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_question_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_poster_question_translations_id_seq', 1, false);


--
-- Data for Name: job_poster_questions; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_poster_questions (id, job_poster_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_poster_questions_id_seq', 1, false);


--
-- Data for Name: job_poster_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_poster_translations (id, job_poster_id, locale, city, title, impact, branch, division, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_poster_translations_id_seq', 1, false);


--
-- Data for Name: job_posters; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_posters (id, job_term_id, term_qty, open_date_time, close_date_time, start_date_time, department_id, province_id, salary_min, salary_max, noc, classification, security_clearance_id, language_requirement_id, manager_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_posters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_posters_id_seq', 1, false);


--
-- Data for Name: job_term_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_term_translations (id, job_term_id, value, locale, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_term_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_term_translations_id_seq', 1, false);


--
-- Data for Name: job_terms; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.job_terms (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_terms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.job_terms_id_seq', 1, false);


--
-- Data for Name: language_requirement_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.language_requirement_translations (id, locale, language_requirement_id, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: language_requirement_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.language_requirement_translations_id_seq', 1, false);


--
-- Data for Name: language_requirements; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.language_requirements (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: language_requirements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.language_requirements_id_seq', 1, false);


--
-- Data for Name: manager_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.manager_translations (id, locale, aboutme, greatest_accomplishment, branch, division, "position", leadership_style, employee_learning, expectations, manager_id, review_options, staylate, engage, opportunities, low_value_work_requests, work_experience, education, created_at, updated_at) FROM stdin;
\.


--
-- Name: manager_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.manager_translations_id_seq', 1, false);


--
-- Data for Name: managers; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.managers (id, department_id, twitter_username, linkedin_username, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: managers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.managers_id_seq', 1, false);


--
-- Data for Name: micro_references; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.micro_references (id, name, email, relationship_id, observed_from_date, observed_until_date, experience_level_id, story, created_at, updated_at) FROM stdin;
\.


--
-- Name: micro_references_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.micro_references_id_seq', 1, false);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	2018_07_12_145513_create_applicant_profile_answers_table	1
2	2018_07_12_145513_create_applicant_profile_question_translations_table	1
3	2018_07_12_145513_create_applicant_profile_questions_table	1
4	2018_07_12_145513_create_applicants_table	1
5	2018_07_12_145513_create_application_micro_references_table	1
6	2018_07_12_145513_create_application_status_table	1
7	2018_07_12_145513_create_application_status_translations_table	1
8	2018_07_12_145513_create_application_work_samples_table	1
9	2018_07_12_145513_create_citizenship_declaration_translations_table	1
10	2018_07_12_145513_create_citizenship_declarations_table	1
11	2018_07_12_145513_create_criteria_table	1
12	2018_07_12_145513_create_criteria_translations_table	1
13	2018_07_12_145513_create_criteria_type_translations_table	1
14	2018_07_12_145513_create_criteria_types_table	1
15	2018_07_12_145513_create_department_translations_table	1
16	2018_07_12_145513_create_departments_table	1
17	2018_07_12_145513_create_experience_level_translations_table	1
18	2018_07_12_145513_create_experience_levels_table	1
19	2018_07_12_145513_create_file_type_translations_table	1
20	2018_07_12_145513_create_file_types_table	1
21	2018_07_12_145513_create_job_application_answers_table	1
22	2018_07_12_145513_create_job_applications_table	1
23	2018_07_12_145513_create_job_poster_key_task_translations_table	1
24	2018_07_12_145513_create_job_poster_key_tasks_table	1
25	2018_07_12_145513_create_job_poster_question_translations_table	1
26	2018_07_12_145513_create_job_poster_questions_table	1
27	2018_07_12_145513_create_job_poster_translations_table	1
28	2018_07_12_145513_create_job_posters_table	1
29	2018_07_12_145513_create_job_term_translations_table	1
30	2018_07_12_145513_create_job_terms_table	1
31	2018_07_12_145513_create_language_requirement_translations_table	1
32	2018_07_12_145513_create_language_requirements_table	1
33	2018_07_12_145513_create_manager_translations_table	1
34	2018_07_12_145513_create_managers_table	1
35	2018_07_12_145513_create_micro_references_table	1
36	2018_07_12_145513_create_profile_pics_table	1
37	2018_07_12_145513_create_province_translations_table	1
38	2018_07_12_145513_create_provinces_table	1
39	2018_07_12_145513_create_relationship_translations_table	1
40	2018_07_12_145513_create_relationships_table	1
41	2018_07_12_145513_create_security_clearance_translations_table	1
42	2018_07_12_145513_create_security_clearances_table	1
43	2018_07_12_145513_create_skill_declaration_table	1
44	2018_07_12_145513_create_skill_level_translations_table	1
45	2018_07_12_145513_create_skill_levels_table	1
46	2018_07_12_145513_create_team_culture_translations_table	1
47	2018_07_12_145513_create_team_cultures_table	1
48	2018_07_12_145513_create_user_roles_table	1
49	2018_07_12_145513_create_users_table	1
50	2018_07_12_145513_create_work_environments_table	1
51	2018_07_12_145513_create_work_samples_table	1
52	2018_07_12_145513_create_workplace_photo_captions_table	1
53	2018_07_12_145513_create_workplace_photos_table	1
54	2018_07_12_145517_add_foreign_keys_to_applicant_profile_answers_table	1
55	2018_07_12_145517_add_foreign_keys_to_applicant_profile_question_translations_table	1
56	2018_07_12_145517_add_foreign_keys_to_applicants_table	1
57	2018_07_12_145517_add_foreign_keys_to_application_micro_references_table	1
58	2018_07_12_145517_add_foreign_keys_to_application_status_translations_table	1
59	2018_07_12_145517_add_foreign_keys_to_application_work_samples_table	1
60	2018_07_12_145517_add_foreign_keys_to_citizenship_declaration_translations_table	1
61	2018_07_12_145517_add_foreign_keys_to_criteria_table	1
62	2018_07_12_145517_add_foreign_keys_to_criteria_translations_table	1
63	2018_07_12_145517_add_foreign_keys_to_criteria_type_translations_table	1
64	2018_07_12_145517_add_foreign_keys_to_department_translations_table	1
65	2018_07_12_145517_add_foreign_keys_to_experience_level_translations_table	1
66	2018_07_12_145517_add_foreign_keys_to_file_type_translations_table	1
67	2018_07_12_145517_add_foreign_keys_to_job_application_answers_table	1
68	2018_07_12_145517_add_foreign_keys_to_job_applications_table	1
69	2018_07_12_145517_add_foreign_keys_to_job_poster_key_task_translations_table	1
70	2018_07_12_145517_add_foreign_keys_to_job_poster_key_tasks_table	1
71	2018_07_12_145517_add_foreign_keys_to_job_poster_question_translations_table	1
72	2018_07_12_145517_add_foreign_keys_to_job_poster_questions_table	1
73	2018_07_12_145517_add_foreign_keys_to_job_poster_translations_table	1
74	2018_07_12_145517_add_foreign_keys_to_job_posters_table	1
75	2018_07_12_145517_add_foreign_keys_to_job_term_translations_table	1
76	2018_07_12_145517_add_foreign_keys_to_language_requirement_translations_table	1
77	2018_07_12_145517_add_foreign_keys_to_manager_translations_table	1
78	2018_07_12_145517_add_foreign_keys_to_managers_table	1
79	2018_07_12_145517_add_foreign_keys_to_micro_references_table	1
80	2018_07_12_145517_add_foreign_keys_to_profile_pics_table	1
81	2018_07_12_145517_add_foreign_keys_to_province_translations_table	1
82	2018_07_12_145517_add_foreign_keys_to_relationship_translations_table	1
83	2018_07_12_145517_add_foreign_keys_to_security_clearance_translations_table	1
84	2018_07_12_145517_add_foreign_keys_to_skill_declaration_table	1
85	2018_07_12_145517_add_foreign_keys_to_skill_level_translations_table	1
86	2018_07_12_145517_add_foreign_keys_to_team_culture_translations_table	1
87	2018_07_12_145517_add_foreign_keys_to_team_cultures_table	1
88	2018_07_12_145517_add_foreign_keys_to_users_table	1
89	2018_07_12_145517_add_foreign_keys_to_work_environments_table	1
90	2018_07_12_145517_add_foreign_keys_to_work_samples_table	1
91	2018_07_12_145517_add_foreign_keys_to_workplace_photo_captions_table	1
92	2018_07_19_161639_AddDepartmentForeignIdToManager	1
93	2018_08_10_201854_rename_applicant_linkedin_column	1
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.migrations_id_seq', 93, true);


--
-- Data for Name: profile_pics; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.profile_pics (id, user_id, image, type, size, created_at, updated_at) FROM stdin;
\.


--
-- Name: profile_pics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.profile_pics_id_seq', 1, false);


--
-- Data for Name: province_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.province_translations (id, province_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: province_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.province_translations_id_seq', 1, false);


--
-- Data for Name: provinces; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.provinces (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.provinces_id_seq', 1, false);


--
-- Data for Name: relationship_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.relationship_translations (id, relationship_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: relationship_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.relationship_translations_id_seq', 1, false);


--
-- Data for Name: relationships; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.relationships (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: relationships_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.relationships_id_seq', 1, false);


--
-- Data for Name: security_clearance_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.security_clearance_translations (id, locale, security_clearance_id, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: security_clearance_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.security_clearance_translations_id_seq', 1, false);


--
-- Data for Name: security_clearances; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.security_clearances (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: security_clearances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.security_clearances_id_seq', 1, false);


--
-- Data for Name: skill_declarations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.skill_declarations (id, criteria_id, job_application_id, experience_level_id, skill_level_id, description, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Name: skill_declarations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.skill_declarations_id_seq', 1, false);


--
-- Data for Name: skill_level_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.skill_level_translations (id, skill_level_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: skill_level_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.skill_level_translations_id_seq', 1, false);


--
-- Data for Name: skill_levels; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.skill_levels (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: skill_levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.skill_levels_id_seq', 1, false);


--
-- Data for Name: team_culture_translations; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.team_culture_translations (id, team_culture_id, locale, narrative_text, operating_context, what_we_value, how_we_work, created_at, updated_at) FROM stdin;
\.


--
-- Name: team_culture_translations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.team_culture_translations_id_seq', 1, false);


--
-- Data for Name: team_cultures; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.team_cultures (id, team_size, gc_directory_url, manager_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: team_cultures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.team_cultures_id_seq', 1, false);


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.user_roles (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.users (id, email, name, is_confirmed, user_role_id, open_id_sub, created_at, updated_at) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Data for Name: work_environments; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.work_environments (id, manager_id, remote_allowed, telework_allowed, flexible_allowed, created_at, updated_at) FROM stdin;
\.


--
-- Name: work_environments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.work_environments_id_seq', 1, false);


--
-- Data for Name: work_samples; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.work_samples (id, name, date_created, file_type_id, url, story, created_at, updated_at) FROM stdin;
\.


--
-- Name: work_samples_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.work_samples_id_seq', 1, false);


--
-- Data for Name: workplace_photo_captions; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.workplace_photo_captions (id, work_environment_id, photo_name, workplace_photo_id, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: workplace_photo_captions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.workplace_photo_captions_id_seq', 1, false);


--
-- Data for Name: workplace_photos; Type: TABLE DATA; Schema: public; Owner: talentcloud
--

COPY public.workplace_photos (id, image, mime_type, size, created_at, updated_at) FROM stdin;
\.


--
-- Name: workplace_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: talentcloud
--

SELECT pg_catalog.setval('public.workplace_photos_id_seq', 1, false);


--
-- Data for Name: applicant_profile_answers; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.applicant_profile_answers (id, applicant_id, applicant_profile_question_id, answer, created_at, updated_at) FROM stdin;
\.


--
-- Name: applicant_profile_answers_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.applicant_profile_answers_id_seq', 1, true);


--
-- Data for Name: applicant_profile_question_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.applicant_profile_question_translations (id, applicant_profile_question_id, locale, value, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: applicant_profile_question_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.applicant_profile_question_translations_id_seq', 1, true);


--
-- Data for Name: applicant_profile_questions; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.applicant_profile_questions (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: applicant_profile_questions_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.applicant_profile_questions_id_seq', 1, true);


--
-- Data for Name: applicants; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.applicants (id, personal_website, tagline, twitter_username, linkedin_url, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: applicants_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.applicants_id_seq', 1, true);


--
-- Data for Name: application_micro_references; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.application_micro_references (id, job_application_id, criteria_id, micro_reference_id, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Name: application_micro_references_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.application_micro_references_id_seq', 1, true);


--
-- Data for Name: application_status; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.application_status (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: application_status_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.application_status_id_seq', 1, true);


--
-- Data for Name: application_status_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.application_status_translations (id, application_status_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: application_status_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.application_status_translations_id_seq', 1, true);


--
-- Data for Name: application_work_samples; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.application_work_samples (id, job_application_id, criteria_id, work_sample_id, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Name: application_work_samples_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.application_work_samples_id_seq', 1, true);


--
-- Data for Name: citizenship_declaration_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.citizenship_declaration_translations (id, citizenship_declaration_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: citizenship_declaration_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.citizenship_declaration_translations_id_seq', 1, true);


--
-- Data for Name: citizenship_declarations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.citizenship_declarations (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: citizenship_declarations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.citizenship_declarations_id_seq', 1, true);


--
-- Data for Name: criteria; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.criteria (id, criteria_type_id, job_poster_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: criteria_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.criteria_id_seq', 1, true);


--
-- Data for Name: criteria_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.criteria_translations (id, criteria_id, name, description, locale, created_at, updated_at) FROM stdin;
\.


--
-- Name: criteria_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.criteria_translations_id_seq', 1, true);


--
-- Data for Name: criteria_type_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.criteria_type_translations (id, criteria_type_id, locale, value, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: criteria_type_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.criteria_type_translations_id_seq', 1, true);


--
-- Data for Name: criteria_types; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.criteria_types (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: criteria_types_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.criteria_types_id_seq', 1, true);


--
-- Data for Name: department_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.department_translations (id, department_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: department_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.department_translations_id_seq', 1, true);


--
-- Data for Name: departments; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.departments (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.departments_id_seq', 1, true);


--
-- Data for Name: experience_level_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.experience_level_translations (id, locale, experience_level_id, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: experience_level_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.experience_level_translations_id_seq', 1, true);


--
-- Data for Name: experience_levels; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.experience_levels (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: experience_levels_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.experience_levels_id_seq', 1, true);


--
-- Data for Name: file_type_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.file_type_translations (id, file_type_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: file_type_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.file_type_translations_id_seq', 1, true);


--
-- Data for Name: file_types; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.file_types (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: file_types_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.file_types_id_seq', 1, true);


--
-- Data for Name: frequencies; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.frequencies (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: frequencies_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.frequencies_id_seq', 1, true);


--
-- Data for Name: frequncy; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.frequncy (id, created_at, updated_at) FROM stdin;
\.


--
-- Name: frequncy_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.frequncy_id_seq', 1, true);


--
-- Data for Name: job_application_answers; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_application_answers (id, job_poster_questions_id, job_application_id, answer, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_application_answers_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_application_answers_id_seq', 1, true);


--
-- Data for Name: job_applications; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_applications (id, job_poster_id, application_status_id, applicant_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_applications_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_applications_id_seq', 1, true);


--
-- Data for Name: job_poster_key_task_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_poster_key_task_translations (id, job_poster_key_task_id, locale, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_key_task_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_poster_key_task_translations_id_seq', 1, true);


--
-- Data for Name: job_poster_key_tasks; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_poster_key_tasks (id, job_poster_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_key_tasks_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_poster_key_tasks_id_seq', 1, true);


--
-- Data for Name: job_poster_question_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_poster_question_translations (id, job_poster_question_id, locale, question, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_question_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_poster_question_translations_id_seq', 1, true);


--
-- Data for Name: job_poster_questions; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_poster_questions (id, job_poster_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_questions_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_poster_questions_id_seq', 1, true);


--
-- Data for Name: job_poster_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_poster_translations (id, job_poster_id, locale, city, title, impact, branch, division, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_poster_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_poster_translations_id_seq', 1, true);


--
-- Data for Name: job_posters; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_posters (id, job_term_id, term_qty, open_date_time, close_date_time, start_date_time, department_id, province_id, salary_min, salary_max, noc, classification, security_clearance_id, language_requirement_id, manager_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_posters_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_posters_id_seq', 1, true);


--
-- Data for Name: job_term_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_term_translations (id, job_term_id, value, locale, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_term_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_term_translations_id_seq', 1, true);


--
-- Data for Name: job_terms; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.job_terms (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: job_terms_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.job_terms_id_seq', 1, true);


--
-- Data for Name: language_requirement_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.language_requirement_translations (id, locale, language_requirement_id, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: language_requirement_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.language_requirement_translations_id_seq', 1, true);


--
-- Data for Name: language_requirements; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.language_requirements (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: language_requirements_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.language_requirements_id_seq', 1, true);


--
-- Data for Name: manager_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.manager_translations (id, locale, about_me, greatest_accomplishment, branch, division, "position", leadership_style, employee_learning, expectations, manager_id, work_experience, education, created_at, updated_at) FROM stdin;
\.


--
-- Name: manager_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.manager_translations_id_seq', 1, true);


--
-- Data for Name: managers; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.managers (id, department_id, twitter_username, linkedin_username, user_id, created_at, updated_at, work_review_frequency_id, stay_late_frequency_id, engage_team_frequency_id, development_opportunity_frequency_id, refuse_low_value_work_frequency_id) FROM stdin;
\.


--
-- Name: managers_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.managers_id_seq', 1, true);


--
-- Data for Name: micro_references; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.micro_references (id, name, email, relationship_id, observed_from_date, observed_until_date, experience_level_id, story, created_at, updated_at) FROM stdin;
\.


--
-- Name: micro_references_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.micro_references_id_seq', 1, true);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.migrations (id, migration, batch) FROM stdin;
191	2018_07_12_145513_create_applicant_profile_answers_table	1
192	2018_07_12_145513_create_applicant_profile_question_translations_table	1
193	2018_07_12_145513_create_applicant_profile_questions_table	1
194	2018_07_12_145513_create_applicants_table	1
195	2018_07_12_145513_create_application_micro_references_table	1
196	2018_07_12_145513_create_application_status_table	1
197	2018_07_12_145513_create_application_status_translations_table	1
198	2018_07_12_145513_create_application_work_samples_table	1
199	2018_07_12_145513_create_citizenship_declaration_translations_table	1
200	2018_07_12_145513_create_citizenship_declarations_table	1
201	2018_07_12_145513_create_criteria_table	1
202	2018_07_12_145513_create_criteria_translations_table	1
203	2018_07_12_145513_create_criteria_type_translations_table	1
204	2018_07_12_145513_create_criteria_types_table	1
205	2018_07_12_145513_create_department_translations_table	1
206	2018_07_12_145513_create_departments_table	1
207	2018_07_12_145513_create_experience_level_translations_table	1
208	2018_07_12_145513_create_experience_levels_table	1
209	2018_07_12_145513_create_file_type_translations_table	1
210	2018_07_12_145513_create_file_types_table	1
211	2018_07_12_145513_create_job_application_answers_table	1
212	2018_07_12_145513_create_job_applications_table	1
213	2018_07_12_145513_create_job_poster_key_task_translations_table	1
214	2018_07_12_145513_create_job_poster_key_tasks_table	1
215	2018_07_12_145513_create_job_poster_question_translations_table	1
216	2018_07_12_145513_create_job_poster_questions_table	1
217	2018_07_12_145513_create_job_poster_translations_table	1
218	2018_07_12_145513_create_job_posters_table	1
219	2018_07_12_145513_create_job_term_translations_table	1
220	2018_07_12_145513_create_job_terms_table	1
221	2018_07_12_145513_create_language_requirement_translations_table	1
222	2018_07_12_145513_create_language_requirements_table	1
223	2018_07_12_145513_create_manager_translations_table	1
224	2018_07_12_145513_create_managers_table	1
225	2018_07_12_145513_create_micro_references_table	1
226	2018_07_12_145513_create_profile_pics_table	1
227	2018_07_12_145513_create_province_translations_table	1
228	2018_07_12_145513_create_provinces_table	1
229	2018_07_12_145513_create_relationship_translations_table	1
230	2018_07_12_145513_create_relationships_table	1
231	2018_07_12_145513_create_security_clearance_translations_table	1
232	2018_07_12_145513_create_security_clearances_table	1
233	2018_07_12_145513_create_skill_declaration_table	1
234	2018_07_12_145513_create_skill_level_translations_table	1
235	2018_07_12_145513_create_skill_levels_table	1
236	2018_07_12_145513_create_team_culture_translations_table	1
237	2018_07_12_145513_create_team_cultures_table	1
238	2018_07_12_145513_create_user_roles_table	1
239	2018_07_12_145513_create_users_table	1
240	2018_07_12_145513_create_work_environments_table	1
241	2018_07_12_145513_create_work_samples_table	1
242	2018_07_12_145513_create_workplace_photo_captions_table	1
243	2018_07_12_145513_create_workplace_photos_table	1
244	2018_07_12_145517_add_foreign_keys_to_applicant_profile_answers_table	1
245	2018_07_12_145517_add_foreign_keys_to_applicant_profile_question_translations_table	1
246	2018_07_12_145517_add_foreign_keys_to_applicants_table	1
247	2018_07_12_145517_add_foreign_keys_to_application_micro_references_table	1
248	2018_07_12_145517_add_foreign_keys_to_application_status_translations_table	1
249	2018_07_12_145517_add_foreign_keys_to_application_work_samples_table	1
250	2018_07_12_145517_add_foreign_keys_to_citizenship_declaration_translations_table	1
251	2018_07_12_145517_add_foreign_keys_to_criteria_table	1
252	2018_07_12_145517_add_foreign_keys_to_criteria_translations_table	1
253	2018_07_12_145517_add_foreign_keys_to_criteria_type_translations_table	1
254	2018_07_12_145517_add_foreign_keys_to_department_translations_table	1
255	2018_07_12_145517_add_foreign_keys_to_experience_level_translations_table	1
256	2018_07_12_145517_add_foreign_keys_to_file_type_translations_table	1
257	2018_07_12_145517_add_foreign_keys_to_job_application_answers_table	1
258	2018_07_12_145517_add_foreign_keys_to_job_applications_table	1
259	2018_07_12_145517_add_foreign_keys_to_job_poster_key_task_translations_table	1
260	2018_07_12_145517_add_foreign_keys_to_job_poster_key_tasks_table	1
261	2018_07_12_145517_add_foreign_keys_to_job_poster_question_translations_table	1
262	2018_07_12_145517_add_foreign_keys_to_job_poster_questions_table	1
263	2018_07_12_145517_add_foreign_keys_to_job_poster_translations_table	1
264	2018_07_12_145517_add_foreign_keys_to_job_posters_table	1
265	2018_07_12_145517_add_foreign_keys_to_job_term_translations_table	1
266	2018_07_12_145517_add_foreign_keys_to_language_requirement_translations_table	1
267	2018_07_12_145517_add_foreign_keys_to_manager_translations_table	1
268	2018_07_12_145517_add_foreign_keys_to_managers_table	1
269	2018_07_12_145517_add_foreign_keys_to_micro_references_table	1
270	2018_07_12_145517_add_foreign_keys_to_profile_pics_table	1
271	2018_07_12_145517_add_foreign_keys_to_province_translations_table	1
272	2018_07_12_145517_add_foreign_keys_to_relationship_translations_table	1
273	2018_07_12_145517_add_foreign_keys_to_security_clearance_translations_table	1
274	2018_07_12_145517_add_foreign_keys_to_skill_declaration_table	1
275	2018_07_12_145517_add_foreign_keys_to_skill_level_translations_table	1
276	2018_07_12_145517_add_foreign_keys_to_team_culture_translations_table	1
277	2018_07_12_145517_add_foreign_keys_to_team_cultures_table	1
278	2018_07_12_145517_add_foreign_keys_to_users_table	1
279	2018_07_12_145517_add_foreign_keys_to_work_environments_table	1
280	2018_07_12_145517_add_foreign_keys_to_work_samples_table	1
281	2018_07_12_145517_add_foreign_keys_to_workplace_photo_captions_table	1
282	2018_07_19_161639_AddDepartmentForeignIdToManager	1
283	2018_08_10_201854_rename_applicant_linkedin_column	1
284	2018_08_16_211708_rename_manager_aboutme_col	1
285	2018_08_17_203204_create_frequency_lookup_table	1
286	2018_08_20_160509_reference_frequency_on_manager	1
287	2018_08_20_163214_reference_frequency_on_work_environment	1
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.migrations_id_seq', 287, true);


--
-- Data for Name: profile_pics; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.profile_pics (id, user_id, image, type, size, created_at, updated_at) FROM stdin;
\.


--
-- Name: profile_pics_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.profile_pics_id_seq', 1, true);


--
-- Data for Name: province_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.province_translations (id, province_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: province_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.province_translations_id_seq', 1, true);


--
-- Data for Name: provinces; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.provinces (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: provinces_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.provinces_id_seq', 1, true);


--
-- Data for Name: relationship_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.relationship_translations (id, relationship_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: relationship_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.relationship_translations_id_seq', 1, true);


--
-- Data for Name: relationships; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.relationships (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: relationships_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.relationships_id_seq', 1, true);


--
-- Data for Name: security_clearance_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.security_clearance_translations (id, locale, security_clearance_id, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: security_clearance_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.security_clearance_translations_id_seq', 1, true);


--
-- Data for Name: security_clearances; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.security_clearances (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: security_clearances_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.security_clearances_id_seq', 1, true);


--
-- Data for Name: skill_declarations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.skill_declarations (id, criteria_id, job_application_id, experience_level_id, skill_level_id, description, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Name: skill_declarations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.skill_declarations_id_seq', 1, true);


--
-- Data for Name: skill_level_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.skill_level_translations (id, skill_level_id, locale, value, created_at, updated_at) FROM stdin;
\.


--
-- Name: skill_level_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.skill_level_translations_id_seq', 1, true);


--
-- Data for Name: skill_levels; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.skill_levels (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: skill_levels_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.skill_levels_id_seq', 1, true);


--
-- Data for Name: team_culture_translations; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.team_culture_translations (id, team_culture_id, locale, narrative_text, operating_context, what_we_value, how_we_work, created_at, updated_at) FROM stdin;
\.


--
-- Name: team_culture_translations_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.team_culture_translations_id_seq', 1, true);


--
-- Data for Name: team_cultures; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.team_cultures (id, team_size, gc_directory_url, manager_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: team_cultures_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.team_cultures_id_seq', 1, true);


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.user_roles (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.user_roles_id_seq', 1, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.users (id, email, name, is_confirmed, user_role_id, open_id_sub, created_at, updated_at) FROM stdin;
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.users_id_seq', 1, true);


--
-- Data for Name: work_environments; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.work_environments (id, manager_id, created_at, updated_at, remote_work_allowed, telework_allowed_frequency_id, flexible_hours_frequency_id) FROM stdin;
\.


--
-- Name: work_environments_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.work_environments_id_seq', 1, true);


--
-- Data for Name: work_samples; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.work_samples (id, name, date_created, file_type_id, url, story, created_at, updated_at) FROM stdin;
\.


--
-- Name: work_samples_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.work_samples_id_seq', 1, true);


--
-- Data for Name: workplace_photo_captions; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.workplace_photo_captions (id, work_environment_id, photo_name, workplace_photo_id, description, created_at, updated_at) FROM stdin;
\.


--
-- Name: workplace_photo_captions_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.workplace_photo_captions_id_seq', 1, true);


--
-- Data for Name: workplace_photos; Type: TABLE DATA; Schema: talentcloud; Owner: talentcloud
--

COPY talentcloud.workplace_photos (id, image, mime_type, size, created_at, updated_at) FROM stdin;
\.


--
-- Name: workplace_photos_id_seq; Type: SEQUENCE SET; Schema: talentcloud; Owner: talentcloud
--

SELECT pg_catalog.setval('talentcloud.workplace_photos_id_seq', 1, true);


--
-- Name: applicant_profile_answers app_profile_answers_app_id_app_profile_question_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_answers
    ADD CONSTRAINT app_profile_answers_app_id_app_profile_question_id_unique UNIQUE (applicant_id, applicant_profile_question_id);


--
-- Name: applicant_profile_question_translations app_profile_ques_trans_app_profile_question_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_question_translations
    ADD CONSTRAINT app_profile_ques_trans_app_profile_question_id_locale_unique UNIQUE (applicant_profile_question_id, locale);


--
-- Name: applicant_profile_answers applicant_profile_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_answers
    ADD CONSTRAINT applicant_profile_answers_pkey PRIMARY KEY (id);


--
-- Name: applicant_profile_question_translations applicant_profile_question_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_question_translations
    ADD CONSTRAINT applicant_profile_question_translations_pkey PRIMARY KEY (id);


--
-- Name: applicant_profile_questions applicant_profile_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_questions
    ADD CONSTRAINT applicant_profile_questions_pkey PRIMARY KEY (id);


--
-- Name: applicants applicants_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_pkey PRIMARY KEY (id);


--
-- Name: applicants applicants_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_user_id_unique UNIQUE (user_id);


--
-- Name: application_micro_references application_micro_references_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_micro_references
    ADD CONSTRAINT application_micro_references_pkey PRIMARY KEY (id);


--
-- Name: application_status application_status_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_status
    ADD CONSTRAINT application_status_pkey PRIMARY KEY (id);


--
-- Name: application_status_translations application_status_trans_application_status_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_status_translations
    ADD CONSTRAINT application_status_trans_application_status_id_locale_unique UNIQUE (application_status_id, locale);


--
-- Name: application_status_translations application_status_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_status_translations
    ADD CONSTRAINT application_status_translations_pkey PRIMARY KEY (id);


--
-- Name: application_work_samples application_work_samples_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_work_samples
    ADD CONSTRAINT application_work_samples_pkey PRIMARY KEY (id);


--
-- Name: citizenship_declaration_translations citiz_declaration_trans_citiz_declaration_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.citizenship_declaration_translations
    ADD CONSTRAINT citiz_declaration_trans_citiz_declaration_id_locale_unique UNIQUE (citizenship_declaration_id, locale);


--
-- Name: citizenship_declaration_translations citizenship_declaration_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.citizenship_declaration_translations
    ADD CONSTRAINT citizenship_declaration_translations_pkey PRIMARY KEY (id);


--
-- Name: citizenship_declarations citizenship_declarations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.citizenship_declarations
    ADD CONSTRAINT citizenship_declarations_pkey PRIMARY KEY (id);


--
-- Name: criteria criteria_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria
    ADD CONSTRAINT criteria_pkey PRIMARY KEY (id);


--
-- Name: criteria_translations criteria_translations_criteria_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_translations
    ADD CONSTRAINT criteria_translations_criteria_id_locale_unique UNIQUE (criteria_id, locale);


--
-- Name: criteria_translations criteria_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_translations
    ADD CONSTRAINT criteria_translations_pkey PRIMARY KEY (id);


--
-- Name: criteria_type_translations criteria_type_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_type_translations
    ADD CONSTRAINT criteria_type_translations_pkey PRIMARY KEY (id);


--
-- Name: criteria_types criteria_types_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_types
    ADD CONSTRAINT criteria_types_pkey PRIMARY KEY (id);


--
-- Name: department_translations department_translations_department_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.department_translations
    ADD CONSTRAINT department_translations_department_id_locale_unique UNIQUE (department_id, locale);


--
-- Name: department_translations department_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.department_translations
    ADD CONSTRAINT department_translations_pkey PRIMARY KEY (id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: experience_level_translations experience_level_translations_experience_level_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.experience_level_translations
    ADD CONSTRAINT experience_level_translations_experience_level_id_locale_unique UNIQUE (experience_level_id, locale);


--
-- Name: experience_level_translations experience_level_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.experience_level_translations
    ADD CONSTRAINT experience_level_translations_pkey PRIMARY KEY (id);


--
-- Name: experience_levels experience_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.experience_levels
    ADD CONSTRAINT experience_levels_pkey PRIMARY KEY (id);


--
-- Name: file_type_translations file_type_translations_file_type_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.file_type_translations
    ADD CONSTRAINT file_type_translations_file_type_id_locale_unique UNIQUE (file_type_id, locale);


--
-- Name: file_type_translations file_type_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.file_type_translations
    ADD CONSTRAINT file_type_translations_pkey PRIMARY KEY (id);


--
-- Name: file_types file_types_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.file_types
    ADD CONSTRAINT file_types_pkey PRIMARY KEY (id);


--
-- Name: job_application_answers job_appl_ans_job_poster_ques_id_job_appl_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_application_answers
    ADD CONSTRAINT job_appl_ans_job_poster_ques_id_job_appl_id_unique UNIQUE (job_poster_questions_id, job_application_id);


--
-- Name: job_application_answers job_application_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_application_answers
    ADD CONSTRAINT job_application_answers_pkey PRIMARY KEY (id);


--
-- Name: job_applications job_applications_job_poster_id_applicant_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_job_poster_id_applicant_id_unique UNIQUE (job_poster_id, applicant_id);


--
-- Name: job_applications job_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_pkey PRIMARY KEY (id);


--
-- Name: job_poster_key_task_translations job_poster_key_task_trans_job_poster_key_task_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_key_task_translations
    ADD CONSTRAINT job_poster_key_task_trans_job_poster_key_task_id_locale_unique UNIQUE (job_poster_key_task_id, locale);


--
-- Name: job_poster_key_task_translations job_poster_key_task_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_key_task_translations
    ADD CONSTRAINT job_poster_key_task_translations_pkey PRIMARY KEY (id);


--
-- Name: job_poster_key_tasks job_poster_key_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_key_tasks
    ADD CONSTRAINT job_poster_key_tasks_pkey PRIMARY KEY (id);


--
-- Name: job_poster_question_translations job_poster_question_trans_job_poster_question_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_question_translations
    ADD CONSTRAINT job_poster_question_trans_job_poster_question_id_locale_unique UNIQUE (job_poster_question_id, locale);


--
-- Name: job_poster_question_translations job_poster_question_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_question_translations
    ADD CONSTRAINT job_poster_question_translations_pkey PRIMARY KEY (id);


--
-- Name: job_poster_questions job_poster_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_questions
    ADD CONSTRAINT job_poster_questions_pkey PRIMARY KEY (id);


--
-- Name: job_poster_translations job_poster_translations_job_poster_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_translations
    ADD CONSTRAINT job_poster_translations_job_poster_id_locale_unique UNIQUE (job_poster_id, locale);


--
-- Name: job_poster_translations job_poster_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_translations
    ADD CONSTRAINT job_poster_translations_pkey PRIMARY KEY (id);


--
-- Name: job_posters job_posters_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_posters
    ADD CONSTRAINT job_posters_pkey PRIMARY KEY (id);


--
-- Name: job_term_translations job_term_translations_job_term_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_term_translations
    ADD CONSTRAINT job_term_translations_job_term_id_locale_unique UNIQUE (job_term_id, locale);


--
-- Name: job_term_translations job_term_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_term_translations
    ADD CONSTRAINT job_term_translations_pkey PRIMARY KEY (id);


--
-- Name: job_terms job_terms_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_terms
    ADD CONSTRAINT job_terms_pkey PRIMARY KEY (id);


--
-- Name: language_requirement_translations lang_requirement_trans_lang_requirement_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.language_requirement_translations
    ADD CONSTRAINT lang_requirement_trans_lang_requirement_id_locale_unique UNIQUE (language_requirement_id, locale);


--
-- Name: language_requirement_translations language_requirement_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.language_requirement_translations
    ADD CONSTRAINT language_requirement_translations_pkey PRIMARY KEY (id);


--
-- Name: language_requirements language_requirements_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.language_requirements
    ADD CONSTRAINT language_requirements_pkey PRIMARY KEY (id);


--
-- Name: manager_translations manager_translations_manager_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.manager_translations
    ADD CONSTRAINT manager_translations_manager_id_locale_unique UNIQUE (manager_id, locale);


--
-- Name: manager_translations manager_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.manager_translations
    ADD CONSTRAINT manager_translations_pkey PRIMARY KEY (id);


--
-- Name: managers managers_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_pkey PRIMARY KEY (id);


--
-- Name: managers managers_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_user_id_unique UNIQUE (user_id);


--
-- Name: micro_references micro_references_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.micro_references
    ADD CONSTRAINT micro_references_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: profile_pics profile_pics_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.profile_pics
    ADD CONSTRAINT profile_pics_pkey PRIMARY KEY (id);


--
-- Name: profile_pics profile_pics_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.profile_pics
    ADD CONSTRAINT profile_pics_user_id_unique UNIQUE (user_id);


--
-- Name: province_translations province_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.province_translations
    ADD CONSTRAINT province_translations_pkey PRIMARY KEY (id);


--
-- Name: province_translations province_translations_province_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.province_translations
    ADD CONSTRAINT province_translations_province_id_locale_unique UNIQUE (province_id, locale);


--
-- Name: provinces provinces_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.provinces
    ADD CONSTRAINT provinces_pkey PRIMARY KEY (id);


--
-- Name: relationship_translations relationship_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.relationship_translations
    ADD CONSTRAINT relationship_translations_pkey PRIMARY KEY (id);


--
-- Name: relationship_translations relationship_translations_relationship_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.relationship_translations
    ADD CONSTRAINT relationship_translations_relationship_id_locale_unique UNIQUE (relationship_id, locale);


--
-- Name: relationships relationships_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.relationships
    ADD CONSTRAINT relationships_pkey PRIMARY KEY (id);


--
-- Name: security_clearance_translations security_clearance_trans_security_clearance_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.security_clearance_translations
    ADD CONSTRAINT security_clearance_trans_security_clearance_id_locale_unique UNIQUE (security_clearance_id, locale);


--
-- Name: security_clearance_translations security_clearance_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.security_clearance_translations
    ADD CONSTRAINT security_clearance_translations_pkey PRIMARY KEY (id);


--
-- Name: security_clearances security_clearances_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.security_clearances
    ADD CONSTRAINT security_clearances_pkey PRIMARY KEY (id);


--
-- Name: skill_declarations skill_declarations_criteria_id_job_application_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_declarations
    ADD CONSTRAINT skill_declarations_criteria_id_job_application_id_unique UNIQUE (criteria_id, job_application_id);


--
-- Name: skill_declarations skill_declarations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_declarations
    ADD CONSTRAINT skill_declarations_pkey PRIMARY KEY (id);


--
-- Name: skill_level_translations skill_level_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_level_translations
    ADD CONSTRAINT skill_level_translations_pkey PRIMARY KEY (id);


--
-- Name: skill_level_translations skill_level_translations_skill_level_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_level_translations
    ADD CONSTRAINT skill_level_translations_skill_level_id_locale_unique UNIQUE (skill_level_id, locale);


--
-- Name: skill_levels skill_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_levels
    ADD CONSTRAINT skill_levels_pkey PRIMARY KEY (id);


--
-- Name: team_culture_translations team_culture_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.team_culture_translations
    ADD CONSTRAINT team_culture_translations_pkey PRIMARY KEY (id);


--
-- Name: team_culture_translations team_culture_translations_team_culture_id_locale_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.team_culture_translations
    ADD CONSTRAINT team_culture_translations_team_culture_id_locale_unique UNIQUE (team_culture_id, locale);


--
-- Name: team_cultures team_cultures_manager_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.team_cultures
    ADD CONSTRAINT team_cultures_manager_id_unique UNIQUE (manager_id);


--
-- Name: team_cultures team_cultures_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.team_cultures
    ADD CONSTRAINT team_cultures_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_open_id_sub_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_open_id_sub_unique UNIQUE (open_id_sub);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: work_environments work_environments_manager_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.work_environments
    ADD CONSTRAINT work_environments_manager_id_unique UNIQUE (manager_id);


--
-- Name: work_environments work_environments_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.work_environments
    ADD CONSTRAINT work_environments_pkey PRIMARY KEY (id);


--
-- Name: work_samples work_samples_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.work_samples
    ADD CONSTRAINT work_samples_pkey PRIMARY KEY (id);


--
-- Name: workplace_photo_captions workplace_photo_captions_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.workplace_photo_captions
    ADD CONSTRAINT workplace_photo_captions_pkey PRIMARY KEY (id);


--
-- Name: workplace_photo_captions workplace_photo_captions_work_environment_id_photo_name_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.workplace_photo_captions
    ADD CONSTRAINT workplace_photo_captions_work_environment_id_photo_name_unique UNIQUE (work_environment_id, photo_name);


--
-- Name: workplace_photo_captions workplace_photo_captions_workplace_photo_id_unique; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.workplace_photo_captions
    ADD CONSTRAINT workplace_photo_captions_workplace_photo_id_unique UNIQUE (workplace_photo_id);


--
-- Name: workplace_photos workplace_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.workplace_photos
    ADD CONSTRAINT workplace_photos_pkey PRIMARY KEY (id);


--
-- Name: applicants idx_19073_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicants
    ADD CONSTRAINT idx_19073_primary PRIMARY KEY (id);


--
-- Name: applicant_profile_answers idx_19082_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_answers
    ADD CONSTRAINT idx_19082_primary PRIMARY KEY (id);


--
-- Name: applicant_profile_questions idx_19091_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_questions
    ADD CONSTRAINT idx_19091_primary PRIMARY KEY (id);


--
-- Name: applicant_profile_question_translations idx_19097_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_question_translations
    ADD CONSTRAINT idx_19097_primary PRIMARY KEY (id);


--
-- Name: application_micro_references idx_19106_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_micro_references
    ADD CONSTRAINT idx_19106_primary PRIMARY KEY (id);


--
-- Name: application_status idx_19113_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_status
    ADD CONSTRAINT idx_19113_primary PRIMARY KEY (id);


--
-- Name: application_status_translations idx_19119_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_status_translations
    ADD CONSTRAINT idx_19119_primary PRIMARY KEY (id);


--
-- Name: application_work_samples idx_19125_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_work_samples
    ADD CONSTRAINT idx_19125_primary PRIMARY KEY (id);


--
-- Name: citizenship_declarations idx_19132_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.citizenship_declarations
    ADD CONSTRAINT idx_19132_primary PRIMARY KEY (id);


--
-- Name: citizenship_declaration_translations idx_19141_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.citizenship_declaration_translations
    ADD CONSTRAINT idx_19141_primary PRIMARY KEY (id);


--
-- Name: criteria idx_19150_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria
    ADD CONSTRAINT idx_19150_primary PRIMARY KEY (id);


--
-- Name: criteria_translations idx_19156_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria_translations
    ADD CONSTRAINT idx_19156_primary PRIMARY KEY (id);


--
-- Name: criteria_types idx_19165_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria_types
    ADD CONSTRAINT idx_19165_primary PRIMARY KEY (id);


--
-- Name: criteria_type_translations idx_19171_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria_type_translations
    ADD CONSTRAINT idx_19171_primary PRIMARY KEY (id);


--
-- Name: departments idx_19180_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.departments
    ADD CONSTRAINT idx_19180_primary PRIMARY KEY (id);


--
-- Name: department_translations idx_19186_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.department_translations
    ADD CONSTRAINT idx_19186_primary PRIMARY KEY (id);


--
-- Name: experience_levels idx_19192_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.experience_levels
    ADD CONSTRAINT idx_19192_primary PRIMARY KEY (id);


--
-- Name: experience_level_translations idx_19198_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.experience_level_translations
    ADD CONSTRAINT idx_19198_primary PRIMARY KEY (id);


--
-- Name: file_types idx_19204_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.file_types
    ADD CONSTRAINT idx_19204_primary PRIMARY KEY (id);


--
-- Name: file_type_translations idx_19210_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.file_type_translations
    ADD CONSTRAINT idx_19210_primary PRIMARY KEY (id);


--
-- Name: frequencies idx_19216_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.frequencies
    ADD CONSTRAINT idx_19216_primary PRIMARY KEY (id);


--
-- Name: frequncy idx_19222_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.frequncy
    ADD CONSTRAINT idx_19222_primary PRIMARY KEY (id);


--
-- Name: job_applications idx_19228_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_applications
    ADD CONSTRAINT idx_19228_primary PRIMARY KEY (id);


--
-- Name: job_application_answers idx_19234_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_application_answers
    ADD CONSTRAINT idx_19234_primary PRIMARY KEY (id);


--
-- Name: job_posters idx_19243_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_posters
    ADD CONSTRAINT idx_19243_primary PRIMARY KEY (id);


--
-- Name: job_poster_key_tasks idx_19249_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_key_tasks
    ADD CONSTRAINT idx_19249_primary PRIMARY KEY (id);


--
-- Name: job_poster_key_task_translations idx_19255_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_key_task_translations
    ADD CONSTRAINT idx_19255_primary PRIMARY KEY (id);


--
-- Name: job_poster_questions idx_19264_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_questions
    ADD CONSTRAINT idx_19264_primary PRIMARY KEY (id);


--
-- Name: job_poster_question_translations idx_19270_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_question_translations
    ADD CONSTRAINT idx_19270_primary PRIMARY KEY (id);


--
-- Name: job_poster_translations idx_19279_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_translations
    ADD CONSTRAINT idx_19279_primary PRIMARY KEY (id);


--
-- Name: job_terms idx_19288_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_terms
    ADD CONSTRAINT idx_19288_primary PRIMARY KEY (id);


--
-- Name: job_term_translations idx_19294_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_term_translations
    ADD CONSTRAINT idx_19294_primary PRIMARY KEY (id);


--
-- Name: language_requirements idx_19300_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.language_requirements
    ADD CONSTRAINT idx_19300_primary PRIMARY KEY (id);


--
-- Name: language_requirement_translations idx_19306_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.language_requirement_translations
    ADD CONSTRAINT idx_19306_primary PRIMARY KEY (id);


--
-- Name: managers idx_19312_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers
    ADD CONSTRAINT idx_19312_primary PRIMARY KEY (id);


--
-- Name: manager_translations idx_19318_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.manager_translations
    ADD CONSTRAINT idx_19318_primary PRIMARY KEY (id);


--
-- Name: micro_references idx_19327_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.micro_references
    ADD CONSTRAINT idx_19327_primary PRIMARY KEY (id);


--
-- Name: migrations idx_19336_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.migrations
    ADD CONSTRAINT idx_19336_primary PRIMARY KEY (id);


--
-- Name: profile_pics idx_19342_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.profile_pics
    ADD CONSTRAINT idx_19342_primary PRIMARY KEY (id);


--
-- Name: provinces idx_19351_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.provinces
    ADD CONSTRAINT idx_19351_primary PRIMARY KEY (id);


--
-- Name: province_translations idx_19357_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.province_translations
    ADD CONSTRAINT idx_19357_primary PRIMARY KEY (id);


--
-- Name: relationships idx_19363_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.relationships
    ADD CONSTRAINT idx_19363_primary PRIMARY KEY (id);


--
-- Name: relationship_translations idx_19369_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.relationship_translations
    ADD CONSTRAINT idx_19369_primary PRIMARY KEY (id);


--
-- Name: security_clearances idx_19375_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.security_clearances
    ADD CONSTRAINT idx_19375_primary PRIMARY KEY (id);


--
-- Name: security_clearance_translations idx_19381_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.security_clearance_translations
    ADD CONSTRAINT idx_19381_primary PRIMARY KEY (id);


--
-- Name: skill_declarations idx_19387_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_declarations
    ADD CONSTRAINT idx_19387_primary PRIMARY KEY (id);


--
-- Name: skill_levels idx_19396_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_levels
    ADD CONSTRAINT idx_19396_primary PRIMARY KEY (id);


--
-- Name: skill_level_translations idx_19402_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_level_translations
    ADD CONSTRAINT idx_19402_primary PRIMARY KEY (id);


--
-- Name: team_cultures idx_19408_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.team_cultures
    ADD CONSTRAINT idx_19408_primary PRIMARY KEY (id);


--
-- Name: team_culture_translations idx_19414_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.team_culture_translations
    ADD CONSTRAINT idx_19414_primary PRIMARY KEY (id);


--
-- Name: users idx_19423_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.users
    ADD CONSTRAINT idx_19423_primary PRIMARY KEY (id);


--
-- Name: user_roles idx_19433_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.user_roles
    ADD CONSTRAINT idx_19433_primary PRIMARY KEY (id);


--
-- Name: workplace_photos idx_19439_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.workplace_photos
    ADD CONSTRAINT idx_19439_primary PRIMARY KEY (id);


--
-- Name: workplace_photo_captions idx_19448_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.workplace_photo_captions
    ADD CONSTRAINT idx_19448_primary PRIMARY KEY (id);


--
-- Name: work_environments idx_19457_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.work_environments
    ADD CONSTRAINT idx_19457_primary PRIMARY KEY (id);


--
-- Name: work_samples idx_19463_primary; Type: CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.work_samples
    ADD CONSTRAINT idx_19463_primary PRIMARY KEY (id);


--
-- Name: applicant_profile_answers_applicant_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX applicant_profile_answers_applicant_id_index ON public.applicant_profile_answers USING btree (applicant_id);


--
-- Name: applicant_profile_answers_applicant_profile_question_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX applicant_profile_answers_applicant_profile_question_id_index ON public.applicant_profile_answers USING btree (applicant_profile_question_id);


--
-- Name: applicant_profile_question_trans_applicant_profile_question_idx; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX applicant_profile_question_trans_applicant_profile_question_idx ON public.applicant_profile_question_translations USING btree (applicant_profile_question_id);


--
-- Name: application_micro_references_criteria_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX application_micro_references_criteria_id_index ON public.application_micro_references USING btree (criteria_id);


--
-- Name: application_micro_references_job_application_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX application_micro_references_job_application_id_index ON public.application_micro_references USING btree (job_application_id);


--
-- Name: application_micro_references_micro_reference_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX application_micro_references_micro_reference_id_index ON public.application_micro_references USING btree (micro_reference_id);


--
-- Name: application_status_translations_application_status_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX application_status_translations_application_status_id_index ON public.application_status_translations USING btree (application_status_id);


--
-- Name: application_work_samples_criteria_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX application_work_samples_criteria_id_index ON public.application_work_samples USING btree (criteria_id);


--
-- Name: application_work_samples_job_application_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX application_work_samples_job_application_id_index ON public.application_work_samples USING btree (job_application_id);


--
-- Name: application_work_samples_work_sample_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX application_work_samples_work_sample_id_index ON public.application_work_samples USING btree (work_sample_id);


--
-- Name: citizenship_declaration_trans_citizenship_declaration_id_idx; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX citizenship_declaration_trans_citizenship_declaration_id_idx ON public.citizenship_declaration_translations USING btree (citizenship_declaration_id);


--
-- Name: criteria_criteria_type_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX criteria_criteria_type_id_index ON public.criteria USING btree (criteria_type_id);


--
-- Name: criteria_job_poster_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX criteria_job_poster_id_index ON public.criteria USING btree (job_poster_id);


--
-- Name: criteria_translations_criteria_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX criteria_translations_criteria_id_index ON public.criteria_translations USING btree (criteria_id);


--
-- Name: criteria_translations_name_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX criteria_translations_name_index ON public.criteria_translations USING btree (name);


--
-- Name: criteria_type_translations_criteria_type_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX criteria_type_translations_criteria_type_id_index ON public.criteria_type_translations USING btree (criteria_type_id);


--
-- Name: department_translations_department_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX department_translations_department_id_index ON public.department_translations USING btree (department_id);


--
-- Name: experience_level_translations_experience_level_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX experience_level_translations_experience_level_id_index ON public.experience_level_translations USING btree (experience_level_id);


--
-- Name: file_type_translations_file_type_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX file_type_translations_file_type_id_index ON public.file_type_translations USING btree (file_type_id);


--
-- Name: job_application_answers_job_application_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_application_answers_job_application_id_index ON public.job_application_answers USING btree (job_application_id);


--
-- Name: job_application_answers_job_poster_questions_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_application_answers_job_poster_questions_id_index ON public.job_application_answers USING btree (job_poster_questions_id);


--
-- Name: job_applications_applicant_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_applications_applicant_id_index ON public.job_applications USING btree (applicant_id);


--
-- Name: job_applications_application_status_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_applications_application_status_id_index ON public.job_applications USING btree (application_status_id);


--
-- Name: job_applications_job_poster_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_applications_job_poster_id_index ON public.job_applications USING btree (job_poster_id);


--
-- Name: job_poster_key_task_translations_job_poster_key_task_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_poster_key_task_translations_job_poster_key_task_id_index ON public.job_poster_key_task_translations USING btree (job_poster_key_task_id);


--
-- Name: job_poster_key_tasks_job_poster_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_poster_key_tasks_job_poster_id_index ON public.job_poster_key_tasks USING btree (job_poster_id);


--
-- Name: job_poster_question_translations_job_poster_question_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_poster_question_translations_job_poster_question_id_index ON public.job_poster_question_translations USING btree (job_poster_question_id);


--
-- Name: job_poster_questions_job_poster_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_poster_questions_job_poster_id_index ON public.job_poster_questions USING btree (job_poster_id);


--
-- Name: job_poster_translations_job_poster_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_poster_translations_job_poster_id_index ON public.job_poster_translations USING btree (job_poster_id);


--
-- Name: job_posters_department_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_posters_department_id_index ON public.job_posters USING btree (department_id);


--
-- Name: job_posters_job_term_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_posters_job_term_id_index ON public.job_posters USING btree (job_term_id);


--
-- Name: job_posters_language_requirement_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_posters_language_requirement_id_index ON public.job_posters USING btree (language_requirement_id);


--
-- Name: job_posters_manager_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_posters_manager_id_index ON public.job_posters USING btree (manager_id);


--
-- Name: job_posters_province_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_posters_province_id_index ON public.job_posters USING btree (province_id);


--
-- Name: job_posters_security_clearance_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_posters_security_clearance_id_index ON public.job_posters USING btree (security_clearance_id);


--
-- Name: job_term_translations_job_term_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX job_term_translations_job_term_id_index ON public.job_term_translations USING btree (job_term_id);


--
-- Name: language_requirement_translations_language_requirement_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX language_requirement_translations_language_requirement_id_index ON public.language_requirement_translations USING btree (language_requirement_id);


--
-- Name: manager_translations_manager_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX manager_translations_manager_id_index ON public.manager_translations USING btree (manager_id);


--
-- Name: managers_department_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX managers_department_id_index ON public.managers USING btree (department_id);


--
-- Name: micro_references_experience_level_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX micro_references_experience_level_id_index ON public.micro_references USING btree (experience_level_id);


--
-- Name: micro_references_relationship_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX micro_references_relationship_id_index ON public.micro_references USING btree (relationship_id);


--
-- Name: province_translations_province_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX province_translations_province_id_index ON public.province_translations USING btree (province_id);


--
-- Name: relationship_translations_relationship_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX relationship_translations_relationship_id_index ON public.relationship_translations USING btree (relationship_id);


--
-- Name: security_clearance_translations_security_clearance_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX security_clearance_translations_security_clearance_id_index ON public.security_clearance_translations USING btree (security_clearance_id);


--
-- Name: skill_declarations_criteria_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX skill_declarations_criteria_id_index ON public.skill_declarations USING btree (criteria_id);


--
-- Name: skill_declarations_experience_level_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX skill_declarations_experience_level_id_index ON public.skill_declarations USING btree (experience_level_id);


--
-- Name: skill_declarations_job_application_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX skill_declarations_job_application_id_index ON public.skill_declarations USING btree (job_application_id);


--
-- Name: skill_declarations_skill_level_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX skill_declarations_skill_level_id_index ON public.skill_declarations USING btree (skill_level_id);


--
-- Name: skill_level_translations_skill_level_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX skill_level_translations_skill_level_id_index ON public.skill_level_translations USING btree (skill_level_id);


--
-- Name: team_culture_translations_team_culture_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX team_culture_translations_team_culture_id_index ON public.team_culture_translations USING btree (team_culture_id);


--
-- Name: users_name_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX users_name_index ON public.users USING btree (name);


--
-- Name: users_user_role_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX users_user_role_id_index ON public.users USING btree (user_role_id);


--
-- Name: work_samples_file_type_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX work_samples_file_type_id_index ON public.work_samples USING btree (file_type_id);


--
-- Name: workplace_photo_captions_work_environment_id_index; Type: INDEX; Schema: public; Owner: talentcloud
--

CREATE INDEX workplace_photo_captions_work_environment_id_index ON public.workplace_photo_captions USING btree (work_environment_id);


--
-- Name: idx_19073_applicants_user_id_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19073_applicants_user_id_unique ON talentcloud.applicants USING btree (user_id);


--
-- Name: idx_19082_app_profile_answers_app_id_app_profile_question_id_un; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19082_app_profile_answers_app_id_app_profile_question_id_un ON talentcloud.applicant_profile_answers USING btree (applicant_id, applicant_profile_question_id);


--
-- Name: idx_19082_applicant_profile_answers_applicant_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19082_applicant_profile_answers_applicant_id_index ON talentcloud.applicant_profile_answers USING btree (applicant_id);


--
-- Name: idx_19082_applicant_profile_answers_applicant_profile_question_; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19082_applicant_profile_answers_applicant_profile_question_ ON talentcloud.applicant_profile_answers USING btree (applicant_profile_question_id);


--
-- Name: idx_19097_app_profile_ques_trans_app_profile_question_id_locale; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19097_app_profile_ques_trans_app_profile_question_id_locale ON talentcloud.applicant_profile_question_translations USING btree (applicant_profile_question_id, locale);


--
-- Name: idx_19097_applicant_profile_question_trans_applicant_profile_qu; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19097_applicant_profile_question_trans_applicant_profile_qu ON talentcloud.applicant_profile_question_translations USING btree (applicant_profile_question_id);


--
-- Name: idx_19106_application_micro_references_criteria_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19106_application_micro_references_criteria_id_index ON talentcloud.application_micro_references USING btree (criteria_id);


--
-- Name: idx_19106_application_micro_references_job_application_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19106_application_micro_references_job_application_id_index ON talentcloud.application_micro_references USING btree (job_application_id);


--
-- Name: idx_19106_application_micro_references_micro_reference_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19106_application_micro_references_micro_reference_id_index ON talentcloud.application_micro_references USING btree (micro_reference_id);


--
-- Name: idx_19119_application_status_trans_application_status_id_locale; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19119_application_status_trans_application_status_id_locale ON talentcloud.application_status_translations USING btree (application_status_id, locale);


--
-- Name: idx_19119_application_status_translations_application_status_id; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19119_application_status_translations_application_status_id ON talentcloud.application_status_translations USING btree (application_status_id);


--
-- Name: idx_19125_application_work_samples_criteria_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19125_application_work_samples_criteria_id_index ON talentcloud.application_work_samples USING btree (criteria_id);


--
-- Name: idx_19125_application_work_samples_job_application_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19125_application_work_samples_job_application_id_index ON talentcloud.application_work_samples USING btree (job_application_id);


--
-- Name: idx_19125_application_work_samples_work_sample_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19125_application_work_samples_work_sample_id_index ON talentcloud.application_work_samples USING btree (work_sample_id);


--
-- Name: idx_19141_citiz_declaration_trans_citiz_declaration_id_locale_u; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19141_citiz_declaration_trans_citiz_declaration_id_locale_u ON talentcloud.citizenship_declaration_translations USING btree (citizenship_declaration_id, locale);


--
-- Name: idx_19141_citizenship_declaration_trans_citizenship_declaration; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19141_citizenship_declaration_trans_citizenship_declaration ON talentcloud.citizenship_declaration_translations USING btree (citizenship_declaration_id);


--
-- Name: idx_19150_criteria_criteria_type_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19150_criteria_criteria_type_id_index ON talentcloud.criteria USING btree (criteria_type_id);


--
-- Name: idx_19150_criteria_job_poster_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19150_criteria_job_poster_id_index ON talentcloud.criteria USING btree (job_poster_id);


--
-- Name: idx_19156_criteria_translations_criteria_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19156_criteria_translations_criteria_id_index ON talentcloud.criteria_translations USING btree (criteria_id);


--
-- Name: idx_19156_criteria_translations_criteria_id_locale_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19156_criteria_translations_criteria_id_locale_unique ON talentcloud.criteria_translations USING btree (criteria_id, locale);


--
-- Name: idx_19156_criteria_translations_name_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19156_criteria_translations_name_index ON talentcloud.criteria_translations USING btree (name);


--
-- Name: idx_19171_criteria_type_translations_criteria_type_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19171_criteria_type_translations_criteria_type_id_index ON talentcloud.criteria_type_translations USING btree (criteria_type_id);


--
-- Name: idx_19186_department_translations_department_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19186_department_translations_department_id_index ON talentcloud.department_translations USING btree (department_id);


--
-- Name: idx_19186_department_translations_department_id_locale_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19186_department_translations_department_id_locale_unique ON talentcloud.department_translations USING btree (department_id, locale);


--
-- Name: idx_19198_experience_level_translations_experience_level_id_ind; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19198_experience_level_translations_experience_level_id_ind ON talentcloud.experience_level_translations USING btree (experience_level_id);


--
-- Name: idx_19198_experience_level_translations_experience_level_id_loc; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19198_experience_level_translations_experience_level_id_loc ON talentcloud.experience_level_translations USING btree (experience_level_id, locale);


--
-- Name: idx_19210_file_type_translations_file_type_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19210_file_type_translations_file_type_id_index ON talentcloud.file_type_translations USING btree (file_type_id);


--
-- Name: idx_19210_file_type_translations_file_type_id_locale_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19210_file_type_translations_file_type_id_locale_unique ON talentcloud.file_type_translations USING btree (file_type_id, locale);


--
-- Name: idx_19228_job_applications_applicant_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19228_job_applications_applicant_id_index ON talentcloud.job_applications USING btree (applicant_id);


--
-- Name: idx_19228_job_applications_application_status_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19228_job_applications_application_status_id_index ON talentcloud.job_applications USING btree (application_status_id);


--
-- Name: idx_19228_job_applications_job_poster_id_applicant_id_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19228_job_applications_job_poster_id_applicant_id_unique ON talentcloud.job_applications USING btree (job_poster_id, applicant_id);


--
-- Name: idx_19228_job_applications_job_poster_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19228_job_applications_job_poster_id_index ON talentcloud.job_applications USING btree (job_poster_id);


--
-- Name: idx_19234_job_appl_ans_job_poster_ques_id_job_appl_id_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19234_job_appl_ans_job_poster_ques_id_job_appl_id_unique ON talentcloud.job_application_answers USING btree (job_poster_questions_id, job_application_id);


--
-- Name: idx_19234_job_application_answers_job_application_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19234_job_application_answers_job_application_id_index ON talentcloud.job_application_answers USING btree (job_application_id);


--
-- Name: idx_19234_job_application_answers_job_poster_questions_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19234_job_application_answers_job_poster_questions_id_index ON talentcloud.job_application_answers USING btree (job_poster_questions_id);


--
-- Name: idx_19243_job_posters_department_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19243_job_posters_department_id_index ON talentcloud.job_posters USING btree (department_id);


--
-- Name: idx_19243_job_posters_job_term_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19243_job_posters_job_term_id_index ON talentcloud.job_posters USING btree (job_term_id);


--
-- Name: idx_19243_job_posters_language_requirement_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19243_job_posters_language_requirement_id_index ON talentcloud.job_posters USING btree (language_requirement_id);


--
-- Name: idx_19243_job_posters_manager_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19243_job_posters_manager_id_index ON talentcloud.job_posters USING btree (manager_id);


--
-- Name: idx_19243_job_posters_province_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19243_job_posters_province_id_index ON talentcloud.job_posters USING btree (province_id);


--
-- Name: idx_19243_job_posters_security_clearance_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19243_job_posters_security_clearance_id_index ON talentcloud.job_posters USING btree (security_clearance_id);


--
-- Name: idx_19249_job_poster_key_tasks_job_poster_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19249_job_poster_key_tasks_job_poster_id_index ON talentcloud.job_poster_key_tasks USING btree (job_poster_id);


--
-- Name: idx_19255_job_poster_key_task_trans_job_poster_key_task_id_loca; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19255_job_poster_key_task_trans_job_poster_key_task_id_loca ON talentcloud.job_poster_key_task_translations USING btree (job_poster_key_task_id, locale);


--
-- Name: idx_19255_job_poster_key_task_translations_job_poster_key_task_; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19255_job_poster_key_task_translations_job_poster_key_task_ ON talentcloud.job_poster_key_task_translations USING btree (job_poster_key_task_id);


--
-- Name: idx_19264_job_poster_questions_job_poster_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19264_job_poster_questions_job_poster_id_index ON talentcloud.job_poster_questions USING btree (job_poster_id);


--
-- Name: idx_19270_job_poster_question_trans_job_poster_question_id_loca; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19270_job_poster_question_trans_job_poster_question_id_loca ON talentcloud.job_poster_question_translations USING btree (job_poster_question_id, locale);


--
-- Name: idx_19270_job_poster_question_translations_job_poster_question_; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19270_job_poster_question_translations_job_poster_question_ ON talentcloud.job_poster_question_translations USING btree (job_poster_question_id);


--
-- Name: idx_19279_job_poster_translations_job_poster_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19279_job_poster_translations_job_poster_id_index ON talentcloud.job_poster_translations USING btree (job_poster_id);


--
-- Name: idx_19279_job_poster_translations_job_poster_id_locale_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19279_job_poster_translations_job_poster_id_locale_unique ON talentcloud.job_poster_translations USING btree (job_poster_id, locale);


--
-- Name: idx_19294_job_term_translations_job_term_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19294_job_term_translations_job_term_id_index ON talentcloud.job_term_translations USING btree (job_term_id);


--
-- Name: idx_19294_job_term_translations_job_term_id_locale_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19294_job_term_translations_job_term_id_locale_unique ON talentcloud.job_term_translations USING btree (job_term_id, locale);


--
-- Name: idx_19306_lang_requirement_trans_lang_requirement_id_locale_uni; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19306_lang_requirement_trans_lang_requirement_id_locale_uni ON talentcloud.language_requirement_translations USING btree (language_requirement_id, locale);


--
-- Name: idx_19306_language_requirement_translations_language_requiremen; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19306_language_requirement_translations_language_requiremen ON talentcloud.language_requirement_translations USING btree (language_requirement_id);


--
-- Name: idx_19312_managers_department_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19312_managers_department_id_index ON talentcloud.managers USING btree (department_id);


--
-- Name: idx_19312_managers_development_opportunity_frequency_id_foreign; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19312_managers_development_opportunity_frequency_id_foreign ON talentcloud.managers USING btree (development_opportunity_frequency_id);


--
-- Name: idx_19312_managers_engage_team_frequency_id_foreign; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19312_managers_engage_team_frequency_id_foreign ON talentcloud.managers USING btree (engage_team_frequency_id);


--
-- Name: idx_19312_managers_refuse_low_value_work_frequency_id_foreign; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19312_managers_refuse_low_value_work_frequency_id_foreign ON talentcloud.managers USING btree (refuse_low_value_work_frequency_id);


--
-- Name: idx_19312_managers_stay_late_frequency_id_foreign; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19312_managers_stay_late_frequency_id_foreign ON talentcloud.managers USING btree (stay_late_frequency_id);


--
-- Name: idx_19312_managers_user_id_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19312_managers_user_id_unique ON talentcloud.managers USING btree (user_id);


--
-- Name: idx_19312_managers_work_review_frequency_id_foreign; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19312_managers_work_review_frequency_id_foreign ON talentcloud.managers USING btree (work_review_frequency_id);


--
-- Name: idx_19318_manager_translations_manager_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19318_manager_translations_manager_id_index ON talentcloud.manager_translations USING btree (manager_id);


--
-- Name: idx_19318_manager_translations_manager_id_locale_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19318_manager_translations_manager_id_locale_unique ON talentcloud.manager_translations USING btree (manager_id, locale);


--
-- Name: idx_19327_micro_references_experience_level_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19327_micro_references_experience_level_id_index ON talentcloud.micro_references USING btree (experience_level_id);


--
-- Name: idx_19327_micro_references_relationship_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19327_micro_references_relationship_id_index ON talentcloud.micro_references USING btree (relationship_id);


--
-- Name: idx_19342_profile_pics_user_id_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19342_profile_pics_user_id_unique ON talentcloud.profile_pics USING btree (user_id);


--
-- Name: idx_19357_province_translations_province_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19357_province_translations_province_id_index ON talentcloud.province_translations USING btree (province_id);


--
-- Name: idx_19357_province_translations_province_id_locale_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19357_province_translations_province_id_locale_unique ON talentcloud.province_translations USING btree (province_id, locale);


--
-- Name: idx_19369_relationship_translations_relationship_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19369_relationship_translations_relationship_id_index ON talentcloud.relationship_translations USING btree (relationship_id);


--
-- Name: idx_19369_relationship_translations_relationship_id_locale_uniq; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19369_relationship_translations_relationship_id_locale_uniq ON talentcloud.relationship_translations USING btree (relationship_id, locale);


--
-- Name: idx_19381_security_clearance_trans_security_clearance_id_locale; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19381_security_clearance_trans_security_clearance_id_locale ON talentcloud.security_clearance_translations USING btree (security_clearance_id, locale);


--
-- Name: idx_19381_security_clearance_translations_security_clearance_id; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19381_security_clearance_translations_security_clearance_id ON talentcloud.security_clearance_translations USING btree (security_clearance_id);


--
-- Name: idx_19387_skill_declarations_criteria_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19387_skill_declarations_criteria_id_index ON talentcloud.skill_declarations USING btree (criteria_id);


--
-- Name: idx_19387_skill_declarations_criteria_id_job_application_id_uni; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19387_skill_declarations_criteria_id_job_application_id_uni ON talentcloud.skill_declarations USING btree (criteria_id, job_application_id);


--
-- Name: idx_19387_skill_declarations_experience_level_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19387_skill_declarations_experience_level_id_index ON talentcloud.skill_declarations USING btree (experience_level_id);


--
-- Name: idx_19387_skill_declarations_job_application_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19387_skill_declarations_job_application_id_index ON talentcloud.skill_declarations USING btree (job_application_id);


--
-- Name: idx_19387_skill_declarations_skill_level_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19387_skill_declarations_skill_level_id_index ON talentcloud.skill_declarations USING btree (skill_level_id);


--
-- Name: idx_19402_skill_level_translations_skill_level_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19402_skill_level_translations_skill_level_id_index ON talentcloud.skill_level_translations USING btree (skill_level_id);


--
-- Name: idx_19402_skill_level_translations_skill_level_id_locale_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19402_skill_level_translations_skill_level_id_locale_unique ON talentcloud.skill_level_translations USING btree (skill_level_id, locale);


--
-- Name: idx_19408_team_cultures_manager_id_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19408_team_cultures_manager_id_unique ON talentcloud.team_cultures USING btree (manager_id);


--
-- Name: idx_19414_team_culture_translations_team_culture_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19414_team_culture_translations_team_culture_id_index ON talentcloud.team_culture_translations USING btree (team_culture_id);


--
-- Name: idx_19414_team_culture_translations_team_culture_id_locale_uniq; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19414_team_culture_translations_team_culture_id_locale_uniq ON talentcloud.team_culture_translations USING btree (team_culture_id, locale);


--
-- Name: idx_19423_users_email_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19423_users_email_unique ON talentcloud.users USING btree (email);


--
-- Name: idx_19423_users_name_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19423_users_name_index ON talentcloud.users USING btree (name);


--
-- Name: idx_19423_users_open_id_sub_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19423_users_open_id_sub_unique ON talentcloud.users USING btree (open_id_sub);


--
-- Name: idx_19423_users_user_role_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19423_users_user_role_id_index ON talentcloud.users USING btree (user_role_id);


--
-- Name: idx_19448_workplace_photo_captions_work_environment_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19448_workplace_photo_captions_work_environment_id_index ON talentcloud.workplace_photo_captions USING btree (work_environment_id);


--
-- Name: idx_19448_workplace_photo_captions_work_environment_id_photo_na; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19448_workplace_photo_captions_work_environment_id_photo_na ON talentcloud.workplace_photo_captions USING btree (work_environment_id, photo_name);


--
-- Name: idx_19448_workplace_photo_captions_workplace_photo_id_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19448_workplace_photo_captions_workplace_photo_id_unique ON talentcloud.workplace_photo_captions USING btree (workplace_photo_id);


--
-- Name: idx_19457_work_environments_flexible_hours_frequency_id_foreign; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19457_work_environments_flexible_hours_frequency_id_foreign ON talentcloud.work_environments USING btree (flexible_hours_frequency_id);


--
-- Name: idx_19457_work_environments_manager_id_unique; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE UNIQUE INDEX idx_19457_work_environments_manager_id_unique ON talentcloud.work_environments USING btree (manager_id);


--
-- Name: idx_19457_work_environments_telework_allowed_frequency_id_forei; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19457_work_environments_telework_allowed_frequency_id_forei ON talentcloud.work_environments USING btree (telework_allowed_frequency_id);


--
-- Name: idx_19463_work_samples_file_type_id_index; Type: INDEX; Schema: talentcloud; Owner: talentcloud
--

CREATE INDEX idx_19463_work_samples_file_type_id_index ON talentcloud.work_samples USING btree (file_type_id);


--
-- Name: applicant_profile_answers applicant_profile_answers_applicant_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_answers
    ADD CONSTRAINT applicant_profile_answers_applicant_id_foreign FOREIGN KEY (applicant_id) REFERENCES public.applicants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: applicant_profile_answers applicant_profile_answers_applicant_profile_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_answers
    ADD CONSTRAINT applicant_profile_answers_applicant_profile_question_id_foreign FOREIGN KEY (applicant_profile_question_id) REFERENCES public.applicant_profile_questions(id) ON UPDATE CASCADE;


--
-- Name: applicant_profile_question_translations applicant_profile_question_trans_applicant_profile_question_fk; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicant_profile_question_translations
    ADD CONSTRAINT applicant_profile_question_trans_applicant_profile_question_fk FOREIGN KEY (applicant_profile_question_id) REFERENCES public.applicant_profile_questions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: applicants applicants_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_micro_references application_micro_references_criteria_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_micro_references
    ADD CONSTRAINT application_micro_references_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES public.criteria(id) ON UPDATE CASCADE;


--
-- Name: application_micro_references application_micro_references_job_application_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_micro_references
    ADD CONSTRAINT application_micro_references_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES public.job_applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_micro_references application_micro_references_micro_reference_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_micro_references
    ADD CONSTRAINT application_micro_references_micro_reference_id_foreign FOREIGN KEY (micro_reference_id) REFERENCES public.micro_references(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_status_translations application_status_translations_application_status_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_status_translations
    ADD CONSTRAINT application_status_translations_application_status_id_foreign FOREIGN KEY (application_status_id) REFERENCES public.application_status(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_work_samples application_work_samples_criteria_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_work_samples
    ADD CONSTRAINT application_work_samples_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES public.criteria(id) ON UPDATE CASCADE;


--
-- Name: application_work_samples application_work_samples_job_application_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_work_samples
    ADD CONSTRAINT application_work_samples_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES public.job_applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_work_samples application_work_samples_work_sample_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.application_work_samples
    ADD CONSTRAINT application_work_samples_work_sample_id_foreign FOREIGN KEY (work_sample_id) REFERENCES public.work_samples(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: citizenship_declaration_translations citizenship_declaration_trans_citizenship_declaration_fk; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.citizenship_declaration_translations
    ADD CONSTRAINT citizenship_declaration_trans_citizenship_declaration_fk FOREIGN KEY (citizenship_declaration_id) REFERENCES public.citizenship_declarations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: criteria criteria_criteria_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria
    ADD CONSTRAINT criteria_criteria_type_id_foreign FOREIGN KEY (criteria_type_id) REFERENCES public.criteria_types(id) ON UPDATE CASCADE;


--
-- Name: criteria criteria_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria
    ADD CONSTRAINT criteria_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES public.job_posters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: criteria_translations criteria_translations_criteria_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_translations
    ADD CONSTRAINT criteria_translations_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES public.criteria(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: criteria_type_translations criteria_type_translations_criteria_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.criteria_type_translations
    ADD CONSTRAINT criteria_type_translations_criteria_type_id_foreign FOREIGN KEY (criteria_type_id) REFERENCES public.criteria_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: department_translations department_translations_department_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.department_translations
    ADD CONSTRAINT department_translations_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: experience_level_translations experience_level_translations_experience_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.experience_level_translations
    ADD CONSTRAINT experience_level_translations_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES public.experience_levels(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: file_type_translations file_type_translations_file_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.file_type_translations
    ADD CONSTRAINT file_type_translations_file_type_id_foreign FOREIGN KEY (file_type_id) REFERENCES public.file_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_application_answers job_application_answers_job_application_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_application_answers
    ADD CONSTRAINT job_application_answers_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES public.job_applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_application_answers job_application_answers_job_poster_questions_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_application_answers
    ADD CONSTRAINT job_application_answers_job_poster_questions_id_foreign FOREIGN KEY (job_poster_questions_id) REFERENCES public.job_poster_questions(id) ON UPDATE CASCADE;


--
-- Name: job_applications job_applications_applicant_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_applicant_id_foreign FOREIGN KEY (applicant_id) REFERENCES public.applicants(id) ON UPDATE CASCADE;


--
-- Name: job_applications job_applications_application_status_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_application_status_id_foreign FOREIGN KEY (application_status_id) REFERENCES public.application_status(id) ON UPDATE CASCADE;


--
-- Name: job_applications job_applications_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES public.job_posters(id) ON UPDATE CASCADE;


--
-- Name: job_poster_key_task_translations job_poster_key_task_translations_job_poster_key_task_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_key_task_translations
    ADD CONSTRAINT job_poster_key_task_translations_job_poster_key_task_id_foreign FOREIGN KEY (job_poster_key_task_id) REFERENCES public.job_poster_key_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_poster_key_tasks job_poster_key_tasks_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_key_tasks
    ADD CONSTRAINT job_poster_key_tasks_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES public.job_posters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_poster_question_translations job_poster_question_translations_job_poster_question_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_question_translations
    ADD CONSTRAINT job_poster_question_translations_job_poster_question_id_foreign FOREIGN KEY (job_poster_question_id) REFERENCES public.job_poster_questions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_poster_questions job_poster_questions_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_questions
    ADD CONSTRAINT job_poster_questions_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES public.job_posters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_poster_translations job_poster_translations_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_poster_translations
    ADD CONSTRAINT job_poster_translations_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES public.job_posters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_posters job_posters_department_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_posters
    ADD CONSTRAINT job_posters_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_job_term_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_posters
    ADD CONSTRAINT job_posters_job_term_id_foreign FOREIGN KEY (job_term_id) REFERENCES public.job_terms(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_language_requirement_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_posters
    ADD CONSTRAINT job_posters_language_requirement_id_foreign FOREIGN KEY (language_requirement_id) REFERENCES public.language_requirements(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_manager_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_posters
    ADD CONSTRAINT job_posters_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES public.managers(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_province_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_posters
    ADD CONSTRAINT job_posters_province_id_foreign FOREIGN KEY (province_id) REFERENCES public.provinces(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_security_clearance_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_posters
    ADD CONSTRAINT job_posters_security_clearance_id_foreign FOREIGN KEY (security_clearance_id) REFERENCES public.security_clearances(id) ON UPDATE CASCADE;


--
-- Name: job_term_translations job_term_translations_job_term_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.job_term_translations
    ADD CONSTRAINT job_term_translations_job_term_id_foreign FOREIGN KEY (job_term_id) REFERENCES public.job_terms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: language_requirement_translations language_requirement_trans_language_requirement_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.language_requirement_translations
    ADD CONSTRAINT language_requirement_trans_language_requirement_foreign FOREIGN KEY (language_requirement_id) REFERENCES public.language_requirements(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: manager_translations manager_translations_manager_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.manager_translations
    ADD CONSTRAINT manager_translations_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES public.managers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: managers managers_department_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_department_id_foreign FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE;


--
-- Name: managers managers_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: micro_references micro_references_experience_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.micro_references
    ADD CONSTRAINT micro_references_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES public.experience_levels(id) ON UPDATE CASCADE;


--
-- Name: micro_references micro_references_relationship_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.micro_references
    ADD CONSTRAINT micro_references_relationship_id_foreign FOREIGN KEY (relationship_id) REFERENCES public.relationships(id) ON UPDATE CASCADE;


--
-- Name: profile_pics profile_pics_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.profile_pics
    ADD CONSTRAINT profile_pics_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: province_translations province_translations_province_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.province_translations
    ADD CONSTRAINT province_translations_province_id_foreign FOREIGN KEY (province_id) REFERENCES public.provinces(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: relationship_translations relationship_translations_relationship_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.relationship_translations
    ADD CONSTRAINT relationship_translations_relationship_id_foreign FOREIGN KEY (relationship_id) REFERENCES public.relationships(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: security_clearance_translations security_clearance_translations_security_clearance_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.security_clearance_translations
    ADD CONSTRAINT security_clearance_translations_security_clearance_id_foreign FOREIGN KEY (security_clearance_id) REFERENCES public.security_clearances(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: skill_declarations skill_declarations_criteria_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_declarations
    ADD CONSTRAINT skill_declarations_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES public.criteria(id) ON UPDATE CASCADE;


--
-- Name: skill_declarations skill_declarations_experience_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_declarations
    ADD CONSTRAINT skill_declarations_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES public.experience_levels(id) ON UPDATE CASCADE;


--
-- Name: skill_declarations skill_declarations_job_application_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_declarations
    ADD CONSTRAINT skill_declarations_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES public.job_applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: skill_declarations skill_declarations_skill_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_declarations
    ADD CONSTRAINT skill_declarations_skill_level_id_foreign FOREIGN KEY (skill_level_id) REFERENCES public.skill_levels(id) ON UPDATE CASCADE;


--
-- Name: skill_level_translations skill_level_translations_skill_level_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.skill_level_translations
    ADD CONSTRAINT skill_level_translations_skill_level_id_foreign FOREIGN KEY (skill_level_id) REFERENCES public.skill_levels(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_culture_translations team_culture_translations_team_culture_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.team_culture_translations
    ADD CONSTRAINT team_culture_translations_team_culture_id_foreign FOREIGN KEY (team_culture_id) REFERENCES public.team_cultures(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_cultures team_cultures_manager_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.team_cultures
    ADD CONSTRAINT team_cultures_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES public.managers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_user_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_role_id_foreign FOREIGN KEY (user_role_id) REFERENCES public.user_roles(id);


--
-- Name: work_environments work_environments_manager_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.work_environments
    ADD CONSTRAINT work_environments_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES public.managers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: work_samples work_samples_file_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.work_samples
    ADD CONSTRAINT work_samples_file_type_id_foreign FOREIGN KEY (file_type_id) REFERENCES public.file_types(id) ON UPDATE CASCADE;


--
-- Name: workplace_photo_captions workplace_photo_captions_work_environment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.workplace_photo_captions
    ADD CONSTRAINT workplace_photo_captions_work_environment_id_foreign FOREIGN KEY (work_environment_id) REFERENCES public.work_environments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: workplace_photo_captions workplace_photo_captions_workplace_photo_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: talentcloud
--

ALTER TABLE ONLY public.workplace_photo_captions
    ADD CONSTRAINT workplace_photo_captions_workplace_photo_id_foreign FOREIGN KEY (workplace_photo_id) REFERENCES public.workplace_photos(id) ON UPDATE CASCADE;


--
-- Name: applicant_profile_answers applicant_profile_answers_applicant_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_answers
    ADD CONSTRAINT applicant_profile_answers_applicant_id_foreign FOREIGN KEY (applicant_id) REFERENCES talentcloud.applicants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: applicant_profile_answers applicant_profile_answers_applicant_profile_question_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_answers
    ADD CONSTRAINT applicant_profile_answers_applicant_profile_question_id_foreign FOREIGN KEY (applicant_profile_question_id) REFERENCES talentcloud.applicant_profile_questions(id) ON UPDATE CASCADE;


--
-- Name: applicant_profile_question_translations applicant_profile_question_trans_applicant_profile_question_fk; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicant_profile_question_translations
    ADD CONSTRAINT applicant_profile_question_trans_applicant_profile_question_fk FOREIGN KEY (applicant_profile_question_id) REFERENCES talentcloud.applicant_profile_questions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: applicants applicants_user_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.applicants
    ADD CONSTRAINT applicants_user_id_foreign FOREIGN KEY (user_id) REFERENCES talentcloud.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_micro_references application_micro_references_criteria_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_micro_references
    ADD CONSTRAINT application_micro_references_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES talentcloud.criteria(id) ON UPDATE CASCADE;


--
-- Name: application_micro_references application_micro_references_job_application_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_micro_references
    ADD CONSTRAINT application_micro_references_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES talentcloud.job_applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_micro_references application_micro_references_micro_reference_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_micro_references
    ADD CONSTRAINT application_micro_references_micro_reference_id_foreign FOREIGN KEY (micro_reference_id) REFERENCES talentcloud.micro_references(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_status_translations application_status_translations_application_status_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_status_translations
    ADD CONSTRAINT application_status_translations_application_status_id_foreign FOREIGN KEY (application_status_id) REFERENCES talentcloud.application_status(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_work_samples application_work_samples_criteria_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_work_samples
    ADD CONSTRAINT application_work_samples_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES talentcloud.criteria(id) ON UPDATE CASCADE;


--
-- Name: application_work_samples application_work_samples_job_application_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_work_samples
    ADD CONSTRAINT application_work_samples_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES talentcloud.job_applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_work_samples application_work_samples_work_sample_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.application_work_samples
    ADD CONSTRAINT application_work_samples_work_sample_id_foreign FOREIGN KEY (work_sample_id) REFERENCES talentcloud.work_samples(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: citizenship_declaration_translations citizenship_declaration_trans_citizenship_declaration_fk; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.citizenship_declaration_translations
    ADD CONSTRAINT citizenship_declaration_trans_citizenship_declaration_fk FOREIGN KEY (citizenship_declaration_id) REFERENCES talentcloud.citizenship_declarations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: criteria criteria_criteria_type_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria
    ADD CONSTRAINT criteria_criteria_type_id_foreign FOREIGN KEY (criteria_type_id) REFERENCES talentcloud.criteria_types(id) ON UPDATE CASCADE;


--
-- Name: criteria criteria_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria
    ADD CONSTRAINT criteria_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES talentcloud.job_posters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: criteria_translations criteria_translations_criteria_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria_translations
    ADD CONSTRAINT criteria_translations_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES talentcloud.criteria(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: criteria_type_translations criteria_type_translations_criteria_type_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.criteria_type_translations
    ADD CONSTRAINT criteria_type_translations_criteria_type_id_foreign FOREIGN KEY (criteria_type_id) REFERENCES talentcloud.criteria_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: department_translations department_translations_department_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.department_translations
    ADD CONSTRAINT department_translations_department_id_foreign FOREIGN KEY (department_id) REFERENCES talentcloud.departments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: experience_level_translations experience_level_translations_experience_level_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.experience_level_translations
    ADD CONSTRAINT experience_level_translations_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES talentcloud.experience_levels(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: file_type_translations file_type_translations_file_type_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.file_type_translations
    ADD CONSTRAINT file_type_translations_file_type_id_foreign FOREIGN KEY (file_type_id) REFERENCES talentcloud.file_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_application_answers job_application_answers_job_application_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_application_answers
    ADD CONSTRAINT job_application_answers_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES talentcloud.job_applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_application_answers job_application_answers_job_poster_questions_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_application_answers
    ADD CONSTRAINT job_application_answers_job_poster_questions_id_foreign FOREIGN KEY (job_poster_questions_id) REFERENCES talentcloud.job_poster_questions(id) ON UPDATE CASCADE;


--
-- Name: job_applications job_applications_applicant_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_applications
    ADD CONSTRAINT job_applications_applicant_id_foreign FOREIGN KEY (applicant_id) REFERENCES talentcloud.applicants(id) ON UPDATE CASCADE;


--
-- Name: job_applications job_applications_application_status_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_applications
    ADD CONSTRAINT job_applications_application_status_id_foreign FOREIGN KEY (application_status_id) REFERENCES talentcloud.application_status(id) ON UPDATE CASCADE;


--
-- Name: job_applications job_applications_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_applications
    ADD CONSTRAINT job_applications_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES talentcloud.job_posters(id) ON UPDATE CASCADE;


--
-- Name: job_poster_key_task_translations job_poster_key_task_translations_job_poster_key_task_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_key_task_translations
    ADD CONSTRAINT job_poster_key_task_translations_job_poster_key_task_id_foreign FOREIGN KEY (job_poster_key_task_id) REFERENCES talentcloud.job_poster_key_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_poster_key_tasks job_poster_key_tasks_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_key_tasks
    ADD CONSTRAINT job_poster_key_tasks_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES talentcloud.job_posters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_poster_question_translations job_poster_question_translations_job_poster_question_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_question_translations
    ADD CONSTRAINT job_poster_question_translations_job_poster_question_id_foreign FOREIGN KEY (job_poster_question_id) REFERENCES talentcloud.job_poster_questions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_poster_questions job_poster_questions_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_questions
    ADD CONSTRAINT job_poster_questions_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES talentcloud.job_posters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_poster_translations job_poster_translations_job_poster_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_poster_translations
    ADD CONSTRAINT job_poster_translations_job_poster_id_foreign FOREIGN KEY (job_poster_id) REFERENCES talentcloud.job_posters(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: job_posters job_posters_department_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_posters
    ADD CONSTRAINT job_posters_department_id_foreign FOREIGN KEY (department_id) REFERENCES talentcloud.departments(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_job_term_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_posters
    ADD CONSTRAINT job_posters_job_term_id_foreign FOREIGN KEY (job_term_id) REFERENCES talentcloud.job_terms(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_language_requirement_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_posters
    ADD CONSTRAINT job_posters_language_requirement_id_foreign FOREIGN KEY (language_requirement_id) REFERENCES talentcloud.language_requirements(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_manager_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_posters
    ADD CONSTRAINT job_posters_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES talentcloud.managers(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_province_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_posters
    ADD CONSTRAINT job_posters_province_id_foreign FOREIGN KEY (province_id) REFERENCES talentcloud.provinces(id) ON UPDATE CASCADE;


--
-- Name: job_posters job_posters_security_clearance_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_posters
    ADD CONSTRAINT job_posters_security_clearance_id_foreign FOREIGN KEY (security_clearance_id) REFERENCES talentcloud.security_clearances(id) ON UPDATE CASCADE;


--
-- Name: job_term_translations job_term_translations_job_term_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.job_term_translations
    ADD CONSTRAINT job_term_translations_job_term_id_foreign FOREIGN KEY (job_term_id) REFERENCES talentcloud.job_terms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: language_requirement_translations language_requirement_trans_language_requirement_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.language_requirement_translations
    ADD CONSTRAINT language_requirement_trans_language_requirement_foreign FOREIGN KEY (language_requirement_id) REFERENCES talentcloud.language_requirements(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: manager_translations manager_translations_manager_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.manager_translations
    ADD CONSTRAINT manager_translations_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES talentcloud.managers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: managers managers_department_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers
    ADD CONSTRAINT managers_department_id_foreign FOREIGN KEY (department_id) REFERENCES talentcloud.departments(id) ON UPDATE CASCADE;


--
-- Name: managers managers_development_opportunity_frequency_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers
    ADD CONSTRAINT managers_development_opportunity_frequency_id_foreign FOREIGN KEY (development_opportunity_frequency_id) REFERENCES talentcloud.frequencies(id) ON UPDATE CASCADE;


--
-- Name: managers managers_engage_team_frequency_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers
    ADD CONSTRAINT managers_engage_team_frequency_id_foreign FOREIGN KEY (engage_team_frequency_id) REFERENCES talentcloud.frequencies(id) ON UPDATE CASCADE;


--
-- Name: managers managers_refuse_low_value_work_frequency_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers
    ADD CONSTRAINT managers_refuse_low_value_work_frequency_id_foreign FOREIGN KEY (refuse_low_value_work_frequency_id) REFERENCES talentcloud.frequencies(id) ON UPDATE CASCADE;


--
-- Name: managers managers_stay_late_frequency_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers
    ADD CONSTRAINT managers_stay_late_frequency_id_foreign FOREIGN KEY (stay_late_frequency_id) REFERENCES talentcloud.frequencies(id) ON UPDATE CASCADE;


--
-- Name: managers managers_user_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers
    ADD CONSTRAINT managers_user_id_foreign FOREIGN KEY (user_id) REFERENCES talentcloud.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: managers managers_work_review_frequency_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.managers
    ADD CONSTRAINT managers_work_review_frequency_id_foreign FOREIGN KEY (work_review_frequency_id) REFERENCES talentcloud.frequencies(id) ON UPDATE CASCADE;


--
-- Name: micro_references micro_references_experience_level_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.micro_references
    ADD CONSTRAINT micro_references_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES talentcloud.experience_levels(id) ON UPDATE CASCADE;


--
-- Name: micro_references micro_references_relationship_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.micro_references
    ADD CONSTRAINT micro_references_relationship_id_foreign FOREIGN KEY (relationship_id) REFERENCES talentcloud.relationships(id) ON UPDATE CASCADE;


--
-- Name: profile_pics profile_pics_user_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.profile_pics
    ADD CONSTRAINT profile_pics_user_id_foreign FOREIGN KEY (user_id) REFERENCES talentcloud.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: province_translations province_translations_province_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.province_translations
    ADD CONSTRAINT province_translations_province_id_foreign FOREIGN KEY (province_id) REFERENCES talentcloud.provinces(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: relationship_translations relationship_translations_relationship_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.relationship_translations
    ADD CONSTRAINT relationship_translations_relationship_id_foreign FOREIGN KEY (relationship_id) REFERENCES talentcloud.relationships(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: security_clearance_translations security_clearance_translations_security_clearance_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.security_clearance_translations
    ADD CONSTRAINT security_clearance_translations_security_clearance_id_foreign FOREIGN KEY (security_clearance_id) REFERENCES talentcloud.security_clearances(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: skill_declarations skill_declarations_criteria_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_declarations
    ADD CONSTRAINT skill_declarations_criteria_id_foreign FOREIGN KEY (criteria_id) REFERENCES talentcloud.criteria(id) ON UPDATE CASCADE;


--
-- Name: skill_declarations skill_declarations_experience_level_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_declarations
    ADD CONSTRAINT skill_declarations_experience_level_id_foreign FOREIGN KEY (experience_level_id) REFERENCES talentcloud.experience_levels(id) ON UPDATE CASCADE;


--
-- Name: skill_declarations skill_declarations_job_application_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_declarations
    ADD CONSTRAINT skill_declarations_job_application_id_foreign FOREIGN KEY (job_application_id) REFERENCES talentcloud.job_applications(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: skill_declarations skill_declarations_skill_level_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_declarations
    ADD CONSTRAINT skill_declarations_skill_level_id_foreign FOREIGN KEY (skill_level_id) REFERENCES talentcloud.skill_levels(id) ON UPDATE CASCADE;


--
-- Name: skill_level_translations skill_level_translations_skill_level_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.skill_level_translations
    ADD CONSTRAINT skill_level_translations_skill_level_id_foreign FOREIGN KEY (skill_level_id) REFERENCES talentcloud.skill_levels(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_culture_translations team_culture_translations_team_culture_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.team_culture_translations
    ADD CONSTRAINT team_culture_translations_team_culture_id_foreign FOREIGN KEY (team_culture_id) REFERENCES talentcloud.team_cultures(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_cultures team_cultures_manager_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.team_cultures
    ADD CONSTRAINT team_cultures_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES talentcloud.managers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_user_role_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.users
    ADD CONSTRAINT users_user_role_id_foreign FOREIGN KEY (user_role_id) REFERENCES talentcloud.user_roles(id);


--
-- Name: work_environments work_environments_flexible_hours_frequency_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.work_environments
    ADD CONSTRAINT work_environments_flexible_hours_frequency_id_foreign FOREIGN KEY (flexible_hours_frequency_id) REFERENCES talentcloud.frequencies(id) ON UPDATE CASCADE;


--
-- Name: work_environments work_environments_manager_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.work_environments
    ADD CONSTRAINT work_environments_manager_id_foreign FOREIGN KEY (manager_id) REFERENCES talentcloud.managers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: work_environments work_environments_telework_allowed_frequency_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.work_environments
    ADD CONSTRAINT work_environments_telework_allowed_frequency_id_foreign FOREIGN KEY (telework_allowed_frequency_id) REFERENCES talentcloud.frequencies(id) ON UPDATE CASCADE;


--
-- Name: work_samples work_samples_file_type_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.work_samples
    ADD CONSTRAINT work_samples_file_type_id_foreign FOREIGN KEY (file_type_id) REFERENCES talentcloud.file_types(id) ON UPDATE CASCADE;


--
-- Name: workplace_photo_captions workplace_photo_captions_work_environment_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.workplace_photo_captions
    ADD CONSTRAINT workplace_photo_captions_work_environment_id_foreign FOREIGN KEY (work_environment_id) REFERENCES talentcloud.work_environments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: workplace_photo_captions workplace_photo_captions_workplace_photo_id_foreign; Type: FK CONSTRAINT; Schema: talentcloud; Owner: talentcloud
--

ALTER TABLE ONLY talentcloud.workplace_photo_captions
    ADD CONSTRAINT workplace_photo_captions_workplace_photo_id_foreign FOREIGN KEY (workplace_photo_id) REFERENCES talentcloud.workplace_photos(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

