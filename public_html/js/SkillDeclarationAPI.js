var SkillDeclarationAPI = {};

SkillDeclarationAPI.wrapperClass = "applicant-evidence__skill-attribute--required";

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
        this.isComplete = function () {
            return (this.skill_level_id != false && this.experience_level_id != false && this.description != false);
        };
        
         /**
        * Return true if this object is ready to be saved to server
        * @return {Boolean}
        */
        this.isValid = function () {
            return this.criteria_id != false;
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
        for (var i=0; i<skillDeclarations.length; i++) {
            var declaration = skillDeclarations[i];
            //find appropriate Evidence Panel
            var panel = document.querySelector('.applicant-evidence__skill[data-criteria-id="' + declaration.criteria_id + '"][data-criteria-type="' + declaration.criteria_type + '"]');
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

                //Run status change handler, because declartion may now be complete
                SkillDeclarationAPI.onStatusChange(declaration.criteria_id);
            }
        }
    };

    SkillDeclarationAPI.populateApplicationPreviewUiSkillDeclarations = function(skillDeclarations) {
        for (var i=0; i<skillDeclarations.length; i++) {
            var declaration = skillDeclarations[i];
            //find appropriate Evidence Panel
            var panel = document.querySelector('.applicant-evidence-preview__accordion-wrapper[data-criteria-id="' + declaration.criteria_id + '"]');
            //if panel exists, set skill declaration values
            if (panel) {
                var experience = panel.querySelector('.applicant-evidence-preview__experience');
                if (declaration.experience_level_id) {
                    experience.innerHTML = LookupAPI.getLocalizedLookupValue("experience_level", declaration.experience_level_id) + " Years";
                } else {
                    experience.innerHTML = null;
                }
                var skillLevel = panel.querySelector('.applicant-evidence-preview__expertise');
                if (declaration.skill_level_id) {
                    skillLevel.innerHTML = LookupAPI.getLocalizedLookupValue("skill_level", declaration.skill_level_id);
                } else {
                    skillLevel.innerHTML = null;
                }

                var description = panel.querySelector('.applicant-evidence-preview__experience-copy');
                if (declaration.description) {
                    description.innerHTML = declaration.description;
                } else {
                    description.innerHTML = null;
                }
            }
        }
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
    SkillDeclarationAPI.saveSkillDeclarations = function (criteriaType, onSuccess, onFailure) {
        if (criteriaType) {
            var evidencePanels = document.querySelectorAll(".applicant-evidence__skill[data-criteria-type=\"" + criteriaType + "\"]:not(.template)")
        } else if (criteriaType === undefined) {
            var evidencePanels = document.querySelectorAll(".applicant-evidence__skill:not(.template)")
        } else {
            Utilities.debug ? console.log("Cannot save Skill Declarations with given type.") : null;
            return;
        }

        var submittedRequests = 0; //to keep track of number of PUT calls in progress
        var requestsSuccessful = true;

        var applicationId = document.getElementById("jobApplicationJobApplicationId").value;

        for (var i=0; i<evidencePanels.length; i++) {
            var panel = evidencePanels[i];
            var newSkillDeclaration = new SkillDeclarationAPI.getSkillDeclarationFromEvidencePanel(panel);

            if (applicationId) {
                //Only save if this declaration is complete
                if (newSkillDeclaration.isValid()) {
                    submittedRequests = submittedRequests + 1;
                    DataAPI.saveSkillDeclaration(newSkillDeclaration, newSkillDeclaration.criteria_id, applicationId, function (response) {
                        if (response.status !== 200) {
                            requestsSuccessful = false;
                        }
                        submittedRequests = submittedRequests - 1;
                        if (submittedRequests === 0) {
                            if (onSuccess && requestsSuccessful) {
                                //Only call onSuccess if all requests have been successful
                                onSuccess();
                            } else if (onFailure && !requestsSuccessful) {
                                onFailure();
                            }
                        }
                    });
                } else {
                    //If declaration is not valid, do nothing
                }
            }
        }

        if (onSuccess && submittedRequests === 0) {
            //If no skills were even attempted to be saved, call onSuccess
            onSuccess();
        }
    };

    /**
    * Saves all completed skill declarations of given type.
    * If criteriaType is undefined, it saves ALL completed skill declarations.
    *
    * Call onSuccess if application is saved successfully
    *
    * @param {string} skillDeclarationId
    * @param {function} onSuccess
    * @return {undefined}
    */
    SkillDeclarationAPI.saveSingleSkillDeclaration = function (skillDeclarationId, onSuccess, onFailure) {

        var panel = document.querySelector(".applicant-evidence__skill[data-criteria-id=\"" + skillDeclarationId + "\"]:not(.template)")

        var applicationId = document.getElementById("jobApplicationJobApplicationId").value;

        var newSkillDeclaration = new SkillDeclarationAPI.getSkillDeclarationFromEvidencePanel(panel);

        if (applicationId) {
            //Only save if this declaration is complete
            if (newSkillDeclaration.isValid()) {
                DataAPI.saveSkillDeclaration(newSkillDeclaration, newSkillDeclaration.criteria_id, applicationId, function (response) {
                    if (response.status === 200) {
                        if (onSuccess)
                            onSuccess();
                    } else {
                        if (onFailure) {
                            window.alert(response.response.message);
                            onFailure();
                        }
                    }

                });
            } else {
                window.alert("Skill declaration invalid, cannot save");
            }
        }
    };

    SkillDeclarationAPI.getSkillDeclarationFromEvidencePanel = function (panel) {
        var skillDeclaration = new SkillDeclarationAPI.SkillDeclaration();

        skillDeclaration.criteria_type = panel.getAttribute("data-criteria-type");
        skillDeclaration.criteria_id = panel.getAttribute("data-criteria-id");

        skillDeclaration.skill = panel.querySelector(".applicant-evidence__skill .applicant-evidence__skill-title").innerHTML;

        var experienceSelect = panel.querySelector('input[name="experience"]:checked'); //This will come back null, if no radio button has been selected yet
        skillDeclaration.experience_level_id = experienceSelect ? experienceSelect.value : ""; //Default to an empty string if nothing has been selected

        var skillLevelSelect = panel.querySelector('input[name="expertise"]:checked'); //This will come back null, if no radio button has been selected yet
        skillDeclaration.skill_level_id = skillLevelSelect ? skillLevelSelect.value : ""; //Default to an empty string if nothing has been selected

        skillDeclaration.description = panel.querySelector('.applicant-evidence__skill-declaration-text').value;

        return skillDeclaration;
    };

    SkillDeclarationAPI.onStatusChange = function (criteriaId) {
        //If status changes, this can no longer be in a saved state
        EvidenceAPI.setUiSaved(criteriaId, SkillDeclarationAPI, false);

        var panel = document.querySelector(".applicant-evidence__skill[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");

        var skillDeclaration = SkillDeclarationAPI.getSkillDeclarationFromEvidencePanel(panel);

        //Use validity to determine Completeness status
        EvidenceAPI.setUiComplete(criteriaId, SkillDeclarationAPI, skillDeclaration.isComplete());
    };
