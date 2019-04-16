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
    "title" => "Apply Now",
    "view_title" => "Application",
    "job_context_copy" => "You are applying for:",
    "save_quit_button_label" => "Save & Quit",
    "save_continue_button_label" => "Save & Continue",
    "save_button_working" => "Saving...",
    "submit_button_label" => "Submit",
    /* Tracker */
    "tracker_label" => "Step",
    "tracker_previous_title" => "Go to the previous step in the application process.",
    "tracker_previous_label" => "Previous",
    "tracker_next_title" => "Go to the next step in the application process.",
    "tracker_next_label" => "Next",
    /* Modals */
    "modals" => [
        "deleteDegree" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this Diploma/Degree?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this diploma or degree from your profile?",
                "01" => "All previously submitted applications will retain this experience."
            ],
            "id" => "deleteDegree",
            "action_01" => "Cancel",
            "action_02" => "Delete",
            "action_02_progress" => "Working..."
        ],
        "deleteCourse" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this Course/Certification?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this course or certification from your profile?",
                "01" => "All previously submitted applications will retain this experience."
            ],
            "id" => "deleteCourse",
            "action_01" => "Cancel",
            "action_02" => "Delete",
            "action_02_progress" => "Working..."
        ],
        "deleteWork" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this Equivalent Experience?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this equivalent experience from your profile?",
                "01" => "All previously submitted applications will retain this experience."
            ],
            "id" => "deleteWork",
            "action_01" => "Cancel",
            "action_02" => "Delete",
            "action_02_progress" => "Working..."
        ],
        "createReference" => [
            "type" => "createReference",
            "title" => "Create a New Reference",
            "content" => [
                "00" => "By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process."
            ],
            "id" => "createReference",
            "action_01" => "Cancel",
            "action_02" => "Save"
        ],
        "createSample" => [
            "type" => "createSample",
            "title" => "Create a New Work Sample",
            //"content" => [],
            "id" => "createSample",
            "action_01" => "Cancel",
            "action_02" => "Save"
        ]
    ],
    /* Step 01 */
    "step_01_title" => "Talent Cloud | Applicant: Apply Now - Step 1",
    "question_label" => "Your Answer",
    "question_title" => "My Fit",
    "claim_title" => "Basic Information",
    "select_default_option" => "Select from the following...",
    "language_declaration" => "Do you meet the language requirements for this position?",
    "english_essential" => "I understand that this position has an English essential language requirement. This means that the manager may choose to test my proficiency in English.",
    "french_essential" => "I understand that this position has a French essential language requirement. This means that the manager may choose to test my proficiency in French.",
    "bilingual" => 'I understand that this position has a bilingual language requirement. Knowledge of both English and French are required. I am entitled to be assessed on the "Need to Have" and "Nice to Have" criteria for this position in the Official Language of my choice (English or French), however the bilingual requirement means I will have to do additional testing in my second language to confirm my language ability.',
    "english_french" => "COPY NEEDED This should not be seen",
    "language_declaration_error_message" => "This box must be checked to proceed.",
    "language_title" => "Language Selection",
    "language_copy" => "Which language would you prefer for this application process?",
    "language_label" => "Select One",
    "citizenship_title" => "Citizenship Claim",
    "citizenship_content" => "Which of the following applies to you?",
    "citizenship_label" => "Select One",
    "veterans_title" => "Veterans Claim",
    "veterans_content" => "Are you a veteran or a member of the Canadian Armed Forces?",
    "veterans_label" => "Select One",
    "language_title" => "Language Requirement",
    "language_copy" => "Which language would you prefer for this application process?",
    "language_label" => "Select One",
    /* Step 02 */
    "step_02_title" => "Talent Cloud | Applicant: Apply Now - Step 2",
    "experience" => [
        "title" => "My Experience",
        "description" => "The job you’re about to apply to requires the following minimum education or experience. You can’t be considered for this job unless you have this. Even if you’re really awesome. Managers are not allowed to hire you for this job in this classification without this education or experience."
    ],
    "experience_section" => [
        "section_degree_title" => "My Diplomas/Degrees",
        "add_degree_label" => "Add Diploma/Degree",
        "null_degree_copy" => "You don't currently have any diplomas or degrees on your profile! Use the button above to add one.",
        "section_course_title" => "My Courses/Certifications",
        "add_course_label" => "Add Course/Certification",
        "null_course_copy" => "You don't currently have any courses or certifications on your profile! Use the button above to add one.",
        "section_work_title" => "My Equivalent Experience",
        "add_work_label" => "Add Equivalent Experience",
        "null_work_copy" => "You don't currently have any equivalent experience on your profile! Use the button above to add some.",
    ],
    /* Step 03/04 */
    "step_03_title" => "Talent Cloud | Applicant: Apply Now - Step 3",
    "step_04_title" => "Talent Cloud | Applicant: Apply Now - Step 4",
    "sidebar_item_title" => "Scroll to this skill.",
    "skills_section" => [
        "essential_title" => "Need to Have",
        "asset_title" => "Nice to Have",
        "add_button_label" => "Add Skill",
        "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
    ],
    "essential_title" => "Skills You Need to Have",
    "asset_title" => "Skills That Are Nice to Have",
    "essential_context" => "The job you’re about to apply to requires the following skills. Yes, really, all of them. Each one at the minimum level of expertise specified by the hiring manager. Even if you’re amazing and you’re only missing one of these skills, you won’t be considered for this job.  And you have to provide evidence against any skill claims you make… claims that become part of a government record. So don’t be tempted to stretch the truth just to apply. You’re better than that. Save yourself the time and consider applying for something else instead.",
    "asset_context" => "You can apply for this job if you don’t have any of these skills. These are assets that the hiring manager thinks will help with the work. They’re often used to help select the best candidate amongst all those who meet all the “Need to Have” criteria. So if you do have these skills, now is the time to let the hiring manager know.",
    "essential_start_button_title" => "Scroll to begin filling out the skills you need to have.",
    "asset_start_button_title" => "Scroll to begin filling out the skills that are nice to have.",
    "skills_start_button_label" => "Get Started",
    "essential_sidebar_label" => "Skills Checklist",
    "asset_sidebar_label" => "Skills Checklist",
    /* Step 05 */
    "step_05_title" => "Talent Cloud | Applicant: Apply Now - Step 5",
    "preview" => [
        "title" => "Review My Application",
        "copy_01" => "Please review your application below.",
        "sidebar" => [
            "label" => "Application Sections",
            "item_01" => "Basic Information",
            "item_02" => "My Experience",
            "item_03" => "Skills I Need to Have",
            "item_04" => "Skills That Are Nice to Have",
            "item_05" => "Submit"
        ],
        "section_01_title" => "Basic Information",
        "citizenship_null_copy" => "No Citizenship Selected",
        "veteran_null_copy" => "No Veteran Status Selected",
        "language_null_copy" => "No Language Selected",
        "long_question_null" => "This question has not been answered.",
        "section_02_title" => "My Experience",
        "experience" => [
            "requirement_label" => "Experience required for this position:",
            "degree_label" => "My Diplomas / Degrees",
            "null_degree_copy" => "You have no diplomas or degrees added to your profile.",
            "course_label" => "My Courses / Certifications",
            "null_course_copy" => "You have no courses or certifications added to your profile.",
            "work_label" => "My Equivalent Experience",
            "null_work_copy" => "You have no equivalent experience added to your profile."
        ],
        "section_03_title" => "Skills I Need to Have",
        "section_04_title" => "Skills That Are Nice to Have"
    ],
    /* Step 06 (Integrity Check) */
    "integrity" => [
        "title" => "Application Confirmation",
        "confirmation_copy" => "By signing your name below, you’re confirming:",
        "confirmation_01" => "I’ve reviewed what I wrote in my application.",
        "confirmation_02" => "I understand that I am part of a community of people who trust each other.",
        "confirmation_03" => "I promise that the information I am providing is true.",
        "signature_label" => "Sign (Type) Your Full Name",
        "date_label" => "Today's Date",
        "review" => "This is your final chance to review your application before submitting. If there’s anything you’d like to change, feel free to go back and do so now.",
        "save_label" => "Save & Quit",
        "submit_label" => "Submit"
    ],
    /* Step 07 (Complete) */
    "complete" => [
        "step_06_title" => "Talent Cloud | Applicant: Apply Now - Step 6",
        "title" => "Thanks for applying!",
        "copy_01" => "Talent Cloud is an experimental site. Please help us improve the federal staffing process by completing a short experience survey. This information will be anonymous and go directly towards helping us improve the platform!",
        "survey_link" => "https://talentcloud1.typeform.com/to/tWIPup",
        "survey_title" => "Take the survey.",
        "survey_label" => "Take the Survey",
        "copy_02" => "Curious about what's next for your application? Learn more about the staffing process in our FAQ",
        "return_title" => "Go to the Talent Cloud homepage.",
        "return_label" => "Return Home",
        "faq_title" => "Go to the Talent Cloud FAQ.",
        "faq_label" => "View the FAQ"
    ]
];
