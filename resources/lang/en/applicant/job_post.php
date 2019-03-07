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
    'job_post_title' => 'Talent Cloud | Applicant: Job Poster',
    'header' => [
        'time_remaining' => ':time until close',
        "job_closed" => "Job has closed",
        'days_remaining' => ':count day until close|:count days until close',
        "apply_by_label" => "Apply by",
        'applicants_so_far' => ':count applicant so far|:count applicants so far',
        'location_icon_label' => 'Location Icon.',
        'remote_work_icon_label' => 'Remote Work Icon.',
        'reference_id' => 'Reference ID #:id',
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
        'education_title' => "Education Requirements",
        'essential_title' => 'Need to Have',
        'asset_title' => 'Nice to Have',
        'requirement_label' => 'Level Required: ',
        'level_link_title' => 'Visit the FAQ to learn about this and other skill levels.'
    ],
    'language' => [
        'sidebar_title' => 'View this job\'s language requirements.',
        'title' => 'Language Requirements',
        'english_icon_title' => 'An icon representing an English language requirement.',
        'french_icon_title' => 'An icon representing an French language requirement.',
        'english_essential_context' => 'This position has an English essential requirement. The manager may choose to test your proficiency in English.',
        'french_essential_context' => 'This position has an French essential requirement. The manager may choose to test your proficiency in French.',
        'bilingual_context_01' => 'This position has a bilingual requirement. This means that you must meet the %proficiency% required, in both English and French, in each of the 3 language skills: comprehension, writing, and oral communication.',
        'proficiency_link' => 'https://www.canada.ca/en/public-service-commission/jobs/services/gc-jobs/information-candidates/language-requirements-candidates.html',
        'proficiency_copy' => 'proficiency levels',
        'bilingual_context_02' => 'You can try out an %assessment% to give yourself an idea of the level (A, B, or C) you might attain.',
        'assessment_link' => 'https://www.canada.ca/en/public-service-commission/services/second-language-testing-public-service/self-assessment-tests.html',
        'assessment_copy' => 'self-assessment test',
        'bilingual_context_03' => 'If your first official language is English, you will be tested on your French, and vice versa.',
        'english_french_context' => 'NEEDS COPY'
    ],
    'culture' => [
        'sidebar_title' => 'View this job\'s culture information.',
        'title' => 'Team Culture',
        'manager_title' => 'Your Manager',
        'manager_department_bridge' => ' at ',
        'guest_manager_link_label' => 'Please Log In to View :name\'s Profile.',
        'manager_link_label' => 'View :name\'s Profile.',
        'work_environment_label' => 'Work Environment',
        'team_narrative_label' => 'Things to Know',
        'team_culture_label' => 'Team Culture',
        'team_size_label' => 'Team Size',
        'gcdirectory_label' => 'Meet the Team in GC Directory',
        'team_link_title' => 'View this team\'s profile.',
        'team_link_label' => 'Team Profile',
        'operating_label' => 'Our Operating Context',
        'team_value_label' => 'What We Value',
        'team_work_label' => 'How We Work'
    ],
    'work_environment' => [
        'remote_work_label' => 'Remote Work',
        'remote_work_allowed' => [
            true => 'Allowed',
            false => 'Not Allowed',
        ],
        'telework_label' => 'Telework',
        'telework_allowed' => [
            'never' => 'Never',
            'rarely' => 'Occasionally',
            'sometimes' => 'Sometimes',
            'often' => 'Frequently',
            'always' => 'Almost always',
        ],
        'time_flexibility_label' => 'Flex Hours',
        'time_flexibility_allowed' => [
            'never' => 'Never',
            'rarely' => 'Occasionally',
            'sometimes' => 'Sometimes',
            'often' => 'Frequently',
            'always' => 'Almost always',
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
];
