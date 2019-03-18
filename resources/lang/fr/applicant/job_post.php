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
    'title' => 'Parcourir les emplois',
    'job_post_title' => 'Nuage de talents | Candidat : Affiche d\'emploi',
    'header' => [
        'time_remaining' => ':time jusqu\'à la date de clôture',
        "job_closed" => "L'affiche est fermée",
        'days_remaining' => ':count jour jusqu\'à la date de clôture|:count jours jusqu\'à la date de clôture',
        "apply_by_label" => "Postuler avant le",
        'applicants_so_far' => ':count candidat jusqu\'à présent|:count candidats jusqu\'à présent',
        'location_icon_label' => 'Symbole d\'emplacement.',
        'remote_work_icon_label' => 'Symbole de travail à distance.',
        'reference_id' => 'Numéro de référence #:id',
        'remote_work_allowed' => [
            true => 'Travail à distance autorisé',
            false => 'Travail à distance non autorisé',
        ],
        'sidebar_label' => 'À propos de l\'emploi:',
    ],
    'basics' => [
        'sidebar_title' => 'Voir les renseignements généraux pour cet emploi.',
        'title' => 'Renseignements généraux',
        'salary_label' => 'Échelle de salaire annuel',
        'duration_label' => 'Durée',
        'start_label' => 'Date cible de début d\'emploi',
        'language_label' => 'Exigence linguistique',
        'security_label' => 'Niveau d\'autorisation de sécurité',
        'classification_label' => 'Classification gouvernementale',
        'duration' => [
            'week' => ':count semaine.|:count semaines',
            'month' => ':count mois.|:count mois',
            'year' => ':count ans.|:count années',
            'permanent' => 'Permanent'
        ],
        'start_date_format' => 'F Y',
    ],
    'manager' => [
        'photo_title' => 'Photo de profile de :name.',
        'link_title' => 'Voir le profil de :name.'
    ],
    'impact' => [
        'sidebar_title' => 'Voir la contribution de cet emploi.',
        'title' => 'Contribution'
    ],
    'work' => [
        'sidebar_title' => 'Voir le travail pour cet emploi.',
        'title' => 'Votre travail'
    ],
    'criteria' => [
        'sidebar_title' => 'Voir les critères pour cet emploi.',
        'title' => 'Critères',
        'education_title' => 'Exigences d\'éducation',
        'essential_title' => 'Nécessaires d\'avoir',
        'asset_title' => 'Bon à avoir',
        'requirement_label' => 'Niveau requis: ',
        'level_link_title' => 'Visitez la FAQ pour en savoir plus sur ce niveau et les autres.'
    ],
    'language' => [
        'sidebar_title' => 'Voir les exigences linguistiques de ce travail.',
        'title' => 'Exigences linguistiques',
        'english_icon_title' => 'Un graphique représentant une exigence de langue anglaise',
        'french_icon_title' => 'Un graphique représentant une exigence de la langue française',
        'english_essential_context' => 'Ce poste a une exigence linguistique anglais essentiel. Le gestionnaire peut choisir d\'évaluer ma maîtrise de l\'anglais.',
        'french_essential_context' => 'Ce poste a une exigence linguistique français essentiel. Cela signifie que le gestionnaire peut choisir d\'évaluer ma maîtrise du français.',
        'bilingual_context_01' => 'Ce poste a une exigence linguistique bilingue. Cela signifie que vous devez posséder la %proficiency% requise, en anglais et en français, dans chacune des trois compétences linguistiques: compréhension, écriture et communication orale.',
        'proficiency_link' => 'https://www.canada.ca/fr/commission-fonction-publique/emplois/services/emplois-gc/renseignements-candidats/exigences-linguistiques.html',
        'proficiency_copy' => 'niveaux de compétence',
        'bilingual_context_02' => 'Vous pouvez essayer une %assessment% pour vous donner une idée du niveau (A, B ou C) que vous pourriez atteindre.',
        'assessment_link' => 'https://www.canada.ca/fr/commission-fonction-publique/services/evaluation-langue-seconde/tests-autoevaluation.html',
        'assessment_copy' => 'tests d’autoévaluation',
        'bilingual_context_03' => 'Si votre première langue officielle est le français, vous serez testé en anglais, et vice versa.',
        'english_french_context' => 'TRANSLATION NEEDED: NEEDS COPY'
    ],
    'culture' => [
        'sidebar_title' => 'Voir la culture à cet emploi.',
        'title' => 'Culture d\'équipe',
        'manager_title' => 'Votre gestionnaire',
        'manager_department_bridge' => ' au ',
        'guest_manager_link_label' => 'Veuillez vous connecter pour voir le profil de :name.',
        'manager_link_label' => 'Voir le profil de :name.',
        'work_environment_label' => 'Environnement de travail',
        'team_narrative_label' => 'Ce qu\'il faut savoir',
        'team_culture_label' => 'Culture d\'équipe',
        'team_size_label' => 'Taille de l\'équipe',
        'gcdirectory_label' => 'Rencontre l\'équipe dans GCannuaire',
        'team_link_title' => 'Voir le profil de l\'équipe.',
        'team_link_label' => 'Profil de l\'équipe',
        'operating_label' => 'Notre contexte opérationnel',
        'team_value_label' => 'Nos valeurs',
        'team_work_label' => 'Notre mode de fonctionnement'
    ],
    'work_environment' => [
        'remote_work_label' => 'Travail à distance :',
        'remote_work_allowed' => [
            true => 'Autorisé',
            false => 'Non autorisé',
        ],
        'telework_label' => 'Télétravail',
        'telework_allowed' => [
            'never' => 'Jamais',
            'rarely' => 'Rarement',
            'sometimes' => 'Parfois',
            'often' => 'Habituellement',
            'always' => 'Presque toujours',
        ],
        'time_flexibility_label' => 'Horaire flexible',
        'time_flexibility_allowed' => [
            'never' => 'Jamais',
            'rarely' => 'Rarement',
            'sometimes' => 'Parfois',
            'often' => 'Habituellement',
            'always' => 'Presque toujours',
        ],
    ],
    'know' => [
        'sidebar_title' => 'Voir les informations supplémentaires pour cet emploi.',
        'title' => 'Bon à savoir'
    ],
    'apply' => [
        'sidebar_title' => 'Voir la section de candidature pour cet emploi.',
        'title' => 'Postuler maintenant',
        'accommodation' => 'Veuillez informer l\'équipe du nuage de talents de toute mesure d\'adaptation dont vous pourriez avez besoin au cours du processus en écrivant à talent.cloud-nuage.de.talents@tbs-sct.gc.ca.',
        'preference' => 'On accordera la préférence aux anciens combattants et aux citoyens canadiens dans cet ordre.',
        'apply_link_title' => 'Postuler pour cet emploi.',
        'apply_link_label' => 'Postuler maintenant.',
        'login_link_title' => 'Ouvrir une session et postuler pour cet emploi.',
        'login_link_label' => 'Ouvrir une session et postuler. ',
        'job_closed_title' => 'Compétition fermée',
        'job_closed_label' => 'Compétition fermée',
        'edit_link_title' => 'Modifier cette affiche d\'emploi.',
        'edit_link_label' => 'Modifier'
    ],
];
