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
    'title' => 'Postuler maintenant',
    'view_title' => 'Application',
    'job_context_copy' => 'Vous postulez pour :',
    'save_quit_button_label' => 'Sauvegarder et quitter',
    'save_continue_button_label' => 'Sauvegarder & continuer',
    'save_button_working' => 'Actif...',
    'submit_button_label' => 'Soumettre',
    /* Tracker */
    'tracker_label' => 'Étape',
    'tracker_previous_title' => "Aller à l'étape précédente de l'application.",
    'tracker_previous_label' => 'Précédente',
    'tracker_next_title' => "Passez à l'étape suivante de l'application.",
    'tracker_next_label' => 'Suivante',

    /* Modals */
    'modals' => [
        'deleteDegree' => [
            'type' => 'deleteConfirmation',
            'title' => 'Supprimer ce diplôme?',
            'content' => [
                '00' => 'Êtes-vous certain de vouloir supprimer définitivement ce diplôme de votre profil?',
                '01' => 'Toutes les applications soumises précédemment conserveront cette expérience.',
            ],
            'id' => 'deleteDegree',
            'action_01' => 'Annuler',
            'action_02' => 'Supprimer',
            'action_02_progress' => 'Actif...',
        ],
        'deleteCourse' => [
            'type' => 'confirmation',
            'title' => 'Supprimer ce cours ou certification?',
            'content' => [
                '00' => 'Êtes-vous sûr de vouloir supprimer définitivement ce cours ou cette certification de votre profil?',
                '01' => 'Toutes les applications soumises précédemment conserveront cette expérience.',
            ],
            'id' => 'deleteCourse',
            'action_01' => 'Annuler',
            'action_02' => 'Supprimer',
            'action_02_progress' => 'Actif...',
        ],
        'deleteWork' => [
            'type' => 'confirmation',
            'title' => 'Supprimer cette expérience équivalente?',
            'content' => [
                '00' => 'Êtes-vous sûr de vouloir supprimer définitivement cette expérience équivalente de votre profil?',
                '01' => 'Toutes les applications soumises précédemment conserveront cette expérience équivalente.',
            ],
            'id' => 'deleteWork',
            'action_01' => 'Annuler',
            'action_02' => 'Supprimer',
            'action_02_progress' => 'Actif...',
        ],
        'createReference' => [
            'type' => 'createReference',
            'title' => 'Créer une nouvelle référence',
            'content' => [
                '00' => "En soumettant une référence, vous acceptez d'avoir préalablement demandé l'autorisation de fournir leurs informations. Veuillez noter que toutes les informations fournies dans une référence peuvent être envoyées à votre référence lors d'un processus d'embauche.",
            ],
            'id' => 'createReference',
            'action_01' => 'Annuler',
            'action_02' => 'Enregistrer',
        ],
        'createSample' => [
            'type' => 'createSample',
            'title' => 'Ajouter un nouvel échantillon de travail',
            //"content" => [],
            'id' => 'createSample',
            'action_01' => 'Annuler',
            'action_02' => 'Enregistrer',
        ],
    ],
    /* Step 01 */
    'step_01_title' => 'Nuage de talents | Candidat : Postuler maintenant - Étape 1',
    'question_label' => 'Votre réponse',
    'question_title' => 'Ma compatibilité',
    'claim_title' => 'Renseignements généraux',
    'select_default_option' => 'Choisir parmi les options suivantes ...',
    'language_declaration' => 'Répondez-vous aux exigences linguistiques pour ce poste?',
    'english_essential' => 'Je possède de solides compétences en lecture, en rédaction et en communication verbale en anglais.',
    'french_essential' => 'Je possède de solides compétences en lecture, en rédaction et en communication verbale en français.',
    'english_or_french' => 'Je possède de solides compétences en lecture, en rédaction et en communication verbale en français ou en anglais.',
    'bilingual_intermediate' => 'Je possède des compétences intermédiaires ou mieux en lecture, en rédaction et en communication verbale en français et en anglais.',
    'bilingual_advanced' => 'Je possède de solides compétences en lecture, en rédaction et en communication verbale en français et en anglais.',
    'language_declaration_error_message' => 'Cette case doit être cochée pour continuer.',
    'language_title' => 'Sélection de la langue',
    'language_copy' => 'Quelle langue officielle préféreriez-vous pour ce processus de candidature?',
    'language_label' => 'En choisir un',
    'citizenship_title' => 'Statut de citoyenneté',
    'citizenship_content' => "Lequel des cas suivants s'applique à vous?",
    'citizenship_label' => 'En choisir un',
    'veterans_title' => 'Statut Vétéran',
    'veterans_content' => 'Êtes-vous membre des Forces armées canadiennes?',
    'veterans_label' => 'En choisir un',
    'language_title' => 'Exigence linguistique',
    'language_copy' => 'Quelle langue officielle préféreriez-vous pour ce processus de candidature?',
    'language_label' => 'En choisir un',
    /* Step 02 */
    'step_02_title' => 'Nuage de talents | Candidat : Postuler maintenant - Étape 2',
    'experience' => [
        'title' => 'Mon expérience',
        'description' => "Le poste auquel vous êtes sur le point de postuler requiert les études ou l'expérience minimales suivantes. Vous ne pouvez pas être considéré(e) pour ce travail à moins que vous ayez celles-ci, même si vous êtes vraiment génial(e). Les gestionnaires ne sont pas autorisés à vous engager pour cet emploi dans cette classification sans cette éducation ou cette expérience.",
    ],
    'experience_section' => [
        'section_degree_title' => 'Mes diplômes et diplômes universitaires',
        'add_degree_label' => 'Ajouter un diplôme',
        'null_degree_copy' => "Vous n'avez actuellement aucun diplôme sur votre profil. Utilisez le bouton ci-dessus pour en ajouter un.",
        'section_course_title' => 'Mes cours et certifications',
        'add_course_label' => 'Ajouter un cours ou certification',
        'null_course_copy' => "Vous n'avez actuellement aucun cours ou certification sur votre profil. Utilisez le bouton ci-dessus pour en ajouter un.",
        'section_work_title' => 'Mon expérience équivalente',
        'add_work_label' => 'Ajouter une expérience équivalente',
        'null_work_copy' => "Vous n'avez actuellement aucune expérience équivalente listée dans votre profil. Utilisez le bouton ci-dessus pour en ajouter un.",
    ],
    /* Step 03/04 */
    'step_03_title' => 'Nuage de talents | Candidat : Postuler maintenant - Étape 3',
    'step_04_title' => 'Nuage de talents | Candidat : Postuler maintenant - Étape 4',
    'sidebar_item_title' => "Faites défiler jusqu'à cette compétence",
    'skills_section' => [
        'essential_title' => "Nécessaire d'avoir",
        'asset_title' => 'Bon à avoir',
        'add_soft_button_label' => 'Ajouter une compétence non spécialisées',
        'add_hard_button_label' => 'Ajouter une compétence spécialisées',
        'null_copy' => "Vous n'avez actuellement aucune compétence sur votre profil. Utilisez le bouton ci-dessus pour ajouter une compétence.",
    ],
    /* Step 3: Essential SKills Header */
    'essential_title' => 'Ce que vous devez avoir',
    'essential_subtitle' => 'Rappelez-vous que vous devez posséder TOUTES ces compétences pour postuler cet emploi!',
    'essential_question_1' => 'Q. Vraiment? J’ai la plupart de ces compétences et j’apprends vite.',
    'essential_answer_1' => 'Désolé, vous devez vraiment toutes les posséder, et au niveau adéquat.',
    'essential_question_2' => 'Q. Et si j’étirais un peu la vérité? Une fois qu’ils m’auront interviewé, ils changeront d’avis, c’est certain!',
    'essential_answer_2' => 'Ne le faites pas. Ces compétences seront évaluées, et vous valez mieux que ça.',
    'essential_sidebar_label' => 'Liste de compétences',

    'asset_title' => "Des compétences qu'il est bon à avoir",
    'asset_context' => "Vous pouvez postuler à cet emploi si vous ne possédez aucune de ces compétences. Ce sont des atouts qui, selon le responsable du recrutement, viendraient faciliter le travail. Ces compétences servent souvent pour sélectionner le ou la meilleur(e) candidat(e) parmi tous ceux et toutes celles qui répondent à tous les critères du « Besoin d’avoir ». Donc, si vous avez ces compétences, le moment est venu d'en informer le responsable du recrutement.",
    'asset_start_button_title' => "Faites défiler pour commencer à remplir les compétences qu'il est bon à avoir.",
    'skills_start_button_label' => 'Commencer',
    'asset_sidebar_label' => 'Liste de compétences',

    /* Step 05 */
    'step_05_title' => 'Nuage de talents | Candidat : Postuler maintenant - Étape 5',
    'preview' => [
        'title' => 'Revoir ma candidature',
        'copy_01' => "Voici votre dernière occasion d'examiner votre candidature avant de la soumettre. Faites défiler vers le bas pour l'examiner. Si vous souhaitez changer quelque chose, le moment est venu.",
        'sidebar' => [
            'label' => "Sections d'application",
            'item_01' => 'Renseignements généraux',
            'item_02' => 'Mon expérience',
            'item_03' => 'Les compétences que vous devez avoir',
            'item_04' => "Des compétences qu'il est bon à avoir",
            'item_05' => 'Soumettre',
        ],
        'section_01_title' => 'Renseignements généraux',
        'citizenship_null_copy' => 'Aucun statut de citoyenneté sélectionné',
        'veteran_null_copy' => 'Aucun statut de vétéran sélectionné',
        'language_null_copy' => 'Aucune langue sélectionnée',
        'long_question_null' => "Cette question n'a pas de réponse.",
        'section_02_title' => 'Mon expérience',
        'experience' => [
            'requirement_label' => 'Expérience nécessaire pour ce poste:',
            'degree_label' => 'Mes diplômes et diplômes universitaires',
            'null_degree_copy' => "Vous n'avez actuellement aucun diplôme sur votre profil.",
            'course_label' => 'Mes cours et certifications',
            'null_course_copy' => "Vous n'avez actuellement aucun cours ou certification sur votre profil.",
            'work_label' => 'Mon expérience équivalente',
            'null_work_copy' => "Vous n'avez actuellement aucune expérience équivalente listée dans votre profil.",
        ],
        'section_03_title' => 'Les compétences que vous devez avoir',
        'section_04_title' => "Des compétences qu'il est bon à avoir",
    ],
    /* Step 06 (Integrity Check) */
    'integrity' => [
        'title' => 'Confirmation de candidature',
        'confirmation_copy' => 'En signant votre nom ci-dessous, vous confirmez:',
        'confirmation_01' => "J'ai examiné ce que j'ai écrit dans ma candidature.",
        'confirmation_02' => "Je comprends que je fais partie d'une collectivité de gens qui se font confiance.",
        'confirmation_03' => 'Je jure que l’information que je fournis est vraie.',
        'signature_label' => 'Signez (tapez) votre nom complet',
        'date_label' => "La date d'aujourd'hui",
        'review' => "Voici votre dernière occasion d'examiner votre candidature avant de la soumettre. Faites défiler vers le bas pour l'examiner. Si vous souhaitez changer quelque chose, le moment est venu.",
        'save_label' => 'Sauvegarder et quitter',
        'submit_label' => 'Soumettre',
    ],
    /* Step 07 (Complete) */
    'complete' => [
        'step_06_title' => 'Nuage de talents | Candidat : Postuler maintenant - Étape 6',
        'title' => "Merci d'avoir postulé!",
        'copy_01' => "Nuage de talents est un site expérimental. Aidez-nous à améliorer le processus de dotation au fédéral en répondant à un bref sondage d'expérience. Cette information sera anonyme. En participant, vous nous aiderez directement à améliorer la plateforme.",
        'survey_link' => 'https://talentcloud1.typeform.com/to/tWIPup',
        'survey_title' => "Participer à l'enquête.",
        'survey_label' => "Participer à l'enquête",
        'copy_02' => 'Curieux de savoir quelle est la prochaine étape pour votre application? Pour en savoir plus sur le processus de dotation, consultez notre page foire aux questions.',
        'return_title' => "Aller à la page d'accueil de Nuage de talents.",
        'return_label' => "Retour à la page d'accueil",
        'faq_title' => 'Accéder à la foire aux questions du Talent Cloud.',
        'faq_label' => 'Voir la foire aux questions',
    ],
];
