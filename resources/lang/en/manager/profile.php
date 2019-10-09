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
        'account' => [
            'my_account' => 'My Account',
            'my_name' => 'My Name',
            'account_settings' => 'Account Information',
            'reset_password' => 'Reset Password',
            'profile_email' => 'My Email',
            'gov_email' => 'My Government Email',
            'current_password' => 'Current Password',
            'new_password' => 'New Password',
            'confirm_password' => 'Confirm New Password',
            'save_account_settings' => 'Save Account Settings',
        ],
        'about' => [
            'about_me' => 'About Me',
            'my_name' => 'My Name',
            'position' => 'Position',
            'position_english' => 'Position (English)',
            'position_french' => 'Position (Français)',
            'departmental_information' => 'Departmental Information',
            'department' => 'Department',
            'department_default_option' => 'Select your department...',
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
            'my_leadership_style' => "My Leadership Style",
            'my_style_values' => "My Leadership Style and Management Values",
            'answer_english' => "Answer (English)",
            'answer_french' => "Answer (Français)",
            'expect_from_employees' => "What I Expect from My Employees",
            'approach_learning_development' => "My Approach to Employee Learning and Developmment",
            'save_leadership_style' => "Save My Leadership Style"
        ],
        'environment' => [
            'work_environment' => "Our Work Environment",
            'things_to_know' => "Things to Know",
            'answer_english' => "Answer (English)",
            'answer_french' => "Answer (Français)",
            'telework_frequency' => "How Often is Telework Allowed?",
            'flexible_hour_frequency' => "How Often Are Flexible Hours Allowed?",
            'environment_photos' => "Work Environment Photos",
            'upload_image' => "Upload an Image",
            'alt_text_english' => "Image Alt Text (English)",
            'alt_text_french' => "Image Alt Text (Français)",
            'save_work_environment' => "Save Our Work Environment",
            'frequency' => [
                'never' => 'Never',
                'rarely' => 'Occasionally',
                'sometimes' => 'Sometimes',
                'often' => 'Frequently',
                'always' => 'Always',
            ]

        ],
        'culture' => [
            'team_culture' => "Our Team Culture",
            'primary_information' => "Primary Information",
            'team_size' => "Team Size",
            'gc_directory_link' => "GC Directory Link",
            'operating_context' => "Our Operating Context",
            'answer_english' => "Answer (English)",
            'answer_french' => "Answer (Français)",
            'what_we_value' => "What We Value",
            'how_we_work' => "How We Work",
            'save_team_culture' => "Save Our Team Culture"
        ]

    ]
];
