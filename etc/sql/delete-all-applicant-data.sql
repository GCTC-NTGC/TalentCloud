-- Delete all content in tables exlcusively related to applicants & applications.
TRUNCATE TABLE
    applicant_profile_answers,
    applicants,
    application_reviews,
    courses,
    degrees,
    experience_skills,
    experiences_award,
    experiences_community,
    experiences_education,
    experiences_personal,
    experiences_work,
    job_application_answers,
    job_applications,
    profile_pics,
    project_reference,
    projects,
    reference_skill_declaration,
    "references",
    skill_declaration_work_sample,
    skill_declarations,
    work_experiences,
    work_samples;

/*
* As Applicant users (ie Basic users) can act as Demo Managers,
* we also need to delete all jobs - and related content - created by basic users.
*/
DELETE FROM assessment_plan_notifications
    WHERE job_poster_id IN (
        SELECT job_posters.id from job_posters
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM claimed_jobs
    WHERE job_poster_id IN (
        SELECT job_posters.id from job_posters
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM comments
    WHERE job_poster_id IN (
        SELECT job_posters.id from job_posters
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM assessments
    WHERE criterion_id IN (
        SELECT criteria.id from criteria
            JOIN job_posters on criteria.job_poster_id=job_posters.id
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM rating_guide_answers
    WHERE criterion_id IN (
        SELECT criteria.id from criteria
            JOIN job_posters on criteria.job_poster_id=job_posters.id
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM criteria
    WHERE job_poster_id IN (
        SELECT job_posters.id from job_posters
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM rating_guide_questions
    WHERE job_poster_id IN (
        SELECT job_posters.id from job_posters
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM job_poster_key_tasks
    WHERE job_poster_id IN (
        SELECT job_posters.id from job_posters
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM job_poster_questions
    WHERE job_poster_id IN (
        SELECT job_posters.id from job_posters
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM job_poster_status_histories
    WHERE job_poster_id IN (
        SELECT job_posters.id from job_posters
            JOIN managers on job_posters.manager_id=managers.id
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );
DELETE FROM job_posters
    WHERE manager_id IN (
        SELECT managers.id FROM managers
            JOIN users on managers.user_id=users.id
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );

-- Delete all Demo Manager profiles.
DELETE FROM managers
    WHERE user_id IN (
        SELECT users.id FROM users
            JOIN user_roles on users.user_role_id=user_roles.id
            WHERE user_roles.key='basic'
    );

-- Delete all Basic users.
DELETE FROM users
    WHERE user_role_id IN (SELECT id FROM user_roles WHERE key = 'basic');
