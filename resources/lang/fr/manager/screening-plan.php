<?php
return [
    /*
    * --------------------------------------------------------------------------
    * Manager Job Screening Plan
    * --------------------------------------------------------------------------
    * Route: /manager/jobs/#/screening-plan
    * Controller: Controllers\ScreeningPlanController.php
    * View: views/manager/screening-plan.html.twig
    */
    "title" => "Générateur de plan d'évaluation",
    "generate_plan_for" => "Générer un plan d'évaluation pour :",
    "narrative_warning" => "Veuillez noter que tous les plans d’évaluation incluent un compte rendu des preuves narratives fournies par le candidat.",
    "essential_skills" => "Critère essentielles",
    "essential_skills_empty" => "Aucun critère essentiel n'existe",
    "asset_skills" => "Critère non-essentiel",
    "asset_skills_empty" => "Aucun critère non-essentiel n'existe",
    "build_new_plan" => "Générer un nouveau plan d'évaluation",
    "my_screening_plans" => "Mes plans d'évaluation",
    "screening_plan_here" => "Le plan d'évaluation que vous générez à l'aide du bouton ci-dessus apparaîtra ici.",
    "skill_builder" =>[
        "description" => "Description",
        "assessment_types" => "Types d'évaluation",
        "add_assessment" => "Ajoutez une autre évaluation à ce critère."
    ],
    "select" => [
        "select_an_assessment" => "Choisir une évaluation",
        "assessment_removal" => "Supprimer l'évaluation ci-dessus.",
        "remove" => "Supprimer"
    ],
    "plan" => [
        'copy' => "Copie",
        'delete' => "Supprimer",
        "essential_criteria" => "Critère essentielles",
        "asset_criteria" => "Critère non-essentiel",
        "plan" => "Plan d'évaluation",
        'colour_explanation' => "Les compétences ci-dessous sont codées par des couleurs afin que les :open_green_span critère essentielles :close_span sont vert et les :open_blue_span Critère non-essentiel :close_span sont bleu.",
        "skill_description_label" => "Description du compétence",
        'summary' => [
            "assessment_types" => "Types d'évaluation",
            "skills_to_assess" => "Compétences à évaluer"
        ],
        'skill' => [
            "assessment_types" => "Types d'évaluation",
            "narrative_assessment" => "Compte rendu des preuves narratives fournies par le candidat"
        ],
        "my_screening_plans" => "Mes plans d'évaluation",
        "assessment_types" => "Types d'évaluation",
        "narrative_assessment" => "Compte rendu des preuves narratives fournies par le candidat"
    ],
    "delete_plan_modal" => [
        "title" => "Supprimer cet plan d'évaluation?",
        "content" => [
            "Êtes-vous sûr de vouloir supprimer définitivement le plan d’évaluation de cet emploi?",
        ],
        "action_01" => "Annuler",
        "action_02" => "Supprimer",
        "action_02_progress" => "travail..."
    ]
];
