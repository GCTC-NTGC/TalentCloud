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
        console.log(locale);
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
            console.log(e.state.pageInfo);
            if(e.state.pageInfo === 'talent_cloud'){
                TalentCloudAPI.loadManager();
                //ManagerEventsAPI.hideAllLayouts();//bad practice to have this empty...
            } else if(e.state.pageInfo === 'register'){
                TalentCloudAPI.loadManager();
                var registerFormOverlay = document.getElementById("registerFormOverlay");
                registerFormOverlay.classList.remove("hidden");
            } else if(e.state.pageInfo === 'user_login'){
                TalentCloudAPI.loadManager();
                var loginAccount = document.getElementById("loginOverlay");
                loginAccount.classList.remove("hidden");
            } else if(e.state.pageInfo === 'create_job_poster'){
                TalentCloudAPI.loadManager();
                var createJobPoster = document.getElementById("createJobPosterOverlay");
                createJobPoster.classList.remove("hidden");
            }else if(e.state.pageInfo === 'user_create_edit_profile'){
                console.log(e.state.pageInfo);
                TalentCloudAPI.loadManager();
                CreateEditProfileAPI.showCreateEditProfile();
            }
            document.title = e.state.pageTitle;
        }
    };
};

ManagerEventsAPI.hideAllLayouts = function(){
    var overlays = ["loginOverlay", "registerFormOverlay", "createJobPosterOverlay","createEditProfile"];
    for(var i = 0;i < overlays.length;i++){
        var overlayDOM = document.getElementById(overlays[i]);
        overlayDOM.classList.add("hidden");
    }
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
