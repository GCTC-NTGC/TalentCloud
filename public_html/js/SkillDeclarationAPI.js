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

/**
 * 
 * @param {SkillDeclarationAPI.SkillDeclaration} skillDeclaration
 * @param {boolean} isEssential
 * @return {undefined}
 */
SkillDeclarationAPI.makeSkillDeclarationForm = function (skillDeclaration, isEssential, criteriaId) {
    var baseSkillDeclarationForm = document.querySelector("#skills__accordion-template");

    var skillDeclarationForm = baseSkillDeclarationForm.cloneNode(true);
    skillDeclarationForm.classList.remove("hidden");
    skillDeclarationForm.removeAttribute("id");

    var idSuffix = "_" + (isEssential ? "essential" : "asset") + "_" + criteriaId;

    //Add data identifiers to root element
    skillDeclarationForm.setAttribute("data-criteria-id", criteriaId);
    skillDeclarationForm.setAttribute("data-criteria-type", (isEssential ? "essential" : "asset"));

    //Find elements
    var skillTitle = skillDeclarationForm.querySelector(".skills__skill-title");

    var accordionTrigger = skillDeclarationForm.querySelector("[class*='accordion-trigger']");
    var accordionContent = skillDeclarationForm.querySelector(".skills__accordion-content");

    var experienceLabel = skillDeclarationForm.querySelector("#selectYearsOfExperience__label");
    var experienceSelect = skillDeclarationForm.querySelector("#selectYearsOfExperience");
    var levelLabel = skillDeclarationForm.querySelector("#selectLevel__label");
    var levelSelect = skillDeclarationForm.querySelector("#selectLevel");
    var descriptionLabel = skillDeclarationForm.querySelector("#typeExperience__label");
    var description = skillDeclarationForm.querySelector("#typeExperience");

    var saveButton = skillDeclarationForm.querySelector("#skills__save-button");
    var cancelButton = skillDeclarationForm.querySelector("#skills__cancel-button");

    //Set skill name
    skillTitle.innerHTML = skillDeclaration.skill;

    //Make element id's unique       
    experienceLabel.setAttribute("id", "selectYearsOfExperience__label" + idSuffix);
    experienceLabel.setAttribute("for", "selectYearsOfExperience" + idSuffix);
    experienceSelect.setAttribute("id", "selectYearsOfExperience" + idSuffix);

    levelLabel.setAttribute("id", "selectLevel__label" + idSuffix);
    levelLabel.setAttribute("for", "selectLevel" + idSuffix);
    levelSelect.setAttribute("id", "selectLevel" + idSuffix);

    descriptionLabel.setAttribute("id", "typeExperience__label" + idSuffix);
    descriptionLabel.setAttribute("for", "typeExperience" + idSuffix);
    description.setAttribute("id", "typeExperience" + idSuffix);

    saveButton.setAttribute("id", saveButton.id + idSuffix);
    cancelButton.setAttribute("id", cancelButton.id + idSuffix);

    //Populate dropdowns
    LookupAPI.populateDropdownElement("experience_level", experienceSelect);
    LookupAPI.populateDropdownElement("skill_level", levelSelect);

    //Prepopulate form fields 
    if (skillDeclaration.experience_level_id)
        experienceSelect.value = skillDeclaration.experience_level_id;
    if (skillDeclaration.skill_level_id)
        levelSelect.value = skillDeclaration.skill_level_id;
    if (skillDeclaration.description)
        description.value = skillDeclaration.description;

    function closeAccordian() {
        accordionTrigger.classList.remove("active");
        accordionContent.classList.remove("active");
    }

    //Assign button functions
    saveButton.onclick = function () {
        var newSkillDeclaration = new SkillDeclarationAPI.SkillDeclaration();
        newSkillDeclaration.skill_level_id = levelSelect.value;
        newSkillDeclaration.experience_level_id = experienceSelect.value;
        newSkillDeclaration.description = description.value;

        if (newSkillDeclaration.skill_level_id && newSkillDeclaration.experience_level_id && newSkillDeclaration.description) {
            var applicationId = document.getElementById("createJobApplicationJobApplicationId").value;
            if (applicationId) {
                DataAPI.saveSkillDeclaration(newSkillDeclaration, isEssential, criteriaId, applicationId, function (response) {
                    if (response.status == 200) {
                        accordionTrigger.classList.remove("skills__accordion-trigger--todo");
                        accordionTrigger.classList.remove("skills__accordion-trigger--edit");
                        accordionTrigger.classList.add("skills__accordion-trigger--complete");
                        closeAccordian();
                    } else {
                        //TODO: how to respond to failed status?
                    }
                });
            }
        } else {
            //TODO: finish validation!
        }
    };
    cancelButton.onclick = function () {
        //TODO: finish validation!
        var applicationId = document.getElementById("createJobApplicationJobApplicationId").value;
        if (applicationId) {
            DataAPI.deleteSkillDeclaration(isEssential, criteriaId, applicationId, function (response) {
                if (response.status == 200) {
                    accordionTrigger.classList.add("skills__accordion-trigger--todo");
                    accordionTrigger.classList.remove("skills__accordion-trigger--edit");
                    accordionTrigger.classList.remove("skills__accordion-trigger--complete");
                }
            });
        }
    };
    return skillDeclarationForm;

};

SkillDeclarationAPI.populateApplicationWithSavedSkillDeclarations = function (request) {
    if (request.response) {
        var declarations = JSON.parse(request.response);
        declarations.forEach(declaration => {
            //find appropriate skill declaration
            var element = document.querySelector('.skills__accordion[data-criteria-id="' + declaration.criteria_id + '"][data-criteria-type="' + declaration.criteria_type + '"]');
            //if skill declaration exists, set values
            if (element) {
                var experienceSelect = element.querySelector('select[id^="selectYearsOfExperience"]');
                experienceSelect.value = declaration.experience_level_id;
                var skillLevelSelect = element.querySelector('select[id^="selectLevel"]');
                skillLevelSelect.value = declaration.skill_level_id;
                var description = element.querySelector('textarea[id^="typeExperience"]');
                description.value = declaration.description;

                //Set icon to indicate this has been completed and saved
                var accordionTrigger = element.querySelector("[class*=skills__accordion-trigger]");
                accordionTrigger.classList.remove("skills__accordion-trigger--todo");
                accordionTrigger.classList.remove("skills__accordion-trigger--edit");
                accordionTrigger.classList.add("skills__accordion-trigger--complete");
            }
        });
    }
}