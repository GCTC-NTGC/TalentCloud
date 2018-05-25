var JobApplicationPreviewAPI = {};

JobApplicationPreviewAPI.showJobApplicationPreviewById = function (jobApplicationId) {

    var stateInfo = {pageInfo: 'job_application_preview', pageTitle: 'Talent Cloud: Job Application Preview'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#JobApplicationPreview/' + jobApplicationId);
    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);
    var applicationPreviewSection = document.getElementById('applicationPreview');
    applicationPreviewSection.classList.remove('hidden');
    var locale = TalentCloudAPI.getLanguageFromCookie();
    //Now that evidence panels have been created, populate them with content
    DataAPI.getFullJobApplication(jobApplicationId, function (httpRequest) {
        if (httpRequest.status === 200) {
            //The JobApplication was loaded as expected 
            var fullJobApplication = JSON.parse(httpRequest.response);
            var jobPosterId = fullJobApplication.job_poster_application.application_job_poster_id;
                        
            DataAPI.getJobPoster(locale, jobPosterId, function (response) {
                var jobPoster = JobPostAPI.populateJobObject(JSON.parse(response));
                document.getElementById('jobApplicationPostition').innerHTML = jobPoster.title;
                //Create Evidence Panels 
                var evidenceFormWrapper = document.getElementById("applicationPreviewEvidencePanelWrapper");
                evidenceFormWrapper.innerHTML = "";
                JobApplicationPreviewAPI.createEvidencePanelsOnPage(jobPoster.core_competencies, "essential", "applicationPreviewEssentialEvidenceMenuWrapper", "applicationPreviewEvidencePanelWrapper");
                JobApplicationPreviewAPI.createEvidencePanelsOnPage(jobPoster.developing_competencies, "asset", "applicationPreviewAssetEvidenceMenuWrapper", "applicationPreviewEvidencePanelWrapper");
                Utilities.setEvidencePreviewUiEventListeners();
                
                JobApplicationPreviewAPI.populatePreviewApplicationWithApplicationContent(fullJobApplication);
            });            
        } else if (httpRequest.status === 404) {
            //No application exists for the current user and specified job 
            //TODO: replace alert with a modal message
            window.alert("The Requested Job Application does not exist");
        } else {
            //Something went wrong retrieving the saved applciation 
            window.alert("Something went wrong requesting the application preview.");
        }
    });
    
    //Reset attestation
    var attestationChecked = document.getElementById("applicationAttestation");
    attestationChecked.checked = false;
    //Hide old attestation warning messages
    var attestationError = document.getElementById("applicationAttestationError");
    attestationError.classList.add("hidden");
    // New Subpage Hero Scripts

    Utilities.getHeroElements();
    var applicationHeroTitle = document.getElementById("applicationHeroTitle");
    var applicationHeroMetadata = document.getElementById("applicationHeroMetadata");
    applicationHeroTitle.classList.remove("hidden");
    applicationHeroTitle.setAttribute("aria-hidden", "false");
    applicationHeroMetadata.classList.remove("hidden");
    // Google Analytics

    ga('set', 'page', '/apply/preview/' + jobApplicationId);
    ga('send', 'pageview');
};

JobApplicationPreviewAPI.localizeJobApplicationPreview = function () {
    if (siteContent) {
        document.getElementById("jobApplicationPositionLabel").innerHTML = siteContent.applicationPositionLabel;
        document.getElementById("applicationPreviewProfileImage").title = siteContent.applicationPreviewProfilePhotoTitle;
        document.getElementById("applicationPreviewProfileAlert").innerHTML = siteContent.applicationPreviewProfileAlert;
        document.getElementById("applicationPreviewEditApplicationButton").innerHTML = siteContent.editApplication;
        document.getElementById("applicationPreviewSubmitApplicationButton").innerHTML = siteContent.submit;
        document.getElementById("applicationPreviewEssentialMenuTitle").innerHTML = siteContent.essentialCriteria;
        document.getElementById("applicationPreviewAssetMenuTitle").innerHTML = siteContent.assetCriteria;
        function setInnerHtmlOnMatchingElements(query, content) {
            var elements = document.querySelectorAll(query);
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = content;
            }
        }

        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__experience-title-text", siteContent.applicationPreviewDeclarationStoryTitle);
        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__reference-title-text", siteContent.microReference);
        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__reference-status-label", siteContent.status);
        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__reference-null", siteContent.applicationPreviewReferenceMissing);
        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__evidence-title-text", siteContent.skillSample);
        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__evidence-status-label", siteContent.status);
        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__evidence-copy-label", siteContent.applicationPreviewSkillSampleStoryLabel);
        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__evidence-link", siteContent.applicationPreviewSkillSampleLink);
        setInnerHtmlOnMatchingElements(".applicant-evidence-preview__evidence-null", siteContent.applicationPreviewSkillSampleMissing);
    }
};

