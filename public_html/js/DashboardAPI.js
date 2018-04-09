/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DashboardAPI = {};

DashboardAPI.yourApplications = {};

DashboardAPI.application = function(job_poster_id, job_poster_title, job_poster_close_date_time, user_id, user_manager_profile_id, department_details_name, application_status){
    this.job_poster_id = job_poster_id;
    this.job_poster_title = job_poster_title;
    this.job_poster_close_date_time = job_poster_close_date_time;
    this.user_id = user_id;
    this.user_manager_profile_id = user_manager_profile_id;
    this.department_details_name = department_details_name;
    this.application_status = application_status;
};

DashboardAPI.version = "v1";
//Live URL
DashboardAPI.baseURL = "/tc/api/"+DashboardAPI.version+"";

DashboardAPI.showDashboard = function(){
    var stateInfo = {pageInfo: 'dashboard', pageTitle: 'Talent Cloud: Dashboard'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#Dashboard');
    
    EventsAPI.hideAllLayouts();
    window.scrollTo(0,0);
    
    var dashboardSection = document.getElementById("dashboardSection");
    dashboardSection.classList.remove("hidden");
    
    DashboardAPI.getApplicationsByUuserId();
};

/**
 * 
 * @returns {undefined}
 */
DashboardAPI.getApplicationsByUuserId = function(){
    
    //does the request need to be secure?
    
    var authToken = "";
    var user_id = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthToken();
    }
    
    if(UserAPI.hasSessionUser()){
        user_id = UserAPI.getSessionUserAsJSON().user_id;
    }
    
    //what url am I connecting to get the data? - see tc/.htaccess file
    var dashboard_url = DashboardAPI.baseURL + "/" + locale + "/dashboard/" + user_id;
    
    var dashboard_xhr = new XMLHttpRequest();
    
    if ("withCredentials" in dashboard_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      dashboard_xhr.open("GET", dashboard_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      dashboard_xhr = new XDomainRequest();
      
      dashboard_xhr.open("GET", dashboard_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      dashboard_xhr = null;

    }
    
    dashboard_xhr.open('GET',dashboard_url);
    
    dashboard_xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    dashboard_xhr.setRequestHeader("Accept", "application/json");
    dashboard_xhr.setRequestHeader("Authorization", "Bearer " + authToken);
    
    dashboard_xhr.addEventListener("progress",
        function(evt){
            DashboardAPI.dashboardDataUpdateProgress(evt);
        },false
    );
    
    dashboard_xhr.addEventListener("load",
        function(evt){
            DashboardAPI.dashboardDataLoaded(dashboard_xhr.responseText);
        },false
    );
    
    dashboard_xhr.addEventListener("error",DataAPI.transferFailed,false);
    
    dashboard_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    
    dashboard_xhr.send();
    
};

DashboardAPI.dashboardDataLoaded = function(response){
    var responseJSON = JSON.parse(response);
    DashboardAPI.populateDashboard(responseJSON);
};

/**
 * 
 * @returns {undefined}
 */
DashboardAPI.transferFailed = function(){
    NetworkErrorMessage();
};

/**
 * 
 * @returns {undefined}
 */
DashboardAPI.transferAborted = function(){
    
};


/**
 * 
 * @param {type} evt
 * @returns {undefined}
 */
DashboardAPI.dashboardDataUpdateProgress = function(evt){
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

DashboardAPI.populateDashboard = function(dashboardJSON){
    
    //get yourApplications section from DOM
    var yourApplicationsSection = document.getElementById("yourApplications");
    yourApplicationsSection.setAttribute("tabIndex","0");
    yourApplicationsSection.innerHTML = "";
    for(var d = 0; d < dashboardJSON.length; d++){
        var application = dashboardJSON[d];
        
        var applicationRow = document.createElement("div");
        applicationRow.setAttribute("id","ya_job_poster_id_"+application.job_poster_id);
        applicationRow.setAttribute("tabIndex","0");
        if(d === (dashboardJSON.length - 1)){
            applicationRow.setAttribute("class","dashboardJobSummaryLast");
        }else{
            applicationRow.setAttribute("class","dashboardJobSummary");
        }
        
        var applicationTitleDept = document.createElement("div");
        applicationTitleDept.setAttribute("id","ya_title_dept_"+application.job_poster_id);
        applicationTitleDept.setAttribute("class","dashboardTitleDepartmentWrapper");
        
        var applicationTitle = document.createElement("div");
        applicationTitle.setAttribute("id","ya_title_"+application.job_poster_id);
        applicationTitle.setAttribute("class","dashboardJobSummaryTitle");
        applicationTitle.setAttribute("tabIndex","0");
        applicationTitle.innerHTML = application.job_poster_title;
        applicationTitleDept.appendChild(applicationTitle);
        
        var applicationDept = document.createElement("div");
        applicationDept.setAttribute("id","ya_dept_"+application.job_poster_id);
        applicationDept.setAttribute("class","dashboardJobSummaryDepartment");
        applicationDept.setAttribute("tabIndex","0");
        applicationDept.innerHTML = " - " + application.department_details_name;
        applicationTitleDept.appendChild(applicationDept);
        
        applicationRow.appendChild(applicationTitleDept);
        
        var applicationManager = document.createElement("a");
        applicationManager.setAttribute("id","ya_manager_"+application.job_poster_id);
        applicationManager.setAttribute("href","javascript:void(0)");
        applicationManager.setAttribute("onclick","ManagerProfileAPI.showManagerProfile('"+application.manager_user_id+"');");
        applicationManager.setAttribute("class","dashBoardHiringManagerWrapper");
        
        applicationRow.appendChild(applicationManager);
        
        var applicationSubmitted = document.createElement("div");
        applicationSubmitted.setAttribute("id","ya_submitted_"+application.job_poster_id);
        applicationSubmitted.setAttribute("class","dashboardJobSubmitted");
        
        var applicationStatus = document.createElement("p");
        applicationStatus.setAttribute("id","ya_status_"+application.job_poster_id);
        applicationStatus.setAttribute("class","dashboardJobStatus");
        applicationStatus.setAttribute("tabIndex","0");
        var statusInnerHTML = application.application_status;
        
        var closeStatus = document.createElement("span");
        closeStatus.setAttribute("id","ya_close_status_"+application.job_poster_id);
        closeStatus.setAttribute("class","dashboardJobCloseStatus");
        var closeInfo = Utilities.timeRemaining(application.job_poster_close_date_time);
        var closesIn = TalentCloudAPI.getLanguageFromCookie() === "en_CA"?"Closes in " : "Ferme dans ";
        var closed = TalentCloudAPI.getLanguageFromCookie() === "en_CA"?"Closed " : "Fermé ";
        var closeInnerHTML = closeInfo !== 0?closesIn + closeInfo:closed;
        closeStatus.innerHTML = closeInnerHTML;
        
        applicationStatus.innerHTML = statusInnerHTML + " - " + closeStatus.outerHTML;
        
        applicationSubmitted.appendChild(applicationStatus);
        
        applicationRow.appendChild(applicationSubmitted);

        yourApplicationsSection.appendChild(applicationRow);
       
        DashboardAPI.populateManagerProfile(application);
    }
};
    
DashboardAPI.populateManagerProfile = function(application){
    //console.log(application);


    var hiringManagerWidget = document.createElement("a")
    hiringManagerWidget.setAttribute("id","ya_manager_widget_"+application.job_poster_id);
    hiringManagerWidget.setAttribute("class","hiringManagerWidget");
       
    var hiringManagerProfilePicSmall = document.createElement("img");
    hiringManagerProfilePicSmall.setAttribute("id","ya_manager_profilepic_"+application.job_poster_id);
    hiringManagerProfilePicSmall.setAttribute("class","hiringManagerProfilePicSmall");
    hiringManagerProfilePicSmall.setAttribute("tabIndex","0");
    ProfilePicAPI.refreshProfilePic(application.manager_user_id, hiringManagerProfilePicSmall);
    hiringManagerWidget.appendChild(hiringManagerProfilePicSmall);
    
    var hiringManagerWidgetName = document.createElement("div")
    hiringManagerWidgetName.setAttribute("id","ya_manager_name_"+application.job_poster_id);
    hiringManagerWidgetName.setAttribute("class","hiringManagerName");
    hiringManagerWidgetName.setAttribute("tabIndex","0");
    hiringManagerWidget.appendChild(hiringManagerWidgetName);
    
    //Start requests for Hiring Manager data
    //Load Hiring Manager Name
    DataAPI.getUser(application.manager_user_id, function(response) {
       var managerUser = JSON.parse(response);
       console.log(managerUser);
       document.getElementById("ya_manager_name_"+application.job_poster_id).innerHTML = managerUser.user.firstname + ' ' + managerUser.user.lastname;
    });
    
    var ya_job_poster_manager_element = document.getElementById("ya_manager_"+application.job_poster_id);
    ya_job_poster_manager_element.appendChild(hiringManagerWidget);
    
};