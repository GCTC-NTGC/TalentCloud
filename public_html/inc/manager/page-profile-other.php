<!-- BEGIN - Edit Admin Profile Form (Page 5 / Other) -->
<div id="createEditProfile_step3" class="stepGroup_createEditProfile hidden">

    <div class="tabsWrapper">
        <div class="tabsSteps">
            <div class="five-step-tab"><span id="createEditProfileStep1Label_3">About</span></div>
            <div class="five-step-tab"><span id="createEditProfileStep2Label_3">Leadership</span></div>
            <div class="five-step-tab"><span id="createEditProfileWorkEnvironmentLabel_3">Work Environment</span></div>
            <div class="five-step-tab "><span id="createEditProfileTeamCultureLabel_3">Team Culture</span></div>
            <div class="five-step-tab tab-current"><span id="createEditProfileStep3Label_3">Review</span></div>
        </div>
        <div class="tabs">
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab active"> </div>
        </div>
    </div>

    <br>

    <div class="stepGroupForm">

        <div class="">

            <h3 class="manager-edit-profile__title heading--03">Other Information</h3>

            <div class="manager-edit-profile__required-copy-wrapper">
                <span>* = </span>
                <span id="createEditProfile_requiredStep2">Required</span>
            </div>

            <div class="flex-grid top manager-edit-profile__form">

                <div class="box full">
                    <label class="form__label" for="user_manager_profile_work_experience"><span>Work Experience</span></label>
                    <textarea id="user_manager_profile_work_experience" name="user_manager_profile_work_experience" class="form__textarea textAreaInput"></textarea>
                </div>
                <div class="box full">
                    <label class="form__label" for="user_manager_profile_education"><span>Education</span></label>
                    <textarea id="user_manager_profile_education" name="user_manager_profile_education" class="form__textarea textAreaInput"></textarea>
                </div>

            </div>

        </div>

        <div class="createEditProfileSubmitPane manager-edit-profile__button-form flex-grid top">
            <div class="formGroup box full">
                <input id="createEditProfile_goToTeamCulture_2" type="button" value="Go to Team Culture" onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture')" class="button--grey">
                <input id="createEditProfileSubmitButton" type="button" value="Submit" onclick="CreateEditProfileAPI.validateStep3();" class="button--yellow">
            </div>
        </div>
        
    </div>

</div>
<!-- END - Edit Admin Profile Form (Page 5 / Other) -->
