var SkillSampleAPI = {};

SkillSampleAPI.SkillSample = function (
        sample_id,
        name,
        type,
        date_created,
        http_link,
        story
        ) {
    this.sample_id = sample_id;
    this.name = name;
    this.type = type;
    this.date_created = date_created;
    this.http_link = http_link;
    this.story = story;

    this.isValid = function () {
        return (this.sample_id != false &&
                this.name != false &&
                this.type != false &&
                this.date_created != false &&
                this.http_link != false &&
                this.story != false);
    };
};

SkillSampleAPI.loadSavedSkillSamplesForJobApplication = function (jobApplicationId) {
    DataAPI.getSkillSamplesForApplication(jobApplicationId, function (request) {
        //Check that request returned a valid response
        if (request.status === 200 && request.response) {
            var samples = JSON.parse(request.response);
            SkillSampleAPI.populateApplicationUiSkillSample(samples);
        }
    });
};

SkillSampleAPI.populateApplicationUiSkillSamples = function (samples) {
    samples.forEach(ref => {

        //find appropriate Evidence Panel
        var panel = document.querySelector('.applicant-evidence__accordion-wrapper[data-sample-type="' + ref.sample_id + '"]');
        //if panel exists, set saved values
        if (panel) {
            var name = panel.querySelector('input[name=\"sample_name\"]');
            if (name) {
                name.value = ref.name;
            }
            var type = panel.querySelector('input[select=\"sample_type\"]');
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
            SkillSampleAPI.onStatusChange(ref.sample_id);
        }
    });
};


/**
 * Saves all completed samples for criteria of given type,
 * while Deleteing all incomplete samples of the given type.
 *
 * If sampleType is undefined, it saves/deletes ALL completed skill declarations.
 *
 * Call onSuccess if all SkillSamples are saved/deleted successfully
 * Call onFailure if some/all requests returned with unexpected status
 *
 * @param {string} sampleType
 * @param {function} onSuccess
 * @return {undefined}
 */
SkillSampleAPI.saveSkillSamples = function (sampleType, onSuccess, onFailure) {
    if (sampleType) {
        var evidencePanels = document.querySelectorAll(".applicant-evidence__accordion-wrapper[data-sample-type=\"" + sampleType + "\"]:not(.template)");
    } else if (sampleType === undefined) {
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
            DataAPI.saveSkillSample(sample, sample.sample_id, applicationId, function (response) {
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
            DataAPI.deleteSkillSample(sample.sample_id, applicationId, function (response) {
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

    sample.sample_id = panel.getAttribute("data-sample-id");

    var name = panel.querySelector('input[name=\"sample_name\"]');
    if (name) {
        sample.name = name.value;
    }
    var type = panel.querySelector('input[select=\"sample_type\"]');
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

SkillSampleAPI.onStatusChange = function (sampleId) {
    var panel = document.querySelector(".applicant-evidence__accordion-wrapper[data-sample-id=\"" + sampleId + "\"]:not(.template)");

    var sample = SkillSampleAPI.getSkillSampleFromEvidencePanel(panel);

    if (sample.isValid()) {
        //Activate "user" icons
        EvidenceAPI.setEvidenceIconStatus(sampleId, "fa-user", true);
    } else {
        //Deactivate "user" icons
        EvidenceAPI.setEvidenceIconStatus(sampleId, "fa-user", false);
    }
};
