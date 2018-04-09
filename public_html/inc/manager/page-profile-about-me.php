<!-- BEGIN - Edit Admin Profile Section -->
<section id="createEditProfileSection" class="pageContent hidden">
    <div class="pageBanner">
        <div class="profileBannerFiller"></div>
    </div>
    <div class="pageBody">
        <div class="container">
            <div id="createEditProfilePicWrapper" class="profileBasicInfoTopBar flexContainerVerticallyCentered">
                <div class="flexLeftOfCenter"></div>
                <img id="myProfilePic" class="profilePicLarge" src="../images/user.png" alt="Profile Pic"/>
                <div class="flexRightOfCenter">
                    <a href="javascript:void(0)" id="editMyProfilePic" onclick="CreateEditProfileAPI.showUploadProfilePic()">
                        <img id="editMyProfilePicImg" src="../images/edit_profile_pic.svg" alt="Edit Basic Info" class="editImage"/>
                    </a>
                </div>
            </div>
            <!-- BEGIN - Edit Admin Profile Form (Page 1 / About Me) -->
            <div class="wb-frmvld wb-init">
                <div class="tabbedForm">
                    <div class="section">
                        <!-- Where the old steps resided -->
                        <form method="post" name="CreateEditProfileForm" id="CreateEditProfileForm">
                            <input type="hidden" id="UserId"/>
                            <input type="hidden" id="ManagerProfileId"/>
                            <input type="hidden" id="ManagerProfileDetailsId"/>
                            <div id="profileCommon">
                                <div style="text-align: center;width:100%;">
                                    <div style="width:500px;margin:1em auto;text-align: center;">
                                        <span id="createEditProfile_name_preview" class="profileName">name</span>
                                    </div>
                                </div>
                                <div style="text-align: center;width:100%;">
                                    <div style="width:500px;margin:1em auto;text-align: center;">
                                        <span id="createEditProfile_position_preview" class="managerProfileTitle">position</span>
                                    </div>
                                </div>
                                <div style="text-align: center;width:100%;">
                                    <div style="width:500px;margin:1em auto;text-align: center;">
                                        <span id="createEditProfile_department_preview" class="managerProfileDepartment">department</span>
                                    </div>
                                </div>
                            </div>
                            <div id="createEditProfile_step1" class="stepGroup_createEditProfile">
                                <div class="tabsWrapper">
                                    <div class="tabsSteps">
                                        <div class="five-step-tab tab-current"><span id="createEditProfileStep1Label_1">About</span></div>
                                        <div class="five-step-tab"><span id="createEditProfileStep2Label_1">Leadership</span></div>
                                        <div class="five-step-tab"><span id="createEditProfileWorkEnvironmentLabel_1">Work Environment</span></div>
                                        <div class="five-step-tab"><span id="createEditProfileTeamCultureLabel_1">Team Culture</span></div>
                                        <div class="five-step-tab"><span id="createEditProfileStep3Label_1">Other</span></div>
                                    </div>
                                    <div class="tabs">
                                        <div class="steptab active"> </div>
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab inactive"> </div>
                                        <div class="steptab inactive"> </div>
                                    </div>
                                </div>
                                <div class="stepGroupForm">
                                    <h3 id="adminAboutMe">About Me</h3>
                                    <div style="margin-top:2em;">
                                        <div class="createEditProfileEnglishPane">
                                            <div class="form-group">
                                                <label for="createEditProfile_bio">
                                                    <span id="createEditProfile_bio_label">A little bit about me</span>
                                                    <strong id="createEditProfile_bio_error" class="error hidden">
                                                        <span id="createEditProfile_bio_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <textarea class="form-control full-width" name="createEditProfile_bio" id="createEditProfile_bio"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_proudOf">
                                                    <span id="createEditProfile_proudOf_label">What I'm most proud of in my career</span>
                                                    <strong id="createEditProfile_proudOf_error" class="error hidden">
                                                        <span id="createEditProfile_proudOf_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <textarea class="form-control full-width" name="createEditProfile_proudOf" id="createEditProfile_proudOf"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_position">
                                                    <span id="createEditProfile_position_label">Position</span>
                                                    <strong id="createEditProfile_position_error" class="error hidden">
                                                        <span id="createEditProfile_position_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input type="text" class="form-control full-width" name="createEditProfile_position" id="createEditProfile_position"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_department">
                                                    <span id="createEditProfile_department_label">Department</span>
                                                    <strong id="createEditProfile_department_error" class="error hidden">
                                                        <span id="createEditProfile_department_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <!--<input type="text" class="form-control full-width" name="createEditProfile_department" id="createEditProfile_department"/>-->
                                                    <select class="form-control full-width" name="createEditProfile_department" id="createEditProfile_department">
                                                        <option value="">--</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_branch">
                                                    <span><span id="createEditProfile_branch_labelName">Branch</span> (English):</span>
                                                    <strong id="createEditProfile_branch_error" class="error hidden">
                                                        <span id="createEditProfile_branch_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input type="text" class="form-control full-width" name="createEditProfile_branch" id="createEditProfile_branch"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_division">
                                                    <span><span id="createEditProfile_division_labelName">Division</span> (English):</span>
                                                    <strong id="createEditProfile_division_error" class="error hidden">
                                                        <span id="createEditProfile_division_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input type="text" class="form-control full-width" name="createEditProfile_division" id="createEditProfile_division"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_twitter">
                                                    <span id="createEditProfile_twitter_label">Twitter</span>
                                                    <strong id="createEditProfile_twitter_error" class="error hidden">
                                                        <span id="createEditProfile_twitter_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input class="form-control full-width" type="text" name="createEditProfile_twitter" id="createEditProfile_twitter" placeholder="@Username"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_linkedin">
                                                    <span id="createEditProfile_linkedin_label">LinkedIn</span>
                                                    <strong id="createEditProfile_linkedin_error" class="error hidden">
                                                        <span id="createEditProfile_linkedin_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input class="form-control full-width" type="text" name="createEditProfile_linkedin" id="createEditProfile_linkedin" placeholder="www.linkedin.com/in/Username"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="createEditProfileFrenchPane">
                                            <div class="form-group hidden">
                                                <label for="createEditProfile_name_fr">
                                                    <span id="createEditProfile_name_fr_label">Name_fr: *</span>
                                                    <strong id="createEditProfile_name_fr_error" class="error hidden">
                                                        <span id="createEditProfile_name_fr_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input disabled class="form-control full-width" type="text" name="createEditProfile_name_fr" id="createEditProfile_name_fr"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_bio_fr">
                                                    <span id="createEditProfile_bio_fr_label">A little bit about me_fr: *</span>
                                                    <strong id="createEditProfile_bio_fr_error" class="error hidden">
                                                        <span id="createEditProfile_bio_fr_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <textarea class="form-control full-width" name="createEditProfile_bio_fr" id="createEditProfile_bio_fr"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_proudOf_fr">
                                                    <span id="createEditProfile_proudOf_fr_label">What I'm most proud of in my career</span>
                                                    <strong id="createEditProfile_proudOf_fr_error" class="error hidden">
                                                        <span id="createEditProfile_proudOf_fr_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <textarea class="form-control full-width" name="createEditProfile_proudOf_fr" id="createEditProfile_proudOf_fr"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_position_fr">
                                                    <span id="createEditProfile_position_fr_label">Position_fr: *</span>
                                                    <strong id="createEditProfile_position_fr_error" class="error hidden">
                                                        <span id="createEditProfile_position_fr_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input class="form-control full-width" type="text" name="createEditProfile_position_fr" id="createEditProfile_position_fr"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_branch_fr">
                                                    <span><span id="createEditProfile_branch_fr_labelName">Branch</span> (francais):</span>
                                                    <strong id="createEditProfile_branch_fr_error" class="error hidden">
                                                        <span id="createEditProfile_branch_fr_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input type="text" class="form-control full-width" name="createEditProfile_branch_fr" id="createEditProfile_branch_fr"/>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="createEditProfile_division_fr">
                                                    <span><span id="createEditProfile_division_fr_labelName">Division</span> (English):</span>
                                                    <strong id="createEditProfile_division_fr_error" class="error hidden">
                                                        <span id="createEditProfile_division_fr_error_msg" class="label label-danger"></span>
                                                    </strong>
                                                </label>
                                                <div>
                                                    <input class="form-control full-width" type="text" name="createEditProfile_division_fr" id="createEditProfile_division_fr"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="createEditProfileSubmitPane">
                                        <div class="formGroup insert"><span>*</span><span id="createEditProfile_requiredStep1">Required</span></div>
                                        <div class="formGroup">
                                            <input type="button" id="createEditProfile_goToStep2_1" value="Save" onclick="CreateEditProfileAPI.validateStep1();"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- END - Edit Admin Profile Form (Page 1 / About Me) -->
