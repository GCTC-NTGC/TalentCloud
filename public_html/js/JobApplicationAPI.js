var JobApplicationAPI = {};

JobApplicationAPI.ApplicationQuestionAnswer = function (
        jobApplicationId,
        jobPosterQuestionId,
        question,
        answer) {
    this.job_poster_application_id = jobApplicationId;
    this.job_poster_question_id = jobPosterQuestionId;
    this.question = question;
    this.answer = answer;
};

/*
 * It's recommended to use the costructor for this object, to avoid dealing
 * directly with multilevel JSON
 *
 * @return {JobApplicationAPI.JobApplication}
 */
JobApplicationAPI.JobApplication = function (
        jobApplicationId,
        jobPosterId,
        jobSeekerProfileId,
        jobApplicationStatusId,
        applicationQuestionAnswers) {
    this.job_poster_application = {};
    this.job_poster_application.job_poster_application_id = jobApplicationId;
    this.job_poster_application.application_job_poster_id = jobPosterId;
    this.job_poster_application.application_job_seeker_profile_id = jobSeekerProfileId;
    this.job_poster_application.job_poster_application_status_id = jobApplicationStatusId;

    this.application_question_answers = applicationQuestionAnswers;
};

JobApplicationAPI.showCreateJobApplication = function (jobPosterId) {
    if (!UserAPI.hasSessionUser()) {
        //TODO: this page should not be accessible if not logged in
        window.alert("You must log in before submitting a job application.");
        return;
    }

    document.getElementById("jobApplicationJobPosterId").value = jobPosterId

    var stateInfo = {pageInfo: 'job_application', pageTitle: 'Talent Cloud: Job Application'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#JobApplication/' + jobPosterId);

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);

    var createJobApplicationSection = document.getElementById('createJobApplicationSection');
    createJobApplicationSection.classList.remove('hidden');

    JobApplicationAPI.showApplicationSection("my-information", jobPosterId);

    var locale = TalentCloudAPI.getLanguageFromCookie();

    // document.getElementById('jobApplicationJobPosterId').value = jobPosterId;

    if (UserAPI.hasSessionUser()) {
        var user = UserAPI.getSessionUserAsJSON();
        var applicantProfilePic = document.getElementById('createJobApplicationProfilePic');
        ProfilePicAPI.refreshProfilePic(user.user_id, applicantProfilePic);
        JobApplicationAPI.populateApplicationWithUserContent(user);
        DataAPI.getJobSeekerProfileByUserId(user.user_id, JobApplicationAPI.populateApplicationWithJobSeekerProfileContent);
    }

    DataAPI.getJobPoster(locale, jobPosterId, function (jobPosterResponse) {
        JobApplicationAPI.populateApplicationWithJobPosterContent(jobPosterResponse);

        //After all application form elements have been created, populate with saved content
        var userId = UserAPI.getSessionUserAsJSON().user_id;
        DataAPI.getJobApplicationByJobAndUser(jobPosterId, userId, function (request) {
            JobApplicationAPI.populateApplicationWithSavedApplicationContent(request, jobPosterId);
        })

    });

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var applicationHeroTitle = document.getElementById("applicationHeroTitle");
    var applicationHeroMetadata = document.getElementById("applicationHeroMetadata");
    applicationHeroTitle.classList.remove("hidden");
    applicationHeroTitle.setAttribute("aria-hidden", "false");
    applicationHeroMetadata.classList.remove("hidden");

    // Google Analytics

    // ga('set', 'page', '/apply/'+jobPosterId);
    // ga('send', 'pageview');

};

JobApplicationAPI.localizeCreateJobApplication = function () {
    if (siteContent) {
        // document.getElementById('createJobApplicationTitle').innerHTML = siteContent.createJobApplicationWindowTitle;
        // document.getElementById('createJobApplicationConfirmationTitle').innerHTML = siteContent.createJobApplicationWindowTitle;
        // document.getElementById('jobApplicationPositionLabel').innerHTML = siteContent.createJobApplicationJobTitleLabel;
        // document.getElementById('createJobApplicationSubmitButton').innerHTML = siteContent.submitApplication;

        //Localize confirmation page at same time
        document.getElementById('createJobApplicationConfirmationPositionLabel').innerHTML = siteContent.createJobApplicationConfirmationPositionLabel;
        document.getElementById('createJobApplicationConfirmationTrackingReminder').innerHTML = siteContent.jobApplicationConfirmationTrackingReminder;
        document.getElementById('createJobApplicationConfirmationContinueButton').innerHTML = siteContent.continueToDashboard;
    }
};

