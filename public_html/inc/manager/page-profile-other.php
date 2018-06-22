<?php // BEGIN - Edit Admin Profile Form (Page 5 / Other) ?>
<div id="createEditProfile_step3" class="stepGroup_createEditProfile hidden">

    <div class="tabsWrapper">
        <div class="tabsSteps">
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1');"><span id="createEditProfileStep1Label_3">About</span></a></div>
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2');"><span id="createEditProfileStep2Label_3">Leadership</span></a></div>
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_workEnvironment');"><span id="createEditProfileWorkEnvironmentLabel_3">Work Environment</span></a></div>
            <div class="five-step-tab "><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture');"><span id="createEditProfileTeamCultureLabel_3">Team Culture</span></a></div>
            <div class="five-step-tab tab-current"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3');"><span id="createEditProfileStep3Label_3">Other</span></a></div>
        </div>
        <div class="tabs">
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab active"> </div>
        </div>
    </div>

    <div class="stepGroupForm">

        <h3 class="manager-edit-profile__title heading--03">Other Information</h3>

        <div class="form__required-copy-wrapper">
            All fields required unless indicated as optional
        </div>

        <div class="form__input-wrapper">
            <fieldset class="form__fieldset">
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
        </div>

        <div class="form__input-wrapper">
            <fieldset class="form__fieldset">
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
        </div>

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
