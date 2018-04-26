<section class="page-hero">

    <nav class="page-hero__navigation">

        <div class="flex-grid">

            <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationHomeLinkWrapper" aria-hidden="false">
                <a href="/" id="navigationHomeLink">Home</a>
            </div>

            <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationBrowseLinkWrapper" aria-hidden="false">
                <a href="#BrowseJobs" id="navigationBrowseLink" onclick="JobPostAPI.showBrowseJobs();TalentCloudAPI.setNav('navigationBrowseLinkWrapper');">
                    Browse Jobs
                </a>
            </div>

            <div class="page-hero__navigation-item box med-1of5 lg-1of7 hidden" id="navigationDashboardLinkWrapper" aria-hidden="true">
                <a href="javascript:void(0)" id="navigationDashboardLink" onclick="DashboardAPI.showDashboard(this);TalentCloudAPI.setNav('navigationDashboardLinkWrapper');">
                    Dashboard
                </a>
            </div>

            <div class="page-hero__navigation-item box med-1of5 lg-1of7 hidden" id="navigationProfileLinkWrapper" aria-hidden="true">
                <a href="#MyProfile" id="navigationProfileLink" onclick="JobSeekerAPI.showJobSeekerProfile();TalentCloudAPI.setNav('navigationProfileLinkWrapper');">
                    My Profile
                </a>
            </div>

            <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationRegisterLinkWrapper" aria-hidden="false">
                <a href="javascript:void(0)" id="navigationRegisterLink" onclick="UserAPI.showRegisterForm(this);">
                    Register
                </a>
            </div>

            <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationLoginLinkWrapper" aria-hidden="false">
                <a href="javascript:void(0)" id="navigationLoginLink" onclick="UserAPI.showLogin(this)">
                    Login
                </a>
            </div>

            <div class="page-hero__navigation-item box med-1of5 lg-1of7 hidden" id="navigationLogoutLinkWrapper" aria-hidden="true">
                <a href="javascript:void(0)" id="navigationLogoutLink" onclick="UserAPI.logout()">
                    Logout
                </a>
            </div>

        </div>

    </nav>

    <div class="landing-hero" id="landingHero">

        <div class="landing-hero__container">

            <div class="flex-grid middle">

                <div class="box lg-1of2">
                    <a href="/" role="img" aria-label="GC Talent Cloud" class="landing-hero__link">
                        <img id="logoSrc" class="landing-hero__logo" src="/images/talent-cloud-logo_full.png" width="229" alt="GC Talent Cloud graphic"/>
                    </a>
                </div>

                <div class="box lg-1of2">
                    <span class="landing-hero__tagline" id="taglineMain">People want meaningful work.</span>
                </div>

            </div>

        </div>

    </div>

    <div class="subpage-hero">

        <div class="block-container">

            <div class="flex-grid">

                <div class="box full">

                    <h1 class="subpage-hero__title hidden" id="browseHeroTitle" aria-hidden="true">Browse Jobs</h1>

                    <h1 class="subpage-hero__title hidden" id="dashboardHeroTitle" aria-hidden="true">Dashboard</h1>

                    <h1 class="subpage-hero__title hidden" id="profileHeroTitle" aria-hidden="true">My Profile</h1>

                    <h1 class="subpage-hero__title hidden" id="applicationHeroTitle" aria-hidden="true">My Job Application</h1>

                </div>

            </div>

            <!-- Job Poster Metadata -->
            <div class="flex-grid bottom hidden subpage-hero__poster-metadata" id="browseHeroPosterMetaData">

                <div class="box lg-2of3">
                    <h3 class="subpage-hero__poster-job" id="jobPosterTitle">Job Title</h3>
                    <p class="subpage-hero__poster-department" id="jobPosterLocation">
                        <span id="jobPosterDepartment"></span> - <span id="jobPosterCity"></span>, <span id="jobPosterProvince"></span>
                    </p>
                </div>

                <div class="box lg-1of3">
                    <p class="subpage-hero__poster-id" id="jobPosterId"><span id="jobPosterIdLabel">Reference ID</span> #<span id="jobPosterIdValue"></span></p>
                </div>

                <input id="jobPosterJobId" type="hidden"/>

            </div>

            <!-- Application Form Metadata -->
            <div class="flex-grid hidden subpage-hero__application-metadata" id="applicationHeroMetadata">

                <div class="box full">
<div class="container centered">
<p id="createJobApplicationPositionLabel">for the position of:</p>
<h3 id="createJobApplicationPostition">Job title</h3>
</div>
<input type='hidden' id='createJobApplicationJobApplicationId' />
<input type='hidden' id='createJobApplicationJobPosterId' />
<input type='hidden' id='createJobApplicationJobSeekerId' />
<input type='hidden' id='createJobApplicationJobApplicationStatusId' />
                </div>

            </div>

        </div>

    </div>

</section>
