var SkillDeclarationAPI = {};

SkillDeclarationAPI.SkillDeclaration = function (
        skillDeclarationId,
        skill,
        criteriaId,
        criteriaType,
        experienceLevelId,
        skillLevelId,
        description,
        lastUpdated) {
    this.skill_declaration_id = skillDeclarationId;
    this.skill = skill;
    this.criteria_id = criteriaId;
    this.criteria_type = criteriaType;
    this.experience_level_id = experienceLevelId;
    this.skill_level_id = skillLevelId;
    this.description = description;
    this.last_updated = lastUpdated;
};

SkillDeclarationAPI.loadSavedSkillDeclarationsForJobApplication = function (jobApplicationId) {
    DataAPI.getSkillDeclarationsForApplication(jobApplicationId, function (request) {
        //Check that request returned a valid response
        if (request.status === 200 && request.response) {
            var declarations = JSON.parse(request.response);
            SkillDeclarationAPI.populateApplicationUiSkillDeclarations(declarations);
        }
    });
};

SkillDeclarationAPI.populateApplicationUiSkillDeclarations = function (skillDeclarations) {
    skillDeclarations.forEach(declaration => {
        //find appropriate Evidence Panel
        var panel = document.querySelector('.applicant-evidence__accordion-wrapper[data-criteria-id="' + declaration.criteria_id + '"][data-criteria-type="' + declaration.criteria_type + '"]');
        //if panel exists, set skill declaration values
        if (panel) {
            if (declaration.experience_level_id) {
                var experienceSelect = panel.querySelector('input[type="radio"][name="experience"][value="' + declaration.experience_level_id + '"]');
                if (experienceSelect) {
                    experienceSelect.checked = true;
                }
            }
            if (declaration.skill_level_id) {
                var skillLevelSelect = panel.querySelector('input[type="radio"][name="expertise"][value="' + declaration.skill_level_id + '"]');
                if (skillLevelSelect) {
                    skillLevelSelect.checked = true;
                }
            }

            var description = panel.querySelector('.applicant-evidence__skill-declaration-text');
            if (description) {
                description.value = declaration.description;
            }
        }
    });
};

/**
 * Saves all skill declarations of given type. 
 * If criteriaType is undefined, it saves ALL skill declarations.
 * 
 * Call onSuccess if application is saved successfully
 * 
 * NOTE: this function does not do any validation. It saves declarations with 
 * empty values if they exist on the page but have not been filled out.
 * 
 * @param {string} criteriaType
 * @param {function} onSuccess
 * @return {undefined}
 */
SkillDeclarationAPI.saveSkillDeclarations = function (criteriaType, onSuccess) {
    if (criteriaType) {
        var evidencePanels = document.querySelectorAll(".applicant-evidence__accordion-wrapper[data-criteria-type=\"" + criteriaType + "\"]:not(.template)")
    } else if (criteriaType === undefined) {
        var evidencePanels = document.querySelectorAll(".applicant-evidence__accordion-wrapper:not(.template)")
    } else {
        Utilities.debug ? console.log("Cannot save Skill Declarations with given type.") : null;
        return;
    }

    evidencePanels.forEach(panel => {
        var newSkillDeclaration = new SkillDeclarationAPI.SkillDeclaration();
        
        newSkillDeclaration.criteria_type = panel.getAttribute("data-criteria-type");
        newSkillDeclaration.criteria_id = panel.getAttribute("data-criteria-id");
        
        var experienceSelect = panel.querySelector('input[name="experience"][checked]'); //This will come back null, if no radio button has been selected yet
        newSkillDeclaration.experience_level_id = experienceSelect ? experienceSelect.value : ""; //Default to an empty string if nothing has been selected
        
        var skillLevelSelect = panel.querySelector('input[name="expertise"][checked]'); //This will come back null, if no radio button has been selected yet
        newSkillDeclaration.skill_level_id = skillLevelSelect ? skillLevelSelect : ""; //Default to an empty string if nothing has been selected
        
        newSkillDeclaration.description = panel.querySelector('.applicant-evidence__skill-declaration-text');

        var applicationId = document.getElementById("createJobApplicationJobApplicationId").value;
        if (applicationId) {
            DataAPI.saveSkillDeclaration(newSkillDeclaration, criteriaType, newSkillDeclaration.criteria_id, applicationId, function (response) {
                if (response.status == 200) {
                    if (onSuccess) {
                        onSuccess();
                    }
                } else {
                    //TODO: how to respond to failed status? 
                }
            });
        }

    });
};