/*
 * 
 * The DataAPI manages the AJAX calls and callbacks to external data sources.
 * 
 * Author:		Gregg Bowden - Deloitte (gbowden@deloitte.ca)
 * Owner:			Deloitte
 */

/**
 * 
 * @returns {undefined}
 */
var DataAPI = {};
var xhr;

DataAPI.version = "v1";
//Live URL
//DataAPI.baseURL = "http://localhost:8080/contacts/api/"+DataAPI.version+"";
//Dev URL
DataAPI.baseURL = "/tc/api/"+DataAPI.version+"";
//Live REST API URL
DataAPI.mockURL = "https://localhost:8083/talentcloud/api/"+DataAPI.version+"";

DataAPI.getTalentCloudUI = function(locale,isManager){
    Utilities.debug?console.log("loading talent cloud UI"):null;
    Utilities.debug?console.log("loading contacts"):null;
    var talentcloudData_URL = DataAPI.baseURL+"/"+locale+"/getContent";
    //console.log('Talent cloud url data:   ' + talentcloudData_URL);
    //var talentcloudData_URL = "/wiremock/mappings/GET_ContentByLocale.json";//TEMPORARY for bh.browse_job_seekers branch
    var authToken = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
    }
    var talentcloudData_xhr = new XMLHttpRequest();
    if ("withCredentials" in talentcloudData_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      talentcloudData_xhr.open("GET", talentcloudData_URL);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      talentcloudData_xhr = new XDomainRequest();
      talentcloudData_xhr.open("GET", talentcloudData_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      talentcloudData_xhr = null;

    }
    
    talentcloudData_xhr.addEventListener("progress",
    function(evt){
        DataAPI.talentcloudDataUpdateProgress(evt);
    },false);
    talentcloudData_xhr.addEventListener("load",
    function(evt){
        DataAPI.talentcloudDataloaded(talentcloudData_xhr.responseText,isManager);
    },false);
    talentcloudData_xhr.addEventListener("error",DataAPI.transferFailed,false);
    talentcloudData_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    talentcloudData_xhr.open('GET',talentcloudData_URL);
    talentcloudData_xhr.send(authToken);
};

/**
 * 
 * @param {type} evt
 * @returns {undefined}
 */
DataAPI.talentcloudDataUpdateProgress = function(evt){
    Utilities.debug?console.log(evt):null;
    if(evt.lengthComputable){
        var total = evt.total;
        var value = evt.loaded;
        
        Utilities.debug?console.log(total + "=" + value):null;
    
        var percentComplete = Math.ceil((evt.loaded / evt.total) * 100);
        //var loadingProgress = document.getElementById("loadingProgress");
        //loadingProgress.innerHTML = " " + percentComplete + "%";   
    }
};

/**
 * 
 * @param {type} responseText
 * @returns {undefined}
 */
