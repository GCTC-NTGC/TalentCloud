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

/**
 *
 * @param {String} url - the url endpoint of the request
 * @param {String} restMethod - 'GET', 'PUT', 'POST', or 'DELETE'
 * @param {String:String map} headersMap - Map of extra reuqest headers for the
 *      request. By default, Content-type and Accept are set to 'application/json',
 *      though this can be overridden with headersMap.
 * @param {Object} payload - the payload of the request
 * @param {function} requestCallback - this function will be called upon the'load'
 *      event, with the XMLHttpRequest as the single argument
 * @param {boolean} isSecondAttempt - this will be true if a request is being 
 *      retried for some reason. Otherwise, should be left false or undefined.
 * @return {undefined}
 */
DataAPI.sendRequest = function(url, restMethod, headersMap, payload, requestCallback, isSecondAttempt) {
    var request = new XMLHttpRequest();
    if ("withCredentials" in request) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        request.open(restMethod, url);

    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        request = new XDomainRequest();
        request.open(restMethod, url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        request = null;
        // TODO: indicate to user that browser is not supported
    }
    //Default to application/json if content-type not included in headersMap
    if (!headersMap['Content-type'] && !headersMap['Content-Type'])
        request.setRequestHeader("Content-type", "application/json");
    if (!headersMap['Accept'])
        request.setRequestHeader("Accept", "application/json");
    //Set custom headers
    var keys = Object.keys(headersMap)
    for (var i=0; i<keys.length; i++) {
        request.setRequestHeader(keys[i], headersMap[keys[i]]);
    }

    request.addEventListener("progress", DataAPI.updateProgress, false);
    request.addEventListener("error", DataAPI.transferFailed, false);
    request.addEventListener("abort", DataAPI.transferAborted, false);
    request.addEventListener("load", function() {
        //If there was an authentication error, retry, but only once (to avoid
        //  infinite retries)
        if (!isSecondAttempt && request.status === 401) {
            DataAPI.sendRequest(url, restMethod, headersMap, payload, requestCallback, true);            
        } else {
           requestCallback(request); 
        }
    },false);

    request.send(payload);
};

