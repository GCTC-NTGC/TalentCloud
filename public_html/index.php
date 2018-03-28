<?php //header('Content-Type: text/html; charset=utf-8'); ?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor . 
-->
<html lang="en">
<head>
    <title>GC Talent Cloud</title>
    <?php include 'inc/head.php'; ?>
</head>

<body>
<ul id="wb-tphp">
    <li class="wb-slc">
        <a class="wb-sl" href="#homePageContentSection">Skip to available jobs</a>
    </li>
</ul>
<div class="announcement-banner">
    <span class="fa fa-bullhorn fa-2x"></span> <span id="announcement">This site is under construction. The jobs are not in fact real at the moment.</span>
</div>

<?php include 'inc/fip.php';?>
<?php include 'inc/nav.php';?>

<!-- A top-level dialog or overlay elements should be children of this div-->
<div id="overlays">
    <!-- BEGIN - Registration Dialog and Overlay-->
    <div id="registerFormOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="registerFormTitle" aria-describedby="registerFormDescription">
        <div id="registerFormWrapperWindow" class="dialogHalfWidthWrapperWindow">
            <div id='registerFormTitleWrapper' class="dialogTitle">
                <strong id='registerFormTitle' title="Register for Talent Cloud">Register for Talent Cloud</strong>
                <div class="hidden" id="registerFormDescription">Register for Talent Cloud</div>
            </div>
            <div class="wb-frmvld wb-init dialogWindowInterior" id="registerFormWrapper">
                <form name="registerForm" id="registerForm" novalidate="novalidate" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="center-block three-quarter-width">
                        <div class="form-group">
                            <label for="register_email">
                                <span>Email:</span>
                                <strong id="register_email_error" class="error hidden">
                                    <span id="register_email_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form-control form-textbox" id="register_email" name="register_email" type="text" required=""/>
                        </div>
                        <div class="form-group">
                            <label for="register_email_confirm">
                                <span>Re-enter email:</span>
                                <strong id="register_email_confirm_error" class="error hidden">
                                    <span id="register_email_confirm_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form-control form-textbox" id="register_email_confirm" name="register_email_confirm" type="text" required=""/>
                        </div>
                        <div class="form-group">
                            <label for="register_password">
                                <span>Password:</span>
                                <strong id="register_password_error" class="error hidden">
                                    <span id="register_password_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form-control form-textbox" id="register_password" name="register_password" type="password" required=""/>
                        </div>
                        <div class="form-group">
                            <label for="register_password_confirm">
                                <span>Re-enter password:</span>
                                <strong id="register_password_confirm_error" class="error hidden">
                                    <span id="register_password_confirm_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form-control form-textbox" id="register_password_confirm" name="register_password_confirm" type="password" required=""/>
                        </div>
                    </div>
                    <div class="hidden">
                        <p><a href="javascript:void(0)" onclick="UserAPI.hideRegisterForm(); return UserAPI.showLogin(this);" class="ui-link" id="switchToLogin" title="Already have an account? Click here to login.">Already have an account? Click here to login</a></p>
                    </div>
                    <div class="formButtonWrapper">
                        <input type="button" class="btn btn-default" id="registerFormCancelBtn" value="Cancel" onclick="UserAPI.hideRegisterForm()">
                        <input type="button" class="btn btn-primary" id="registerFormRegisterBtn" value="Register" onclick="UserAPI.register();">
                    </div>
                    <div class="clear"></div>
                </form>  
            </div>
        </div>
    </div>
    <div id="registerStatusOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="registerStatusTitle" aria-describedby="registerStatusDescription">
        <div id="registerStatusWrapperWindow" class="dialogHalfWidthWrapperWindow">
            <div id='registerStatusTitleWrapper' class="dialogTitle">
                <strong id='registerStatusTitle' title="Talent Cloud Registration Status">Talent Cloud Registration Status</strong>
                <div class="hidden" id="registerStatusDescription">Talent Cloud Registration Status</div>
            </div>
            <div class="dialogWindowInterior">
                <div id="registrationStatusSuccessMessage">

                </div>
                <div id="registrationStatusEmailConfMessage">

                </div>
                <div class="formButtonWrapper">
                    <input type="button" class="btn btn-default" id="registerStatusCloseBtn" value="Close" onclick="UserAPI.hideRegisterConf()">
                    <input type="button" class="btn btn-primary" id="registerStatusLoginBtn" value="Log in" onclick="UserAPI.hideRegisterConf(); return UserAPI.showLogin(this);"/>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <!-- BEGIN - Login Modal Dialog and Overlay-->
    <div id="loginOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="loginFormTitle" aria-describedby="loginFormDescription">
        <div id="loginFormWrapperWindow" class="dialogHalfWidthWrapperWindow">
            <div id='loginFormTitleWrapper' class="dialogTitle">
                <strong id='loginFormTitle' title="Login to TalentCloud">Login to TalentCloud</strong>
                <div class="hidden" id="loginFormDescription">Login to TalentCloud</div>
            </div>
            <div class="dialogWindowInterior">
                <form name="loginForm" id="loginForm" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="label label-danger hidden" id="loginErrors"></div>
                    <div class="center-block three-quarter-width">
                        <div class="form-group">
                            <label for="login_email">
                                <span>Email:</span>
                                <strong id="login_email_error" class="error hidden">
                                    <span id="login_email_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="email" name="login_email" id="login_email" required=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="login_password">
                                <span>Password:</span>
                                <strong id="login_password_error" class="error hidden">
                                    <span id="login_password_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="password" name="login_password" id="login_password" required=""/>
                            </div>
                        </div>
                    </div>                
                    <div>
                        <div style="margin: 1em 0 0 0;" class="hidden">
                            <a href="javascript:void(0)">Forgot your password? Click here to reset it. (Not working yet.)</a>
                        </div>
                        <div style="margin: 1em 0 0 0;">
                            <p><a href="javascript:void(0)" onclick="UserAPI.cancelLogin(); return UserAPI.showRegisterForm(this);" class="ui-link" id="switchToRegister" title="Don't have an account? Click here to register.">Don't have an account? Click here to register</a></p>
                        </div>
                    </div>
                                        
                    <div class="formButtonWrapper">
                        <input type="button" id="loginFormCancelBtn" value="Cancel" class="btn btn-default" onclick="UserAPI.cancelLogin()"/>
                        <input type="button" id="loginFormLoginBtn" value="Log in" class="btn btn-primary" onclick="return UserAPI.login()"/>
                    </div>
                    <div class="clear"></div>
                </form>
            </div>
        </div>
    </div>

    <!-- BEGIN - Profile Basic Info Edit Overlay-->
    <div id="profileBasicInfoEditOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profileBasicInfoEditTitle" aria-describedby="profileBasicInfoFormDescription">
        <div id="profileBasicInfoEditWrapperWindow" class="dialogThreeQuarterWrapperWindow">
            <div id="profileBasicInfoFormWrapper">
                <div id='profileBasicInfoEditTitleWrapper' class="dialogTitle">
                    <strong id='profileBasicInfoEditTitle' title="Edit your basic info">Edit your basic info</strong>
                    <div class="hidden" id="profileBasicInfoFormDescription">Edit your basic info</div>
                </div>

                <div class="dialogWindowInterior">
                    <img id="profileBasicInfoEditProfilePic" class="profilePicLarge" src="images/user.png" alt="Default user"/>
                    <a href="javascript:void(0)" id="showUploadProfilePic" onclick="JobSeekerAPI.showUploadProfilePic()"><img src="/images/btn_edit_dark.png" alt="Edit Profile Image" class="editImage"/></a>

                    <form name="profileBasicInfoForm" id="profileBasicInfoForm" method="post" enctype="application/x-www-form-urlencoded">

                        <div class="form-group leftPane">
                            <label for="profileEditFirstName">
                                <span>First Name:</span>
                                <strong id="profileEditFirstNameError" class="error hidden">
                                    <span id="profileEditFirstNameErrorMsg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditFirstName" id="profileEditFirstName" required=""/>
                            </div>
                        </div>
                        <div class="form-group rightPane">
                            <label for="profileEditLastName">
                                <span>Last Name:</span>
                                <strong id="profileEditLastNameError" class="error hidden">
                                    <span id="profileEditLastNameErrorMsg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditLastName" id="profileEditLastName" required=""/>
                            </div>
                        </div>
                        <div class="form-group clear">
                            <label for="profileEditTagline">
                                <span>Tagline:</span>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditTagline" id="profileEditTagline"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="profileEditTwitter">
                                <img src="images/twitter.png" alt="Twitter logo" class="form-icon"/>
                                <span>Twitter Handle:</span>
                                <strong id="profileEditTwitterError" class="error hidden">
                                    <span id="profileEditTwitterErrorMsg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditTwitter" id="profileEditTwitter" placeholder="@Username"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="profileEditLinkedin">
                                <img src="images/linkedin.png" alt="LinkedIn logo" class="form-icon"/>
                                <span>LinkedIn Profile Address:</span>
                                <strong id="profileEditLinkedinError" class="error hidden">
                                    <span id="profileEditLinkedinErrorMsg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <span class="form-control" style="padding:7px 0 7px 14px;float:left;color:#999;vertical-align: middle;" onclick="document.getElementById('profileEditLinkedin').focus()">https://www.linkedin.com/in/</span>
                                <span style="float:left;"><input class="form-control full-width" type="text" name="profileEditLinkedin" id="profileEditLinkedin" placeholder="exampleuser"/></span>
                            </div>
                        </div>
                        <div>
                            <input type="button" id="profileBasicInfoEditCancel" value="Cancel" class="btn btn-default" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
                            <input type="button" id="profileBasicInfoEditSave" value="Save" class="btn btn-primary" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()"/>
                        </div>
                    </form>
                </div>
            </div>
            <div id="profilePicUploadWrapper" class="hidden" aria-labelledby="profilePicUploadTitle" aria-describedby="profilePicUploadDescription">
                <div id='profilePicUploadTitleWrapper' class="dialogTitle">
                    <strong id='profilePicUploadTitle' title="Upload a new profile image">Upload a new profile image</strong>
                    <div class="hidden" id="profilePicUploadDescription">Upload a new profile image</div>
                </div>
                <div class="fileUpload">
                    <div class="leftPane">
                        <div>
                            <label for="profilePicUploadField">Profile picture</label>
                            <input type="file" id="profilePicUploadField" class="fileInput" name="Profile Pic" accept="image/*" />
                        </div>
                        <div id="profilePicUploadDrop" class="fileDropZone fileDropZoneNormal">
                            <p>Drop file here</p>
                        </div>
                    </div>
                    <div class="rightPane">
                        <div id="fileUploadPreviewPanel" style="min-height:130px;">
                            <!--a id="profilePicUploadClear" class="fileUploadReset" href="#" title="Remove all files from list">Clear</a-->
                            <ul id="profilePicUploadPreview" class="filePreviewList"></ul>
                        </div>
                        <div id="fileUploadButtons">
                            <a id="profilePicCancelBtn" href="javascript:void(0)" class="btn btn-default" onclick="JobSeekerAPI.hideUploadProfilePic()">Cancel</a>
                            <a id="profilePicUploadBtn" class="btn btn-primary" href="#" title="Upload all files in list">Save</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- BEGIN - About Me Edit Overlay-->
    <div id="profileAboutMeEditOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profileAboutMeEditTitle" aria-describedby="profileAboutMeFormDescription">
        <div id="profileAboutMeFormWrapperWindow" class="dialogThreeQuarterWrapperWindow">
            <div id='profileAboutMeEditTitleWrapper' class="dialogTitle">
                <h3 id='profileAboutMeEditTitle' title="Edit your About Me info">Edit your About Me info</h3>
                <div class="hidden" id="profileAboutMeFormDescription">Edit your About Me info</div>
            </div>
            <div class="dialogWindowInterior">
                <form name="profileAboutMeForm" id="profileAboutMeForm" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="form-group">
                        <label for="profileEditAboutMe">
                            <span>About Me:</span>
                        </label>
                        <div>
                            <textarea class="form-control full-width" name="profileEditAboutMe" id="profileEditAboutMe" form="profileAboutMeForm"></textarea>
                        </div>
                    </div>
                    <div>
                        <input type="button" id="profileAboutMeEditSave" value="Save" class="btn btn-primary" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()"/>
                        <input type="button" id="profileAboutMeEditCancel" value="Cancel" class="btn btn-default" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- BEGIN - Standard Yes/No Modal Popup-->
    <div id="yesNoModalOverlay" class="yesNoModalOverlay hidden" role="dialog">
        <div id="yesNoModalWindow" class="yesNoModalWindow">
            <div class="yesNoModalContent">
                <div id="yesNoModalTitle" class="yesNoModalTitle">Title</div>
                <div id="yesNoModalText" class="yesNoModalText">Text</div>
                <div id="modalButtons">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- BEGIN - Main Content Section-->
