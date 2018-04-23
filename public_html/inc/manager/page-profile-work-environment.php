<!-- BEGIN - Edit Admin Profile Form (Page 3 / Work Environment) -->
<div id="createEditProfile_workEnvironment" class="stepGroup_createEditProfile hidden">

    <div class="tabsWrapper">
        <div class="tabsSteps">
            <div class="five-step-tab"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_step1');"><span id="createEditProfileStep1Label_WE">About</span></a></div>
            <div class="five-step-tab"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2');"><span id="createEditProfileStep2Label_WE">Leadership</span></a></div>
            <div class="five-step-tab tab-current"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_workEnvironment');"><span id="createEditProfileWorkEnvironmentLabel_WE">Work Environment</span></a></div>
            <div class="five-step-tab"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture');"><span id="createEditProfileTeamCultureLabel_WE">Team Culture</span></a></div>
            <div class="five-step-tab"><a onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3');"><span id="createEditProfileStep3Label_WE">Other</span></a></div>
        </div>
        <div class="tabs">
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab active"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
        </div>
    </div>

    <br>

    <div class="stepGroupForm">

        <h3 class="manager-edit-profile__title heading--03">Our Work Environment</h3>

        <div class="manager-edit-profile__required-copy-wrapper">
            <span>* = </span>
            <span>Required</span>
        </div>

        <!--Tabs for remote work-->
        <div class="form-group box full">

            <label id="remoteWork_label" for="createEditProfile_remoteWork" class="form__label">Is remote work allowed?</label>

            <div class="toggle-btn-group">
                <div id="createEditProfile_remoteWork" style="position:absolute;top:0px;left:0px;width:6em;height:2em;z-index:100">
                    <input type="radio" id="remoteWork_option0" name="createEditProfile_remoteWork" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.toggle('remoteWork', 0)" />
                    <label id="remoteWork_option0_label" for="remoteWork_option0" class="option0Label">Yes</label>
                    <input type="radio" id="remoteWork_option1" name="createEditProfile_remoteWork" value="option1" class="accessAid" onfocus="SliderAPI.toggle('remoteWork',1)"/>
                    <label id="remoteWork_option1_label" for="remoteWork_option1" class="option1Label">No</label>
                </div>
                <div id="remoteWork" class="left"></div>
            </div>

        </div>

        <!--Tabs for Telework-->
        <div class="form-group box full">

            <label id="telework_label" for="createEditProfile_telework" class="form__label">Is telework allowed?</label>

            <div class="multi-btn-group">
                <div id="createEditProfile_telework">
                    <input type="radio" id="telework_option0" name="createEditProfile_telework" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_telework', this.value, 'telework')" />
                    <label id="telework_option0_label" for="telework_option0" class="option0Label">Never</label>
                    <input type="radio" id="telework_option1" name="createEditProfile_telework" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_telework', this.value, 'telework')"/>
                    <label id="telework_option1_label" for="telework_option1" class="option1Label">Occasionally</label>
                    <input type="radio" id="telework_option2" name="createEditProfile_telework" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_telework', this.value, 'telework')"/>
                    <label id="telework_option2_label" for="telework_option2" class="option2Label">Sometimes</label>
                    <input type="radio" id="telework_option3" name="createEditProfile_telework" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_telework', this.value, 'telework')"/>
                    <label id="telework_option3_label" for="telework_option3" class="option3Label">Frequently</label>
                    <input type="radio" id="telework_option4" name="createEditProfile_telework" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_telework', this.value, 'telework')"/>
                    <label id="telework_option4_label" for="telework_option4" class="option4Label">Most of the time</label>
                </div>
                <div id="telework" class="option0"></div>
            </div>

        </div>
        
        <!--Tabs for Flexible Work-->
        <div class="form-group box full">

            <label id="flexHours_label" for="createEditProfile_flexHours" class="form__label">Are flexible hours available?</label>

            <div class="multi-btn-group">
                <div id="createEditProfile_flexHours">
                    <input type="radio" id="flexHours_option0" name="createEditProfile_flexHours" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.selectOptionByValue('createEditProfile_flexHours', this.value, 'flexHours')" />
                    <label id="flexHours_option0_label" for="flexHours_option0" class="option0Label">Never</label>
                    <input type="radio" id="flexHours_option1" name="createEditProfile_flexHours" value="option1" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_flexHours', this.value, 'flexHours')"/>
                    <label id="flexHours_option1_label" for="flexHours_option1" class="option1Label">Occasionally</label>
                    <input type="radio" id="flexHours_option2" name="createEditProfile_flexHours" value="option2" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_flexHours', this.value, 'flexHours')"/>
                    <label id="flexHours_option2_label" for="flexHours_option2" class="option2Label">Sometimes</label>
                    <input type="radio" id="flexHours_option3" name="createEditProfile_flexHours" value="option3" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_flexHours', this.value, 'flexHours')"/>
                    <label id="flexHours_option3_label" for="flexHours_option3" class="option3Label">Frequently</label>
                    <input type="radio" id="flexHours_option4" name="createEditProfile_flexHours" value="option4" class="accessAid" onfocus="SliderAPI.selectOptionByValue('createEditProfile_flexHours', this.value, 'flexHours')"/>
                    <label id="flexHours_option4_label" for="flexHours_option4" class="option4Label">Most of the time</label>
                </div>
                <div id="flexHours" class="option0"></div>
            </div>

        </div>

        <hr class="manager-edit-profile__divider">
        
        <!--Work Envorinment Photo Upload-->
        <div class="workEnvironmentWrapper">

            <h3 id="physicalEnvironment_title" class="manager-edit-profile__title heading--03">Physical Environment</h3>

            <div class="manager-edit-profile__required-copy-wrapper">
                <span>* = </span>
                <span>Required</span>
            </div>

            <div class="flex-grid manager-edit-profile__workplace-image-grid">

                <div class="box lg-1of3 flex-grid manager-edit-profile__workplace-image-wrapper">
                    <div class="box full">
                        <img id="workEnvironment_photo_1" alt="First image of workplace environment" src="../images/user.png" width="250">
                    </div>
                    <div class="box full">
                        <div class="manager-edit-profile__photo-upload-wrapper">
                            <label for="workplace_photo_input_1" class="button--yellow form__upload-label">
                                <span>Upload an Image</span>
                                <input type="file" id="workplace_photo_input_1" class="fileInput form__upload-button" name="Workplace Photo 1" accept="image/*" />
                            </label>
                        </div>
                        <label for="workplace_photo_caption_1" class="form__label">Image 01 Description: </label>
                        <input id="workplace_photo_caption_1" type="text" name="workplace_photo_caption_1" class="form__input--text"/>
                    </div>
                </div>

                <div class="box lg-1of3 flex-grid manager-edit-profile__workplace-image-wrapper">
                    <div class="box full">
                        <img id="workEnvironment_photo_2" alt="Second image of workplace environment" src="../images/user.png" width="250">
                    </div>
                    <div class="box full">
                        <div class="manager-edit-profile__photo-upload-wrapper">
                            <label for="workplace_photo_input_2" class="form__upload-label button--yellow">
                                <span>Upload an Image</span>
                                <input type="file" id="workplace_photo_input_2" class="fileInput form__upload-button" name="Workplace Photo 2" accept="image/*"/>
                            </label>
                        </div>
                        <label for="workplace_photo_caption_2" class="form__label">Image 02 Description: </label>
                        <input id="workplace_photo_caption_2" type="text" name="workplace_photo_caption_2" class="form__input--text"/>
                    </div>
                </div>
                
                <div class="box lg-1of3 flex-grid manager-edit-profile__workplace-image-wrapper">
                    <div class="box full">
                        <img id="workEnvironment_photo_3" alt="Third image of workplace environment" src="../images/user.png" width="250">
                    </div>
                    <div class="box full">
                        <div class="manager-edit-profile__photo-upload-wrapper">
                            <label for="workplace_photo_input_3" class="form__upload-wrapper button--yellow">
                                <span>Upload an Image</span>
                                <input type="file" id="workplace_photo_input_3" class="fileInput form__upload-button" name="Workplace Photo 3" accept="image/*"/>
                            </label>
                        </div>
                        <label for="workplace_photo_caption_3" class="form__label">Image 03 Description: </label>
                        <input id="workplace_photo_caption_3" type="text" name="workplace_photo_caption_3" class="form__input--text"/>
                    </div>
                </div>

            </div>

        </div>

        <div class="createEditProfileSubmitPane manager-edit-profile__button-form flex-grid top">
            <div class="box full">
               <input class="button--yellow" id="workEnvironmentSaveCreateEditProfileSubmitButton" type="button" value="Save" onclick="CreateEditProfileAPI.validateStep3();">
            </div>
        </div>

    </div>

</div>
<!-- END - Edit Admin Profile Form (Page 3 / Work Environment) -->
