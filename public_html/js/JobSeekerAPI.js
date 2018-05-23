/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var JobSeekerAPI = {};
JobSeekerAPI.jobSeekers = [];
JobSeekerAPI.profilePicUploader = null;
JobSeekerAPI.defaultFirstName = "Jane";
JobSeekerAPI.defaultLastName = "Doe";

JobSeekerAPI.JobSeekerProfileAnswer = function (question_id, answer) {
    this.job_seeker_profile_question_id = question_id;
    this.answer = answer;
}

JobSeekerAPI.JobSeeker = function (
        id,
        name,
        email,
        personal_link,
        tagline,
        twitter_username,
        linkedin_username,
        answers,
        last_updated,
        user_id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.personal_link = personal_link;
    this.tagline = tagline;
    this.twitter_username = twitter_username;
    this.linkedin_username = linkedin_username;
    this.answers = answers;
    this.last_updated = last_updated;
    this.user_id = user_id;
};

JobSeekerAPI.localizeJobSeekerProfile = function () {
    if (siteContent) {
        document.getElementById("profileEditAnswerCancel").value = siteContent.cancel;
        document.getElementById("profileEditAnswerSave").value = siteContent.save;
    }
}

JobSeekerAPI.populateJobSeekerObject = function (jobSeekerJSON) {
    var jobSeekerObj = new JobSeekerAPI.JobSeeker();

    if (jobSeekerJSON) {
        jobSeekerObj.id = jobSeekerJSON.job_seeker_profile_id;
        jobSeekerObj.name = jobSeekerJSON.job_seeker_profile_name;
        jobSeekerObj.email = jobSeekerJSON.job_seeker_profile_email;
        jobSeekerObj.personal_link = jobSeekerJSON.job_seeker_profile_link;
        jobSeekerObj.tagline = jobSeekerJSON.job_seeker_profile_tagline;
        jobSeekerObj.twitter_username = jobSeekerJSON.job_seeker_profile_twitter_link;
        jobSeekerObj.linkedin_username = jobSeekerJSON.job_seeker_profile_linkedin_link;
        jobSeekerObj.last_updated = jobSeekerJSON.last_updated;
        jobSeekerObj.user_id = jobSeekerJSON.user_id;

        var answers = [];
        for (var i = 0; i < jobSeekerJSON.job_seeker_profile_answers.length; i++) {
            var jsonAnswer = jobSeekerJSON.job_seeker_profile_answers[i];
            var answer = new JobSeekerAPI.JobSeekerProfileAnswer(jsonAnswer.job_seeker_profile_question_id, jsonAnswer.answer);
            answers.push(answer);
        }
        jobSeekerObj.answers = answers;
    } else {
        //TODO: make more robust
        //jobSeekerJSON could not be parsed, probably because profile doesnt exist yet
        //  Show default values.
        jobSeekerObj.id = 0;
        jobSeekerObj.name = "";
        jobSeekerObj.email = "";
        jobSeekerObj.personal_link = "";
        jobSeekerObj.tagline = "";
        jobSeekerObj.twitter_username = "";
        jobSeekerObj.linkedin_username = "";
        jobSeekerObj.answers = [];
        jobSeekerObj.last_updated = "";
    }

    Utilities.debug ? console.log(jobSeekerObj) : null;

    return jobSeekerObj;
};

JobSeekerAPI.refreshJobSeekerProfilePic = function () {
    if (UserAPI.hasSessionUser()) {
        var user_id = UserAPI.getSessionUserAsJSON()["user_id"];
        //profile_pic_elements = [document.getElementById("myProfilePic"), document.getElementById("profileBasicInfoEditProfilePic")];
        profile_pic_elements = [document.getElementById("myProfilePic")];
        ProfilePicAPI.refreshMultipleProfilePicsBackground(user_id, profile_pic_elements);
    }
};

