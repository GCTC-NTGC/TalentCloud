<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Application Process Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used in the application process.
    *
    */
    'title' => 'Apply Now',
    'view_title' => 'Application',
    'job_context_copy' => 'You are applying for:',
    'save_quit_button_label' => 'Save & Quit',
    'save_continue_button_label' => 'Save & Continue',
    'save_button_working' => 'Saving...',
    'submit_button_label' => 'Submit',
    /* Tracker */
    'tracker_label' => 'Step',
    'tracker_previous_title' => 'Go to the previous step in the application process.',
    'tracker_previous_label' => 'Previous',
    'tracker_next_title' => 'Go to the next step in the application process.',
    'tracker_next_label' => 'Next',
    /* Modals */
    'modals' => [
        'deleteDegree' => [
            'type' => 'deleteConfirmation',
            'title' => 'Delete this Diploma/Degree?',
            'content' => [
                '00' => 'Are you sure you want to permanently delete this diploma or degree from your profile?',
                '01' => 'All previously submitted applications will retain this experience.',
            ],
            'id' => 'deleteDegree',
            'action_01' => 'Cancel',
            'action_02' => 'Delete',
            'action_02_progress' => 'Working...',
        ],
        'deleteCourse' => [
            'type' => 'deleteConfirmation',
            'title' => 'Delete this Course/Certification?',
            'content' => [
                '00' => 'Are you sure you want to permanently delete this course or certification from your profile?',
                '01' => 'All previously submitted applications will retain this experience.',
            ],
            'id' => 'deleteCourse',
            'action_01' => 'Cancel',
            'action_02' => 'Delete',
            'action_02_progress' => 'Working...',
        ],
        'deleteWork' => [
            'type' => 'deleteConfirmation',
            'title' => 'Delete this Equivalent Experience?',
            'content' => [
                '00' => 'Are you sure you want to permanently delete this equivalent experience from your profile?',
                '01' => 'All previously submitted applications will retain this experience.',
            ],
            'id' => 'deleteWork',
            'action_01' => 'Cancel',
            'action_02' => 'Delete',
            'action_02_progress' => 'Working...',
        ],
        'createReference' => [
            'type' => 'createReference',
            'title' => 'Create a New Reference',
            'content' => [
                '00' => 'By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process.',
            ],
            'id' => 'createReference',
            'action_01' => 'Cancel',
            'action_02' => 'Save',
        ],
        'createSample' => [
            'type' => 'createSample',
            'title' => 'Create a New Work Sample',
            //"content" => [],
            'id' => 'createSample',
            'action_01' => 'Cancel',
            'action_02' => 'Save',
        ],
    ],
    /* Step 01 */
    'step_01_title' => 'Talent Cloud | Applicant: Apply Now - Step 1',
    'question_label' => 'Your Answer',
    'question_title' => 'My Fit',
    'claim_title' => 'Basic Information',
    'select_default_option' => 'Select from the following...',
    'language_declaration' => 'Do you meet the language requirements for this position?',
    'english_essential' => 'I have strong reading, writing and verbal communication skills in English.',
    'french_essential' => 'I have strong reading, writing and verbal communication skills in French.',
    'english_or_french' => 'I have strong reading, writing and verbal communication skills in English or French.',
    'bilingual_intermediate' => 'I have intermediate or better reading, writing and verbal communication skills in English and French.',
    'bilingual_advanced' => 'I have strong reading, writing and verbal communication skills in English and French.',
    'language_declaration_error_message' => 'This box must be checked to proceed.',
    'language_title' => 'Language Selection',
    'language_copy' => 'Which language would you prefer for this application process?',
    'language_label' => 'Select One',
    'citizenship_title' => 'Citizenship Claim',
    'citizenship_content' => 'Which of the following applies to you?',
    'citizenship_label' => 'Select One',
    'veterans_title' => 'Veterans Claim',
    'veterans_content' => 'Are you a veteran or a member of the Canadian Armed Forces?',
    'veterans_label' => 'Select One',
    /* Step 02 */
    'step_02_title' => 'Talent Cloud | Applicant: Apply Now - Step 2',
    'experience' => [
        'title' => 'My Experience',
        'description' => 'The job you’re about to apply to requires the following minimum education or experience. You can’t be considered for this job unless you have this. Even if you’re really awesome. Managers are not allowed to hire you for this job in this classification without this education or experience.',
    ],
    'experience_section' => [
        'section_degree_title' => 'My Diplomas/Degrees',
        'add_degree_label' => 'Add Diploma/Degree',
        'null_degree_copy' => "You don't currently have any diplomas or degrees on your profile! Use the button above to add one.",
        'section_course_title' => 'My Courses/Certifications',
        'add_course_label' => 'Add Course/Certification',
        'null_course_copy' => "You don't currently have any courses or certifications on your profile! Use the button above to add one.",
        'section_work_title' => 'My Equivalent Experience',
        'add_work_label' => 'Add Equivalent Experience',
        'null_work_copy' => "You don't currently have any equivalent experience on your profile! Use the button above to add some.",
    ],
    /* Step 03/04 */
    'step_03_title' => 'Talent Cloud | Applicant: Apply Now - Step 3',
    'step_04_title' => 'Talent Cloud | Applicant: Apply Now - Step 4',
    'sidebar_item_title' => 'Scroll to this skill.',
    'skills_section' => [
        'essential_title' => 'Need to Have',
        'asset_title' => 'Nice to Have',
        'add_soft_button_label' => 'Add soft skill',
        'add_hard_button_label' => 'Add hard skill',
        'null_copy' => "You don't currently have any skills on your profile! Use the button above to add a skill.",
    ],
    /* Step 3: Essential SKills Header */
    'essential_title' => 'Need to Have',
    'essential_subtitle' => 'Remember, that you need ALL these skills to apply for this job!',
    'essential_question_1' => 'Q. Really? I have most of these skills and I’m a quick learner.',
    'essential_answer_1' => 'Sorry, you really do need all of them, and at the right level.',
    'essential_question_2' => 'Q. What if I stretch the truth a little? Once I’m interviewed they’ll change their mind for sure!',
    'essential_answer_2' => 'Don’t do it. These will be assessed, and you’re better than that.',

    'asset_title' => 'Skills That Are Nice to Have',
    'asset_context' => 'You can apply for this job if you don’t have any of these skills. These are assets that the hiring manager thinks will help with the work. They’re often used to help select the best candidate amongst all those who meet all the “Need to Have” criteria. So if you do have these skills, now is the time to let the hiring manager know.',
    'asset_start_button_title' => 'Scroll to begin filling out the skills that are nice to have.',
    'skills_start_button_label' => 'Get Started',

    /* Step 3&4 */
    'skill_sidebar_label' => 'Skills Checklist',

    /* Step 05 */
    'step_05_title' => 'Talent Cloud | Applicant: Apply Now - Step 5',
    'preview' => [
        'title' => 'Review My Application',
        'copy_01' => 'Please review your application below.',
        'sidebar' => [
            'label' => 'Application Sections',
            'item_01' => 'Basic Information',
            'item_02' => 'My Experience',
            'item_03' => 'Skills I Need to Have',
            'item_04' => 'Skills That Are Nice to Have',
            'item_05' => 'Submit',
        ],
        'section_01_title' => 'Basic Information',
        'citizenship_null_copy' => 'No Citizenship Selected',
        'veteran_null_copy' => 'No Veteran Status Selected',
        'english_choice' => 'I would prefer <strong>English</strong> for this application process.',
        'french_choice' => 'I would prefer <strong>French</strong> for this application process.',
        'language_null_copy' => 'No Language Selected',
        'long_question_null' => 'This question has not been answered.',
        'section_02_title' => 'My Experience',
        'experience' => [
            'requirement_label' => 'Experience required for this position:',
            'degree_label' => 'My Diplomas / Degrees',
            'null_degree_copy' => 'You have no diplomas or degrees added to your profile.',
            'course_label' => 'My Courses / Certifications',
            'null_course_copy' => 'You have no courses or certifications added to your profile.',
            'work_label' => 'My Equivalent Experience',
            'null_work_copy' => 'You have no equivalent experience added to your profile.',
        ],
        'section_03_title' => 'Skills I Need to Have',
        'section_04_title' => 'Skills That Are Nice to Have',
    ],
    /* Step 06 (Integrity Check) */
    'integrity' => [
        'title' => 'Application Confirmation',
        'confirmation_copy' => 'By signing my name below, I confirm:',
        'confirmation_01' => 'I’ve reviewed what I wrote in my application.',
        'confirmation_02' => 'I understand that I am part of a community of people who trust each other.',
        'confirmation_03' => 'I promise that the information I am providing is true.',
        'signature_label' => 'Sign (Type) Your Full Name',
        'date_label' => "Today's Date",
        'review' => 'This is your final chance to review your application before submitting. If there’s anything you’d like to change, feel free to go back and do so now.',
        'save_label' => 'Save & Quit',
        'submit_label' => 'Submit',
    ],
    /* Step 07 (Complete) */
    'complete' => [
        'step_06_title' => 'Talent Cloud | Applicant: Apply Now - Step 6',
        'title' => 'Thanks for applying!',
        'copy_01' => 'Talent Cloud is an experimental site. Please help us improve the federal staffing process by completing a short experience survey. This information will be anonymous and go directly towards helping us improve the platform!',
        'survey_link' => 'https://talentcloud1.typeform.com/to/tWIPup',
        'survey_title' => 'Take the survey.',
        'survey_label' => 'Take the Survey',
        'copy_02' => "Curious about what's next for your application? Learn more about the staffing process in our FAQ",
        'return_title' => 'Go to the Talent Cloud homepage.',
        'return_label' => 'Return Home',
        'faq_title' => 'Go to the Talent Cloud FAQ.',
        'faq_label' => 'View the FAQ',
    ],

    'strategic_response' => [
        'required_information' => 'Required Information',
        'experience_title' => 'My Education',
        'experience_description' => 'Add education if it’s relevant to the skill requirements for this job.',
        'essential_context_1' => 'You\'re amazing for applying. Thanks for offering to help out. These skills are what departments need right now. <strong>Super important:</strong> if you want to be of genuine help, <strong>these are skills you must already have.</strong>',
        'essential_context_2' => 'You\'ll be dropped into a different team - one that might be under pressure or tight timelines to deliver support for Canadians. If you\'re strong in these skills and you\'re the kind of person who steps up, you\'re a right fit for this. (If you\'re not strong in these skills but want to help, check out some of the other calls for talent.)',
        'asset_context' => 'This isn\'t required for the job you might be placed in. You can learn it as you go. But it would be great if you already had the skill(s) listed below.',
        'skill_prompt' => 'Share a few high level bullet points about your work experience:',
        'skill_placeholder' => 'Tell us a bit about your skills, like where you worked, what your role was, and what you delivered.',
        'confirmations' => [
            'That I am part of a community of people who trust each other.',
            'People will be relying on me to do this job in this time of great need and I promise that the information I am providing is true.',
        ],
        'complete_title' => 'Success!',
        'complete_copy_1' => 'You\'re awesome.',
        'complete_copy_2' => 'Thanks for putting your name forward.The GC Talent Reserve team will be in touch in a few days with next steps.',
        'complete_return_label' => 'Back to Homepage',
        'director_name_label' => 'Director Name',
        'director_title_label' => 'Director Title',
        'director_email_label' => 'Director Email',
        'reference_name_label' => 'Reference Name',
        'reference_title_label' => 'Reference Title',
        'reference_email_label' => 'Reference Email',
        'required_info_heading' => 'Required Information',
        'director_copy' => 'Director',
        'reference_copy' => 'Reference'
    ]
];
