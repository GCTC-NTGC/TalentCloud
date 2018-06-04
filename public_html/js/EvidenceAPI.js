var EvidenceAPI = {};

EvidenceAPI.evidenceTriggerName = function (criteriaId, criteriaType) {
    return criteriaType + "-" + criteriaId;
};

EvidenceAPI.evidencePreviewTriggerName = function (criteriaId, criteriaType) {
    return "preview-" + criteriaType + "-" + criteriaId;
};

EvidenceAPI.menuItemId = function (criteriaId, criteriaType) {
    var triggerName = EvidenceAPI.evidenceTriggerName(criteriaId, criteriaType);
    return "applicationEvidenceMenuItem_" + triggerName;
};

EvidenceAPI.previewMenuItemId = function (criteriaId, criteriaType) {
    var triggerName = EvidenceAPI.evidencePreviewTriggerName(criteriaId, criteriaType);
    return "applicationPreviewEvidenceMenuItem_" + triggerName;
};

EvidenceAPI.instantiateApplicationEvidenceMenuItem = function (criteriaId, criteriaType, criteriaName) {
    var menuItem = document.getElementById("applicantEvidenceMenuItemTemplate").firstElementChild.cloneNode(true);

    menuItem.classList.remove("template");

    var triggerName = EvidenceAPI.evidenceTriggerName(criteriaId, criteriaType);
    var menuItemId = EvidenceAPI.menuItemId(criteriaId, criteriaType);
    menuItem.id = menuItemId;
    menuItem.setAttribute("data-evidence-trigger", triggerName);

    //Set data attributes
    menuItem.setAttribute("data-criteria-type", criteriaType);
    menuItem.setAttribute("data-criteria-id", criteriaId);

    var title = menuItem.querySelector(".applicant-evidence__desktop-item-title");
    title.innerHTML = criteriaName;

    return menuItem;
};

EvidenceAPI.instantiateApplicationPreviewEvidenceMenuItem = function (criteriaId, criteriaType, criteriaName) {
    var menuItem = document.getElementById("applicationPrevierwEvidenceMenuItemTemplate").firstElementChild.cloneNode(true);

    menuItem.classList.remove("template");

    var triggerName = EvidenceAPI.evidencePreviewTriggerName(criteriaId, criteriaType);
    var menuItemId = EvidenceAPI.previewMenuItemId(criteriaId, criteriaType);
    menuItem.id = menuItemId;
    menuItem.setAttribute("data-evidence-trigger", triggerName);

    //Set data attributes
    menuItem.setAttribute("data-criteria-type", criteriaType);
    menuItem.setAttribute("data-criteria-id", criteriaId);

    menuItem.innerHTML = criteriaName;

    return menuItem;
};

