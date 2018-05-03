<?php // BEGIN - Registration Form Modal Dialog and Overlay ?>
<div id="registerFormOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="registerFormTitle" aria-describedby="registerFormDescription">
    <div id="registerFormWrapperWindow" class="dialogue-modal dialogHalfWidthWrapperWindow">
        <div id="registerFormTitleWrapper" class="dialogTitle">
            <strong id="registerFormTitle" title="Register for Talent Cloud">Register for Talent Cloud</strong>
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
<?php // END - Registration Form Modal Dialog and Overlay  ?>

<?php // BEGIN - Registration Status Dialog and Overlay  ?>
<div id="registerStatusOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="registerStatusTitle" aria-describedby="registerStatusDescription">
    <div id="registerStatusWrapperWindow" class="dialogue-modal dialogHalfWidthWrapperWindow">
        <div id="registerStatusTitleWrapper" class="dialogTitle">
            <strong id="registerStatusTitle" title="Talent Cloud Registration Status">Talent Cloud Registration Status</strong>
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
<?php // END - Registration Status Dialog and Overlay  ?>
