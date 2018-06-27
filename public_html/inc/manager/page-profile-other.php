<?php // BEGIN - Edit Admin Profile Form (Page 5 / Other) ?>
<div id="createEditProfile_step3" class="stepGroup_createEditProfile hidden">

    <div class="tabsSteps">
        <div class="five-step-tab">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1')" class="steppedFormLink">
                <span id="createEditProfileStep1Label_1">About</span>
            </button>
        </div>
        <div class="five-step-tab">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2')" class="steppedFormLink">
                <span id="createEditProfileStep2Label_1">Leadership</span>
            </button>
        </div>
        <div class="five-step-tab">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_workEnvironment')" class="steppedFormLink">
                <span id="createEditProfileWorkEnvironmentLabel_1">Work Environment</span>
            </button>
        </div>
        <div class="five-step-tab">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture')" class="steppedFormLink">
                <span id="createEditProfileTeamCultureLabel_1">Team Culture</span>
            </button>
        </div>
        <div class="five-step-tab tab-current">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3')" class="steppedFormLinkActive">
                <span id="createEditProfileStep3Label_1">Other</span>
            </button>
        </div>
    </div>

    <div class="stepGroupForm">

        <h3 class="form__title">Other Information</h3>

        <p class="form__context">All fields required unless indicated as optional</p>

        <fieldset class="form__fieldset form__form-section">

            <legend class="form__legend">Education</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="user_manager_profile_education">English</label>
                        <input type="text" class="form__input" name="user_manager_profile_education" id="user_manager_profile_education" required aria-required="true"/>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="user_manager_profile_education_fr">Français</label>
                        <input type="text" class="form__input" name="user_manager_profile_education_fr" id="user_manager_profile_education_fr" required aria-required="true"/>
                    </div>
                </div>

            </div>

        </fieldset>

        <fieldset class="form__fieldset form__form-section">
            <legend class="form__legend">Work Experience</legend>

            <div class="flex-grid middle">
                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="user_manager_profile_work_experience">English</label>
                        <input type="text" class="form__input" name="user_manager_profile_work_experience" id="user_manager_profile_work_experience" required aria-required="true"/>
                    </div>
                </div>
                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="user_manager_profile_work_experience_fr">Français</label>
                        <input type="text" class="form__input" name="user_manager_profile_work_experience_fr" id="user_manager_profile_work_experience_fr" required aria-required="true"/>
                    </div>
                </div>
            </div>
        </fieldset>

        <div class="createEditProfileSubmitPane manager-edit-profile__button-form flex-grid">
            <div class="formGroup box med-1of2">
                <input id="otherCloseButton" type="button" value="Close" onclick="CreateEditProfileAPI.hideViewProfile();" class="button--grey closeProfileButton">
            </div>
            <div class="formGroup box med-1of2">
                <input id="otherBackButton" type="button" value="Back" onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture');" class="button--grey">
                <input id="createEditProfileSubmitButton" type="button" value="Submit" onclick="CreateEditProfileAPI.validateOther();" class="button--yellow">
            </div>
        </div>

    </div>

</div>
<?php // END - Edit Admin Profile Form (Page 5 / Other) ?>
