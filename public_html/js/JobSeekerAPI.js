/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var JobSeekerAPI = {};
JobSeekerAPI.jobSeekers = [];
JobSeekerAPI.jobSeekerProfile = null;
JobSeekerAPI.profilePicUploader = null;
JobSeekerAPI.defaultFirstName = "Jane";
JobSeekerAPI.defaultLastName = "Doe";

JobSeekerAPI.JobSeeker = function(
        id,
        personal_link,
        accomplishment,
        best_experience,
        worst_experience,
        superpower,
        tagline,
        twitter_link,
        linkedin_link,
        about_me,
        last_updated){
    this.id = id;
    this.personal_link = personal_link;
    this.accomplishment = accomplishment;
    this.best_experience = best_experience;
    this.worst_experience = worst_experience;
    this.superpower = superpower;
    this.tagline = tagline;
    this.twitter_link = twitter_link;
    this.linkedin_link = linkedin_link;
    this.about_me = about_me;
    this.last_updated = last_updated;
};

JobSeekerAPI.populateJobSeekerObjects = function(data){
    Utilities.debug?console.log("populating job seeker Objects"):null;
    Utilities.debug?console.log(data):null;
    var jobSeekers = data.jobSeeker;
    //var jobs = data.response.jsonBody.jobSeeker;
    JobSeekerAPI.jobSeekers = [];
    for(var jobSeeker in jobSeekers){
        Utilities.debug?console.log(jobSeekers[jobSeeker]):null;

        var jobSeeker = JobSeekerAPI.populateJobSeekerObject(jobSeekers[jobSeeker]);
        JobSeekerAPI.jobSeekers.push(jobSeeker);
    }

    JobSeekerAPI.populateJobSeekers();
};

JobSeekerAPI.populateJobSeekerObject = function(jobSeekerJSON){

    Utilities.debug?console.log("populating job seeker Objects"):null;
    Utilities.debug?console.log(jobSeekerJSON):null;

    var jobSeekerObj = new JobSeekerAPI.JobSeeker();

    jobSeekerObj.id = jobSeekerJSON.job_seeker_profile_id;
    jobSeekerObj.personal_link = jobSeekerJSON.job_seeker_profile_link;
    jobSeekerObj.accomplishment = jobSeekerJSON.job_seeker_profile_accomp;
    jobSeekerObj.best_experience = jobSeekerJSON.job_seeker_profile_best_exp;
    jobSeekerObj.worst_experience = jobSeekerJSON.job_seeker_profile_worst_exp;
    jobSeekerObj.superpower = jobSeekerJSON.job_seeker_profile_superpower;
    jobSeekerObj.tagline = jobSeekerJSON.job_seeker_profile_tagline;
    jobSeekerObj.twitter_link = jobSeekerJSON.job_seeker_profile_twitter_link;
    jobSeekerObj.linkedin_link = jobSeekerJSON.job_seeker_profile_linkedin_link;
    jobSeekerObj.about_me = jobSeekerJSON.job_seeker_profile_about_me;
    jobSeekerObj.last_updated = jobSeekerJSON.last_updated;

    Utilities.debug?console.log(jobSeekerObj):null;

    return jobSeekerObj;
};