JobSeekerAPI.populateJobSeekerProfile = function (jobSeekerProfile) {

    var profile_name = document.getElementById("updateProfileApplicantProfileFormNameLabelSpan");
    profile_name.innerHTML = jobSeekerProfile.name;

    var profile_id = document.getElementById("profileId");
    profile_id.value = jobSeekerProfile.id;

    var last_updated = document.getElementById("profileLastUpdated");
    last_updated.value = jobSeekerProfile.last_updated;

    var profile_tagline = document.getElementById("updateProfileApplicantProfileFormTaglineLabelSpan");
    profile_tagline.innerHTML = jobSeekerProfile.tagline;

    var twitter_name = document.getElementById("profileTwitterUsername");
    var twitter_link = document.getElementById("profileTwitterLink");
    var twitter_link_wrapper = document.getElementById("profileTwitterLinkWrapper");
    if (jobSeekerProfile.twitter_username == null || jobSeekerProfile.twitter_username == "") {
        twitter_link_wrapper.classList.add("hidden");
        twitter_link.href = "#";
        twitter_name.value = "";
    } else {
        twitter_link_wrapper.classList.remove("hidden");
        twitter_link.href = JobSeekerAPI.twitterUsernameToLink(jobSeekerProfile.twitter_username);
        twitter_name.value = jobSeekerProfile.twitter_username;
    }

    var linkedin_name = document.getElementById("profileLinkedInUsername");
    var linkedin_link = document.getElementById("profileLinkedinLink");
    var linkedin_link_wrapper = document.getElementById("profileLinkedinLinkWrapper");
    if (jobSeekerProfile.linkedin_username == null || jobSeekerProfile.linkedin_username == "") {
        linkedin_link_wrapper.classList.add("hidden");
        linkedin_link.href = "";
        linkedin_name.value = "";
    } else {
        linkedin_link_wrapper.classList.remove("hidden");
        linkedin_link.href = unescape("https://www.linkedin.com/in/" + jobSeekerProfile.linkedin_username);
        linkedin_name.value = jobSeekerProfile.linkedin_username;
    }

    //Populate answer fields
    var job_seeker_profile_answers = jobSeekerProfile.answers;
    for (var i = 0; i < job_seeker_profile_answers.length; i++) {
        if (job_seeker_profile_answers[i] !== undefined) {
            var questionId = job_seeker_profile_answers[i].job_seeker_profile_question_id;
            var selector = ".profile-question__answer[data-question-id=\"" + questionId + "\"]";
            var answerField = document.querySelector(selector);
            if (answerField) {
                answerField.innerHTML = job_seeker_profile_answers[i].answer;
            }
        }
    }
};

JobSeekerAPI.resetProfileEditValues = function () {
    if (UserAPI.hasSessionUser()) {
        var sessionUser = UserAPI.getSessionUserAsJSON();

        var profile_edit_name = document.getElementById("profileEditName");
        profile_edit_name.value = sessionUser.name;
    }
    var profile_edit_tagline = document.getElementById("profileEditTagline");
    profile_edit_tagline.value = document.getElementById("updateProfileApplicantProfileFormTaglineLabelSpan").innerHTML;

    var profile_edit_twitter = document.getElementById("profileEditTwitter");
    profile_edit_twitter.value = document.getElementById("profileTwitterUsername").value;

    var profile_edit_linkedin = document.getElementById("profileEditLinkedin");
    profile_edit_linkedin.value = document.getElementById("profileLinkedInUsername").value;
};

JobSeekerAPI.twitterLinkToUsername = function (twitterLink) {
    if (twitterLink.startsWith("https://twitter.com/")) {
        return '@' + twitterLink.substring(20);
    } else {
        return twitterLink;
    }
};

JobSeekerAPI.twitterUsernameToLink = function (twitterUsername) {
    if (twitterUsername.indexOf('@') == 0) {
        return "https://twitter.com/" + twitterUsername.substring(1);
    } else {
        return twitterUsername;
    }
};

