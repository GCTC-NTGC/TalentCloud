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
        personal_link,
        tagline,
        twitter_username,
        linkedin_username,
        answers,
        last_updated) {
    this.id = id;
    this.personal_link = personal_link;
    this.tagline = tagline;
    this.twitter_username = twitter_username;
    this.linkedin_username = linkedin_username;
    this.answers = answers;
    this.last_updated = last_updated;
};

JobSeekerAPI.localizeJobSeekerProfile = function () {
    if (siteContent) {
        document.getElementById("profileEditAnswerCancel").value = siteContent.cancel;
        document.getElementById("profileEditAnswerSave").value = siteContent.save;
    }
}

JobSeekerAPI.populateJobSeekerObjects = function (data) {
    Utilities.debug ? console.log("populating job seeker Objects") : null;
    Utilities.debug ? console.log(data) : null;
    var jobSeekers = data.jobSeeker;
    //var jobs = data.response.jsonBody.jobSeeker;
    JobSeekerAPI.jobSeekers = [];
    for (var jobSeeker in jobSeekers) {
        Utilities.debug ? console.log(jobSeekers[jobSeeker]) : null;

        var jobSeeker = JobSeekerAPI.populateJobSeekerObject(jobSeekers[jobSeeker]);
        JobSeekerAPI.jobSeekers.push(jobSeeker);
    }

    JobSeekerAPI.populateJobSeekers();
};

JobSeekerAPI.populateJobSeekerObject = function (jobSeekerJSON) {

    Utilities.debug ? console.log("populating job seeker Objects") : null;
    Utilities.debug ? console.log(jobSeekerJSON) : null;

    var jobSeekerObj = new JobSeekerAPI.JobSeeker();
    
    if (jobSeekerJSON) {
        jobSeekerObj.id = jobSeekerJSON.job_seeker_profile_id;
        jobSeekerObj.personal_link = jobSeekerJSON.job_seeker_profile_link;
        jobSeekerObj.tagline = jobSeekerJSON.job_seeker_profile_tagline;
        jobSeekerObj.twitter_username = jobSeekerJSON.job_seeker_profile_twitter_link;
        jobSeekerObj.linkedin_username = jobSeekerJSON.job_seeker_profile_linkedin_link;
        jobSeekerObj.last_updated = jobSeekerJSON.last_updated;

        var answers = [];
        jobSeekerJSON.job_seeker_profile_answers.forEach(value => {
            var answer = new JobSeekerAPI.JobSeekerProfileAnswer(value.job_seeker_profile_question_id, value.answer);
            answers.push(answer);
        });
        jobSeekerObj.answers = answers;
    }    

    Utilities.debug ? console.log(jobSeekerObj) : null;

    return jobSeekerObj;
};

JobSeekerAPI.populateJobSeekers = function () {
    Utilities.debug ? console.log("populating job seekers") : null;
    var jobSeekersDiv = document.getElementById("jobSeekerList");

    //console.log("jobsState="+jobsDiv.innerHTML);
    //jobsDiv.innerHTML = "";
    while (jobSeekersDiv.firstChild) {
        jobSeekersDiv.removeChild(jobSeekersDiv.firstChild);
    }

    for (var j = 0; j < JobSeekerAPI.jobSeekers.length; j++) {
        var jobSeeker = JobSeekerAPI.jobSeekers[j];

        JobSeekerAPI.populateJobSeeker(jobSeeker);
        //console.log(jobSeeker);
    }
    jobSeekersDiv.classList.remove("hidden");

    //hide no contacts div
    if (JobSeekerAPI.jobSeekers.length > 0) {
        var noJobSeekers = document.getElementById("noJobSeekers");
        noJobSeekers.classList.remove("visible");
        noJobSeekers.classList.add("hidden");
    }

    /*var addedCards = contactsDiv.getElementsByClassName('contactCardHighlighted');
     for(var cards = 0; cards < addedCards.length; cards++){
     var addedCard = addedCards[cards];
     addedCard.classList.remove("hidden");
     }*/

    //hide overlay
    /*var loadingJobs = document.getElementById("loadingJobs");
     
     if(loadingJobs.classList.contains("visible")){
     loadingJobs.classList.remove("visible");
     loadingJobs.classList.add("hidden");
     }*/
    EventsAPI.hideBodyOverflow(false);

};