JobApplicationAPI.populateApplicationWithJobPosterContent = function (jobPosterResponse) {
    var jobPoster = JobPostAPI.populateJobObject(JSON.parse(jobPosterResponse));

    document.getElementById('jobApplicationPostition').innerHTML = jobPoster.title;
    JobApplicationAPI.populateApplicationWithQuestionContent(jobPoster.questions);

    //Create Evidence Panels
    JobApplicationAPI.createEvidencePanelsOnPage(jobPoster.core_competencies, "essential", "applicationEssentialEvidenceMenu", "applicationEssentialEvidenceFormWrapper");

    //TODO: create applicationAssetEvidence wrapper divs
    JobApplicationAPI.createEvidencePanelsOnPage(jobPoster.developing_competencies, "asset", "applicationAssetEvidenceMenu", "applicationAssetEvidenceFormWrapper");

    Utilities.setEvidenceUiEventListeners();

    //TODO: call Utilities function to set up triggers
};

JobApplicationAPI.createEvidencePanelsOnPage = function (criteria, criteriaType, evidenceMenuId, evidenceFormWrapperId) {
    var evidenceMenu = document.getElementById(evidenceMenuId);
    var evidenceFormWrapper = document.getElementById(evidenceFormWrapperId);
    evidenceMenu.innerHTML = "";
    evidenceFormWrapper.innerHTML = "";
    var menuFragment = document.createDocumentFragment();
    var panelsFragment = document.createDocumentFragment();

    var firstCriteriaId = false;

    for (var i = 0; i < criteria.length; i++) {
        var criterion = criteria[i];
        var criteriaId = criterion.id;
        var criteriaName = criterion.value;
        if (criterion.description) {
            var criteriaDescription = criterion.description;
        } else {
            var criteriaDescription = criterion.description = "";
        }

        //Save first criteria for later
        if (i === 0) {
            firstCriteriaId = criteriaId;
        }

        var menuItem = EvidenceAPI.instantiateApplicationEvidenceMenuItem(criteriaId, criteriaType, criteriaName)
        var panelItem = EvidenceAPI.instantiateApplicationEvidencePanel(criteriaId, criteriaType, criteriaName, criteriaDescription);

        menuFragment.appendChild(menuItem);
        panelsFragment.appendChild(panelItem);
    }
    evidenceMenu.appendChild(menuFragment);
    evidenceFormWrapper.appendChild(panelsFragment);

    EvidenceAPI.activateFirstEvidencePanel(criteriaType);
};

JobApplicationAPI.populateApplicationWithUserContent = function (user) {
    document.getElementById('createJobApplicationName').innerHTML = user.name;
};

JobApplicationAPI.populateApplicationWithJobSeekerProfileContent = function (jobSeekerProfileResponse) {
    var jobSeeker = JobSeekerAPI.populateJobSeekerObject(JSON.parse(jobSeekerProfileResponse));

    document.getElementById('jobApplicationJobSeekerId').value = jobSeeker.id;
};

