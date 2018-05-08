<?php // BEGIN - Login Modal Dialog and Overlay ?>
<div id="loginOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="loginFormTitle" aria-describedby="loginFormDescription">
    <div id="loginFormWrapperWindow" class="dialogue-modal dialogHalfWidthWrapperWindow">
        <div id="loginFormTitleWrapper" class="dialogTitle">
            <strong id="loginFormTitle" title="Login to TalentCloud">Login to TalentCloud</strong>
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
<?php // END - Login Modal Dialog and Overlay ?>
