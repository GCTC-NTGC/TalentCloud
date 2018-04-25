<section class="page-hero">

    <nav class="page-hero__navigation">

        <div class="flex-grid">

            <div class="box lg-1of6" id="navigationHomeLinkWrapper" aria-hidden="false">
                <a href="/" id="navigationHomeLink">Home</a>
            </div>

            <div class="box lg-1of6" id="navigationBrowseLinkWrapper" aria-hidden="false">
                <a href="#BrowseJobs" id="navigationBrowseLink" onclick="JobPostAPI.showBrowseJobs();TalentCloudAPI.setNav('navigationBrowseLinkWrapper');">
                    Browse Jobs
                </a>
            </div>

            <div class="box lg-1of6 hidden" id="navigationDashboardLinkWrapper" aria-hidden="true">
                <a href="javascript:void(0)" id="navigationDashboardLink" onclick="DashboardAPI.showDashboard(this);TalentCloudAPI.setNav('navigationDashboardLinkWrapper');">
                    Dashboard
                </a>
            </div>

            <div class="box lg-1of6 hidden" id="navigationProfileLinkWrapper" aria-hidden="true">
                <a href="#MyProfile" id="navigationProfileLink" onclick="JobSeekerAPI.showJobSeekerProfile();TalentCloudAPI.setNav('navigationProfileLinkWrapper');">
                    My Profile
                </a>
            </div>

            <div class="box lg-1of6" id="navigationRegisterLinkWrapper" aria-hidden="false">
                <a href="javascript:void(0)" id="navigationRegisterLink" onclick="UserAPI.showRegisterForm(this);">
                    Register
                </a>
            </div>

            <div class="box lg-1of6" id="navigationLoginLinkWrapper" aria-hidden="false">
                <a href="javascript:void(0)" id="navigationLoginLink" onclick="UserAPI.showLogin(this)">
                    Login
                </a>
            </div>

            <div class="box lg-1of6 hidden" id="navigationLogoutLinkWrapper" aria-hidden="true">
                <a href="javascript:void(0)" id="navigationLogoutLink" onclick="UserAPI.logout()">
                    Logout
                </a>
            </div>

        </div>

    </nav>

</section>
