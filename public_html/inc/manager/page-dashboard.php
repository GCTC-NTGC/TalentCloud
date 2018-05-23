<?php // BEGIN - Create Job Poster Section  ?>
<section class="admin-dashboard hidden" id="adminDashboardSection">

    <div class="block-container">

        <h3 class="admin-dashboard__section-title">My Job Posters</h3>
        <ul class="admin-dashboard__job-poster-list" id="adminDashboardJobPosterList"></ul>

        <div class="template admin-dashboard__job-poster" id="adminDashboardJobPosterItemTemplate">
            <p class="admin-dashboard__job-poster-title"></p>
            <ul class="admin-dashboard__job-application-list"></ul>
            <hr>
        </div>

        <div class="admin-dashboard__job-application-item template" id="adminDashboardJobApplicationItemTemplate">
            <p class="admin-dashboard__job-application-title"></p>
            <a class="admin-dashboard__job-application-profile-link"></a>
            <a class="admin-dashboard__job-application-link"></a>
        </div>

    </div>

</section>