JobSeekerAPI.populateJobSeeker = function (job) {
    Utilities.debug ? console.log("populating job seeker") : null;
    var jobSeekersDiv = document.getElementById("jobSeekerList");

    //Create a job card
    var jobCard = document.createElement("div");
    jobCard.setAttribute("id", "jobId_" + job.id);
    jobCard.setAttribute("class", "jobCard");

    //Main job table
    var jobMainTable = document.createElement("div");
    jobMainTable.setAttribute("class", "jobPoster");

    var jobIDCell = document.createElement("div");
    jobIDCell.setAttribute("class", "jobId hidden");
    jobIDCell.innerHTML = job.id;

    var jobTitle = document.createElement("div");
    jobTitle.setAttribute("class", "jobTitle");
    jobTitle.innerHTML = job.firstname + " " + job.lastname;

    var jobApplicants_to_date = document.createElement("div");
    jobApplicants_to_date.setAttribute("class", "jobApplicants_to_date");
    jobApplicants_to_date.innerHTML = job.applicants_to_date + " applicants so far";

    var jobClose_date_time = document.createElement("div");
    jobClose_date_time.setAttribute("class", "jobClose_date_time");
    jobClose_date_time.innerHTML = Utilities.timeRemaining(job.close_date_time) + " until close";

    var jobDepartment = document.createElement("div");
    jobDepartment.setAttribute("class", "jobDepartment");
    jobDepartment.innerHTML = job.department;

    var jobLocation = document.createElement("div");
    jobLocation.setAttribute("class", "jobLocation");
    jobLocation.innerHTML = job.location_city + " (" + job.location_province + ")";

    var jobTerm_qty = document.createElement("div");
    jobTerm_qty.setAttribute("class", "jobTerm_qty");
    jobTerm_qty.innerHTML = job.term_qty + " " + job.term_units + " term";

    var hiringManagerWrapper = document.createElement("div");
    hiringManagerWrapper.setAttribute("class", "hiringManagerWrapper");

    var hiringManagerProfilePicImg = new Image();
    hiringManagerProfilePicImg.src = "/images/user.svg";

    var hiringManagerProfilePic = document.createElement("img");
    hiringManagerProfilePic.setAttribute("class", "hiringManagerProfilePicSmall");
    hiringManagerProfilePic.src = hiringManagerProfilePicImg.src;

    hiringManagerWrapper.appendChild(hiringManagerProfilePic);

    hiringManagerLabel = document.createElement("span");
    hiringManagerLabel.setAttribute("class", "hiringManagerLabel");
    hiringManagerLabel.innerHTML = "Hiring Manager";

    hiringManagerWrapper.appendChild(hiringManagerLabel);

    var viewJobButton = document.createElement("button");
    viewJobButton.setAttribute("class", "btn btn-primary");
    viewJobButton.innerHTML = "View";

    //out from nov 9 - Ben
    //also hid other divs because they dont make sense nov 13
    jobMainTable.appendChild(jobIDCell);
    jobMainTable.appendChild(jobTitle);
    //jobMainTable.appendChild(jobApplicants_to_date);
    //jobMainTable.appendChild(jobClose_date_time);
    //jobMainTable.appendChild(jobDepartment);
    //jobMainTable.appendChild(jobLocation);
    jobMainTable.appendChild(jobTerm_qty);


    //jobMainTable.appendChild(hiringManagerWrapper);

    jobMainTable.appendChild(viewJobButton);

    //Append job to the jobcard
    jobCard.appendChild(jobMainTable);
    //jobCard.appendChild(JobSeekerAPI.addFavouriteLink(job.id));
    //Append card to the jobs div
    jobSeekersDiv.appendChild(jobCard);

};