JobApplicationAPI.populateApplicationWithSavedApplicationContent = function (jobApplicationRequestResponse, jobPosterId) {
    if (jobApplicationRequestResponse.status === 200) {

        var jobApplication = JSON.parse(jobApplicationRequestResponse.response);

        var jobPosterApplication = jobApplication.job_poster_application;

        //Store metadata
        document.getElementById("jobApplicationJobApplicationId").value = jobPosterApplication.job_poster_application_id;
        document.getElementById("jobApplicationJobPosterId").value = jobPosterApplication.application_job_poster_id;
        document.getElementById("jobApplicationJobSeekerId").value = jobPosterApplication.application_job_seeker_profile_id;
        document.getElementById("jobApplicationJobApplicationStatusId").value = jobPosterApplication.job_poster_application_status_id;

        //Load saved skill declarations using application id
        SkillDeclarationAPI.loadSavedSkillDeclarationsForJobApplication(jobApplication.job_poster_application.job_poster_application_id);
        MicroReferenceAPI.loadSavedMicroReferencesForJobApplication(jobApplication.job_poster_application.job_poster_application_id);
        SkillSampleAPI.loadSavedSkillSamplesForJobApplication(jobApplication.job_poster_application.job_poster_application_id);

        //Set saved question answer content
        var application_question_answers = jobApplication.application_question_answers;
        for (var i = 0; i < application_question_answers.length; i++) {
            var value = application_question_answers[i];
            //find appropriate question textarea
            var inputElement = document.querySelector('.application-form__open-question-item[data-question-id="' + value.job_poster_question_id + '"] .application-form__open-answer');
            //if textarea exists, set value with saved value
            if (inputElement) {
                inputElement.value = value.answer;
            }
        }
    } else if (jobApplicationRequestResponse.status === 404) {
        //An application for this job and user doesn't exist yet, so create a new draft application

        var status = 1; //draft status id

        //Need an up-to-date profile id
        var user = UserAPI.getSessionUserAsJSON();
        DataAPI.getJobSeekerProfileByUserId(user.user_id, function (jobSeekerProfileResponse) {
            if (jobSeekerProfileResponse) {
                var jobSeeker = JobSeekerAPI.populateJobSeekerObject(JSON.parse(jobSeekerProfileResponse));
                var newApplication = new JobApplicationAPI.JobApplication(null, jobPosterId, jobSeeker.id, status, []);
                DataAPI.createJobApplication(newApplication, function (request) {
                    if (request.status === 200) {
                        //Draft application was successfully created - save application id
                        document.getElementById("jobApplicationJobApplicationId").value = JSON.parse(request.response).job_poster_application_id;
                    }
                });
            } else {
                window.alert("You must have a Job Seeker Profile before applying to a job.");
            }
        });
    }
};

/**
 *
 * @param {JobPostAPI.JobPosterQuestion} jobPosterQuestions
 * @return {undefined}
 */
JobApplicationAPI.populateApplicationWithQuestionContent = function (jobPosterQuestions) {

    var questionSectionWrapper = document.getElementById('createJobApplicationOpenEndedQuestionsWrapper');

    //REMOVE existing children (from previous application)
    questionSectionWrapper.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < jobPosterQuestions.length; i++) {

        var element = JobApplicationAPI.makeQuestionAnswerHtmlElement(jobPosterQuestions[i]);
        fragment.appendChild(element);
    }
    questionSectionWrapper.appendChild(fragment);
};

/**
 *
 * @param {JobPostAPI.JobPosterQuestion} jobPosterQuestion
 * @param {int} questionNumber - this is the nth question on the page
 * @return {Element} Job Application Question Answer Wrapper element
 */
JobApplicationAPI.makeQuestionAnswerHtmlElement = function (jobPosterQuestion) {
    var item = document.getElementById("jobApplicationQuestionAnswerTemplate").cloneNode(true);
    item.setAttribute("id", "");
    item.classList.remove("template");

    item.setAttribute("data-question-id",jobPosterQuestion.id);
    item.querySelector(".application-form__open-question").innerHTML = jobPosterQuestion.question;
    item.querySelector(".application-form__open-question-description").innerHTML = jobPosterQuestion.description;

    Utilities.addSuffixToElementId(item, "jobApplicationAnswerInput", "_" + jobPosterQuestion.id);    
    return item;
};


