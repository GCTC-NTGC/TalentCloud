<?php
return [
    /*
    * --------------------------------------------------------------------------
    * Manager Portal Job Edit Localization
    * --------------------------------------------------------------------------
    * Route: /admin/jobs/edit
    * Controller: Controllers\JobController.php
    * View: views/manager/job_create.html.twig
    */

    'title' => 'Edit Job Poster',
    'layout' => [
        'sidebar' => [
            'poster_sections' => 'Poster Sections',
            'job_details' => 'Job Details',
            'key_tasks' => 'Key Tasks',
            'skills_n_competencies' => 'Skills & Competencies',
            'questions' => 'Questions for the Applicant'
        ],
        'form' => [
            'job_details' => 'Job Details',
            'job_title' => 'Job Title',
            'job_title_english' => 'Job Title (English)',
            'job_title_french' => 'Job Title (Français)',
            'salary_range' => 'Salary Range',
            'minimum_value' => 'Minimum Value',
            'maximum_value' => 'Maximum Value',
            'classifications' => 'Classifications',
            'occupational_group' => 'Occupational Group',
            'noc_code' => 'NOC Code',
            'security_clearance' => 'Security Clearance',
            'security_clearance_default_option' => 'Select a security clearance...',
            'language_requirement' => 'Language Requirement',
            'language_requirement_default_option' => 'Select a language requirement...',
            'location' => 'Location',
            'remote_work_allowed' => 'Remote Work Allowed',
            'city' => 'City',
            'province' => 'Province',
            'province_default_option' => 'Select a province...',
            'timetable' => 'Timetable',
            'accepting_applications_from' => 'Accepting Applications From',
            'opening_time' => 'Opening Time, UTC',
            'accepting_applications_to' => 'Accepting Applications To',
            'closing_time' => 'Closing Time, UTC',
            'position_start' => 'Position Start Date',
            'position_duration' => 'Position Duration (Months)',
            'departmental_information' => 'Departmental Information',
            'departmental_info_default_option' => 'Select a department...',
            'department' => 'Department',
            'branch_english' => 'Branch (English)',
            'branch_french' => 'Branch (Français)',
            'division_english' => 'Division (English)',
            'division_french' => 'Division (Français)',
            'impact' => 'Impact',
            'impact_english' => 'Impact (English)',
            'impact_french' => 'Impact (Français)',
            'key_tasks' => 'Key Tasks',
            'task' => [
                'task_information' => 'Task Information',
                'task_name_english' => 'Task Name (English)',
                'task_name_french' => 'Task Name (Français)'
            ],
            'add_a_task' => 'Add a Task',
            'skills_n_competencies' => 'Skills & Competencies',
            'education_or_equivalency' => 'Education or Equivalency',
            'education_english' => 'Education (English)',
            'education_french' => 'Education (Français)',
            'criteria_heading' => ':criteria_type Criteria (:skill_type Skills)',
            'criterion' => [
                'skill_information' => 'Skill Information',
                'select_skill' => 'Select Skill',
                'select_skill_default_option' => 'Select a skill...',
                'select_level_required' => 'Select level required',
                'select_level_required_default_option' => 'Select level required...',
                'skill_context_english' => 'Optional Skill Context (English)',
                'skill_context_french' => 'Optional Skill Context (Français)'
            ],
            'add_a_skill' => 'Add an :criteria_type :skill_type Skill',
            'questions_for_applicant' => 'Questions for the Applicant',
            'question' => [
                'question_information' => 'Question Information',
                'question_english' => 'Question (English)',
                'description_english' => 'Description (English)',
                'question_french' => 'Question (Français)',
                'description_french' => 'Description (Français)'
            ],
            'add_a_question' => 'Add a Question',
            'save_and_preview' => 'Save and Preview',
            'publish' => 'Publish',

        ]
    ],
    /* Localizations for Default questions fuction in controller */
    'questions' => [
        '00' => 'Why are you interested in this job?',
        '01' => 'Why do you think you would be a good fit for this job?'
    ]
];
