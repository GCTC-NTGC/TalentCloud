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