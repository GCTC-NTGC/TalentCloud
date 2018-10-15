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
    "job_context_copy" => "You are applying for:",
    "save_quit_button_label" => "Save & Quit",
    "save_continue_button_label" => "Save & Continue",

    /* Modals */
        "modals" => [
            "00" => [
                "type" => "confirmation",
                "title" => "Delete this Diploma/Degree?",
                "content" => [
                    "00" => "Are you sure you want to permanently delete this diploma or degree from your profile?",
                    "01" => "All previously submitted applications will retain this experience."
                ],
                "id" => "deleteDegree",
                "action_01" => "Cancel",
                "action_02" => "Delete"
            ],
            "01" => [
                "type" => "confirmation",
                "title" => "Delete this Course/Certification?",
                "content" => [
                    "00" => "Are you sure you want to permanently delete this course or certification from your profile?",
                    "01" => "All previously submitted applications will retain this experience."
                ],
                "id" => "deleteCourse",
                "action_01" => "Cancel",
                "action_02" => "Delete"
            ],
            "02" => [
                "type" => "confirmation",
                "title" => "Delete this Lived Experience?",
                "content" => [
                    "00" => "Are you sure you want to permanently delete this lived experience from your profile?",
                    "01" => "All previously submitted applications will retain this experience."
                ],
                "id" => "deleteWork",
                "action_01" => "Cancel",
                "action_02" => "Delete"
            ],
            "03" => [
                "type" => "createReference",
                "title" => "Create a New Reference",
                "content" => [
                    "00" => "By submitting a reference you agree to having first asked their permission to provide their information. Please note that all information provided within a reference might be sent to said reference during a hiring process."
                ],
                "id" => "createReference",
                "action_01" => "Cancel",
                "action_02" => "Save"
            ],
            "04" => [
                "type" => "createSample",
                "title" => "Create a New Work Sample",
                "content" => [
                ],
                "id" => "createSample",
                "action_01" => "Cancel",
                "action_02" => "Save"
            ]
        ],

    /* Step 01 */
        "question_label" => "Your Answer",
        "question_title" => "My Fit",
        "claim_title" => "Basic Information",
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
        "experience" => [
            "title" => "My Experience",
            "description" => "Le poste auquel vous êtes sur le point de postuler requiert les études ou l'expérience minimales suivantes. Vous ne pouvez pas être considéré(e) pour ce travail à moins que vous ayez celles-ci, même si vous êtes vraiment génial(e). Les gestionnaires ne sont pas autorisés à vous engager pour cet emploi dans cette classification sans cette éducation ou cette expérience."
        ],
        "experience_section" => [
            "section_degree_title" => "My Diplomas/Degrees",
            "add_degree_label" => "Add Diploma/Degree",
            "null_degree_copy" => "You don't currently have any diplomas or degrees on your profile! Use the button above to add one.",
            "section_course_title" => "My Courses/Certifications",
            "add_course_label" => "Add Course/Certification",
            "null_course_copy" => "You don't currently have any courses or certifications on your profile! Use the button above to add one.",
            "section_work_title" => "My Lived Experience",
            "add_work_label" => "Add Lived Experience",
            "null_work_copy" => "You don't currently have any lived experience on your profile! Use the button above to add some.",
        ],

    /* Step 03/04 */
        "sidebar_item_title" => "Scroll to this skill.",
        "skills_section" => [
            "essential_title" => "Need to Have",
            "asset_title" => "Nice to Have",
            "add_button_label" => "Add Skill",
            "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
        ],
        "essential_title" => "Skills You Need to Have",
        "asset_title" => "Skills That Are Nice to Have",
        "essential_context" => "Le poste auquel vous êtes sur le point de postuler requiert les compétences suivantes. Oui, vraiment, toutes. Chacune au niveau minimum d’expertise précisé par le responsable du recrutement. Même si vous êtes incroyable et qu'il ne vous manque qu'une de ces compétences, on ne tiendra pas compte de votre candidature dans le cadre de ce poste. Vous devez également fournir des preuves de toute revendication de compétence que vous faites qui font partie d'un dossier gouvernemental. Donc, ne soyez pas tenté(e) d’étirer la vérité juste pour postuler. Vous êtes meilleur(e) que ça. Gagnez du temps et envisagez plutôt de postuler pour autre chose.",
        "asset_context" => "Vous pouvez postuler à cet emploi si vous ne possédez aucune de ces compétences. Ce sont des atouts qui, selon le responsable du recrutement, viendraient faciliter le travail. Ces compétences servent souvent pour sélectionner le ou la meilleur(e) candidat(e) parmi tous ceux et toutes celles qui répondent à tous les critères du « Besoin d’avoir ». Donc, si vous avez ces compétences, le moment est venu d'en informer le responsable du recrutement.",
        "essential_start_button_title" => "Scroll to begin filling out the skills you need to have.",
        "asset_start_button_title" => "Scroll to begin filling out the skills that are nice to have.",
        "skills_start_button_label" => "Get Started",
        "essential_sidebar_label" => "Skills Checklist",
        "asset_sidebar_label" => "Skills Checklist",

    /* Step 05 */
        "preview" => [
            "title" => "Review My Application",
            "copy_01" => "Voici votre dernière occasion d'examiner votre candidature avant de la soumettre. Faites défiler vers le bas pour l'examiner. Si vous souhaitez changer quelque chose, le moment est venu.",
            "copy_02" => "En signant votre nom ci-dessous, vous confirmez:",
            "copy_03" => "J'ai examiné ce que j'ai écrit dans ma candidature.\nJe comprends que je fais partie d'une collectivité de gens qui se font confiance.\nJe jure que l’information que je fournis est vraie.",
            "integrity_name_label" => "Sign (Type) Your Full Name",
            "integrity_date_label" => "Today's Date",
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
                "null_work_copy" => "You have no lived experience added to your profile."
            ],
            "section_03_title" => "Skills I Need to Have",
            "section_04_title" => "Skills That Are Nice to Have"
        ],

    /* Step 06 (Complete) */
        "complete" => [
            "title" => "Thanks for applying!",
            "copy_01" => "Talent Cloud is an experimental site. Please help us improve the federal staffing process by completing a short experience survey. This information will be anonymous and go directly towards helping us improve the platform!",
            "survey_link" => "GOOGLE",
            "survey_title" => "Take the survey.",
            "survey_label" => "Take the Survey",
            "copy_02" => "Curious about what's next for your application? Learn more about the staffing process in our FAQ",
            "return_title" => "Go to the Talent Cloud homepage.",
            "return_label" => "Return Home",
            "faq_title" => "Go to the Talent Cloud FAQ.",
            "faq_label" => "View the FAQ"
        ]

];