EvidenceAPI.instantiateApplicationEvidencePanel = function (criteriaId, criteriaType, criteriaName, criteriaDescription) {
    var evidencePanel = document.getElementById("applicantEvidencePanelTemplate").firstElementChild.cloneNode(true);

    evidencePanel.classList.remove("template");

    var triggerName = EvidenceAPI.evidenceTriggerName(criteriaId, criteriaType);
    var menuItemId = EvidenceAPI.menuItemId(criteriaId, criteriaType);
    evidencePanel.setAttribute("data-evidence-target", triggerName);
    evidencePanel.setAttribute("aria-labelledby", menuItemId);

    //SET DATA ATTRIBUTES
    evidencePanel.setAttribute("data-criteria-type", criteriaType);
    evidencePanel.setAttribute("data-criteria-id", criteriaId);

    //SET SKILL TITLE AND DESCRIPTION
    evidencePanel.querySelector(".applicant-evidence__accordion-trigger-title-text").innerHTML = criteriaName;
    if (criteriaDescription) {
        evidencePanel.querySelector(".applicant-evidence__skill-description").innerHTML = criteriaDescription;
    }

    //MODIFY IDs FOR UNIQUENESS
    var idSuffix = "_" + triggerName;

    // MICRO-REFERENCE IDs
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceReferenceName", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceReferenceEmail", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceReferenceRelationship", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceReferenceFrom", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceReferenceUntil", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceReferenceExpLevel", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceReferenceStory", idSuffix);

    // SKILL SAMPLE IDs
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceSampleName", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceSampleType", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceSampleDateCreated", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceSampleHttpLink", idSuffix);
    Utilities.addSuffixToElementId(evidencePanel, "applicationEvidenceSampleStory", idSuffix);

    // POPULATE "SLIDERS"
    // DEV-NOTE: Beware copy-paste errors, and confusing EXPERTISE with EXPERIENCE

    var expertiseSelector = evidencePanel.querySelector(".applicant-evidence__expertise-wrapper");
    var expertiseRadioGroup = evidencePanel.querySelector(".applicant-evidence__expertise-radiogroup");
    var expertiseRadioGroupTitle = evidencePanel.querySelector(".applicant-evidence__expertise-radiogroup-title");
    expertiseRadioGroupTitle.setAttribute("id", "expertiseRadioGroupTitle"+idSuffix);
    expertiseRadioGroup.setAttribute("aria-labelledby", "expertiseRadioGroupTitle"+idSuffix);
    expertiseSelector.innerHTML = ""; //clear template items
    LookupAPI.getLookupResponse("skill_level", function (items) {
        var numberOfItems = items.length;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < numberOfItems; i++) {
            var item = items[i];
            var outputValue = item.id; //TODO: change to value
            var itemElement = EvidenceAPI.instantiateApplicationEvidenceExpertiseItem(criteriaId, criteriaType, item.id, item.value, outputValue, numberOfItems);
            fragment.appendChild(itemElement);
        }
        expertiseSelector.appendChild(fragment);
    });

    var experienceSelector = evidencePanel.querySelector(".applicant-evidence__experience-wrapper");
    var experienceRadioGroup = evidencePanel.querySelector(".applicant-evidence__experience-radiogroup");
    var experienceRadioGroupTitle = evidencePanel.querySelector(".applicant-evidence__experience-radiogroup-title");
    expertiseRadioGroupTitle.setAttribute("id", "expertiseRadioGroupTitle"+idSuffix);
    expertiseRadioGroup.setAttribute("aria-labelledby", "expertiseRadioGroupTitle"+idSuffix);
    experienceSelector.innerHTML = ""; //clear template items
    LookupAPI.getLookupResponse("experience_level", function (items) {
        var numberOfItems = items.length;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < numberOfItems; i++) {
            var item = items[i];
            var outputValue = item.id; //TODO: change to value
            var itemElement = EvidenceAPI.instantiateApplicationEvidenceExperienceItem(criteriaId, criteriaType, item.id, item.value, outputValue, numberOfItems);
            fragment.appendChild(itemElement);
        }
        experienceSelector.appendChild(fragment);
    });

    //POPULATE SELECT INPUTS
    var relationshipSelect = evidencePanel.querySelector("#applicationEvidenceReferenceRelationship" + idSuffix);
    LookupAPI.populateDropdownElement("relationship", relationshipSelect, true);
    var refExperienceLevel = evidencePanel.querySelector("#applicationEvidenceReferenceExpLevel" + idSuffix);
    LookupAPI.populateDropdownElement("experience_level", refExperienceLevel, true);
    
    var sampleFileTypeSelect = evidencePanel.querySelector("select[name=\"sample_type\"]");
    LookupAPI.populateDropdownElement("file_type", sampleFileTypeSelect, true);

    //ADD EVENT HANDLERS

    //define a function to check skill declaration status
    function declarationOnChange() {
        SkillDeclarationAPI.onStatusChange(criteriaId);
    }
    //Add handler to experienence inputs
    var experienceInputs = evidencePanel.querySelectorAll("input[name=experience]");
    for(var i=0; i<experienceInputs.length; i++) {
        experienceInputs[i].onclick = declarationOnChange;
    }
    //Add handler to expertise inputs
    var expertiseInputs = evidencePanel.querySelectorAll("input[name=expertise]");
    for(var i=0; i<expertiseInputs.length; i++) {
        expertiseInputs[i].onclick = declarationOnChange;
    }
    //Add handler to Skill Declaration story text
    var declarationText = evidencePanel.querySelector(".applicant-evidence__skill-declaration-text");
    declarationText.onchange = declarationOnChange;

    //define a function to check micro-reference status
    function referenceOnChange() {
        MicroReferenceAPI.onStatusChange(criteriaId);
    }
    //Add onChange handler to all micro-reference inputs
    evidencePanel.querySelector("input[name=\"reference_name\"]").onchange = referenceOnChange;
    evidencePanel.querySelector("input[name=\"reference_email\"]").onchange = referenceOnChange;
    evidencePanel.querySelector("select[name=\"reference_relationship\"]").onchange = referenceOnChange;
    evidencePanel.querySelector("input[name=\"reference_from_date\"]").onchange = referenceOnChange;
    evidencePanel.querySelector("input[name=\"reference_until_date\"]").onchange = referenceOnChange;
    evidencePanel.querySelector("select[name=\"reference_exp_level\"]").onchange = referenceOnChange;
    evidencePanel.querySelector("textarea[name=\"reference_story\"]").onchange = referenceOnChange;

    //define a function to check skill sample status
    function sampleOnChange() {
        SkillSampleAPI.onStatusChange(criteriaId);
    }
    //Add onChange handler to all skill sample inputs
    evidencePanel.querySelector("input[name=\"sample_name\"]").onchange = sampleOnChange;
    evidencePanel.querySelector("select[name=\"sample_type\"]").onchange = sampleOnChange;
    evidencePanel.querySelector("input[name=\"sample_date_created\"]").onchange = sampleOnChange;
    evidencePanel.querySelector("input[name=\"sample_http_link\"]").onchange = sampleOnChange;
    evidencePanel.querySelector("textarea[name=\"sample_story\"]").onchange = sampleOnChange;
    
    
    //SET TEXTAREA FIELDS TO EMPTY
    //This is to override IE11's habit of setting textarea values with their placeholder text
    evidencePanel.querySelector(".applicant-evidence__skill-declaration-text").value = "";
    evidencePanel.querySelector("textarea[name=\"reference_story\"]").value = "";
    evidencePanel.querySelector("textarea[name=\"sample_story\"]").value = "";    

    return evidencePanel;
};