JobSeekerAPI.getJobSeekerCount = function () {
    if (JobSeekerAPI.jobSeekers) {
        return JobSeekerAPI.jobSeekers.length;
    }
    return 0;
};

JobSeekerAPI.addFavouriteLink = function (jobPosterId) {
    var jobPoster = document.getElementById(jobPosterId);

    //create hidden div for favourite action
    var jobPosterFavouriteImgWrapper = document.createElement("div");
    jobPosterFavouriteImgWrapper.setAttribute("class", "favouriteImageWrapper");
    jobPosterFavouriteImgWrapper.setAttribute("id", "fav_" + jobPosterId);

    var jobPosterFavouriteImgSrc = new Image();
    jobPosterFavouriteImgSrc.src = "/images/watch_list_off.svg";

    var jobPosterFavouriteImg = document.createElement("img");
    jobPosterFavouriteImg.setAttribute("class", "jobPosterFavouriteImg");
    jobPosterFavouriteImg.src = jobPosterFavouriteImgSrc.src;

    var jobPosterFavouriteLink = document.createElement("a");
    jobPosterFavouriteLink.setAttribute("class", "jobPosterFavouriteLink");
    jobPosterFavouriteLink.setAttribute("title", "Add to watched job posts");
    jobPosterFavouriteLink.setAttribute("href", "javascript:void(0)");
    jobPosterFavouriteLink.setAttribute("onclick", "JobSeekerAPI.toggleFavourite('" + jobPosterId + "')");

    jobPosterFavouriteLink.innerHTML = jobPosterFavouriteImg.outerHTML;
    jobPosterFavouriteImgWrapper.innerHTML = jobPosterFavouriteLink.outerHTML;

    return jobPosterFavouriteImgWrapper;
};

/**
 *
 * @param {type} responseText
 * @returns {undefined}
 */
JobSeekerAPI.toggleFavourite = function (jobPosterId) {
    Utilities.debug ? console.log(jobPosterId) : null;

    if (jobPosterId !== "") {
        DataAPI.toggleFavourite(jobPosterId);
    }
};

JobSeekerAPI.updateFavourite = function (isFav, jobPosterId) {

    var contactToUpdate = document.getElementById(jobPosterId);

    var favImg = contactToUpdate.getElementsByClassName('favouriteImage')[0];

    var notFavouriteImage = new Image();
    notFavouriteImage.src = "images/not-favourite.svg";

    var favouriteImage = new Image();
    favouriteImage.src = "images/favourite.svg";

    if (isFav) {
        favImg.src = favouriteImage.src;
    } else {
        favImg.src = notFavouriteImage.src;
    }

    Utilities.debug ? console.log(favImg.src) : null;
};

JobSeekerAPI.refreshJobSeekerProfilePic = function () {
    if (UserAPI.hasSessionUser()) {
        var user_id = UserAPI.getSessionUserAsJSON()["user_id"];
        //profile_pic_elements = [document.getElementById("myProfilePic"), document.getElementById("profileBasicInfoEditProfilePic")];
        profile_pic_elements = [document.getElementById("myProfilePic")];
        ProfilePicAPI.refreshMultipleProfilePics(user_id, profile_pic_elements);
    }
};

