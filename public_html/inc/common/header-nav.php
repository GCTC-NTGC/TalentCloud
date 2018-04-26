<section class="page-hero">

    <nav class="page-hero__navigation">

        <div class="flex-grid">

            <!-- Checks to see if the page is the admin portal and then displays the admin home link. -->
            <?php $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>

            <!-- Home -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationHomeLinkWrapper" aria-hidden="false">
                <?php if (strpos($url,'admin') !== false) : ?>
                    <a href="/admin/" id="navigationHomeLink">Home</a>
                <?php else : ?>
                    <a href="/" id="navigationHomeLink">Home</a>
                <?php endif; ?>
            </div>

            <!-- Checks to see if the page is the admin portal and then displays the admin home link. -->
            <?php $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>
            <?php if (strpos($url,'admin') !== false) : ?>
                <!-- No link for you! -->
            <?php else : ?>
                <!-- Browse Jobs -->
                <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationBrowseLinkWrapper" aria-hidden="false">
                    <a href="#BrowseJobs" id="navigationBrowseLink" onclick="JobPostAPI.showBrowseJobs();TalentCloudAPI.setNav('navigationBrowseLinkWrapper');">
                        Browse Jobs
                    </a>
                </div>
            <?php endif; ?>

            <!-- Dashboard -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of7 hidden" id="navigationDashboardLinkWrapper" aria-hidden="true">
                <a href="javascript:void(0)" id="navigationDashboardLink" onclick="DashboardAPI.showDashboard(this);TalentCloudAPI.setNav('navigationDashboardLinkWrapper');">
                    Dashboard
                </a>
            </div>

            <!-- My Profile -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of7 hidden" id="navigationProfileLinkWrapper" aria-hidden="true">

                <!-- Checks to see if the page is the admin portal and then displays the admin profile link. -->
                <?php if (strpos($url,'admin') !== false) : ?>
                    <a href="#MyProfile" id="navigationProfileLink" onclick="CreateEditProfileAPI.showCreateEditProfile();TalentCloudAPI.setNav('navigationProfileLinkWrapper');">
                        My Profile
                    </a>
                <?php else : ?>
                    <a href="#MyProfile" id="navigationProfileLink" onclick="JobSeekerAPI.showJobSeekerProfile();TalentCloudAPI.setNav('navigationProfileLinkWrapper');">
                        My Profile
                    </a>
                <?php endif; ?>

            </div>

            <!-- Checks to see if the page is the admin portal and then displays the admin job poster link. -->
            <?php $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>
            <?php if (strpos($url,'admin') !== false) : ?>
                <!-- Create Job Poster -->
                <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationPosterLinkWrapper" aria-hidden="false">
                    <a href="javascript:void(0)" id="navigationPosterLink" onclick="CreateJobPosterAPI.showCreateJobPosterForm(this);TalentCloudAPI.setNav('navigationPosterLinkWrapper');">Job Poster
                    </a>
                </div>
            <?php else : ?>
                <!-- No link for you! -->
            <?php endif; ?>

            <!-- Register -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationRegisterLinkWrapper" aria-hidden="false">
                <a href="javascript:void(0)" id="navigationRegisterLink" onclick="UserAPI.showRegisterForm(this);">
                    Register
                </a>
            </div>

            <!-- Login -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of7" id="navigationLoginLinkWrapper" aria-hidden="false">
                <a href="javascript:void(0)" id="navigationLoginLink" onclick="UserAPI.showLogin(this)">
                    Login
                </a>
            </div>

            <!-- Logout -->
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

                <!-- Checks to see if the page is the admin portal and then displays the admin tagline. -->
                <?php if (strpos($url,'admin') !== false) : ?>
                    <div class="box full">
                        <p id="adminTagline" class="landing-hero__admin-tagline">Changing government through it's people</p>
                    </div>
                <?php endif; ?>

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

                    <h1 class="subpage-hero__title hidden" id="managerProfileHeroTitle" aria-hidden="true">Manager Profile</h1>

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

        </div>

        <!-- Application Form Metadata -->
        <div class="flex-grid hidden subpage-hero__application-metadata" id="applicationHeroMetadata">

            <div class="box full">

                <div class="block-container">
                
                    <p class="subpage-hero__application-label" id="createJobApplicationPositionLabel">for the position of:</p>
                    <h3 class="subpage-hero__application-job" id="createJobApplicationPostition">Job title</h3>
                    <input type='hidden' id='createJobApplicationJobApplicationId' />
                    <input type='hidden' id='createJobApplicationJobPosterId' />
                    <input type='hidden' id='createJobApplicationJobSeekerId' />
                    <input type='hidden' id='createJobApplicationJobApplicationStatusId' />

                </div>

            </div>

        </div>

    </div>

</section>
