<?php // BEGIN - Edit Admin Profile Form (Page 1 / About Me) ?>
<div id="createEditProfile_step1" class="stepGroup_createEditProfile">
    
    <div class="tabsSteps">
        <div class="five-step-tab tab-current">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1')" class="steppedFormLinkActive">
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
        <div class="five-step-tab">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3')" class="steppedFormLink">
                <span id="createEditProfileStep3Label_1">Other</span>
            </button>
        </div>
    </div>

    <div class="stepGroupForm">

        <h3 id="adminAboutMe" class="form__title">About Me</h3>

        <p class="form__context">All fields required unless indicated as optional</p>

        <fieldset class="form__fieldset form__form-section">

            <legend class="form__legend">Position</legend>

            <div class="flex-grid">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_position">English</label>
                        <input type="text" class="form__input" name="createEditProfile_position" id="createEditProfile_position" required aria-required="true"/>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_position_fr">Français</label>
                        <input type="text" class="form__input" name="createEditProfile_position_fr" id="createEditProfile_position_fr" required aria-required="true"/>
                    </div>
                </div>

            </div>

        </fieldset>

        <fieldset class="form__fieldset form__form-section">

            <legend class="form__legend">Branch / Department</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_branch">English</label>
                        <input type="text" class="form__input" name="createEditProfile_branch" id="createEditProfile_branch" required aria-required="true"/>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_branch_fr">Français</label>
                        <input type="text" class="form__input" name="createEditProfile_branch_fr" id="createEditProfile_branch_fr" required aria-required="true"/>
                    </div>
                </div>

                <div class="box full">
                    <div class="form__input-wrapper--select">
                        <label for="createEditProfile_department" class="form__label">Department</label>
                        <div class="form__select-wrapper">
                            <select class="form__input" name="createEditProfile_department" id="createEditProfile_department" srequired aria-required="true">
                                <option value="">--</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>

        </fieldset>

        <fieldset class="form__fieldset form__form-section">

            <legend class="form__legend">Division</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_division">English</label>
                        <input type="text" class="form__input" name="createEditProfile_division" id="createEditProfile_division" required aria-required="true"/>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_division_fr">Français</label>
                        <input type="text" class="form__input" name="createEditProfile_division_fr" id="createEditProfile_division_fr" required aria-required="true"/>
                    </div>
                </div>

            </div>

        </fieldset>

        <fieldset class="form__fieldset form__form-section" id="createJobPosterJobTitleSection">

            <legend class="form__legend">Short Biography</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_bio">English</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_bio" id="createEditProfile_bio" rows="2" required aria-required="true"/></textarea>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_bio_fr">Français</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_bio_fr" id="createEditProfile_bio_fr" required aria-required="true"/></textarea>
                    </div>
                </div>

            </div>

        </fieldset>

        <fieldset class="form__fieldset form__form-section" id="createJobPosterJobTitleSection">

            <legend class="form__legend">Career Highlights</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_proudOf">English</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_proudOf" id="createEditProfile_proudOf" rows="2" required aria-required="true"/></textarea>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_proudOf_fr">Français</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_proudOf_fr" id="createEditProfile_proudOf_fr" required aria-required="true"/></textarea>
                    </div>
                </div>

            </div>

        </fieldset>

        <fieldset class="form__fieldset form__form-section">

            <legend class="form__legend">Social Media</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_twitter">Twitter Handle</label>
                        <input type="text" class="form__input" name="createEditProfile_twitter" id="createEditProfile_twitter" required aria-required="true"/>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_linkedin">LinkedIn URL</label>
                        <input type="url" class="form__input" name="createEditProfile_linkedin" id="createEditProfile_linkedin" required aria-required="true" />
                    </div>
                </div>

            </div>

        </fieldset>

        <div class="createEditProfileSubmitPane manager-edit-profile__button-form flex-grid">
            <div class="formGroup box med-1of2">
                <input id="aboutMeCloseButton" type="button" value="Close" onclick="CreateEditProfileAPI.hideViewProfile();" class="button--grey closeProfileButton">
            </div>
            <div class="formGroup box med-1of2">
                <input class="button--yellow" id="aboutMeSaveCreateEditProfileSubmitButton" type="button" value="Save" onclick="CreateEditProfileAPI.validateAboutMe();">
            </div>
        </div>

    </div>

</div>
<?php // END - Edit Admin Profile Form (Page 1 / About Me) ?>
