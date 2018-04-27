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

    /**
     * This is valid if experience_level_id, skill_level_id, and description 
     * are not empty.
     * 
     * @return {Boolean}
     */
    this.isValid = function () {
        return (this.skill_level_id != "" && this.experience_level_id != "" && this.description != "");
    };
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
 * Saves all completed skill declarations of given type. 
 * If criteriaType is undefined, it saves ALL completed skill declarations.
 * 
 * Call onSuccess if application is saved successfully
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

    var submittedRequests = 0; //to keep track of number of PUT calls in progress

    evidencePanels.forEach(panel => {
        var newSkillDeclaration = new SkillDeclarationAPI.SkillDeclaration();

        newSkillDeclaration.criteria_type = panel.getAttribute("data-criteria-type");
        newSkillDeclaration.criteria_id = panel.getAttribute("data-criteria-id");

        var experienceSelect = panel.querySelector('input[name="experience"]:checked'); //This will come back null, if no radio button has been selected yet
        newSkillDeclaration.experience_level_id = experienceSelect ? experienceSelect.value : ""; //Default to an empty string if nothing has been selected

        var skillLevelSelect = panel.querySelector('input[name="expertise"]:checked'); //This will come back null, if no radio button has been selected yet
        newSkillDeclaration.skill_level_id = skillLevelSelect ? skillLevelSelect.value : ""; //Default to an empty string if nothing has been selected

        newSkillDeclaration.description = panel.querySelector('.applicant-evidence__skill-declaration-text').value;

        var applicationId = document.getElementById("createJobApplicationJobApplicationId").value;

        //Only save if this declaration is complete
        if (applicationId &&
                newSkillDeclaration.isValid()) {
            submittedRequests = submittedRequests + 1;
            DataAPI.saveSkillDeclaration(newSkillDeclaration, criteriaType, newSkillDeclaration.criteria_id, applicationId, function (response) {
                if (response.status === 200) {
                    submittedRequests = submittedRequests - 1;

                    if (onSuccess && submittedRequests === 0) {
                        //Only call onSuccess if all skills have been saved successfully
                        onSuccess();
                    }
                } else {
                    //TODO: how to respond to failed status? 
                }
            });
        }
    });

    if (onSuccess && submittedRequests === 0) {
        //If no skills were even attempted to be saved, call onSuccess
        onSuccess();
    }
};