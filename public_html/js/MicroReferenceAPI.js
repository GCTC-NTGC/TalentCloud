var MicroReferenceAPI = {};

MicroReferenceAPI.MicroReference = function (
        criteria_id,
        name,
        email,
        relationship,
        observed_from_date,
        observed_until_date,
        experience_level,
        story
        ) {
    this.criteria_id = criteria_id;
    this.name = name;
    this.email = email;
    this.relationship = relationship;
    this.observed_from_date = observed_from_date;
    this.observed_until_date = observed_until_date;
    this.experience_level = experience_level;
    this.story = story;

    this.isValid = function () {
        return (this.criteria_id != false &&
                this.name != false &&
                this.email != false &&
                this.relationship != false &&
                this.observed_from_date != false &&
                this.observed_until_date != false &&
                this.experience_level != false &&
                this.story != false);
    };
};

MicroReferenceAPI.loadSavedMicroReferencesForJobApplication = function (jobApplicationId) {
    DataAPI.getMicroReferencesForApplication(jobApplicationId, function (request) {
        //Check that request returned a valid response
        if (request.status === 200 && request.response) {
            var references = JSON.parse(request.response);
            MicroReferenceAPI.populateApplicationUiMicroReferences(references);
        }
    });
};

MicroReferenceAPI.populateApplicationUiMicroReferences = function (references) {
    references.forEach(ref => {
        //find appropriate Evidence Panel
        var panel = document.querySelector('.applicant-evidence__accordion-wrapper[data-criteria-id="' + ref.criteria_id + '"]');
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
            var relationship = panel.querySelector('input[name=\"reference_relationship\"]');
            if (relationship) {
                relationship.value = ref.relationship;
            }
            var relationship = panel.querySelector('input[name=\"reference_relationship\"]');
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
            var exp_level = panel.querySelector('input[name=\"reference_exp_level\"]');
            if (exp_level) {
                exp_level.value = ref.experience_level;
            }
            var story = panel.querySelector('input[name=\"reference_story\"]');
            if (story) {
                story.value = ref.story;
            }

            //Run status change handler, because declartion may now be complete
            MicroReferenceAPI.onStatusChange(ref.criteria_id);
        }
    });
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
        var evidencePanels = document.querySelectorAll(".applicant-evidence__accordion-wrapper[data-criteria-type=\"" + criteriaType + "\"]:not(.template)");
    } else if (criteriaType === undefined) {
        var evidencePanels = document.querySelectorAll(".applicant-evidence__accordion-wrapper:not(.template)");
    } else {
        Utilities.debug ? console.log("Cannot save Micro References with given type.") : null;
        return;
    }

    var submittedRequests = 0; //to keep track of number of HTTP calls in progress
    var requestsSuccessful = true;

    var applicationId = document.getElementById("createJobApplicationJobApplicationId").value;

    if (!applicationId) {
        Utilities.debug ? console.log("Cannot save Micro References without an Application Id") : null;
        return;
    }

    evidencePanels.forEach(panel => {
        var reference = MicroReferenceAPI.getMicroReferenceFromEvidencePanel(panel);

        //Only save if this reference is complete
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
            //If reference is not valid (ie not complete) delete it from the application
            submittedRequests = submittedRequests + 1;
            DataAPI.deleteMicroReference(reference.criteria_id, applicationId, function (response) {
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
        }
    });

    if (onSuccess && submittedRequests === 0) {
        //If no requests were made, call onSuccess
        onSuccess();
    }
};

MicroReferenceAPI.getMicroReferenceFromEvidencePanel = function (panel) {
    var reference = new MicroReferenceAPI.MicroReference();

    reference.criteria_id = panel.getAttribute("data-criteria-id");

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

    return reference;
};

MicroReferenceAPI.onStatusChange = function (criteriaId) {
    var panel = document.querySelector(".applicant-evidence__accordion-wrapper[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");

    var reference = MicroReferenceAPI.getMicroReferenceFromEvidencePanel(panel);

    if (reference.isValid()) {
        //Activate "user" icons
        EvidenceAPI.setEvidenceIconStatus(criteriaId, "fa-user", true);
    } else {
        //Deactivate "user" icons
        EvidenceAPI.setEvidenceIconStatus(criteriaId, "fa-user", false);
    }
};
