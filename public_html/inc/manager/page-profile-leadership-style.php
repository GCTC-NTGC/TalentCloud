<?php // BEGIN - Edit Admin Profile Form (Page 2 / Leadership Style) ?>
<div id="createEditProfile_step2" class="stepGroup_createEditProfile hidden">

    <div class="tabsSteps">
        <div class="five-step-tab">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1')" class="steppedFormLink">
                <span id="createEditProfileStep1Label_1">About</span>
            </button>
        </div>
        <div class="five-step-tab tab-current">
            <button type="button" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2')" class="steppedFormLinkActive">
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

        <h3 class="form__title">Leadership</h3>

        <p class="form__context">All fields required unless indicated as optional</p>

        <fieldset class="form__fieldset form__form-section" id="createJobPosterJobTitleSection">

            <legend class="form__legend">What is your leadership style?</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_leadership_style">English</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_leadership_style" id="createEditProfile_leadership_style" rows="2" required aria-required="true"/></textarea>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_leadership_style_fr">Français</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_leadership_style_fr" id="createEditProfile_leadership_style_fr" required aria-required="true"/></textarea>
                    </div>
                </div>

            </div>

        </fieldset>

        <fieldset class="form__fieldset form__form-section" id="createJobPosterJobTitleSection">

            <legend class="form__legend">What is your approach to employee learning and development?</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_app_to_employees">English</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_app_to_employees" id="createEditProfile_app_to_employees" rows="2" required aria-required="true"/></textarea>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_app_to_employees_fr">Français</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_app_to_employees_fr" id="createEditProfile_app_to_employees_fr" required aria-required="true"/></textarea>
                    </div>
                </div>

            </div>

        </fieldset>

        <fieldset class="form__fieldset form__form-section" id="createJobPosterJobTitleSection">

            <legend class="form__legend">What are your expectations of employees?</legend>

            <div class="flex-grid middle">

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_exp_of_employees">English</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_exp_of_employees" id="createEditProfile_exp_of_employees" rows="2" required aria-required="true"/></textarea>
                    </div>
                </div>

                <div class="box med-1of2">
                    <div class="form__input-wrapper--float">
                        <label class="form__label" for="createEditProfile_exp_of_employees_fr">Français</label>
                        <textarea class="form__textarea" type="text" name="createEditProfile_exp_of_employees_fr" id="createEditProfile_exp_of_employees_fr" required aria-required="true"/></textarea>
                    </div>
                </div>

            </div>

        </fieldset>

        <h3 class="form__title">Your Approach to Decision Making</h3>

        <div class="form__input-wrapper--range">
            <label class="form__label">How often do you review your teams work before it is shared?</label>
            <div class="form__range-wrapper">
                <span class="form__range-label--start">Never</span>
                <input class="form__input" type="range" min="1" max="5"></input>
                <span class="form__range-label--end">Always</span>
            </div>
        </div>

        <div class="form__input-wrapper--range">
            <label class="form__label">How often do you get in early or stay late to get some extra work done?</label>
            <div class="form__range-wrapper">
                <span class="form__range-label--start">Never</span>
                <input class="form__input" type="range" min="1" max="5"></input>
                <span class="form__range-label--end">Always</span>
            </div>
        </div>

        <div class="form__input-wrapper--range">
            <label class="form__label">How often do you engage your team before responding to management?</label>
            <div class="form__range-wrapper">
                <span class="form__range-label--start">Never</span>
                <input class="form__input" type="range" min="1" max="5"></input>
                <span class="form__range-label--end">Always</span>
            </div>
        </div>

        <div class="form__input-wrapper--range">
            <label class="form__label">How often do you approve development opportunities for your employees?</label>
            <div class="form__range-wrapper">
                <span class="form__range-label--start">Never</span>
                <input class="form__input" type="range" min="1" max="5"></input>
                <span class="form__range-label--end">Always</span>
            </div>
        </div>

        <div class="form__input-wrapper--range">
            <label class="form__label">How often do you refuse low value work requests from management?</label>
            <div class="form__range-wrapper">
                <span class="form__range-label--start">Never</span>
                <input class="form__input" type="range" min="1" max="5"></input>
                <span class="form__range-label--end">Always</span>
            </div>
        </div>

        <?php /*
        <div class="flex-grid top manager-edit-profile__form">

        <div class="form-group box full">
        <div class="multi-btn-group-form-group-label">
        <span>&nbsp;</span>
        </div>
        <div style="display:inline-block;width:560px">
        <div>
        <div style="line-height:2em;;font-size: 1.2em !important;">
        <span style="line-height:2em;vertical-align: middle;display:inline-block;width:20%;text-align: left;">10% or less</span>
        <span style="line-height:2em;display:inline-block;width:20%;text-align: center;margin-left:-5px;">~25%</span>
        <span style="line-height:2em;display:inline-block;width:20%;text-align: center;margin-left:-5px;">~50%</span>
        <span style="line-height:2em;display:inline-block;width:20%;text-align: center;margin-left:-5px;">~75%</span>
        <span style="line-height:2em;display:inline-block;width:20%;text-align: right;margin-left:-5px;">90% or more</span>
        </div>
        </div>
        </div>
        </div>

        <div class="multi-btn-group-form-group box full">
        <div class="multi-btn-group-form-group-label">
        <span id="createEditProfile_how_often_review_label">How often do you review your teams work before it is shared?</span>
        </div>
        <div style="display:inline-block;width:560px">
        <div class="multi-btn-group clearfix">
        <div id="createEditProfile_how_often_review_options" style="position:absolute;top:0px;right:0px;width:560px;height:2em;z-index:100;font-size: 1.2em !important;">
        <input type="radio" id="option0" name="createEditProfile_how_often_review_options" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')" />
        <label for="option0" class="option0Label">Almost never</label>
        <input type="radio" id="option1" name="createEditProfile_how_often_review_options" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')"/>
        <label for="option1" class="option1Label">Rarely</label>
        <input type="radio" id="option2" name="createEditProfile_how_often_review_options" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')"/>
        <label for="option2" class="option2Label">Sometimes</label>
        <input type="radio" id="option3" name="createEditProfile_how_often_review_options" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')"/>
        <label for="option3" class="option3Label">Usually</label>
        <input type="radio" id="option4" name="createEditProfile_how_often_review_options" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_how_often_review_options', this.value, 'review_options')"/>
        <label for="option4" class="option4Label">Almost always</label>
        </div>
        <div id="review_options" class="option0"></div>
        </div>
        </div>
        </div>

        <div class="multi-btn-group-form-group box full">
        <div class="multi-btn-group-form-group-label">
        <span id="createEditProfile_how_often_early_label">How often do you get in early or stay late to get some extra work done?</span>
        </div>
        <div style="display:inline-block;width:560px">
        <div class="multi-btn-group clearfix">
        <div id="createEditProfile_staylate_options" style="position:absolute;top:0px;right:0px;width:560px;height:2em;font-size: 1.2em !important;z-index:100">
        <input type="radio" id="staylate_option0" name="createEditProfile_staylate" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')" />
        <label for="staylate_option0" class="option0Label">Almost never</label>
        <input type="radio" id="staylate_option1" name="createEditProfile_staylate" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')"/>
        <label for="staylate_option1" class="option1Label">Rarely</label>
        <input type="radio" id="staylate_option2" name="createEditProfile_staylate" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')"/>
        <label for="staylate_option2" class="option2Label">Sometimes</label>
        <input type="radio" id="staylate_option3" name="createEditProfile_staylate" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')"/>
        <label for="staylate_option3" class="option3Label">Usually</label>
        <input type="radio" id="staylate_option4" name="createEditProfile_staylate" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_staylate', this.value, 'staylate')"/>
        <label for="staylate_option4" class="option4Label">Almost always</label>
        </div>
        <div id="staylate" class="option0"></div>
        </div>
        </div>
        </div>

        <div class="multi-btn-group-form-group box full">
        <div class="multi-btn-group-form-group-label">
        <span>How often do you engage your team before responding to management?</span>
        </div>
        <div style="display:inline-block;width:560px">
        <div class="multi-btn-group clearfix">
        <div id="createEditProfile_engage_options" style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
        <input type="radio" id="engage_option0" name="createEditProfile_engage" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')" />
        <label for="engage_option0" class="option0Label">Almost never</label>
        <input type="radio" id="engage_option1" name="createEditProfile_engage" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')"/>
        <label for="engage_option1" class="option1Label">Rarely</label>
        <input type="radio" id="engage_option2" name="createEditProfile_engage" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')"/>
        <label for="engage_option2" class="option2Label">Sometimes</label>
        <input type="radio" id="engage_option3" name="createEditProfile_engage" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')"/>
        <label for="engage_option3" class="option3Label">Usually</label>
        <input type="radio" id="engage_option4" name="createEditProfile_engage" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_engage', this.value, 'engage')"/>
        <label for="engage_option4" class="option4Label">Almost always</label>
        </div>
        <div id="engage" class="option0"></div>
        </div>
        </div>
        </div>

        <div class="multi-btn-group-form-group box full">
        <div class="multi-btn-group-form-group-label">
        <span>How often do you approve development opportunities for your employees?</span>
        </div>
        <div style="display:inline-block;width:560px">
        <div class="multi-btn-group clearfix">
        <div id="createEditProfile_devops" style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
        <input type="radio" id="devops_option0" name="createEditProfile_devops" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')" />
        <label for="devops_option0" class="option0Label">Almost never</label>
        <input type="radio" id="devops_option1" name="createEditProfile_devops" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')"/>
        <label for="devops_option1" class="option1Label">Rarely</label>
        <input type="radio" id="devops_option2" name="createEditProfile_devops" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')"/>
        <label for="devops_option2" class="option2Label">Sometimes</label>
        <input type="radio" id="devops_option3" name="createEditProfile_devops" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')"/>
        <label for="devops_option3" class="option3Label">Usually</label>
        <input type="radio" id="devops_option4" name="createEditProfile_devops" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_devops', this.value, 'devops')"/>
        <label for="devops_option4" class="option4Label">Almost always</label>
        </div>
        <div id="devops" class="option0"></div>
        </div>
        </div>
        </div>

        <div class="multi-btn-group-form-group box full">
        <div class="multi-btn-group-form-group-label">
        <span>How often do you refuse low value work requests from management?</span>
        </div>
        <div style="display:inline-block;width:48%">
        <div class="multi-btn-group clearfix">
        <div id="createEditProfile_lvwrequests" style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
        <input type="radio" id="lvwRequests_option0" name="createEditProfile_lvwrequests" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')" />
        <label for="lvwRequests_option0" class="option0Label">Almost never</label>
        <input type="radio" id="lvwRequests_option1" name="createEditProfile_lvwrequests" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')"/>
        <label for="lvwRequests_option1" class="option1Label">Rarely</label>
        <input type="radio" id="lvwRequests_option2" name="createEditProfile_lvwrequests" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')"/>
        <label for="lvwRequests_option2" class="option2Label">Sometimes</label>
        <input type="radio" id="lvwRequests_option3" name="createEditProfile_lvwrequests" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')"/>
        <label for="lvwRequests_option3" class="option3Label">Usually</label>
        <input type="radio" id="lvwRequests_option4" name="createEditProfile_lvwrequests" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_lvwrequests', this.value, 'lvwRequests')"/>
        <label for="lvwRequests_option4" class="option4Label">Almost always</label>
        </div>
        <div id="lvwRequests" class="option0"></div>
        </div>
        </div>
        </div>

        </div>
        */  ?>

        <div class="createEditProfileSubmitPane manager-edit-profile__button-form flex-grid">
            <div class="formGroup box med-1of2">
                <input id="leadershipStyleCloseButton" type="button" value="Close" onclick="CreateEditProfileAPI.hideViewProfile();" class="button--grey closeProfileButton">
            </div>
            <div class="formGroup box med-1of2">
                <input id="leadershipStyleBackButton" type="button" value="Back" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1');" class="button--grey">
                <input class="button--yellow" id="leadershipSaveCreateEditProfileSubmitButton" type="button" value="Save" onclick="CreateEditProfileAPI.validateLeadership();">
            </div>
        </div>

    </div>
</div>
<?php // END - Edit Admin Profile Form (Page 2 / Leadership Style) ?>
