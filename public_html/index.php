<!-- BEGIN - Header-->
<?php include 'inc/header.php';?>
<!-- BEGIN - Top Navigation Bar-->
<?php include 'inc/nav.php';?>

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
                <h3 id='loginTitle' title="Login to TalentCloud"><img src="images/logo.svg" id="loginLogoImage" alt="Login Logo Image"/> &nbsp; &nbsp;Login</h3>
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



<!-- BEGIN - Main Content Section-->
<main>
<div class="contentContainer">

    <section class="section">
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
                <img src="/images/working.gif" alt="loading jobs"/>
            </div>
            <div id="jobList" class="jobList hidden">

            </div>
            <div id="viewJobPosterApplicationOverlay" class="hidden">
                <div id="jobPoster" class="jobPoster">

                </div>
            </div>
            <div id="jobPosterApplication" class="hidden">

            </div>


            <div id="jobSeekerProfileWrapperWindow" class="jobSeekerProfileWrapperWindow hidden">
                <div id="jobSeeker" class="jobSeeker tabbedForm">
                    <form name="jobSeekerForm" id="jobSeekerForm" method="post" enctype="application/x-www-form-urlencoded">
                        <div id='myProfileTitleWrapper'>
                            <h3 id='myProfileTitle'><img src="images/logo.svg" id="jobSeekerLogoImage" alt="Job Seeker Graphic"/><span id="myProfileTitleText" aria-label="My Profile">My Profile</span></h3>
                            <div class="hidden" id="myProfileDialogDescription">Login to TalentCloud</div>
                        </div>
                        <input type="hidden" id="profile_id"/>
                        <input type="hidden" id="last_updated"/>
                        <div id="jobSeekerFormFieldsWrapper">
                            <div id="contact_details" class="jobSeekerFormStepGroup">
                                <div class="tabsWrapper">
                                    <div class="tabsSteps">
                                        <ul class="tabsList">
                                            <li class="four-step-tab four-step-tab-current"><a href="#" class="steppedFormLinkActive" onclick="FormsAPI.steppedForm.validateStep('contact_details','jobSeekerFormStepGroup',false,null,profile_first_name)">Contact Details</a></li>
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('accomplishments','jobSeekerFormStepGroup',false,null,'profile_accomplishment')">Accomplishments</a></li>
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('experiences','jobSeekerFormStepGroup','jobSeekerFormStepGroup',false,null,'profile_best_experience')">Experiences</a></li>
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('superpowers','jobSeekerFormStepGroup','jobSeekerFormStepGroup',false,null,'profile_superpower')">Superpowers</a></li>
                                        </ul>
                                    </div>
                                    <div class="tabs">
                                        <div class="steptab active"> </div>
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab inactive"> </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div>
                                        <label for="profile_first_name">
                                            <span>First Name:</span>
                                            <strong id="profile_first_name_error" class="error hidden">
                                                <span id="profile_first_name_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                    </div>
                                    <div>
                                        <input class="form-control full-width" type="text" name="profile_first_name" id="profile_first_name"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div>
                                        <label for="profile_last_name">
                                            <span>Last Name:</span>
                                            <strong id="profile_last_name_error" class="error hidden">
                                                <span id="profile_last_name_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                    </div>
                                    <div>
                                        <input class="form-control full-width" type="text" name="profile_last_name" id="profile_last_name"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div>
                                        <label for="profile_link">
                                            <span>Link:</span>
                                            <strong id="profile_link_error" class="error hidden">
                                                <span id="profile_link_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                    </div>
                                    <div>
                                        <input class="form-control full-width" type="text" name="profile_link" id="profile_link"/>
                                    </div>
                                </div>
                                <div class="formGroup stepNavigation">
                                    <input type="button" value="Go to Accomplishments" id="goToAccomplishmentsButton" onclick="FormsAPI.steppedForm.validateStep('accomplishments','jobSeekerFormStepGroup',true,'JobSeekerAPI.saveJobSeekerProfileChanges','profile_accomplishment')">
                                    <input type="button" value="Cancel" id="cancelProfile1" onclick="UserAPI.hideJobSeekerProfileForm()">
                                </div>
                            </div>
                            <div id="accomplishments" class="jobSeekerFormStepGroup hidden">
                                <div class="tabsWrapper">
                                    <div class="tabsSteps">
                                        <ul class="tabsList">
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('contact_details','jobSeekerFormStepGroup',false,null,'profile_first_name')">Contact Details</a></li>
                                            <li class="four-step-tab four-step-tab-current"><a href="#" class="steppedFormLinkActive" onclick="FormsAPI.steppedForm.validateStep('accomplishments','jobSeekerFormStepGroup',false,null,'profile_accomplishment')">Accomplishments</a></li>
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('experiences','jobSeekerFormStepGroup',false,null,'profile_best_experience')">Experiences</a></li>
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('superpowers','jobSeekerFormStepGroup',false,null,'profile_superpower')">Superpowers</a></li>
                                        </ul>
                                    </div>
                                    <div class="tabs">
                                        <div class="steptab active"> </div>
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab inactive"> </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div>
                                        <label for="profile_accomplishment">
                                            <span>Accomplishments:</span>
                                            <strong id="profile_accomplishment_error" class="error hidden">
                                                <span id="profile_accomplishment_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                    </div>
                                    <div>
                                        <textarea class="form-control full-width" name="profile_accomplishment" id="profile_accomplishment"></textarea>
                                    </div>
                                </div>
                                <div class="formGroup stepNavigation">
                                    <input type="button" value="Go to back to Contact Details" onclick="FormsAPI.steppedForm.validateStep('contact_details','jobSeekerFormStepGroup',true,'JobSeekerAPI.saveJobSeekerProfileChanges','profile_first_name')">
                                    <input type="button" value="Go to Experiences" onclick="FormsAPI.steppedForm.validateStep('experiences','jobSeekerFormStepGroup',true,'JobSeekerAPI.saveJobSeekerProfileChanges','profile_best_experience')">
                                    <input type="button" value="Cancel" id="cancelProfile2" onclick="UserAPI.hideJobSeekerProfileForm()">
                                </div>
                            </div>
                            <div id="experiences" class="jobSeekerFormStepGroup hidden">
                                <div class="tabsWrapper">
                                    <div class="tabsSteps">
                                        <ul class="tabsList">
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('contact_details','jobSeekerFormStepGroup',false,null,'profile_first_name')">Contact Details</a></li>
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('accomplishments','jobSeekerFormStepGroup',false,null,'profile_accomplishment')">Accomplishments</a></li>
                                            <li class="four-step-tab four-step-tab-current"><a href="#" class="steppedFormLinkActive" onclick="FormsAPI.steppedForm.validateStep('experiences','jobSeekerFormStepGroup',false,null,'profile_best_experience')">Experiences</a></li>
                                            <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('superpowers','jobSeekerFormStepGroup',false,null,'profile_superpower')">Superpowers</a></li>
                                        </ul>
                                    </div>
                                    <div class="tabs">
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab active"> </div>
                                        <div class="steptab inactive"> </div>
                                    </div>
                                </div>
                            <div class="form-group">
                                <div>
                                    <label for="profile_best_experience">
                                        <span>Best Experience:</span>
                                        <strong id="profile_best_experience_error" class="error hidden">
                                            <span id="profile_best_experience_error_msg" class="label label-danger"></span>
                                        </strong>
                                    </label>
                                </div>
                                <div>
                                    <textarea class="form-control full-width" name="profile_best_experience" id="profile_best_experience"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div>
                                    <label for="profile_worst_experience">
                                        <span>Worst Experience:</span>
                                        <strong id="profile_worst_experience_error" class="error hidden">
                                            <span id="profile_worst_experience_error_msg" class="label label-danger"></span>
                                        </strong>
                                    </label>
                                </div>
                                <div>
                                    <textarea class="form-control full-width" name="profile_worst_experience" id="profile_worst_experience"></textarea>
                                </div>
                            </div>
                            <div class="formGroup stepNavigation">
                                <input type="button" value="Go to back to Accomplishments" onclick="FormsAPI.steppedForm.validateStep('accomplishments','jobSeekerFormStepGroup',true,'JobSeekerAPI.saveJobSeekerProfileChanges','profile_accomplishment')">
                                <input type="button" value="Go to Superpowers" onclick="FormsAPI.steppedForm.validateStep('superpowers','jobSeekerFormStepGroup',true,'JobSeekerAPI.saveJobSeekerProfileChanges','profile_superpower')">
                                <input type="button" value="Cancel" id="cancelProfile3" onclick="UserAPI.hideJobSeekerProfileForm()">
                            </div>
                        </div>
                        <div id="superpowers" class="jobSeekerFormStepGroup hidden">
                            <div class="tabsWrapper">
                                <div class="tabsSteps">
                                    <ul class="tabsList">
                                        <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('contact_details','jobSeekerFormStepGroup',false,null,'profile_first_name')">Contact Details</a></li>
                                        <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('accomplishments','jobSeekerFormStepGroup',false,null,'profile_accomplishment')">Accomplishments</a></li>
                                        <li class="four-step-tab"><a href="#" class="steppedFormLink" onclick="FormsAPI.steppedForm.validateStep('experiences','jobSeekerFormStepGroup',false,null,'profile_best_experience')">Experiences</a></li>
                                        <li class="four-step-tab four-step-tab-current"><a href="#" class="steppedFormLinkActive" onclick="FormsAPI.steppedForm.validateStep('superpowers','jobSeekerFormStepGroup',false,null,'profile_superpower')">Superpowers</a></li>
                                    </ul>
                                </div>
                                <div class="tabs">
                                    <div class="steptab inactive"> </div>
                                    <div class="steptab inactive"> </div>
                                    <div class="steptab inactive"> </div>
                                    <div class="steptab active"> </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div>
                                    <label for="profile_superpower">
                                        <span>Superpower:</span>
                                        <strong id="profile_superpower_error" class="error hidden">
                                            <span id="profile_superpower_error_msg" class="label label-danger"></span>
                                        </strong>
                                    </label>
                                </div>
                                <div>
                                    <textarea class="form-control full-width" name="profile_superpower" id="profile_superpower"></textarea>
                                </div>
                            </div>
                            <div class="formGroup stepNavigation">
                                <input type="button" value="Go to back to Experiences" onclick="FormsAPI.steppedForm.validateStep('experiences','jobSeekerFormStepGroup',true,'JobSeekerAPI.saveJobSeekerProfileChanges','profile_best_experience')">
                                <input type="button" value="Cancel" id="cancelProfile4" onclick="UserAPI.hideJobSeekerProfileForm()">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="jobCount hidden">
        <span id="contactCount">0</span> jobs
    </div>
    </section>
</div>
</main>

<!-- BEGIN - Standard Yes/No Modal Popup-->
<div id="yesNoModalOverlay" class="yesNoModalOverlay hidden">
    <div id="yesNoModalWindow" class="yesNoModalWindow">
        <div class="yesNoModalContent">
            <div id="yesNoModalTitle" class="yesNoModalTitle">Title</div>
            <div id="yesNoModalText" class="yesNoModalText">Text</div>
            <div id="modalButtons">
            </div>
        </div>
    </div>
</div>

<!-- BEGIN - Footer-->
<?php include 'inc/footer.php';?>