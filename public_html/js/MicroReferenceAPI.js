var MicroReferenceAPI = {};

MicroReferenceAPI.wrapperClass = "applicant-evidence__skill-attribute--reference";

MicroReferenceAPI.MicroReference = function (criteria_id) {
    this.criteria_id = criteria_id;
    this.name = null;
    this.email = null;
    this.relationship = null;
    this.observed_from_date = null;
    this.observed_until_date = null;
    this.experience_level = null;
    this.story = null;

    /**
     * Return true if this object is completed
     * @return {Boolean}
     */
    this.isComplete = function () {
        //All fields except story must be non-empty strings.
        //Story must be defined, but may be empty
        return (this.criteria_id != false &&
                this.name != false &&
                this.email != false &&
                this.relationship != false &&
                this.observed_from_date != false &&
                this.observed_until_date != false &&
                this.experience_level != false &&
                this.story !== undefined);
    };

    /**
     * Return true if this object is ready to be saved to server
     * @return {Boolean}
     */
    this.isValid = function () {
        return this.criteria_id != false;
    };
    
    this.nullifyEmptyFields = function() {
        this.name = this.name ? this.name : null;
        this.email = this.email ? this.email : null;
        this.relationship = this.relationship ? this.relationship : null;
        this.observed_from_date = this.observed_from_date ? this.observed_from_date : null;
        this.observed_until_date = this.observed_until_date ? this.observed_until_date : null;
        this.experience_level = this.experience_level ? this.experience_level : null;
        this.story = this.story ? this.story : null;
    }
};

MicroReferenceAPI.parseApplicationMicroReferenceResponse = function (responseJson) {
    var references = [];
    for (var i = 0; i < responseJson.length; i++) {
        var item = responseJson[i];
        var itemRef = item.micro_reference;

        var criteria_id = item.criteria_id;
        var name = itemRef.micro_reference_name;
        var email = itemRef.micro_reference_email;
        var relationship = itemRef.relationship;
        var observed_from_date = itemRef.observed_from_date;
        var observed_until_date = itemRef.observed_until_date;
        var experience_level = itemRef.experience_level;
        var story = itemRef.micro_reference_story;

        var ref = new MicroReferenceAPI.MicroReference(criteria_id);
        ref.name = name;
        ref.email = email;
        ref.relationship = relationship;
        ref.observed_from_date = observed_from_date;
        ref.observed_until_date = observed_until_date;
        ref.experience_level = experience_level;
        ref.story = story;
        references.push(ref);
    }
    return references;
};

MicroReferenceAPI.loadSavedMicroReferencesForJobApplication = function (jobApplicationId) {
    DataAPI.getMicroReferencesForApplication(jobApplicationId, function (request) {
        //Check that request returned a valid response
        if (request.status === 200 && request.response) {
            var references = MicroReferenceAPI.parseApplicationMicroReferenceResponse(JSON.parse(request.response));
            MicroReferenceAPI.populateApplicationUiMicroReferences(references);
        }
    });
};

MicroReferenceAPI.populateApplicationUiMicroReferences = function (references) {
    for (var i = 0; i < references.length; i++) {
        var ref = references[i];
        //find appropriate Evidence Panel
        var panel = document.querySelector('.applicant-evidence__skill[data-criteria-id="' + ref.criteria_id + '"]');
        //if panel exists, set saved values
        if (panel) {
            var name = panel.querySelector('input[name=\"reference_name\"]');
            if (name) {
                name.value = ref.name;
            }
            var email = panel.querySelector('input[name=\"reference_email\"]');
            if (email) {
                email.value = ref.email;
            }
            var relationship = panel.querySelector('select[name=\"reference_relationship\"]');
            if (relationship) {
                relationship.value = ref.relationship;
            }
            var from_date = panel.querySelector('input[name=\"reference_from_date\"]');
            if (from_date) {
                from_date.value = ref.observed_from_date;
            }
            var until_date = panel.querySelector('input[name=\"reference_until_date\"]');
            if (until_date) {
                until_date.value = ref.observed_until_date;
            }
            var exp_level = panel.querySelector('select[name=\"reference_exp_level\"]');
            if (exp_level) {
                exp_level.value = ref.experience_level;
            }
            var story = panel.querySelector('textarea[name=\"reference_story\"]');
            if (story) {
                story.value = ref.story;
            }

            //Run status change handler, because declartion may now be complete
            MicroReferenceAPI.onStatusChange(ref.criteria_id);
        }
    }
};

MicroReferenceAPI.populateApplicationPreviewUiMicroReferences = function (references) {
    for (var i = 0; i < references.length; i++) {
        var ref = references[i];
        //find appropriate Evidence Panel
        var panel = document.querySelector('.applicant-evidence-preview__accordion-wrapper[data-criteria-id="' + ref.criteria_id + '"]');
        //if panel exists, set saved values
        if (panel) {
            var name = panel.querySelector('.applicant-evidence-preview__reference-name');
            if (name) {
                name.innerHTML = ref.name;
            }
            /*
             var email = panel.querySelector('input[name=\"reference_email\"]');
             if (email) {
             email.value = ref.email;
             }
             */
            var relationship = panel.querySelector('.applicant-evidence-preview__reference-relationship');
            if (relationship) {
                relationship.innerHTML = ref.relationship;
            }
            var from_date = panel.querySelector('.applicant-evidence-preview__reference-start-date');
            if (from_date) {
                from_date.innerHTML = ref.observed_from_date;
            }
            var until_date = panel.querySelector('.applicant-evidence-preview__reference-end-date');
            if (until_date) {
                until_date.innerHTML = ref.observed_until_date;
            }
            /*
             var exp_level = panel.querySelector('select[name=\"reference_exp_level\"]');
             if (exp_level) {
             exp_level.value = ref.experience_level;
             }
             */
            var story = panel.querySelector('.applicant-evidence-preview__reference-copy');
            if (story) {
                story.innerHTML = ref.story;
            }

            //Hide null-response, and show data
            var refContent = panel.querySelector('.applicant-evidence-preview__reference-content');
            refContent.classList.remove("hidden");
            var nullResponse = panel.querySelector('.applicant-evidence-preview__reference-null');
            nullResponse.classList.add("hidden");
        }
    }
};