DataAPI.talentcloudDataloaded = function(responseText,isManager){
    Utilities.debug?console.log("data="+responseText):null;
    var data = JSON.parse(responseText);
    var content = data.content;

    var thisContent = new TalentCloudAPI.Content();
    thisContent.title = content.title;
    thisContent.helpLearn = content.helpLearn;
    thisContent.languageSelect = content.languageSelect;
    thisContent.loginLink = content.loginLink;
    thisContent.logoutLink = content.logoutLink;
    thisContent.registerLink = content.registerLink;
    thisContent.applyNow = content.applyNow;
    //thisContent.homeLink = content.homeLink;
    thisContent.profileLink = content.profileLink;
    thisContent.jobPostersLink = content.jobPostersLink;
    thisContent.teamsLink = content.teamsLink;
    thisContent.jobNumber = content.jobNumber;
    thisContent.jobTitle = content.jobTitle;
    thisContent.jobLocation = content.jobLocation;
    thisContent.jobCity = content.jobCity;
    thisContent.jobProvince = content.jobProvince;
    thisContent.jobApplicantsSoFar = content.jobApplicantsSoFar;
    thisContent.jobUnitsToCloseHours = content.jobUnitsToCloseHours;
    thisContent.jobUnitsToCloseDays = content.jobUnitsToCloseDays;
    thisContent.jobUnitsToCloseMonths = content.jobUnitsToCloseMonths;
    thisContent.jobUntilClose = content.jobUntilClose;
    thisContent.jobTerm = content.jobTerm;
    thisContent.viewButton = content.viewButton;
    thisContent.jobSalaryRange = content.jobSalaryRange;
    thisContent.submitApplication = content.submitApplication;
    thisContent.step1 = content.step1;
    thisContent.step2 = content.step2;
    thisContent.step3 = content.step3;
    thisContent.review = content.review;
    thisContent.goToStep2 = content.goToStep2;
    thisContent.goToStep1 = content.goToStep1;
    thisContent.goToStep3 = content.goToStep3;
    thisContent.goToReview = content.goToReview;
    thisContent.createJobPosterWindowTitle = content.createJobPosterWindowTitle;
    thisContent.createProfileWindowTitle = content.createProfileWindowTitle;
    thisContent.required = content.required;
    thisContent.submit = content.submit;
    thisContent.generalInformation = content.generalInformation;
    thisContent.aboutMe = content.aboutMe;
    thisContent.aLittleBitAboutMe = content.aLittleBitAboutMe;
    thisContent.whatImMostProudOfInCareer = content.whatImMostProudOfInCareer;
    thisContent.position = content.position;
    thisContent.department = content.department;
    thisContent.branch = content.branch;
    thisContent.division = content.division;
    thisContent.leadershipStyle = content.leadershipStyle;
    thisContent.myLeadershipStyle = content.myLeadershipStyle;
    thisContent.myApproachToEmployee = content.myApproachToEmployee;
    thisContent.myExpectationsOfEmployees = content.myExpectationsOfEmployees;
    thisContent.myApproachToDecisionMaking = content.myApproachToDecisionMaking;
    thisContent.workExperience = content.workExperience;
    thisContent.education = content.education;
    thisContent.howOftenDoYouReview = content.howOftenDoYouReview;
    thisContent.howOftenDoYouStayLate = content.howOftenDoYouStayLate;
    thisContent.almostNever = content.almostNever;
    thisContent.rarely = content.rarely;
    thisContent.sometimes = content.sometimes;
    thisContent.usually = content.usually;
    thisContent.almostAlways = content.almostAlways;
    thisContent.name = content.name;
    
    //if(siteContent){
        TalentCloudAPI.setContent(thisContent,isManager);
    //}
    
};

/**
 * 
 * @param {type} locale
 * @returns {undefined}
 */