EvidenceAPI.instantiateApplicationPreviewEvidencePanel = function (criteriaId, criteriaType, criteriaName) {
    var evidencePanel = document.getElementById("applicationPreviewEvidencePanelTemplate").firstElementChild.cloneNode(true);

    evidencePanel.classList.remove("template");

    var triggerName = EvidenceAPI.evidencePreviewTriggerName(criteriaId, criteriaType);
    var menuItemId = EvidenceAPI.previewMenuItemId(criteriaId, criteriaType);
    evidencePanel.setAttribute("data-evidence-target", triggerName);
    evidencePanel.setAttribute("aria-labelledby", menuItemId);

    //SET DATA ATTRIBUTES
    evidencePanel.setAttribute("data-criteria-type", criteriaType);
    evidencePanel.setAttribute("data-criteria-id", criteriaId);

    //SET SKILL TITLE
    evidencePanel.querySelector(".applicant-evidence-preview__criteria-name").innerHTML = criteriaName;
    
    return evidencePanel;
};

EvidenceAPI.instantiateApplicationEvidenceExpertiseItem = function (criteriaId, criteriaType, expertiseId, expertiseValue, outputValue, numberOfItems) {
    var templateId = "applicationEvidenceExpertiseItemTemplate";
    var inputId = "expertise__" + EvidenceAPI.evidenceTriggerName(criteriaId, criteriaType) + "__" + expertiseId;
    return EvidenceAPI.instantiateApplicationEvidenceRadioItem(templateId, inputId, expertiseValue, outputValue, numberOfItems);
};

EvidenceAPI.instantiateApplicationEvidenceExperienceItem = function (criteriaId, criteriaType, experienceId, experienceValue, outputValue, numberOfItems) {
    var templateId = "applicationEvidenceExperienceItemTemplate";
    var inputId = "experience__" + EvidenceAPI.evidenceTriggerName(criteriaId, criteriaType) + "__" + experienceId;
    return EvidenceAPI.instantiateApplicationEvidenceRadioItem(templateId, inputId, experienceValue, outputValue, numberOfItems);
}

EvidenceAPI.instantiateApplicationEvidenceRadioItem = function (templateId, inputId, textValue, outputValue, numberOfItems) {
    var itemLabel = document.getElementById(templateId).firstElementChild.cloneNode(true);

    itemLabel.classList.remove("template");

    var itemInput = itemLabel.querySelector("input");
    var itemText = itemLabel.querySelector(".form__radio-group-span");

    var sizeClass = "small-1of" + numberOfItems;
    itemLabel.classList.add(sizeClass);

    itemLabel.setAttribute("for", inputId);
    itemInput.id = inputId;
    itemInput.value = outputValue;

    itemText.innerHTML = textValue;
    return itemLabel;
};

/**
 * Sets first evidence specified criteria to active. All other evidence
 * panels with matching criteriaType will be set to inactive.
 *
 * @param {string} criteriaType
 * @return {undefined}
 */