JobSeekerAPI.populateJobSeekerProfile = function (response) {
    var jobSeekerJSON = JSON.parse(response);
    var jobSeekerProfile = new JobSeekerAPI.JobSeeker();

    if (jobSeekerJSON) {
        jobSeekerProfile = JobSeekerAPI.populateJobSeekerObject(jobSeekerJSON);
    } else {
        //TODO: make more robust
        //jobSeekerJSON could not be parsed, probably because profile doesnt exist yet
        //  Show default values.
        jobSeekerProfile.id = 0;
        jobSeekerProfile.personal_link = "";
        jobSeekerProfile.tagline = "";
        jobSeekerProfile.twitter_username = "";
        jobSeekerProfile.linkedin_username = "";
        jobSeekerProfile.answers = [];
        jobSeekerProfile.last_updated = "";
    }

    var profile_id = document.getElementById("profileId");
    profile_id.value = jobSeekerProfile.id;

    var last_updated = document.getElementById("profileLastUpdated");
    last_updated.value = jobSeekerProfile.last_updated;

    var profile_tagline = document.getElementById("profileTagLine");
    Utilities.replaceElementText(profile_tagline, jobSeekerProfile.tagline);

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
    jobSeekerProfile.answers.forEach(answer => {
        var questionId = answer.job_seeker_profile_question_id;
        var selector = ".profile-question__answer[data-question-id=\"" + questionId + "\"]";
        var answerField = document.querySelector(selector);
        if (answerField) {
            answerField.innerHTML = answer.answer;
        }
    });

    //Populate user name
    if (UserAPI.hasSessionUser()) {
        var sessionUser = UserAPI.getSessionUserAsJSON();

        var profile_first_name = document.getElementById("profileFirstName");
        Utilities.replaceElementText(profile_first_name, sessionUser.firstname != null ? sessionUser.firstname : JobSeekerAPI.defaultFirstName);

        var profile_last_name = document.getElementById("profileLastName");
        Utilities.replaceElementText(profile_last_name, sessionUser.lastname != null ? sessionUser.lastname : JobSeekerAPI.defaultLastName);
    }

    JobSeekerAPI.resetProfileEditValues();
};

