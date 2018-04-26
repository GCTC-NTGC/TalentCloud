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

JobApplicationAPI.SkillDeclaration = function (
        skillDeclarationId,
        skill,
        criteriaId,
        criteriaType,
        experienceLevelId,
        skillLevelId,
        description,
        lastUpdated) {
    this.skill_declaration_id = skillDeclarationId;
    this.skill = skill;
    this.criteria_id = criteriaId;
    this.criteria_type = criteriaType;
    this.experience_level_id = experienceLevelId;
    this.skill_level_id = skillLevelId;
    this.description = description;
    this.last_updated = lastUpdated;
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
    var stateInfo = {pageInfo: 'create_job_application', pageTitle: 'Talent Cloud: Create Job Application'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobApplication/' + jobPosterId);

    TalentCloudAPI.hideAllContent();
    window.scrollTo(0, 0);

    var createJobApplicationSection = document.getElementById('createJobApplicationSection');
    createJobApplicationSection.classList.remove('hidden');

    locale = TalentCloudAPI.getLanguageFromCookie();

    document.getElementById('createJobApplicationJobPosterId').value = jobPosterId;

    if (!UserAPI.hasSessionUser()) {
        //TODO: this page should not be accessible if not logged in
    }

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

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var applicationHeroTitle = document.getElementById("applicationHeroTitle");
    var applicationHeroMetadata = document.getElementById("applicationHeroMetadata");
    applicationHeroTitle.classList.remove("hidden");
    applicationHeroTitle.setAttribute("aria-hidden", "false");
    applicationHeroMetadata.classList.remove("hidden");

};

JobApplicationAPI.localizeCreateJobApplication = function () {
    if (siteContent) {
        document.getElementById('createJobApplicationTitle').innerHTML = siteContent.createJobApplicationWindowTitle;
        document.getElementById('createJobApplicationConfirmationTitle').innerHTML = siteContent.createJobApplicationWindowTitle;
        document.getElementById('createJobApplicationPositionLabel').innerHTML = siteContent.createJobApplicationJobTitleLabel;
        document.getElementById('createJobApplicationSubmitButton').innerHTML = siteContent.submitApplication;

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

    var essentialSkillWrapper = document.getElementById("skills__essential-accordion-wrapper");
    Utilities.removeChildNodes(essentialSkillWrapper);
    var essentialFragment = document.createDocumentFragment();
    for (var i = 0; i < jobPoster.core_competencies.length; i++) {
        var skillDeclaration = new JobApplicationAPI.SkillDeclaration();
        skillDeclaration.skill = jobPoster.core_competencies[i].value;
        var criteriaId = jobPoster.core_competencies[i].id;
        var skillDeclarationForm = JobApplicationAPI.makeSkillDeclarationForm(skillDeclaration, true, criteriaId);
        essentialFragment.appendChild(skillDeclarationForm);
    }
    essentialSkillWrapper.appendChild(essentialFragment);

    var assetSkillWrapper = document.getElementById("skills__asset-accordion-wrapper");
    Utilities.removeChildNodes(assetSkillWrapper);
    var assetFragment = document.createDocumentFragment();
    for (var i = 0; i < jobPoster.developing_competencies.length; i++) {
        var skillDeclaration = new JobApplicationAPI.SkillDeclaration();
        skillDeclaration.skill = jobPoster.developing_competencies[i].value;
        var criteriaId = jobPoster.developing_competencies[i].id;
        var skillDeclarationForm = JobApplicationAPI.makeSkillDeclarationForm(skillDeclaration, false, criteriaId);
        assetFragment.appendChild(skillDeclarationForm);
    }
    assetSkillWrapper.appendChild(assetFragment);
    
    //setTimeout(Utilities.setAccordionTriggers, 1);
    Utilities.setAccordionTriggers();

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
        DataAPI.getSkillDeclarationsForApplication(jobApplication.job_poster_application.job_poster_application_id,
                JobApplicationAPI.populateApplicationWithSavedSkillDeclarations);

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

JobApplicationAPI.populateApplicationWithSavedSkillDeclarations = function (request) {
    if (request.response) {
        var declarations = JSON.parse(request.response);
        declarations.forEach(declaration => {
            //find appropriate skill declaration
            var element = document.querySelector('.skills__accordion[data-criteria-id="' + declaration.criteria_id + '"][data-criteria-type="' + declaration.criteria_type + '"]');
            //if skill declaration exists, set values
            if (element) {
                var experienceSelect = element.querySelector('select[id^="selectYearsOfExperience"]');
                experienceSelect.value = declaration.experience_level_id;
                var skillLevelSelect = element.querySelector('select[id^="selectLevel"]');
                skillLevelSelect.value = declaration.skill_level_id;
                var description = element.querySelector('textarea[id^="typeExperience"]');
                description.value = declaration.description;

                //Set icon to indicate this has been completed and saved
                var accordionTrigger = element.querySelector("[class*=skills__accordion-trigger]");
                accordionTrigger.classList.remove("skills__accordion-trigger--todo");
                accordionTrigger.classList.remove("skills__accordion-trigger--edit");
                accordionTrigger.classList.add("skills__accordion-trigger--complete");
            }
        });
    }
}

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

/**
 * 
 * @param {JobApplicationAPI.SkillDeclaration} skillDeclaration
 * @param {boolean} isEssential
 * @return {undefined}
 */
JobApplicationAPI.makeSkillDeclarationForm = function (skillDeclaration, isEssential, criteriaId) {
    var baseSkillDeclarationForm = document.querySelector("#skills__accordion-template");

    var skillDeclarationForm = baseSkillDeclarationForm.cloneNode(true);
    skillDeclarationForm.classList.remove("hidden");
    skillDeclarationForm.removeAttribute("id");

    var idSuffix = "_" + (isEssential ? "essential" : "asset") + "_" + criteriaId;

    //Add data identifiers to root element
    skillDeclarationForm.setAttribute("data-criteria-id", criteriaId);
    skillDeclarationForm.setAttribute("data-criteria-type", (isEssential ? "essential" : "asset"));

    //Find elements
    var skillTitle = skillDeclarationForm.querySelector(".skills__skill-title");

    var accordionTrigger = skillDeclarationForm.querySelector("[class*='accordion-trigger']");
    var accordionContent = skillDeclarationForm.querySelector(".skills__accordion-content");

    var experienceLabel = skillDeclarationForm.querySelector("#selectYearsOfExperience__label");
    var experienceSelect = skillDeclarationForm.querySelector("#selectYearsOfExperience");
    var levelLabel = skillDeclarationForm.querySelector("#selectLevel__label");
    var levelSelect = skillDeclarationForm.querySelector("#selectLevel");
    var descriptionLabel = skillDeclarationForm.querySelector("#typeExperience__label");
    var description = skillDeclarationForm.querySelector("#typeExperience");

    var saveButton = skillDeclarationForm.querySelector("#skills__save-button");
    var cancelButton = skillDeclarationForm.querySelector("#skills__cancel-button");

    //Set skill name
    skillTitle.innerHTML = skillDeclaration.skill;

    //Make element id's unique       
    experienceLabel.setAttribute("id", "selectYearsOfExperience__label" + idSuffix);
    experienceLabel.setAttribute("for", "selectYearsOfExperience" + idSuffix);
    experienceSelect.setAttribute("id", "selectYearsOfExperience" + idSuffix);

    levelLabel.setAttribute("id", "selectLevel__label" + idSuffix);
    levelLabel.setAttribute("for", "selectLevel" + idSuffix);
    levelSelect.setAttribute("id", "selectLevel" + idSuffix);

    descriptionLabel.setAttribute("id", "typeExperience__label" + idSuffix);
    descriptionLabel.setAttribute("for", "typeExperience" + idSuffix);
    description.setAttribute("id", "typeExperience" + idSuffix);

    saveButton.setAttribute("id", saveButton.id + idSuffix);
    cancelButton.setAttribute("id", cancelButton.id + idSuffix);

    //Populate dropdowns
    LookupAPI.populateDropdownElement("experience_level", experienceSelect);
    LookupAPI.populateDropdownElement("skill_level", levelSelect);

    //Prepopulate form fields 
    if (skillDeclaration.experience_level_id)
        experienceSelect.value = skillDeclaration.experience_level_id;
    if (skillDeclaration.skill_level_id)
        levelSelect.value = skillDeclaration.skill_level_id;
    if (skillDeclaration.description)
        description.value = skillDeclaration.description;

    function closeAccordian() {
        accordionTrigger.classList.remove("active");
        accordionContent.classList.remove("active");
    }

    //Assign button functions
    saveButton.onclick = function () {
        var newSkillDeclaration = new JobApplicationAPI.SkillDeclaration();
        newSkillDeclaration.skill_level_id = levelSelect.value;
        newSkillDeclaration.experience_level_id = experienceSelect.value;
        newSkillDeclaration.description = description.value;

        if (newSkillDeclaration.skill_level_id && newSkillDeclaration.experience_level_id && newSkillDeclaration.description) {
            var applicationId = document.getElementById("createJobApplicationJobApplicationId").value;
            if (applicationId) {
                DataAPI.saveSkillDeclaration(newSkillDeclaration, isEssential, criteriaId, applicationId, function (response) {
                    if (response.status == 200) {
                        accordionTrigger.classList.remove("skills__accordion-trigger--todo");
                        accordionTrigger.classList.remove("skills__accordion-trigger--edit");
                        accordionTrigger.classList.add("skills__accordion-trigger--complete");
                        closeAccordian();
                    } else {
                        //TODO: how to respond to failed status?
                    }
                });
            }
        } else {
            //TODO: finish validation!
        }
    };
    cancelButton.onclick = function () {
        //TODO: finish validation!
        var applicationId = document.getElementById("createJobApplicationJobApplicationId").value;
        if (applicationId) {
            DataAPI.deleteSkillDeclaration(isEssential, criteriaId, applicationId, function (response) {
                if (response.status == 200) {
                    accordionTrigger.classList.add("skills__accordion-trigger--todo");
                    accordionTrigger.classList.remove("skills__accordion-trigger--edit");
                    accordionTrigger.classList.remove("skills__accordion-trigger--complete");
                }
            });
        }
    };
    return skillDeclarationForm;

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
