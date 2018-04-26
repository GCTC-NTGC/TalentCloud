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
    this.job_poster_application_status_id = jobApplicationStatusId;

    this.application_question_answers = applicationQuestionAnswers;
};

JobApplicationAPI.showCreateJobApplication = function (jobPosterId) {
    if (!UserAPI.hasSessionUser()) {
        //TODO: this page should not be accessible if not logged in
        window.alert("You must log in before submitting a job application.");
        return;
    }
    
    var stateInfo = {pageInfo: 'create_job_application', pageTitle: 'Talent Cloud: Create Job Application'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobApplication/' + jobPosterId);

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);

    var createJobApplicationSection = document.getElementById('createJobApplicationSection');
    createJobApplicationSection.classList.remove('hidden');
    
    JobApplicationAPI.showApplicationSection("my-information");

    locale = TalentCloudAPI.getLanguageFromCookie();

    document.getElementById('createJobApplicationJobPosterId').value = jobPosterId;

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
            JobApplicationAPI.populateApplicationWithSavedApplicationContent(request);
        })

    });
};

JobApplicationAPI.localizeCreateJobApplication = function () {
    if (siteContent) {
        document.getElementById('createJobApplicationTitle').innerHTML = siteContent.createJobApplicationWindowTitle;
        document.getElementById('createJobApplicationConfirmationTitle').innerHTML = siteContent.createJobApplicationWindowTitle;
        document.getElementById('createJobApplicationPositionLabel').innerHTML = siteContent.createJobApplicationJobTitleLabel;
        //document.getElementById('createJobApplicationSubmitButton').innerHTML = siteContent.submitApplication;

        //Localize confirmation page at same time
        document.getElementById('createJobApplicationConfirmationPositionLabel').innerHTML = siteContent.createJobApplicationConfirmationPositionLabel;
        document.getElementById('createJobApplicationConfirmationTrackingReminder').innerHTML = siteContent.jobApplicationConfirmationTrackingReminder;
        document.getElementById('createJobApplicationConfirmationContinueButton').innerHTML = siteContent.continueToDashboard;
    }
}

JobApplicationAPI.populateApplicationWithJobPosterContent = function (jobPosterResponse) {
    var jobPoster = JobPostAPI.populateJobObject(JSON.parse(jobPosterResponse));

    document.getElementById('createJobApplicationPostition').innerHTML = jobPoster.title;
    JobApplicationAPI.populateApplicationWithQuestionContent(jobPoster.questions);

    //Create Evidence Panels 
    JobApplicationAPI.createEvidencePanelsOnPage(jobPoster.core_competencies, "essential", "applicationEssentialEvidenceMenu", "applicationEssentialEvidenceFormWrapper");
    
    //TODO: create applicationAssetEvidence wrapper divs
    JobApplicationAPI.createEvidencePanelsOnPage(jobPoster.core_competencies, "asset", "applicationAssetEvidenceMenu", "applicationAssetEvidenceFormWrapper");
    
    Utilities.setEvidenceUiEventListeners();
    
    //TODO: call Utilities function to set up triggers    
};

JobApplicationAPI.createEvidencePanelsOnPage = function(criteria, criteriaType, evidenceMenuId, evidenceFormWrapperId) {
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
    if (firstCriteriaId) {
        //Set the first panel to active
        EvidenceAPI.setActiveEvidencePanel(firstCriteriaId, criteriaType);
    }    
};

JobApplicationAPI.populateApplicationWithUserContent = function (user) {
    document.getElementById('createJobApplicationFirstName').innerHTML = user.firstname;
    document.getElementById('createJobApplicationLastName').innerHTML = user.lastname;
};

JobApplicationAPI.populateApplicationWithJobSeekerProfileContent = function (jobSeekerProfileResponse) {
    var jobSeeker = JobSeekerAPI.populateJobSeekerObject(JSON.parse(jobSeekerProfileResponse));

    document.getElementById('createJobApplicationJobSeekerId').value = jobSeeker.id;
};