JobApplicationAPI.submitNewJobApplication = function () {
    //TODO: get most recent jobPosterId, instead of what's saved in the html element

    var jobApplicationId = document.getElementById('jobApplicationJobApplicationId').value;
    var jobPosterId = document.getElementById('jobApplicationJobPosterId').value;
    var jobSeekerId = document.getElementById('jobApplicationJobSeekerId').value;

    //get all Question answers
    var applicationQuestionAnswers = [];
    var questionAnswerSection = document.getElementById('createJobApplicationOpenEndedQuestionsWrapper');
    var questionAnswerWrappers = questionAnswerSection.getElementsByClassName('application-form__open-question-item');
    for (var i = 0; i < questionAnswerWrappers.length; i++) {
        var questionId = questionAnswerWrappers[i].querySelector('input[name="job_poster_question_id"]').value;
        var answer = questionAnswerWrappers[i].getElementsByTagName('textarea')[0].value;
        var question = questionAnswerWrappers[i].getElementsByClassName('jobApplicationQuestion')[0].innerHTML;

        var questionAnswer = new JobApplicationAPI.ApplicationQuestionAnswer(
                null, questionId, question, answer);
        applicationQuestionAnswers.push(questionAnswer);
    }

    var applicationStatus = 1; //draft status
    var jobApplication = new JobApplicationAPI.JobApplication(jobApplicationId, jobPosterId, jobSeekerId, applicationStatus, applicationQuestionAnswers);

    DataAPI.createJobApplication(jobApplication, function (request) {

        Utilities.debug ? console.log("New Job Application Submitted") : null;

        //TODO: less hacky way of getting job title? Is it worth re-requesting it?
        var jobTitle = document.getElementById('jobApplicationPostition').innerHTML;
        JobApplicationAPI.showCreateJobConfirmation(jobTitle);
    });

};

JobApplicationAPI.saveJobApplicationAndPreview = function () {

};

/**
 * Saves the current Job Application.
 * Call onSuccess if application is saved successfully
 *
 * @param {function} onSuccess
 * @return {undefined}
 */
JobApplicationAPI.saveJobApplication = function (onSuccess) {

    var jobApplicationId = document.getElementById('jobApplicationJobApplicationId').value;
    var jobPosterId = document.getElementById('jobApplicationJobPosterId').value;
    var jobSeekerId = document.getElementById('jobApplicationJobSeekerId').value;

    //get all Question answers
    var applicationQuestionAnswers = [];
    var questionAnswerSection = document.getElementById('createJobApplicationOpenEndedQuestionsWrapper');
    var questionAnswerWrappers = questionAnswerSection.getElementsByClassName('application-form__open-question-item');
    for (var i = 0; i < questionAnswerWrappers.length; i++) {
        var questionId = questionAnswerWrappers[i].getAttribute("data-question-id");
        var answer = questionAnswerWrappers[i].getElementsByTagName('textarea')[0].value;
        var question = questionAnswerWrappers[i].querySelector(".application-form__open-question").innerHTML;

        var questionAnswer = new JobApplicationAPI.ApplicationQuestionAnswer(
                null, questionId, question, answer);
        applicationQuestionAnswers.push(questionAnswer);
    }

    var applicationStatus = 1; //draft status
    var jobApplication = new JobApplicationAPI.JobApplication(jobApplicationId, jobPosterId, jobSeekerId, applicationStatus, applicationQuestionAnswers);

    DataAPI.saveJobApplicationByJobAndUser(jobApplication, jobPosterId, UserAPI.getSessionUserAsJSON().user_id, function (request) {
        if (request.status === 403) {
            var message = JSON.parse(request.response).failed;
            window.alert(message);
        } else if (request.status === 200) {
            if (onSuccess) {
                onSuccess();
            }
        }
    });
};

JobApplicationAPI.showCreateJobConfirmation = function (jobTitle) {
    var stateInfo = {pageInfo: 'create_job_application_confirmation', pageTitle: 'Talent Cloud: New Job Application Confirmed'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobApplicationConfirmation/' + encodeURI(jobTitle));

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);

    document.getElementById('createJobApplicationConfirmationPostition').innerHTML = jobTitle;

    var createJobApplicationSection = document.getElementById('createJobApplicationConfirmationSection');
    createJobApplicationSection.classList.remove('hidden');

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var applicationHeroTitle = document.getElementById("applicationHeroTitle");
    applicationHeroTitle.classList.remove("hidden");
    applicationHeroTitle.setAttribute("aria-hidden", "false");

};

