<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Job Poster Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used on the Job Poster page.
    *
    */
    'title' => 'Browse Jobs',
    'job_post_title' => 'Talent Cloud | Applicant: Job Poster - :title (Reference number: :id)',
    'header' => [
        'time_remaining' => ':time until close',
        'job_closed' => 'Job has closed',
        'days_remaining' => ':count day until close|:count days until close',
        'apply_by_label' => 'Apply by',
        'applicants_so_far' => ':count applicant so far|:count applicants so far',
        'reference_id' => 'Reference number: :id',
        'remote_work_allowed' => [
            true => 'Remote Work Allowed',
            false => 'Remote Work Not Allowed',
        ],
        'sidebar_label' => 'About this job:',
    ],
    'basics' => [
        'sidebar_title' => 'View this job\'s basic information.',
        'title' => 'Basic Information',
        'salary_label' => 'Annual Salary Range',
        'duration_label' => 'Duration',
        'start_label' => 'Target Start Date',
        'language_label' => 'Language Requirement',
        'security_label' => 'Security Clearance',
        'classification_label' => 'Government Classification',
        'duration' => [
            'week' => ':count week.|:count weeks',
            'month' => ':count month.|:count months',
            'year' => ':count year.|:count years',
            'permanent' => 'Permanent'
        ],
        'start_date_format' => 'F, Y',
    ],
    'manager' => [
        'photo_title' => ':name\'s profile photo.',
        'link_title' => 'View :name\'s Profile.'
    ],
    'impact' => [
        'sidebar_title' => 'View this job\'s impact information.',
        'title' => 'Impact'
    ],
    'work' => [
        'sidebar_title' => 'View this job\'s work information.',
        'title' => 'Your Work'
    ],
    'criteria' => [
        'sidebar_title' => 'View this job\'s criteria information.',
        'title' => 'Criteria',
        'education_title' => 'Education Requirements',
        'essential_title' => 'Need to Have',
        'asset_title' => 'Nice to Have',
        'requirement_label' => 'Level Required: ',
        'level_link_title' => 'Visit the FAQ to learn about this and other skill levels.',
        'no_info' => 'No additional criteria required.'
    ],
    'language' => [
        'sidebar_title' => 'View this job\'s language requirements.',
        'title' => 'Language Requirements',
        'english_essential_context_01' => 'This position requires fluency in English in both written and verbal communication. As part of the assessment of your language abilities, the hiring manager may ask you to complete some assessment steps in English, such as interview questions or an exam.',
        'english_essential_context_02' => 'You can submit this initial application in either official language of your choice (English or French).',
        'french_essential_context_01' => 'This position requires fluency in French in both written and verbal communication. As part of the assessment of your language abilities, the hiring manager may ask you to complete some assessment steps in French, such as interview questions or an exam.',
        'french_essential_context_02' => 'You can submit this initial application in either official language of your choice (English or French).',
        'english_or_french_context_01' => 'For this position, you meet the language requirements if you have strong reading, writing and verbal communication skills in either English or French, or both (bilingual).',
        'english_or_french_context_02' => 'You can submit this application in the official language of your choice (English or French).',
        'bilingual_intermediate_context_01' => 'This position requires working knowledge of both French and English. This means that you can take on job duties in either French or English, and you have intermediate reading, writing and verbal communication skills in both official languages. As part of this selection process, your language abilities will be tested by the %proficiency%.',
        'bilingual_intermediate_context_02' => 'You can complete all other steps of this assessment process in the official language of your choice, including the initial application, interview, exam and any other evaluation components.',
        'bilingual_advanced_context_01' => 'This position requires advanced knowledge of both French and English. This means that you can take on job duties in either French or English, and you have strong reading, writing and verbal communication skills in both official languages. As part of this selection process, your language abilities will be tested by the %proficiency%.',
        'bilingual_advanced_context_02' => 'You can complete all other steps of this assessment process in the official language of your choice, including the initial application, interview, exam and any other evaluation components.',
        'proficiency_link' => 'https://www.canada.ca/en/public-service-commission/jobs/services/gc-jobs/information-candidates/language-requirements-candidates.html',
        'proficiency_copy' => 'Public Service Commission of Canada',
        'assessment_link' => 'https://www.canada.ca/en/public-service-commission/services/second-language-testing-public-service/self-assessment-tests.html',
        'assessment_copy' => 'self-assessment test',
    ],
    'culture' => [
        'sidebar_title' => 'View this job\'s culture information.',
        'title' => 'Team Culture',
        'manager_title' => 'Your Manager',
        'manager_department_bridge' => ' at ',
        'guest_manager_link_label' => 'Please Log In to View :name\'s Profile.',
        'manager_link_label' => 'View :name\'s Profile.',
        'work_culture_label' => 'Work Culture',
        'work_environment_label' => 'Work Environment',
        'team_narrative_label' => 'Things to Know',
        'team_culture_label' => 'Team Culture',
        'team_size_label' => 'Team Size',
        'gcdirectory_label' => 'Meet the Team in GC Directory',
        'team_link_title' => 'View this team\'s profile.',
        'team_link_label' => 'Team Profile',
        'operating_label' => 'Our Operating Context',
        'team_value_label' => 'What We Value',
        'team_work_label' => 'How We Work',
    ],
    'work_environment' => [
        'view_more_button' => 'View the team’s work environment and culture',
        'modal_title' => 'Work Environement and Culture',
        'remote_work_label' => 'Remote Work',
        'remote_work_desc' => 'Work from anywhere, all the time.',
        'remote_work_allowed' => [
            true => 'Allowed',
            false => 'Not Allowed',
        ],
        'telework_label' => 'Telework',
        'telework_desc' => 'Work from home some days (within driving distance of the office).',
        'telework_allowed' => [
            'never' => 'Never',
            'rarely' => 'Occasionally',
            'sometimes' => 'Sometimes',
            'often' => 'Frequently',
            'always' => 'Almost always',
        ],
        'time_flexibility_label' => 'Flex Hours',
        'time_flexibility_desc' => 'Set your own start and end times.',
        'time_flexibility_allowed' => [
            'never' => 'Never',
            'rarely' => 'Occasionally',
            'sometimes' => 'Sometimes',
            'often' => 'Frequently',
            'always' => 'Almost always',
        ],
        'travel_label' => 'Travel',
        'travel_desc' => 'See more of Canada or the world.',
        'travel' => [
            'frequently' => 'Frequently',
            'available' => 'Opportunities available',
            'none' => 'None',
        ],
        'overtime_label' => 'Overtime',
        'overtime_desc' => 'Work extra hours in the evenings/weekends.',
        'overtime' => [
            'frequently' => 'Frequently',
            'available' => 'Opportunities available',
            'none' => 'None',
        ],
    ],
    'know' => [
        'sidebar_title' => 'View this job\'s extra information.',
        'title' => 'Nice to Know'
    ],
    'apply' => [
        'sidebar_title' => 'View this job\'s application section.',
        'title' => 'Apply Now',
        'accommodation' => 'Please advise Talent Cloud at talent.cloud-nuage.de.talents@tbs-sct.gc.ca of any accommodations you may require during the application process.',
        'preference' => 'Preference will be given to veterans and to Canadian citizens, in that order.',
        'apply_link_title' => 'Apply to this job.',
        'apply_link_label' => 'Apply Now',
        'login_link_title' => 'Log in to apply for this job.',
        'login_link_label' => 'Login & Apply',
        'job_closed_title' => 'Competition closed',
        'job_closed_label' => 'Competition closed',
        'edit_link_title'  => 'Edit this job poster.',
        'edit_link_label'  => 'Edit'
    ],
    'no_info' => 'No information provided.'
];
