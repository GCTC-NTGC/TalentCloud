var AdminDashboardAPI = {};

AdminDashboardAPI.showDashboard = function() {
    var stateInfo = {pageInfo: 'admin_dashboard', pageTitle: 'Talent Cloud: Admin Dashboard'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#AdminDashboard');

    ManagerEventsAPI.hideAllLayouts();

    var dashboardSection = document.getElementById("adminDashboardSection");
    dashboardSection.classList.remove("hidden");
    
    var locale = TalentCloudAPI.getLanguageFromCookie();
    var userId = UserAPI.getSessionUserAsJSON().user_id;    
    DataAPI.getAllJobsByAdminUserId(locale, userId, function(request) {
       if (request.status === 200) {
           var jobPosters = JSON.parse(request.response);
           AdminDashboardAPI.populateJobPostersList(jobPosters);
       } 
    });

    // New Subpage Hero Scripts
    //TODO - set hero scripts for dashboard
    /*
    Utilities.getHeroElements();

    var posterHeroTitle = document.getElementById("posterHeroTitle");
    posterHeroTitle.classList.remove("hidden");
    posterHeroTitle.setAttribute("aria-hidden", "false");
    */

    // Google Analytics
    //TODO - set analytics for dashboard
    /*
    ga('set', 'page', '/admin/create-job');
    ga('send', 'pageview');
    */
};

AdminDashboardAPI.populateJobPostersList = function(jobPosters) {
    //Clear previous jobs in dashboard list before populating with new ones
    document.getElementById("adminDashboardJobPosterList").innerHTML = "";
    
    var jobPosterFragment = document.createDocumentFragment();
    
    for (var i=0; i < jobPosters.jobs.length; i++) {
        var jobPoster = jobPosters.jobs[i];
        
        var jobPosterElement = document.getElementById("adminDashboardJobPosterItemTemplate").cloneNode(true);
        jobPosterElement.classList.remove("template");
        jobPosterElement.setAttribute("id", null);
        
        jobPosterElement.querySelector(".admin-dashboard__job-poster-title").innerHTML = jobPoster.title;
        
                
        
        jobPosterFragment.appendChild(jobPosterElement);
    }
    
    document.getElementById("adminDashboardJobPosterList").appendChild(jobPosterFragment);
    
};
