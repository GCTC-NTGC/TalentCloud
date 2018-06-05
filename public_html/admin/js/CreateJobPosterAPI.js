/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var CreateJobPosterAPI = {};

CreateJobPosterAPI.jobPosterObj = null;

CreateJobPosterAPI.version = "v1";
CreateJobPosterAPI.baseURL = "/tc/api/"+CreateJobPosterAPI.version+"";

CreateJobPosterAPI.JobPosterQuestion = function(question, description) {
    this.question = question;
    this.description = description;
};

CreateJobPosterAPI.JobPostNonLocalized = function(
        id,
        manager_user_id,
        title,
        title_fr,
        department_id,
        province_id,
        branch_en,
        branch_fr,
        division_en,
        division_fr,
        city,
        city_fr,
        open_date_time,
        close_date_time,
        start_date,
        term_qty,
        remuneration_range_low,
        remuneration_range_high,
        impact,
        impact_fr,
        key_tasks_en,
        key_tasks_fr,
        core_competencies_en,
        core_competencies_fr,
        developing_competencies_en,
        developing_competencies_fr,
        questions_en,
        questions_fr,
        classification,
        clearance_id,
        language_id
    ) {
    this.id = id;
    this.manager_user_id = manager_user_id;
    this.title = {};
    this.title.en_CA = title;
    this.title.fr_CA = title_fr;
    this.department_id = department_id;
    this.province_id = province_id;
    this.branch = {};
    this.branch.en_CA = branch_en;
    this.branch.fr_CA = branch_fr;
    this.division = {};
    this.division.en_CA = division_en;
    this.division.fr_CA = division_fr;
    this.city = {};
    this.city.en_CA = city;
    this.city.fr_CA = city_fr;
    this.open_date_time = open_date_time;
    this.close_date_time = close_date_time;
    this.start_date = start_date;
    this.term_qty = term_qty;
    this.remuneration_range_low = remuneration_range_low;
    this.remuneration_range_high = remuneration_range_high;
    this.impact = {};
    this.impact.en_CA = impact;
    this.impact.fr_CA = impact_fr;
    this.key_tasks = {};
    this.key_tasks.en_CA = key_tasks_en;
    this.key_tasks.fr_CA = key_tasks_fr;
    this.core_competencies = {};
    this.core_competencies.en_CA = core_competencies_en;
    this.core_competencies.fr_CA = core_competencies_fr;
    this.developing_competencies = {};
    this.developing_competencies.en_CA = developing_competencies_en;
    this.developing_competencies.fr_CA = developing_competencies_fr;
    this.questions = {};
    this.questions.en_CA = questions_en;
    this.questions.fr_CA = questions_fr;
    this.classification = classification;
    this.clearance_id = clearance_id;
    this.language_id = language_id;

    this.term_units_id = 2; //default to months for now
    this.job_min_level_id = 1; //default to CS1
    this.job_max_level_id = 3; //default to CS3
};

CreateJobPosterAPI.localizeJobPost = function(jobPostNonLocalized, locale) {
    var jp = jobPostNonLocalized;

    return new JobPostAPI.JobPost(
            jp.id,
            jp.manager_user_id,
            jp.title[locale],
            jp.appplicants_to_date,
            jp.close_date_time,
            LookupAPI.getLocalizedLookupValue("department", jp.department_id),
            jp.branch[locale],
            jp.division[locale],
            jp.city[locale],
            LookupAPI.getLocalizedLookupValue("province", jp.province_id),
            jp.term_qty,
            LookupAPI.getLocalizedLookupValue("jobterm", jp.term_units_id),
            jp.remuneration_type,
            jp.remuneration_range_low,
            jp.remuneration_range_high,
            jp.impact[locale],
            jp.key_tasks[locale],
            jp.core_competencies[locale],
            jp.developing_competencies[locale],
            jp.questions[locale],
            jp.classification,
            LookupAPI.getLocalizedLookupValue("clearance", jp.clearance_id),
            LookupAPI.getLocalizedLookupValue("language", jp.language_id),
            jp.start_date
            );
};