EvidenceAPI.activateFirstEvidencePanel = function (criteriaType) {

    //Deactivate all panels of same criteriaType, except one with correct criteria id
    var menuItems = document.querySelectorAll(".applicant-evidence__desktop-menu-item[data-criteria-type=\"" + criteriaType + "\"]");
    var panels = document.querySelectorAll(".applicant-evidence__accordion-wrapper[data-criteria-type=\"" + criteriaType + "\"]");

    for (var i=0; i<menuItems.length; i++) {
        var item = menuItems[i];
        if (i === 0) {
            //Set first one to active
            item.classList.add("active");
            item.setAttribute("aria-selected", true);
        } else {
            //Deactivate others
            item.classList.remove("active");
            item.setAttribute("aria-selected", false);
        }
    }

    for (var i=0; i<panels.length; i++) {
        var panel = panels[i];
        var panelTrigger = panel.querySelector(".applicant-evidence__accordion-trigger");
        var panelContent = panel.querySelector(".applicant-evidence__accordion-content");

        if (i === 0) {
            //Set first panel active
            panel.classList.add("active");
            panelTrigger.classList.add("active");
            panelTrigger.setAttribute("aria-expanded", true);
            panelContent.classList.add("active");
        } else {
            //Deactivate others
            panel.classList.remove("active");
            panelTrigger.classList.remove("active");
            panelTrigger.setAttribute("aria-expanded", false);
            panelContent.classList.remove("active");
        }
    }
};

/**
 *
 * @param {int} criteriaId
 * @param {string} iconClass - Should be "fa-check", "fa-user", or "fa-file"
 * @param {boolean} isActive
 * @return {undefined}
 */
EvidenceAPI.setEvidenceIconStatus = function(criteriaId, iconClass, isActive) {
    var panel = document.querySelector(".applicant-evidence__accordion-wrapper[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");
    if (isActive) {
        //Activate icon in accordion trigger
        var check = panel.querySelector(".applicant-evidence__accordion-trigger-icon-wrapper ." + iconClass);
        check.classList.add("active");

        //Activate icon in menu item
        var menuItem = document.querySelector(".applicant-evidence__desktop-menu-item[data-criteria-id=\"" + criteriaId + "\"]");
        var menuCheck = menuItem.querySelector(".applicant-evidence__desktop-icon-wrapper ." + iconClass);
        menuCheck.classList.add("active");
    } else {
        //Deactivate icon in accordion trigger
        var check = panel.querySelector(".applicant-evidence__accordion-trigger-icon-wrapper ." + iconClass);
        check.classList.remove("active");

        //Deactivate icon in menu item
        var menuItem = document.querySelector(".applicant-evidence__desktop-menu-item[data-criteria-id=\"" + criteriaId + "\"]");
        var menuCheck = menuItem.querySelector(".applicant-evidence__desktop-icon-wrapper ." + iconClass);
        menuCheck.classList.remove("active");
    }
};

/**
 * Saves all completed evidence peices, and deletes incomplete ones from the saved applciation.
 *
 * If criteriaType is defined, it saves/deletes evidence of the matching criteriaType.
 * If criteriaType is undefined, it saves/deletes ALL completed skill declarations.
 *
 * Calls onSuccess if all evidence pieces are saved/deleted successfully.
 *
 * @param {string} criteriaType
 * @param {function} onSuccess
 * @return {undefined}
 */
EvidenceAPI.saveEvidence = function(criteriaType, onSuccess) {
    var pendingRequests = 2;
    var everythingSuccessful = true;

    function saveSuccessful() {
        pendingRequests = pendingRequests - 1;
        if (pendingRequests == 0) {
            if (everythingSuccessful)
                onSuccess();
            else {
                window.alert("Something went wrong saving evidence!");
                onSuccess();
            }
        }
    }

    function saveFailed() {
        everythingSuccessful = false;
        pendingRequests = pendingRequests - 1;
        if (pendingRequests == 0) {
            if (everythingSuccessful)
                onSuccess();
            else {
                window.alert("Something went wrong while saving evidence!");
                onSuccess();
            }
        }
    }

    SkillDeclarationAPI.saveSkillDeclarations(criteriaType, saveSuccessful, saveFailed);
    MicroReferenceAPI.saveMicroReferences(criteriaType, saveSuccessful, saveFailed);
    SkillSampleAPI.saveSkillSamples(criteriaType, saveSuccessful, saveFailed);
};
