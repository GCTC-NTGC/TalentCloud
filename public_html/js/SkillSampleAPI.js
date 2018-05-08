var SkillSampleAPI = {};

SkillSampleAPI.SkillSample = function (
        criteria_id,
        name,
        type,
        date_created,
        http_link,
        story
        ) {
    this.criteria_id = criteria_id;
    this.name = name;
    this.type = type;
    this.date_created = date_created;
    this.http_link = http_link;
    this.story = story;

    this.isValid = function () {
        //!= instead of !== is on purpose; want to check that none are empty strings or null
        return (this.criteria_id != false &&
                this.name != false &&
                this.type != false &&
                this.date_created != false &&
                this.http_link != false &&
                this.story != false);
    };
};

SkillSampleAPI.parseApplicationSkillSampleResponse = function(response) {
    var samples = [];
    var responseJson = JSON.parse(response);
    responseJson.forEach(applicationItem => {
        var item = applicationItem.work_sample;
        
        var criteria_id = applicationItem.criteria_id;
        var name = item.work_sample_name;
        var type = item.file_type;
        var date_created = item.work_sample_date_created;
        var http_link = item.work_sample_url;
        var story = item.work_sample_story;
       
        var sample = new SkillSampleAPI.SkillSample(criteria_id, name, type,
                date_created, http_link, story);
        samples.push(sample);
    });
    return samples;
};

SkillSampleAPI.loadSavedSkillSamplesForJobApplication = function (jobApplicationId) {
    DataAPI.getSkillSamplesForApplication(jobApplicationId, function (request) {
        //Check that request returned a valid response
        if (request.status === 200 && request.response) {
            var samples = SkillSampleAPI.parseApplicationSkillSampleResponse(request.response);
            SkillSampleAPI.populateApplicationUiSkillSamples(samples);
        }
    });
};

SkillSampleAPI.populateApplicationUiSkillSamples = function (samples) {
    samples.forEach(ref => {

        //find appropriate Evidence Panel
        var panel = document.querySelector('.applicant-evidence__accordion-wrapper[data-criteria-id="' + ref.criteria_id + '"]');
        //if panel exists, set saved values
        if (panel) {
            var name = panel.querySelector('input[name=\"sample_name\"]');
            if (name) {
                name.value = ref.name;
            }
            var type = panel.querySelector('select[name=\"sample_type\"]');
            if (type) {
                type.value = ref.type;
            }
            var date_created = panel.querySelector('input[name=\"sample_date_created\"]');
            if (date_created) {
                date_created.value = ref.date_created;
            }
            var http_link = panel.querySelector('input[name=\"sample_http_link\"]');
            if (http_link) {
                http_link.value = ref.http_link;
            }
            var story = panel.querySelector('textarea[name=\"sample_story\"]');
            if (story) {
                story.value = ref.story;
            }

            //Run status change handler, because declartion may now be complete
            SkillSampleAPI.onStatusChange(ref.criteria_id);
        }
    });
};


/**
 * Saves all completed samples for criteria of given type,
 * while Deleteing all incomplete samples of the given type.
 *
 * If criteriaType is undefined, it saves/deletes ALL completed skill declarations.
 *
 * Call onSuccess if all SkillSamples are saved/deleted successfully
 * Call onFailure if some/all requests returned with unexpected status
 *
 * @param {string} criteriaType
 * @param {function} onSuccess
 * @return {undefined}
 */
SkillSampleAPI.saveSkillSamples = function (criteriaType, onSuccess, onFailure) {
    if (criteriaType) {
        var evidencePanels = document.querySelectorAll(".applicant-evidence__accordion-wrapper[data-criteria-type=\"" + criteriaType + "\"]:not(.template)");
    } else if (criteriaType === undefined) {
        var evidencePanels = document.querySelectorAll(".applicant-evidence__accordion-wrapper:not(.template)");
    } else {
        Utilities.debug ? console.log("Cannot save Skill Samples with given type.") : null;
        return;
    }

    var submittedRequests = 0; //to keep track of number of HTTP calls in progress
    var requestsSuccessful = true;

    var applicationId = document.getElementById("createJobApplicationJobApplicationId").value;

    if (!applicationId) {
        Utilities.debug ? console.log("Cannot save Skill Samples without an Application Id") : null;
        return;
    }

    evidencePanels.forEach(panel => {
        var sample = SkillSampleAPI.getSkillSampleFromEvidencePanel(panel);

        //Only save if this sample is complete
        if (sample.isValid()) {
            submittedRequests = submittedRequests + 1;
            DataAPI.saveSkillSample(sample, sample.criteria_id, applicationId, function (response) {
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
            //If sample is not valid (ie not complete) delete it from the application
            submittedRequests = submittedRequests + 1;
            DataAPI.deleteSkillSample(sample.criteria_id, applicationId, function (response) {
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

SkillSampleAPI.getSkillSampleFromEvidencePanel = function (panel) {
    var sample = new SkillSampleAPI.SkillSample();

    sample.criteria_id = panel.getAttribute("data-criteria-id");

    var name = panel.querySelector('input[name=\"sample_name\"]');
    if (name) {
        sample.name = name.value;
    }
    var type = panel.querySelector('select[name=\"sample_type\"]');
    if (type) {
        sample.type = type.value;
    }
    var date_created = panel.querySelector('input[name=\"sample_date_created\"]');
    if (date_created) {
        sample.date_created = date_created.value;
    }
    var http_link = panel.querySelector('input[name=\"sample_http_link\"]');
    if (http_link) {
        sample.http_link = http_link.value;
    }
    var story = panel.querySelector('textarea[name=\"sample_story\"]');
    if (story) {
        sample.story = story.value;
    }

    return sample;
};

SkillSampleAPI.onStatusChange = function (criteriaId) {
    var panel = document.querySelector(".applicant-evidence__accordion-wrapper[data-criteria-id=\"" + criteriaId + "\"]:not(.template)");

    var sample = SkillSampleAPI.getSkillSampleFromEvidencePanel(panel);

    if (sample.isValid()) {
        //Activate "file" icons
        EvidenceAPI.setEvidenceIconStatus(criteriaId, "fa-file", true);
    } else {
        //Deactivate "file" icons
        EvidenceAPI.setEvidenceIconStatus(criteriaId, "fa-file", false);
    }
};