JobSeekerAPI.saveJobSeekerProfileChanges = function () {
    var jobSeekerBasicInfoForm = document.getElementById("profileBasicInfoForm");

    var jobSeekerProfile = new JobSeekerAPI.JobSeeker();
    var user = null;
    if (UserAPI.hasSessionUser()) {
        user = UserAPI.getSessionUserAsJSON();
    } else {
        user = UserAPI.User();
    }

    /*user.firstname = jobSeekerBasicInfoForm.elements.profileEditFirstName.value;
     user.lastname = jobSeekerBasicInfoForm.elements.profileEditLastName.value;*/

    jobSeekerProfile.id = document.getElementById("profileId").value;

    jobSeekerProfile.last_updated = document.getElementById("profileLastUpdated").value;

    jobSeekerProfile.tagline = document.getElementById("profileEditTagline").value;

    jobSeekerProfile.twitter_username = jobSeekerBasicInfoForm.elements.profileEditTwitter.value;

    jobSeekerProfile.linkedin_username = escape(jobSeekerBasicInfoForm.elements.profileEditLinkedin.value);

    //Get answer values
    var answers = [];
    var answerFields = document.querySelectorAll(".profile-question__answer");

    for (var i = 0; i < answerFields.length; i++) {
        var questionId = answerFields[i].getAttribute("data-question-id");
        var answerText = answerFields[i].innerHTML;
        if (questionId) {
            answers.push(new JobSeekerAPI.JobSeekerProfileAnswer(questionId, answerText));
        }
    }
    jobSeekerProfile.answers = answers;

    jobSeekerProfile.personal_link = "";
    jobSeekerProfile.last_updated = "";

    //function(firstName, lastName, tagline, twitter, linkedin) {
    if (FormValidationAPI.validateUpdateProfileBasicInfo(
            //user.firstname, user.lastname,
            jobSeekerProfile.twitter_username, jobSeekerProfile.linkedin_username)) {
        //Also trigger photo upload
        if (JobSeekerAPI.profilePicUploader) {
            JobSeekerAPI.profilePicUploader.uploadPhoto();
        }

        //change twitter username to link
        //jobSeekerProfile.twitter_username = JobSeekerAPI.twitterUsernameToLink(jobSeekerProfile.twitter_username);

        JobSeekerAPI.saveJobSeekerProfile(jobSeekerProfile);

        //Update user if names have been changed

        /*if (UserAPI.hasSessionUser()) {
         var oldUser = UserAPI.getSessionUserAsJSON();
         if (oldUser.firstname != user.firstname ||
         oldUser.lastname != user.lastname) {
         UserAPI.updateUser(user, function () {
         var sessionUser = UserAPI.getSessionUserAsJSON();
         var profile_first_name = document.getElementById("profileFirstName");
         Utilities.replaceElementText(profile_first_name, sessionUser.firstname != null ? sessionUser.firstname : JobSeekerAPI.defaultFirstName);
         
         var profile_last_name = document.getElementById("profileLastName");
         Utilities.replaceElementText(profile_last_name, sessionUser.lastname != null ? sessionUser.lastname : JobSeekerAPI.defaultLastName);
         
         JobSeekerAPI.resetProfileEditValues();
         });
         }
         }*/
    }
};


/**
 *
 * @param {type} contactId
 * @returns {undefined}
 */
