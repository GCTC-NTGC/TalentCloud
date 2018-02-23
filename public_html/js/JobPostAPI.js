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
JobPostAPI.JobPost = function(id,title,applicants_to_date,close_date_time,department,location_city,location_province,term_qty,term_units,remuneration_type,remuneration_range_low,remuneration_range_high,impact,key_tasks,core_competencies,developing_competencies,other_requirements){
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
    this.impact = impact;
    this.key_tasks = key_tasks;
    this.core_competencies = core_competencies;
    this.developing_competencies = developing_competencies;
    this.other_requirements = other_requirements;
};

JobPostAPI.showBrowseJobs = function() {
    var stateInfo = {pageInfo: 'browse_jobs', pageTitle: 'Talent Cloud: Browse Jobs'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#Jobs');
    
    TalentCloudAPI.hideAllContent();
    var browseJobsSection = document.getElementById('browseJobsSection');
    browseJobsSection.classList.remove('hidden');
    
    var loadingJobs = document.getElementById("loadingJobs");
    loadingJobs.classList.remove("hidden");
    
    var locale = TalentCloudAPI.getLanguageFromCookie();
    DataAPI.getJobs(locale, JobPostAPI.populateJobObjectList);
}

/**
 * 
 * @param {type} data
 * @returns {undefined}
 */
JobPostAPI.populateJobObjectList = function(xhr_response){
    var data = JSON.parse(xhr_response.responseText);
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
    jobObj.impact = job.impact;
    jobObj.key_tasks = job.key_tasks;
    jobObj.core_competencies = job.core_competencies;
    jobObj.developing_competencies = job.developing_competencies;
    jobObj.other_requirements = job.other_requirements;


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
    var noJobs = document.getElementById("noJobs");
    var loadingJobs = document.getElementById("loadingJobs");
    
    var browseJobsSection = document.getElementById("browseJobsSection");
    browseJobsSection.classList.remove("hidden");
    
    //Remove previously shown jobs
    while (jobsDiv.lastChild) {
        jobsDiv.removeChild(jobsDiv.lastChild);
    }
    
    for(var j = 0; j < jobPosts.length; j++){
        var job = jobPosts[j];
        jobsDiv.appendChild(JobPostAPI.populateJobSummary(job, false));
    }
    
    loadingJobs.classList.add("hidden");
    if(jobPosts.length > 0){
        jobsDiv.classList.remove("hidden");
        noJobs.classList.add("hidden");
    } else {
        jobsDiv.classList.add("hidden");
        noJobs.classList.remove("hidden");
    }
   
    EventsAPI.hideBodyOverflow(false); 
};

/** SHORT JOB DESCRIPTIONS (BROWSE JOBS AREA)
 * 
 * @param {type} job
 * @param {type} demo
 * @param {type} locale
 * @returns {Element|JobPostAPI.populateJobSummary.jobCard}
 */
JobPostAPI.populateJobSummary = function(job, demo, locale){
    Utilities.debug?console.log("populating job"):null;
    
    locale = TalentCloudAPI.getLanguageFromCookie().toString();
    
    // Create a job summary
    var jobSummary = document.createElement("div");
    jobSummary.setAttribute("id", "jobId_"+job.id);
    jobSummary.setAttribute("class", "jobSummary");
    //jobSummary.setAttribute("tabindex",0);
    
    // Job summary elements
    var jobSummaryTable = document.createElement("div");
    jobSummaryTable.setAttribute("class", "jobSummaryTable");
    
    var jobIDCell = document.createElement("div");
    jobIDCell.setAttribute("class", "jobId hidden");
    jobIDCell.innerHTML = job.id;
    
    var hiringManagerProfilePicImg = new Image();
    hiringManagerProfilePicImg.src = "/images/user.png";
    
    var hiringManagerProfilePic = document.createElement("img");
    hiringManagerProfilePic.setAttribute("class", "hiringManagerProfilePicSmall");
    hiringManagerProfilePic.setAttribute("alt", "Image of Hiring Manager");
    hiringManagerProfilePic.src = hiringManagerProfilePicImg.src;
    
    var hiringManagerLabel = document.createElement("span");
    hiringManagerLabel.setAttribute("class", "hiringManagerLabel");
    hiringManagerLabel.innerHTML = "Hiring Manager";
    
    var hiringManagerWrapper = document.createElement("div");
    hiringManagerWrapper.setAttribute("class", "hiringManagerWrapper");
    
    hiringManagerWrapper.appendChild(hiringManagerProfilePic);
    hiringManagerWrapper.appendChild(hiringManagerLabel);
    
    var jobSummaryTitle = document.createElement("div");
    jobSummaryTitle.setAttribute("class", "jobSummaryTitle");
    jobSummaryTitle.innerHTML = job.title;
    
    var jobSummaryDepartment = document.createElement("div");
    jobSummaryDepartment.setAttribute("class", "jobSummaryDepartment");
    jobSummaryDepartment.innerHTML = job.department;
    
    var titleDepartmentWrapper = document.createElement("div");
    titleDepartmentWrapper.setAttribute("class", "titleDepartmentWrapper");
    
    titleDepartmentWrapper.appendChild(jobSummaryTitle);
    titleDepartmentWrapper.appendChild(jobSummaryDepartment);
    
    var jobSummarySalaryRange = document.createElement("div");
    jobSummarySalaryRange.setAttribute("id", "jobSummarySalaryRange"+job.id);
    jobSummarySalaryRange.setAttribute("class", "jobSummarySalaryRange");
    if (locale === "en_CA"){
        jobSummarySalaryRange.innerHTML = "$" + job.remuneration_range_low.toLocaleString('en') + " ~ $" + job.remuneration_range_high.toLocaleString('en');
    } else {
        jobSummarySalaryRange.innerHTML = job.remuneration_range_low.toLocaleString('fr') + " $ ~ " + job.remuneration_range_high.toLocaleString('fr') + " $";
    }
    
    var jobSummaryTerm_qty = document.createElement("div");
    jobSummaryTerm_qty.setAttribute("class", "jobSummaryTerm_qty");
    jobSummaryTerm_qty.innerHTML = job.term_qty + " " + job.term_units + " " + siteContent.jobTerm ;
    
    var jobSummaryApplicants_to_date = document.createElement("div");
    jobSummaryApplicants_to_date.setAttribute("class", "jobSummaryApplicants_to_date");
    jobSummaryApplicants_to_date.innerHTML = job.applicants_to_date + " " + siteContent.jobApplicantsSoFar;
    
    var jobSummaryClose_date_time = document.createElement("div");
    jobSummaryClose_date_time.setAttribute("class", "jobSummaryClose_date_time");
    //console.log(job.close_date_time);
    jobSummaryClose_date_time.innerHTML = Utilities.timeRemaining(job.close_date_time) + " " + siteContent.jobUntilClose;
    
    var applicantsCloseDateWrapper = document.createElement("div");
    applicantsCloseDateWrapper.setAttribute("class", "applicantsCloseDateWrapper");
    
    applicantsCloseDateWrapper.appendChild(jobSummaryApplicants_to_date);
    applicantsCloseDateWrapper.appendChild(jobSummaryClose_date_time);
    
    //var jobSummaryLocation = document.createElement("div");
    //jobSummaryLocation.setAttribute("class", "jobSummaryLocation");
    //jobSummaryLocation.innerHTML = job.location_city + " (" + job.location_province + ")";
    
    var viewJobButton = document.createElement("button");
    viewJobButton.setAttribute("class","viewJobButton");
    viewJobButton.setAttribute("value",siteContent.viewButton);
    viewJobButton.innerHTML = siteContent.viewButton;
    viewJobButton.setAttribute("onclick", "JobPostAPI.viewJobPoster("+job.id+")");
    
    // Job summary order of elements
    jobSummaryTable.appendChild(jobIDCell);
    jobSummaryTable.appendChild(hiringManagerWrapper);
    jobSummaryTable.appendChild(titleDepartmentWrapper);
    jobSummaryTable.appendChild(jobSummarySalaryRange);
    jobSummaryTable.appendChild(jobSummaryTerm_qty);
    jobSummaryTable.appendChild(applicantsCloseDateWrapper);
    jobSummaryTable.appendChild(viewJobButton);
    
    //Append job to the jobcard
    jobSummary.appendChild(jobSummaryTable);
    //jobSummary.appendChild(JobPostAPI.addFavouriteLink(job.id));
    
    return jobSummary;
    
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
    
    //TalentCloudAPI.hideLogo();
    
};

/** LONG JOB DESCRIPTIONS (VIEW JOB POSTER)
 * 
 * @param {type} jobData
 * @returns {undefined}
 */
JobPostAPI.populateJobPoster = function(jobData){    
    var stateInfo = {pageInfo: 'view_job_poster', pageTitle: 'Talent Cloud: ' + jobData.title + ' (' + jobData.id + ')'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#Job/' + jobData.id);//last parameter just replaced with #Register instead of url
    
    TalentCloudAPI.hideAllContent();
    
    //Set language-specific labels
    document.getElementById("jobPosterSalaryRangeLabel").innerHTML = siteContent.jobSalaryRange;
    document.getElementById("jobPosterApplyButton").innerHTML = siteContent.applyNow;
    //TODO: add more
   
    //Header
    if (jobData.title === "") {
        jobData.title = "No Title";
    }
    document.getElementById("jobPosterTitle").innerHTML = jobData.title;
    document.getElementById("jobPosterDepartment").innerHTML = jobData.department;
    document.getElementById("jobPosterCity").innerHTML = jobData.location_city;
    document.getElementById("jobPosterProvince").innerHTML = jobData.location_province;
    document.getElementById("jobPosterIdValue").innerHTML = jobData.id;
    document.getElementById("jobPosterJobId").value = jobData.id;
    
    //Datapoints
    if (locale === "en_CA"){
        document.getElementById("jobPosterSalaryRangeValue").innerHTML = jobData.remuneration_range_low.toLocaleString('en') + " ~ $" + jobData.remuneration_range_high.toLocaleString('en');
    } else {
        document.getElementById("jobPosterSalaryRangeValue").innerHTML = jobData.remuneration_range_low.toLocaleString('fr') + " $ ~ " + jobData.remuneration_range_high.toLocaleString('fr') + " $";
    }
    document.getElementById("jobPosterTermValue").innerHTML = jobData.term_qty + " " + jobData.term_units;
    document.getElementById("jobPosterJobLevelValue").innerHTML = jobData.job_min_level + " ~ " + jobData.job_max_level;


    if (jobData.impact === "")
        jobData.impact = "N/A";
    document.getElementById("jobPosterImpact").innerHTML = jobData.impact;
    
    var keyTaskList = document.getElementById("jobPosterKeyTasks");
    if (jobData.key_tasks.length === 0) {
        jobData.key_tasks.push("N/A");
    }
    JobPostAPI.addItemsToListElement(keyTaskList, jobData.key_tasks, "keyTaskItem");
    
    var coreCompetencyList = document.getElementById("jobPosterCoreCompetencies");
    if (jobData.core_competencies.length === 0) {
        jobData.core_competencies.push("N/A");
    }
    JobPostAPI.addItemsToListElement(coreCompetencyList, jobData.core_competencies, "coreCompetencyItem");
    
    var developingCompetencyList = document.getElementById("jobPosterDevelopingCompetencies");
    if (jobData.developing_competencies.length === 0) {
        jobData.developing_competencies.push("N/A");
    }
    JobPostAPI.addItemsToListElement(developingCompetencyList, jobData.developing_competencies, "developingCompetencyItem");
    
    var otherRequirmentList = document.getElementById("jobPosterOtherRequirements");
    if (jobData.other_requirements.length === 0) {
        jobData.other_requirements.push("N/A");
    }
    JobPostAPI.addItemsToListElement(otherRequirmentList, jobData.other_requirements, "otherRequirmentItem");
        
    var applyNowButton = document.getElementById("jobPosterApplyButton"); 
    if(UserAPI.hasSessionUser()){
        applyNowButton.setAttribute("onclick", "JobPostAPI.jobPosterApplication("+jobData.id+",'"+jobData.title+ "');");
    }else{
        applyNowButton.setAttribute("onclick", "UserAPI.showLogin()");
    }

    document.getElementById("viewJobPosterSection").classList.remove("hidden");
    
    //TODO: fix this when working on jobPoserApplications
    //var jobSeekerProfileId = document.getElementById("profile_id").value;
    //JobPostAPI.getJobPosterApplicationByProfileId(jobData.id,jobSeekerProfileId);
};

JobPostAPI.addItemsToListElement = function(element, items, itemClassAtribute) {
    for (var i=0; i<items.length; i++) {
        var item = document.createElement("li");
        if (itemClassAtribute)
            item.setAttribute("class", itemClassAtribute);
        var p = document.createElement("p");
        var text = document.createTextNode(items[i]);
        
        p.appendChild(text);
        item.appendChild(p)
        element.appendChild(item);
    }
};

/**
 * 
 * @param {type} jobPosterId
 * @returns {undefined}
 */
JobPostAPI.hideJobPoster = function(){
    var viewJobPosterOverlay = document.getElementById("jobPosterApplication");    
    viewJobPosterOverlay.classList.add("hidden");
    var jobPoster = document.getElementById("jobPoster");
    jobPoster.innerHTML = "";
    var jobPosterSection = document.getElementById("viewJobPosterSection");
    jobPosterSection.classList.add("hidden");
    
    JobPostAPI.showBrowseJobs();    
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