JobApplicationPreviewAPI.createEvidencePanelsOnPage = function (criteria, criteriaType, evidenceMenuId, evidenceFormWrapperId) {
    var evidenceMenu = document.getElementById(evidenceMenuId);
    var evidenceFormWrapper = document.getElementById(evidenceFormWrapperId);
    evidenceMenu.innerHTML = "";
    var menuFragment = document.createDocumentFragment();
    var panelsFragment = document.createDocumentFragment();
    for (var i = 0; i < criteria.length; i++) {
        var criterion = criteria[i];
        var criteriaId = criterion.id;
        var criteriaName = criterion.value;
        var menuItem = EvidenceAPI.instantiateApplicationPreviewEvidenceMenuItem(criteriaId, criteriaType, criteriaName)
        var panelItem = EvidenceAPI.instantiateApplicationPreviewEvidencePanel(criteriaId, criteriaType, criteriaName);
        menuFragment.appendChild(menuItem);
        panelsFragment.appendChild(panelItem);
    }
    evidenceMenu.appendChild(menuFragment);
    evidenceFormWrapper.appendChild(panelsFragment);
};

JobApplicationPreviewAPI.populatePreviewApplicationWithApplicationContent = function (fullJobApplication) {
    var jobPosterApplication = fullJobApplication.job_poster_application;
    //Store metadata
    document.getElementById("jobApplicationPreviewJobPosterId").value = jobPosterApplication.application_job_poster_id;
    document.getElementById("jobApplicationJobApplicationId").value = jobPosterApplication.job_poster_application_id;
    document.getElementById("jobApplicationJobPosterId").value = jobPosterApplication.application_job_poster_id;
    document.getElementById("jobApplicationJobSeekerId").value = jobPosterApplication.application_job_seeker_profile_id;
    document.getElementById("jobApplicationJobApplicationStatusId").value = jobPosterApplication.job_poster_application_status_id;
    //answers is an array of JobApplicationAPI.ApplicationQuestionAnswer objects 
    var answers = fullJobApplication.application_question_answers;
    JobApplicationPreviewAPI.populateApplicationPreviewAnswers(answers);
    JobApplicationPreviewAPI.populatePreviewApplicationWithProfileContent(JobSeekerAPI.populateJobSeekerObject(fullJobApplication.job_seeker_profile));
    SkillDeclarationAPI.populateApplicationPreviewUiSkillDeclarations(fullJobApplication.skill_declarations);
    var microReferences = MicroReferenceAPI.parseApplicationMicroReferenceResponse(fullJobApplication.application_micro_references);
    MicroReferenceAPI.populateApplicationPreviewUiMicroReferences(microReferences);
    var workSamples = SkillSampleAPI.parseApplicationSkillSampleResponse(fullJobApplication.application_work_samples);
    SkillSampleAPI.populateApplicationPreviewUiSkillSamples(workSamples);

    if (jobPosterApplication.job_poster_application_status_id != 1) {
        //can't submit if not in draft status
        var submissionSection = document.getElementById("applicationPreviewSubmissionSection");
        submissionSection.classList.add("hidden");
        
        var submit = document.getElementById("applicationPreviewSubmitApplicationButton");
        submit.disabled = true;
        /*
        var completionWarning = document.querySelector(".application-preview__completion-warning");
        completionWarning.classList.add("active");
        var submit = document.getElementById("applicationPreviewSubmitApplicationButton");
        submit.setAttribute("onclick", "");
        submit.disabled = true;
        */
    } else {
        var submissionSection = document.getElementById("applicationPreviewSubmissionSection");
        submissionSection.classList.remove("hidden");
        
        var submit = document.getElementById("applicationPreviewSubmitApplicationButton");
        submit.disabled = false;
    }

};

JobApplicationPreviewAPI.populateApplicationPreviewAnswers = function (answers) {
    //NOTE: Adding data to the UI that comes from a list is much more complicated.  
    //Since we don't know number of items beforehand, we need to create the HTML for each element at runtime 

    //Create a DocumentFragment to hold html elements for now - this will be faster than adding elements directly to the document DOM 
    var answerFragment = document.createDocumentFragment();
    //Iterate through answer objects 
    for (var i = 0; i < answers.length; i++) {
        var answer = answers[i];
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
        answerText.innerHTML = "<p>" + answer.answer + "</p>";
        //Place child elements appropriately, and in order 
        answerElement.appendChild(questionText);
        answerElement.appendChild(answerText);
        //Regardless of method used, add the root element to the documentFragment 
        answerFragment.appendChild(answerElement);
    }
    ;
    //Now, add the documentFragment to the document 
    //eg: 
    var answerWrapper = document.getElementById("applicationPreviewQuestionWrapper");
    answerWrapper.innerHTML = ""; //Removes old elements 
    answerWrapper.appendChild(answerFragment);
};

JobApplicationPreviewAPI.populatePreviewApplicationWithProfileContent = function (jobSeeker) {

    document.getElementById('applicationPreviewProfileName').innerHTML = jobSeeker.name;
    var tagline = document.getElementById('applicationPreviewProfileTagline');
    if (jobSeeker.tagline) {
        tagline.classList.remove("hidden");
        tagline = jobSeeker.tagline;
    } else {
        tagline.classList.add("hidden");
    }

    //Load applicant's profile photo
    var userProfilePhoto = document.getElementById('applicationPreviewProfileImage');
    ProfilePicAPI.refreshProfilePicBackground(jobSeeker.user_id, userProfilePhoto);
};