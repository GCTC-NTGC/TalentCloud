<?php

return [
    /*
    * --------------------------------------------------------------------------
    * Profile-Skills Language Lines
    * --------------------------------------------------------------------------
    *
    * The following language lines are used on applicant profile Edit Skills page
    *
    */

    "title" => "My Skills",
    "skills_section" => [
        "skills_title" => "Talent Cloud | Applicant: Profile - My Skills",
        "soft_title" => "My Soft Skills",
        "hard_title" => "My Hard Skills",
        "add_button_label" => "Add Skill",
        "null_copy" => "You don't currently have any skills on your profile! Use the button above to add a skill."
    ],

    //TODO: move modals to under a ViewComposer's responsability
    "modals" => [
        "delete_skill" => [
            "type" => "deleteConfirmation",
            "title" => "Delete this Skill?",
            "content" => [
                "00" => "Are you sure you want to permanently delete this skill from your profile?",
                "01" => "All previously submitted applications will retain this skill. By deleting this skill you acknowledge the permanent deletion of all credit earned towards this skill."
            ],
            "id" => "deleteSkill",
            "action_01" => "Cancel",
            "action_02" => "Delete",
            "action_02_progress" => "Working..."
        ]
    ]
];
