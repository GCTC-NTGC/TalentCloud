/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DashboardAPI = {};

DashboardAPI.showDashboard = function(){
    var stateInfo = {pageInfo: 'dashboard', pageTitle: 'Talent Cloud: Dashboard'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#Dashboard');
    
    ManagerEventsAPI.hideAllLayouts();
    
    var dashboardSection = document.getElementById("dashboardSection");
    dashboardSection.classList.remove("hidden");
};

DashboardAPI.getJobPostersByManagerId = function(){
    
};