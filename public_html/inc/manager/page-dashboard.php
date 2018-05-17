<?php // BEGIN - Create Job Poster Section ?>
<section class="pageContent hidden" id="adminDashboardSection">

    <div class="pageBody">
        <h3>My Job Posters</h3>
        <ul class="admin-dashboard__job-poster-list" id="adminDashboardJobPosterList"></ul>
        
        <div class="template admin-dashboard__job-poster" id="adminDashboardJobPosterItemTemplate">
            <p class="admin-dashboard__job-poster-title"></p>
            <ul class="admin-dashboard__job-application-list"></ul>
        </div>
      
        <div class="hidden" id="adminDeashboardJobApplicationItemTemplate">
            <div class="admin-dashboard__job-application-item">
                <p class="admin-dashboard__job-application-title"></p>
                <a class="admin-dashboard__job-application-profile-link"></a>
                <a class="admin-dashboard__job-application-link"></a>
            </div>
        </div>
    </div>
</section>