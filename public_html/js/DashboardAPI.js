/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DashboardAPI = {};

DashboardAPI.yourApplications = {};

DashboardAPI.showDashboard = function(){
    var stateInfo = {pageInfo: 'dashboard', pageTitle: 'Talent Cloud: Dashboard'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#Dashboard');
    
    EventsAPI.hideAllLayouts();
    
    var dashboardSection = document.getElementById("dashboardSection");
    dashboardSection.classList.remove("hidden");
    
    DashboardAPI.getApplicationsByJobSeekerId();
};

DashboardAPI.getApplicationsByJobSeekerId = function(){
    
    
    
};

DashboardAPI.populateDashboard = function(dashboardData){
    var dashboardContainer = document.getElementById("dashboardContainer");
    
    var yourApplications = document.getElementById("yourApplications");
    
    
};