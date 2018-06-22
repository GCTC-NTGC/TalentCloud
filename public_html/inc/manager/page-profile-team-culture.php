<?php // BEGIN - Edit Admin Profile Form (Page 4 / Team Culture) ?>
<div id="createEditProfile_teamCulture" class="stepGroup_createEditProfile hidden">

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
        <div class="five-step-tab tab-current">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture')" class="steppedFormLinkActive">
                <span id="createEditProfileTeamCultureLabel_1">Team Culture</span>
            </button>
        </div>
        <div class="five-step-tab">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3')" class="steppedFormLink">
                <span id="createEditProfileStep3Label_1">Other</span>
            </button>
        </div>
    </div>

    <div class="stepGroupForm">

        <h3 id="createEditProfile_teamCultureTitle" class="manager-edit-profile__title heading--03">Team Culture</h3>

        <div class="form__required-copy-wrapper">
            All fields required unless indicated as optional
        </div>

        <div class="form__input-wrapper">
            <fieldset class="form__fieldset">
                <legend class="form__legend">What makes your team unique?</legend>

                <div class="flex-grid middle">
                    <div class="box med-1of2">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_teamNarrative_en">English</label>
                            <textarea type="text" class="form__textarea" name="createEditProfile_teamNarrative_en" id="createEditProfile_teamNarrative_en" required aria-required="true"/></textarea>
                        </div>
                    </div>
                    <div class="box med-1of2">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_teamNarrative_fr">Français</label>
                            <textarea type="text" class="form__textarea" name="createEditProfile_teamNarrative_fr" id="createEditProfile_teamNarrative_fr" required aria-required="true"/></textarea>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="form__input-wrapper">
            <fieldset class="form__fieldset">
                <legend class="form__legend">How does your team operate?</legend>

                <div class="flex-grid middle">
                    <div class="box med-1of2">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_operatingContext_en">English</label>
                            <textarea type="text" class="form__textarea" name="createEditProfile_operatingContext_en" id="createEditProfile_operatingContext_en" required aria-required="true"/></textarea>
                        </div>
                    </div>
                    <div class="box med-1of2">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_operatingContext_fr">Français</label>
                            <textarea type="text" class="form__textarea" name="createEditProfile_operatingContext_fr" id="createEditProfile_operatingContext_fr" required aria-required="true"/></textarea>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="form__input-wrapper">
            <fieldset class="form__fieldset">
                <legend class="form__legend">What does your team value?</legend>

                <div class="flex-grid middle">
                    <div class="box med-1of2">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_whatWeValue_en">English</label>
                            <textarea type="text" class="form__textarea" name="createEditProfile_whatWeValue_en" id="createEditProfile_whatWeValue_en" required aria-required="true"/></textarea>
                        </div>
                    </div>
                    <div class="box med-1of2">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_whatWeValue_fr">Français</label>
                            <textarea type="text" class="form__textarea" name="createEditProfile_whatWeValue_fr" id="createEditProfile_whatWeValue_fr" required aria-required="true"/></textarea>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="form__input-wrapper">
            <fieldset class="form__fieldset">
                <legend class="form__legend">How do your team members collaborate?</legend>

                <div class="flex-grid middle">
                    <div class="box med-1of2">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_howWeWork_en">English</label>
                            <textarea type="text" class="form__textarea" name="createEditProfile_howWeWork_en" id="createEditProfile_howWeWork_en" required aria-required="true"/></textarea>
                        </div>
                    </div>
                    <div class="box med-1of2">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_howWeWork_fr">Français</label>
                            <textarea type="text" class="form__textarea" name="createEditProfile_howWeWork_fr" id="createEditProfile_howWeWork_fr" required aria-required="true"/></textarea>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="form__input-wrapper">
            <fieldset class="form__fieldset">
                <legend class="form__legend">Additional Information</legend>

                <div class="flex-grid middle">
                    <div class="box med-1of4">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_teamSize">Team size</label>
                            <input type="number" class="form__input" name="createEditProfile_teamSize" id="createEditProfile_teamSize" required aria-required="true"/>
                        </div>
                    </div>
                    <div class="box med-3of4">
                        <div class="form__input-wrapper--float">
                            <label class="form__label" for="createEditProfile_gcDirLink">GC Directory URL (optional)</label>
                            <input type="url" class="form__input" name="createEditProfile_gcDirLink" id="createEditProfile_gcDirLink" />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

    </div>

    <div class="createEditProfileSubmitPane manager-edit-profile__button-form flex-grid">
        <div class="formGroup box med-1of2">
            <input id="teamCultureCloseButton" type="button" value="Close" onclick="CreateEditProfileAPI.hideViewProfile();" class="button--grey closeProfileButton">
        </div>
        <div class="formGroup box med-1of2">
            <input id="teamCultureBackButton" type="button" value="Back" onclick="CreateEditProfileAPI.goToStep('createEditProfile_workEnvironment');" class="button--grey">
            <input class="button--yellow" id="teamCultureSaveCreateEditProfileSubmitButton" type="button" value="Save" onclick="CreateEditProfileAPI.validateTeamCulture();">
        </div>
    </div>

</div>
<?php // END - Edit Admin Profile Form (Page 4 / Team Culture) ?>
