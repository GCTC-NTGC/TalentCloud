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
        <a class="wb-sl" href="#jobs">Skip to available jobs</a>
    </li>
</ul>

<?php include 'inc/fip.php';?>
<?php include 'inc/nav.php';?>

<!-- A top-level dialog or overlay elements should be children of this div-->
<div id="overlays">
    <!-- BEGIN - Registration Dialog and Overlay-->
    <div id="registerFormOverlay" class="hidden" role="dialog" aria-labelledby="registerFormTitle" aria-describedby="registerFormDescription">
        <div id="registerFormWrapperWindow" class="registerFormWrapperWindow">
            <div class="wb-frmvld wb-init" id="registerFormWrapper">
                <form name="registerForm" id="registerForm" novalidate="novalidate" method="post" enctype="application/x-www-form-urlencoded">
                    <div id='registerFormTitleWrapper'>
                        <h3 id='registerFormTitle'>
                            <img src="images/logo.svg" id="registerLogoImage" alt="registerLogoImage"/>
                            <span id="registerFormTitleText">Talent Cloud Registration</span>
                        </h3>
                        <div class="hidden" id="registerFormDescription">Register for Talent Cloud</div>
                    </div>
                    <div class="form-group">
                        <label for="register_email">
                            <span>Email</span>
                            <strong id="register_email_error" class="error hidden">
                                <span id="register_email_error_msg" class="label label-danger"></span>
                            </strong>
                        </label>
                        <input class="form-control form-textbox" id="register_email" name="register_email" type="text" required=""/>
                    </div>
                    <div class="form-group">
                        <label for="register_password">
                            <span>Password (min. 6 characters)</span>
                            <strong id="register_password_error" class="error hidden">
                                <span id="register_password_error_msg" class="label label-danger"></span>
                            </strong>
                        </label>
                        <input class="form-control form-textbox" id="register_password" name="register_password" type="password" required=""/>
                    </div>
                    <div class="form-group">
                        <label for="register_password_confirm">
                            <span>Confirm password</span>
                            <strong id="register_password_confirm_error" class="error hidden">
                                <span id="register_password_confirm_error_msg" class="label label-danger"></span>
                            </strong>
                        </label>
                        <input class="form-control form-textbox" id="register_password_confirm" name="register_password_confirm" type="password" required=""/>
                    </div>
                    <div>
                        <input type="button" class="btn btn-primary" value="Register" onclick="UserAPI.register();">
                        <input type="button" class="btn btn-default" value="Cancel" onclick="UserAPI.hideRegisterForm()">
                    </div>
                    <div style="margin: 1em 0 0 0;">
                        <p><a href="javascript:void(0)" onclick="UserAPI.hideRegisterForm(); return UserAPI.showLogin(this);" class="ui-link" id="switchToLogin" title="Already have an account? Click here to login.">Already have an account? Click here to login</a></p>
                    </div>
                </form>  
            </div>
            <div id="registrationFormStatus" class="hidden">
                <div id='registerFormStatusTitleWrapper'>
                    <h3 id='registerFormStatusTitle'>
                        <img src="images/logo.svg" id="registerStatusLogoImage" alt="registerLogoImage"/>
                        <span id="registerFormStatusTitleText">Talent Cloud Registration Status</span>
                    </h3>
                    <div id="registrationFormStatusMessage">

                    </div>
                    <div id="registrationFormEmailConfMessage">

                    </div>
                    <div>
                        <input type="button" class="btn btn-primary" value="Login" onclick="UserAPI.hideRegisterForm(); return UserAPI.showLogin(this);"/>
                        <input type="button" class="btn btn-default" id="registerFormStatusClose" value="Close" onclick="UserAPI.hideRegisterConf()">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- BEGIN - Login Modal Dialog and Overlay-->
    <div id="loginOverlay" class="hidden" role="dialog" aria-labelledby="loginTitle" aria-describedby="loginFormDescription">
        <div id="loginFormWrapperWindow" class="loginFormWrapperWindow">
            <form name="loginForm" id="loginForm" method="post" enctype="application/x-www-form-urlencoded">
                <div id='loginTitleWrapper'>
                    <h3 id='loginTitle' title="Login to TalentCloud"><img src="images/logo.svg" id="loginLogoImage" alt="Login Logo Image"/>Login</h3>
                    <div class="hidden" id="loginFormDescription">Login to TalentCloud</div>
                </div>
                <div class="label label-danger hidden" id="loginErrors"></div>
                <div class="form-group">
                    <label for="login_email">
                        <span>Email address:</span>
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
                <div style="margin: 2em 0 0 0;">
                    <input type="button" id="login_button" value="Login" class="btn btn-primary" onclick="return UserAPI.login()"/>
                    <input type="button" id="login_cancel_button" value="Cancel" class="btn btn-default" onclick="UserAPI.cancelLogin()"/>
                </div>
            </form>
            <div style="margin: 1em 0 0 0;">
                <a href="javascript:void(0)">Forgot your password? Click here to reset it. (Not working yet.)</a>
            </div>
            <div style="margin: 1em 0 0 0;">
                <p><a href="javascript:void(0)" onclick="UserAPI.cancelLogin(); return UserAPI.showRegisterForm(this);" class="ui-link" id="switchToRegister" title="Don't have an account? Click here to register.">Don't have an account? Click here to register</a></p>
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
                                <span>Twitter Username:</span>
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
                                <input class="form-control full-width" type="text" name="profileEditLinkedin" id="profileEditLinkedin" placeholder="https://www.linkedin.com/in/exampleuser"/>
                            </div>
                        </div>
                        <div>
                            <input type="button" id="profileBasicInfoEditSave" value="Save" class="btn btn-primary" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()"/>
                            <input type="button" id="profileBasicInfoEditCancel" value="Cancel" class="btn btn-default" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
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
                            <input type="file" id="profilePicUploadField" class="fileInput" name="Profile Pic" accept="image/*" />
                        </div>
                        <div id="profilePicUploadDrop" class="fileDropZone fileDropZoneNormal">
                            <p>Drop file here</p>
                        </div>
                    </div>
                    <div class="rightPane">
                        <div id="fileUploadPreviewPanel" style="min-height:130px;">
                            <a id="profilePicUploadClear" class="fileUploadReset" href="#" title="Remove all files from list">Clear</a>
                            <ul id="profilePicUploadPreview" class="filePreviewList"></ul>
                        </div>
                        <div id="fileUploadButtons">
                            <a id="profilePicCancelBtn" href="javascript:void(0)" class="btn btn-default" onclick="JobSeekerAPI.hideUploadProfilePic()">Cancel</a>
                            <a id="profilePicUploadBtn" class="btn btn-primary" href="#" title="Upload all files in list">Upload</a>
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
<main class="contentContainer">
    <section class="section" id="browseJobsSection">
        <div class="container">

            <h2 class="section--title">Browse Jobs</h2>
            <!--
            <div class="row icon-text-list">
                <div class="col-xs-12 col-sm-4 icon-text">
                    <div class="cds-icon"><i class="fa fa-code" aria-hidden="true"></i></div>
                    <div class="text">Sample text / icon</div>
                </div>
                <div class="col-xs-12 col-sm-4 icon-text">
                    <div class="cds-icon"><i class="fa fa-cogs" aria-hidden="true"></i></div>
                    <div class="text">Sample text / icon</div>
                </div>
                <div class="col-xs-12 col-sm-4 icon-text">
                    <div class="cds-icon"><i class="fa fa-comments-o" aria-hidden="true"></i></div>
                    <div class="text">Sample text / icon</div>
                </div>
            </div>
            <a href="/how-we-work" class="button">Sample button</a>-->
        </div>

        <div id="jobs">
            <div id="noJobs" class="hidden">
                No jobs found
            </div>
            <div id="loadingJobs" class="hidden">
                <img src="/images/working.gif" alt="Loading jobs"/>
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
    
    <section class="section" id="viewJobPosterSection" class="hidden">
        <div id="viewJobPosterApplicationOverlay" class="container">
            <div id="jobSummary" class="jobSummary">

            </div>
        </div>
    </section>
    
    <section class="section hidden" id="profileSection">
        <div id="profileBasicInfo" class="centered">
            <div id="profileBasicInfoTopBar">
                <div class="socialMediaWrapper"> 
                    <ul id="profileSocialMediaLinks"> 
                        <li id="profileTwitterLinkWrapper" class="hidden">
                            <a href="#" id="profileTwitterLink" target="_blank"><img src="/images/twitter.png" class="socialMediaLink" alt="Twitter logo"/></a>
                        </li>
                        <li id="profileLinkedinLinkWrapper" class="hidden">
                            <a href="#" id="profileLinkedinLink" target="_blank"><img src="/images/linkedin.png" class="socialMediaLink" alt="LinkedIn logo"/></a>
                        </li>    
                    </ul>
                </div>
                <img id="myProfilePic" class="profilePicLarge" src="images/user.png" alt="Default user"/>
                <div class="editProfileWrapper">
                    <a href="javascript:void(0)" id="profileBasicInfoEdit" onclick="JobSeekerAPI.showJobSeekerProfileBasicInfoEdit()"><img src="/images/btn_edit_dark.png" alt="Edit Basic Info" class="editImage"/></a>
                </div>
            </div>
            <div id="profileNameWrapper">
                <div id="profileName">
                    <span id="profileFirstName"></span> <span id="profileLastName"></span>
                </div>
            </div>
            <div class="profileTagLineContainer">
                <p id="profileTagLine">Default tag line!</p>
                <p>
                    <strong>Available: </strong><span id="profileStartDate"></span>
                    <br>
                    <strong>Status: </strong><span id="profileStatus"></span>
                </p>
            </div>
            <input type="hidden" id="profileId"/>
            <input type="hidden" id="profileLastUpdated"/>
        </div>
        <div id="profileAboutMeWrapper" class="profileSection">
            <div class="profileSectionTitleBar">
                <h2>About Me</h2>
                <a href="javascript:void(0)" id="profileAboutMeEdit" class="sectionEditBtn" onclick="JobSeekerAPI.showJobSeekerProfileAboutMeEdit()"><img src="/images/btn_edit_dark.png" alt="Edit About Me" class="editImage"/></a>
            </div>
            <p id="profileAboutMe">This is the about me section.</p>
        </div>
        <div id="profileSkillsWrapper" class="profileSection">
            <div class="profileSectionTitleBar">
                <h2>My Skills and Knowledge</h2>
                <a href="javascript:void(0)" id="profileSkillsEdit" class="sectionEditBtn"><img src="/images/btn_edit_dark.png" alt="Edit Skills" class="editImage"/></a>
            </div>
            <ul id="profileSkillsList">
            </ul>
        </div>
    </section>
</main>
<?php include 'inc/footer.php';?>
</body>
</html>