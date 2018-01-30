/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor. 
 */


var JobPostAPI = {};
//JobPostAPI.jobPosts = [];


JobPostAPI.version = "v1";
//Live URL
//DataAPI.baseURL = "http://localhost:8080/contacts/api/"+DataAPI.version+"";
//Dev URL
JobPostAPI.baseURL = "/tc/api/"+JobPostAPI.version+"";
//Live REST API URL - TODO remove mok url
JobPostAPI.mockURL = "https://localhost:8083/talentcloud/api/"+JobPostAPI.version+"";

/**
 * 
 * @param {type} id
 * @param {type} title
 * @param {type} applicants_to_date
 * @param {type} close_date_time
 * @param {type} department
 * @param {type} location_city
 * @param {type} location_province
 * @param {type} term_qty
 * @param {type} term_units
 * @param {type} remuneration_type
 * @param {type} remuneration_range_low
 * @param {type} remuneration_range_high
 * @returns {JobPostAPI.JobPost}
 */
JobPostAPI.JobPost = function(id,title,applicants_to_date,close_date_time,department,location_city,location_province,term_qty,term_units,remuneration_type,remuneration_range_low,remuneration_range_high){
    this.id = id;
    this.title = title;
    this.applicants_to_date = applicants_to_date;
    this.close_date_time = close_date_time;
    this.department = department;
    this.location_city = location_city;
    this.location_province = location_province;
    this.term_qty = term_qty;
    this.term_units = term_units;
    this.remuneration_type = remuneration_type;
    this.remuneration_range_low = remuneration_range_low;
    this.remuneration_range_high = remuneration_range_high;
};

/**
 * 
 * @param {type} data
 * @returns {undefined}
 */
JobPostAPI.populateJobObjects = function(data){
    Utilities.debug?console.log("populating job Objects"):null;
    Utilities.debug?console.log(data):null;
    
    var jobs = data.jobs;
    //var jobs = data.response.jsonBody.job;
    jobPosts = [];
    
    for(var job in jobs){
        
        Utilities.debug?console.log(jobs[job]):null;
        
        var job = JobPostAPI.populateJobObject(jobs[job]);
        
        jobPosts.push(job);
    }
    
    JobPostAPI.populateJobs(jobPosts);
    
};

/**
 * 
 * @param {type} JSONJob
 * @returns {JobPostAPI.populateJobObject.jobObj|JobPostAPI.JobPost}
 */
JobPostAPI.populateJobObject = function(JSONJob){
    
    Utilities.debug?console.log("populating job Objects"):null;
    Utilities.debug?console.log(JSONJob):null;
    //console.log(JSONJob);
    var job = JSONJob;
    
    Utilities.debug?console.log(job):null;
    console.log(job);
    var jobObj = new JobPostAPI.JobPost();

    jobObj.id = job.id;
    jobObj.title = job.title;
    jobObj.applicants_to_date = job.applicants_to_date;
    jobObj.close_date_time = job.close_date;
    jobObj.department = job.department;
    jobObj.location_city = job.location_city;
    jobObj.location_province = job.location_province;
    jobObj.term_qty = job.term_qty;
    jobObj.term_units = job.term_units;
    jobObj.remuneration_type = job.remuneration_type;
    jobObj.remuneration_range_low = job.remuneration_range_low;
    jobObj.remuneration_range_high = job.remuneration_range_high;


    Utilities.debug?console.log(jobObj):null;

    return jobObj;
};

/**
 * 
 * @returns {undefined}
 */
