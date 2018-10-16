<?php

return [
    /*
    * --------------------------------------------------------------------------
    * French Profile-Experience Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are applicant profile Edit Experience
    *
    */

    "title" => "Mon expérience",
    "experience_section" => [
        "section_degree_title" => "Mes diplômes",
        "add_degree_label" => "Ajouter un diplôme",
        "null_degree_copy" => "Vous n'avez actuellement aucun diplôme sur votre profil! Utilisez le bouton ci-dessus pour en ajouter un.",
        "section_course_title" => "Mes cours et certifications",
        "add_course_label" => "Ajouter un cours ou une certification",
        "null_course_copy" => "Vous n'avez actuellement aucun cours ou certification sur votre profil! Utilisez le bouton ci-dessus pour en ajouter un.",
        "section_work_title" => "Mon expérience équivalente",
        "add_work_label" => "Ajouter une expérience équivalente",
        "null_work_copy" => "Vous n'avez actuellement aucune expérience équivalente sur votre profil! Utilisez le bouton ci-dessus pour en ajouter.",
    ],

    //TODO: move modals to under a ViewComposer's responsability
    "modals" => [
        "delete_degree" => [
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
        "delete_course" => [
            "type" => "deleteConfirmation",
            "title" => "Supprimer ce cours ou certification?",
            "content" => [
                "00" => "Êtes-vous sûr de vouloir supprimer définitivement ce cours ou cette certification de votre profil?",
                "01" => "Toutes les applications soumises précédemment conserveront cette expérience."
            ],
            "id" => "deleteCourse",
            "action_01" => "Annuler",
            "action_02" => "Supprimer"
        ],
        "delete_work_experience" => [
            "type" => "deleteConfirmation",
            "title" => "Supprimer cette expérience équivalente?",
            "content" => [
                "00" => "Êtes-vous sûr de vouloir supprimer définitivement cette expérience équivalente de votre profil?",
                "01" => "Toutes les applications soumises précédemment conserveront cette expérience équivalente."
            ],
            "id" => "deleteWork",
            "action_01" => "Annuler",
            "action_02" => "Supprimer"
        ]
    ]
];
