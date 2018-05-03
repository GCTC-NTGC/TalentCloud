<?php // BEGIN - Edit Admin Profile Form (Page 4 / Team Culture) ?>
<div id="createEditProfile_teamCulture" class="stepGroup_createEditProfile hidden">

    <div class="tabsWrapper">
        <div class="tabsSteps">
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1');"><span id="createEditProfileStep1Label_TC">About</span></a></div>
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2');"><span id="createEditProfileStep2Label_TC">Leadership</span></a></div>
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_workEnvironment');"><span id="createEditProfileWorkEnvironmentLabel_TC">Work Environment</span></a></div>
            <div class="five-step-tab tab-current"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture');"><span id="createEditProfileTeamCultureLabel_TC">Team Culture</span></a></div>
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3');"><span id="createEditProfileStep3Label_TC">Other</span></a></div>
        </div>
        <div class="tabs">
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab active"> </div>
            <div class="steptab inactive"> </div>
        </div>
    </div>

    <br>

    <div class="stepGroupForm">

        <h3 id="createEditProfile_teamCultureTitle" class="manager-edit-profile__title heading--03">Our Team Culture</h3>

        <div class="manager-edit-profile__required-copy-wrapper">
            <span>* = </span>
            <span>Required</span>
        </div>

        <div class="flex-grid top manager-edit-profile__form">

            <div class="box med-1of2">
                <label for="createEditProfile_teamSize" class="form__label">
                    <span id="createEditProfile_teamSize_label">What is the size of the team?</span>
                    <strong id="createEditProfile_teamSize_error" class="error hidden">
                        <span id="createEditProfile_teamSize_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input type="text" class="form__input--text" name="createEditProfile_teamSize" id="createEditProfile_teamSize"/>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_gcDirLink" class="form__label">
                    <span id="createEditProfile_gcDirLink_label">Link to the team in GC Directory</span>
                    <strong id="createEditProfile_gcDirLink_error" class="error hidden">
                        <span id="createEditProfile_gcDirLink_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <input type="text" class="form__input--text" name="createEditProfile_gcDirLink" id="createEditProfile_gcDirLink"/>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_teamNarrative_en" class="form__label">
                    <span id="createEditProfile_teamNarrative_en_label">Tell us what makes your team unique. What are your team's vision, values, and expectations?</span>
                    <strong id="createEditProfile_teamNarrative_en_error" class="error hidden">
                        <span id="createEditProfile_teamNarrative_en_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_teamNarrative_en" id="createEditProfile_teamNarrative_en"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_teamNarrative_fr" class="form__label">
                    <span id="createEditProfile_teamNarrative_fr_label">Dites-nous ce qui rend votre équipe unique. Quelles sont la vision, les valeurs et les attentes de votre équipe?</span>
                    <strong id="createEditProfile_teamNarrative_fr_error" class="error hidden">
                        <span id="createEditProfile_teamNarrative_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_teamNarrative_fr" id="createEditProfile_teamNarrative_fr"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_operatingContext_en" class="form__label">
                    <span id="createEditProfile_operatingContext_en_label">Our operating context</span>
                    <strong id="createEditProfile_operatingContext_en_error" class="error hidden">
                        <span id="createEditProfile_operatingContext_en_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_operatingContext_en" id="createEditProfile_operatingContext_en"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_operatingContext_fr" class="form__label">
                    <span id="createEditProfile_operatingContext_fr_label">Notre contexte d'exploitation</span>
                    <strong id="createEditProfile_operatingContext_fr_error" class="error hidden">
                        <span id="createEditProfile_operatingContext_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_operatingContext_fr" id="createEditProfile_operatingContext_fr"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_whatWeValue_en" class="form__label">
                    <span id="createEditProfile_whatWeValue_en_label">What we value</span>
                    <strong id="createEditProfile_whatWeValue_en_error" class="error hidden">
                        <span id="createEditProfile_whatWeValue_en_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_whatWeValue_en" id="createEditProfile_whatWeValue_en"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_whatWeValue_fr" class="form__label">
                    <span id="createEditProfile_whatWeValue_fr_label">Ce que nous apprécions</span>
                    <strong id="createEditProfile_whatWeValue_fr_error" class="error hidden">
                        <span id="createEditProfile_whatWeValue_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_whatWeValue_fr" id="createEditProfile_whatWeValue_fr"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_howWeWork_en" class="form__label">
                    <span id="createEditProfile_howWeWork_en_label">How we work</span>
                    <strong id="createEditProfile_howWeWork_en_error" class="error hidden">
                        <span id="createEditProfile_howWeWork_en_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_howWeWork_en" id="createEditProfile_howWeWork_en"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_howWeWork_fr" class="form__label">
                    <span id="createEditProfile_howWeWork_fr_label">Comment nous travaillons</span>
                    <strong id="createEditProfile_howWeWork_fr_error" class="error hidden">
                        <span id="createEditProfile_howWeWork_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_howWeWork_fr" id="createEditProfile_howWeWork_fr"></textarea>
            </div>

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
