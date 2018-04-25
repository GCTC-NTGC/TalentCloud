<!-- BEGIN - Edit Admin Profile Form (Page 1 / About Me) -->
<div id="createEditProfile_step1" class="stepGroup_createEditProfile">

    <div class="tabsWrapper">
        <div class="tabsSteps">
            <div class="five-step-tab tab-current"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1');"><span id="createEditProfileStep1Label_1">About</span></a></div>
            <div class="five-step-tab"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2');"><span id="createEditProfileStep2Label_1">Leadership</span></a></div>
            <div class="five-step-tab"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_workEnvironment');"><span id="createEditProfileWorkEnvironmentLabel_1">Work Environment</span></a></div>
            <div class="five-step-tab"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture');"><span id="createEditProfileTeamCultureLabel_1">Team Culture</span></a></div>
            <div class="five-step-tab"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3');"><span id="createEditProfileStep3Label_1">Other</span></a></div>
        </div>
        <div class="tabs">
            <div class="steptab active"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
        </div>
    </div>

    <br>

    <div class="stepGroupForm">

        <h3 id="adminAboutMe" class="manager-edit-profile__title heading--03">About Me</h3>

        <div class="manager-edit-profile__required-copy-wrapper">
            <span>* = </span>
            <span id="createEditProfile_requiredStep1">Required</span>
        </div>

        <div class="flex-grid top manager-edit-profile__form">

            <div class="box med-1of2">
                <label for="createEditProfile_bio" class="form__label">
                    <span id="createEditProfile_bio_label">A little bit about me (English):</span>
                    <strong id="createEditProfile_bio_error" class="error hidden">
                        <span id="createEditProfile_bio_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_bio" id="createEditProfile_bio"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_bio_fr" class="form__label">
                    <span id="createEditProfile_bio_fr_label">A little bit about me (Français):</span>
                    <strong id="createEditProfile_bio_fr_error" class="error hidden">
                        <span id="createEditProfile_bio_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_bio_fr" id="createEditProfile_bio_fr"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_proudOf" class="form__label">
                    <span id="createEditProfile_proudOf_label">What I'm most proud of in my career (English):</span>
                    <strong id="createEditProfile_proudOf_error" class="error hidden">
                        <span id="createEditProfile_proudOf_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_proudOf" id="createEditProfile_proudOf"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_proudOf_fr" class="form__label">
                    <span id="createEditProfile_proudOf_fr_label">What I'm most proud of in my career (Français):</span>
                    <strong id="createEditProfile_proudOf_fr_error" class="error hidden">
                        <span id="createEditProfile_proudOf_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_proudOf_fr" id="createEditProfile_proudOf_fr"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_position" class="form__label">
                    <span id="createEditProfile_position_label">Position (English):</span>
                    <strong id="createEditProfile_position_error" class="error hidden">
                        <span id="createEditProfile_position_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input type="text" class="form__input--text" name="createEditProfile_position" id="createEditProfile_position"/>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_position_fr" class="form__label">
                    <span id="createEditProfile_position_fr_label">Position (Français): *</span>
                    <strong id="createEditProfile_position_fr_error" class="error hidden">
                        <span id="createEditProfile_position_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input class="form__input--text" type="text" name="createEditProfile_position_fr" id="createEditProfile_position_fr"/>
            </div>

            <div class="box full">
                <label for="createEditProfile_department" class="form__label">
                    <span id="createEditProfile_department_label">Department:</span>
                    <strong id="createEditProfile_department_error" class="error hidden">
                        <span id="createEditProfile_department_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <div class="form__select-wrapper">
                    <!--<input type="text" class="form-control full-width" name="createEditProfile_department" id="createEditProfile_department"/>-->
                    <select class="form__select" name="createEditProfile_department" id="createEditProfile_department">
                        <option value="">--</option>
                    </select>
                </div>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_branch" class="form__label">
                    <span><span id="createEditProfile_branch_label">Branch</span> (English):</span>
                    <strong id="createEditProfile_branch_error" class="error hidden">
                        <span id="createEditProfile_branch_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input type="text" class="form__input--text" name="createEditProfile_branch" id="createEditProfile_branch"/>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_branch_fr" class="form__label">
                    <span><span id="createEditProfile_branch_fr_label">Branch</span> (Français):</span>
                    <strong id="createEditProfile_branch_fr_error" class="error hidden">
                        <span id="createEditProfile_branch_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input type="text" class="form__input--text" name="createEditProfile_branch_fr" id="createEditProfile_branch_fr"/>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_division" class="form__label">
                    <span><span id="createEditProfile_division_label">Division</span> (English):</span>
                    <strong id="createEditProfile_division_error" class="error hidden">
                        <span id="createEditProfile_division_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input type="text" class="form__input--text" name="createEditProfile_division" id="createEditProfile_division"/>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_division_fr" class="form__label">
                    <span><span id="createEditProfile_division_fr_label">Division</span> (Français):</span>
                    <strong id="createEditProfile_division_fr_error" class="error hidden">
                        <span id="createEditProfile_division_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input class="form__input--text" type="text" name="createEditProfile_division_fr" id="createEditProfile_division_fr"/>
            </div>

            <div class="box full">
                <label for="createEditProfile_twitter" class="form__label">
                    <span id="createEditProfile_twitter_label">Twitter</span>
                    <strong id="createEditProfile_twitter_error" class="error hidden">
                        <span id="createEditProfile_twitter_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input class="form__input--text" type="text" name="createEditProfile_twitter" id="createEditProfile_twitter" placeholder="@Username"/>
            </div>

            <div class="box full">
                <label for="createEditProfile_linkedin" class="form__label">
                    <span id="createEditProfile_linkedin_label">LinkedIn</span>
                    <strong id="createEditProfile_linkedin_error" class="error hidden">
                        <span id="createEditProfile_linkedin_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input class="form__input--text" type="text" name="createEditProfile_linkedin" id="createEditProfile_linkedin" placeholder="www.linkedin.com/in/Username"/>
            </div>

        </div>

        <div class="createEditProfileSubmitPane flex-grid top manager-edit-profile__button-form">
            <div class="box full">
                <input class="button--yellow" id="aboutMeSaveCreateEditProfileSubmitButton" type="button" value="Save" onclick="CreateEditProfileAPI.validateStep3();">
            </div>
        </div>

    </div>

</div>
<!-- END - Edit Admin Profile Form (Page 1 / About Me) -->
