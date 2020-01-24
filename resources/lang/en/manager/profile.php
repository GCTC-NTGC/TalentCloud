<?php
return [
    /*
    * --------------------------------------------------------------------------
    * Manager Portal Profile Edit
    * --------------------------------------------------------------------------
    * Route: /manager/profile/#/edit
    * Controller: Controllers\ManagerProfileController.php
    * View: views/manager/profile.html.twig
    */

    'title' => 'My Profile',
    'profile_header' => [
        'twitter' => 'Visit :name\'s Twitter profile.',
        'linkedin' => 'Visit :name\'s LinkedIn profile.'
    ],
    'layout' => [
        'sidebar' => [
            'profile_sections' => 'Profile Sections',
            'my_account' => 'My Account',
            'about_me' => 'About Me',
            'leadership_style' => 'My Leadership Style',
            'our_work_environment' => 'Our Work Environment',
            'our_team_culture' => 'Our Team Culture',
            'save_all_sections' => 'Save All Sections'
        ],
        'about' => [
            'about_me' => 'About Me',
            'my_name' => 'My Name',
            'position' => 'Position',
            'position_english' => 'Position (English)',
            'position_french' => 'Position (Français)',
            'departmental_information' => 'Departmental Information',
            'department' => 'Department',
            'change_department_info' => 'To change your department, please contact',
            'talent_cloud_email' => [
                'href' => 'mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca',
                'text' => 'Talent Cloud',
                'title' => 'Send an email to Talent Cloud.'
            ],
            'account_settings' => 'To learn more, visit your',
            'account_settings_link' => [
                'href' => '/settings',
                'text' => 'account settings',
                'title' => 'Visit Account Settings page'
            ],
            'division_english' => 'Division (English)',
            'division_french' => 'Division (Français)',
            'personal_information' => 'Personal Information',
            'education_english' => 'Education (English)',
            'education_french' => 'Education (Français)',
            'years_of_experience' => 'Years of Experience',
            'career_journey_english' => 'My Career Journey So Far (English)',
            'career_journey_french' => 'My Career Journey So Far (Français)',
            'learning_path_english' => 'My Learning Path (English)',
            'learning_path_french' => 'My Learning Path (Français)',
            'biography_english' => 'A Bit About Me Outside Work (English)',
            'biography_french' => 'A Bit About Me Outside Work (Français)',
            'social_media' => 'Social Media',
            'twitter_username' => 'Twitter Username',
            'linkedin_url' => 'LinkedIn Profile URL',
            'save_about_me' => 'Save About Me'

        ],
        'leadership' => [
            'my_leadership_style' => 'My Leadership Style',
            'my_style_values' => 'My Leadership Style and Management Values',
            'answer_english' => 'Answer (English)',
            'answer_french' => 'Answer (Français)',
            'expect_from_employees' => 'What I Expect from My Employees',
            'approach_learning_development' => 'My Approach to Employee Learning and Development',
            'save_leadership_style' => 'Save My Leadership Style'
        ],
    ]
];
