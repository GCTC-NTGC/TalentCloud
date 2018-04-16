<!-- BEGIN - Create Job Poster Section -->
<section class="pageContent hidden" id="createJobPosterSection">
    <div class="pageBanner">
        <h2 class="section--title">Create a new Job Poster</h2>
    </div>
    <div class="pageBody">
        <div class="container">
            <div class="wb-frmvld wb-init tabbedForm" id="jobPosterFormWrapper">
                <form name="createJobPosterForm" id="createJobPosterForm" method="post" enctype="application/x-www-form-urlencoded">
                    <div id="createJobPosterCreateTab" class="stepGroup">
                        <div class="tabsWrapper">
                            <div class="tabsSteps">
                                <div class="three-step-tab tab-current"><a href="javascript:void(0)" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_1">Create</a></div>
                                <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_1">Outdated</a></div>
                                <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_1">Review</a></div>
                            </div>
                            <div class="tabs">
                                <div class="steptab active"> </div>
                                <div class="steptab inactive"> </div>
                                <div class="steptab inactive"> </div>
                            </div>
                        </div>
                        <div class="stepGroupForm">
                            <h3>Details</h3>
                            <section id ="createJobPosterJobTitleSection">
                                <div class="leftPane">
                                    <div class="form-group">
                                        <label for="createJobPoster_jobTitle">
                                            <span>Job Title: *</span>
                                            <strong id="createJobPoster_jobTitle_error" class="error hidden">
                                                <span id="createJobPoster_jobTitle_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="text" name="createJobPoster_jobTitle" id="createJobPoster_jobTitle"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="rightPane">
                                    <div class="form-group">
                                        <label for="createJobPoster_jobTitle_fr">
                                            <span>Job Title (Français): *</span>
                                            <strong id="createJobPoster_jobTitle_fr_error" class="error hidden">
                                                <span id="createJobPoster_jobTitle_fr_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="text" name="createJobPoster_jobTitle_fr" id="createJobPoster_jobTitle_fr"/>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section id="createJobPosterDetailsSection">
                                <div class="singlePane">
                                    <div class="form-group">
                                        <label for="createJobPoster_department">
                                            <span><span id="createJobPoster_department_labelName">Department</span>: *</span>
                                            <strong id="createJobPoster_department_error" class="error hidden">
                                                <span id="createJobPoster_department_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <select class="form-control full-width" name="createJobPoster_department" id="createJobPoster_department">
                                            <option value="">--</option>
                                        </select>
                                    </div>
                                    <div class="flex-grid top">
                                        <div class="form-group box small-5of11">
                                            <label for="createJobPoster_branch">
                                                <span><span id="createJobPoster_branch_labelName">Branch</span> (English): *</span>
                                                <strong id="createJobPoster_branch_error" class="error hidden">
                                                    <span id="createJobPoster_branch_error_msg" class="label label-danger"></span>
                                                </strong>
                                            </label>
                                            <div>
                                                <input type="text" class="form-control full-width" name="createJobPoster_branch" id="createJobPoster_branch"/>
                                            </div>
                                        </div>
                                        <div class="box small-1of11"></div>
                                        <div class="form-group box small-5of11">
                                            <label for="createJobPoster_branch_fr">
                                                <span><span id="createJobPoster_branch_fr_labelName">Branch</span> (Français): *</span>
                                                <strong id="createJobPoster_branch_fr_error" class="error hidden">
                                                    <span id="createJobPoster_branch_fr_error_msg" class="label label-danger"></span>
                                                </strong>
                                            </label>
                                            <div>
                                                <input type="text" class="form-control full-width" name="createJobPoster_branch_fr" id="createJobPoster_branch_fr"/>
                                            </div>
                                        </div> `
                                    </div>
                                    <div class="flex-grid top">
                                        <div class="form-group box small-5of11">
                                            <label for="createJobPoster_division">
                                                <span><span id="createJobPoster_division_labelName">Division</span> (English): *</span>
                                                <strong id="createJobPoster_division_error" class="error hidden">
                                                    <span id="createJobPoster_division_error_msg" class="label label-danger"></span>
                                                </strong>
                                            </label>
                                            <div>
                                                <input type="text" class="form-control full-width" name="createJobPoster_division" id="createJobPoster_division"/>
                                            </div>
                                        </div>
                                        <div class="box small-1of11"></div>
                                        <div class="form-group box small-5of11">
                                            <label for="createJobPoster_division_fr">
                                                <span><span id="createJobPoster_division_fr_labelName">Division</span> (Français): *</span>
                                                <strong id="createJobPoster_division_fr_error" class="error hidden">
                                                    <span id="createJobPoster_division_fr_error_msg" class="label label-danger"></span>
                                                </strong>
                                            </label>
                                            <div>
                                                <input type="text" class="form-control full-width" name="createJobPoster_division_fr" id="createJobPoster_division_fr"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_province">
                                            <span><span id="createJobPoster_province_labelName">Province</span>: *</span>
                                            <strong id="createJobPoster_province_error" class="error hidden">
                                                <span id="createJobPoster_province_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <select class="form-control full-width" name="createJobPoster_province" id="createJobPoster_province">
                                                <option value="">--</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="singlePane">
                                    <div class="form-group">
                                        <label for="createJobPoster_city">
                                            <span>City: *</span>
                                            <strong id="createJobPoster_city_error" class="error hidden">
                                                <span id="createJobPoster_city_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="text" name="createJobPoster_city" id="createJobPoster_city"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="singlePane">
                                    <div class="form-group">
                                        <label for="createJobPoster_remunerationLowRange">
                                            <span><span id="createJobPoster_remunerationLowRange_labelName">Minimum salary</span>: *</span>
                                            <strong id="createJobPoster_remunerationLowRange_error" class="error hidden">
                                                <span id="createJobPoster_remunerationLowRange_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="text" name="createJobPoster_remunerationLowRange" id="createJobPoster_remunerationLowRange"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_remunerationHighRange">
                                            <span><span id="createJobPoster_remunerationHighRange_labelName">Maximum salary</span>: *</span>
                                            <strong id="createJobPoster_remunerationHighRange_error" class="error hidden">
                                                <span id="createJobPoster_remunerationHighRange_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="text" name="createJobPoster_remunerationHighRange" id="createJobPoster_remunerationHighRange"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_termQuantity">
                                            <span><span id="createJobPoster_termQuantity_labelName">Duration (months)</span>: *</span>
                                            <strong id="createJobPoster_termQuantity_error" class="error hidden">
                                                <span id="createJobPoster_termQuantity_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="text" name="createJobPoster_termQuantity" id="createJobPoster_termQuantity"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_openDate">
                                            <span><span id="createJobPoster_openDate_labelName">Open Date</span>: *</span>
                                            <strong id="createJobPoster_openDate_error" class="error hidden">
                                                <span id="createJobPoster_openDate_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="date" name="createJobPoster_openDate" id="createJobPoster_openDate"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_closeDate">
                                            <span><span id="createJobPoster_closeDate_labelName">Close Date</span>: *</span>
                                            <strong id="createJobPoster_closeDate_error" class="error hidden">
                                                <span id="createJobPoster_closeDate_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="date" name="createJobPoster_closeDate" id="createJobPoster_closeDate"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_startDate">
                                            <span><span id="createJobPoster_startDate_labelName">Start Date</span>: *</span>
                                            <strong id="createJobPoster_startDate_error" class="error hidden">
                                                <span id="createJobPoster_startDate_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <input class="form-control full-width" type="date" name="createJobPoster_startDate" id="createJobPoster_startDate"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="leftPane">
                                    <div class="form-group">
                                        <label for="createJobPoster_impact">
                                            <span><span id="createJobPoster_impact_labelName">Impact</span> (English):</span>
                                            <strong id="createJobPoster_impact_error" class="error hidden">
                                                <span id="createJobPoster_impact_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_impact" id="createJobPoster_impact"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_keyTasks">
                                            <span><span id="createJobPoster_keyTasks_labelName">Key Tasks</span> (English): **</span>
                                            <strong id="createJobPoster_keyTasks_error" class="error hidden">
                                                <span id="createJobPoster_keyTasks_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_keyTasks" id="createJobPoster_keyTasks"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_coreCompetencies">
                                            <span><span id="createJobPoster_coreCompetencies_labelName">Essential Criteria</span> (English): **</span>
                                            <strong id="createJobPoster_coreCompetencies_error" class="error hidden">
                                                <span id="createJobPoster_coreCompetencies_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_coreCompetencies" id="createJobPoster_coreCompetencies"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_developingCompetencies">
                                            <span><span id="createJobPoster_developingCompetencies_labelName">Asset Criteria</span> (English): **</span>
                                            <strong id="createJobPoster_developingCompetencies_error" class="error hidden">
                                                <span id="createJobPoster_developingCompetencies_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_developingCompetencies" id="createJobPoster_developingCompetencies"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_otherRequirements">
                                            <span><span id="createJobPoster_otherRequirements_labelName">Other Requirements</span> (English): **</span>
                                            <strong id="createJobPoster_otherRequirements_error" class="error hidden">
                                                <span id="createJobPoster_otherRequirements_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_otherRequirements" id="createJobPoster_otherRequirements"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_questions">
                                            <span><span id="createJobPoster_questions_labelName">Open Ended Questions</span> (English): **</span>
                                            <strong id="createJobPoster_questions_error" class="error hidden">
                                                <span id="createJobPoster_questions_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_questions" id="createJobPoster_questions"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="rightPane">
                                    <div class="form-group">
                                        <label for="createJobPoster_impact_fr">
                                            <span><span id="createJobPoster_impact_fr_labelName">Impact</span> (Français):</span>
                                            <strong id="createJobPoster_impact_fr_error" class="error hidden">
                                                <span id="createJobPoster_impact_fr_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_impact_fr" id="createJobPoster_impact_fr"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_keyTasks_fr">
                                            <span><span id="createJobPoster_keyTasks_fr_labelName">Key Tasks</span> (Français): **</span>
                                            <strong id="createJobPoster_keyTasks_fr_error" class="error hidden">
                                                <span id="createJobPoster_keyTasks_fr_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_keyTasks_fr" id="createJobPoster_keyTasks_fr"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_coreCompetencies_fr">
                                            <span><span id="createJobPoster_coreCompetencies_fr_labelName">Essential Criteria</span> (Français): **</span>
                                            <strong id="createJobPoster_coreCompetencies_fr_error" class="error hidden">
                                                <span id="createJobPoster_coreCompetencies_fr_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_coreCompetencies_fr" id="createJobPoster_coreCompetencies_fr"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_developingCompetencies_fr">
                                            <span><span id="createJobPoster_developingCompetencies_fr_labelName">Asset Criteria</span> (Français):</span>
                                            <strong id="createJobPoster_developingCompetencies_fr_error" class="error hidden">
                                                <span id="createJobPoster_developingCompetencies_fr_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_developingCompetencies_fr" id="createJobPoster_developingCompetencies_fr"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_otherRequirements_fr">
                                            <span><span id="createJobPoster_otherRequirements_fr_labelName">Other Requirements</span> (Français): **</span>
                                            <strong id="createJobPoster_otherRequirements_fr_error" class="error hidden">
                                                <span id="createJobPoster_otherRequirements_fr_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_otherRequirements_fr" id="createJobPoster_otherRequirements_fr"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="createJobPoster_questions_fr">
                                            <span><span id="createJobPoster_questions_fr_labelName">Open Ended Questions</span> (Français): **</span>
                                            <strong id="createJobPoster_questions_fr_error" class="error hidden">
                                                <span id="createJobPoster_questions_fr_error_msg" class="label label-danger"></span>
                                            </strong>
                                        </label>
                                        <div>
                                            <textarea class="form-control full-width" name="createJobPoster_questions_fr" id="createJobPoster_questions_fr"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div class="createJobPosterSubmitPane">
                                <div class="formGroup insert">*Required</div>
                                <div class="formGroup insert">**Each line is a new item</div>
                                <div class="formGroup">
                                    <input type="button" id="createJobPosterSubmitButton" value="Submit" onclick="CreateJobPosterAPI.validateJobPosterForm()">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="createJobPosterOutdatedTab" class="stepGroup hidden">
                        <div class="tabsWrapper">
                            <div class="tabsSteps">
                                <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_2">Create</a></div>
                                <div class="three-step-tab tab-current"><a href="javascript:void(0)" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_2">Outdated</a></div>
                                <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_2">Review</a></div>
                            </div>
                            <div class="tabs">
                                <div class="steptab active"> </div>
                                <div class="steptab inactive"> </div>
                                <div class="steptab inactive"> </div>
                            </div>
                        </div>
                        <h3>This is for outdated fields</h3>
                    </div>
                    <div id="createJobPosterReviewTab" class="stepGroup hidden">
                        <div class="tabsWrapper">
                            <div class="tabsSteps">
                                <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_3">Create</a></div>
                                <div class="three-step-tab"><a href="javascript:void(0)" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_3">Outdated</a></div>
                                <div class="three-step-tab tab-current"><a href="javascript:void(0)" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_3">Review</a></div>
                            </div>
                            <div class="tabs">
                                <div class="steptab inactive"> </div>
                                <div class="steptab inactive"> </div>
                                <div class="steptab active"> </div>
                            </div>
                        </div>
                        <div class="stepGroupForm">
                            <div class="formGroup">
                                <div class="createJobPosterDemoAreaEnglish" id="createJobPosterDemoAreaEnglish"></div>
                                <div class="createJobPosterDemoAreaFrench" id="createJobPosterDemoAreaFrench"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<!-- END - Create Job Poster Section -->