DataAPI.getStaticContent = function(locale, requestCallback){
    var talentcloudData_URL = DataAPI.baseURL+"/"+locale+"/getContent";
    DataAPI.sendRequest(talentcloudData_URL, "GET", {'Content-type': 'application/json; charset=utf-8'}, null, requestCallback);
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
 * @param {type} locale
 * @returns {undefined}
 */
DataAPI.getJobs = function(responseCallback){
    var locale = TalentCloudAPI.getLanguageFromCookie();
    var jobs_url = DataAPI.baseURL+"/"+locale+"/getAllJobs";
    DataAPI.sendRequest(jobs_url, 'GET', {}, null, responseCallback);
};

DataAPI.getDepartments = function(locale){
    var departments_url = DataAPI.baseURL+"/"+locale+"/Lookup/department";
    DataAPI.sendRequest(departments_url, 'GET', {}, null, function(request){
        DataAPI.loadedManagerDepartments(request.response);
    });
};

/**
 *
 * @param {int} user_id
 * @param {function} successfulResponseCallback - this will be called if the
 *  request comes back with readyState==4 and status==200
 * @return {undefined}
 */
DataAPI.getJobSeekerProfileByUserId = function(user_id, successfulResponseCallback){
    console.log("getJobSeekerProfileByUserId");
    Utilities.debug?console.log("loading job seekers"):null;
    var jobSeekers_url = DataAPI.baseURL+"/getJobSeekerProfileByUser/"+user_id;
    DataAPI.sendRequest(jobSeekers_url, "GET", {}, null, function(request) {
        if(request.readyState === 4 && request.status === 200){
            successfulResponseCallback(request.response);
        }
    });
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

DataAPI.getJobPoster = function(locale, jobId, responseCallback){
    Utilities.debug?console.log("loading job seekers"):null;
    var jobPoster_url = DataAPI.baseURL+"/"+locale+"/getJobPoster/"+jobId;
    DataAPI.sendRequest(jobPoster_url, 'GET', {}, null, function(request) {
        responseCallback(request.response);
    });
};

DataAPI.getAllJobsByAdminUserId = function(locale, userId, requestCallback) {
    var url = [DataAPI.baseURL, locale, "getAllJobsByAdminUser", userId].join('/');
    DataAPI.sendRequest(url, "GET", {}, null, requestCallback);
};

DataAPI.getAllJobApplicationsByJobPosterId = function(jobPosterId, requestCallback) {
    var url = [DataAPI.baseURL, 'getJobApplicationsByJobPoster', jobPosterId].join('/');
    DataAPI.sendRequest(url, "GET", {}, null, requestCallback);
}

DataAPI.getManagerProfile = function(userId, responseCallback) {
    var manager_profile_url = DataAPI.baseURL + "/getManagerProfile/"+userId;
    DataAPI.sendRequest(manager_profile_url, "GET", {}, null, function(request) {
        responseCallback(request.response);
    });
};

/**
 *
 * @param {JobApplicationAPI.JobApplication} jobApplication
 * @param {function} responseCallback
 * @return {undefined}
 */
DataAPI.createJobApplication = function(jobApplication, requestCallback) {
    var url = DataAPI.baseURL + '/postJobApplication';
    DataAPI.sendRequest(url, "POST", {}, JSON.stringify(jobApplication), requestCallback);
};


DataAPI.saveJobApplicationByJobAndUser = function(jobApplication, jobPosterId, userId, requestCallback) {
    var url = [DataAPI.baseURL, "putApplicationForJob", jobPosterId, "forUser", userId].join("/");
    DataAPI.sendRequest(url, "PUT", {}, JSON.stringify(jobApplication), requestCallback);
};

DataAPI.getJobApplicationByJobAndUser = function(jobPosterId, userId, requestCallback) {
    var url = [DataAPI.baseURL, "getApplicationForJob", jobPosterId, "forUser", userId].join("/");
    DataAPI.sendRequest(url, "GET", {}, null, requestCallback);
};

DataAPI.submitJobApplication = function(applicationId, requestCallback) {
    var url = [DataAPI.baseURL, "submitJobApplication", applicationId].join("/");
    DataAPI.sendRequest(url, "POST", {}, null, requestCallback);
};

DataAPI.getFullJobApplicationByJobAndUser = function(jobPosterId, userId, requestCallback) {
    var locale = TalentCloudAPI.getLanguageFromCookie();
    var url = [DataAPI.baseURL, locale, "getFullApplicationForJob", jobPosterId, "forUser", userId].join("/");
    DataAPI.sendRequest(url, "GET", {}, null, requestCallback);
};

DataAPI.getFullJobApplication = function(jobPosterApplicationId, requestCallback) {
    var locale = TalentCloudAPI.getLanguageFromCookie();
    var url = [DataAPI.baseURL, locale, "getFullApplication", jobPosterApplicationId].join("/");
    DataAPI.sendRequest(url, "GET", {}, null, requestCallback);
};

/**
 *
 * @param {int} managerProfileId
 * @param {CreateWorkEnvironment.WorkEnvironment} workplaceEnvironment
 * @param {function} responseCallback
 * @return {undefined}
 */
DataAPI.submitWorkplaceEnvironment = function(managerProfileId, workplaceEnvironment, responseCallback) {
    var url = DataAPI.baseURL + '/putWorkEnvironmentByManagerProfile/' + managerProfileId;
    DataAPI.sendRequest(url, "PUT", {}, JSON.stringify(workplaceEnvironment), function(request) {
        responseCallback(request.response);
    });
};

/**
 *
 * @param {int} managerProfileId
 * @param {function} responseCallback
 * @return {undefined}
 */
DataAPI.getWorkplaceEnvironment = function(managerProfileId, responseCallback) {
    var url = DataAPI.baseURL + '/getWorkEnvironmentByManagerProfile/' + managerProfileId;
    DataAPI.sendRequest(url, 'GET', {}, null, function(request) {
        responseCallback(request.response);
    });
};

DataAPI.getSkillDeclarationsForApplication = function(applicationId, requestCallback) {
    var url = [DataAPI.baseURL, "getDeclarationsForApplication", applicationId].join("/");
    DataAPI.sendRequest(url, "GET", {}, null, requestCallback);
};

DataAPI.saveSkillDeclaration = function(skillDeclaration, criteriaId, applicationId, requestCallback) {
    var url = DataAPI.baseURL + "/putDeclarationForApplication/" + applicationId + "/forCriteria/" + criteriaId;
    DataAPI.sendRequest(url, 'PUT', {}, JSON.stringify(skillDeclaration), requestCallback);
};

DataAPI.deleteSkillDeclaration = function(criteriaId, applicationId, requestCallback) {
    var url = DataAPI.baseURL + "/deleteDeclarationForApplication/" + applicationId + "/forCriteria/" + criteriaId;
    DataAPI.sendRequest(url, 'DELETE', {}, null, requestCallback);
};

DataAPI.getMicroReferencesForApplication = function(applicationId, requestCallback) {
    var locale = TalentCloudAPI.getLanguageFromCookie();
    var url = [DataAPI.baseURL, locale, "getAllMicroReferencesForApplication", applicationId].join("/");
    DataAPI.sendRequest(url, "GET", {}, null, requestCallback);
};

DataAPI.saveMicroReference = function(microReference, criteriaId, applicationId, requestCallback) {
    var url = DataAPI.baseURL + "/putMicroReferenceForApplication/" + applicationId + "/forCriteria/" + criteriaId;
    DataAPI.sendRequest(url, 'PUT', {}, JSON.stringify(microReference), requestCallback);
};

DataAPI.deleteMicroReference = function(criteriaId, applicationId, requestCallback) {
    var url = DataAPI.baseURL + "/deleteMicroReferenceForApplication/" + applicationId + "/forCriteria/" + criteriaId;
    DataAPI.sendRequest(url, 'DELETE', {}, null, requestCallback);
};

DataAPI.getSkillSamplesForApplication = function(applicationId, requestCallback) {
    var locale = TalentCloudAPI.getLanguageFromCookie();
    var url = [DataAPI.baseURL, locale, "getAllWorkSamplesForApplication", applicationId].join("/");
    DataAPI.sendRequest(url, "GET", {}, null, requestCallback);
};

DataAPI.saveSkillSample = function(skillSample, criteriaId, applicationId, requestCallback) {
    var url = DataAPI.baseURL + "/putWorkSampleForApplication/" + applicationId + "/forCriteria/" + criteriaId;
    DataAPI.sendRequest(url, 'PUT', {}, JSON.stringify(skillSample), requestCallback);
};

DataAPI.deleteSkillSample = function(criteriaId, applicationId, requestCallback) {
    var url = DataAPI.baseURL + "/deleteWorkSampleForApplication/" + applicationId + "/forCriteria/" + criteriaId;
    DataAPI.sendRequest(url, 'DELETE', {}, null, requestCallback);
};
