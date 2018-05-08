<div id="registerFormOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="registerFormTitle" aria-describedby="registerFormDescription">

    <div id="registerFormWrapperWindow" class="dialogue-modal dialogHalfWidthWrapperWindow">

        <div id='registerFormTitleWrapper' class="dialogTitle dialogue-modal__title-wrapper">
            <strong id='registerFormTitle' title="Register for Talent Cloud" class="dialogue-modal__title">Register for TalentCloud</strong>
            <div class="hidden" id="registerFormDescription">Register for TalentCloud</div>
        </div>

        <div class="wb-frmvld wb-init dialogWindowInterior" id="registerFormWrapper">

            <div class="dialogue-modal__grid registration-modal__grid flex-grid middle">

                <form class="box full flex-grid registration-modal__form-grid" name="registerForm" id="registerForm" novalidate="novalidate" method="post" enctype="application/x-www-form-urlencoded">

                    <p class="registration-modal__copy box full">
                        <span class="registration-modal__copy-span" id="registrationModalCopySpan">Welcome to TalentCloud! </span>
                        <a href="javascript:void(0)" onclick="UserAPI.hideRegisterForm(); return UserAPI.showLogin(this);" class="ui-link" id="switchToLogin" title="Already have an account? Click here to login.">Already have an account? Click here to login</a>
                    </p>

                    <div class="box med-1of2">
                        <label for="register_email" class="form__label">
                            <span>Email:</span>
                            <strong id="register_email_error" class="error hidden">
                                <span id="register_email_error_msg" class="label label-danger"></span>
                            </strong>
                        </label>
                        <input class="form__input--text" id="register_email" name="register_email" type="text" required=""/>
                    </div>

                    <div class="box med-1of2">
                        <label for="register_email_confirm" class="form__label">
                            <span>Re-enter email:</span>
                            <strong id="register_email_confirm_error" class="error hidden">
                                <span id="register_email_confirm_error_msg" class="label label-danger"></span>
                            </strong>
                        </label>
                        <input class="form__input--text" id="register_email_confirm" name="register_email_confirm" type="text" required=""/>
                    </div>

                    <div class="box med-1of2">
                        <label for="register_password" class="form__label">
                            <span>Password:</span>
                            <strong id="register_password_error" class="error hidden">
                                <span id="register_password_error_msg" class="label label-danger"></span>
                            </strong>
                        </label>
                        <input class="form__input--text" id="register_password" name="register_password" type="password" required=""/>
                    </div>

                    <div class="box med-1of2">
                        <label for="register_password_confirm" class="form__label">
                            <span>Re-enter password:</span>
                            <strong id="register_password_confirm_error" class="error hidden">
                                <span id="register_password_confirm_error_msg" class="label label-danger"></span>
                            </strong>
                        </label>
                        <input class="form__input--text" id="register_password_confirm" name="register_password_confirm" type="password" required=""/>
                    </div>

                    <div class="box full flex-grid middle registration-modal__button-grid">
                        <div class="box med-1of2">
                            
                        </div>
                        <div class="box med-1of2">
                            <input type="button" class="button--grey" id="registerFormCancelBtn" value="Cancel" onclick="UserAPI.hideRegisterForm()">
                            <input type="button" class="button--yellow" id="registerFormRegisterBtn" value="Register" onclick="UserAPI.register();">
                        </div>
                    </div>

                    <div class="clear"></div>

                </form>

            </div>

        </div>

    </div>

</div>

<div id="registerStatusOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="registerStatusTitle" aria-describedby="registerStatusDescription">

    <div id="registerStatusWrapperWindow" class="dialogue-modal dialogHalfWidthWrapperWindow">

        <div id='registerStatusTitleWrapper' class="dialogTitle dialogue-modal__title-wrapper">
            <strong id='registerStatusTitle' title="Talent Cloud Registration Status" class="dialogue-modal__title">Talent Cloud Registration Status</strong>
            <div class="hidden" id="registerStatusDescription">Talent Cloud Registration Status</div>
        </div>
        
        <div class="dialogWindowInterior">

            <div id="registrationStatusSuccessMessage">

            </div>

            <div id="registrationStatusEmailConfMessage">

            </div>

            <div class="box full flex-grid middle registration-modal__button-grid">
                <div class="box med-1of2">
                    
                </div>
                <div class="box med-1of2">
                    <input type="button" class="button--grey" id="registerStatusCloseBtn" value="Close" onclick="UserAPI.hideRegisterConf()">
                    <input type="button" class="button--yellow" id="registerStatusLoginBtn" value="Log in" onclick="UserAPI.hideRegisterConf(); return UserAPI.showLogin(this);"/>
                </div>
            </div>

            <div class="clear"></div>

        </div>

    </div>
    
</div>
<?php // END - Registration Dialog and Overlay ?>
