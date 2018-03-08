/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ManagerEventsAPI = {};

var lazyLoaderImg = new Image();
lazyLoaderImg.src = "";

/**
 * 
 * @returns {undefined}
 */
ManagerEventsAPI.onLoadEvents = function(){
    //On initial load - modify state
    
    document.addEventListener("DOMContentLoaded", function(){
        var locale =  TalentCloudAPI.getLanguageFromCookie();
        //console.log(locale);
        if(locale == undefined){
            TalentCloudAPI.setLanguageCookie("en_CA");
        }
        TalentCloudAPI.load();
        
    });
    
    //Handle what happens when new history state popped off stack
    window.onpopstate = function(e){
        //If going to a valid state
        if(e.state){
            ManagerEventsAPI.hideAllLayouts();
            //console.log(e.state.pageInfo);
            if(e.state.pageInfo === 'talent_cloud'){
                ManagerEventsAPI.hideAllLayouts();
                //static content for home page
            } else if(e.state.pageInfo === 'talent_cloud_admin'){
                ManagerEventsAPI.hideAllLayouts();
                //TalentCloudAPI.setNav('homeLinkListItem');
                //TalentCloudAPI.loadAdmin();
                //var jobSeekers = document.getElementById("jobSeekers");
                //jobSeekers.classList.remove("hidden");
            } else if(e.state.pageInfo === 'create_job_poster'){
                CreateJobPosterAPI.showCreateJobPosterForm();
                //TalentCloudAPI.setNav('jobPostersLinkListItem');
            }else if(e.state.pageInfo === 'create_edit_profile'){
                console.log(e.state.pageInfo);
                //console.log(e.state.pageInfo);
                CreateEditProfileAPI.showCreateEditProfile();
                //TalentCloudAPI.setNav('profileLinkListItem');
            }
            document.title = e.state.pageTitle;
        }
    };
};

ManagerEventsAPI.hideAllLayouts = function(){
    TalentCloudAPI.hideAllContent();
};

ManagerEventsAPI.cancelLogin = function(){
    var loginOverlay = document.getElementById("loginOverlay");
    loginOverlay.classList.add("hidden");
};

ManagerEventsAPI.hideBodyOverflow = function(hide){
    var body = document.getElementById("body");
    if(hide){
        body.classList.add("overFlowHidden");
    }else{
        body.classList.remove("overFlowHidden");
    }
};

ManagerEventsAPI.onScroll = function(){
    
};

ManagerEventsAPI.lazyLoader = function(parentElementId){
    var parentElement = document.getElementById(parentElementId);
    
    var loadingWidget = document.createElement("div");
    loadingWidget.setAttribute("class","loadingWidget");
    loadingWidget.classList.add("hidden");
    
    
};

ManagerEventsAPI.setFormFocus = function(fieldId){
    var fieldToFocus = document.getElementById(fieldId);
    fieldToFocus.focus();
};
