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
    "plan" => [
        "essential_criteria_title" => "Essential Criteria",
        "asset_criteria_title" => "Asset Criteria",
        "plan_title" => "Assessment Plan",
        "skill_description_label" => "Skill Description",
        "assessment_types_label" => "Assessment Types",
        "skills_label" => "Skills to be Assessed",
        "assessment_selection_label" => "Select an Assessment",
        "assessment_removal_title" => "Removes the assessment above.",
        "assessment_removal_label" => "Remove",
        "add_assessment_title" => "Add another assessment to this criteria.",
        "narrative_assessment_label" => "Assessment of Narrative Provided via Talent Cloud"
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
