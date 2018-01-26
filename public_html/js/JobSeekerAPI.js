/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var JobSeekerAPI = {};
JobSeekerAPI.jobSeekers = [];

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

JobSeekerAPI.populateJobSeekerObject = function(JSONContact){
    
    Utilities.debug?console.log("populating job Objects"):null;
    Utilities.debug?console.log(JSONContact):null;
    
    var job = JSONContact;
    
    Utilities.debug?console.log(job):null;

    var jobObj = new JobSeekerAPI.JobSeeker();

    jobObj.id = job.id;
    jobObj.firstname = job.firstname;
    jobObj.lastname = job.lastname;
    jobObj.location_city = job.location_city;
    jobObj.location_province = job.location_province;
    jobObj.term_qty = job.term_qty;
    jobObj.term_units = job.term_units;


    Utilities.debug?console.log(jobObj):null;

    return jobObj;
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
    jobMainTable.setAttribute("class", "jobPostSummary");
    
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

JobSeekerAPI.populateJobSeekerProfile = function(response){
    var jobSeekerJSON = JSON.parse(response)[0];
    var sessionUser = UserAPI.getSessionUserAsJSON();
    var jobSeekerProfile = new JobSeekerAPI.JobSeeker();
    jobSeekerProfile.id = jobSeekerJSON.job_seeker_profile_id;
    jobSeekerProfile.personal_link = unescape(jobSeekerJSON.job_seeker_profile_link);
    jobSeekerProfile.accomplishment = jobSeekerJSON.job_seeker_profile_accomp;
    jobSeekerProfile.best_experience = jobSeekerJSON.job_seeker_profile_best_exp;
    jobSeekerProfile.worst_experience = jobSeekerJSON.job_seeker_profile_worst_exp;
    jobSeekerProfile.superpower = jobSeekerJSON.job_seeker_profile_superpower;
    jobSeekerProfile.tagline = jobSeekerJSON.job_seeker_profile_tagline;
    jobSeekerProfile.twitter_link = jobSeekerJSON.job_seeker_profile_twitter_link;
    jobSeekerProfile.linkedin_link = jobSeekerJSON.job_seeker_profile_linkedin_link;
    jobSeekerProfile.about_me = jobSeekerJSON.job_seeker_profile_about_me;
    jobSeekerProfile.last_updated = jobSeekerJSON.last_updated;
    
    //var jobSeekerForm = document.getElementById("jobSeekerForm");
    
    var profile_id = document.getElementById("profileId");
    profile_id.value = jobSeekerProfile.id;
    
    var last_updated = document.getElementById("profileLastUpdated");
    last_updated.value = jobSeekerProfile.last_updated;
    
    var profile_first_name = document.getElementById("profileFirstName");
    profile_first_name.value = sessionUser.firstname;
    
    var profile_last_name = document.getElementById("profileLastName");
    profile_last_name.value = sessionUser.lastname;
    
    /*
    console.log(jobSeekerJSON.job_seeker_profile_link);
    if(jobSeekerJSON.job_seeker_profile_link !== undefined){
        var profile_link = document.getElementById("profile_link");
        profile_link.value = jobSeekerProfile.profile_link;
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
};

JobSeekerAPI.saveJobSeekerProfileChanges = function(){
    var jobSeekerForm = document.getElementById("jobSeekerForm");
    var jobSeekerProfile = new JobSeekerAPI.JobSeeker();
    var user = new UserAPI.User();
    if(UserAPI.hasSessionUser()){
        user.id = UserAPI.getSessionUserAsJSON().id;
        user.firstName = UserAPI.getSessionUserAsJSON().firstName;
        user.lastName = UserAPI.getSessionUserAsJSON().lastName;
    }
    
    if(jobSeekerForm.profile_id !== ""){
        jobSeekerProfile.id = jobSeekerForm.profile_id.value;
    }
    
    if(jobSeekerForm.last_updated !== ""){
        jobSeekerProfile.last_updated = jobSeekerForm.last_updated.value;
    }
    
    if(jobSeekerForm.profile_link !== null || jobSeekerForm.profile_link !== ""){
        jobSeekerProfile.profile_link = escape(jobSeekerForm.profile_link.value);
    }
    
    if(jobSeekerForm.profile_accomp !== ""){
        jobSeekerProfile.profile_accomp = jobSeekerForm.profile_accomplishment.value;
    }
    
    if(jobSeekerForm.profile_best_exp !== ""){
        jobSeekerProfile.profile_best_exp = jobSeekerForm.profile_best_experience.value;
    }
    
    if(jobSeekerForm.profile_worst_exp !== ""){
        jobSeekerProfile.profile_worst_exp = jobSeekerForm.profile_worst_experience.value;
    }
    
    if(jobSeekerForm.profile_superpower !== ""){
        jobSeekerProfile.profile_superpower = jobSeekerForm.profile_superpower.value;
    }
    
    JobSeekerAPI.saveJobSeekerProfile(jobSeekerProfile);
};


/**
 * 
 * @param {type} contactId
 * @returns {undefined}
 */
JobSeekerAPI.saveJobSeekerProfile = function(jobSeekerProfile){
    var user = UserAPI.getSessionUserAsJSON();
    Utilities.debug?console.log("toggle Favourite contact"):null;
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
    console.log(response);
};

JobSeekerAPI.showJobSeekerProfileForm = function () {
    var stateInfo = {pageInfo: 'create_job_seeker_profile', pageTitle: 'Talent Cloud: Job Seeker Profile'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#MyProfile');//last parameter just replaced with #Register instead of url

    EventsAPI.clearJobsContainer();

    var jobSeekerProfileOverlay = document.getElementById("jobSeekerProfileWrapperWindow");
    jobSeekerProfileOverlay.classList.remove("hidden");

    var profile_first_name = document.getElementById("profile_first_name");
    profile_first_name.focus();

    EventsAPI.hideBodyOverflow(false);
    //AccessibilityAPI.preventModalEscapeBackward("jobSeekerCloseButton");
    //AccessibilityAPI.preventModalEscapeForward("goToAccomplishmentsButton");

};

JobSeekerAPI.hideJobSeekerProfileForm = function () {
    var jobSeekerProfileOverlay = document.getElementById("jobSeekerProfileWrapperWindow");
    jobSeekerProfileOverlay.classList.add("hidden");

    //UserAPI.clearFormFields("jobSeekerForm");
    //EventsAPI.hideBodyOverflow(false);

    //FormsAPI.steppedForm.validateStep('contact_details','jobSeekerFormStepGroup',false,null,null);
};
