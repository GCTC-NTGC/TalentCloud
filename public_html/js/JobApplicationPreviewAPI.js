var JobApplicationPreviewAPI = {};

JobApplicationPreviewAPI.showJobApplicationPreview = function (jobPosterId) {

    console.log(jobPosterId);

    if (!jobPosterId) {
        //If not passed a non-zero non-null jobPosterId, the correct preview can't be loaded 
        //TODO: use warning modal instead of window alert 
        window.alert("Cannot show Job Application Preview without a Job Poster Id");
        return;
    }

    var stateInfo = {pageInfo: 'job_application_preview', pageTitle: 'Talent Cloud: Job Application Preview'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#JobApplicationPreview/' + jobPosterId);

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);
    
    document.getElementById("jobApplicationPreviewJobPosterId").value = jobPosterId;

    var applicationPreviewSection = document.getElementById('applicationPreview');
    // console.log(applicationPreviewSection); 

    applicationPreviewSection.classList.remove('hidden');

    var locale = TalentCloudAPI.getLanguageFromCookie();

    //Get current user id 
    var userId = UserAPI.getSessionUserAsJSON().user_id;

    DataAPI.getJobPoster(locale, jobPosterId, function (response) {
        var jobPoster = JobPostAPI.populateJobObject(JSON.parse(response));

        //document.getElementById('applicationPreviewHeaderPosition').innerHTML = jobPoster.title;
        document.getElementById('jobApplicationPostition').innerHTML = jobPoster.title;

        //Create Evidence Panels 
        var evidenceFormWrapper = document.getElementById("applicationPreviewEvidencePanelWrapper");
        evidenceFormWrapper.innerHTML = "";
        JobApplicationPreviewAPI.createEvidencePanelsOnPage(jobPoster.core_competencies, "essential", "applicationPreviewEssentialEvidenceMenuWrapper", "applicationPreviewEvidencePanelWrapper");
        JobApplicationPreviewAPI.createEvidencePanelsOnPage(jobPoster.developing_competencies, "asset", "applicationPreviewAssetEvidenceMenuWrapper", "applicationPreviewEvidencePanelWrapper");

        Utilities.setEvidencePreviewUiEventListeners();

        //Now that evidence panels have been created, populate them with content
        DataAPI.getFullJobApplicationByJobAndUser(jobPosterId, userId, JobApplicationPreviewAPI.populatePreviewApplicationWithApplicationContent);
    });

    if (UserAPI.hasSessionUser()) {

        var user = UserAPI.getSessionUserAsJSON();
        var userProfilePhoto = document.getElementById('applicationPreviewProfileImage');

        ProfilePicAPI.refreshProfilePicBackground(user.user_id, userProfilePhoto);

        document.getElementById('applicationPreviewProfileName').innerHTML = user.name;
    }

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

    ga('set', 'page', '/apply/preview');
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
            for (var i=0; i<elements.length; i++) {
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

JobApplicationPreviewAPI.populatePreviewApplicationWithApplicationContent = function (httpRequest) {

    if (httpRequest.status === 200) {
        //The JobApplication was loaded as expected 

        var fullJobApplication = JSON.parse(httpRequest.response);

        
        var jobPosterApplication = fullJobApplication.job_poster_application;
        
        //Store metadata
        document.getElementById("jobApplicationJobApplicationId").value = jobPosterApplication.job_poster_application_id;
        document.getElementById("jobApplicationJobPosterId").value = jobPosterApplication.application_job_poster_id;
        document.getElementById("jobApplicationJobSeekerId").value = jobPosterApplication.application_job_seeker_profile_id;
        document.getElementById("jobApplicationJobApplicationStatusId").value = jobPosterApplication.job_poster_application_status_id;

        //answers is an array of JobApplicationAPI.ApplicationQuestionAnswer objects 
        var answers = fullJobApplication.application_question_answers;
        JobApplicationPreviewAPI.populateApplicationPreviewAnswers(answers);
        
        JobApplicationPreviewAPI.populatePreviewApplicationWithProfileContent(fullJobApplication.job_seeker_profile);
        
        SkillDeclarationAPI.populateApplicationPreviewUiSkillDeclarations(fullJobApplication.skill_declarations);
        
        var microReferences = MicroReferenceAPI.parseApplicationMicroReferenceResponse(fullJobApplication.application_micro_references);
        MicroReferenceAPI.populateApplicationPreviewUiMicroReferences(microReferences);
        
        var workSamples = SkillSampleAPI.parseApplicationSkillSampleResponse(fullJobApplication.application_work_samples);
        SkillSampleAPI.populateApplicationPreviewUiSkillSamples(workSamples);

    } else if (httpRequest.status === 404) {
        //No application exists for the current user and specified job 

        //TODO: replace alert with a modal message
        window.alert("You have not yet submitted an application to this job.");
    } else {
        //Something went wrong retrieving the saved applciation 
    }
};

JobApplicationPreviewAPI.populateApplicationPreviewAnswers = function (answers) {
    //NOTE: Adding data to the UI that comes from a list is much more complicated.  
    //Since we don't know number of items beforehand, we need to create the HTML for each element at runtime 

    //Create a DocumentFragment to hold html elements for now - this will be faster than adding elements directly to the document DOM 
    var answerFragment = document.createDocumentFragment();
    //Iterate through answer objects 
    for (var i=0; i < answers.length; i++) {
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
    };
    //Now, add the documentFragment to the document 
    //eg: 
    var answerWrapper = document.getElementById("applicationPreviewQuestionWrapper");
    answerWrapper.innerHTML = ""; //Removes old elements 
    answerWrapper.appendChild(answerFragment);
};

JobApplicationPreviewAPI.populatePreviewApplicationWithProfileContent = function (jobSeeker) {
    
    var tagline = document.getElementById('applicationPreviewProfileTagline');
    if (jobSeeker.tagline) {
        tagline.classList.remove("hidden");
        tagline = jobSeeker.tagline;
    } else {
        tagline.classList.add("hidden");
    }
};