JobPostAPI.populateJobs = function(jobPosts){

    Utilities.debug?console.log("populating jobs"):null;
    var jobsDiv = document.getElementById("jobList");
    //jobsDiv.innerHTML = "";
    
    while (jobsDiv.firstChild) {
        jobsDiv.removeChild(jobsDiv.firstChild);
    }
    
    for(var j = 0; j < jobPosts.length; j++){
        var job = jobPosts[j];
        jobsDiv.appendChild(JobPostAPI.populateJob(job, false));
    }
    
    jobsDiv.classList.remove("hidden");
    
    //hide no contacts div
    if(jobPosts.length > 0){
        var noJobs = document.getElementById("noJobs");
        noJobs.classList.remove("visible");
        noJobs.classList.add("hidden");
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

/**
 * 
 * @param {type} job
 * @param {type} demo
 * @param {type} locale
 * @returns {Element|JobPostAPI.populateJob.jobCard}
 */
JobPostAPI.populateJob = function(job, demo, locale){
    Utilities.debug?console.log("populating job"):null;
    
    //Create a job card
    var jobCard = document.createElement("div");
    jobCard.setAttribute("id", "jobId_"+job.id);
    jobCard.setAttribute("class", "jobCard");
    jobCard.setAttribute("tabindex",0);
    
    //Main job table
    var jobMainTable = document.createElement("div");
    jobMainTable.setAttribute("class", "jobPostSummary");
    
    var jobIDCell = document.createElement("div");
    jobIDCell.setAttribute("class", "jobId hidden");
    jobIDCell.innerHTML = job.id;
    
    var titleDepartmentWrapper = document.createElement("div");
    titleDepartmentWrapper.setAttribute("class", "titleDepartmentWrapper");
    
    var jobTitle = document.createElement("div");
    jobTitle.setAttribute("class", "jobTitle");
    jobTitle.innerHTML = job.title;

    var jobApplicants_to_date = document.createElement("div");
    if(demo === true){
        jobApplicants_to_date.setAttribute("class", "jobApplicants_to_date");
        
        if(locale === "en_CA")
            jobApplicants_to_date.innerHTML = "Applicants to date: 12";
        else
            jobApplicants_to_date.innerHTML = "Candidats à ce jour: 12";
    }
    else{
        jobApplicants_to_date.setAttribute("class", "jobApplicants_to_date");
        jobApplicants_to_date.innerHTML = job.applicants_to_date + " " + siteContent.jobApplicantsSoFar;
    }
    
    var jobClose_date_time = document.createElement("div");
    jobClose_date_time.setAttribute("class", "jobClose_date_time");
    //console.log(job.close_date_time);
    jobClose_date_time.innerHTML = Utilities.timeRemaining(job.close_date_time) + " " + siteContent.jobUntilClose;

    var jobDepartment = document.createElement("div");
    jobDepartment.setAttribute("class", "jobDepartment");
    jobDepartment.innerHTML = job.department;
    
    var jobLocation = document.createElement("div");
    jobLocation.setAttribute("class", "jobLocation");
    jobLocation.innerHTML = job.location_city + " (" + job.location_province + ")";
    
    var jobTerm_qty = document.createElement("div");
    jobTerm_qty.setAttribute("class", "jobTerm_qty");
    jobTerm_qty.innerHTML = job.term_qty + " " + job.term_units + " " + siteContent.jobTerm ;
    
    var hiringManagerWrapper = document.createElement("div");
    hiringManagerWrapper.setAttribute("class", "hiringManagerWrapper");
    
    var hiringManagerProfilePicImg = new Image();
    hiringManagerProfilePicImg.src = "/images/user.svg";
    
    var hiringManagerProfilePic = document.createElement("img");
    hiringManagerProfilePic.setAttribute("class", "hiringManagerProfilePicSmall");
    hiringManagerProfilePic.setAttribute("alt", "Image of Hiring Manager");
    hiringManagerProfilePic.src = hiringManagerProfilePicImg.src;
    
    hiringManagerWrapper.appendChild(hiringManagerProfilePic);
    
    hiringManagerLabel = document.createElement("span");
    hiringManagerLabel.setAttribute("class", "hiringManagerLabel");
    hiringManagerLabel.innerHTML = "Hiring Manager";
    
    hiringManagerWrapper.appendChild(hiringManagerLabel);
    
    var viewJobButton;// = document.createElement("button");
    
    if(demo === true){
        viewJobButton = document.createElement("input");
        viewJobButton.setAttribute("class","btn btn-primary");
        viewJobButton.setAttribute("type","button");
        viewJobButton.setAttribute("value",siteContent.viewButton);
        viewJobButton.innerHTML = siteContent.viewButton;
    }
    else{
        viewJobButton = document.createElement("button");
        viewJobButton.setAttribute("class","btn btn-primary");
        viewJobButton.setAttribute("value",siteContent.viewButton);
        viewJobButton.innerHTML = siteContent.viewButton;
    }
    
    

    if(demo === true){
        if(locale === "en_CA"){
            viewJobButton.setAttribute("onclick", "JobPostAPI.populateDemoJobPoster(CreateJobPosterAPI.jobObjEnglish)");
        }
        else if(locale === "fr_CA"){
            viewJobButton.setAttribute("onclick", "JobPostAPI.populateDemoJobPoster(CreateJobPosterAPI.jobObjFrench)");
        }
    }else{
        viewJobButton.setAttribute("onclick", "JobPostAPI.viewJobPoster("+job.id+")");
    }
    
    
    jobMainTable.appendChild(jobIDCell);
    jobMainTable.appendChild(hiringManagerWrapper);
    jobMainTable.appendChild(jobTitle);
    jobMainTable.appendChild(jobDepartment);
    
    jobMainTable.appendChild(jobLocation);
    
    jobMainTable.appendChild(jobApplicants_to_date);
    jobMainTable.appendChild(jobClose_date_time);


    jobMainTable.appendChild(jobTerm_qty);
    
    
    
    jobMainTable.appendChild(viewJobButton);
    
    //Append job to the jobcard
    jobCard.appendChild(jobMainTable);
    //jobCard.appendChild(JobPostAPI.addFavouriteLink(job.id));
    //Append card to the jobs div
    //jobsDiv.appendChild(jobCard);
    //return job card, makes code more modular ^
    return jobCard;
    
};

/**
 * 
 * @returns {Number}
 */
JobPostAPI.getJobCount = function(){
    if(JobPostAPI.jobPosts){
        return JobPostAPI.jobPosts.length;
    }
    return 0;
};

/**
 * 
 * @param {type} jobPosterId
 * @returns {Element|JobPostAPI.addFavouriteLink.jobPosterFavouriteImgWrapper}
 */
JobPostAPI.addFavouriteLink = function(jobPosterId){
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
    jobPosterFavouriteLink.setAttribute("onclick","JobPostAPI.toggleFavourite('"+jobPosterId+"')");

    jobPosterFavouriteLink.innerHTML = jobPosterFavouriteImg.outerHTML;
    jobPosterFavouriteImgWrapper.innerHTML = jobPosterFavouriteLink.outerHTML;
    
    return jobPosterFavouriteImgWrapper;
};

/**
 * 
 * @param {type} responseText
 * @returns {undefined}
 */
JobPostAPI.toggleFavourite = function(jobPosterId){
    Utilities.debug?console.log(jobPosterId):null;
    
    if(jobPosterId !== ""){
        DataAPI.toggleFavourite(jobPosterId);
    }
};

/**
 * 
 * @param {type} isFav
 * @param {type} jobPosterId
 * @returns {undefined}
 */
JobPostAPI.updateFavourite = function(isFav,jobPosterId){
    
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
}


/**
 * 
 * @returns {Boolean}
 */
JobPostAPI.viewJobPoster = function(jobId){
         
    DataAPI.getJobPoster(TalentCloudAPI.getLanguageFromCookie(),jobId);
    
};

/**
 * 
 * @param {type} jobData
 * @returns {undefined}
 */
JobPostAPI.populateJobPoster = function(jobData){
    TalentCloudAPI.hideAllContent();
    
    var stateInfo = {pageInfo: 'view_job_poster', pageTitle: 'Talent Cloud: ' + jobData.title + ' (' + jobData.id + ')'};
    //stateInfo.viewJobPosterJobObj = jobData;
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#Job/' + jobData.id);//last parameter just replaced with #Register instead of url
    
    var viewJobPosterOverlay = document.getElementById("viewJobPosterApplicationOverlay");   
    var jobPoster = document.getElementById("jobPoster");
    jobPoster.innnerHTML = "";
    
    var jobPosterHeader = document.createElement("div");
    jobPosterHeader.setAttribute("id", "jobPosterHeader_" + jobData.id);
    jobPosterHeader.setAttribute("class", "row jobPosterHeader");
    jobPosterHeader.innerHTML = jobData.title + " (" + jobData.id + ")";
    
    var jobLocation = document.createElement("div");
    jobLocation.setAttribute("id", "jobLocation"+jobData.id);
    jobLocation.setAttribute("class", "row jobLocation");
    jobLocation.innerHTML = siteContent.jobLocation + " : " + jobData.department + " - " + jobData.location_city+ " (" + jobData.location_province + ")";
    
    var jobTerm = document.createElement("div");
    jobTerm.setAttribute("id", "jobTerm"+jobData.id);
    jobTerm.setAttribute("class", "row jobTerm");
    jobTerm.innerHTML = siteContent.jobTerm + " : " + jobData.term_qty + " " + jobData.term_units;
    
    var jobSalaryRange = document.createElement("div");
    jobSalaryRange.setAttribute("id", "jobSalaryRange"+jobData.id);
    jobSalaryRange.setAttribute("class", "row jobSalaryRange");
    jobSalaryRange.innerHTML = siteContent.jobSalaryRange + " : $" + jobData.remuneration_range_low + " - $" + jobData.remuneration_range_high + " CDN";

    var jobPosterApplyButton = document.createElement("div");
    jobPosterApplyButton.setAttribute("id", "jobPosterApplyButton_"+jobData.id);
    jobPosterApplyButton.setAttribute("class", "btn_primary jobPosterApplyButton");

    var applyNowButton = document.createElement("button");
    applyNowButton.setAttribute("id", "applyNowButton_"+jobData.id);
    applyNowButton.setAttribute("class","btn btn-primary");
    applyNowButton.setAttribute("value",siteContent.viewButton);
    applyNowButton.innerHTML = siteContent.applyNow;
    if(UserAPI.hasSessionUser()){
        applyNowButton.setAttribute("onclick", "JobPostAPI.jobPosterApplication("+jobData.id+",'"+jobData.title+ "');");
    }else{
        applyNowButton.setAttribute("onclick", "UserAPI.showLogin()");
    }
    jobPosterApplyButton.appendChild(applyNowButton);
    
    var applyNowBackButton = document.createElement("button");
    applyNowBackButton.setAttribute("id", "applyNowBackButton_"+jobData.id);
    applyNowBackButton.setAttribute("class","btn jobPosterCancelButton");
    applyNowBackButton.innerHTML = "Cancel";
    applyNowBackButton.setAttribute("onclick", "JobPostAPI.hideJobPoster('"+jobData.id+"')");
    jobPosterApplyButton.appendChild(applyNowBackButton);

    jobPoster.appendChild(jobPosterHeader);
    jobPoster.appendChild(jobLocation);
    jobPoster.appendChild(jobTerm);
    jobPoster.appendChild(jobSalaryRange);
    jobPoster.appendChild(jobPosterApplyButton);
    viewJobPosterOverlay.classList.remove("hidden");
    var jobSeekerProfileId = document.getElementById("profile_id").value;
    JobPostAPI.getJobPosterApplicationByProfileId(jobData.id,jobSeekerProfileId);
};

/**
 * 
 * @param {type} jobData
 * @returns {undefined}
 */
JobPostAPI.populateDemoJobPoster = function(jobData){
    var viewJobPosterOverlay = document.getElementById("viewJobPosterOverlay");   
    var viewJobPosterWrapperWindow = document.getElementById("viewJobPosterWrapperWindow");
    AccessibilityAPI.setARIALabelledBy(viewJobPosterWrapperWindow,"jobPosterHeader_"+jobData.id);
    //AccessibilityAPI.setARIADescribedBy(viewJobPosterWrapperWindow,"jobPosterHeader_"+jobData.id);
    
    var viewJobPosterCloseButton = document.getElementById("jobPosterCloseButton");
    viewJobPosterCloseButton.setAttribute("aria-label","Close "+jobData.title + " " + jobData.id + " dialog");
    viewJobPosterCloseButton.setAttribute("onclick", "JobPostAPI.hideJobPoster('"+jobData.id+"')");
    
    var jobPoster = document.getElementById("jobPoster");
    jobPoster.innerHTML = "";
    
    var jobPosterHeader = document.createElement("div");
    jobPosterHeader.setAttribute("id", "jobPosterHeader_"+jobData.id);
    jobPosterHeader.setAttribute("class", "row jobPosterHeader");
    jobPosterHeader.innerHTML = jobData.title + " ("+jobData.id+") -demo";
    
    var jobLocation = document.createElement("div");
    jobLocation.setAttribute("id", "jobLocation"+jobData.id);
    jobLocation.setAttribute("class", "row jobLocation");
    jobLocation.setAttribute("tabindex", "0");
    jobLocation.innerHTML = siteContent.jobLocation + " : " + jobData.department + " - " + jobData.location_city+ " (" + jobData.location_province + ")";
    
    var jobTerm = document.createElement("div");
    jobTerm.setAttribute("id", "jobTerm"+jobData.id);
    jobTerm.setAttribute("class", "row jobTerm");
    jobTerm.setAttribute("tabindex", "0");
    jobTerm.innerHTML = siteContent.jobTerm + " : " + jobData.term_qty + " " + jobData.term_units;
    
    var jobSalaryRange = document.createElement("div");
    jobSalaryRange.setAttribute("id", "jobSalaryRange"+jobData.id);
    jobSalaryRange.setAttribute("class", "row jobSalaryRange");
    jobSalaryRange.setAttribute("tabindex", "0");
    jobSalaryRange.innerHTML = siteContent.jobSalaryRange + " : $" + jobData.remuneration_range_low + " - $" + jobData.remuneration_range_high + " CDN";
    
    var jobHiringManager = document.createElement("div");
    jobHiringManager.setAttribute("id", "jobHiringManager"+jobData.id);
    jobHiringManager.setAttribute("class", "row jobHiringManager");
    jobHiringManager.innerHTML = siteContent.jobSalaryRange + " : $" + jobData.remuneration_range_low + " - $" + jobData.remuneration_range_high + " CDN";
    
    var jobPosterApplyButton = document.createElement("div");
    jobPosterApplyButton.setAttribute("id", "jobPosterApplyButton_"+jobData.id);
    jobPosterApplyButton.setAttribute("class", "btn_primary jobPosterApplyButton");


    var applyNowButton = document.createElement("button");
    applyNowButton.setAttribute("id", "applyNowButton_"+jobData.id);
    applyNowButton.setAttribute("class","btn btn-primary");
    applyNowButton.setAttribute("value",siteContent.viewButton);
    applyNowButton.setAttribute("disabled","");
    applyNowButton.innerHTML = siteContent.applyNow;
    applyNowButton.setAttribute("onclick", "JobPostAPI.jobPosterApplication('"+jobData.id+"','"+jobData.title+ "');");
    applyNowButton.setAttribute("onkeydown", "AccessibilityAPI.onKeydownPreventEscapeForward();");
    jobPosterApplyButton.appendChild(applyNowButton);
    
    jobPoster.appendChild(jobPosterHeader);
    jobPoster.appendChild(jobLocation);
    jobPoster.appendChild(jobTerm);
    jobPoster.appendChild(jobSalaryRange);
    
    jobPoster.appendChild(jobPosterApplyButton);
    
    viewJobPosterOverlay.classList.remove("hidden");
    EventsAPI.hideBodyOverflow(true);
    jobPosterHeader.focus();
};

/**
 * 
 * @param {type} jobPosterId
 * @returns {undefined}
 */
JobPostAPI.hideJobPoster = function(jobPosterId){
    var viewJobPosterOverlay = document.getElementById("jobPosterApplication");    
    viewJobPosterOverlay.classList.add("hidden");
    var jobPoster = document.getElementById("jobPoster");
    jobPoster.innerHTML = "";
    DataAPI.getJobs(locale);
    //var viewJobPosterButton = document.getElementById("viewJobPosterButton_"+jobPosterId);
    //viewJobPosterButton.focus();
    EventsAPI.hideBodyOverflow(false);
};

/**
 * 
 * @param {type} jobPosterId
 * @param {type} jobTitle
 * @returns {undefined}
 */
JobPostAPI.jobPosterApplication = function(jobPosterId, jobTitle){
    //console.log(jobPosterId);
    var viewJobPosterApplicationOverlay = document.getElementById("viewJobPosterApplicationOverlay");   
    viewJobPosterApplicationOverlay.classList.add("hidden");
    var jobSeekerProfileId = document.getElementById("profile_id").value;
    //var viewJobPosterApplicationCloseButton = document.getElementById("jobPosterApplicationCloseButton");
    //viewJobPosterApplicationCloseButton.setAttribute("aria-label","Close "+jobTitle + " " + jobPosterId + " application dialog");
    
    //var viewJobPosterApplicationWrapperWindow = document.getElementById("viewJobPosterApplicationWrapperWindow");
    //AccessibilityAPI.setARIALabelledBy(viewJobPosterApplicationWrapperWindow,"jobPosterApplicationHeader_"+jobPosterId);
    //AccessibilityAPI.setARIADescribedBy(viewJobPosterApplicationWrapperWindow,"jobPosterApplicationHeader_"+jobPosterId);
    
    var jobPosterApplication = document.getElementById("jobPosterApplication");
    
    var jobPosterApplicationHeader = document.createElement("div");
    jobPosterApplicationHeader.setAttribute("id", "jobPosterApplicationHeader_"+jobPosterId);
    jobPosterApplicationHeader.setAttribute("tabindex", "0");
    jobPosterApplicationHeader.setAttribute("class", "row jobPosterHeader");
    jobPosterApplicationHeader.innerHTML = "Application - " + jobTitle + " ("+jobPosterId+")";
    
    var jobPosterApplicationProfileSelect = document.createElement("div");
    jobPosterApplicationProfileSelect.setAttribute("id", "jobPosterApplicationProfileSelect");
    jobPosterApplicationProfileSelect.setAttribute("class", "jobPosterApplicationProfileSelect");
    jobPosterApplicationProfileSelect.innerHTML = "Select profile to submit with the application";
    
    
    var jobPosterSubmitApplicationButton = document.createElement("div");
    jobPosterSubmitApplicationButton.setAttribute("id", "jobPosterSubmitApplicationButton_"+jobPosterId);
    jobPosterSubmitApplicationButton.setAttribute("class", "btn_primary jobPosterSubmitApplicationButton");
    
    var submitApplicationButton = document.createElement("button");
    submitApplicationButton.setAttribute("id", "submitApplicationButton_"+jobPosterId);
    submitApplicationButton.setAttribute("class","btn btn-primary");
    submitApplicationButton.innerHTML = siteContent.submitApplication;
    submitApplicationButton.setAttribute("onclick", "JobPostAPI.submitJobPosterApplication('"+jobPosterId+"','"+jobSeekerProfileId+"');");
    submitApplicationButton.setAttribute("onkeydown", "AccessibilityAPI.onKeydownPreventEscapeForward();");
    jobPosterSubmitApplicationButton.appendChild(submitApplicationButton);
    
    jobPosterApplication.appendChild(jobPosterApplicationHeader);
    jobPosterApplication.appendChild(jobPosterApplicationProfileSelect);
    jobPosterApplication.appendChild(jobPosterSubmitApplicationButton);
    jobPosterApplication.classList.remove("hidden");
    jobPosterApplicationHeader.focus();
    //var viewJobPosterOverlay = document.getElementById("viewJobPosterOverlay");    
    //viewJobPosterOverlay.classList.add("hidden");    
};

/**
 * 
 * @param {type} jobPosterId
 * @param {type} jobSeekerProfileId
 * @returns {undefined}
 */
JobPostAPI.submitJobPosterApplication = function(jobPosterId,jobSeekerProfileId){
    Utilities.debug?console.log("loading talent cloud UI"):null;
    Utilities.debug?console.log("loading contacts"):null;
    var jobPosterApplication_URL = JobPostAPI.baseURL+"/putJobPosterApplication/"+jobPosterId+"/"+jobSeekerProfileId;
    
    var authToken = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
    }
    var jobPosterApplication_xhr = new XMLHttpRequest();
    if ("withCredentials" in jobPosterApplication_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      jobPosterApplication_xhr.open("PUT", jobPosterApplication_URL);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      jobPosterApplication_xhr = new XDomainRequest();
      jobPosterApplication_xhr.open("PUT", jobPosterApplication_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      jobPosterApplication_xhr = null;

    }
    
    jobPosterApplication_xhr.open('PUT',jobPosterApplication_URL);
    jobPosterApplication_xhr.setRequestHeader("Content-Type","application/json");
    jobPosterApplication_xhr.setRequestHeader("x-access-token", authToken.access_token);
    
    jobPosterApplication_xhr.addEventListener("progress",
    function(evt){
        JobPostAPI.submitJobPosterApplicationProgress(evt);
    },false);
    jobPosterApplication_xhr.addEventListener("load",
    function(evt){
        JobPostAPI.submitJobPosterApplicationLoaded(jobPosterApplication_xhr.responseText);
    },false);
    jobPosterApplication_xhr.addEventListener("error",DataAPI.transferFailed,false);
    jobPosterApplication_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    jobPosterApplication_xhr.send(authToken);
    //JobPostAPI.hideJobPosterApplication();
};

JobPostAPI.submitJobPosterApplicationProgress = function(evt){
    
};

/**
 * 
 * @param {type} jobPosterId
 * @returns {undefined}
 */
JobPostAPI.submitJobPosterApplicationLoaded = function(jobPosterId){
    //var applyNowButton = document.getElementById("applyNowButton_"+jobPosterId);
    //applyNowButton.setAttribute("disabled","");
    JobPostAPI.hideJobPosterApplication();
};

/**
 * 
 * @returns {undefined}
 */
JobPostAPI.hideJobPosterApplication = function(){
    var viewJobPosterApplicationOverlay = document.getElementById("viewJobPosterApplicationOverlay");    
    viewJobPosterApplicationOverlay.classList.remove("hidden");
    
    var jobPosterApplication = document.getElementById("jobPosterApplication");  
    jobPosterApplication.innerHTML = "";
    
    /*var viewJobPosterOverlay = document.getElementById("viewJobPosterOverlay");  
    viewJobPosterOverlay.classList.add("hidden");*/
    
};

/**
 * 
 * @param {type} jobPosterId
 * @param {type} jobSeekerProfileId
 * @returns {undefined}
 */
JobPostAPI.getJobPosterApplicationByProfileId = function(jobPosterId,jobSeekerProfileId){
    Utilities.debug?console.log("loading talent cloud UI"):null;
    Utilities.debug?console.log("loading contacts"):null;
    var jobPosterApplication_URL = JobPostAPI.baseURL+"/getJobPosterApplicationByProfileId/"+jobPosterId+"/"+jobSeekerProfileId;
    
    var authToken = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
    }
    var jobPosterApplication_xhr = new XMLHttpRequest();
    if ("withCredentials" in jobPosterApplication_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      jobPosterApplication_xhr.open("GET", jobPosterApplication_URL);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      jobPosterApplication_xhr = new XDomainRequest();
      jobPosterApplication_xhr.open("GET", jobPosterApplication_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      jobPosterApplication_xhr = null;

    }
    
    jobPosterApplication_xhr.open('GET',jobPosterApplication_URL);
    jobPosterApplication_xhr.setRequestHeader("Content-Type","application/json");
    jobPosterApplication_xhr.setRequestHeader("x-access-token", authToken.access_token);
    
    jobPosterApplication_xhr.addEventListener("progress",
    function(evt){
        JobPostAPI.submitJobPosterApplicationProgress(evt);
    },false);
    jobPosterApplication_xhr.addEventListener("load",
    function(evt){
        JobPostAPI.getJobPosterApplicationByProfileIdLoaded(jobPosterApplication_xhr.responseText,jobPosterId,jobSeekerProfileId);
    },false);
    jobPosterApplication_xhr.addEventListener("error",DataAPI.transferFailed,false);
    jobPosterApplication_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    jobPosterApplication_xhr.send(authToken);
    //JobPostAPI.hideJobPosterApplication();
};


JobPostAPI.submitJobPosterApplicationProgress = function(evt){
    
};

/**
 * 
 * @param {type} response
 * @param {type} jobPosterId
 * @param {type} jobSeekerProfileId
 * @returns {undefined}
 */
JobPostAPI.getJobPosterApplicationByProfileIdLoaded = function(response,jobPosterId,jobSeekerProfileId){
    //var applyNowButton = document.getElementById("applyNowButton_"+jobPosterId);
    //applyNowButton.setAttribute("disabled","");
    //JobPostAPI.hideJobPosterApplication();
    var jobPosterSubmitApplicationButton = document.getElementById("applyNowButton_"+jobPosterId);
    //console.log(response);
    if(response !== "null"){
        jobPosterSubmitApplicationButton.setAttribute("disabled","");
    }
};