JobApplicationAPI.populateApplicationWithSavedApplicationContent = function (jobApplicationRequestResponse) {
    if (jobApplicationRequestResponse.status === 200) {
        var jobApplication = JSON.parse(jobApplicationRequestResponse.response);
        document.getElementById("createJobApplicationJobApplicationId").value = jobApplication.job_poster_application.job_poster_application_id;

        //Load saved skill declarations using application id
        SkillDeclarationAPI.loadSavedSkillDeclarationsForJobApplication(jobApplication.job_poster_application.job_poster_application_id);

        //Set saved question answer content
        jobApplication.application_question_answers.forEach(value => {
            //find appropriate question textarea
            var element = document.querySelector('.application-form__open-answer[data-question-id="' + value.job_poster_question_id + '"]');
            //if textarea exists, set value with saved value
            if (element) {
                element.value = value.answer;
            }
        })
    } else if (jobApplicationRequestResponse.status === 404) {
        //An application for this job and user doesn't exist yet, so create a new draft application

        var status = 1; //draft status id
        var jobPosterId = document.getElementById('createJobApplicationJobPosterId').value;

        //Need an up-to-date profile id
        var user = UserAPI.getSessionUserAsJSON();
        DataAPI.getJobSeekerProfileByUserId(user.user_id, function (jobSeekerProfileResponse) {
            if (jobSeekerProfileResponse) {
                var jobSeeker = JobSeekerAPI.populateJobSeekerObject(JSON.parse(jobSeekerProfileResponse));
                var newApplication = new JobApplicationAPI.JobApplication(null, jobPosterId, jobSeeker.id, status, []);
                DataAPI.createJobApplication(newApplication, function (request) {
                    if (request.status === 200) {
                        //Draft application was successfully created - save application id
                        var jobApplication = JSON.parse(request.response);
                        document.getElementById("createJobApplicationJobApplicationId").value = jobApplication.job_poster_application.job_poster_application_id;
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

    for (var i = 0; i < jobPosterQuestions.length; i++) {

        var element = JobApplicationAPI.makeQuestionAnswerHtmlElement(jobPosterQuestions[i], i);
        questionSectionWrapper.appendChild(element);
    }
};

/**
 *
 * @param {JobPostAPI.JobPosterQuestion} jobPosterQuestion
 * @param {int} questionNumber - this is the nth question on the page
 * @return {Element} Job Application Question Answer Wrapper element
 */
JobApplicationAPI.makeQuestionAnswerHtmlElement = function (jobPosterQuestion, questionNumber) {
    var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "jobApplicationQuestionAnswerWrapper");

    var label = document.createElement('form');
    label.setAttribute('class', 'application-form__form');

    var question = document.createElement('label');
    question.setAttribute('class', 'jobApplicationQuestion application-form__label heading--03');
    var questionTextNode = document.createTextNode(jobPosterQuestion.question);
    question.appendChild(questionTextNode);

    var answerField = document.createElement('textarea');
    var answerId = "jobApplicationAnswerField_number_" + questionNumber;
    answerField.setAttribute("id", answerId);
    answerField.setAttribute('name', 'answer');
    answerField.setAttribute('class', 'jobApplicationAnswerField application-form__textarea form__textarea application-form__open-answer');
    answerField.setAttribute('data-question-id', jobPosterQuestion.id);
    //answerField.value = jobPosterQuestion.answer;

    var questionId = document.createElement('input');
    questionId.setAttribute('name', 'job_poster_question_id');
    questionId.setAttribute('type', 'hidden');
    questionId.value = jobPosterQuestion.id;

    label.appendChild(question);
    label.appendChild(answerField);

    wrapper.appendChild(label);
    wrapper.appendChild(questionId);

    return wrapper;
};

JobApplicationAPI.showJobApplicationPreview = function() {
    var stateInfo = {pageInfo: 'show_job_application_preview', pageTitle: 'Talent Cloud: Job Application Preview'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#JobApplicationPreview/' + jobPosterId);

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);

    var applicationPreviewSection = document.getElementById('applicationPreview');
    console.log(applicationPreviewSection);

    applicationPreviewSection.classList.remove('hidden');

    locale = TalentCloudAPI.getLanguageFromCookie();
}

JobApplicationAPI.submitNewJobApplication = function () {
    //TODO: always make sure to get most recent jobPosterId, not what's saved in the html element

    var jobApplicationId = document.getElementById('createJobApplicationJobApplicationId').value;
    var jobPosterId = document.getElementById('createJobApplicationJobPosterId').value;
    var jobSeekerId = document.getElementById('createJobApplicationJobSeekerId').value;

    //get all Question answers
    var applicationQuestionAnswers = [];
    var questionAnswerSection = document.getElementById('createJobApplicationOpenEndedQuestionsWrapper');
    var questionAnswerWrappers = questionAnswerSection.getElementsByClassName('jobApplicationQuestionAnswerWrapper');
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
        var jobTitle = document.getElementById('createJobApplicationPostition').innerHTML;
        JobApplicationAPI.showCreateJobConfirmation(jobTitle);
    });
};

JobApplicationAPI.saveJobApplicationAndPreview = function() {
    
};

/**
 * Saves the current Job Application.
 * Call onSuccess if application is saved successfully
 * 
 * @param {function} onSuccess
 * @return {undefined}
 */
JobApplicationAPI.saveJobApplication = function(onSuccess) {
    
    var jobApplicationId = document.getElementById('createJobApplicationJobApplicationId').value;
    var jobPosterId = document.getElementById('createJobApplicationJobPosterId').value;
    var jobSeekerId = document.getElementById('createJobApplicationJobSeekerId').value;

    //get all Question answers
    var applicationQuestionAnswers = [];
    var questionAnswerSection = document.getElementById('createJobApplicationOpenEndedQuestionsWrapper');
    var questionAnswerWrappers = questionAnswerSection.getElementsByClassName('jobApplicationQuestionAnswerWrapper');
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
}

JobApplicationAPI.showCreateJobConfirmation = function (jobTitle) {
    var stateInfo = {pageInfo: 'create_job_application_confirmation', pageTitle: 'Talent Cloud: New Job Application Confirmed'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobApplicationConfirmation/' + encodeURI(jobTitle));

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);

    document.getElementById('createJobApplicationConfirmationPostition').innerHTML = jobTitle;

    var createJobApplicationSection = document.getElementById('createJobApplicationConfirmationSection');
    createJobApplicationSection.classList.remove('hidden');
};

JobApplicationAPI.showPreviousApplicationSection = function() {
    JobApplicationAPI.shiftApplicationSection(-1);
};

JobApplicationAPI.showNextApplicationSection = function() {
    JobApplicationAPI.shiftApplicationSection(1);
};

JobApplicationAPI.shiftApplicationSection = function(shift) {    
    var progressItems = document.querySelectorAll(".application-progress__item");
    
    for (var i=0; i<progressItems.length; i++) {
        if (!progressItems[i].classList.contains("inactive")) {
            //This item is not inactive, therefore it is the current section
            var shiftedIndex = i + shift;
            if (shiftedIndex < progressItems.length && shiftedIndex >= 0) {
                //as long as this would shift us to a valid index, show the new section
                
                var newSection = progressItems[shiftedIndex].getAttribute("data-application-section");
                JobApplicationAPI.showApplicationSection(newSection);
            }
            break; //Ensuer this loop doesn't continue executing after we've switched sections
        }
    }
};

JobApplicationAPI.showApplicationSection = function(applicationSection) {
    //Hide all application-sections except for selected one
    var applicationSections = document.querySelectorAll(".application-section");
    applicationSections.forEach(section => {
       if (section.getAttribute("data-application-section") === applicationSection) {
           section.classList.remove("hidden");
       } else {
           section.classList.add("hidden");
       }
    });
    
    //Set progress tracking bar to match
    var progressItems = document.querySelectorAll(".application-progress__item");
    progressItems.forEach( item => {
       if (item.getAttribute("data-application-section") === applicationSection) {
           item.classList.remove("inactive");
       } else {
           item.classList.add("inactive");
       }
    });
}