JobSeekerAPI.saveJobSeekerProfile = function (jobSeekerProfile) {
    var user = UserAPI.getSessionUserAsJSON();
    Utilities.debug ? console.log("saving job seeker profile") : null;
    var saveJobSeekerProfile_url = DataAPI.baseURL + "/putJobSeekerProfileByUser/" + user.user_id;
    var jsonData = JSON.stringify(jobSeekerProfile);

    var saveJobSeekerProfile_xhr = new XMLHttpRequest();
    if ("withCredentials" in saveJobSeekerProfile_xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        saveJobSeekerProfile_xhr.open("PUT", saveJobSeekerProfile_url);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        saveJobSeekerProfile_xhr = new XDomainRequest();
        saveJobSeekerProfile_xhr.open("PUT", saveJobSeekerProfile_url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        saveJobSeekerProfile_xhr = null;

    }

    saveJobSeekerProfile_xhr.open('PUT', saveJobSeekerProfile_url);
    saveJobSeekerProfile_xhr.setRequestHeader("Content-Type", "application/json");

    saveJobSeekerProfile_xhr.addEventListener("progress", DataAPI.updateToggleProgress, false);
    saveJobSeekerProfile_xhr.addEventListener("load", function () {
        JobSeekerAPI.hideJobSeekerProfileEditOverlays();
        JobSeekerAPI.saveJobSeekerProfileLoaded(saveJobSeekerProfile_xhr.response);
    }
    , false);
    saveJobSeekerProfile_xhr.addEventListener("error", DataAPI.transferFailed, false);
    saveJobSeekerProfile_xhr.addEventListener("abort", DataAPI.transferAborted, false);

    saveJobSeekerProfile_xhr.send(jsonData);
};

JobSeekerAPI.saveJobSeekerProfileProgress = function (evt) {

};

JobSeekerAPI.saveJobSeekerProfileAborted = function (evt) {

};

JobSeekerAPI.saveJobSeekerProfileLoaded = function (response) {
    Utilities.debug ? console.log(response) : null;
    DataAPI.getJobSeekerProfileByUserId(UserAPI.getSessionUserAsJSON().user_id, function (response) {
        var jobSeekerProfile = JobSeekerAPI.populateJobSeekerObject(JSON.parse(response));
        JobSeekerAPI.resetProfileEditValues();
        JobSeekerAPI.populateJobSeekerProfile(jobSeekerProfile);
    });
};

JobSeekerAPI.showMyJobSeekerProfile = function () {
    var stateInfo = {pageInfo: 'my_profile', pageTitle: 'Talent Cloud: My Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#MyProfile');//last parameter just replaced with #MyProfile instead of url

    TalentCloudAPI.hideAllContent();
    //TalentCloudAPI.hideLogo();

    var jobSeekerProfileOverlay = document.getElementById("profileSection");
    jobSeekerProfileOverlay.classList.remove("hidden");

    var profileBasicInfoEdit = document.getElementById("profileBasicInfoEditWrapper");
    profileBasicInfoEdit.classList.remove("hidden");

    LookupAPI.getLookupResponse("job_seeker_profile_question", function (questionLookupMap) {
        JobSeekerAPI.addProfileQuestionSections(questionLookupMap, true);
        
        //Questions must be loaded before profile, with answers, can be populated
        DataAPI.getJobSeekerProfileByUserId(UserAPI.getSessionUserAsJSON().user_id, function (response) {
            var jobSeekerProfile = JobSeekerAPI.populateJobSeekerObject(JSON.parse(response));
            JobSeekerAPI.populateJobSeekerProfile(jobSeekerProfile);
        });
    });

    EventsAPI.hideBodyOverflow(false);
    //AccessibilityAPI.preventModalEscapeBackward("jobSeekerCloseButton");
    //AccessibilityAPI.preventModalEscapeForward("goToAccomplishmentsButton");


    AccessibilityAPI.addEscapeListener("JobSeekerAPI.hideJobSeekerProfileEditOverlays", null);
    JobSeekerAPI.refreshJobSeekerProfilePic();

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var profileHeroTitle = document.getElementById("profileHeroTitle");
    profileHeroTitle.classList.remove("hidden");
    profileHeroTitle.setAttribute("aria-hidden", "false");

    // Google Analytics

    ga('set', 'page', '/my-profile');
    ga('send', 'pageview');
};

JobSeekerAPI.showJobSeekerProfile = function (jobSeekerProfile) {
    var stateInfo = {pageInfo: 'job_seeker_profile', pageTitle: 'Talent Cloud: Job Seeker Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#JobSeekerProfile/' + jobSeekerProfile.id);

    TalentCloudAPI.hideAllContent();
    //TalentCloudAPI.hideLogo();

    var jobSeekerProfileOverlay = document.getElementById("profileSection");
    jobSeekerProfileOverlay.classList.remove("hidden");

    var profileBasicInfoEdit = document.getElementById("profileBasicInfoEditWrapper");
    profileBasicInfoEdit.classList.add("hidden");

    LookupAPI.getLookupResponse("job_seeker_profile_question", function (questionLookupMap) {
        JobSeekerAPI.addProfileQuestionSections(questionLookupMap, false);
        
        //Questions must be loaded before profile, with answers, can be populated
        JobSeekerAPI.populateJobSeekerProfile(jobSeekerProfile);
    });

    EventsAPI.hideBodyOverflow(false);
    //AccessibilityAPI.preventModalEscapeBackward("jobSeekerCloseButton");
    //AccessibilityAPI.preventModalEscapeForward("goToAccomplishmentsButton");

    AccessibilityAPI.addEscapeListener("JobSeekerAPI.hideJobSeekerProfileEditOverlays", null);
    ProfilePicAPI.refreshProfilePicBackground(jobSeekerProfile.user_id, document.getElementById("myProfilePic"));

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var profileHeroTitle = document.getElementById("profileHeroTitle");
    profileHeroTitle.classList.remove("hidden");
    profileHeroTitle.setAttribute("aria-hidden", "false");

    // Google Analytics

    //TODO: ensure GA calls are correct
    ga('set', 'page', '/profile/');
    ga('send', 'pageview');
};

/**
 *
 * @param {type} questionLookupMap - array of objects with .id, .description, .value properties
 * @return {undefined}
 */
JobSeekerAPI.addProfileQuestionSections = function (questionLookupMap, isEditable) {
    //Create and populate Profile Question field elements
    var questionFragment = document.createDocumentFragment();


    for (var i = 0; i < questionLookupMap.length; i++) {
        var question = questionLookupMap[i];

        var questionSection = JobSeekerAPI.createQuestionSectionElement(question, isEditable);

        //Add to the wrapper fragment
        questionFragment.appendChild(questionSection);
    }

    var questionWrapper = document.getElementById("profileQuestionsWrapper");
    //Clear previous values to avoid doubles
    questionWrapper.innerHTML = "";

    //Add questions to wrapper
    questionWrapper.appendChild(questionFragment);
};


JobSeekerAPI.createQuestionSectionElement = function (question, isEditable) {
    var questionSection = document.createElement("div");
    questionSection.classList.add("applicant-profile__question");

    var questionTitleBar = document.createElement("h4");
    questionTitleBar.classList.add("applicant-profile__question-title-wrapper");

    var questionTitle = document.createElement("span");
    questionTitle.innerHTML = question.value;

    var questionAnswer = document.createElement("p");
    questionAnswer.classList.add("profile-question__answer");
    questionAnswer.setAttribute("data-question-id", question.id);

    //Now put it all together, from the inside out
    questionTitleBar.appendChild(questionTitle);

    questionSection.appendChild(questionTitleBar);
    questionSection.appendChild(questionAnswer);

    if (isEditable === true) {
        var questionEditBtn = document.createElement("a");
        questionEditBtn.classList.add("applicant-profile__edit-trigger");
        questionEditBtn.setAttribute("role", "button");
        questionEditBtn.href = "javascript:void(0)";
        questionEditBtn.setAttribute("title", 'Edit "' + question.value + '"');

        questionEditBtn.setAttribute("data-question-id", question.id);
        questionEditBtn.setAttribute("data-question-value", question.value);
        questionEditBtn.setAttribute("data-question-description", question.description);

        questionEditBtn.onclick = function () {
            var id = this.getAttribute("data-question-id");
            var value = this.getAttribute("data-question-value");
            var description = this.getAttribute("data-question-description");
            JobSeekerAPI.showEditProfileAnswerModal(id, value, description);
        };

        var questionEditBtnImage = document.createElement("i");
        questionEditBtnImage.classList.add("fa");
        questionEditBtnImage.classList.add("fa-pencil-square");

        //Append edit button
        questionEditBtn.appendChild(questionEditBtnImage);
        questionTitleBar.appendChild(questionEditBtn);
    }

    return questionSection;
};

JobSeekerAPI.showEditProfileAnswerModal = function (questionId, questionName, questionDescription) {
    if (siteContent) {
        var title = siteContent.editYour + " \"" + questionName + "\"";
    } else {
        var title = "Edit your \"" + questionName + "\"";
    }


    document.getElementById("profileEditAnswerTitle").title = title;
    document.getElementById("profileEditAnswerTitle").innerHTML = title;
    document.getElementById("profileEditAnswerFormDescription").innerHTML = title;
    document.getElementById("profile-edit-answer__question-id").value = questionId;
    document.getElementById("profileEditAnswerLabel").innerHTML = questionName;
    document.getElementById("dialogueModalSupportCopy").innerHTML = questionDescription;

    var answerField = document.querySelector('.profile-question__answer[data-question-id="' + questionId + '"]');
    if (answerField && answerField.innerHTML) {
        //If answer text already exists, prepopulate edit text box
        document.getElementById("profileEditAnswer").value = answerField.innerHTML;
    } else {
        //Else, reset text so placeholder shows
        document.getElementById("profileEditAnswer").value = "";
    }

    //Unhide modal
    var jobSeekerAboutMeEditOverlay = document.getElementById("profileEditAnswerOverlay");
    jobSeekerAboutMeEditOverlay.classList.remove("hidden");

    AccessibilityAPI.preventModalEscape("profileEditAnswer", "profileEditAnswerSave");
    AccessibilityAPI.focusElement("profileEditAnswer");

    EventsAPI.hideBodyOverflow(true);

    modalSize();
};

JobSeekerAPI.saveJobSeekerProfileAnswer = function () {
    var questionId = document.getElementById("profile-edit-answer__question-id").value;
    if (questionId) {
        var answerField = document.querySelector('.profile-question__answer[data-question-id="' + questionId + '"]');
        var answerText = document.getElementById("profileEditAnswer");
        if (answerField && answerText) {
            Utilities.replaceElementText(answerField, answerText.value);
            JobSeekerAPI.saveJobSeekerProfileChanges();
        }
    }
    JobSeekerAPI.hideJobSeekerProfileEditAnswerModal();
}

JobSeekerAPI.hideJobSeekerProfileForm = function () {
    var jobSeekerProfileOverlay = document.getElementById("profileSection");
    jobSeekerProfileOverlay.classList.add("hidden");

    //UserAPI.clearFormFields("jobSeekerForm");
    //EventsAPI.hideBodyOverflow(false);

    //FormsAPI.steppedForm.validateStep('contact_details','jobSeekerFormStepGroup',false,null,null);
};

JobSeekerAPI.showJobSeekerProfileBasicInfoEdit = function () {
    //TODO: push state info to history

    var jobSeekerBasicInfoEditOverlay = document.getElementById("profileBasicInfoEditOverlay");
    jobSeekerBasicInfoEditOverlay.classList.remove("hidden");

    AccessibilityAPI.preventModalEscape("updateProfileChoosePhotoButtonLabel", "profileBasicInfoEditSave");
    AccessibilityAPI.focusElement("updateProfileChoosePhotoButtonLabel");

    EventsAPI.hideBodyOverflow(true);

    var fileInputButtons = [document.getElementById('updateProfileChoosePhotoButton'),
        document.getElementById('updateProfileChooseAltPhotoButton')];
    var fileDrop = document.getElementById('updateProfilePhotoDraggableArea');
    var imagePreview = document.getElementById('updateProfilePhotoCroppieContainer');
    var clearBtn = document.getElementById('updateProfilePhotoCancelButton');
    //var uploadBtn = document.getElementById('profilePicUploadBtn');

    //Don't pass in a save button, because there is no dedicated button for pic uploading.
    //The save button must upload photo, as well as profile info.
    JobSeekerAPI.profilePicUploader = new ProfilePicAPI.Uploader(
            fileInputButtons,
            fileDrop,
            imagePreview,
            clearBtn,
            null,
            UserAPI.getSessionUserAsJSON().user_id,
            JobSeekerAPI.onProfilePicUploaded
            );

    modalSize();

};

JobSeekerAPI.hideJobSeekerProfileBasicInfoEdit = function () {
    //TODO modify state info history ?
    var jobSeekerBasicInfoEditOverlay = document.getElementById("profileBasicInfoEditOverlay");
    jobSeekerBasicInfoEditOverlay.classList.add("hidden");

    JobSeekerAPI.resetProfileEditValues();

    EventsAPI.hideBodyOverflow(false);
};

JobSeekerAPI.hideJobSeekerProfileEditAnswerModal = function () {
    var jobSeekerEditAnswerOverlay = document.getElementById("profileEditAnswerOverlay");
    jobSeekerEditAnswerOverlay.classList.add("hidden");

    JobSeekerAPI.resetProfileEditValues();

    EventsAPI.hideBodyOverflow(false);
};

JobSeekerAPI.hideJobSeekerProfileEditOverlays = function () {
    var jobSeekerBasicInfoEditOverlay = document.getElementById("profileBasicInfoEditOverlay");
    jobSeekerBasicInfoEditOverlay.classList.add("hidden");

    var jobSeekerEditAnswerOverlay = document.getElementById("profileEditAnswerOverlay");
    jobSeekerEditAnswerOverlay.classList.add("hidden");

    JobSeekerAPI.resetProfileEditValues();

    EventsAPI.hideBodyOverflow(false);
}

JobSeekerAPI.showUploadProfilePic = function () {
    //TODO: enable slide transition between divs

    var profileBasicInfoFormWrapper = document.getElementById("profileBasicInfoFormWrapper");
    profileBasicInfoFormWrapper.classList.add("hidden");

    var profilePicUploadWrapper = document.getElementById("profilePicUploadWrapper")
    profilePicUploadWrapper.classList.remove("hidden");

    // AccessibilityAPI.preventModalEscape("profilePicUploadField", "profilePicUploadBtn");
    // AccessibilityAPI.focusElement("profilePicUploadField");

    var fileInputButtons = [document.getElementById('updateProfileChoosePhotoButton'),
        document.getElementById('updateProfileChooseAltPhotoButton')];
    var fileDrop = document.getElementById('updateProfilePhotoDraggableArea');
    var imagePreview = document.getElementById('updateProfilePhotoCroppieContainer');
    var clearBtn = document.getElementById('updateProfilePhotoCancelButton');
    //var uploadBtn = document.getElementById('profilePicUploadBtn');

    JobSeekerAPI.profilePicUploader = new ProfilePicAPI.Uploader(
            fileInputButtons,
            fileDrop,
            imagePreview,
            clearBtn,
            null,
            UserAPI.getSessionUserAsJSON().user_id,
            JobSeekerAPI.onProfilePicUploaded
            );

};

JobSeekerAPI.onProfilePicUploaded = function () {
    JobSeekerAPI.refreshJobSeekerProfilePic();
};
