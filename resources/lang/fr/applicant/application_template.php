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
    'title' => 'Soumettre une application',
    'view_title' => 'Application',
    'job_context_copy' => 'Vous postulez pour :',
    'save_return_button_label' => "Sauvegarde et retour à l'étape :step_id",
    'save_return_to_applications' => "Sauvegarder et aller à Mes applications",
    'save_quit_button_label' => 'Sauvegarder et quitter',
    'save_continue_button_label' => 'Sauvegarder et continuer',
    'save_button_working' => 'Actif...',
    'submit_button_label' => 'Soumettre',
    'applying_to' => 'Vous postulez pour :',
    'application_success' => 'Vous avez postulé avec succès à :',
    'applying_to_bridge' => '-',
    'pilot' => 'BETA / Projet pilote',
    'sidebar_label' => 'Sur cette page :',
    'accordion_helper' => 'Cliquez pour voir...',
    'required_label' => 'Requis',
    'input_error' => 'Cette entrée contient une erreur.',
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
    'language_title' => 'Exigence linguistique',
    'language_copy' => 'Quelle langue officielle préféreriez-vous pour ce processus de candidature?',
    'language_label' => 'En choisir un',
    'communication_title' => 'Communication',
    'citizenship_title' => 'Statut de citoyenneté',
    'citizenship_content' => "Lequel des cas suivants s'applique à vous?",
    'citizenship_label' => 'En choisir un',
    'veterans_title' => 'Statut Vétéran',
    'veterans_content' => 'Êtes-vous membre des Forces armées canadiennes?',
    'veterans_label' => 'En choisir un',
    /* Step 02 */
    'step_02_title' => 'Nuage de talents | Candidat : Postuler maintenant - Étape 2',
    'step_02_requirement_label' => 'Exigences d\'éducation',
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
        'helper_text' => 'Veuillez noter que les compétences signalées par un <span data-c-visibility="invisible">point d\'exclamation</span><i class="fas fa-exclamation" data-c-color="slow" data-c-margin="rl(.25)"></i> sont incomplètes et ont besoin de votre attention. Les compétences signalées par une <span data-c-visibility="invisible">coche</span><i class="fas fa-check" data-c-color="go" data-c-margin="rl(.25)"></i> sont prêtes à être soumises ou ont été pré-remplies à partir de votre profil. Vous pouvez les modifier au besoin.',
        'asset_null_text' => 'Il semble qu\'il n\'y ait pas d\'autres compétences qui soient un atout pour ce poste. Veuillez utiliser le bouton ci-dessous pour passer à l\'étape suivante.',
        'essential_title' => "Nécessaire d'avoir",
        'asset_title' => 'Bon à avoir',
        'add_soft_button_label' => 'Ajouter une compétence non spécialisées',
        'add_hard_button_label' => 'Ajouter une compétence spécialisées',
        'null_copy' => "Vous n'avez actuellement aucune compétence sur votre profil. Utilisez le bouton ci-dessus pour ajouter une compétence.",
    ],
    /* Step 3: Essential SKills Header */
    'essential_title' => 'Les compétences que vous devez avoir',
    'essential_subtitle' => 'Rappelez-vous que vous devez posséder TOUTES ces compétences pour postuler cet emploi!',
    'essential_question_1' => 'Q. Vraiment? J’ai la plupart de ces compétences et j’apprends vite.',
    'essential_answer_1' => 'Désolé, vous devez vraiment toutes les posséder, et au niveau adéquat.',
    'essential_question_2' => 'Q. Et si j’étirais un peu la vérité? Une fois qu’ils m’auront interviewé, ils changeront d’avis, c’est certain!',
    'essential_answer_2' => 'Ne le faites pas. Ces compétences seront évaluées, et vous valez mieux que ça.',

    'asset_title' => "Les compétences qu'il est bon à avoir",
    'asset_context' => "Vous pouvez postuler à cet emploi si vous ne possédez aucune de ces compétences. Ce sont des atouts qui, selon le responsable du recrutement, viendraient faciliter le travail. Ces compétences servent souvent pour sélectionner le ou la meilleur(e) candidat(e) parmi tous ceux et toutes celles qui répondent à tous les critères du « Besoin d’avoir ». Donc, si vous avez ces compétences, le moment est venu d'en informer le responsable du recrutement.",
    'asset_start_button_title' => "Faites défiler pour commencer à remplir les compétences qu'il est bon à avoir.",
    'skills_start_button_label' => 'Commencer',

    /* Step 3&4 */
    'skill_sidebar_label' => 'Liste de compétences',

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
        'applicant_label' => 'Candidat :',
        'section_01_title' => 'Renseignements généraux',
        'citizenship_null_copy' => 'Aucun statut de citoyenneté sélectionné',
        'veteran_null_copy' => 'Aucun statut de vétéran sélectionné',
        'english_choice' => "Je préfère <strong>l'anglais</strong> pour ce processus de candidature.",
        'french_choice' => 'Je préfère <strong>le français</strong> pour ce processus de candidature.',
        'language_null_copy' => 'Aucune langue sélectionnée',
        'long_question_null' => "Cette question n'a pas de réponse.",
        'section_02_title' => 'Mon expérience',
        'experience' => [
            'requirement_label' => 'Expérience nécessaire pour ce poste:',
            'degree_label' => 'Mes diplômes et diplômes universitaires',
            'null_degree_copy' => "Vous n'avez actuellement aucun diplôme sur votre application.",
            'course_label' => 'Mes cours et certifications',
            'null_course_copy' => "Vous n'avez actuellement aucun cours ou certification sur votre application.",
            'work_label' => 'Mon expérience équivalente',
            'null_work_copy' => "Vous n'avez actuellement aucune expérience équivalente listée dans votre application.",
        ],
        'section_03_title' => 'Les compétences que vous devez avoir',
        'section_04_title' => "Des compétences qu'il est bon à avoir",
    ],
    /* Step 06 (Integrity Check) */
    'integrity' => [
        'title' => 'Confirmation de candidature',
        'confirmation_copy' => 'En signant mon nom ci-dessous, je confirme:',
        'confirmation_01' => "J'ai examiné ce que j'ai écrit dans ma candidature.",
        'confirmation_02' => "Je comprends que je fais partie d'une collectivité de gens qui se font confiance.",
        'confirmation_03' => 'Je jure que l’information que je fournis est vraie.',
        'signature_label' => 'Signez (tapez) votre nom complet',
        'date_label' => "La date d'aujourd'hui",
        'review' => "Voici votre dernière occasion d'examiner votre candidature avant de la soumettre. Faites défiler vers le bas pour l'examiner. Si vous souhaitez changer quelque chose, le moment est venu.",
        'save_label' => 'Sauvegarder et quitter',
        'submit_label' => 'Soumettre ma candidature',
    ],
    /* Step 07 (Complete) */
    'complete' => [
        'step_06_title' => 'Nuage de talents | Candidat : Postuler maintenant - Étape 6',

        'title' => "Merci d'avoir postulé!",
        'next_steps' => 'Prochaines étapes',
        'next_step_copy_1' => 'En attendant que votre demande soit traitée, vous pouvez prendre quelques mesures proactives pour accélérer le processus. Le poste auquel vous venez de postuler nécessite une',
        'next_step_copy_2' => 'l\'habilitation de sécurité. Pour aider à accélérer le processus,',
        'next_step_copy_faq_link_title' => 'En savoir plus sur l\'obtention d\'une habilitation de sécurité.',
        'next_step_copy_faq_link_label' => 'pour en savoir plus sur la procédure d\'obtention de cette habilitation de sécurité, consultez notre FAQ',
        'reminder' => 'Rappel :',
        'reminder_copy' => 'ce poste continuera à accepter d\'autres demandes jusqu\'à ce que',
        'view_application_title' => 'Consultez la demande que vous avez soumise.',
        'view_application_label' => 'Consultez la demande que vous avez soumise',
        'other_resources' => 'Autres ressources',
        'submit_feedback_link_title' => 'Envoyez vos commentaires sur le Talent Cloud par e-mail.',
        'submit_feedback_link_label' => 'Soumettez vos commentaires sur votre expérience',
        'update_profile_link_title' => 'Ouvrez votre profil.',
        'update_profile_link_label' => 'Mettez votre profil à jour',
        'browse_jobs_title' => 'Consultez les autres emplois.',
        'browse_jobs_label' => 'Consultez les autres emplois',
        'faq_link_title' => 'En savoir plus sur le processus d\'embauche.',
        'faq_link_label' => 'En savoir plus sur le processus d\'embauche',

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

    'strategic_response' => [
        'required_information' => 'Informations requises',
        'gov_email_copy' => 'Quel est votre compte courriel actif du GC? (doit se terminer par .ca)',
        'gov_email_label' => 'Courriel du GC',
        'physical_office_willing_copy' => 'Êtes-vous prêt à venir au travail dans un réel bureau?',
        'physical_office_willing_label' => 'Cochez si oui',
        'security_clearance_copy' => 'Quel est votre niveau d’autorisation de sécurité actuel?',
        'security_clearance_label' => 'En choisir un',
        'director_alert' => [
            'heading' => 'When will your Director and Reference be contacted?',
            'ask_manager' => 'Ask your Manager and Director for approval to be loaned to another team for a bit to help out.',
            'screened_in' => 'If your application is screened in, we will send your Director and Reference an email for a reference check.'
        ],
        'director_title' => 'Informations de directeur',
        'director_name_label' => 'Nom du directeur',
        'director_title_label' => 'Titre du directeur',
        'director_email_label' => 'Courriel du directeur',
        'reference_title' => 'Informations de référence',
        'reference_name_label' => 'Nom de référence',
        'reference_title_label' => 'Titre de référence',
        'reference_email_label' => 'Courriel de référence',
        'director_copy' => 'Quels sont le nom et l’adresse courriel de votre directeur actuel? (Nous aurons besoin de l’approbation indiquant que vous pouvez être prêté à une autre équipe pendant un certain temps pour aider.)',
        'reference_copy' => 'Quels sont le nom et l’adresse courriel d’un autre répondant qui peut confirmer votre ensemble de compétences? (De préférence un superviseur actuel ou récent du gouvernement du Canada.)',
        'experience_title' => 'Mon éducation',
        'experience_description' => 'Ajoutez les études si elles sont pertinentes par rapport aux compétences requises pour cet emploi.',
        'essential_alert' => [
            'heading' => 'Ces compétences sont ce dont les ministères ont besoin en ce moment.',
            'context' => 'Si vous voulez vraiment aider, <strong>il faut absolument que vous possédiez ces compétences</strong>.'
        ],
        'essential_context_1' => 'Nous vous remercions d’avoir répondu à la demande et de proposer de nous aider. Vous êtes formidable.',
        'essential_context_2' => "Vous serez placé dans une équipe différente, soit une équipe qui devra travailler sous pression ou respecter des délais serrés pour apporter son soutien aux Canadiens. Si vous avez de solides compétences dans ces domaines et que vous êtes le genre de personne qui s’engage à fond, vous êtes la personne pour le poste. (Si vous ne possédez pas de solides compétences dans ces domaines, mais que vous voulez tout de même aider, consultez les autres demandes de compétences).",
        'asset_alert' => [
            'heading' => "Ces compétences seraient bien d'avoir",
            'context' => 'Cela n’est pas nécessaire pour l’emploi que vous pourriez occuper. Vous pouvez l’apprendre au fur et à mesure. Mais ce serait bien si vous possédiez déjà la ou les compétences énumérées ci-dessous.',
        ],
        'skill_prompt' => 'Communiquez quelques points de haut niveau sur votre expérience professionnelle.',
        'skill_placeholder' => 'Parlez-nous brièvement de vos compétences, par exemple où vous les avez acquises et dans quel rôle vous les avez acquises, et de ce que vous avez accompli.',
        'preview_security_clearance_label' => 'Niveau d’autorisation de sécurité',
        'preview_physical_office_yes' => '<strong>Oui</strong>, je suis prêt à venir travailler dans un bureau physique.',
        'preview_physical_office_no' => '<strong>Non</strong>, je ne suis pas disposé à venir travailler dans un bureau physique.',
        'confirmations' => [
            'Que je fais partie d’une communauté de personnes qui se font confiance.',
            'Les gens compteront sur moi pour faire ce travail en cette période de grand besoin et j’atteste que les informations que j’ai fournies sont exactes.',
        ],
        'complete_title' => 'Réussite!',
        'complete_copy_1' => 'Vous êtes génial.',
        'complete_copy_2' => 'Merci d’avoir soumis votre candidature. L’équipe de la Réserve de talents du GC vous contactera dans quelques jours pour vous informer des prochaines étapes.',
        'complete_return_label' => 'Retour à la page d\'accueil',
        'no_info' => 'Aucun critère supplémentaire requis.'
    ]
];
