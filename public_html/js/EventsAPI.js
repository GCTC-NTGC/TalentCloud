/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var EventsAPI = {};

var lazyLoaderImg = new Image();
lazyLoaderImg.src = "";

/**
 * 
 * @returns {undefined}
 */
EventsAPI.onLoadEvents = function(){
    //On initial load - modify state
    
    document.addEventListener("DOMContentLoaded", function(){
        var locale =  TalentCloudAPI.getLanguageFromCookie();
        if(locale == undefined){
            TalentCloudAPI.setLanguageCookie("en_CA");
        }
        TalentCloudAPI.load();
    });
    
    //Handle what happens when new history state popped off stack
    window.onpopstate = function(e){
        //If going to a valid state
        if(e.state){
            EventsAPI.hideAllLayouts();
            TalentCloudAPI.hideAllContent();
            if(e.state.pageInfo === 'talent_cloud'){
                //Special case, where admin or manager home page is different than user home page
                DataAPI.getJobs(locale);
            } else if(e.state.pageInfo === 'talent_cloud_admin'){
                TalentCloudAPI.loadManager();
                var jobSeekers = document.getElementById("jobSeekers");
                jobSeekers.classList.remove("hidden");
            } else if(e.state.pageInfo === 'talent_cloud_manager'){
                TalentCloudAPI.loadManager();
                var createJobPoster = document.getElementById("jobSeekers");
                createJobPoster.classList.remove("hidden");
            } else if(e.state.pageInfo === 'register'){
                var registerFormOverlay = document.getElementById("registerFormOverlay");
                registerFormOverlay.classList.remove("hidden");
            } else if(e.state.pageInfo === 'user_login'){
                var loginAccount = document.getElementById("loginOverlay");
                loginAccount.classList.remove("hidden");
            } else if(e.state.pageInfo === 'create_job_poster'){
                var createJobPoster = document.getElementById("createJobPosterOverlay");
                createJobPoster.classList.remove("hidden");
            } else if(e.state.pageInfo === 'user_create_edit_profile'){
                var createJobPosterDialog = document.getElementById("createEditProfile");
                createJobPosterDialog.classList.remove("hidden");
            } else if(e.state.pageInfo === 'manager_view_profile'){
                var createJobPosterDialog = document.getElementById("viewProfile");
                createJobPosterDialog.classList.remove("hidden");
            } else if(e.state.pageInfo === 'view_job_poster'){
                var viewJobPosterOverlay = document.getElementById("viewJobPosterOverlay");
                viewJobPosterOverlay.classList.remove("hidden");
            } else if(e.state.pageInfo === 'view_job_poster_application'){
                var viewJobPosterApplicationOverlay = document.getElementById("viewJobPosterApplicationOverlay");
            } else if(e.state.pageInfo === 'apply_job_poster'){
                var viewJobPosterOverlay = document.getElementById("jobPosterApplication"); 
                viewJobPosterOverlay.classList.remove("hidden");
            }
            document.title = e.state.pageTitle;
        }
    };
};

EventsAPI.hideAllLayouts = function(){
    if(window.location.href.includes(TalentCloudAPI.roles.manager)){
        var overlays = ["loginOverlay", "registerFormOverlay", "createEditProfile", "viewProfile", "jobSeekers"];
        for(var i = 0;i < overlays.length;i++){
            var overlayDOM = document.getElementById(overlays[i]);
            overlayDOM.classList.add("hidden");
        }
    }else if(window.location.href.includes(TalentCloudAPI.roles.admin)){
        var overlays = ["loginOverlay", "registerFormOverlay", "createEditProfile", "viewProfile", "jobSeekers"];
        for(var i = 0;i < overlays.length;i++){
            var overlayDOM = document.getElementById(overlays[i]);
            overlayDOM.classList.add("hidden");
        }
    }
    else{
        var overlays = ["loginOverlay", "registerFormOverlay","viewJobPosterOverlay","viewJobPosterApplicationOverlay"];
        for(var i = 0;i < overlays.length;i++){
            var overlayDOM = document.getElementById(overlays[i]);
            overlayDOM.classList.add("hidden");
        }
    }
    
};

EventsAPI.cancelLogin = function(){
    var loginOverlay = document.getElementById("loginOverlay");
    loginOverlay.classList.add("hidden");
};

EventsAPI.hideBodyOverflow = function(hide){
    var body = document.getElementById("body");
    if(hide){
        body.classList.add("overFlowHidden");
    }else{
        body.classList.remove("overFlowHidden");
    }
};

EventsAPI.setFormFocus = function(fieldId){
    var fieldToFocus = document.getElementById(fieldId);
    fieldToFocus.focus();
};

EventsAPI.clearJobsContainer = function(){
    var containers = ['noJobs','loadingJobs','jobList','viewJobPosterApplicationOverlay','jobPosterApplication','jobSeekerProfileWrapperWindow'];
    for(var c = 0; c < containers.length; c++){
        var container = document.getElementById(containers[c]);
        if(!container.classList.contains('hidden')){
            container.classList.add('hidden');
        }
    }
};