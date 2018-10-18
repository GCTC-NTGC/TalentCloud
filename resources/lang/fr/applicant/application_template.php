<?php

return [
    /*
    * --------------------------------------------------------------------------
    * French Application Process Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used in the application process.
    *
    */
    "title" => "Postuler maintenant",
    "job_context_copy" => "Vous postulez pour:",
    "save_quit_button_label" => "Sauvegarder et quitter",
    "save_continue_button_label" => "Sauvegarder & continuer",
    "submit_button_label" => "Soumettre",

    /* Tracker */
        "tracker_label" => "Étape",
        "tracker_previous_title" => "Aller à l'étape précédente de la demande d'emploi.",
        "tracker_previous_label" => "Précédente",
        "tracker_next_title" => "Passez à l'étape suivante de la demande d'emploi.",
        "tracker_next_label" => "Suivante",

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
        "sidebar_item_title" => "Faites défiler jusqu'à cette compétence",
        "skills_section" => [
            "essential_title" => "Nécessaire d'avoir",
            "asset_title" => "Bon d'avoir",
            "add_button_label" => "Ajouter une compétence",
            "null_copy" => "Vous n'avez actuellement aucune compétence sur votre profil. Utilisez le bouton ci-dessus pour ajouter une compétence."
        ],
        "essential_title" => "Les compétences que vous devez avoir",
        "asset_title" => "Des compétences qu'il est bon d'avoir",
        "essential_context" => "Le poste auquel vous êtes sur le point de postuler requiert les compétences suivantes. Oui, vraiment, toutes. Chacune au niveau minimum d’expertise précisé par le responsable du recrutement. Même si vous êtes incroyable et qu'il ne vous manque qu'une de ces compétences, on ne tiendra pas compte de votre candidature dans le cadre de ce poste. Vous devez également fournir des preuves de toute revendication de compétence que vous faites qui font partie d'un dossier gouvernemental. Donc, ne soyez pas tenté(e) d’étirer la vérité juste pour postuler. Vous êtes meilleur(e) que ça. Gagnez du temps et envisagez plutôt de postuler pour autre chose.",
        "asset_context" => "Vous pouvez postuler à cet emploi si vous ne possédez aucune de ces compétences. Ce sont des atouts qui, selon le responsable du recrutement, viendraient faciliter le travail. Ces compétences servent souvent pour sélectionner le ou la meilleur(e) candidat(e) parmi tous ceux et toutes celles qui répondent à tous les critères du « Besoin d’avoir ». Donc, si vous avez ces compétences, le moment est venu d'en informer le responsable du recrutement.",
        "essential_start_button_title" => "Faites défiler pour commencer à remplir les compétences que vous devez avoir.",
        "asset_start_button_title" => "Faites défiler pour commencer à remplir les compétences qu'il est bon d'avoir.",
        "skills_start_button_label" => "Commencer",
        "essential_sidebar_label" => "Liste de compétences",
        "asset_sidebar_label" => "Liste de compétences",

    /* Step 05 */
        "preview" => [
            "title" => "Revoir ma candidature",
            "copy_01" => "Voici votre dernière occasion d'examiner votre candidature avant de la soumettre. Faites défiler vers le bas pour l'examiner. Si vous souhaitez changer quelque chose, le moment est venu.",
            "copy_02" => "En signant votre nom ci-dessous, vous confirmez:",
            "copy_03" => "J'ai examiné ce que j'ai écrit dans ma candidature.\nJe comprends que je fais partie d'une collectivité de gens qui se font confiance.\nJe jure que l’information que je fournis est vraie.",
            "integrity_name_label" => "Signez (tapez) votre nom complet",
            "integrity_date_label" => "La date d'aujourd'hui",
            "sidebar" => [
                "label" => "Sections d'application",
                "item_01" => "Renseignements généraux",
                "item_02" => "Mon expérience",
                "item_03" => "Les compétences que vous devez avoir",
                "item_04" => "Des compétences qu'il est bon d'avoir",
                "item_05" => "Soumettre"
            ],
            "section_01_title" => "Renseignements généraux",
            "citizenship_null_copy" => "Aucun statut de citoyenneté sélectionné",
            "veteran_null_copy" => "Aucun statut de vétéran sélectionné",
            "language_null_copy" => "Aucune langue sélectionnée",
            "long_question_null" => "Cette question n'a pas de réponse.",
            "section_02_title" => "Mon expérience",
            "experience" => [
                "requirement_label" => "Expérience nécessaire pour ce poste:",
                "degree_label" => "Mes diplômes et diplômes universitaires",
                "null_degree_copy" => "Vous n'avez actuellement aucun diplôme sur votre profil.",
                "course_label" => "Mes cours et certifications",
                "null_course_copy" => "Vous n'avez actuellement aucun cours ou certification sur votre profil.",
                "work_label" => "Mon expérience équivalente",
                "null_work_copy" => "Vous n'avez actuellement aucune expérience équivalente listée dans votre profil."
            ],
            "section_03_title" => "Les compétences que vous devez avoir",
            "section_04_title" => "Des compétences qu'il est bon d'avoir"
        ],

    /* Step 06 (Complete) */
        "complete" => [
            "title" => "Merci d'avoir postulé!",
            "copy_01" => "Nuage de talents est un site expérimental. Aidez-nous à améliorer le processus de dotation au fédéral en répondant à un bref sondage d'expérience. Cette information sera anonyme. En participant, vous nous aiderez directement à améliorer la plateforme.",
            "survey_link" => "GOOGLE",
            "survey_title" => "Participer à l'enquête.",
            "survey_label" => "Participer à l'enquête",
            "copy_02" => "Curieux de savoir quelle est la prochaine étape pour votre application?Pour en savoir plus sur le processus de dotation, consultez notre page foire aux questions.",
            "return_title" => "Aller à la page d'accueil de Nuage de talents.",
            "return_label" => "Retour à la page d'accueil",
            "faq_title" => "Accéder à la foire aux questions du Talent Cloud.",
            "faq_label" => "Voir la foire aux questions"
        ]

];