JobSeekerAPI.resetProfileEditValues = function () {
    if (UserAPI.hasSessionUser()) {
        var sessionUser = UserAPI.getSessionUserAsJSON();

        var profile_edit_first_name = document.getElementById("profileEditFirstName");
        profile_edit_first_name.value = sessionUser.firstname != null ? sessionUser.firstname : JobSeekerAPI.defaultFirstName;

        var profile_edit_last_name = document.getElementById("profileEditLastName");
        profile_edit_last_name.value = sessionUser.lastname != null ? sessionUser.lastname : JobSeekerAPI.defaultLastName;
    }
    var profile_edit_tagline = document.getElementById("profileEditTagline");
    profile_edit_tagline.value = document.getElementById("profileTagLine").innerHTML;

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
    if (twitterUsername.startsWith('@')) {
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

    user.firstname = jobSeekerBasicInfoForm.elements.profileEditFirstName.value;
    user.lastname = jobSeekerBasicInfoForm.elements.profileEditLastName.value;

    jobSeekerProfile.id = document.getElementById("profileId").value;

    jobSeekerProfile.last_updated = document.getElementById("profileLastUpdated").value;

    jobSeekerProfile.tagline = jobSeekerBasicInfoForm.elements.profileEditTagline.value;

    jobSeekerProfile.twitter_username = jobSeekerBasicInfoForm.elements.profileEditTwitter.value;

    jobSeekerProfile.linkedin_username = escape(jobSeekerBasicInfoForm.elements.profileEditLinkedin.value);

    //Get answer values
    var answers = [];
    var answerFields = document.querySelectorAll(".profile-question__answer");
    answerFields.forEach(field => {
        var questionId = field.getAttribute("data-question-id");
        var answerText = field.innerHTML;
        if (questionId) {
            answers.push(new JobSeekerAPI.JobSeekerProfileAnswer(questionId, answerText));
        }
    });
    jobSeekerProfile.answers = answers;

    jobSeekerProfile.personal_link = "";
    jobSeekerProfile.last_updated = "";

    //function(firstName, lastName, tagline, twitter, linkedin) {
    if (FormValidationAPI.validateUpdateProfileBasicInfo(
            user.firstname, user.lastname,
            jobSeekerProfile.twitter_username, jobSeekerProfile.linkedin_username)) {
        //Also trigger photo upload
        if (JobSeekerAPI.profilePicUploader) {
            JobSeekerAPI.profilePicUploader.uploadPhoto();
        }

        //change twitter username to link
        //jobSeekerProfile.twitter_username = JobSeekerAPI.twitterUsernameToLink(jobSeekerProfile.twitter_username);

        JobSeekerAPI.saveJobSeekerProfile(jobSeekerProfile);

        //Update user if names have been changed

        if (UserAPI.hasSessionUser()) {
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
        }
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
    DataAPI.getJobSeekerProfileByUserId(UserAPI.getSessionUserAsJSON().user_id, JobSeekerAPI.populateJobSeekerProfile);
};

JobSeekerAPI.showJobSeekerProfile = function () {
    var stateInfo = {pageInfo: 'job_seeker_profile', pageTitle: 'Talent Cloud: Job Seeker Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#MyProfile');//last parameter just replaced with #MyProfile instead of url

    TalentCloudAPI.hideAllContent();
    //TalentCloudAPI.hideLogo();

    var jobSeekerProfileOverlay = document.getElementById("profileSection");
    jobSeekerProfileOverlay.classList.remove("hidden");

    var profileBasicInfoEdit = document.getElementById("profileBasicInfoEdit");
    //profileBasicInfoEdit.focus();

    LookupAPI.getLookupResponse("job_seeker_profile_question", JobSeekerAPI.addProfileQuestionSections);

    EventsAPI.hideBodyOverflow(false);
    //AccessibilityAPI.preventModalEscapeBackward("jobSeekerCloseButton");
    //AccessibilityAPI.preventModalEscapeForward("goToAccomplishmentsButton");

    DataAPI.getJobSeekerProfileByUserId(UserAPI.getSessionUserAsJSON().user_id, JobSeekerAPI.populateJobSeekerProfile);
    JobSeekerAPI.refreshJobSeekerProfilePic();

};

/**
 * 
 * @param {type} questionLookupMap - array of objects with .id, .description, .value properties
 * @return {undefined}
 */
JobSeekerAPI.addProfileQuestionSections = function (questionLookupMap) {
    //Create and populate Profile Question field elements        
    var questionFragment = document.createDocumentFragment();
    questionLookupMap.forEach(question => {

        var questionSection = document.createElement("div");
        questionSection.classList.add("profile-question");

        var questionTitleBar = document.createElement("h2");
        questionTitleBar.classList.add("profile-question__title-bar");

        var questionTitle = document.createElement("h2");
        questionTitle.innerHTML = question.value;

        var questionEditBtn = document.createElement("a");
        questionEditBtn.classList.add("profile-question__edit-btn");
        questionEditBtn.setAttribute("role", "button");
        questionEditBtn.href = "javascript:void(0)";
        questionEditBtn.onclick = function () {
            JobSeekerAPI.showEditProfileAnswerModal(question.id, question.value, question.description);
        };

        var questionEditBtnImage = document.createElement("img");
        questionEditBtnImage.src = "/images/btn_edit_dark.png";
        questionEditBtnImage.alt = "Edit " + question.value;

        var questionAnswer = document.createElement("p");
        questionAnswer.classList.add("profile-question__answer");
        questionAnswer.setAttribute("data-question-id", question.id);

        //Now put it all together, from the inside out
        questionEditBtn.appendChild(questionEditBtnImage);

        questionTitleBar.appendChild(questionTitle);
        questionTitleBar.appendChild(questionEditBtn);

        questionSection.appendChild(questionTitleBar);
        questionSection.appendChild(questionAnswer);

        //Add to the wrapper fragment
        questionFragment.appendChild(questionSection);
    });

    var questionWrapper = document.getElementById("profileQuestionsWrapper");
    //Clear previous values to avoid doubles
    questionWrapper.innerHTML = "";

    //Add questions to wrapper
    questionWrapper.appendChild(questionFragment);
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
    document.getElementById("profileEditAnswer").setAttribute("placeholder", questionDescription);

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
