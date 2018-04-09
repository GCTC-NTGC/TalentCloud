<!-- BEGIN - Edit Admin Profile Form (Page 3 / Work Environment) -->
<div id="createEditProfile_workEnvironment" class="stepGroup_createEditProfile hidden">
    <div class="tabsWrapper">
        <div class="tabsSteps">
            <div class="four-step-tab"><span id="createEditProfileStep1Label_WE">Step 1</span></div>
            <div class="four-step-tab"><span id="createEditProfileStep2Label_WE">Step 2</span></div>
            <div class="four-step-tab tab-current"><span id="createEditProfileWorkEnvironmentLabel_WE">Work Environment</span></div>
            <div class="five-step-tab"><span id="createEditProfileTeamCultureLabel_WE">Team Culture</span></div>
            <div class="four-step-tab"><span id="createEditProfileStep3Label_WE">Review</span></div>
        </div>
        <div class="tabs">
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab active"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
        </div>
    </div>
    <div class="stepGroupForm">
        <h3>Work Environment</h3>
                <div class="form-group">
                    <div class="multi-btn-group-form-group-label">
                        <span id="remoteWork_label">Remote work allowed</span>
                    </div>
                    <div style="display:inline-block;">
                        <div class="toggle-btn-group clearfix">
                            <div id="createEditProfile_remoteWork" style="position:absolute;top:0px;left:0px;width:6em;height:2em;z-index:100">
                                <input type="radio" id="remoteWork_option0" name="createEditProfile_remoteWork" value="option0" class="accessAid" checked="checked" onfocus="SliderAPI.toggle('remoteWork', 0)" />
                                <label id="remoteWork_option0_label" for="remoteWork_option0" class="option0Label">Yes</label>
                                <input type="radio" id="remoteWork_option1" name="createEditProfile_remoteWork" value="option1" class="accessAid" onfocus="SliderAPI.toggle('remoteWork',1)"/>
                                <label id="remoteWork_option1_label" for="remoteWork_option1" class="option1Label">No</label>
                            </div>
                            <div id="remoteWork" class="left"></div>
                        </div>
                    </div>
                </div>
                <div class="multi-btn-group-form-group">
                    <div class="multi-btn-group-form-group-label">
                        <span id="telework_label">Telework allowed</span>
                    </div>
                    <div style="display:inline-block;width:48%">
                        <div class="multi-btn-group clearfix">
                            <div id="createEditProfile_telework" style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
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
                </div>
                <div class="multi-btn-group-form-group">
                    <div class="multi-btn-group-form-group-label">
                        <span id="flexHours_label">Flexible hours allowed</span>
                    </div>
                    <div style="display:inline-block;width:48%">
                        <div class="multi-btn-group clearfix">
                            <div id="createEditProfile_flexHours" style="position:absolute;top:0px;right:0px;width:560px;height:3em;font-size: 1.2em !important;z-index:100">
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
                </div>
                <div class="workEnvironmentWrapper">
                    <span id="physicalEnvironment_title" class="workEnvironmentTitle">Physical Environment</span>
                    <div class="centered">
                        <div class="workEnvironmentImage">
                            <img id="workEnvironment_photo_1" alt="First image of workplace environment" src="../images/user.png" width="250"><br>
                            <label for="workplace_photo_input_1">Image 1</label>
                            <input type="file" id="workplace_photo_input_1" class="fileInput" name="Workplace Photo 1" accept="image/*" /><br>
                            <label for="workplace_photo_caption_1">Description 1: </label>
                            <input id="workplace_photo_caption_1" type="text" name="workplace_photo_caption_1"/>
                        </div>
                        <div class="workEnvironmentImage">
                            <img id="workEnvironment_photo_2" alt="Second image of workplace environment" src="../images/user.png" width="250"><br>
                            <label for="workplace_photo_input_2">Image 2</label>
                            <input type="file" id="workplace_photo_input_2" class="fileInput" name="Workplace Photo 2" accept="image/*" /><br>
                            <label for="workplace_photo_caption_2">Description 2: </label>
                            <input id="workplace_photo_caption_2" type="text" name="workplace_photo_caption_2"/>
                        </div>
                        <div class="workEnvironmentImage">
                            <img id="workEnvironment_photo_3" alt="Third image of workplace environment" src="../images/user.png" width="250"><br>
                            <label for="workplace_photo_input_3">Image 3</label>
                            <input type="file" id="workplace_photo_input_3" class="fileInput" name="Workplace Photo 3" accept="image/*" /><br>
                            <label for="workplace_photo_caption_3">Description 3: </label>
                            <input id="workplace_photo_caption_3" type="text" name="workplace_photo_caption_3"/>
                        </div>
                    </div>
                </div>
            </div>
        <div class="createEditProfileSubmitPane">
            <div class="formGroup insert"></div>
            <div class="formGroup">
                <input type="button" id="createEditProfile_goToStep2_2" value="Go to Step 2" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step2');">
                <input id="createEditProfile_goToTeamCulture_1" type="button" value="Go to Team Culture" onclick="CreateEditProfileAPI.goToStep('createEditProfile_teamCulture')">
            </div>
        </div>
    </div>
    <!-- END - Edit Admin Profile Form (Page 3 / Work Environment) -->