JobSeekerAPI.populateJobSeekers = function(){
    Utilities.debug?console.log("populating job seekers"):null;
    var jobSeekersDiv = document.getElementById("jobSeekerList");

    //console.log("jobsState="+jobsDiv.innerHTML);
    //jobsDiv.innerHTML = "";
    while (jobSeekersDiv.firstChild) {
        jobSeekersDiv.removeChild(jobSeekersDiv.firstChild);
    }

    for(var j = 0; j < JobSeekerAPI.jobSeekers.length; j++){
        var jobSeeker = JobSeekerAPI.jobSeekers[j];

        JobSeekerAPI.populateJobSeeker(jobSeeker);
        //console.log(jobSeeker);
    }
    jobSeekersDiv.classList.remove("hidden");

    //hide no contacts div
    if(JobSeekerAPI.jobSeekers.length > 0){
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

JobSeekerAPI.populateJobSeeker = function(job){
    Utilities.debug?console.log("populating job seeker"):null;
    var jobSeekersDiv = document.getElementById("jobSeekerList");

    //Create a job card
    var jobCard = document.createElement("div");
    jobCard.setAttribute("id", "jobId_"+job.id);
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
    jobTerm_qty.innerHTML = job.term_qty + " " + job.term_units + " term" ;

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
    viewJobButton.setAttribute("class","btn btn-primary");
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

JobSeekerAPI.getJobSeekerCount = function(){
    if(JobSeekerAPI.jobSeekers){
        return JobSeekerAPI.jobSeekers.length;
    }
    return 0;
};

JobSeekerAPI.addFavouriteLink = function(jobPosterId){
    var jobPoster = document.getElementById(jobPosterId);

    //create hidden div for favourite action
    var jobPosterFavouriteImgWrapper = document.createElement("div");
    jobPosterFavouriteImgWrapper.setAttribute("class","favouriteImageWrapper");
    jobPosterFavouriteImgWrapper.setAttribute("id","fav_"+jobPosterId);

    var jobPosterFavouriteImgSrc = new Image();
    jobPosterFavouriteImgSrc.src = "/images/watch_list_off.svg";

    var jobPosterFavouriteImg = document.createElement("img");
    jobPosterFavouriteImg.setAttribute("class", "jobPosterFavouriteImg");
    jobPosterFavouriteImg.src = jobPosterFavouriteImgSrc.src;

    var jobPosterFavouriteLink = document.createElement("a");
    jobPosterFavouriteLink.setAttribute("class", "jobPosterFavouriteLink");
    jobPosterFavouriteLink.setAttribute("title", "Add to watched job posts");
    jobPosterFavouriteLink.setAttribute("href","javascript:void(0)");
    jobPosterFavouriteLink.setAttribute("onclick","JobSeekerAPI.toggleFavourite('"+jobPosterId+"')");

    jobPosterFavouriteLink.innerHTML = jobPosterFavouriteImg.outerHTML;
    jobPosterFavouriteImgWrapper.innerHTML = jobPosterFavouriteLink.outerHTML;

    return jobPosterFavouriteImgWrapper;
};

/**
 *
 * @param {type} responseText
 * @returns {undefined}
 */
JobSeekerAPI.toggleFavourite = function(jobPosterId){
    Utilities.debug?console.log(jobPosterId):null;

    if(jobPosterId !== ""){
        DataAPI.toggleFavourite(jobPosterId);
    }
};

JobSeekerAPI.updateFavourite = function(isFav,jobPosterId){

    var contactToUpdate = document.getElementById(jobPosterId);

    var favImg = contactToUpdate.getElementsByClassName('favouriteImage')[0];

    var notFavouriteImage = new Image();
    notFavouriteImage.src = "images/not-favourite.svg";

    var favouriteImage = new Image();
    favouriteImage.src = "images/favourite.svg";

    if(isFav){
        favImg.src = favouriteImage.src;
    }else{
        favImg.src = notFavouriteImage.src;
    }

    Utilities.debug?console.log(favImg.src):null;
};

JobSeekerAPI.refreshJobSeekerProfilePic = function() {
    if (UserAPI.hasSessionUser()) {
        var user_id = UserAPI.getSessionUserAsJSON()["user_id"];
        //profile_pic_elements = [document.getElementById("myProfilePic"), document.getElementById("profileBasicInfoEditProfilePic")];
        profile_pic_elements = [document.getElementById("myProfilePic")];
        ProfilePicAPI.refreshMultipleProfilePics(user_id, profile_pic_elements);
    }
};

JobSeekerAPI.populateJobSeekerProfile = function(response){
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
        jobSeekerProfile.accomplishment = "";
        jobSeekerProfile.best_experience = "";
        jobSeekerProfile.worst_experience = "";
        jobSeekerProfile.superpower = "";
        jobSeekerProfile.tagline = "";
        jobSeekerProfile.twitter_link = "";
        jobSeekerProfile.linkedin_link = "";
        jobSeekerProfile.about_me = "";
        jobSeekerProfile.last_updated = "";
    }

    //Set profile state
    JobSeekerAPI.jobSeekerProfile = jobSeekerProfile;

    JobSeekerAPI.resetVisibleProfile();
    JobSeekerAPI.resetProfileEditValues();
};

JobSeekerAPI.resetVisibleProfile = function() {
    if (UserAPI.hasSessionUser()) {
        var sessionUser = UserAPI.getSessionUserAsJSON();

        var profile_first_name = document.getElementById("profileFirstName");
        Utilities.replaceElementText(profile_first_name, sessionUser.firstname!=null?sessionUser.firstname:JobSeekerAPI.defaultFirstName);

        var profile_last_name = document.getElementById("profileLastName");
        Utilities.replaceElementText(profile_last_name, sessionUser.lastname!=null?sessionUser.lastname:JobSeekerAPI.defaultLastName);
    }

    if (JobSeekerAPI.jobSeekerProfile) {
        var profile_id = document.getElementById("profileId");
        profile_id.value = JobSeekerAPI.jobSeekerProfile.id;

        var last_updated = document.getElementById("profileLastUpdated");
        last_updated.value = JobSeekerAPI.jobSeekerProfile.last_updated;

        var profile_tagline = document.getElementById("profileTagLine");
        Utilities.replaceElementText(profile_tagline, JobSeekerAPI.jobSeekerProfile.tagline);

        var twitter_link = document.getElementById("profileTwitterLink");
        var twitter_link_wrapper = document.getElementById("profileTwitterLinkWrapper");
        if (JobSeekerAPI.jobSeekerProfile.twitter_link == null || JobSeekerAPI.jobSeekerProfile.twitter_link == "") {
            twitter_link_wrapper.classList.add("hidden");
            twitter_link.href = "#";
        } else {
            twitter_link_wrapper.classList.remove("hidden");
            twitter_link.href = JobSeekerAPI.jobSeekerProfile.twitter_link;
        }

        var linkedin_link = document.getElementById("profileLinkedinLink");
        var linkedin_link_wrapper = document.getElementById("profileLinkedinLinkWrapper");
        if (JobSeekerAPI.jobSeekerProfile.linkedin_link == null || JobSeekerAPI.jobSeekerProfile.linkedin_link == "") {
            linkedin_link_wrapper.classList.add("hidden");
            linkedin_link.href = "#";
        } else {
            linkedin_link_wrapper.classList.remove("hidden");
            linkedin_link.href = unescape("https://www.linkedin.com/in/"+JobSeekerAPI.jobSeekerProfile.linkedin_link);
        }

        var about_me = document.getElementById("profileAboutMe");
        Utilities.replaceElementText(about_me, JobSeekerAPI.jobSeekerProfile.about_me);

        /*
        console.log(jobSeekerJSON.job_seeker_profile_link);
        if(jobSeekerJSON.job_seeker_profile_link !== undefined){
            var profile_link = document.getElementById("profile_link");
            profile_link.value = unescape(jobSeekerProfile.profile_link);
        }

        var profile_accomplishment = document.getElementById("profile_accomplishment");
        profile_accomplishment.value = jobSeekerProfile.profile_accomp;

        var profile_best_experience = document.getElementById("profile_best_experience");
        profile_best_experience.value = jobSeekerProfile.profile_best_exp;

        var profile_worst_experience = document.getElementById("profile_worst_experience");
        profile_worst_experience.value = jobSeekerProfile.profile_worst_exp;

        var profile_superpower = document.getElementById("profile_superpower");
        profile_superpower.value = jobSeekerProfile.profile_superpower;
        */
    }
}

JobSeekerAPI.resetProfileEditValues = function() {
    if (UserAPI.hasSessionUser()) {
        var sessionUser = UserAPI.getSessionUserAsJSON();

        var profile_edit_first_name = document.getElementById("profileEditFirstName");
        profile_edit_first_name.value = sessionUser.firstname!=null?sessionUser.firstname:JobSeekerAPI.defaultFirstName;

        var profile_edit_last_name = document.getElementById("profileEditLastName");
        profile_edit_last_name.value = sessionUser.lastname!=null?sessionUser.lastname:JobSeekerAPI.defaultLastName;
    }

    if (JobSeekerAPI.jobSeekerProfile) {
        var profile_edit_tagline = document.getElementById("profileEditTagline");
        profile_edit_tagline.value = JobSeekerAPI.jobSeekerProfile.tagline;

        var profile_edit_twitter = document.getElementById("profileEditTwitter");
        profile_edit_twitter.value = JobSeekerAPI.twitterLinkToUsername(JobSeekerAPI.jobSeekerProfile.twitter_link);

        var profile_edit_linkedin = document.getElementById("profileEditLinkedin");
        profile_edit_linkedin.value = unescape(JobSeekerAPI.jobSeekerProfile.linkedin_link);

        var profile_edit_about_me = document.getElementById("profileEditAboutMe");
        profile_edit_about_me.value = JobSeekerAPI.jobSeekerProfile.about_me;
    }
};

JobSeekerAPI.twitterLinkToUsername = function(twitterLink) {
    if (twitterLink.startsWith("https://twitter.com/")) {
        return '@' + twitterLink.substring(20);
    } else {
        return twitterLink;
    }
};

JobSeekerAPI.twitterUsernameToLink = function(twitterUsername) {
    if (twitterUsername.startsWith('@')) {
        return "https://twitter.com/" + twitterUsername.substring(1);
    } else {
        return twitterUsername;
    }
};

JobSeekerAPI.saveJobSeekerProfileChanges = function(){
    var jobSeekerBasicInfoForm = document.getElementById("profileBasicInfoForm");
    var jobSeekerAboutMeForm = document.getElementById("profileAboutMeForm");
    var jobSeekerProfile = new JobSeekerAPI.JobSeeker();
    var user = null;
    if(UserAPI.hasSessionUser()){
        user = UserAPI.getSessionUserAsJSON();
    } else {
        user = UserAPI.User();
    }

    user.firstname = jobSeekerBasicInfoForm.elements.profileEditFirstName.value;
    user.lastname = jobSeekerBasicInfoForm.elements.profileEditLastName.value;

    jobSeekerProfile.id = document.getElementById("profileId").value;

    jobSeekerProfile.last_updated = document.getElementById("profileLastUpdated").value;

    jobSeekerProfile.tagline = jobSeekerBasicInfoForm.elements.profileEditTagline.value;

    jobSeekerProfile.twitter_link = jobSeekerBasicInfoForm.elements.profileEditTwitter.value;

    jobSeekerProfile.linkedin_link = escape(jobSeekerBasicInfoForm.elements.profileEditLinkedin.value);

    jobSeekerProfile.about_me = jobSeekerAboutMeForm.elements.profileEditAboutMe.value;

    jobSeekerProfile.personal_link = "";
    jobSeekerProfile.accomplishment = "";
    jobSeekerProfile.best_experience = "";
    jobSeekerProfile.worst_experience = "";
    jobSeekerProfile.superpower = "";
    jobSeekerProfile.last_updated = "";

    /*
    if(jobSeekerBasicInfoForm.profile_link !== null || jobSeekerBasicInfoForm.profile_link !== ""){
        jobSeekerProfile.profile_link = escape(jobSeekerBasicInfoForm.profile_link.value);
    }

    if(jobSeekerBasicInfoForm.profile_accomp !== ""){
        jobSeekerProfile.profile_accomp = jobSeekerBasicInfoForm.profile_accomplishment.value;
    }

    if(jobSeekerBasicInfoForm.profile_best_exp !== ""){
        jobSeekerProfile.profile_best_exp = jobSeekerBasicInfoForm.profile_best_experience.value;
    }

    if(jobSeekerBasicInfoForm.profile_worst_exp !== ""){
        jobSeekerProfile.profile_worst_exp = jobSeekerBasicInfoForm.profile_worst_experience.value;
    }

    if(jobSeekerBasicInfoForm.profile_superpower !== ""){
        jobSeekerProfile.profile_superpower = jobSeekerBasicInfoForm.profile_superpower.value;
    }
    */
    //function(firstName, lastName, tagline, twitter, linkedin) {
    if (FormValidationAPI.validateUpdateProfileBasicInfo(
            user.firstname, user.lastname,
            jobSeekerProfile.twitter_link, jobSeekerProfile.linkedin_link)) {
        //Also trigger photo upload
        if (JobSeekerAPI.profilePicUploader) {
            JobSeekerAPI.profilePicUploader.uploadPhoto();
        }

        //change twitter username to link
        jobSeekerProfile.twitter_link = JobSeekerAPI.twitterUsernameToLink(jobSeekerProfile.twitter_link);

        JobSeekerAPI.saveJobSeekerProfile(jobSeekerProfile);

        //Update user if names have been changed

        if (UserAPI.hasSessionUser()) {
            var oldUser = UserAPI.getSessionUserAsJSON();
            if (oldUser.firstname != user.firstname ||
                oldUser.lastname != user.lastname) {
                UserAPI.updateUser(user, function() {
                    JobSeekerAPI.resetVisibleProfile();
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
JobSeekerAPI.saveJobSeekerProfile = function(jobSeekerProfile){
    var user = UserAPI.getSessionUserAsJSON();
    Utilities.debug?console.log("saving job seeker profile"):null;
    var saveJobSeekerProfile_url = DataAPI.baseURL+"/putJobSeekerProfile/"+user.user_id;
    var jsonData=JSON.stringify(jobSeekerProfile);

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

    saveJobSeekerProfile_xhr.open('PUT',saveJobSeekerProfile_url);
    saveJobSeekerProfile_xhr.setRequestHeader("Content-Type","application/json");

    saveJobSeekerProfile_xhr.addEventListener("progress",DataAPI.updateToggleProgress,false);
    saveJobSeekerProfile_xhr.addEventListener("load",function(){
        JobSeekerAPI.hideJobSeekerProfileEditOverlays();
        JobSeekerAPI.saveJobSeekerProfileLoaded(saveJobSeekerProfile_xhr.response);
    }
    ,false);
    saveJobSeekerProfile_xhr.addEventListener("error",DataAPI.transferFailed,false);
    saveJobSeekerProfile_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    saveJobSeekerProfile_xhr.send(jsonData);
};

JobSeekerAPI.saveJobSeekerProfileProgress = function(evt){

};

JobSeekerAPI.saveJobSeekerProfileAborted = function(evt){

};

JobSeekerAPI.saveJobSeekerProfileLoaded = function(response){
    Utilities.debug?console.log(response):null;
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

    EventsAPI.hideBodyOverflow(false);
    //AccessibilityAPI.preventModalEscapeBackward("jobSeekerCloseButton");
    //AccessibilityAPI.preventModalEscapeForward("goToAccomplishmentsButton");

};

JobSeekerAPI.hideJobSeekerProfileForm = function () {
    var jobSeekerProfileOverlay = document.getElementById("profileSection");
    jobSeekerProfileOverlay.classList.add("hidden");

    //UserAPI.clearFormFields("jobSeekerForm");
    //EventsAPI.hideBodyOverflow(false);

    //FormsAPI.steppedForm.validateStep('contact_details','jobSeekerFormStepGroup',false,null,null);
};

JobSeekerAPI.showJobSeekerProfileBasicInfoEdit = function() {
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

JobSeekerAPI.hideJobSeekerProfileBasicInfoEdit = function() {
    //TODO modify state info history ?
    var jobSeekerBasicInfoEditOverlay = document.getElementById("profileBasicInfoEditOverlay");
    jobSeekerBasicInfoEditOverlay.classList.add("hidden");

    JobSeekerAPI.resetProfileEditValues();

    EventsAPI.hideBodyOverflow(false);
};

JobSeekerAPI.showJobSeekerProfileAboutMeEdit = function() {
    //TODO: push state info to history

    var jobSeekerAboutMeEditOverlay = document.getElementById("profileAboutMeEditOverlay");
    jobSeekerAboutMeEditOverlay.classList.remove("hidden");

    AccessibilityAPI.preventModalEscape("profileEditAboutMe", "profileAboutMeEditSave");
    AccessibilityAPI.focusElement("profileEditAboutMe");

    EventsAPI.hideBodyOverflow(true);

    modalSize();
    
}

JobSeekerAPI.hideJobSeekerProfileAboutMeEdit = function() {
    //TODO modify state info history ?
    var jobSeekerAboutMeEditOverlay = document.getElementById("profileAboutMeEditOverlay");
    jobSeekerAboutMeEditOverlay.classList.add("hidden");

    JobSeekerAPI.resetProfileEditValues();

    EventsAPI.hideBodyOverflow(false);
};

JobSeekerAPI.hideJobSeekerProfileEditOverlays = function() {
    var jobSeekerBasicInfoEditOverlay = document.getElementById("profileBasicInfoEditOverlay");
    jobSeekerBasicInfoEditOverlay.classList.add("hidden");

    var jobSeekerAboutMeEditOverlay = document.getElementById("profileAboutMeEditOverlay");
    jobSeekerAboutMeEditOverlay.classList.add("hidden");

    JobSeekerAPI.resetProfileEditValues();

    EventsAPI.hideBodyOverflow(false);
}

JobSeekerAPI.showUploadProfilePic = function() {
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

JobSeekerAPI.onProfilePicUploaded = function() {
    JobSeekerAPI.refreshJobSeekerProfilePic();
};