DataAPI.getJobs = function(locale){
    console.log("getting jobs");
    Utilities.debug?console.log("loading jobs"):null;
    var jobs_url = DataAPI.baseURL+"/"+locale+"/getAllJobs";
    console.log('Job URL:   ' + jobs_url);
    getJobs_xhr = new XMLHttpRequest();
    if ("withCredentials" in getJobs_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      getJobs_xhr.open("GET", jobs_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      getJobs_xhr = new XDomainRequest();
      getJobs_xhr.open("GET", jobs_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      getJobs_xhr = null;

    }
    
    getJobs_xhr.addEventListener("progress",
    function(evt){
        DataAPI.updateProgress(evt);
    },false);
    getJobs_xhr.addEventListener("load",DataAPI.loaded,false);
    getJobs_xhr.addEventListener("error",DataAPI.transferFailed,false);
    getJobs_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    getJobs_xhr.open('GET',jobs_url);
    getJobs_xhr.send(null);
};

DataAPI.getJobSeekers = function(locale){
    Utilities.debug?console.log("loading job seekers"):null;
    var jobSeekers_url = DataAPI.baseURL+"/getJobSeekers";
    getJobSeekers_xhr = new XMLHttpRequest();
    if ("withCredentials" in getJobSeekers_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      getJobSeekers_xhr.open("GET", jobSeekers_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      getJobSeekers_xhr = new XDomainRequest();
      getJobSeekers_xhr.open("GET", jobSeekers_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      getJobSeekers_xhr = null;

    }
    
    getJobSeekers_xhr.addEventListener("progress",
    function(evt){
        DataAPI.updateProgress(evt);
    },false);
    getJobSeekers_xhr.addEventListener("load",function(evt){
        DataAPI.loadedManager(getJobSeekers_xhr.response);
    },false);
    getJobSeekers_xhr.addEventListener("error",DataAPI.transferFailed,false);
    getJobSeekers_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    getJobSeekers_xhr.open('GET',jobSeekers_url);
    getJobSeekers_xhr.send(null);
};

DataAPI.getDepartments = function(locale){
    Utilities.debug?console.log("loading departments"):null;
    var departments_url = DataAPI.baseURL+"/"+locale+"/Lookup/department";
    getDepartments_xhr = new XMLHttpRequest();
    if ("withCredentials" in getDepartments_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      getDepartments_xhr.open("GET", departments_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      getDepartments_xhr = new XDomainRequest();
      getDepartments_xhr.open("GET", departments_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      getDepartments_xhr = null;

    }
    
    getDepartments_xhr.addEventListener("progress",
    function(evt){
        DataAPI.updateProgress(evt);
    },false);
    getDepartments_xhr.addEventListener("load",
        function(evt){
            DataAPI.loadedManagerDepartments(getDepartments_xhr.response);
        },false);
    getDepartments_xhr.addEventListener("error",DataAPI.transferFailed,false);
    getDepartments_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    getDepartments_xhr.open('GET',departments_url);
    getDepartments_xhr.send(null);
};
                    
DataAPI.getJobSeekerProfileByUserId = function(authJSON){
    console.log(authJSON.user_id);
    Utilities.debug?console.log("loading job seekers"):null;
    var jobSeekers_url = DataAPI.baseURL+"/getJobSeekerProfile/"+authJSON.user_id;
    //var jobSeekers_url = "/wiremock/mappings/GET_jobSeekers.json";//DELETE before MERGE
    getJobSeekerProfileByUserId_xhr = new XMLHttpRequest();
    if ("withCredentials" in getJobSeekerProfileByUserId_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      getJobSeekerProfileByUserId_xhr.open("GET", jobSeekers_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      getJobSeekerProfileByUserId_xhr = new XDomainRequest();
      getJobSeekerProfileByUserId_xhr.open("GET", jobSeekers_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      getJobSeekerProfileByUserId_xhr = null;

    }
    
    getJobSeekerProfileByUserId_xhr.addEventListener("progress",
    function(evt){
        DataAPI.updateProgress(evt);
    },false);
    getJobSeekerProfileByUserId_xhr.addEventListener("load",
    function(evt){
        if(getJobSeekerProfileByUserId_xhr.readyState === 4){
            if(getJobSeekerProfileByUserId_xhr.status === 200){
                //console.log("populateJobSeekerProfile");
                JobSeekerAPI.populateJobSeekerProfile(getJobSeekerProfileByUserId_xhr.response);
            }
        }
    },false);
    getJobSeekerProfileByUserId_xhr.addEventListener("error",DataAPI.transferFailed,false);
    getJobSeekerProfileByUserId_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    getJobSeekerProfileByUserId_xhr.open('GET',jobSeekers_url);
    getJobSeekerProfileByUserId_xhr.send(null);
};

/**
 * 
 * @param {type} evt
 * @returns {undefined}
 */
DataAPI.updateProgress = function(evt){
    Utilities.debug?console.log(evt):null;
    if(evt.lengthComputable){
        var total = evt.total;
        var value = evt.loaded;
        
        Utilities.debug?console.log(total + "=" + value):null;
    
        var percentComplete = Math.ceil((evt.loaded / evt.total) * 100);
        //var loadingProgress = document.getElementById("loadingProgress");
        //loadingProgress.innerHTML = " " + percentComplete + "%";   
    }
};

/**
 * 
 * @returns {undefined}
 */
DataAPI.loaded = function(){
        JobPostAPI.populateJobObjects(JSON.parse(getJobs_xhr.responseText));
        JobPostAPI.getJobCount();
};

DataAPI.loadedManager = function(response){
    
    setTimeout(function(){
        JobSeekerAPI.populateJobSeekerObjects(JSON.parse(response));
        JobSeekerAPI.getJobSeekerCount();
    }
    ,1000);
    
};

DataAPI.loadedManagerDepartments = function(response){
    setTimeout(function(){
        DepartmentAPI.loadFromJSON(JSON.parse(response));
    }
    ,1000);
};

/**
 * 
 * @returns {undefined}
 */
DataAPI.transferFailed = function(){
    NetworkErrorMessage();
};

/**
 * 
 * @returns {undefined}
 */
DataAPI.transferAborted = function(){
};

/**
 * 
 * @param {type} contactId
 * @returns {undefined}
 */
DataAPI.toggleFavourite = function(jobPostId){
    Utilities.debug?console.log("toggle Favourite contact"):null;
    var watchlist_url = DataAPI.baseURL+"/watchlist/toggle/"+jobPostId;
    var jsonData="";
    
    xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("PUT", watchlist_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("PUT", watchlist_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }

    xhr.open('PUT',watchlist_url);
    xhr.setRequestHeader("Content-Type","application/json");
    
    xhr.addEventListener("progress",DataAPI.updateToggleProgress,false);
    xhr.addEventListener("load",function(){
        DataAPI.toggleFavouriteCallback(jobPostId);
    }
    ,false);
    xhr.addEventListener("error",DataAPI.transferFailed,false);
    xhr.addEventListener("abort",DataAPI.transferAborted,false);

    xhr.send(jsonData);
};

DataAPI.updateToggleProgress = function(evt){
    
};

/**
 * 
 * @param {type} contact
 * @returns {undefined}
 */
DataAPI.toggleFavouriteCallback = function(contact){
        var updatedContact = JSON.parse(contact);
        console.log(updatedContact);
        for(var i = 0; i < ContactAPI.contacts.length; i++) {
            var contactToUpdate = ContactAPI.contacts[i];
            if(contactToUpdate.id === updatedContact.id) {
                if(updatedContact.isFavourite){
                    console.log("true");
                    contactToUpdate.isFavourite = true;
                }else{
                    console.log("false");
                    contactToUpdate.isFavourite = false;
                }
                break;
            }
        };
        
    if(updatedContact.isFavourite){
        ContactAPI.updateFavourite(true, contactToUpdate.id);
    }else{
        ContactAPI.updateFavourite(false, contactToUpdate.id);
    }
};

/**
 * 
 * @param {type} evt
 * @returns {undefined}
 */
DataAPI.updateToggleProgress = function(evt){
    
};

/**
 * 
 * @param {type} contact
 * @returns {undefined}
 */
DataAPI.toggleFavouriteCallback = function(response,jobPostId){
    var jobPostToUpdate = document.getElementById("fav_"+jobPostId);
    if(jobPostToUpdate){
        JobPostAPI.updateFavourite(true, jobPostId);
    }else{
        JobPostAPI.updateFavourite(false, jobPostId);
    }
};

DataAPI.getCSRFTokenValue = function(){
    var csrfToken;
    
    Utilities.debug?console.log("delete contact"):null;
    var csrfToken_url = DataAPI.baseURL+"/delete/"+contactId;
    
    xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("GET", csrfToken_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("GET", csrfToken_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }

    xhr.open('GET',csrfToken_url);
    //xhr.setRequestHeader("Content-Type","application/json");
    xhr.addEventListener("progress",DataAPI.updateProgress,false);
    xhr.addEventListener("load",function(){
        DataAPI.deleteContactCallback(contactId);
    }
    ,false);
    xhr.addEventListener("error",DataAPI.transferFailed,false);
    xhr.addEventListener("abort",DataAPI.transferAborted,false);

    xhr.send(null);
    
    return csrfToken;
};


/**
 * 
 * @returns {undefined}
 */
DataAPI.getContactCount = function(){
    Utilities.debug?console.log("loading contacts"):null;
    var contacts_url = DataAPI.baseURL+"/count";
    
    xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("GET", contacts_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("GET", contacts_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }
    
    xhr.addEventListener("progress",
    function(evt){
        //DataAPI.updateProgress(evt);
    },false);
    xhr.addEventListener("load",function(){
        ContactAPI.updateContacts(xhr.responseText);
    }
    ,false);
    xhr.addEventListener("error",DataAPI.transferFailed,false);
    xhr.addEventListener("abort",DataAPI.transferAborted,false);

    xhr.open('GET',contacts_url);
    xhr.send(null);
};


DataAPI.getJobPoster = function(locale, jobId){
    Utilities.debug?console.log("loading job seekers"):null;
    var jobPoster_url = DataAPI.baseURL+"/"+locale+"/getJobPoster/"+jobId;
    console.log('job poster url: ' + jobPoster_url);
    //var jobSeekers_url = "/wiremock/mappings/GET_jobSeekers.json";//DELETE before MERGE
    xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("GET", jobPoster_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("GET", jobPoster_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }
    
    xhr.addEventListener("progress",
    function(evt){
        DataAPI.updateProgress(evt);
    },false);
    xhr.addEventListener("load",
    function(evt){
        JobPostAPI.populateJobPoster(JSON.parse(xhr.responseText));
    },false);
    xhr.addEventListener("error",DataAPI.transferFailed,false);
    xhr.addEventListener("abort",DataAPI.transferAborted,false);

    xhr.open('GET',jobPoster_url);
    xhr.send(null);
};
