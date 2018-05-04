<section class="page-hero">

    <nav class="page-hero__navigation" id="wb-sm">

        <h2 id="topicsMenu">Topics menu</h2>

        <div class="page-hero__mobile-trigger" id="pageHeroMobileTrigger" role="button" tabindex="0">
            <i class="fa fa-navicon"></i>
            <i class="fa fa-times"></i>
            Menu
        </div>

        <div class="page-hero__navigation-menu flex-grid" id="pageHeroNavigationMenu">

            <!-- Checks to see if the page is the admin portal and then displays the admin home link. -->
            <?php $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>

            <!-- Home -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationHomeLinkWrapper" aria-hidden="false">
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
                <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationBrowseLinkWrapper" aria-hidden="false">
                    <a href="#BrowseJobs" id="navigationBrowseLink" onclick="JobPostAPI.showBrowseJobs();TalentCloudAPI.setNav('navigationBrowseLinkWrapper');">
                        Browse Jobs
                    </a>
                </div>
            <?php endif; ?>

            <!-- Dashboard -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationDashboardLinkWrapper" aria-hidden="true">
                <a href="javascript:void(0)" id="navigationDashboardLink" onclick="DashboardAPI.showDashboard(this);TalentCloudAPI.setNav('navigationDashboardLinkWrapper');">
                    My Applications
                </a>
            </div>

            <!-- My Profile -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationProfileLinkWrapper" aria-hidden="true">

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

            <?php if (strpos($url,'admin') !== false) : ?>
                <!-- Create Job Poster -->
                <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationPosterLinkWrapper" aria-hidden="true">
                    <a href="javascript:void(0)" id="navigationPosterLink" onclick="CreateJobPosterAPI.showCreateJobPosterForm(this);TalentCloudAPI.setNav('navigationPosterLinkWrapper');">Job Poster
                    </a>
                </div>
            <?php else : ?>
                <!-- No link for you! -->
            <?php endif; ?>

            <!-- Register -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationRegisterLinkWrapper" aria-hidden="false">
                <?php echo("<a href=\"https://account.gccollab.ca/register?redirect_uri=https%3A%2F%2Ftc.gccollab.ca%2F\" id=\"navigationRegisterLink\">Register</a>"); ?>
            </div>

            <!-- Login -->
            <?php
                $hasUser = null;
                if (isset($oidc)) {
                    $hasUser = $oidc->requestUserInfo("name");
                }
            ?>

            <?php if (strpos($url,'admin') !== false) : ?>

                <?php if ($hasUser!=null) : ?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationLoginLinkWrapper" aria-hidden="true">
                <?php else :?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationLoginLinkWrapper" aria-hidden="false">
                <?php endif; ?>
                        <?php
                            $loginLink = "";
                            $loginLink .= OPENID_URI.AUTH_URI;
                            $loginLink .= "?response_type=".URL_RESPONSE_TYPES;
                            $loginLink .= "&redirect_uri=".urlencode(REDIRECT_URI_ADMIN);
                            $loginLink .= "&nonce=".$nonce;
                            $loginLink .= "&state=".$state;
                            $loginLink .= "&client_id=".CLIENT_ID;
                            $loginLink .= "&scope=".SCOPE;
                            $loginLink .= "&prompt=consent";
                            echo("<a href=\"".$loginLink."\" id=\"navigationLoginLink\">Login</a>");
                        ?>
                    </div>

            <?php else : ?>

                <?php if ($hasUser!=null) : ?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationLoginLinkWrapper">
                <?php else :?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationLoginLinkWrapper">
                <?php endif; ?>
                        <?php
                            $loginLink = "";
                            $loginLink .= OPENID_URI.AUTH_URI;
                            $loginLink .= "?response_type=".URL_RESPONSE_TYPES;
                            $loginLink .= "&redirect_uri=".urlencode(REDIRECT_URI);
                            $loginLink .= "&nonce=".$nonce;
                            $loginLink .= "&state=".$state;
                            $loginLink .= "&client_id=".CLIENT_ID;
                            $loginLink .= "&scope=".SCOPE;
                            $loginLink .= "&prompt=consent";
                            echo("<a href=\"".$loginLink."\" id=\"navigationLoginLink\">Login</a>");
                        ?>
                    </div>

            <?php endif; ?>

            <!-- Logout -->
            <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationLogoutLinkWrapper">
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
                    <!-- Checks to see if the page is the admin portal and then displays the admin tagline. -->
                    <?php if (strpos($url,'admin') !== false) : ?>
                        <a href="/admin/" role="img" aria-label="GC Talent Cloud" class="landing-hero__link">
                    <?php else : ?>
                        <a href="/" role="img" aria-label="GC Talent Cloud" class="landing-hero__link">
                    <?php endif ?>
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

                    <h1 class="subpage-hero__title hidden" id="dashboardHeroTitle" aria-hidden="true">My Applications</h1>

                    <h1 class="subpage-hero__title hidden" id="profileHeroTitle" aria-hidden="true">My Profile</h1>

                    <h1 class="subpage-hero__title hidden" id="applicationHeroTitle" aria-hidden="true">My Job Application</h1>

                    <h1 class="subpage-hero__title hidden" id="managerProfileHeroTitle" aria-hidden="true">Manager Profile</h1>

                    <h1 class="subpage-hero__title hidden" id="posterHeroTitle" aria-hidden="true">My Job Posters</h1>

                    <h1 class="subpage-hero__title hidden" id="faqHeroTitle" aria-hidden="true">FAQs &amp; Information</h1>

                </div>

            </div>

            <!-- Job Poster Metadata -->
            <div class="flex-grid bottom hidden subpage-hero__poster-metadata" id="browseHeroPosterMetaData">

                <div class="box lg-2of3">
                    <h3 class="subpage-hero__poster-job" id="jobPosterTitle">Job Title</h3>
                    <p class="subpage-hero__poster-department" id="jobPosterLocation">
                        <span id="jobPosterDepartment"></span><br>
                        <span id="jobPosterCity"></span>, <span id="jobPosterProvince"></span> (<span id="jobPosterRemoteWorkHeader">Remote work</span>)
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
