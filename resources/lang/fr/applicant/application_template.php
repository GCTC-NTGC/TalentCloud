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
    "title" => "Postuler maintenant",
    "job_context_copy" => "Vous postulez pour:",
    "save_quit_button_label" => "Sauvegarder et quitter",
    "save_continue_button_label" => "Sauvegarder & continuer",

    /* Modals */
        "modals" => [
            "00" => [
            "type" => "deleteConfirmation",
            "title" => "Supprimer ce diplôme?",
                "content" => [
                "00" => "Êtes-vous certain de vouloir supprimer définitivement ce diplôme de votre profil?",
                "01" => "Toutes les applications soumises précédemment conserveront cette expérience."
                ],
                "id" => "deleteDegree",
                "action_01" => "Annuler",
                "action_02" => "Supprimer"
            ],
            "01" => [
                "type" => "confirmation",
                "title" => "Supprimer ce cours ou certification?",
                "content" => [
                "00" => "Êtes-vous sûr de vouloir supprimer définitivement ce cours ou cette certification de votre profil?",
                "01" => "Toutes les applications soumises précédemment conserveront cette expérience."
                ],
                "id" => "deleteCourse",
                "action_01" => "Annuler",
                "action_02" => "Supprimer"
            ],
            "02" => [
                "type" => "confirmation",
                "title" => "Supprimer cette expérience équivalente?",
                "content" => [
                "00" => "Êtes-vous sûr de vouloir supprimer définitivement cette expérience équivalente de votre profil?",
                "01" => "Toutes les applications soumises précédemment conserveront cette expérience équivalente."
                ],
                "id" => "deleteWork",
                "action_01" => "Annuler",
                "action_02" => "Supprimer"
            ],
            "03" => [
                "type" => "createReference",
                "title" => "Créer une nouvelle référence",
                "content" => [
                    "00" => "En soumettant une référence, vous acceptez d'avoir préalablement demandé l'autorisation de fournir leurs informations. Veuillez noter que toutes les informations fournies dans une référence peuvent être envoyées à votre référence lors d'un processus d'embauche."
                ],
                "id" => "createReference",
                "action_01" => "Annuler",
                "action_02" => "Enregistrer"
            ],
            "04" => [
                "type" => "createSample",
                "title" => "Ajouter un nouvel échantillon de travail",
                "content" => [
                ],
                "id" => "createSample",
                "action_01" => "Annuler",
                "action_02" => "Enregistrer"
            ]
        ],

    /* Step 01 */
        "question_label" => "Votre réponse",
        "question_title" => "Ma compatibilité",
        "claim_title" => "Renseignements généraux",
        "language_title" => "Sélection de la langue",
        "language_copy" => "Quelle langue officielle préféreriez-vous pour ce processus de candidature?",
        "language_label" => "En choisir un",
        "citizenship_title" => "Statut de citoyenneté",
        "citizenship_content" => "Lequel des cas suivants s'applique à vous?",
        "citizenship_label" => "En choisir un",
        "veterans_title" => "Statut Vétéran",
        "veterans_content" => "Êtes-vous membre des Forces armées canadiennes?",
        "veterans_label" => "En choisir un",
        "language_title" => "Exigence linguistique",
        "language_copy" => "Quelle langue officielle préféreriez-vous pour ce processus de candidature?",
        "language_label" => "En choisir un",

    /* Step 02 */
        "experience" => [
            "title" => "Mon expérience",
            "description" => "Le poste auquel vous êtes sur le point de postuler requiert les études ou l'expérience minimales suivantes. Vous ne pouvez pas être considéré(e) pour ce travail à moins que vous ayez celles-ci, même si vous êtes vraiment génial(e). Les gestionnaires ne sont pas autorisés à vous engager pour cet emploi dans cette classification sans cette éducation ou cette expérience."
        ],
        "experience_section" => [
            "section_degree_title" => "Mes diplômes et diplômes universitaires",
            "add_degree_label" => "Ajouter un diplôme",
            "null_degree_copy" => "Vous n'avez actuellement aucun diplôme sur votre profil. Utilisez le bouton ci-dessus pour en ajouter un.",
            "section_course_title" => "Mes cours et certifications",
            "add_course_label" => "Ajouter un cours ou certification",
            "null_course_copy" => "Vous n'avez actuellement aucun cours ou certification sur votre profil. Utilisez le bouton ci-dessus pour en ajouter un.",
            "section_work_title" => "Mon expérience équivalente",
            "add_work_label" => "Ajouter une expérience équivalente",
            "null_work_copy" => "Vous n'avez actuellement aucune expérience équivalente listée dans votre profil. Utilisez le bouton ci-dessus pour en ajouter un.",
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