CreateJobPosterAPI.showCreateJobPosterForm = function(){
    var stateInfo = {pageInfo: 'create_job_poster', pageTitle: 'Talent Cloud: Create Job Poster'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobPoster');

    ManagerEventsAPI.hideAllLayouts();

    document.getElementById("createJobPoster_openDate").value = Utilities.formatDateTimeLocal(new Date());

    CreateJobPosterAPI.getManagerProfile(CreateJobPosterAPI.prepopulateValuesFromManagerProfile);

    var createJobPosterSection = document.getElementById("createJobPosterSection");
    createJobPosterSection.classList.remove("hidden");

    // New Subpage Hero Scripts

    Utilities.getHeroElements();

    var posterHeroTitle = document.getElementById("posterHeroTitle");
    posterHeroTitle.classList.remove("hidden");
    posterHeroTitle.setAttribute("aria-hidden", "false");

    // Google Analytics

    ga('set', 'page', '/admin/create-job');
    ga('send', 'pageview');

};

CreateJobPosterAPI.localizeCreateJobPosterForm = function(siteContent) {
    LookupAPI.populateDropdown("department", "createJobPoster_department");
    LookupAPI.populateDropdown("province", "createJobPoster_province");
    LookupAPI.populateDropdown("clearance", "createJobPoster_clearance");
    LookupAPI.populateDropdown("language", "createJobPoster_language");

    document.getElementById("createJobPoster_branch_labelName").innerHTML = siteContent.branch;
    document.getElementById("createJobPoster_branch_fr_labelName").innerHTML = siteContent.branch;
    document.getElementById("createJobPoster_division_labelName").innerHTML = siteContent.division;
    document.getElementById("createJobPoster_division_fr_labelName").innerHTML = siteContent.division;

    document.getElementById("createJobPoster_questions_labelName").innerHTML = siteContent.openEndedQuestions;
    document.getElementById("createJobPoster_questions_fr_labelName").innerHTML = siteContent.openEndedQuestions;

}

CreateJobPosterAPI.prepopulateValuesFromManagerProfile = function(managerProfileResponse) {
    if (managerProfileResponse) {
        var response = JSON.parse(managerProfileResponse);

        document.getElementById("createJobPoster_department").value = response.manager_profile.user_manager_profile_department_id;

        document.getElementById("createJobPoster_branch").value = response.manager_profile_details.en_CA.user_manager_profile_details_branch;
        document.getElementById("createJobPoster_branch_fr").value = response.manager_profile_details.fr_CA.user_manager_profile_details_branch;
        document.getElementById("createJobPoster_division").value = response.manager_profile_details.en_CA.user_manager_profile_details_division;
        document.getElementById("createJobPoster_division_fr").value = response.manager_profile_details.fr_CA.user_manager_profile_details_division;

    }
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
        demoAreaEnglish.appendChild(JobPostAPI.populateJobSummary(jobEnglish, true, "en_CA"));

        //Create demo french
        var demoAreaFrench = document.getElementById("createJobPosterDemoAreaFrench");
        demoAreaFrench.innerHTML = "";
        var jobFrench = CreateJobPosterAPI.localizeJobPost(CreateJobPosterAPI.jobPosterObj, "fr_CA");
        demoAreaFrench.appendChild(JobPostAPI.populateJobSummary(jobFrench, true, "fr_CA"));
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

    var jp = CreateJobPosterAPI.jobPosterObj;

    // TAL-150
    var valid = FormValidationAPI.validateJobPoster(jp.title.en_CA, jp.title.fr_CA, jp.department_id, jp.branch.en_CA, jp.branch.fr_CA, jp.division.en_CA,
        jp.division.fr_CA, jp.province_id, jp.city.en_CA, jp.city.fr_CA, jp.open_date_time, jp.close_date_time, jp.start_date, jp.term_qty,
        jp.remuneration_range_low, jp.remuneration_range_high, jp.classification, jp.clearance_id, jp.language_id);
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

    var manager_user_id = 0;
    if (UserAPI.hasSessionUser()) {
        //For now, assume there is a one-to-one relation between users and hiring managers
        manager_user_id = UserAPI.getSessionUserAsJSON().user_id;
    }

    var title = document.getElementById("createJobPoster_jobTitle").value;

    var title_fr = document.getElementById("createJobPoster_jobTitle_fr").value;

    var department_id = document.getElementById("createJobPoster_department").value;

    var province_id = document.getElementById("createJobPoster_province").value;

    var branch_en = document.getElementById("createJobPoster_branch").value;
    var branch_fr = document.getElementById("createJobPoster_branch_fr").value;

    var division_en = document.getElementById("createJobPoster_division").value;
    var division_fr = document.getElementById("createJobPoster_division_fr").value;

    var city = document.getElementById("createJobPoster_city").value;

    var city_fr = document.getElementById("createJobPoster_city").value;

    var open_date_time = document.getElementById("createJobPoster_openDate").value;

    var close_date_time = document.getElementById("createJobPoster_closeDate").value;

    var start_date = document.getElementById("createJobPoster_startDate").value;

    var term_qty = document.getElementById("createJobPoster_termQuantity").value;

    var remuneration_range_low = document.getElementById("createJobPoster_remunerationLowRange").value;

    var remuneration_range_high = document.getElementById("createJobPoster_remunerationHighRange").value;

    var impact = document.getElementById("createJobPoster_impact").value;

    var impact_fr = document.getElementById("createJobPoster_impact_fr").value;

    //TODO: actually get list items from ui
    var key_tasks_en = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_keyTasks");
    var key_tasks_fr = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_keyTasks_fr");

    var core_competencies_en = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_coreCompetencies");
    var core_competencies_fr = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_coreCompetencies_fr");

    var developing_competencies_en = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_developingCompetencies");
    var developing_competencies_fr = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_developingCompetencies_fr");

    //Get questions & descriptions from repeaters
    var questionWrappers = document.querySelectorAll(".job-poster__open-question");
    
    var questionObjs_en = [];
    var questionObjs_fr = [];
    
    for (var i=0; i<questionWrappers.length; i++) {
        var question_en = questionWrappers[i].querySelector(".job-poster__open-question-wrapper--english .job-poster__open-question-input").value;
        var question_fr = questionWrappers[i].querySelector(".job-poster__open-question-wrapper--french .job-poster__open-question-input").value;
        
        var description_en = questionWrappers[i].querySelector(".job-poster__open-question-wrapper--english .job-poster__open-question-description-input").value;
        var description_fr = questionWrappers[i].querySelector(".job-poster__open-question-wrapper--french .job-poster__open-question-description-input").value;
        
        if (question_en && question_fr) {
            questionObjs_en.push(new CreateJobPosterAPI.JobPosterQuestion(question_en, description_en));
            questionObjs_fr.push(new CreateJobPosterAPI.JobPosterQuestion(question_fr, description_fr));
        }         
    }
   
    // TAL-150
    var classification = document.getElementById("createJobPoster_classification").value;

    var clearance_id = document.getElementById("createJobPoster_clearance").value;

    var language_id = document.getElementById("createJobPoster_language").value;

    CreateJobPosterAPI.jobPosterObj = new CreateJobPosterAPI.JobPostNonLocalized(
        id, manager_user_id, title, title_fr, department_id, province_id, branch_en, branch_fr, division_en, division_fr, city, city_fr, open_date_time,
        close_date_time, start_date, term_qty, remuneration_range_low, remuneration_range_high, impact, impact_fr,key_tasks_en, key_tasks_fr,
        core_competencies_en, core_competencies_fr, developing_competencies_en, developing_competencies_fr, questionObjs_en, questionObjs_fr, classification,
        clearance_id, language_id);
}

CreateJobPosterAPI.getTextareaContentsAsList = function(textareaElementId) {
    var list = document.getElementById(textareaElementId).value.split(/\r|\n/);
    for (var i=(list.length - 1); i >= 0; i--) {
        list[i] = list[i].trim();
        if (list[i] === "") {
            list.splice(i, 1);
        }
    }
    return list;
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
    var createJobPoster_URL = CreateJobPosterAPI.baseURL+"/createJobPoster";
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
    CreateJobPosterAPI.jobPosterObj.id = JSON.parse(response).job_poster_id;

    CreateJobPosterAPI.goToTab("createJobPosterReviewTab");



};

CreateJobPosterAPI.getManagerProfile = function(responseCallback){
    if (UserAPI.hasSessionUser()) {
        var user = UserAPI.getSessionUserAsJSON();
        var authToken = UserAPI.getAuthTokenAsJSON();
        var user_id = user["user_id"];
        var manager_profile_url = CreateJobPosterAPI.baseURL + "/getManagerProfile/"+user_id;
        var manager_profile_xhr = new XMLHttpRequest();
        if ("withCredentials" in manager_profile_xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            manager_profile_xhr.open("GET", manager_profile_url);

        } else if (typeof XDomainRequest != "undefined") {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            manager_profile_xhr = new XDomainRequest();
            manager_profile_xhr.open("GET", manager_profile_url);
        } else {
            // Otherwise, CORS is not supported by the browser.
            manager_profile_xhr = null;
            // TODO: indicate to user that browser is not supported
        }

        manager_profile_xhr.open('GET', manager_profile_url);
        manager_profile_xhr.setRequestHeader("Content-type", "application/json");
        manager_profile_xhr.setRequestHeader("Accept", "application/json");
        manager_profile_xhr.setRequestHeader('x-access-token', authToken.access_token);
        //xhr.setRequestHeader('X-CSRF-Token', UserAPI.getCSRFTokenValue());
        manager_profile_xhr.addEventListener("progress", UserAPI.updateProgress, false);
        manager_profile_xhr.addEventListener("load", function () {
            responseCallback(manager_profile_xhr.response);
        }, false);
        manager_profile_xhr.addEventListener("error", UserAPI.transferFailed, false);
        manager_profile_xhr.addEventListener("abort", UserAPI.transferAborted, false);

        manager_profile_xhr.send(null);
    }
};