/**
 * Saves all completed references for criteria of given type,
 * while Deleteing all incomplete references of the given type.
 *
 * If criteriaType is undefined, it saves/deletes ALL completed skill declarations.
 *
 * Call onSuccess if all microreferences are saved/deleted successfully
 * Call onFailure if some/all requests returned with unexpected status
 *
 * @param {string} criteriaType
 * @param {function} onSuccess
 * @return {undefined}
 */
MicroReferenceAPI.saveMicroReferences = function (criteriaType, onSuccess, onFailure) {
    if (criteriaType) {
        var evidencePanels = document.querySelectorAll(".applicant-evidence__skill[data-criteria-type=\"" + criteriaType + "\"]:not(.template)");
    } else if (criteriaType === undefined) {
        var evidencePanels = document.querySelectorAll(".applicant-evidence__skill:not(.template)");
    } else {
        Utilities.debug ? console.log("Cannot save Micro References with given type.") : null;
        return;
    }

    var submittedRequests = 0; //to keep track of number of HTTP calls in progress
    var requestsSuccessful = true;

    var applicationId = document.getElementById("jobApplicationJobApplicationId").value;

    if (!applicationId) {
        Utilities.debug ? console.log("Cannot save Micro References without an Application Id") : null;
        return;
    }
    for (var i = 0; i < evidencePanels.length; i++) {
        var panel = evidencePanels[i];
        var reference = MicroReferenceAPI.getMicroReferenceFromEvidencePanel(panel);

        if (reference.isValid()) {
            submittedRequests = submittedRequests + 1;
            DataAPI.saveMicroReference(reference, reference.criteria_id, applicationId, function (response) {
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
            //If evidence is not valid, do nothing
        }
    }
    if (onSuccess && submittedRequests === 0) {
        //If no requests were made, call onSuccess
        onSuccess();
    }
};

/**
 * Saves one microreference
 *
 * Call onSuccess if all microreferences are saved/deleted successfully
 * Call onFailure if some/all requests returned with unexpected status
 *
 * @param {string} criteriaType
 * @param {function} onSuccess
 * @param {function} onFailure
 * @return {undefined}
 */
MicroReferenceAPI.saveSingleMicroReference = function (criteriaId, onSuccess, onFailure) {

    var panel = document.querySelector(".applicant-evidence__skill[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");

    var applicationId = document.getElementById("jobApplicationJobApplicationId").value;

    if (!applicationId) {
        Utilities.debug ? console.log("Cannot save Micro References without an Application Id") : null;
        return;
    }
    var reference = MicroReferenceAPI.getMicroReferenceFromEvidencePanel(panel);

    //Only save if this reference is complete
    if (reference.isValid()) {
        DataAPI.saveMicroReference(reference, reference.criteria_id, applicationId, function (response) {
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
        window.alert("Reference invalid, cannot save");
    }
};

MicroReferenceAPI.getMicroReferenceFromEvidencePanel = function (panel) {
    var criteria_id = panel.getAttribute("data-criteria-id");
    var reference = new MicroReferenceAPI.MicroReference(criteria_id);

    var name = panel.querySelector('input[name=\"reference_name\"]');
    if (name) {
        reference.name = name.value;
    }
    var email = panel.querySelector('input[name=\"reference_email\"]');
    if (email) {
        reference.email = email.value;
    }
    var relationship = panel.querySelector('select[name=\"reference_relationship\"]');
    if (relationship) {
        reference.relationship = relationship.value;
    }
    var relationship = panel.querySelector('input[name=\"reference_relationship\"]');
    if (relationship) {
        reference.relationship = relationship.value;
    }
    var from_date = panel.querySelector('input[name=\"reference_from_date\"]');
    if (from_date) {
        reference.observed_from_date = from_date.value;
    }
    var until_date = panel.querySelector('input[name=\"reference_until_date\"]');
    if (until_date) {
        reference.observed_until_date = until_date.value;
    }
    var exp_level = panel.querySelector('select[name=\"reference_exp_level\"]');
    if (exp_level) {
        reference.experience_level = exp_level.value;
    }
    var story = panel.querySelector('textarea[name=\"reference_story\"]');
    if (story) {
        reference.story = story.value;
    }
    reference.nullifyEmptyFields();
    return reference;
};

MicroReferenceAPI.onStatusChange = function (criteriaId) {
    //If status changes, this can no longer be in a saved state
    EvidenceAPI.setUiSaved(criteriaId, MicroReferenceAPI, false);

    var panel = document.querySelector(".applicant-evidence__skill[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");

    var reference = MicroReferenceAPI.getMicroReferenceFromEvidencePanel(panel);

    //Use validity to determine Completeness status
    EvidenceAPI.setUiComplete(criteriaId, MicroReferenceAPI, reference.isComplete());
};
