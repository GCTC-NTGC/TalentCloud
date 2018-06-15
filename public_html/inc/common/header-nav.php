<section class="page-hero">

    <nav class="page-hero__navigation" id="wb-sm">

        <h2 id="topicsMenu">Topics menu</h2>

        <div class="page-hero__mobile-trigger" id="pageHeroMobileTrigger" role="button" tabindex="0">
            <i class="fa fa-navicon"></i>
            <i class="fa fa-times"></i>
            Menu
        </div>

        <div class="page-hero__navigation-menu flex-grid" id="pageHeroNavigationMenu">

            <?php /* Checks to see if the page is the admin portal and then displays the admin home link. */ ?>
            <?php $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>

            <?php /* Home */ ?>
            <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationHomeLinkWrapper" aria-hidden="false">
                <?php if (strpos($url, 'admin') !== false) : ?>
                    <a href="/admin/" id="navigationHomeLink">Home</a>
                <?php else : ?>
                    <a href="/" id="navigationHomeLink">Home</a>
                <?php endif; ?>
            </div>

            <?php /* Checks to see if the page is the admin portal and then displays the admin home link. */ ?>
            <?php $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>
            <?php if (strpos($url, 'admin') !== false) : ?>
                <?php /* No link for you! */ ?>
            <?php else : ?>
                <?php /* Browse Jobs */ ?>
                <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationBrowseLinkWrapper" aria-hidden="false">
                    <a href="#BrowseJobs" id="navigationBrowseLink" onclick="JobPostAPI.showBrowseJobs();TalentCloudAPI.setNav('navigationBrowseLinkWrapper');">
                        Browse Jobs
                    </a>
                </div>
            <?php endif; ?>

            <?php /* Dashboard */ ?>
            <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationDashboardLinkWrapper" aria-hidden="true">
                <a href="javascript:void(0)" id="navigationDashboardLink" onclick="DashboardAPI.showDashboard(this);TalentCloudAPI.setNav('navigationDashboardLinkWrapper');">
                    My Applications
                </a>
            </div>

            <?php /* Checks to see if the page is the admin portal and then displays the admin profile link. */ ?>
            <?php if (strpos($url, 'admin') !== false) : ?>
                <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationAdminDashboardLinkWrapper" aria-hidden="true">
                    <a href="javascript:void(0)" id="navigationAdminDashboardLink" onclick="AdminDashboardAPI.showDashboard();TalentCloudAPI.setNav('navigationAdminDashboardLinkWrapper');">
                        My Job Posters
                    </a>
                </div>
            <?php endif; ?>

            <?php /* My Profile */ ?>
            <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationProfileLinkWrapper" aria-hidden="true">

                <?php /* Checks to see if the page is the admin portal and then displays the admin profile link. */ ?>
                <?php if (strpos($url, 'admin') !== false) : ?>
                    <a href="#CreateEditProfile" id="navigationProfileLink" onclick="CreateEditProfileAPI.showCreateEditProfile();TalentCloudAPI.setNav('navigationProfileLinkWrapper');">
                        My Profile
                    </a>
                <?php else :?>
                    <a href="#MyProfile" id="navigationProfileLink" onclick="JobSeekerAPI.showMyJobSeekerProfile();TalentCloudAPI.setNav('navigationProfileLinkWrapper');">
                        My Profile
                    </a>
                <?php endif; ?>

            </div>

            <?php if (strpos($url, 'admin') !== false) : ?>
                <?php /* Create Job Poster */ ?>
                <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationPosterLinkWrapper" aria-hidden="true">
                    <a href="javascript:void(0)" id="navigationPosterLink" onclick="CreateJobPosterAPI.showCreateJobPosterForm(this);TalentCloudAPI.setNav('navigationPosterLinkWrapper');">Job Poster
                    </a>
                </div>
            <?php else : ?>
                <?php /* No link for you! */ ?>
            <?php endif; ?>

            <?php /* Register */
                if (strpos($url, 'admin') !== false) : ?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationRegisterLinkWrapper" aria-hidden="true">
                        <?php echo("<a href=\"\" id=\"navigationRegisterLink\">Register</a>"); ?>
                    </div>
                <?php else : ?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationRegisterLinkWrapper" aria-hidden="false">
                        <?php echo("<a href=\"https://account.gccollab.ca/register?redirect_uri=https%3A%2F%2Ftc.gccollab.ca%2F\" id=\"navigationRegisterLink\">Register</a>"); ?>
                    </div>
                <?php endif; ?>

            <?php /* Login */ ?>
            <?php
                $hasUser = null;
                if (isset($oidc)) {
                    $hasUser = $oidc->requestUserInfo("name");
                }
            ?>

            <?php if (strpos($url, 'admin') !== false) : ?>

                <?php if ($hasUser != null) : ?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationLoginLinkWrapper" aria-hidden="true">
                <?php else :?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationLoginLinkWrapper" aria-hidden="false">
                <?php endif; ?>
                        <?php
                            $loginLink = "";
                            $loginLink .= OPENID_URI . AUTH_URI;
                            $loginLink .= "?response_type=" . URL_RESPONSE_TYPES;
                            $loginLink .= "&redirect_uri=" . urlencode(REDIRECT_URI_ADMIN);
                            $loginLink .= "&nonce=" . $nonce;
                            $loginLink .= "&state=" . $state;
                            $loginLink .= "&client_id=" . CLIENT_ID;
                            $loginLink .= "&scope=" . SCOPE;
                            //$loginLink .= "&prompt=consent";
                            echo("<a href=\"" . $loginLink . "\" id=\"navigationLoginLink\">Login</a>");
                        ?>
                    </div>

            <?php else : ?>

                <?php if ($hasUser != null) : ?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationLoginLinkWrapper">
                <?php else :?>
                    <div class="page-hero__navigation-item box med-1of5 lg-1of6" id="navigationLoginLinkWrapper">
                <?php endif; ?>
                        <?php
                            $loginLink = "";
                            $loginLink .= OPENID_URI . AUTH_URI;
                            $loginLink .= "?response_type=" . URL_RESPONSE_TYPES;
                            $loginLink .= "&redirect_uri=" . urlencode(REDIRECT_URI);
                            $loginLink .= "&nonce=" . $nonce;
                            $loginLink .= "&state=" . $state;
                            $loginLink .= "&client_id=" . CLIENT_ID;
                            $loginLink .= "&scope=" . SCOPE;
                            //$loginLink .= "&prompt=consent";
                            echo("<a href=\"" . $loginLink . "\" id=\"navigationLoginLink\">Login</a>");
                        ?>
                    </div>

            <?php endif; ?>

            <?php /* Logout */ ?>
            <div class="page-hero__navigation-item box med-1of5 lg-1of6 hidden" id="navigationLogoutLinkWrapper">
                <a href="javascript:void(0)" id="navigationLogoutLink" onclick="UserAPI.logout()">
                    Logout
                </a>
            </div>

        </div>

    </nav>

    <div id="h1">
        <?php if (strpos($url, 'admin') !== false) : ?>
            <h1 class="visuallyHidden">Talent Cloud - Admin Portal</h1>
        <?php else :?>
            <h1 class="visuallyHidden">Talent Cloud - Applicant Portal</h1>
        <?php endif; ?>
    </div>

    <div class="landing-hero" id="landingHero">

        <div class="landing-hero__container">

            <div class="flex-grid middle">

                <div class="box lg-1of2">

                    <img id="logoSrc" class="landing-hero__logo tc-logo logo" src="/images/talent-cloud-logo_full.png" width="229" alt=""/>

                </div>

                <div class="box lg-1of2">
                    <span class="landing-hero__tagline" id="taglineMain">People want meaningful work.</span>
                </div>

                <?php /* Checks to see if the page is the admin portal and then displays the admin tagline. */ ?>
                <?php if (strpos($url, 'admin') !== false) : ?>
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

                    <h2 class="subpage-hero__title hidden" id="browseHeroTitle" aria-hidden="true">Browse Jobs</h2>

                    <h2 class="subpage-hero__title hidden" id="dashboardHeroTitle" aria-hidden="true">My Applications</h2>

                    <h2 class="subpage-hero__title hidden" id="profileHeroTitle" aria-hidden="true">My Profile</h2>

                    <h2 class="subpage-hero__title hidden" id="applicationHeroTitle" aria-hidden="true" aria-flowto="applicationHeroTitleCont">My Job Application</h2>

                    <h2 class="subpage-hero__title hidden" id="managerProfileHeroTitle" aria-hidden="true">Manager Profile</h2>

                    <h2 class="subpage-hero__title hidden" id="posterHeroTitle" aria-hidden="true">My Job Posters</h2>

                    <h2 class="subpage-hero__title hidden" id="faqHeroTitle" aria-hidden="true">FAQs &amp; Information</h2>

                    <h2 class="subpage-hero__title hidden" id="tacHeroTitle" aria-hidden="true">Terms &amp; Conditions</h2>

                    <h2 class="subpage-hero__title hidden" id="privacyHeroTitle" aria-hidden="true">Privacy Policy</h2>

                </div>

            </div>

        </div>

        <?php /* Application Form Metadata */ ?>
        <div class="flex-grid hidden subpage-hero__application-metadata" id="applicationHeroMetadata">

            <div class="box full">

                <div class="block-container">
                    <div class="subpage-hero__application-subtitle" id="applicationHeroTitleCont" role="heading" aria-level="2">
                        <span class="subpage-hero__application-label" id="jobApplicationPositionLabel">for the position of:</span><br>
                        <span class="subpage-hero__application-job" id="jobApplicationPostition">Job title</span>
                    </div>
                    <input type='hidden' id='jobApplicationJobApplicationId' />
                    <input type='hidden' id='jobApplicationJobPosterId' />
                    <input type='hidden' id='jobApplicationJobSeekerId' />
                    <input type='hidden' id='jobApplicationJobApplicationStatusId' />

                </div>

            </div>

        </div>

    </div>

</section>
