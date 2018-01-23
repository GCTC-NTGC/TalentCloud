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
        //UserAPI.authenticate();
        //document.getElementById("login_email").focus();
        var locale =  TalentCloudAPI.getLanguageFromCookie();
        console.log(locale);
        if(locale == undefined){
            TalentCloudAPI.setLanguageCookie("en_CA");
        }
        TalentCloudAPI.load();
        
    });
    
    window.addEventListener("beforeunload", function (event) {
        UserAPI.logout();
    });
    
    //Handle what happens when new history state popped off stack
    window.onpopstate = function(e){
        //If going to a valid state
        if(e.state){
            ManagerEventsAPI.hideAllLayouts();
            if(e.state.pageInfo === 'talent_cloud'){
                //ManagerEventsAPI.hideAllLayouts();//bad practice to have this empty...
            } else if(e.state.pageInfo === 'register'){
                var registerFormOverlay = document.getElementById("registerFormOverlay");
                registerFormOverlay.classList.remove("hidden");
            } else if(e.state.pageInfo === 'user_login'){
                var loginAccount = document.getElementById("loginOverlay");
                loginAccount.classList.remove("hidden");
            } else if(e.state.pageInfo === 'create_job_poster'){
                var createJobPoster = document.getElementById("createJobPosterOverlay");
                createJobPoster.classList.remove("hidden");
            }
            document.title = e.state.pageTitle;
        }
    };
};

ManagerEventsAPI.hideAllLayouts = function(){
    var overlays = ["loginOverlay", "registerFormOverlay", "createJobPosterOverlay"];
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
    if(!hide){
        body.classList.remove("overFlowHidden");
    }else{
        body.classList.add("overFlowHidden");
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
