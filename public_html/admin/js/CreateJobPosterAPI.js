/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var CreateJobPosterAPI = {};

CreateJobPosterAPI.jobPosterObj = null;

CreateJobPosterAPI.lookupMap = {};

CreateJobPosterAPI.JobPostNonLocalized = function(id, title, title_fr, department_id, province_id, city, city_fr, open_date_time, close_date_time, start_date, term_qty, remuneration_range_low, remuneration_range_high) {
    this.id = id;
    this.title = {};
    this.title.en_CA = title;
    this.title.fr_CA = title_fr;
    this.department_id = department_id;
    this.province_id = province_id;
    this.city = {};
    this.city.en_CA = city;
    this.city.fr_CA = city_fr;
    this.open_date_time = open_date_time;
    this.close_date_time = close_date_time;
    this.start_date = start_date;
    this.term_qty = term_qty;
    this.remuneration_range_low = remuneration_range_low;
    this.remuneration_range_high = remuneration_range_high;
    
    this.term_units_id = 2; //default to months for now
    this.job_min_level_id = 1; //default to CS1
    this.job_max_level_id = 3; //default to CS3
};

CreateJobPosterAPI.localizeJobPost = function(jobPostNonLocalized, locale) {
    var jp = jobPostNonLocalized;
   
    return new JobPostAPI.JobPost(
            jp.id, 
            jp.title[locale],   
            jp.appplicants_to_date, 
            jp.close_date_time, 
            CreateJobPosterAPI.getLocalizedLookupValueFromId("department", locale, jp.department_id),
            jp.city[locale],
            CreateJobPosterAPI.getLocalizedLookupValueFromId("province", locale, jp.province_id),
            jp.term_qty,
            CreateJobPosterAPI.getLocalizedLookupValueFromId("jobterm", locale, jp.term_units_id),
            jp.remuneration_type,
            jp.remuneration_range_low,
            jp.remuneration_range_high
            );
};

