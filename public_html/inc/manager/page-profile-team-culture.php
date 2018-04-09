<!-- BEGIN - Edit Admin Profile Form (Page 4 / Team Culture) -->
<div id="createEditProfile_teamCulture" class="stepGroup_createEditProfile hidden">
    <div class="tabsWrapper">
        <div class="tabsSteps">
            <div class="five-step-tab"><span id="createEditProfileStep1Label_TC">About</span></div>
            <div class="five-step-tab"><span id="createEditProfileStep2Label_TC">Leadership</span></div>
            <div class="five-step-tab"><span id="createEditProfileWorkEnvironmentLabel_TC">Work Environment</span></div>
            <div class="five-step-tab tab-current"><span id="createEditProfileTeamCultureLabel_TC">Team Culture</span></div>
            <div class="five-step-tab"><span id="createEditProfileStep3Label_TC">Review</span></div>
        </div>
        <div class="tabs">
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab inactive"> </div>
            <div class="steptab active"> </div>
            <div class="steptab inactive"> </div>
        </div>
    </div>
    <div class="stepGroupForm">
        <h3 id="createEditProfile_teamCultureTitle">Team Culture</h3>
        <div>
            <div class="form-group">
                <label for="createEditProfile_teamSize">
                    <span id="createEditProfile_teamSize_label">What is the size of the team?</span>
                    <strong id="createEditProfile_teamSize_error" class="error hidden">
                        <span id="createEditProfile_teamSize_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <div>
                    <input type="text" class="form-control" name="createEditProfile_teamSize" id="createEditProfile_teamSize"/>
                </div>
            </div>
            <div class="form-group">
                <label for="createEditProfile_gcDirLink">
                    <span id="createEditProfile_gcDirLink_label">Link to the team in GC Directory</span>
                    <strong id="createEditProfile_gcDirLink_error" class="error hidden">
                        <span id="createEditProfile_gcDirLink_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <div>
                    <input type="text" class="form-control full-width" name="createEditProfile_gcDirLink" id="createEditProfile_gcDirLink"/>
                </div>
            </div>
            <div class="form-group leftPane">
                <label for="createEditProfile_teamNarrative_en">
                    <span id="createEditProfile_teamNarrative_en_label">Tell us what makes your team unique. What are your team's vision, values, and expectations?</span>
                    <strong id="createEditProfile_teamNarrative_en_error" class="error hidden">
                        <span id="createEditProfile_teamNarrative_en_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <div>
                    <textarea class="form-control full-width" name="createEditProfile_teamNarrative_en" id="createEditProfile_teamNarrative_en"></textarea>
                </div>
            </div>
            <div class="form-group rightPane">
                <label for="createEditProfile_teamNarrative_fr">
                    <span id="createEditProfile_teamNarrative_fr_label">Dites-nous ce qui rend votre équipe unique. Quelles sont la vision, les valeurs et les attentes de votre équipe?</span>
                    <strong id="createEditProfile_teamNarrative_fr_error" class="error hidden">
                        <span id="createEditProfile_teamNarrative_fr_error_msg" class="label label-danger"></span>
                    </strong>
                </label>
                <div>
                    <textarea class="form-control full-width" name="createEditProfile_teamNarrative_fr" id="createEditProfile_teamNarrative_fr"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="createEditProfileSubmitPane">
        <div class="formGroup insert"></div>
        <div class="formGroup">
            <input type="button" id="createEditProfile_goToWorkEnvironment_2" value="Go to Work Environment" onclick="CreateEditProfileAPI.goToStep('createEditProfile_workEnvironment');">
            <input id="createEditProfile_goToStep3_1" type="button" value="Go to Step 3" onclick="CreateEditProfileAPI.goToStep('createEditProfile_step3')">
        </div>
    </div>
</div>
<!-- END - Edit Admin Profile Form (Page 4 / Team Culture) -->
