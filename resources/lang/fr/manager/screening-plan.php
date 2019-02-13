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
    "title" => "Screening Plan Builder",
    "generate_plan_for" => "Generate a screening plan for:",
    "narrative_warning" => "Please note that all screening plans will include an assessment of the narrative evidence provided by the applicant via Talent Cloud.",
    "essential_skills" => "Essential Skills",
    "essential_skills_empty" => "No Essential Criteria Exist",
    "asset_skills" => "Asset Skills",
    "asset_skills_empty" => "No Asset Criteria Exist",
    "build_new_plan" => "Build New Screening Plan",
    "my_screening_plans" => "My Screening Plans",
    "screening_plan_here" => "The screening plan that you generate using the button above will appear here.",
    "skill_builder" =>[
        "description" => "Description",
        "assessment_types" => "Assessment Types",
        "add_assessment" => "Add another assessment to this criteria."
    ],
    "select" => [
        "select_an_assessment" => "Select an Assessment",
        "assessment_removal" => "Removes the assessment above.",
        "remove" => "Remove"
    ],
    "plan" => [
        'copy' => "Copy",
        'delete' => "Delete",
        "essential_criteria" => "Essential Criteria",
        "asset_criteria" => "Asset Criteria",
        "plan" => "Assessment Plan",
        'colour_explanation' => "Skills below are colour coded so that :open_green_span Essential Skills :close_span are green and :open_blue_span Asset Skills :close_span are blue.",
        "skill_description_label" => "Skill Description",
        'summary' => [
            "assessment_types" => "Assessment Types",
            "skills_to_assess" => "Skills to be Assessed"
        ],
        'skill' => [
            "assessment_types" => "Assessment Types",
            "narrative_assessment" => "Assessment of Narrative Provided via Talent Cloud"
        ],
        "my_screening_plans" => "My Screening Plans",
        "assessment_types" => "Assessment Types",
        "narrative_assessment" => "Assessment of Narrative Provided via Talent Cloud"
    ],
    "delete_plan_modal" => [
        "title" => "Delete this Screening Plan?",
        "content" => [
            "Are you sure you want to permanently delete this Screening Plan from this Job?",
        ],
        "action_01" => "Cancel",
        "action_02" => "Delete",
        "action_02_progress" => "Working..."
    ]
];