<main>
    <section class="pageContent" id="homePageContentSection">
        <div class="pageBanner">
            <div id="logo-container" class="logo-container">
                <div class="container">
                    <div class="page-banner--logo-container flexContainerVerticallyCentered">
                        <div class="page-banner--logo flexLeftOfCenter">
                            <a href="/" role="img" aria-label="GC Talent Cloud">
                                <img id="logoSrc" class="tc-logo logo" src="/images/talent-cloud-logo_full.png" width="229" alt="GC Talent Cloud graphic"/>
                            </a>
                        </div>
                        <div class="page-banner--logo-tagline-divider"></div>
                        <div class="page-banner--tagline flexRightOfCenter" id="taglineMain">People want meaningful work.</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pageBody" id="homePageContent">
            <section class="section homepage--intro">
                <div class="container">
                    <p class="lead" id="taglineSecondary"><a id="mission"></a>The jobs are real. The platform is experimental.</p>
                    <p id="taglineTertiary">Help us build a new hiring model for the Government of Canada.</p>
                </div>
            </section>
            <section class="section page-what-we-do">
                <div class="container">
                    <h2 class="section--title" id="howItWorksHeading">How It Works</h2>
                        <p id="howItWorksLead">GC Talent Cloud connects you to teams and projects where you can use your unique skills to make a difference in the lives of Canadians.</p>
                        <ul class="icon-list">
                                <li class="item">
                                        <span class="item-icon"><i class="fa fa-map-signs fa-fw"></i></span>
                                        <span class="item-text">
                                            <h3 id="ownYourStory">Own Your Story</h3>
                                            <p id="ownYourStoryText">Everyone is unique. Participate in a job selection process that lets you tell your story your way.</p>
                                        </span>
                                </li>
                                <li class="item">
                                        <span class="item-icon"><i class="fa fa-search fa-fw"></i></span>
                                        <span class="item-text">
                                            <h3 id="getFound">Get Found</h3>
                                            <p id="getFoundText">Learn about the work environment and teams that are part of the jobs you’re interested in. Showcase your unique skills and experiences for hiring managers across the country.</p>
                                        </span>
                                </li>
                                <li class="item">
                                        <span class="item-icon"><i class="fa fa-handshake-o"></i></span>
                                        <span class="item-text">
                                            <h3 id="contribute">Contribute</h3>
                                            <p id="contributeText">Find meaningful work that has an impact on Canadians… and be part of the effort to design a better hiring process for Government jobs.</p>
                                        </span>
                                </li>
                        </ul>
                        <p id="howItWorksLeadOut">We want GC Talent Cloud to be a drive engine that allows more Canadians to have a chance to work in Government. We want diverse talent to bring new ideas that will shape programs and services across Canada.</p>
                        <p><span id="howItWorksLast">Interested in chatting about a potential partnership?</span> <a id="contactUs" href="/contact/">Contact us!</a></p>
                    
                </div>
            </section>
            <section class="section section--featured-video">
                <div class="container video-container">

                    <div class="embed-responsive embed-responsive-16by9">
                        <video width="640" height="360" controls id="video_player" controlsList="nodownload">
                            <source src="videos/1479932728445-v0ch3x.mp4" type="video/mp4">
                            Your browser does not support the <code>video</code> tag.
                        </video>
                        <script type="text/javascript">
                            var video_player = document.getElementById('video_player');
                            video_player.volume = 0.5;
                        </script>
                    </div>

                    <div>
                        <a id="transcript" href="#video-transcript" title="Video Transcript" class="button small outline dark wb-lbx lbx-modal wb-init wb-lbx-inited" id="wb-auto-2">Transcript</a>
                    </div>

                    <section id="video-transcript" class="mfp-hide modal-dialog modal-content overlay-def">
                        <header class="modal-header">
                            <h2 class="modal-title">Transcript</h2>
                        </header>
                        <div class="modal-body">
                            <p>Digital isn't just about building apps, or using the latest technology. It's about putting people first, by designing services that are focused on what users need.</p>
                            <p>We're about making it faster, simpler, and easier, to access government services online.</p>
                            <p>We are bringing together top talent from inside and outside of government that includes developers, designers, data scientists and user experience researchers. We're partnering with departments to solve problems, in order to make services better.</p>
                            <p>We're working in the open, using agile methods and constantly iterating, while relentlessly focusing on user needs.</p>
                            <p>CDS is not about IT. It's about service. User centric government services. It's about recognizing services need to be at the centre of our priorities as a government. Our relevance to citizens is in jeopardy if we can't deliver digital services.</p>
                            <p>We are learning from digital government movements across the globe, and working with the digital community across Canada, to shape a Canadian Digital Service.</p>
                            <p>Together, we can deliver world-class services that are simple and easy to use. It's what Canadians expect. Open. Agile. And focused on delivery. We are the Canadian Digital Service.</p>
                        </div>
                    </section>

                </div>
            </section>
            <section class="section homepage--our-team">
                <div class="page-banner--scrim"></div>

                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <h2 class="section--title" id="ourTeam">Our Team</h2>
                            <p id="ourTeamText">We are a small but growing team of public servants passionate about the future of talent in Canada. Learn more about us and make your own contribution to GC Talent Cloud by joining us on one of these channels.</p>
                            <p>
                                <a href="https://gccollab.ca/groups/profile/19750/talent-cloud-nuage-de-talent" target="_blank" class="button yellow">GCcollab</a>
                                <a href="https://twitter.com/TalentCloudGC" target="_blank" class="button yellow">Twitter</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
    
    <section class="pageContent hidden" id="browseJobsSection">
        <div class="pageBanner">
            <h2 class="section--title" id="browseTitle">Browse Jobs</h2>
        </div>
        <div id="jobs" class="pageBody">
            <div id="noJobs" class="hidden">
                No jobs found
            </div>
            <div id="loadingJobs" class="hidden">
                <img class="center-block" src="/images/working.gif" alt="Loading jobs"/>
            </div>
            <div id="jobList" class="jobList hidden">
                
            
            </div>
            
            <div id="jobPosterApplication" class="hidden">

            </div>
        </div>
 
        <div class="jobCount hidden">
            <span id="contactCount">0</span> jobs
        </div>
    </section>
    
    <section class="pageContent hidden" id="viewJobPosterSection">
        <div class="pageBanner">
            <div id="jobPosterHeaderSection" class="container">
                <h2 class="section--title" id="browseTitle">Browse Jobs</h2>
                <h2 id="jobPosterTitle">Job Title</h2>
                <p id="jobPosterLocation">
                    <span id="jobPosterDepartment"></span> - <span id="jobPosterCity"></span>, <span id="jobPosterProvince"></span>
                </p>
                <p id="jobPosterId">#<span id="jobPosterIdValue"></span></p>
                <input id="jobPosterJobId" type="hidden"/>
            </div>
        </div>
        <div class="pageBody">
            <section id="jobPosterDatapointsSection">
                <div class="container">
                    <ul>
                        <li>
                            <p id="jobPosterSalaryRange">
                                <span id="jobPosterSalaryRangeLabel">Compensation</span>: <span id="jobPosterSalaryRangeValue"></span>
                            </p>
                        </li>
                        <li>
                            <p id="jobPosterTerm">
                                <span id="jobPosterTermLabel">Duration</span>: <span id="jobPosterTermValue"></span>
                            </p>
                        </li>
                        <li>
                            <p id="jobPosterJobLevel">
                                <span id="jobPosterJobLevelLabel">Job Level</span>: <span id="jobPosterJobLevelValue"></span>
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
            <section class='jobPosterSection'>
                <div class="container">
                    <h3 id="jobPosterImpactLabel" class="jobPosterSectionTitle">Impact</h3>
                    <p id="jobPosterImpact"></p>
                </div>
            </section>
            <section class='jobPosterSection'>
                <div class="container">
                    <h3 id="jobPosterKeyTasksLabel" class="jobPosterSectionTitle">Key Tasks</h3>
                    <ul id="jobPosterKeyTasks"></ul>
                </div>
            </section>
            <section class='jobPosterSection'>
                <div class="container">
                    <h3 id="jobPosterCoreCompetenciesLabel" class="jobPosterSectionTitle">Core Competencies</h3>
                    <ul id="jobPosterCoreCompetencies"></ul>
                </div>
            </section>
            <section class='jobPosterSection'>
                <div class="container">
                   <h3 id="jobPosterDevelopingCompetenciesLabel" class="jobPosterSectionTitle">Developing Competencies</h3>
                    <ul id="jobPosterDevelopingCompetencies"></ul>
                </div>
            </section>
            <section class='jobPosterSection'>
                <div class="container">
                    <h3 id="jobPosterOtherRequirementsLabel" class="jobPosterSectionTitle">Other Requirements</h3>
                    <ul id="jobPosterOtherRequirements"></ul>
                </div>
            </section>
            <section class='jobPosterSection'>
                <div class='container'>
                    <h3 id="jobPosterHiringManagerLabel" class="jobPosterSectionTitle">Hiring Manager</h3>
                    <input type='hidden' id='jobPosterHiringManagerUserId'/>
                    
                    <div class="hiringManagerSummaryWrapper">  
                        <div id='hiringManagerSummaryImageWrapper'>
                            <img id='jobPosterHiringManagerProfilePic' alt="Hiring Manager" src="images/user.png">
                            <p id='jobPosterHiringManagerName' class="hiringManagerSummaryName"></p>
                        </div>
                        <div id='hiringManagerSummaryContentWrapper' >
                            <h4><span id='jobPosterHiringManagerTitle'></span> <span id="jobPosterHiringManagerPositionAtLabel">at</span> <span id='jobPosterHiringManagerDepartment'></span></h4>
                            <p id='jobPosterHiringManagerAboutMe' class-"truncate"></p>
                            <div id='hiringManagerSummaryButtonWrapper'>
                                <button id="jobPosterHiringManagerButton" class="btn btn-primary" onclick="ManagerProfileAPI.showManagerProfile(document.getElementById('jobPosterHiringManagerUserId').value);">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class='jobPosterSection'>
                <div class="container">
                    <h3 id="jobPosterWorkEnvironmentLabel" class="jobPosterSectionTitle">Work Environment</h3>
                    <div class="workEnvironmentAnswerWrapper">
                        <p><span id='jobPosterRemoteWork_label'>Remote location allowed</span>: <span class="workEnvironmentAnswer" id="jobPosterRemoteWork"></span></p>
                        <p><span id='jobPosterTelework_label'>Telework allowed</span>: <span class="workEnvironmentAnswer" id="jobPosterTelework"></span></p>
                        <p><span id='jobPosterFlexHours_label'>Flexible hours allowed</span>: <span class="workEnvironmentAnswer" id="jobPosterFlexHours"></span></p>
                    </div>
                    <div class="workEnvironmentSummaryWrapper">  
                        <div id='workEnvironmentSummaryImagesWrapper'>
                            <figure>
                                <img class="jobPosterWorkEnvironmentImage" id='jobPosterWorkEnvironment_1' alt="First image of workplace environment" src="images/user.png" width="300">
                                <!--<figcaption>Caption 1</figcaption>-->
                            </figure>
                            <figure>
                                <img class="jobPosterWorkEnvironmentImage" id='jobPosterWorkEnvironment_2' alt="Second image of workplace environment" src="images/user.png" width="300">
                                <!--<figcaption>Caption 2</figcaption>-->
                            </figure>
                            <figure>
                                <img class="jobPosterWorkEnvironmentImage" id='jobPosterWorkEnvironment_3' alt="Third image of workplace environment" src="images/user.png" width="300">
                                <!--<figcaption>Caption 3</figcaption>-->
                            </figure>
                        </div>
                    </div>
            </section>
            <section class="jobPosterSection">
                <div class="container">
                    <h3 id="jobPosterTeamCultureLabel" class="jobPosterSectionTitle">Team Culture</h3>
                    <div class="container">
                        <p><span id='jobPosterTeamSize_label'>Team size</span>: <span class="blue-highlight-text" id="jobPosterTeamSize"></span></p>
                        <p><span id='jobPosterGcDirLink_label'>Meet the team in</span> <a id="jobPosterGcDirLink" href="#" target="_blank">GCdirectory</a></p>
                        <p><span id="jobPosterTeamNarrativeText"></span></p>
                    </div>
                </div>
            </section>

            <div id="jobPosterButtonWrapper">
                <button id="jobPosterApplyButton" class="btn btn-primary" value="View" onclick="JobApplicationAPI.showCreateJobApplication(document.getElementById('jobPosterJobId').value)">
                    Apply Now
                </button>
            </div>
        </div>
    </section>
    
    <section class="pageContent hidden" id="profileSection">
        <div class="pageBanner">
            <div class="profileBannerFiller"></div>
        </div>
        <div class="pageBody">
            <div class="container">
                <div id="profileBasicInfo" class="profileBasicInfo centered">
                    <div id="profileBasicInfoTopBar" class="profileBasicInfoTopBar flexContainerVerticallyCentered">
                        <div class="flexLeftOfCenter"> 
                            <ul id="profileSocialMediaLinks" class="profileSocialMediaLinks"> 
                                <li id="profileTwitterLinkWrapper" class="hidden">
                                    <a href="#" id="profileTwitterLink" target="_blank"><img src="/images/Twitter_icon_white.svg" class="socialMediaLink" alt="Twitter logo"/></a>
                                </li>
                                <li id="profileLinkedinLinkWrapper" class="hidden">
                                    <a href="#" id="profileLinkedinLink" target="_blank"><img src="/images/Linkedin_icon_white.svg" class="socialMediaLink" alt="LinkedIn logo"/></a>
                                </li>    
                            </ul>
                        </div>
                        <img id="myProfilePic" class="profilePicLarge" src="images/user.png" alt="Profile Pic"/>
                        <div class="flexRightOfCenter">
                            <a href="javascript:void(0)" class="profileBasicInfoEdit" onclick="JobSeekerAPI.showJobSeekerProfileBasicInfoEdit()">
                                <img src="/images/edit_profile_pic.svg" alt="Edit Basic Info" class="editImage"/>
                            </a>
                        </div>
                    </div>
                    <div id="profileNameWrapper">
                        <div class="profileName">
                            <span id="profileFirstName"></span> <span id="profileLastName"></span>
                        </div>
                    </div>
                    <div class="profileTagLineContainer">
                        <p id="profileTagLine">Default tag line!</p>
                        <p>
                        <!--p>
                            <strong>Available: </strong><span id="profileStartDate"></span>
                            <br>
                            <strong>Status: </strong><span id="profileStatus"></span>
                        </p-->
                        </p>
                    </div>
                    <input type="hidden" id="profileId"/>
                    <input type="hidden" id="profileLastUpdated"/>
                </div>
                <div id="profileAboutMeWrapper" class="profileSubSection">
                    <div class="profileSubSectionTitleBar">
                        <h2 id="aboutMe">About Me</h2>
                        <a href="javascript:void(0)" id="profileAboutMeEdit" class="sectionEditBtn" onclick="JobSeekerAPI.showJobSeekerProfileAboutMeEdit()"><img src="/images/btn_edit_dark.png" alt="Edit About Me" class="editImage"/></a>
                    </div>
                    <p id="profileAboutMe">This is the about me section.</p>
                </div>
                <!--
                <div id="profileSkillsWrapper" class="profileSubSection">
                    <div class="profileSubSectionTitleBar">
                        <h2>My Skills and Knowledge</h2>
                        <a href="javascript:void(0)" id="profileSkillsEdit" class="sectionEditBtn"><img src="/images/btn_edit_dark.png" alt="Edit Skills" class="editImage"/></a>
                    </div>
                    <ul id="profileSkillsList">
                    </ul>
                </div>
                -->
            </div>
        </div>
    </section>
    <section class="pageContent hidden" id="managerProfileSection">
        <div class="pageBanner">
            <div class="profileBannerFiller"></div>
        </div>
        <div class="pageBody">
            <div class="container">
                <div id="managerProfileBasicInfo" class="profileBasicInfo centered">
                    <div id="managerProfileBasicInfoTopBar" class="profileBasicInfoTopBar flexContainerVerticallyCentered">
                        <div class="flexLeftOfCenter"> 
                            <ul id="managerProfileSocialMediaLinks" class="profileSocialMediaLinks"> 
                                <li id="managerProfileTwitterLinkWrapper" class="hidden">
                                    <a href="#" id="managerProfileTwitterLink" target="_blank"><img src="/images/Twitter_icon_white.svg" class="socialMediaLink" alt="Twitter logo"/></a>
                                </li>
                                <li id="managerProfileLinkedinLinkWrapper" class="hidden">
                                    <a href="#" id="managerProfileLinkedinLink" target="_blank"><img src="/images/Linkedin_icon_white.svg" class="socialMediaLink" alt="LinkedIn logo"/></a>
                                </li>    
                            </ul>
                        </div>
                        <img id="managerProfilePic" class="profilePicLarge" src="images/user.png" alt="Manager Profile Pic"/>
                        <div class="flexRightOfCenter"></div>
                    </div>
                    <div id="managerProfileNameWrapper">
                        <div id="managerProfileName" class="profileName">
                            <span id="managerProfileFirstName"></span> <span id="managerProfileLastName"></span>
                        </div>
                    </div>
                    <div id="managerProfilePositionWrapper" class="profileTagLineContainer">
                        <p><span id="managerProfilePosition" class="bold"></span> <span id="managerProfilePositionAtLabel"></span> <span id="managerProfileDepartment" class="bold"></span></p>
                    </div>
                    <input type="hidden" id="managerProfile_managerProfileId"/>
                    <input type="hidden" id="managerProfile_userId"/>
                    <input type="hidden" id="managerProfileLastUpdated"/>
                </div>
                <div class="profileSubSection">
                    <div class="profileSubSectionTitleBar">
                        <h2 id="managerProfileAboutMeTitle" >About Me</h2>
                    </div>
                    <p id="managerProfileAboutMe">This is the about me section.</p>
                </div>
                <div class="profileSubSection">
                    <div class="profileSubSectionTitleBar">
                        <h2 id="managerProfileAccomplishmentTitle">My Greatest Accomplishment</h2>
                    </div>
                    <p id="managerProfileAccomplishment">This is my greatest accomplishment.</p>
                </div>
                <div class="profileSubSection">
                    <div class="profileSubSectionTitleBar">
                        <h2 id="managerProfileLeadershipStyleTitle">My Leadership Style</h2>
                    </div>
                    <p id="managerProfileLeadershipStyle">This is my leadership style.</p>
                </div>
                <div class="profileSubSection">
                    <div class="profileSubSectionTitleBar">
                        <h2 id="managerProfileExpectationsTitle">My Expectations of Employees</h2>
                    </div>
                    <p id="managerProfileExpectations">These are my employee expectations.</p>
                </div>
                <div class='profileSubSection'>
                    <div class='profileSubSectionTitleBar'>
                        <h2 id="managerProfileDecisionMakingTitle">My Approach to Decision Making</h2><!---Queenie TODO->
                    </div>
                    <div>
                        <div class="multi-btn-group-form-group">
                            <div class='multi-btn-group-form-group-label'>
                                <span id="managerProfile_review_label">How often do you review your teams work before it is shared?</span>
                            </div>
                            <div style='display:inline-block;width:560px'>
                                <div class="multi-btn-group clearfix">
                                    <div id='options' style="position:absolute;top:0px;right:0px;width:560px;height:2em;z-index:100;font-size: 1.2em !important;">
                                        <input type="radio" id="option0" name="managerProfile_review_options_groupName" value="option0" class="accessAid" />
                                        <label for="option0" class='option0Label' id="almostNever">Almost never</label>
                                        <input type="radio" id="option1" name="managerProfile_review_options_groupName" value="option1" class="accessAid" />
                                        <label for="option1" class='option1Label' id="rarely">Rarely</label>
                                        <input type="radio" id="option2" name="managerProfile_review_options_groupName" value="option2" class="accessAid" />
                                        <label for="option2" class='option2Label' id="sometimes">Sometimes</label>
                                        <input type="radio" id="option3" name="managerProfile_review_options_groupName" value="option3" class="accessAid" />
                                        <label for="option3" class='option3Label' id="usually">Usually</label>
                                        <input type="radio" id="option4" name="managerProfile_review_options_groupName" value="option4" class="accessAid" />
                                        <label for="option4" class='option4Label' id="almostAlways">Almost always</label>
                                    </div>
                                    <div id='review_options' class="option0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="multi-btn-group-form-group">
                            <div class='multi-btn-group-form-group-label'>
                                <span id="managerProfile_stayLate_label">How often do you get in early or stay late to get some extra work done?</span>
                            </div>
                            <div style='display:inline-block;width:560px'>
                                <div class="multi-btn-group clearfix">
                                    <div id='managerProfile_staylate_options' style="position:absolute;top:0px;right:0px;width:560px;height:2em;font-size: 1.2em !important;z-index:100">
                                        <input type="radio" id="staylate_option0" name="managerProfile_staylate_groupName" value="option0" class="accessAid" />
                                        <label for="staylate_option0" class='option0Label'>Almost never</label>
                                        <input type="radio" id="staylate_option1" name="managerProfile_staylate_groupName" value="option1" class="accessAid" />
                                        <label for="staylate_option1" class='option1Label'>Rarely</label>
                                        <input type="radio" id="staylate_option2" name="managerProfile_staylate_groupName" value="option2" class="accessAid" />
                                        <label for="staylate_option2" class='option2Label'>Sometimes</label>
                                        <input type="radio" id="staylate_option3" name="managerProfile_staylate_groupName" value="option3" class="accessAid" />
                                        <label for="staylate_option3" class='option3Label'>Usually</label>
                                        <input type="radio" id="staylate_option4" name="managerProfile_staylate_groupName" value="option4" class="accessAid" />
                                        <label for="staylate_option4" class='option4Label'>Almost always</label>
                                    </div>
                                    <div id='staylate' class="option0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="multi-btn-group-form-group">
                            <div class='multi-btn-group-form-group-label'>
                                <span id='managerProfile_engagement_label'>How often do you engage your team before responding to management?</span>
                            </div>
                            <div style='display:inline-block;width:560px'>
                                <div class="multi-btn-group clearfix">
                                    <div id='createEditProfile_engage_options' style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
                                        <input type="radio" id="engage_option0" name="managerProfile_engagement_groupName" value="option0" class="accessAid" />
                                        <label for="engage_option0" class='option0Label'>Almost never</label>
                                        <input type="radio" id="engage_option1" name="managerProfile_engagement_groupName" value="option1" class="accessAid" />
                                        <label for="engage_option1" class='option1Label'>Rarely</label>
                                        <input type="radio" id="engage_option2" name="managerProfile_engagement_groupName" value="option2" class="accessAid" />
                                        <label for="engage_option2" class='option2Label'>Sometimes</label>
                                        <input type="radio" id="engage_option3" name="managerProfile_engagement_groupName" value="option3" class="accessAid" />
                                        <label for="engage_option3" class='option3Label'>Usually</label>
                                        <input type="radio" id="engage_option4" name="managerProfile_engagement_groupName" value="option4" class="accessAid" />
                                        <label for="engage_option4" class='option4Label'>Almost always</label>
                                    </div>
                                    <div id='engage' class="option0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="multi-btn-group-form-group">
                            <div class='multi-btn-group-form-group-label'>
                                <span id='managerProfile_developmentOpportunities_Label'>How often do you approve development opportunities for your employees?</span>
                            </div>
                            <div style='display:inline-block;width:560px'>
                                <div class="multi-btn-group clearfix">
                                    <div id='createEditProfile_devops' style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
                                        <input type="radio" id="devops_option0" name="managerProfile_developmentOpportunities_groupName" value="option0" class="accessAid" />
                                        <label for="devops_option0" class='option0Label'>Almost never</label>
                                        <input type="radio" id="devops_option1" name="managerProfile_developmentOpportunities_groupName" value="option1" class="accessAid" />
                                        <label for="devops_option1" class='option1Label'>Rarely</label>
                                        <input type="radio" id="devops_option2" name="managerProfile_developmentOpportunities_groupName" value="option2" class="accessAid" />
                                        <label for="devops_option2" class='option2Label'>Sometimes</label>
                                        <input type="radio" id="devops_option3" name="managerProfile_developmentOpportunities_groupName" value="option3" class="accessAid" />
                                        <label for="devops_option3" class='option3Label'>Usually</label>
                                        <input type="radio" id="devops_option4" name="managerProfile_developmentOpportunities_groupName" value="option4" class="accessAid" />
                                        <label for="devops_option4" class='option4Label'>Almost always</label>
                                    </div>
                                    <div id='devops' class="option0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='profileSubSection'>
                    <div class='profileSubSectionTitleBar'>
                        <h2 id='managerProfileEducationTitle'>Education</h2>
                    </div>
                    <p class='profileSubSectionBlock' id='managerProfileEducation'>This is my education.</p>
                </div>
                <div class='profileSubSection'>
                    <div class='profileSubSectionTitleBar'>
                        <h2 id='managerProfileExperienceTitle'>Work History</h2>
                    </div>
                    <p class='profileSubSectionBlock' id='managerProfileExperience'>This is my work history.</p>
                </div>
            </div>
        </div>
    </section>
    <section class="pageContent hidden" id="createJobApplicationSection">
        <div class="pageBanner">
            <h2 class="section--title" id="createJobApplicationTitle">My Job Application</h2>
            <div class="container centered">
                <p id="createJobApplicationPositionLabel">for the position of:</p>
                <h3 id="createJobApplicationPostition">Job title</h3>
            </div>
            <input type='hidden' id='createJobApplicationJobApplicationId' />
            <input type='hidden' id='createJobApplicationJobPosterId' />
            <input type='hidden' id='createJobApplicationJobSeekerId' />
        </div>
        <div class="pageBody">
            <div class="container centered">
                <img id="createJobApplicationProfilePic" class="profilePicLarge" src="images/user.png" alt="My Profile Pic"/>
                <div class="profileName">
                    <span id="createJobApplicationFirstName"></span> <span id="createJobApplicationLastName"></span>
                </div>
            </div>
            <form name="createJobApplicationForm" id="createJobApplicationForm" novalidate="novalidate" method="post" enctype="application/x-www-form-urlencoded">
                <div class="container">
                    <div id="createJobApplicationOpenEndedQuestionsWrapper">

                    </div>
                </div>
            </form>
            <div id='createJobApplicationButtonWrapper'>
                <button id="createJobApplicationSubmitButton" class="btn btn-primary" value="View" onclick="JobApplicationAPI.submitNewJobApplication();">
                    Submit
                </button>
            </div>
        </div>
    </section>
    <section class="pageContent hidden" id="createJobApplicationConfirmationSection">
         <div class="pageBanner">
            <h2 class="section--title" id="createJobApplicationTitle">My Job Application</h2>
        </div>
        <div class="pageBody">
            <div id='createJobApplicationConfirmationBodyWrapper'>
                <div class="centered container">
                    <p id="createJobApplicationConfirmationPositionLabel">
                        You have applied for the position of:
                    </p>
                    <h3 id="createJobApplicationConfirmationPostition">Job title</h3>
                    <p id="createJobApplicationConfirmationTrackingReminder">
                        Track the application from your Dashboard.
                    </p>
                    <button id="createJobApplicationConfirmationContinueButton" class="btn btn-primary" value="View" onclick="JobPostAPI.showBrowseJobs();">
                        Continue to Dashboard
                    </button>
                </div>
            </div>
            <div class="confirmationFramingBar"></div>
        </div>
    </section>
    <section class="pageContent hidden" id="dashboardSection">
        <div class="pageBanner">
            <h2 class="section--title" id="dashBoardTitle">Dashboard</h2>
        </div>
        <div class="pageBody">
            <div class="container" id="dashboardContainer">
                <h3 id="yourApplicationsTitle">Your Applications</h3>
                <div id="yourApplications">
                    
                </div>
            </div>
        </div>
    </section>
</main>
<?php include 'inc/footer.php';?>
</body>
</html>
