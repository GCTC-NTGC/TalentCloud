<section class="job-poster hidden" id="viewJobPosterSection">

    <?php /* New Job Poster */ ?>

    <section class="job-poster__heading">

        <div class="block-container">

            <div class="flex-grid bottom">

                <div class="box lg-2of3">
                    <p class="job-poster__heading-meta">
                        <span id="jobPosterTimeRemaining"></span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span id="jobPosterApplicants"></span>
                    </p>
                    <h3 class="job-poster__job-title" id="jobPosterTitle">Job Title</h3>
                    <div class="job-poster__department" id="jobPosterLocation">
                        <span id="jobPosterDepartment"></span>
                        <br>
                        <div>
                            <i class="fa fa-map-marker" title="Location Icon"></i><span id="jobPosterCity"></span>,
                            <span id="jobPosterProvince"></span>
                        </div>
                        <br>
                        <div>
                            <i class="fa fa-home" title="Remote Work Icon"></i><span id="jobPosterRemoteWorkHeader">Remote work</span>
                        </div>
                    </div>
                </div>

                <div class="job-poster__reference-id-wrapper box lg-1of3">
                    <p class="job-poster__reference-id" id="jobPosterId"><span id="jobPosterIdLabel">Reference ID</span> #<span id="jobPosterIdValue"></span></p>
                </div>

                <input id="jobPosterJobId" type="hidden"/>

            </div>

        </div>

    </section>

    <div class="job-poster__section-wrapper block-container">

        <div class="flex-grid">

            <div class="job-poster__subnav-wrapper box lg-1of4">
                <div class="job-poster__subnav-sticky-wrapper">
                    <span class="job-poster__subnav-job-title" id="jobPosterSubnavJobTitle">User Experience Designer</span>
                    <span class="job-poster__subnav-department" id="jobPosterSubnavDepartment">Transport Canada</span>
                    <h4 class="job-poster_subnav-label" id="jobPosterSubnavLabel">About This Job:</h4>
                    <a href="#basics" class="job-poster__subnav-item" id="jobPosterSubnavItemBasics">Basic Information</a>
                    <a href="#impact" class="job-poster__subnav-item" id="jobPosterSubnavItemImpact">Impact</a>
                    <a href="#work" class="job-poster__subnav-item" id="jobPosterSubnavItemWork">Your Work</a>
                    <a href="#criteria" class="job-poster__subnav-item" id="jobPosterSubnavItemCriteria">Criteria</a>
                    <a href="#culture" class="job-poster__subnav-item" id="jobPosterSubnavItemCulture">Culture</a>
                    <a href="#know" class="job-poster__subnav-item hidden" id="jobPosterSubnavItemKnow">Need to Know</a>
                    <a href="#apply" class="job-poster__subnav-item" id="jobPosterSubnavItemApply">Apply for this Job</a>
                </div>
            </div>

            <div class="job-poster__content-wrapper box lg-3of4">

                <a id="basics" aria-hidden="true"></a>
                <section class="job-poster__basics">
                    <div class="flex-grid">
                        <div class="box full">
                            <h4 class="job-poster__basics-title" id="jobPosterContentTitleBasics">Basic Information</h4>
                        </div>
                        <div class="box med-1of2">
                            <span class="job-poster__basics-label" id="jobPosterSalaryRangeLabel">Salary Range</span>
                            <span class="job-poster__basics-content" id="jobPosterSalaryRangeValue">CS1</span>
                            <span class="job-poster__basics-label" id="jobPosterTermLabel">Duration</span>
                            <span class="job-poster__basics-content" id="jobPosterTermValue">CS1</span>
                            <span class="job-poster__basics-label" id="jobPosterStartDateLabel">Target Start</span>
                            <span class="job-poster__basics-content" id="jobPosterStartDateValue">CS1</span>
                        </div>
                        <div class="box med-1of2">
                            <span class="job-poster__basics-label" id="jobPosterLanguageLabel">Language</span>
                            <span class="job-poster__basics-content" id="jobPosterLanguageValue">CS1</span>
                            <span class="job-poster__basics-label" id="jobPosterClearanceLevelLabel">Security Clearance</span>
                            <span class="job-poster__basics-content" id="jobPosterClearanceLevelValue">CS1</span>
                            <span class="job-poster__basics-label" id="jobPosterJobLevelLabel">Classification</span>
                            <span class="job-poster__basics-content" id="jobPosterJobLevelValue">CS1</span>
                        </div>
                    </div>
                </section>

                <a id="impact" aria-hidden="true"></a>
                <section class="job-poster__impact">
                    <h4 class="job-poster__content-title" id="jobPosterContentTitleImpact">Impact</h4>
                    <p class="job-poster__content-copy" id="jobPosterImpact"></p>
                </section>

                <a id="work" aria-hidden="true"></a>
                <section class="job-poster__work">
                    <h4 class="job-poster__content-title" id="jobPosterContentTitleWork">Your Work</h4>
                    <ul class="job-poster__content-list" id="jobPosterKeyTasks"></ul>
                </section>

                <a id="criteria" aria-hidden="true"></a>
                <section class="job-poster__criteria">
                    <div class="flex-grid">
                        <div class="box full">
                            <h4 class="job-poster__content-title" id="jobPosterContentTitleCriteria">Criteria</h4>
                        </div>
                        <div class="box med-1of2">
                            <h5 class="job-poster__content-subtitle" id="jobPosterCoreCompetenciesLabel">Need to Have</h5>
                            <ul class="job-poster__content-list" id="jobPosterCoreCompetencies"></ul>
                        </div>
                        <div class="box med-1of2">
                            <h5 class="job-poster__content-subtitle" id="jobPosterDevelopingCompetenciesLabel">Nice to Have</h5>
                            <ul class="job-poster__content-list" id="jobPosterDevelopingCompetencies"></ul>
                        </div>
                    </div>
                </section>

                <a id="culture" aria-hidden="true"></a>
                <section class="job-poster__culture">
                    <h4 class="job-poster__content-title" id="jobPosterContentTitleCulture">Culture</h4>
                    <div class="flex-grid middle">
                        <?php /* Hiring Manager ========================== */ ?>
                        <div class="box full">
                            <h5 class="job-poster__content-subtitle" id="jobPosterHiringManagerLabel">Your Manager</h5>
                            <input type='hidden' id='jobPosterHiringManagerUserId'/>
                        </div>
                        <div class="job-poster__culture-manager-profile-photo-wrapper box med-1of4">
                            <div class="job-poster__culture-manager-profile-photo" id="jobPosterCultureManagerProfilePhoto" title="This manager's profile photo."></div>
                        </div>
                        <div class="box med-3of4">
                            <span class="job-poster__culture-manager-name" id="jobPosterHiringManagerName"></span>
                            <div class="job-poster__culture-manager-meta">
                                <span id="jobPosterHiringManagerTitle"></span>
                                <span id="jobPosterHiringManagerPositionAtLabel">at</span>
                                <span id="jobPosterHiringManagerDepartment"></span>
                            </div>
                            <a href="javascript:void(0)" class="job-poster__culture-manager-profile-link" id="jobPosterHiringManagerButton" title="View this manager's profile." onclick="ManagerProfileAPI.showManagerProfile(document.getElementById('jobPosterHiringManagerUserId').value, document.getElementById('jobPosterJobId').value);">
                                View Profile
                            </a>
                        </div>
                        <div class="box full">
                            <p class="job-poster__content-copy truncate" id="jobPosterHiringManagerAboutMe"></p>
                        </div>
                        <?php /* Work Environment ======================== */ ?>
                        <div class="box full">
                            <h5 class="job-poster__content-subtitle" id="jobPosterWorkEnvironmentLabel">Work Environment</h5>
                        </div>
                        <div class="box full">
                            <span class="job-poster__content-label" id="jobPosterTeamNarrativeText_label">Things to Know</span>
                            <p class="job-poster__content-copy" id="jobPosterTeamNarrativeText"></p>
                        </div>
                        <div class="box med-1of2">
                            <span class="job-poster__content-label" id="jobPosterRemoteWork_label">Remote Location Allowed</span>
                            <p class="job-poster__content-copy" id="jobPosterRemoteWork"></p>
                        </div>
                        <div class="box med-1of2">
                            <span class="job-poster__content-label" id="jobPosterTelework_label">Telework Allowed</span>
                            <p class="job-poster__content-copy" id="jobPosterTelework"></p>
                        </div>
                        <div class="box full">
                            <span class="job-poster__content-label" id="jobPosterFlexHours_label">Flexible Hours Allowed</span>
                            <p class="job-poster__content-copy" id="jobPosterFlexHours"></p>
                        </div>
                        <div class="box med-1of2 lg-1of3">
                            <div class="job-poster__work-environment-photo" id="jobPosterWorkEnvironment_1" title="First image of workplace environment" style="background-image: url('images/default_workplace_photo.png');"></div>
                        </div>
                        <div class="box med-1of2 lg-1of3">
                            <div class="job-poster__work-environment-photo" id="jobPosterWorkEnvironment_2" title="Second image of workplace environment" style="background-image: url('images/default_workplace_photo.png');"></div>
                        </div>
                        <div class="box med-1of2 lg-1of3">
                            <div class="job-poster__work-environment-photo" id="jobPosterWorkEnvironment_3" title="Third image of workplace environment" style="background-image: url('images/default_workplace_photo.png');"></div>
                        </div>
                        <?php /* Team Culture ============================ */ ?>
                        <div class="box full">
                            <h5 class="job-poster__content-subtitle" id="jobPosterTeamCultureLabel">Team Culture</h5>
                        </div>
                        <div class="box med-1of2">
                            <span class="job-poster__content-label" id="jobPosterTeamSize_label">Team Size</span>
                            <p class="job-poster__content-copy" id="jobPosterTeamSize"></p>
                        </div>
                        <div class="box med-1of2">
                            <span class="job-poster__content-label" id="jobPosterGcDirLink_label">Team on GC Directory</span>
                            <p class="job-poster__content-copy">
                                <a id="jobPosterGcDirLink" href="#" target="_blank">GCdirectory</a>
                            </p>
                        </div>
                        <div class="box full">
                            <span class="job-poster__content-label" id="jobPosterOperatingContext_label">Our Operating Context</span>
                            <p class="job-poster__content-copy" id="jobPosterOperatingContext_text"></p>
                        </div>
                        <div class="box full">
                            <span class="job-poster__content-label" id="jobPosterWhatWeValue_label">What We Value</span>
                            <p class="job-poster__content-copy" id="jobPosterWhatWeValue_text"></p>
                        </div>
                        <div class="box full">
                            <span class="job-poster__content-label" id="jobPosterHowWeWork_label">How We Work</span>
                            <p class="job-poster__content-copy" id="jobPosterHowWeWork_text"></p>
                        </div>
                    </div>
                </section>

                <a id="know" aria-hidden="true"></a>
                <section class="job-poster__know hidden">
                    <h4 class="job-poster__content-title" id="jobPosterContentTitleKnow">Need to Know</h4>
                    <h5 class="job-poster__content-subtitle">What You Need for Security Clearance</h5>
                    <p class="job-poster__content-copy" id="jobPosterImpact">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci.</p>
                    <h5 class="job-poster__content-subtitle">The Application Process</h5>
                    <p class="job-poster__content-copy" id="jobPosterImpact">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci.</p>
                    <h5 class="job-poster__content-subtitle">Other Paperwork & Preparation</h5>
                    <p class="job-poster__content-copy" id="jobPosterImpact">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus, purus a congue bibendum, nibh quam convallis leo, a pharetra dui ante nec magna. Proin elementum lacus venenatis nulla luctus, sed porttitor quam ullamcorper. Proin in facilisis sapien, in ullamcorper orci.</p>
                </section>

                <a id="apply" aria-hidden="true"></a>
                <section class="job-poster__apply">
                    <div class="job-poster__apply-accommodation-wrapper">
                        <div class="flex-grid middle">
                            <div class="box full">
                                <h4 class="job-poster__apply-title" id="jobPosterContentTitleApply">Apply for this Job</h4>
                            </div>
                            <div class="box med-1of5">
                                <i class="fas fa-hand-holding-heart"></i>
                            </div>
                            <div class="box med-4of5">
                                <p class="job-poster__apply-content">Please advise Talent Cloud at talent.cloud-nuage.de.talents@tbs-sct.gc.ca of any accomodations you may require during the application process.</p>
                            </div>
                        </div>
                    </div>


                    <?php /*Remove or re-add logged-in class based on whether the user is logged in or not */ ?>
                    <div id="jobPosterButtonWrapper" class="job-poster__button-wrapper logged-in">
                        <button class="job-poster__apply-button" id="jobPosterApplyButton" value="Apply Now" onclick="JobApplicationAPI.showCreateJobApplication(document.getElementById('jobPosterJobId').value)">
                            Apply Now
                        </button>
                        <?php
                        // Not logged in
                        $loginLink = "";
                        $loginLink .= OPENID_URI . AUTH_URI;
                        $loginLink .= "?response_type=" . URL_RESPONSE_TYPES;
                        if (strpos($url, 'admin') !== false) {
                            $loginLink .= "&redirect_uri=" . urlencode(REDIRECT_URI_ADMIN);
                        } else {
                            $loginLink .= "&redirect_uri=" . urlencode(REDIRECT_URI);
                        }
                        $loginLink .= "&nonce=" . $nonce;
                        $loginLink .= "&state=" . $state;
                        $loginLink .= "&client_id=" . CLIENT_ID;
                        $loginLink .= "&scope=" . SCOPE;
                        $loginLink .= "&prompt=consent";

                        echo("<a href=\"" . $loginLink . "\" class=\"job-poster__login-button\" value=\"Login\" id=\"jobPosterLoginButton\" \">Login</a>");
                        ?>
                    </div>
                </section>

            </div>

        </div>

    </div>

</section>
