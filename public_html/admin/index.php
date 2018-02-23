<?php //header('Content-Type: text/html; charset=utf-8');  ?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor . 
-->
<html lang="en">
    <head>
        <title>GC Talent Cloud</title>
        <?php include '../inc/head.php'; ?>
        <?php include '../inc/head-admin.php'; ?>
    </head>

    <body>
        <ul id="wb-tphp">
            <li class="wb-slc">
                <a class="wb-sl" href="#jobs">Skip to available jobs</a>
            </li>
        </ul>

        <?php include '../inc/fip.php'; ?>
        <?php include '../inc/nav-admin.php'; ?>

        <!-- All top-level dialog or overlay elements should be children of this div-->
        <div id="overlays">
            <!-- BEGIN - Registration Form Modal Dialog and Overlay-->
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
                                <input type="button" class="btn btn-primary" id="registerFormRegisterBtn" value="Register" onclick="UserAPI.register(true);">
                            </div>
                            <div class="clear"></div>
                        </form>  
                    </div>
                </div>
            </div>
            <!-- BEGIN - Registration Status Dialog and Overlay-->
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
                            <div class="hidden">
                                <div style="margin: 1em 0 0 0;">
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
            <div id="profilePicUploadOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profilePicUploadTitle" aria-describedby="profilePicUploadDescription">
                <div id="profileBasicInfoEditWrapperWindow" class="dialogThreeQuarterWrapperWindow">
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
                                <a id="profilePicCancelBtn" href="javascript:void(0)" class="btn btn-default" onclick="CreateEditProfileAPI.hideUploadProfilePic()">Cancel</a>
                                <a id="profilePicUploadBtn" class="btn btn-primary" href="#" title="Upload all files in list">Upload</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- BEGIN - Standard Yes/No Modal Popup-->
            <div class="yesNoModalOverlay hidden" id="yesNoModalOverlay" role="dialog">
                <div id="yesNoModalWindow" class="yesNoModalWindow">
                    <div class="yesNoModalContent">
                        <div id="yesNoModalTitle" class="yesNoModalTitle">Title</div>
                        <div id="yesNoModalText" class="yesNoModalText">Text</div>
                        <div id="modalButtons">
                        </div>
                    </div>
                </div>
            </div>

            <div id="viewJobPosterOverlay" class="viewJobPosterOverlay hidden">
                <div id="viewJobPosterWrapperWindow" class="viewJobPosterWrapperWindow">
                    <div class="closeButton">
                        <a href="javascript:JobPostAPI.hideJobPoster()" class="closeButtonLink"> </a>
                    </div>
                    <div id="jobPoster" class="jobPoster">

                    </div>
                </div>
            </div>

            <!-- BEGIN - Update Overlay-->
            <div class="yesNoModalOverlay hidden" id="updateOverlay">
                <div id="updateWindow" class="yesNoModalWindow">
                    <div class="updateContent">
                        <img src="/images/working.gif" alt=""/>
                    </div>
                </div>
            </div>
        </div>
        <main>
            <section class="pageContent hidden" id="jobSeekersSection">
                <div class="pageBanner">
                    <h2 class="section--title" id="jobSeekersSectionTitle">Job Seekers</h2>
                </div>
                <div class="pageBody">
                    <div class="container">
                        <div id="jobSeekers">
                            <div id="noJobSeekers">
                                No job seekers found
                            </div>
                            <div id="loadingJobSeekers" class="hidden">
                                <img src="/images/working.gif" alt="loading job seekers"/>
                            </div>
                            <div id="jobSeekerList" class="jobSeekerList hidden">

                            </div>
                        </div>
                    </div>
                    <div class="jobSeekerCount hidden">
                        <span id="contactCount">0</span> job seekers
                    </div>
                </div>
            </section>
            <section id="createEditProfileSection" class="pageContent hidden">
                <div class="pageBanner">
                    <div id="profilePicBannerWrapper">
                        <img id="myProfilePic" class="profilePicLarge" src="../images/user.png" alt="Profile Pic"/>
                        <div class="editProfileWrapper">
                            <a href="javascript:void(0)" id="editMyProfilePic" onclick="CreateEditProfileAPI.showUploadProfilePic()">
                                <img id="editMyProfilePicImg" src="../images/edit_profile_pic.svg" alt="Edit Basic Info" class="editImage"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="pageBody">
                    <div class="container">
                        <div id="profileBannerFiller"></div>
                        <div class="wb-frmvld wb-init">
                            <div class="tabbedForm">
                                <div class="section">
                                <!-- Where the old steps resided -->
                                <form method="post" name="CreateEditProfileForm" id="CreateEditProfileForm">
                                    <input type="hidden" id="UserId"/>
                                    <input type="hidden" id="ManagerProfileId"/>
                                    <input type="hidden" id="ManagerProfileDetailsId"/>
                                    <div id="profileCommon">
                                        <div style='text-align: center;width:100%;'>
                                            <div style='width:500px;margin:1em auto;text-align: center;'>
                                                <span id="createEditProfile_name_preview" style="font-size:1.5em;">name</span>
                                            </div>
                                        </div>
                                        <div style='text-align: center;width:100%;'>
                                            <div style='width:500px;margin:1em auto;text-align: center;'>
                                                <span id="createEditProfile_position_preview">position</span>
                                            </div>
                                        </div>
                                        <div style='text-align: center;width:100%;'>
                                            <div style='width:500px;margin:1em auto;text-align: center;'>
                                                <span id="createEditProfile_department_preview">department</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="createEditProfile_step1" class="stepGroup_createEditProfile">
                                        <div class="tabsWrapper">
                                            <div class="tabsSteps">
                                        <div class="three-step-tab tab-current"><span id="createEditProfileStep1Label_1">About</span></div>
                                        <div class="three-step-tab"><span id="createEditProfileStep2Label_1">Leadership</span></div>
                                        <div class="three-step-tab"><span id="createEditProfileStep3Label_1">Other</span></div>
                                            </div>
                                            <div class="tabs">
                                                <div class="steptab active"> </div>
                                                <div class="steptab inactive"> </div>
                                                <div class="steptab inactive"> </div>
                                            </div>
                                        </div>
                                        <div class="stepGroupForm">
                                            <h3>About Me</h3>
                                            <div style="margin-top:2em;">
                                                <div class="createEditProfileEnglishPane">
                                                    <div class="form-group">
                                                        <label for="createEditProfile_bio">
                                                            <span id="createEditProfile_bio_label">A little bit about me</span>
                                                            <strong id="createEditProfile_bio_error" class="error hidden">
                                                                <span id="createEditProfile_bio_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_bio" id="createEditProfile_bio"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_proudOf">
                                                            <span id="createEditProfile_proudOf_label">What I'm most proud of in my career</span>
                                                            <strong id="createEditProfile_branch_error" class="error hidden">
                                                                <span id="createEditProfile_branch_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_proudOf" id="createEditProfile_proudOf"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_branch">
                                                            <span id="createEditProfile_branch_label">Position</span>
                                                            <strong id="createEditProfile_branch_error" class="error hidden">
                                                                <span id="createEditProfile_department_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <input type="text" class="form-control full-width" name="createEditProfile_position" id="createEditProfile_position"/>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_department">
                                                            <span id="createEditProfile_department_label">Department</span>
                                                            <strong id="createEditProfile_department_error" class="error hidden">
                                                                <span id="createEditProfile_department_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <input type="text" class="form-control full-width" name="createEditProfile_department" id="createEditProfile_department"/>
                                                            <!--select class="form-control full-width" name="createEditProfile_department" id="createEditProfile_department">
                                                                <option value="">--</option>
                                                            </select-->
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_branch">
                                                            <span id="createEditProfile_branch_label">Branch</span>
                                                            <strong id="createEditProfile_branch_error" class="error hidden">
                                                                <span id="createEditProfile_branch_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <select class="form-control full-width" name="createEditProfile_branch" id="createEditProfile_branch">
                                                                <option value="">--</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_division">
                                                            <span id="createEditProfile_division_label">Division</span>
                                                            <strong id="createEditProfile_division_error" class="error hidden">
                                                                <span id="createEditProfile_division_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <select class="form-control full-width" name="createEditProfile_division" id="createEditProfile_division">
                                                                <option value="">--</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_twitter">
                                                            <span id="createEditProfile_twitter_label">Twitter</span>
                                                            <strong id="createEditProfile_twitter_error" class="error hidden">
                                                                <span id="createEditProfile_twitter_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <input class="form-control full-width" type="text" name="createEditProfile_twitter" id="createEditProfile_twitter" placeholder="@Username"/>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_linkedin">
                                                            <span id="createEditProfile_linkedin_label">LinkedIn</span>
                                                            <strong id="createEditProfile_linkedin_error" class="error hidden">
                                                                <span id="createEditProfile_linkedin_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <input class="form-control full-width" type="text" name="createEditProfile_linkedin" id="createEditProfile_linkedin" placeholder="www.linkedin.com/in/Username"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="createEditProfileFrenchPane">
                                                    <div class="form-group hidden">
                                                        <label for="createEditProfile_name_fr">
                                                            <span id="createEditProfile_name_fr_label">Name_fr: *</span>
                                                            <strong id="createEditProfile_name_fr_error" class="error hidden">
                                                                <span id="createEditProfile_name_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <input disabled class="form-control full-width" type="text" name="createEditProfile_name_fr" id="createEditProfile_name_fr"/>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_bio_fr">
                                                            <span id="createEditProfile_bio_fr_label">A little bit about me_fr: *</span>
                                                            <strong id="createEditProfile_bio_fr_error" class="error hidden">
                                                                <span id="createEditProfile_bio_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_bio_fr" id="createEditProfile_bio_fr"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group hidden">
                                                        <label for="createEditProfile_department_fr">
                                                            <span id="createEditProfile_department_fr_label">Department_fr: *</span>
                                                            <strong id="createEditProfile_department_fr_error" class="error hidden">
                                                                <span id="createEditProfile_department_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <input class="form-control full-width" type="text" name="createEditProfile_department_fr" id="createEditProfile_department_fr"/>
                                                        </div>
                                                    </div>
                                                    <div class="form-group hidden">
                                                        <label for="createEditProfile_position_fr">
                                                            <span id="createEditProfile_position_fr_label">Position_fr: *</span>
                                                            <strong id="createEditProfile_position_fr_error" class="error hidden">
                                                                <span id="createEditProfile_position_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <input class="form-control full-width" type="text" name="createEditProfile_position_fr" id="createEditProfile_position_fr"/>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_branch_fr">
                                                            <span id="createEditProfile_branch_fr_label">What I'm most proud of in my career_fr</span>
                                                            <strong id="createEditProfile_branch_fr_error" class="error hidden">
                                                                <span id="createEditProfile_branch_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_branch_fr" id="createEditProfile_branch_fr"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group hidden">
                                                        <label for="createEditProfile_division_fr">
                                                            <span id="createEditProfile_division_fr_label">Division_fr: *</span>
                                                            <strong id="createEditProfile_division_fr_error" class="error hidden">
                                                                <span id="createEditProfile_division_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <input class="form-control full-width" type="text" name="createEditProfile_division_fr" id="createEditProfile_division_fr"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="createEditProfileSubmitPane">
                                                <div class="formGroup insert"><span>*</span><span id="createEditProfile_requiredStep1">Required</span></div>
                                                <div class="formGroup">
                                                    <input type="button" id="createEditProfile_goToStep2_1" value="Save" onclick="CreateEditProfileAPI.validateStep1();"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="createEditProfile_step2" class="stepGroup_createEditProfile hidden">
                                        <div class="tabsWrapper">
                                            <div class="tabsSteps">
                                        <div class="three-step-tab"><span id="createEditProfileStep1Label_2">Step 1</span></div>
                                        <div class="three-step-tab tab-current"><span id="createEditProfileStep2Label_2">Step 2</span></div>
                                        <div class="three-step-tab"><span id="createEditProfileStep3Label_2">Review</span></div>
                                            </div>
                                            <div class="tabs">
                                                <div class="steptab active"> </div>
                                                <div class="steptab inactive"> </div>
                                                <div class="steptab inactive"> </div>
                                            </div>
                                        </div>
                                        <div class="stepGroupForm">
                                            <h3>Leadership Style</h3>
                                            <div style="margin-top:2em;overflow:auto;">
                                                <div class="createEditProfileEnglishPane">
                                                    <div class="form-group">
                                                        <label for="createEditProfile_leadership_style">
                                                            <span id="createEditProfile_leadership_style_label">My leadership style</span>
                                                            <strong id="createEditProfile_leadership_style_error" class="error hidden">
                                                                <span id="createEditProfile_leadership_style_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_leadership_style" id="createEditProfile_leadership_style"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_app_to_employees">
                                                            <span id="createEditProfile_app_to_employees_label">My approach to employee learning and development</span>
                                                            <strong id="createEditProfile_app_to_employees_error" class="error hidden">
                                                                <span id="createEditProfile_app_to_employees_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_app_to_employees" id="createEditProfile_app_to_employees"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_exp_of_employees">
                                                            <span id="createEditProfile_exp_of_employees_label">My expectations of employees</span>
                                                            <strong id="createEditProfile_exp_of_employees_error" class="error hidden">
                                                                <span id="createEditProfile_exp_of_employees_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_exp_of_employees" id="createEditProfile_exp_of_employees"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="createEditProfileFrenchPane">
                                                    <div class="form-group">
                                                        <label for="createEditProfile_leadership_style_fr">
                                                            <span id="createEditProfile_leadership_style_fr_label">Leadership Style_fr: *</span>
                                                            <strong id="createEditProfile_leadership_style_fr_error" class="error hidden">
                                                                <span id="createEditProfile_leadership_style_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_leadership_style_fr" id="createEditProfile_leadership_style_fr"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_app_to_employees_fr">
                                                            <span id="createEditProfile_app_to_employees_fr_label">Approach to employees_fr: *</span>
                                                            <strong id="createEditProfile_app_to_employees_fr_error" class="error hidden">
                                                                <span id="createEditProfile_app_to_employees_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_app_to_employees_fr" id="createEditProfile_app_to_employees_fr"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="createEditProfile_exp_of_employees_fr">
                                                            <span id="createEditProfile_exp_of_employees_fr_label">Expectation of employees_fr: *</span>
                                                            <strong id="createEditProfile_exp_of_employees_fr_error" class="error hidden">
                                                                <span id="createEditProfile_exp_of_employees_fr_error_msg" class="label label-danger"></span>
                                                            </strong>
                                                        </label>
                                                        <div>
                                                            <textarea class="form-control full-width" name="createEditProfile_exp_of_employees_fr" id="createEditProfile_exp_of_employees_fr"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <fieldset>
                                                <legend>My approach to decision making:</legend>
                                                <div>
                                                    <div class="form-group">
                                                        <div class='multi-btn-group-form-group-label'>
                                                            <span>&nbsp;</span>
                                                        </div>
                                                        <div style='display:inline-block;width:560px'>
                                                            <div>
                                                                <div style="line-height:2em;;font-size: 1.2em !important;">
                                                                    <span style="line-height:2em;vertical-align: middle;display:inline-block;width:20%;text-align: left;">10% or less</span>
                                                                    <span style="line-height:2em;display:inline-block;width:20%;text-align: center;margin-left:-5px;">~25%</span>
                                                                    <span style="line-height:2em;display:inline-block;width:20%;text-align: center;margin-left:-5px;">~50%</span>
                                                                    <span style="line-height:2em;display:inline-block;width:20%;text-align: center;margin-left:-5px;">~75%</span>
                                                                    <span style="line-height:2em;display:inline-block;width:20%;text-align: right;margin-left:-5px;">90% or more</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="multi-btn-group-form-group">
                                                        <div class='multi-btn-group-form-group-label'>
                                                            <span id="createEditProfile_how_often_review_label">How often do you review your teams work before it is shared?</span>
                                                        </div>
                                                        <div style='display:inline-block;width:560px'>
                                                            <div class="multi-btn-group clearfix">
                                                                <div id='options' style="position:absolute;top:0px;right:0px;width:560px;height:2em;z-index:100;font-size: 1.2em !important;">
                                                                    <input type="radio" id="option0" name="createEditProfile_how_often_review_options" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')" />
                                                                    <label for="option0" class='option0Label'>Almost never</label>
                                                                    <input type="radio" id="option1" name="createEditProfile_how_often_review_options" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')"/>
                                                                    <label for="option1" class='option1Label'>Rarely</label>
                                                                    <input type="radio" id="option2" name="createEditProfile_how_often_review_options" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')"/>
                                                                    <label for="option2" class='option2Label'>Sometimes</label>
                                                                    <input type="radio" id="option3" name="createEditProfile_how_often_review_options" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')"/>
                                                                    <label for="option3" class='option3Label'>Usually</label>
                                                                    <input type="radio" id="option4" name="createEditProfile_how_often_review_options" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')"/>
                                                                    <label for="option4" class='option4Label'>Almost always</label>
                                                                </div>
                                                                <div id='review_options' class="option0"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="multi-btn-group-form-group">
                                                        <div class='multi-btn-group-form-group-label'>
                                                            <span id="createEditProfile_how_often_early_label">How often do you get in early or stay late to get some extra work done?</span>
                                                        </div>
                                                        <div style='display:inline-block;width:560px'>
                                                            <div class="multi-btn-group clearfix">
                                                                <div id='createEditProfile_staylate_options' style="position:absolute;top:0px;right:0px;width:560px;height:2em;font-size: 1.2em !important;z-index:100">
                                                                    <input type="radio" id="staylate_option0" name="createEditProfile_staylate" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')" />
                                                                    <label for="staylate_option0" class='option0Label'>Almost never</label>
                                                                    <input type="radio" id="staylate_option1" name="createEditProfile_staylate" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')"/>
                                                                    <label for="staylate_option1" class='option1Label'>Rarely</label>
                                                                    <input type="radio" id="staylate_option2" name="createEditProfile_staylate" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')"/>
                                                                    <label for="staylate_option2" class='option2Label'>Sometimes</label>
                                                                    <input type="radio" id="staylate_option3" name="createEditProfile_staylate" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')"/>
                                                                    <label for="staylate_option3" class='option3Label'>Usually</label>
                                                                    <input type="radio" id="staylate_option4" name="createEditProfile_staylate" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')"/>
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
                                                            <span>How often do you engage your team before responding to management?</span>
                                                        </div>
                                                        <div style='display:inline-block;width:560px'>
                                                            <div class="multi-btn-group clearfix">
                                                                <div id='createEditProfile_engage_options' style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
                                                                    <input type="radio" id="engage_option0" name="createEditProfile_engage" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')" />
                                                                    <label for="engage_option0" class='option0Label'>Almost never</label>
                                                                    <input type="radio" id="engage_option1" name="createEditProfile_engage" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')"/>
                                                                    <label for="engage_option1" class='option1Label'>Rarely</label>
                                                                    <input type="radio" id="engage_option2" name="createEditProfile_engage" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')"/>
                                                                    <label for="engage_option2" class='option2Label'>Sometimes</label>
                                                                    <input type="radio" id="engage_option3" name="createEditProfile_engage" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')"/>
                                                                    <label for="engage_option3" class='option3Label'>Usually</label>
                                                                    <input type="radio" id="engage_option4" name="createEditProfile_engage" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')"/>
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
                                                            <span>How often do you approve development opportunities for your employees?</span>
                                                        </div>
                                                        <div style='display:inline-block;width:560px'>
                                                            <div class="multi-btn-group clearfix">
                                                                <div id='createEditProfile_devops' style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
                                                                    <input type="radio" id="devops_option0" name="createEditProfile_devops" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')" />
                                                                    <label for="devops_option0" class='option0Label'>Almost never</label>
                                                                    <input type="radio" id="devops_option1" name="createEditProfile_devops" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')"/>
                                                                    <label for="devops_option1" class='option1Label'>Rarely</label>
                                                                    <input type="radio" id="devops_option2" name="createEditProfile_devops" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')"/>
                                                                    <label for="devops_option2" class='option2Label'>Sometimes</label>
                                                                    <input type="radio" id="devops_option3" name="createEditProfile_devops" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')"/>
                                                                    <label for="devops_option3" class='option3Label'>Usually</label>
                                                                    <input type="radio" id="devops_option4" name="createEditProfile_devops" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')"/>
                                                                    <label for="devops_option4" class='option4Label'>Almost always</label>
                                                                </div>
                                                                <div id='devops' class="option0"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="multi-btn-group-form-group">
                                                        <div class='multi-btn-group-form-group-label'>
                                                            <span>How often do you refuse low value work requests from management?</span>
                                                        </div>
                                                        <div style='display:inline-block;width:48%'>
                                                            <div class="multi-btn-group clearfix">
                                                                <div id='createEditProfile_lvwrequests' style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
                                                                    <input type="radio" id="lvwRequests_option0" name="createEditProfile_lvwrequests" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')" />
                                                                    <label for="lvwRequests_option0" class='option0Label'>Almost never</label>
                                                                    <input type="radio" id="lvwRequests_option1" name="createEditProfile_lvwrequests" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')"/>
                                                                    <label for="lvwRequests_option1" class='option1Label'>Rarely</label>
                                                                    <input type="radio" id="lvwRequests_option2" name="createEditProfile_lvwrequests" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')"/>
                                                                    <label for="lvwRequests_option2" class='option2Label'>Sometimes</label>
                                                                    <input type="radio" id="lvwRequests_option3" name="createEditProfile_lvwrequests" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')"/>
                                                                    <label for="lvwRequests_option3" class='option3Label'>Usually</label>
                                                                    <input type="radio" id="lvwRequests_option4" name="createEditProfile_lvwrequests" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')"/>
                                                                    <label for="lvwRequests_option4" class='option4Label'>Almost always</label>
                                                                </div>
                                                                <div id='lvwRequests' class="option0"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <div class="createEditProfileSubmitPane">
                                                <div class="formGroup insert"><span>*</span><span id="createEditProfile_requiredStep2">Required</span></div>
                                                <div class="formGroup">
                                                    <input type="button" id="createEditProfile_goToStep1_1" value="Go to Step 2" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1');">
                                                    <input type="button" id="createEditProfile_goToStep3_1" value="Go to Step 3" onclick="CreateEditProfileAPI.validateStep2();">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="createEditProfile_step3" class="stepGroup_createEditProfile hidden">
                                        <div class="tabsWrapper">
                                            <div class="tabsSteps">
                                                <div class="create-profile-tab"><span id="createEditProfileStep1Label_3">Step 1</span></div>
                                                <div class="create-profile-tab"><span id="createEditProfileStep2Label_3">Step 2</span></div>
                                                <div class="create-profile-tab create-profile-tab-current"><span id="createEditProfileStep3Label_3">Review</span></div>
                                            </div>
                                            <div class="tabs">
                                                <div class="steptab active"> </div>
                                                <div class="steptab inactive"> </div>
                                                <div class="steptab inactive"> </div>
                                                <div class="steptab inactive"> </div>
                                                <div class="steptab inactive"> </div>
                                            </div>
                                        </div>
                                        <div class="stepGroupForm">

                                            <fieldset>
                                                <legend>Other</legend>
                                                <div>
                                                    <div class="form-group">
                                                        <div class='multi-btn-group-form-group-label'>
                                                            <label for="user_manager_profile_work_experience"><span>Work Experience</span></label>
                                                        </div>
                                                        <div style='display:inline-block;width:49%'>
                                                            <div>
                                                                <textarea id="user_manager_profile_work_experience" name="user_manager_profile_work_experience" class="textAreaInput"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class='multi-btn-group-form-group-label'>
                                                            <label for="user_manager_profile_education"><span>Education</span></label>
                                                        </div>
                                                        <div style='display:inline-block;width:49%'>
                                                            <div>
                                                                <textarea id="user_manager_profile_education" name="user_manager_profile_education" class="textAreaInput"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <div class="createEditProfileSubmitPane">
                                                <div class="formGroup insert"></div>
                                                <div class="formGroup">
                                                    <input type="button" id="createEditProfile_goToStep2_2" value="Go to Step 2" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2');">
                                                    <input id="createEditProfileSubmitButton" type="button" value="Submit" onclick="CreateEditProfileAPI.validateStep3();">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pageContent hidden" id="createJobPosterSection">
                <div class="pageBanner">
                    <h2 class="section--title">Create a new Job Poster</h2>
                </div>
                <div class="pageBody">
                    <div class="container">
                        <div class="wb-frmvld wb-init tabbedForm" id="jobPosterFormWrapper">
                            <form name="createJobPosterForm" id="createJobPosterForm" method="post" enctype="application/x-www-form-urlencoded">
                                <div id="createJobPosterCreateTab" class="stepGroup">
                                    <div class="tabsWrapper">
                                        <div class="tabsSteps">
                                            <div class="three-step-tab tab-current"><a href="javascript:void(0)" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_1">Create</a></div>
                                            <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_1">Outdated</a></div>
                                            <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_1">Review</a></div>
                                        </div>
                                        <div class="tabs">
                                            <div class="steptab active"> </div>
                                            <div class="steptab inactive"> </div>
                                            <div class="steptab inactive"> </div>
                                        </div>
                                    </div>
                                    <div class="stepGroupForm">
                                        <section id ="createJobPosterJobTitleSection">
                                            <div class="leftPane">
                                                <div class="form-group">
                                                    <label for="createJobPoster_jobTitle">
                                                        <span>Job Title: *</span>
                                                        <strong id="createJobPoster_jobTitle_error" class="error hidden">
                                                            <span id="createJobPoster_jobTitle_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="text" name="createJobPoster_jobTitle" id="createJobPoster_jobTitle"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="rightPane">
                                                <div class="form-group">
                                                    <label for="createJobPoster_jobTitle_fr">
                                                        <span>Job Title_fr: *</span>
                                                        <strong id="createJobPoster_jobTitle_fr_error" class="error hidden">
                                                            <span id="createJobPoster_jobTitle_fr_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="text" name="createJobPoster_jobTitle_fr" id="createJobPoster_jobTitle_fr"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section id="createJobPosterDetailsSection">
                                            <div class="singlePane">
                                                <div class="form-group">
                                                    <label for="createJobPoster_department">
                                                        <span><span id="createJobPoster_department_labelName">Department</span>: *</span>
                                                        <strong id="createJobPoster_department_error" class="error hidden">
                                                            <span id="createJobPoster_department_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <select class="form-control full-width" name="createJobPoster_department" id="createJobPoster_department">
                                                        <option value="">--</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_province">
                                                        <span><span id="createJobPoster_province_labelName">Province</span>: *</span>
                                                        <strong id="createJobPoster_province_error" class="error hidden">
                                                            <span id="createJobPoster_province_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <select class="form-control full-width" name="createJobPoster_province" id="createJobPoster_province">
                                                            <option value="">--</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="leftPane">                            
                                                <div class="form-group">
                                                    <label for="createJobPoster_city">
                                                        <span>City: *</span>
                                                        <strong id="createJobPoster_city_error" class="error hidden">
                                                            <span id="createJobPoster_city_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="text" name="createJobPoster_city" id="createJobPoster_city"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="rightPane">
                                                <div class="form-group">
                                                    <label for="createJobPoster_city_fr">
                                                        <span>City_fr: *</span>
                                                        <strong id="createJobPoster_city_fr_error" class="error hidden">
                                                            <span id="createJobPoster_city_fr_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="text" name="createJobPoster_city_fr" id="createJobPoster_city_fr"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="singlePane">
                                                <div class="form-group">
                                                    <label for="createJobPoster_remunerationLowRange">
                                                        <span><span id="createJobPoster_remunerationLowRange_labelName">Minimum salary</span>: *</span>
                                                        <strong id="createJobPoster_remunerationLowRange_error" class="error hidden">
                                                            <span id="createJobPoster_remunerationLowRange_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="text" name="createJobPoster_remunerationLowRange" id="createJobPoster_remunerationLowRange"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_remunerationHighRange">
                                                        <span><span id="createJobPoster_remunerationHighRange_labelName">Maximum salary</span>: *</span>
                                                        <strong id="createJobPoster_remunerationHighRange_error" class="error hidden">
                                                            <span id="createJobPoster_remunerationHighRange_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="text" name="createJobPoster_remunerationHighRange" id="createJobPoster_remunerationHighRange"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_termQuantity">
                                                        <span><span id="createJobPoster_termQuantity_labelName">Duration (months)</span>: *</span>
                                                        <strong id="createJobPoster_termQuantity_error" class="error hidden">
                                                            <span id="createJobPoster_termQuantity_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="text" name="createJobPoster_termQuantity" id="createJobPoster_termQuantity"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_openDate">
                                                        <span><span id="createJobPoster_openDate_labelName">Open Date</span>: *</span>
                                                        <strong id="createJobPoster_openDate_error" class="error hidden">
                                                            <span id="createJobPoster_openDate_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="date" name="createJobPoster_openDate" id="createJobPoster_openDate"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_closeDate">
                                                        <span><span id="createJobPoster_closeDate_labelName">Close Date</span>: *</span>
                                                        <strong id="createJobPoster_closeDate_error" class="error hidden">
                                                            <span id="createJobPoster_closeDate_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="date" name="createJobPoster_closeDate" id="createJobPoster_closeDate"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_startDate">
                                                        <span><span id="createJobPoster_startDate_labelName">Start Date</span>: *</span>
                                                        <strong id="createJobPoster_startDate_error" class="error hidden">
                                                            <span id="createJobPoster_startDate_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <input class="form-control full-width" type="date" name="createJobPoster_startDate" id="createJobPoster_startDate"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="leftPane">                            
                                                <div class="form-group">
                                                    <label for="createJobPoster_impact">
                                                        <span><span id="createJobPoster_impact_labelName">Impact</span>:</span>
                                                        <strong id="createJobPoster_impact_error" class="error hidden">
                                                            <span id="createJobPoster_impact_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_impact" id="createJobPoster_impact"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_keyTasks">
                                                        <span><span id="createJobPoster_keyTasks_labelName">Key Tasks</span>:</span>
                                                        <strong id="createJobPoster_keyTasks_error" class="error hidden">
                                                            <span id="createJobPoster_keyTasks_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_keyTasks" id="createJobPoster_keyTasks"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_coreCompetencies">
                                                        <span><span id="createJobPoster_coreCompetencies_labelName">Core Competencies</span>:</span>
                                                        <strong id="createJobPoster_coreCompetencies_error" class="error hidden">
                                                            <span id="createJobPoster_coreCompetencies_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_coreCompetencies" id="createJobPoster_coreCompetencies"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_developingCompetencies">
                                                        <span><span id="createJobPoster_developingCompetencies_labelName">Developing Competencies</span>:</span>
                                                        <strong id="createJobPoster_developingCompetencies_error" class="error hidden">
                                                            <span id="createJobPoster_developingCompetencies_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_developingCompetencies" id="createJobPoster_developingCompetencies"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_otherRequirements">
                                                        <span><span id="createJobPoster_otherRequirements_labelName">Other Requirements</span>:</span>
                                                        <strong id="createJobPoster_otherRequirements_error" class="error hidden">
                                                            <span id="createJobPoster_otherRequirements_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_otherRequirements" id="createJobPoster_otherRequirements"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="rightPane">                            
                                                <div class="form-group">
                                                    <label for="createJobPoster_impact_fr">
                                                        <span><span id="createJobPoster_impact_fr_labelName">Impact_fr</span>:</span>
                                                        <strong id="createJobPoster_impact_fr_error" class="error hidden">
                                                            <span id="createJobPoster_impact_fr_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_impact_fr" id="createJobPoster_impact_fr"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_keyTasks_fr">
                                                        <span><span id="createJobPoster_keyTasks_fr_labelName">Key Tasks_fr</span>:</span>
                                                        <strong id="createJobPoster_keyTasks_fr_error" class="error hidden">
                                                            <span id="createJobPoster_keyTasks_fr_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_keyTasks_fr" id="createJobPoster_keyTasks_fr"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_coreCompetencies_fr">
                                                        <span><span id="createJobPoster_coreCompetencies_fr_labelName">Core Competencies_fr</span>:</span>
                                                        <strong id="createJobPoster_coreCompetencies_fr_error" class="error hidden">
                                                            <span id="createJobPoster_coreCompetencies_fr_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_coreCompetencies_fr" id="createJobPoster_coreCompetencies_fr"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_developingCompetencies_fr">
                                                        <span><span id="createJobPoster_developingCompetencies_fr_labelName">Developing Competencies</span>:</span>
                                                        <strong id="createJobPoster_developingCompetencies_fr_error" class="error hidden">
                                                            <span id="createJobPoster_developingCompetencies_fr_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_developingCompetencies_fr" id="createJobPoster_developingCompetencies_fr"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="createJobPoster_otherRequirements_fr">
                                                        <span><span id="createJobPoster_otherRequirements_fr_labelName">Other Requirements_fr</span>:</span>
                                                        <strong id="createJobPoster_otherRequirements_fr_error" class="error hidden">
                                                            <span id="createJobPoster_otherRequirements_fr_error_msg" class="label label-danger"></span>
                                                        </strong>
                                                    </label>
                                                    <div>
                                                        <textarea class="form-control full-width" name="createJobPoster_otherRequirements_fr" id="createJobPoster_otherRequirements_fr"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <div class="createJobPosterSubmitPane">
                                            <div class="formGroup insert">*Required</div>
                                            <div class="formGroup">
                                                <input type="button" id="createJobPosterSubmitButton" value="Submit" onclick="CreateJobPosterAPI.validateJobPosterForm()">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="createJobPosterOutdatedTab" class="stepGroup hidden">
                                    <div class="tabsWrapper">
                                        <div class="tabsSteps">
                                            <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_1">Create</a></div>
                                            <div class="three-step-tab tab-current"><a href="javascript:void(0)" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_1">Outdated</a></div>
                                            <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_1">Review</a></div>
                                        </div>
                                        <div class="tabs">
                                            <div class="steptab active"> </div>
                                            <div class="steptab inactive"> </div>
                                            <div class="steptab inactive"> </div>
                                        </div>
                                    </div>
                                    <h3>This is for outdated fields</h3>
                                </div>
                                <div id="createJobPosterReviewTab" class="stepGroup hidden">
                                    <div class="tabsWrapper">
                                        <div class="tabsSteps">
                                            <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_3">Create</a></div>
                                            <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_3">Outdated</a></div>
                                            <div class="three-step-tab tab-current"><a href="javascript:void(0)" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_3">Review</a></div>
                                        </div>
                                        <div class="tabs">
                                            <div class="steptab inactive"> </div>
                                            <div class="steptab inactive"> </div>
                                            <div class="steptab active"> </div>
                                        </div>
                                    </div>
                                    <div class="stepGroupForm">
                                        <div class="formGroup">
                                            <div class="createJobPosterDemoAreaEnglish" id="createJobPosterDemoAreaEnglish"></div>
                                            <div class="createJobPosterDemoAreaFrench" id="createJobPosterDemoAreaFrench"></div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
            </section>
        </main>
        <?php include '../inc/footer-admin.php'; ?>
    </body>
</html>
