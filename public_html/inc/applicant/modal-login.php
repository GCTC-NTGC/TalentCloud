<div id="loginOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="loginFormTitle" aria-describedby="loginFormDescription">

    <div id="loginFormWrapperWindow" class="dialogue-modal dialogHalfWidthWrapperWindow">

        <div id='loginFormTitleWrapper' class="dialogTitle dialogue-modal__title-wrapper">
            <strong id='loginFormTitle' title="Login to TalentCloud" class="dialogue-modal__title">Login to TalentCloud</strong>
            <div class="hidden" id="loginFormDescription">Login to TalentCloud</div>
        </div>

        <div class="dialogWindowInterior">

            <div class="dialogue-modal__grid login-modal__grid flex-grid middle">

                <form class="box full" name="loginForm" id="loginForm" method="post" enctype="application/x-www-form-urlencoded">

                    <div class="label label-danger hidden" id="loginErrors"></div>

                    <a href="javascript:void(0)" class="hidden">Forgot your password? Click here to reset it. (Not working yet.)</a>
                    
                    <p class="login-modal__copy">
                        <span class="login-modal__copy-span" id="loginModalCopySpan">Welcome to TalentCloud! </span>
                        <a href="javascript:void(0)" onclick="UserAPI.cancelLogin(); return UserAPI.showRegisterForm(this);" class="login-modal__registration-cta" id="switchToRegister" title="Don't have an account? Click here to register." tabindex="0">Don't have an account? Click here to register.</a>
                    </p>

                    <div class="flex-grid login-modal__form-grid">

                        <div class="box med-1of2 form-group">
                            <label for="login_email" class="form__label">
                                <span id="loginModalEmailLabelSpan">Your Email:</span>
                                <strong id="login_email_error" class="error hidden">
                                    <span id="login_email_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form__input--text" type="email" name="login_email" id="login_email" required=""/>
                        </div>
                        <div class="box med-1of2 form-group">
                            <label for="login_password" class="form__label">
                                <span id="loginModalPasswordLabelSpan">Your Password:</span>
                                <strong id="login_password_error" class="error hidden">
                                    <span id="login_password_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form__input--text" type="password" name="login_password" id="login_password" required=""/>
                        </div>

                    </div>

                    <div class="flex-grid middle login-modal__button-grid">
                        <div class="box med-1of2">
                            
                        </div>
                        <div class="box med-1of2">
                            <input type="button" id="loginFormCancelBtn" value="Cancel" class="button--grey" onclick="UserAPI.cancelLogin()"/>
                            <input type="button" id="loginFormLoginBtn" value="Login" class="button--yellow" onclick="return UserAPI.login()"/>
                        </div>
                    </div>

                    <div class="clear"></div>

                </form>

            </div>

        </div>

    </div>

</div>