CreateJobPosterAPI.showCreateJobPosterForm = function(){
    var stateInfo = {pageInfo: 'create_job_poster', pageTitle: 'Talent Cloud: Create Job Poster'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobPoster');
    
    TalentCloudAPI.hideAllContent();
    
    document.getElementById("createJobPoster_openDate").value = Utilities.formatDateTimeLocal(new Date());
    
    var createJobPosterSection = document.getElementById("createJobPosterSection");
    createJobPosterSection.classList.remove("hidden");
};

CreateJobPosterAPI.loadLookupData = function() {
    var locales = ["en_CA", "fr_CA"];
    var lookupTypes = ["department", "province", "jobterm"];
    for(i in locales) {
        for (j in lookupTypes) {
            var locale = locales[i];
            var lookupType = lookupTypes[j];
            CreateJobPosterAPI.getLookupData(lookupType, locale);
        }
    }
};

CreateJobPosterAPI.selectedUnit = function(newID){
    var option = document.getElementById(newID);
    option.checked = true;
};

CreateJobPosterAPI.getLookupData = function(lookupType, locale){    
    var lookup_URL = DataAPI.baseURL+"/"+locale+"/Lookup/"+lookupType;
    //console.log('Talent cloud url data:   ' + talentcloudData_URL);
    //var talentcloudData_URL = "/wiremock/mappings/GET_ContentByLocale.json";//TEMPORARY for bh.browse_job_seekers branch
    var authToken = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
    }
    var lookupData_xhr = new XMLHttpRequest();
    if ("withCredentials" in lookupData_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      lookupData_xhr.open("GET", lookup_URL);

    } else if (typeof XDomainRequest !== "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      lookupData_xhr = new XDomainRequest();
      lookupData_xhr.open("GET", lookup_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      lookupData_xhr = null;

    }
    
    lookupData_xhr.addEventListener("progress",
    function(evt){
        DataAPI.talentcloudDataUpdateProgress(evt);
    },false);
    lookupData_xhr.addEventListener("load",
    function(evt){
        CreateJobPosterAPI.addToLookupMap(lookupType, locale, lookupData_xhr.response);
        var userLocale = Utilities.getCookieByName("locale");
        if (userLocale === locale) {
            CreateJobPosterAPI.populateLookups(lookupType,lookupData_xhr.response);
        }
    },false);
    lookupData_xhr.addEventListener("error",DataAPI.transferFailed,false);
    lookupData_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    lookupData_xhr.open('GET',lookup_URL);
    lookupData_xhr.send(authToken);
};

CreateJobPosterAPI.addToLookupMap = function(lookupType, locale, response) {
    if (!CreateJobPosterAPI.lookupMap[lookupType]) {
        CreateJobPosterAPI.lookupMap[lookupType] = {};
    }
    CreateJobPosterAPI.lookupMap[lookupType][locale] = JSON.parse(response);
};

CreateJobPosterAPI.populateLookups = function(lookupType,response){
    //console.log(JSON.parse(response));
    var data = JSON.parse(response);
    
    if(lookupType === "department" && document.getElementById("createJobPoster_department")){
        var departmentSelect = document.getElementById("createJobPoster_department");
        Utilities.clearSelectOptions(departmentSelect);
        for(var department in data) {
            var option = document.createElement("option");
            option.value = data[department].id;
            option.innerHTML = data[department].value;
            departmentSelect.appendChild(option);
        }
    }
    
    if(lookupType === "city" && document.getElementById("createJobPoster_city")){
        var citiesSelect = document.getElementById("createJobPoster_city");
        Utilities.clearSelectOptions(citiesSelect);
        for(var city in data) {
            var option = document.createElement("option");
            option.value = data[city].id;
            option.innerHTML = data[city].value;
            citiesSelect.appendChild(option);
        }
        
    }
    
    if(lookupType === "province" && document.getElementById("createJobPoster_province")){
        var provincesSelect = document.getElementById("createJobPoster_province");
        Utilities.clearSelectOptions(provincesSelect);
        for(var province in data) {
            var option = document.createElement("option");
            option.value = data[province].id;
            option.innerHTML = data[province].value;
            provincesSelect.appendChild(option);
        }
    }
    
    if(lookupType === "jobterm" && document.getElementById("jobterms")){
        var jobTermSelect = document.getElementById("jobterms");
        Utilities.clearSelectOptions(jobTermSelect);
        for(var jobterm in data) {
            var jobterm_name = data[jobterm].value;
            var optionRow = document.createElement("div");
            var option = document.createElement("input");
            option.setAttribute("id","jobterm_"+jobterm_name);
            option.setAttribute("type","radio");
            option.setAttribute("name","createJobPoster_termUnits");
            option.value = data[jobterm].id;
            var optionLabel = document.createElement("label");
            optionLabel.setAttribute("for","jobterm_"+jobterm_name);
            optionLabel.value = data[jobterm].id;
            optionLabel.innerHTML = jobterm_name;
            optionRow.appendChild(option);
            optionRow.appendChild(optionLabel);
            jobTermSelect.appendChild(optionRow);
        }
    }  
};

CreateJobPosterAPI.getLocalizedLookupValueFromId = function(lookeupType, locale, id) {
    var elements = CreateJobPosterAPI.lookupMap[lookeupType][locale];
    for (i in elements) {
        if (elements[i].id == id) {
            return elements[i].value;
        }
    }
    return null;
};

CreateJobPosterAPI.getLookupIdFromLocalizedValue = function(lookeupType, locale, value) {
    var elements = CreateJobPosterAPI.lookupMap[lookeupType][locale];
    for (i in elements) {
        if (elements[i].value == value) {
            return elements[i].id;
        }
    }
    return null;
};


//below are the functions for the tabbed layout of the 'create job poster' page for managers
CreateJobPosterAPI.goToTab = function(tabId) {
    var stepGroups = document.getElementsByClassName('stepGroup');
    //console.log("+   " + stepGroups);
    
    if (tabId === "createJobPosterReviewTab") {
        CreateJobPosterAPI.populateReviewTab();
    }
    
    for (var s = 0; s < stepGroups.length; s++) {
        var stepGroup = stepGroups[s];
        //console.log(stepGroup);
        if (!stepGroup.classList.contains('hidden')) {
            stepGroup.classList.add('hidden');
        }
        if (stepGroup.id === tabId) {
            stepGroup.classList.remove('hidden');
        }
    }
};

CreateJobPosterAPI.populateReviewTab = function() {
    CreateJobPosterAPI.populateJobPosterObjFromForm();
    
    if (CreateJobPosterAPI.jobPosterObj) {
        var demoAreaEnglish = document.getElementById("createJobPosterDemoAreaEnglish");
        demoAreaEnglish.innerHTML = "";
        var jobEnglish = CreateJobPosterAPI.localizeJobPost(CreateJobPosterAPI.jobPosterObj, "en_CA");
        demoAreaEnglish.appendChild(JobPostAPI.populateJob(jobEnglish, true, "en_CA"));

        //Create demo french
        var demoAreaFrench = document.getElementById("createJobPosterDemoAreaFrench");
        demoAreaFrench.innerHTML = "";
        var jobFrench = CreateJobPosterAPI.localizeJobPost(CreateJobPosterAPI.jobPosterObj, "fr_CA");
        demoAreaFrench.appendChild(JobPostAPI.populateJob(jobFrench, true, "fr_CA"));
    } else {
        window.alert("Job Poster must be submitted first");
    }
};

CreateJobPosterAPI.stepHighlight = function(stepID){
    var s1 = document.getElementById("createJobPosterStep1Label");
    s1.classList.remove("create-job-poster-tab-current");
    var s2 = document.getElementById("createJobPosterStep2Label");
    s2.classList.remove("create-job-poster-tab-current");
    var s3 = document.getElementById("createJobPosterStep3Label");
    s3.classList.remove("create-job-poster-tab-current");
    var s4 = document.getElementById("createJobPosterStep4Label");
    s4.classList.remove("create-job-poster-tab-current");
    
    var current = document.getElementById(stepID);
    current.classList.add("create-job-poster-tab-current");
};

CreateJobPosterAPI.validateJobPosterForm = function() { 
    CreateJobPosterAPI.populateJobPosterObjFromForm();
    
    //TODO: VALIDATION 
    var valid = true; 
    if (valid) { 
        CreateJobPosterAPI.submitJobPosterForm(); 
    } 
};

CreateJobPosterAPI.populateJobPosterObjFromForm = function() {
    var id = 0;
    //Keep same id if it already exists
    if (CreateJobPosterAPI.jobPosterObj) {
        id = CreateJobPosterAPI.jobPosterObj.id;
    }
     
    var title = document.getElementById("createJobPoster_jobTitle").value; 
     
    var title_fr = document.getElementById("createJobPoster_jobTitle_fr").value; 
    
    var department_id = document.getElementById("createJobPoster_department").value; 
    //var department_id = CreateJobPosterAPI.getLookupIdFromLocalizedValue("department", locale, department);
    
    var province_id = document.getElementById("createJobPoster_province").value;
    //var province_id = CreateJobPosterAPI.getLookupIdFromLocalizedValue("province", locale, province);
    
    var city = document.getElementById("createJobPoster_city").value;
    
    var city_fr = document.getElementById("createJobPoster_city_fr").value;
    
    var open_date_time = document.getElementById("createJobPoster_openDate").value; 
     
    var close_date_time = document.getElementById("createJobPoster_closeDate").value; 
    
    var start_date = document.getElementById("createJobPoster_startDate").value; 
    
    var term_qty = document.getElementById("createJobPoster_termQuantity").value;
    
    var remuneration_range_low = document.getElementById("createJobPoster_remunerationLowRange").value;
    
    var remuneration_range_high = document.getElementById("createJobPoster_remunerationHighRange").value;
    
    CreateJobPosterAPI.jobPosterObj = new CreateJobPosterAPI.JobPostNonLocalized(id, title, title_fr, department_id, province_id, city, city_fr, open_date_time, close_date_time, start_date, term_qty, remuneration_range_low, remuneration_range_high);
}


CreateJobPosterAPI.submitJobPosterForm = function() {
    
    if (CreateJobPosterAPI.jobPosterObj) {
        var jobPosterJson = JSON.stringify(CreateJobPosterAPI.jobPosterObj);
        
        //TODO: use the following code instead when updateJobPoster is ready
        /*
        if (CreateJobPosterAPI.jobObj.id > 0) {
            CreateJobPosterAPI.updateJobPoster(jobPosterJson);
        } else {
            CreateJobPosterAPI.createJobPoster(jobPosterJson);
        }
        */
       
        CreateJobPosterAPI.createJobPoster(jobPosterJson);
        return true;
    } else {
        return false;
    }
};

CreateJobPosterAPI.hideCreateJobPosterForm = function(){
    var jobPosterCreation = document.getElementById("createJobPosterOverlay");    
    jobPosterCreation.classList.add("hidden");
};

CreateJobPosterAPI.createJobPoster = function(jobPosterJson){
    var createJobPoster_URL = DataAPI.baseURL+"/putJobPoster";
    //console.log('Talent cloud url data:   ' + talentcloudData_URL);
    //var talentcloudData_URL = "/wiremock/mappings/GET_ContentByLocale.json";//TEMPORARY for bh.browse_job_seekers branch
    var authToken = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
    }
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("POST", createJobPoster_URL);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("POST", createJobPoster_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }
    xhr.open('POST',createJobPoster_URL);
    xhr.setRequestHeader('x-access-token', authToken.access_token);
    
    xhr.addEventListener("progress",
    function(evt){
        DataAPI.talentcloudDataUpdateProgress(evt);
    },false);
    xhr.addEventListener("load",
    function(evt){
        CreateJobPosterAPI.postJobPosterComplete(xhr.response);
    },false);
    xhr.addEventListener("error",DataAPI.transferFailed,false);
    xhr.addEventListener("abort",DataAPI.transferAborted,false);

    xhr.send(jobPosterJson);
};

CreateJobPosterAPI.postJobPosterComplete = function(response) {
    //TODO
    console.log(response);
};