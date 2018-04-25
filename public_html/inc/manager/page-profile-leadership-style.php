<!-- BEGIN - Edit Admin Profile Form (Page 2 / Leadership Style) -->
<div id="createEditProfile_step2" class="stepGroup_createEditProfile hidden">

    <div class="tabsWrapper">
        <div class="tabsSteps">
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1');"><span id="createEditProfileStep1Label_2">About</span></a></div>
            <div class="five-step-tab tab-current"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2');"><span id="createEditProfileStep2Label_2">Leadership</span></a></div>
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_workEnvironment');"><span id="createEditProfileWorkEnvironmentLabel_2">Work Environment</span></a></div>
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture');"><span id="createEditProfileTeamCultureLabel_2">Team Culture</span></a></div>
            <div class="five-step-tab"><a href="javascript:void(0)" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3');"><span id="createEditProfileStep3Label_2">Other</span></a></div>
        </div>
        <div class="tabs">
            <div class="steptab inactive"> </div>
            <div class="steptab active"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
        </div>
    </div>

    <br>

    <div class="stepGroupForm">

        <h3 class="manager-edit-profile__title heading--03">My Leadership Style</h3>

        <div class="manager-edit-profile__required-copy-wrapper">
            <span>* = </span>
            <span id="createEditProfile_requiredStep2">Required</span>
        </div>

        <div class="flex-grid top manager-edit-profile__form">

            <div class="box med-1of2">
                <label for="createEditProfile_leadership_style" class="form__label">
                    <span id="createEditProfile_leadership_style_label">My leadership style</span>
                    <strong id="createEditProfile_leadership_style_error" class="error hidden">
                        <span id="createEditProfile_leadership_style_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_leadership_style" id="createEditProfile_leadership_style"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_leadership_style_fr" class="form__label">
                    <span id="createEditProfile_leadership_style_fr_label">Leadership Style_fr: *</span>
                    <strong id="createEditProfile_leadership_style_fr_error" class="error hidden">
                        <span id="createEditProfile_leadership_style_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_leadership_style_fr" id="createEditProfile_leadership_style_fr"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_app_to_employees" class="form__label">
                    <span id="createEditProfile_app_to_employees_label">My approach to employee learning and development</span>
                    <strong id="createEditProfile_app_to_employees_error" class="error hidden">
                        <span id="createEditProfile_app_to_employees_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_app_to_employees" id="createEditProfile_app_to_employees"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_app_to_employees_fr" class="form__label">
                    <span id="createEditProfile_app_to_employees_fr_label">Approach to employees_fr: *</span>
                    <strong id="createEditProfile_app_to_employees_fr_error" class="error hidden">
                        <span id="createEditProfile_app_to_employees_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_app_to_employees_fr" id="createEditProfile_app_to_employees_fr"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_exp_of_employees" class="form__label">
                    <span id="createEditProfile_exp_of_employees_label">My expectations of employees</span>
                    <strong id="createEditProfile_exp_of_employees_error" class="error hidden">
                        <span id="createEditProfile_exp_of_employees_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_exp_of_employees" id="createEditProfile_exp_of_employees"></textarea>
            </div>

            <div class="box med-1of2">
                <label for="createEditProfile_exp_of_employees_fr" class="form__label">
                    <span id="createEditProfile_exp_of_employees_fr_label">Expectation of employees_fr: *</span>
                    <strong id="createEditProfile_exp_of_employees_fr_error" class="error hidden">
                        <span id="createEditProfile_exp_of_employees_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <textarea class="form__textarea" name="createEditProfile_exp_of_employees_fr" id="createEditProfile_exp_of_employees_fr"></textarea>
            </div>

        </div>

    </div>

    <hr class="manager-edit-profile__divider">

    <div class="">
        
        <h3 class="manager-edit-profile__title heading--03">My Approach to Decision Making</h3>

        <div class="manager-edit-profile__required-copy-wrapper">
            <span>* = </span>
            <span>Required</span>
        </div>

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

            &nbsp;
            <br>
            &nbsp;
            <br>
            &nbsp;

        </div>

    </div>

    <div class="createEditProfileSubmitPane manager-edit-profile__button-form flex-grid top">
        <div class="formGroup box full">
            <input class="button--yellow" id="leadershipSaveCreateEditProfileSubmitButton" type="button" value="Save" onclick="CreateEditProfileAPI.validateStep3();">
        </div>
    </div>

</div>
<!-- END - Edit Admin Profile Form (Page 2 / Leadership Style) -->