JobApplicationAPI.showPreviousApplicationSection = function (jobPosterId) {
    JobApplicationAPI.shiftApplicationSection(-1, jobPosterId);
};

JobApplicationAPI.showNextApplicationSection = function (jobPosterId) {
    JobApplicationAPI.shiftApplicationSection(1, jobPosterId);
};

JobApplicationAPI.shiftApplicationSection = function (shift, jobPosterId) {

    window.scrollTo(0, 0);
    var progressItems = document.querySelectorAll(".application-progress__item");

    for (var i = 0; i < progressItems.length; i++) {
        if (!progressItems[i].classList.contains("inactive")) {
            //This item is not inactive, therefore it is the current section
            var shiftedIndex = i + shift;
            if (shiftedIndex < progressItems.length && shiftedIndex >= 0) {
                //as long as this would shift us to a valid index, show the new section

                var newSection = progressItems[shiftedIndex].getAttribute("data-application-section");
                JobApplicationAPI.showApplicationSection(newSection, jobPosterId);
            }
            break; //Ensuer this loop doesn't continue executing after we've switched sections
        }
    }
};

JobApplicationAPI.showApplicationSection = function (applicationSection, jobPosterId) {
    //Hide all application-sections except for selected one
    var applicationSections = document.querySelectorAll(".application-section");
    for (var i = 0; i < applicationSections.length; i++) {
        var section = applicationSections[i];
        if (section.getAttribute("data-application-section") === applicationSection) {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");
        }
    }

    //Set progress tracking bar to match
    var progressItems = document.querySelectorAll(".application-progress__item");
    for (var i = 0; i < progressItems.length; i++) {
        var item = progressItems[i];
        if (item.getAttribute("data-application-section") === applicationSection) {
            item.classList.remove("inactive");
            item.setAttribute("aria-hidden", "false");
        } else {
            item.classList.add("inactive");
            item.setAttribute("aria-hidden", "true");
        }
    }

    //TODO: select focus properly

    //Activate first evidence panel
    if (applicationSection === "essential-criteria") {
        EvidenceAPI.activateFirstEvidencePanel("essential");
    } else if (applicationSection === "asset-criteria") {
        EvidenceAPI.activateFirstEvidencePanel("asset");
    }

    // Google Analytics

    ga('set', 'page', '/apply/' + jobPosterId + '/' + applicationSection);
    ga('send', 'pageview');

};

JobApplicationAPI.submitJobApplication = function (jobPosterId) {
    if (jobPosterId && jobPosterId.length > 0 && UserAPI.hasSessionUser()) {
        var userId = UserAPI.getSessionUserAsJSON().user_id;

        //Verify attestation is checked before submitting
        var attestationChecked = document.getElementById("applicationAttestation");
        var attestationError = document.getElementById("applicationAttestationError");

        //Submit only if attestation checked
        if (attestationChecked.checked !== true) {
            //Show message and don't submit if attestation not checked
            attestationError.classList.remove("hidden");
        } else {
            //Hide old attestation error message
            attestationError.classList.add("hidden");

            //Load current job appliction to verify its ready for submission
            DataAPI.getFullJobApplicationByJobAndUser(jobPosterId, userId, function (request) {
                if (request.status === 200) {
                    var fullJobApplication = JSON.parse(request.response);

                    //TODO: validate fullJobApplication

                    //TODO: validate that application is still in draft status.
                    if (fullJobApplication.job_poster_application.job_poster_application_status_id === 1) {
                        DataAPI.submitJobApplication(fullJobApplication.job_poster_application.job_poster_application_id, function (request) {
                            if (request.status === 200) {
                                var jobTitle = document.getElementById('jobApplicationPostition').innerHTML;
                                JobApplicationAPI.showCreateJobConfirmation(jobTitle);
                            } else {
                                //TODO: post message
                                window.alert(request.response);
                            }
                        });
                    } else {
                        window.alert("You cannot edit an application that has already been saved.")
                    }
                }
            });
        }
    }
};
