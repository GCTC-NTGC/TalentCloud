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
    JobApplicationAPI.createEvidencePanelsOnPage(jobPoster.developing_competencies, "asset", "applicationAssetEvidenceMenu", "applicationAssetEvidenceFormWrapper");
    
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
    
    EvidenceAPI.activateFirstEvidencePanel(criteriaType);
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

JobApplicationAPI.showJobApplicationPreview = function(jobPosterId) {

    console.log(jobPosterId);

    if (!jobPosterId) {
        //If not passed a non-zero non-null jobPosterId, the correct preview can't be loaded
        //TODO: use warning modal instead of window alert
        window.alert("Cannot show Job Application Preview without a Job Poster Id");
        return;
    }
    
    var stateInfo = {pageInfo: 'show_job_application_preview', pageTitle: 'Talent Cloud: Job Application Preview'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#JobApplicationPreview/' + jobPosterId);

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);

    var applicationPreviewSection = document.getElementById('applicationPreview');
    // console.log(applicationPreviewSection);

    applicationPreviewSection.classList.remove('hidden');

    locale = TalentCloudAPI.getLanguageFromCookie();

    //Get current user id
    var userId = UserAPI.getSessionUserAsJSON().user_id;

    DataAPI.getJobPoster(locale, jobPosterId, JobApplicationAPI.populatePreviewApplicationWithPosterContent);
    
    //Load this user's Application for this Job Poster, directing server response to a callback function
    DataAPI.getJobApplicationByJobAndUser(jobPosterId, userId, JobApplicationAPI.populatePreviewApplicationWithApplicationContent);

    if (UserAPI.hasSessionUser()) {

        var user = UserAPI.getSessionUserAsJSON();
        var userProfilePhoto = document.getElementById('applicationPreviewProfileImage');
        
        ProfilePicAPI.refreshProfilePicBackground(user.user_id, userProfilePhoto);
        
        JobApplicationAPI.populatePreviewApplicationWithUserContent(user);

    }

    //Load user's Profile data, directing server response to another callback function
    DataAPI.getJobSeekerProfileByUserId(userId, JobApplicationAPI.populatePreviewApplicationWithProfileContent);
    
};

JobApplicationAPI.populatePreviewApplicationWithPosterContent = function(jobPosterResponse) {

    var jobPoster = JobPostAPI.populateJobObject(JSON.parse(jobPosterResponse));

    // console.log(jobPoster);

    document.getElementById('applicationPreviewHeaderPosition').innerHTML = jobPoster.title;

}

JobApplicationAPI.populatePreviewApplicationWithApplicationContent = function(httpRequest) {

    if (httpRequest.status === 200) {
        //The JobApplication was loaded as expected
        
        //jobApplication should match JobApplicationAPI.JobApplication in structure
        var jobApplication = JSON.parse(httpRequest.response);
        
        //Application data is stored in jobApplication object properties
        var applicationId = jobApplication.job_poster_application.job_poster_application_id;
        var jobPosterId = jobApplication.job_poster_application.application_job_poster_id;
        var profileId = jobApplication.job_poster_application.application_job_seeker_profile_id;
        var applicationStatus = jobApplication.job_poster_application.job_poster_application_status_id;
        
        //answers is an array of JobApplicationAPI.ApplicationQuestionAnswer objects
        var answers = jobApplication.application_question_answers;
        
        //This data may now be used to launch further data requests:
        DataAPI.getSkillDeclarationsForApplication (applicationId, JobApplicationAPI.populatePreviewApplicationWithSkillDeclarationContent);
        
        
        //JobApplication data may now be used to set UI 
        //eg:
        //document.getElementById("applicationPreviewJobPosterId").innerHTML = jobPosterId;

        //NOTE: Adding data to the UI that comes from a list is much more complicated. 
        //Since we don't know number of items beforehand, we need to create the HTML for each element at runtime
        
        //Create a DocumentFragment to hold html elements for now - this will be faster than adding elements directly to the document DOM
        var answerFragment = document.createDocumentFragment();
        //Iterate through answer objects
        answers.forEach( answer => {
           //Create the html elements which display a question-answer pair
           //This can be done 2 ways:
           //(1) Entirely in js: see JobApplicationAPI.makeQuestionAnswerHtmlElement as an example
           //(2) You can clone a template already in the DOM and modify it: see JobApplicationAPI.makeSkillDeclarationForm as an example
           
           //Some stub code for method (1):
           var answerElement = document.createElement("div"); 
           answerElement.setAttribute("class", "application-preview__question");
           var questionText = document.createElement("h5");
           questionText.setAttribute("class", "application-preview__question-title");
           questionText.innerHTML = answer.question;
           var answerText = document.createElement("div");
           answerText.setAttribute("class", "application-preview__question-answer");
           answerText.innerHTML = "<p>"+answer.answer+"</p>";
           
           //Place child elements appropriately, and in order
           answerElement.appendChild(questionText);
           answerElement.appendChild(answerText);
           
           //Regardless of method used, add the root element to the documentFragment
           answerFragment.appendChild(answerElement);
        });
        //Now, add the documentFragment to the document
        //eg:
        var answerWrapper = document.getElementById("applicationPreviewQuestionWrapper");
        answerWrapper.innerHTML = ""; //Removes old elements
        answerWrapper.appendChild(answerFragment);       
        
    } else if (httpRequest.status === 404) {
        //No application exists for the current user and specified job
    } else {
        //Something went wrong retrieving the saved applciation
    }
};

/**
 * Note: because of the way DataAPI.getJobSeekerProfileByUserId is written, this
 * function only gets passed the httpRequest response, not the httpRequest itself.
 * This function must assume it is getting good data, instead of checking the httpRequest.status itself.
 * 
 * @param {type} response
 * @return {undefined}
 */
JobApplicationAPI.populatePreviewApplicationWithUserContent = function(user) { 
    
    // var jobSeeker = JSON.parse(user);

    console.log(user);
    
    //Do something with the response data
    document.getElementById('applicationPreviewProfileName').innerHTML = user.firstname;

};

JobApplicationAPI.populatePreviewApplicationWithProfileContent = function(response) { 
    var jobSeeker = JobSeekerAPI.populateJobSeekerObject(JSON.parse(response));
    
    //Do something with the response data
    document.getElementById('applicationPreviewProfileTagline').innerHTML = jobSeeker.tagline;

};

JobApplicationAPI.populatePreviewApplicationWithSkillDeclarationContent = function(httpRequest) {
    if (httpRequest.status === 200) {
        var skillDeclarations = JSON.parse(httpRequest.response);
        
        //Add skill declarations to ui
    }
};

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
    
    //TODO: select focus properly
    
    //Activate first evidence panel
    if (applicationSection === "essential-criteria") {
        EvidenceAPI.activateFirstEvidencePanel("essential");
    } else if (applicationSection === "asset-criteria") {
        EvidenceAPI.activateFirstEvidencePanel("asset");
    }
}