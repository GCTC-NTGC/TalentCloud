var AdminDashboardAPI = {};

AdminDashboardAPI.showDashboard = function () {
    var stateInfo = {pageInfo: 'admin_dashboard', pageTitle: 'Talent Cloud: Admin Dashboard'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#AdminDashboard');

    ManagerEventsAPI.hideAllLayouts();

    var dashboardSection = document.getElementById("adminDashboardSection");
    dashboardSection.classList.remove("hidden");

    var locale = TalentCloudAPI.getLanguageFromCookie();
    var userId = UserAPI.getSessionUserAsJSON().user_id;
    DataAPI.getAllJobsByAdminUserId(locale, userId, function (request) {
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

AdminDashboardAPI.populateJobPostersList = function (jobPosters) {
    //Clear previous jobs in dashboard list before populating with new ones
    document.getElementById("adminDashboardJobPosterList").innerHTML = "";

    var jobPosterFragment = document.createDocumentFragment();

    for (var i = 0; i < jobPosters.jobs.length; i++) {
        var jobPoster = jobPosters.jobs[i];

        var jobPosterElement = document.getElementById("adminDashboardJobPosterItemTemplate").cloneNode(true);
        jobPosterElement.classList.remove("template");
        jobPosterElement.setAttribute("id", null);

        jobPosterElement.querySelector(".admin-dashboard__job-poster-title").innerHTML = jobPoster.title;
        var jobApplicationList = jobPosterElement.querySelector(".admin-dashboard__job-application-list");
        jobApplicationList.setAttribute("data-jobposter-id", jobPoster.id);

        //Get job applications for each job poster
        DataAPI.getAllJobApplicationsByJobPosterId(jobPoster.id, function (request) {
            if (request.status === 200) {
                AdminDashboardAPI.populateJobPosterItemWithJobApplications(JSON.parse(request.response));
            }
        });

        jobPosterFragment.appendChild(jobPosterElement);
    }

    document.getElementById("adminDashboardJobPosterList").appendChild(jobPosterFragment);

};

AdminDashboardAPI.populateJobPosterItemWithJobApplications = function (jobApplications) {    
    var jobApplicationWrapperFragment = document.createDocumentFragment();
    for (var j = 0; j < jobApplications.length; j++) {
        var application = jobApplications[j];
        var applicationElement = AdminDashboardAPI.createDashboardApplicationElement(application);
        jobApplicationWrapperFragment.appendChild(applicationElement);
    }
    
    if (jobApplications.length > 0) {
        var jobPosterId = jobApplications[0].job_poster_application.application_job_poster_id;
        var jobApplicationWrapper = document.querySelector(".admin-dashboard__job-application-list[data-jobposter-id=\""+jobPosterId+"\"]");
        jobApplicationWrapper.appendChild(jobApplicationWrapperFragment);
    }
};

AdminDashboardAPI.createDashboardApplicationElement = function(jobApplication) {
    
    var profileId = jobApplication.job_poster_application.application_job_seeker_profile_id;
    var applicationId = jobApplication.job_poster_application.job_poster_application_id;

    var jobApplicationItem = document.getElementById("adminDashboardJobApplicationItemTemplate").cloneNode(true);
    jobApplicationItem.classList.remove("template");
    jobApplicationItem.setAttribute("id", null);
    var title = "Applicant: " + profileId;

    jobApplicationItem.querySelector(".admin-dashboard__job-application-title").innerHTML = title;
        
    //TODO: create links to profile and application preview
        
    return jobApplicationItem;
};