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
            //console.log(e.state.pageInfo);
            TalentCloudAPI.hideAllContent();
            if(e.state.pageInfo === 'talent_cloud'){
                EventsAPI.hideAllLayouts();
                document.getElementById("navigationHomeLinkWrapper").classList.add("active");
                //static content for home page
            } else if(e.state.pageInfo === 'talent_cloud_admin'){
                EventsAPI.hideAllLayouts();
                TalentCloudAPI.loadAdmin();
                //var jobSeekers = document.getElementById("jobSeekers");
                //jobSeekers.classList.remove("hidden");
            } else if(e.state.pageInfo === 'talent_cloud_manager'){
                EventsAPI.hideAllLayouts();
                TalentCloudAPI.loadManager();
                //var createJobPoster = document.getElementById("jobSeekers");
                //createJobPoster.classList.remove("hidden");
            } else if(e.state.pageInfo === 'register'){
                var registerFormOverlay = document.getElementById("registerFormOverlay");
                registerFormOverlay.classList.remove("hidden");
                document.getElementById("navigationRegisterLinkWrapper").classList.add("active");
                modalSize();
            } else if(e.state.pageInfo === 'user_login'){
                var loginAccount = document.getElementById("loginOverlay");
                loginAccount.classList.remove("hidden");
                document.getElementById("navigationLoginLinkWrapper").classList.add("active");
                modalSize();
            } else if(e.state.pageInfo === 'create_job_poster'){
                EventsAPI.hideAllLayouts();
                var createJobPoster = document.getElementById("createJobPosterOverlay");
                createJobPoster.classList.remove("hidden");
                modalSize();
            } else if(e.state.pageInfo === 'user_create_edit_profile'){
                EventsAPI.hideAllLayouts();
                var createJobPosterSection = document.getElementById("createEditProfileSection");
                createJobPosterSection.classList.remove("hidden");
            } else if(e.state.pageInfo === 'manager_view_profile'){
                //var createJobPosterDialog = document.getElementById("viewProfile");
                //createJobPosterDialog.classList.remove("hidden");
            } else if(e.state.pageInfo === 'browse_jobs') {
                EventsAPI.hideAllLayouts();
                JobPostAPI.showBrowseJobs();
                document.getElementById("navigationBrowseLinkWrapper").classList.add("active");
            } else if(e.state.pageInfo === 'view_job_poster'){
                EventsAPI.hideAllLayouts();
                JobPostAPI.viewJobPoster(e.state.jobId);
                var jobPosterDatapointsSection = document.getElementById("jobPosterDatapointsSection");
                jobPosterDatapointsSection.classList.remove("hidden");
            } else if(e.state.pageInfo === 'view_job_poster_application'){
                EventsAPI.hideAllLayouts();
                //var viewJobPosterApplicationOverlay = document.getElementById("viewJobPosterApplicationOverlay");
                //viewJobPosterApplicationOverlay.remove("hidden");
            } else if(e.state.pageInfo === 'apply_job_poster'){
                EventsAPI.hideAllLayouts();
                var viewJobPosterOverlay = document.getElementById("jobPosterApplication");
                viewJobPosterOverlay.classList.remove("hidden");
                modalSize();
            }
            document.title = e.state.pageTitle;
        }
    };
};

EventsAPI.hideAllLayouts = function(){
    TalentCloudAPI.hideAllContent();
};

EventsAPI.cancelLogin = function(){
    var loginOverlay = document.getElementById("loginOverlay");
    loginOverlay.classList.add("hidden");
};

EventsAPI.hideBodyOverflow = function(hide){
    var body = document.getElementsByTagName("body")[0];
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

EventsAPI.goBack = function(){
    window.history.back();
}
