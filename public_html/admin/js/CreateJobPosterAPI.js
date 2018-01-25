/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var CreateJobPosterAPI = {};
CreateJobPosterAPI.jobObjEnglish = new JobPostAPI.JobPost();
CreateJobPosterAPI.jobObjFrench = new JobPostAPI.JobPost();




//This should be in the JobPosterAPI or TalentCloudAPI-not user related
CreateJobPosterAPI.showManagerCreateJobPosterForm = function(linkElement){
    var title = linkElement.innerHTML;
    var url = linkElement.getAttribute('href');
    var stateInfo = {pageInfo: 'create_job_poster', pageTitle: 'Talent Cloud: Create Job Poster'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobPoster');//last parameter just replaced with #Register instead of url
    
    var createJobPosterDialog = document.getElementById("createJobPosterOverlay");
    createJobPosterDialog.classList.remove("hidden");
    CreateJobPosterAPI.firstLoad();
    CreateJobPosterAPI.getLookupData("province");
    CreateJobPosterAPI.getLookupData("city");
    CreateJobPosterAPI.getLookupData("jobterm");
    
};

CreateJobPosterAPI.selectedUnit = function(newID){
    var option = document.getElementById(newID);
    option.checked = true;
};




//below are the functions for the tabbed layout of the 'create job poster' page for managers
CreateJobPosterAPI.goToStep = function(stepId) {
    var stepGroups = document.getElementsByClassName('stepGroup');
    //console.log("+   " + stepGroups);
    
    for (var s = 0; s < stepGroups.length; s++) {
        var stepGroup = stepGroups[s];
        //console.log(stepGroup);
        if (!stepGroup.classList.contains('hidden')) {
            stepGroup.classList.add('hidden');
        }
        if (stepGroup.id === stepId) {
            stepGroup.classList.remove('hidden');
        }
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

CreateJobPosterAPI.firstLoad = function() {
    DepartmentAPI.filterCreateJobPosterDepartments(true);
    
};

CreateJobPosterAPI.validateStep1 = function() {
    var valid = true;
    
    var jobTitle = document.getElementById("createJobPoster_jobTitle").value;
    CreateJobPosterAPI.jobObjEnglish.title = jobTitle;
    
    var jobTitle_fr = document.getElementById("createJobPoster_jobTitle_fr").value;
    CreateJobPosterAPI.jobObjFrench.title = jobTitle_fr;
    
    var closeDate = document.getElementById("createJobPoster_closeDate").value;
    CreateJobPosterAPI.jobObjEnglish.close_date_time = closeDate;
    
    var closeDate_fr = document.getElementById("createJobPoster_closeDate_fr").value;
    CreateJobPosterAPI.jobObjFrench.close_date_time = closeDate_fr;
    
    var department = document.getElementById("createJobPoster_department").value;
    CreateJobPosterAPI.jobObjEnglish.department = department;
    
    var department_fr = document.getElementById("createJobPoster_department_fr").value;
    CreateJobPosterAPI.jobObjFrench.department = department_fr;
    
    
    if (valid) {
        CreateJobPosterAPI.goToStep('step2');
        //CreateJobPosterAPI.stepHighlight("createJobPosterStep1Label");
    }
};
CreateJobPosterAPI.validateStep2 = function() {
    var valid = true;
    
    var city = document.getElementById("createJobPoster_city").value;
    CreateJobPosterAPI.jobObjEnglish.location_city = city;
    
    var city_fr = document.getElementById("createJobPoster_city_fr").value;
    CreateJobPosterAPI.jobObjFrench.location_city = city_fr;
    
    var province = document.getElementById("createJobPoster_province").value;
    CreateJobPosterAPI.jobObjEnglish.location_province = province;
    
    var province_fr = document.getElementById("createJobPoster_province_fr").value;
    CreateJobPosterAPI.jobObjFrench.location_province = province_fr;
    
    var termQuantity = document.getElementById("createJobPoster_termQuantity").value;
    CreateJobPosterAPI.jobObjEnglish.term_qty = termQuantity;
    
    var termQuantity_fr = document.getElementById("createJobPoster_termQuantity_fr").value;
    CreateJobPosterAPI.jobObjFrench.term_qty = termQuantity_fr;
    
    var termUnits = document.getElementsByName("createJobPoster_termUnits");
    for(var i = 0;i < termUnits.length;i++){
        if(termUnits[i].checked){
            CreateJobPosterAPI.jobObjEnglish.term_units = termUnits[i].value;
            break;
        }
    }
    
    var termUnits_fr = document.getElementsByName("createJobPoster_termUnits_fr");
    for(var i = 0;i < termUnits_fr.length;i++){
        if(termUnits_fr[i].checked){
            CreateJobPosterAPI.jobObjFrench.term_units = termUnits_fr[i].value;
            break;
        }
    }
    
    if (valid) {
        CreateJobPosterAPI.goToStep('step3');
        //CreateJobPosterAPI.stepHighlight("createJobPosterStep1Label");
    }
};
CreateJobPosterAPI.validateStep3 = function() {
    var valid = true;
    
    var remuneration = document.getElementById("createJobPoster_remunerationType").value;
    CreateJobPosterAPI.jobObjEnglish.remuneration_type = remuneration;
    
    var remuneration_fr = document.getElementById("createJobPoster_remunerationType_fr").value;
    CreateJobPosterAPI.jobObjFrench.remuneration_type = remuneration_fr;
    
    var remunerationLow = document.getElementById("createJobPoster_remunerationLowRange").value;
    CreateJobPosterAPI.jobObjEnglish.remuneration_range_low = remunerationLow;
    
    var remunerationLow_fr = document.getElementById("createJobPoster_remunerationLowRange_fr").value;
    CreateJobPosterAPI.jobObjFrench.remuneration_range_low = remunerationLow_fr;
    
    var remunerationHigh = document.getElementById("createJobPoster_remunerationHighRange").value;
    CreateJobPosterAPI.jobObjEnglish.remuneration_range_high = remunerationHigh;
    
    var remunerationHigh_fr = document.getElementById("createJobPoster_remunerationHighRange_fr").value;
    CreateJobPosterAPI.jobObjFrench.remuneration_range_high = remunerationHigh_fr;
    
     CreateJobPosterAPI.jobObjEnglish.id = 9990099;
     CreateJobPosterAPI.jobObjFrench.id = 9990100;
    
    if (valid) {
        
        //Create demo english
        var demoAreaEnglish = document.getElementById("createJobPosterDemoAreaEnglish");
        demoAreaEnglish.innerHTML = "";
        demoAreaEnglish.appendChild(JobPostAPI.populateJob(CreateJobPosterAPI.jobObjEnglish, true, "en_CA"));
        
        //Create demo french
        var demoAreaFrench = document.getElementById("createJobPosterDemoAreaFrench");
        demoAreaFrench.innerHTML = "";
        demoAreaFrench.appendChild(JobPostAPI.populateJob(CreateJobPosterAPI.jobObjFrench, true, "fr_CA"));
        
        CreateJobPosterAPI.goToStep('step4');
    }
};

CreateJobPosterAPI.validateStep4 = function() {
    var valid = true;
    
    if (valid) {
        CreateJobPosterAPI.submitJobPosterForm();
    }
};


CreateJobPosterAPI.submitJobPosterForm = function() {
    
    //call REST API to submit data and hide then clear and hide the modal dialog.  Do not use form submission.
    var createJobPosterOverlay = document.getElementById("createJobPosterOverlay");
    createJobPosterOverlay.classList.add("hidden");
    CreateJobPosterAPI.goToStep('step1');
    Utilities.clearFormFields("createJobPosterForm");
    return false;
};

CreateJobPosterAPI.hideCreateJobPosterForm = function(){
    var jobPosterCreation = document.getElementById("createJobPosterOverlay");    
    jobPosterCreation.classList.add("hidden");
};

CreateJobPosterAPI.getLookupData = function(lookupType){
    var locale = Utilities.getCookieByName("locale");
    
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

    } else if (typeof XDomainRequest != "undefined") {

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
        CreateJobPosterAPI.populateLookups(lookupType,lookupData_xhr.response);
    },false);
    lookupData_xhr.addEventListener("error",DataAPI.transferFailed,false);
    lookupData_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    lookupData_xhr.open('GET',lookup_URL);
    lookupData_xhr.send(authToken);
};

CreateJobPosterAPI.populateLookups = function(lookupType,response){
    //console.log(JSON.parse(response));
    var data = JSON.parse(response);
    
    if(lookupType === "city"){
        var citiesSelect = document.getElementById("createJobPoster_city");
        for(var city in data) {
            var option = document.createElement("option");
            option.value = city;
            option.innerHTML = data[city];
            citiesSelect.appendChild(option);
        }
        
    }
    
    if(lookupType === "province"){
        var provincesSelect = document.getElementById("createJobPoster_province");
        for(var province in data) {
            var option = document.createElement("option");
            option.value = province;
            option.innerHTML = data[province];
            provincesSelect.appendChild(option);
        }
    }
    
    if(lookupType === "jobterm"){
        var jobTermSelect = document.getElementById("jobterms");
        for(var jobterm in data) {
            var optionRow = document.createElement("div");
            var option = document.createElement("input");
            option.setAttribute("id","jobterm_"+jobterm);
            option.setAttribute("type","radio");
            option.setAttribute("name","createJobPoster_termUnits");
            option.value = jobterm;
            var optionLabel = document.createElement("label");
            optionLabel.setAttribute("for","jobterm_"+jobterm)
            optionLabel.innerHTML = data[jobterm];
            optionRow.appendChild(option);
            optionRow.appendChild(optionLabel);
            jobTermSelect.appendChild(optionRow);
        }
    }
    
};

CreateJobPosterAPI.createJobPoster = function(){
    var createJobPoster_URL = DataAPI.baseURL+"/putJobPoster";
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
      talentcloudData_xhr.open("GET", createJobPoster_URL);

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

    talentcloudData_xhr.open('POST',createJobPoster_URL);
    talentcloudData_xhr.send(authToken);
}