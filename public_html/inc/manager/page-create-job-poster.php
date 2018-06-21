<?php // BEGIN - Create Job Poster Section ?>
<section class="hidden" id="createJobPosterSection">
    <div class="block-container">

        <div class="section" id="jobPosterFormWrapper">
            <form name="createJobPosterForm" id="createJobPosterForm" method="post" enctype="application/x-www-form-urlencoded">

                <div id="createJobPosterCreateTab" class="stepGroup flex-grid">
                    <div class="tabsSteps box full">
                        <div class="three-step-tab tab-current">

                            <?php // Using buttons for page controls (links with no HTTP ref)
                            // Add 'return false;' to the event handler to replace javascript:void(0) functionality ?>
                            <button type="button" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_1">Create</button>
                        </div>
                        <div class="three-step-tab">
                            <button type="button" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_1">Outdated</button>
                        </div>
                        <div class="three-step-tab">
                            <button type="button" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_1">Review</button>
                        </div>
                    </div>

                    <h3 class="manager-poster__title heading--03 box full">Job Poster Details</h3>

                    <div class="manager-edit-profile__required-copy-wrapper box full">
                        All fields required unless indicated as optional
                    </div>

                    <?php // Grouping form inputs with fieldset and legend ?>
                    <fieldset id="createJobPosterJobTitleSection" class="box med-1of2">
                        <legend>Job Title</legend>
                        <?php // Title (English) ?>

                        <?php // Add aria-required="true" and required attributes ?>
                        <?php // TO DO: More HTML5 error handling ?>
                        <label class="form__label" for="createJobPoster_jobTitle">English</label>
                        <input class="form__input--text" type="text" name="createJobPoster_jobTitle" id="createJobPoster_jobTitle" required aria-required="true"/>


                        <?php // Error handling TO BE REVISED ?>
                        <div id="createJobPoster_jobTitle_error" class="error hidden">
                            <span id="createJobPoster_jobTitle_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // Title (Français) ?>
                        <label class="form__label" for="createJobPoster_jobTitle_fr">Français</label>
                        <input class="form__input--text" type="text" name="createJobPoster_jobTitle_fr" id="createJobPoster_jobTitle_fr" required aria-required="true"/>


                        <div id="createJobPoster_jobTitle_fr_error" class="error hidden">
                            <span id="createJobPoster_jobTitle_fr_error_msg" class="label label-danger"></span>
                        </div>

                    </fieldset>

                    <fieldset class="box lg-1of2">
                        <legend>Salary</legend>

                        <?php // Minimum salary ?>
                        <label class="form__label" for="createJobPoster_remunerationLowRange">Minimum</label>
                        <input class="form__input--text" type="text" name="createJobPoster_remunerationLowRange" id="createJobPoster_remunerationLowRange" required aria-required="true"/>

                        <div id="createJobPoster_remunerationLowRange_error" class="error hidden">
                            <span id="createJobPoster_remunerationLowRange_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // Maximum salary ?>
                        <label class="form__label" for="createJobPoster_remunerationHighRange">Maximum</label>
                        <input class="form__input--text" type="text" name="createJobPoster_remunerationHighRange" id="createJobPoster_remunerationHighRange" required aria-required="true"/>

                        <div id="createJobPoster_remunerationHighRange_error" class="error hidden">
                            <span id="createJobPoster_remunerationHighRange_error_msg" class="label label-danger"></span>
                        </div>

                    </fieldset>

                    <?php /*

                    <div class="box full">
                    <label class="form__label" for="createJobPoster_noc">
                    <span id="createJobPoster_noc_labelName"><span>NOC</span>: *</span>
                    <div id="createJobPoster_noc_error" class="error hidden">
                    <span id="createJobPoster_noc_error_msg" class="label label-danger"></span>
                    </div>
                    </label>
                    <input class="form__input--text" type="text" name="createJobPoster_noc" id="createJobPoster_noc"/>
                    </div>
                    */ ?>

                    <fieldset class="box lg-1of2">
                        <legend id="createJobPoster_branch_labelName">Branch</legend>

                        <?php // Branch (English) ?>
                        <label class="form__label" for="createJobPoster_branch">English</label>
                        <input type="text" class="form__input--text" name="createJobPoster_branch" id="createJobPoster_branch" required aria-required="true"/>

                        <div id="createJobPoster_branch_error" class="error hidden">
                            <span id="createJobPoster_branch_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // Branch (Français) ?>
                        <label class="form__label" for="createJobPoster_branch_fr">Français</label>
                        <input type="text" class="form__input--text" name="createJobPoster_branch_fr" id="createJobPoster_branch_fr" required aria-required="true"/>

                        <div id="createJobPoster_branch_fr_error" class="error hidden">
                            <span id="createJobPoster_branch_fr_error_msg" class="label label-danger"></span>
                        </div>

                    </fieldset>

                    <fieldset class="box lg-1of2">
                        <legend>Division</legend>

                        <?php // Division (English) ?>
                        <label class="form__label" for="createJobPoster_division">English</label>
                        <input type="text" class="form__input--text" name="createJobPoster_division" id="createJobPoster_division" required aria-required="true"/>

                        <div id="createJobPoster_division_error" class="error hidden">
                            <span id="createJobPoster_division_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // Division (Français) ?>
                        <label class="form__label" for="createJobPoster_division_fr">Français</label>
                        <input type="text" class="form__input--text" name="createJobPoster_division_fr" id="createJobPoster_division_fr" required aria-required="true"/>

                        <div id="createJobPoster_division_fr_error" class="error hidden">
                            <span id="createJobPoster_division_fr_error_msg" class="label label-danger"></span>
                        </div>

                    </fieldset>

                    <fieldset id="createJobPosterDetailsSection" class="box lg-1of2">
                        <legend>Classifications</legend>

                        <?php // Occupational group ?>
                        <label class="form__label" for="createJobPoster_classification">Occupational group</label>
                        <?php // Testing HTML5 form validation ?>
                        <input
                        id="createJobPoster_classification"
                        name="createJobPoster_classification"
                        class="form__input--text"
                        type="text"
                        maxlength="5"
                        required
                        aria-required="true"
                        placeholder="Example: AS-01"
                        pattern="[A-Z]{2}[-][0-9]{2}"
                        title="Occupational group must contain two characters followed by a hyphen, then two numbers"
                        oninput="this.value = this.value.toUpperCase()"
                        />

                        <div id="createJobPoster_classification_error" class="error hidden">
                            <span id="createJobPoster_classification_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // Security clearance ?>
                        <label class="form__label" for="createJobPoster_clearance">Security clearance level</label>
                        <div class="form__select-wrapper">
                            <select class="form__select" name="createJobPoster_clearance" id="createJobPoster_clearance" required aria-required="true">
                                <option value="">--</option>
                            </select>
                        </div>

                        <div id="createJobPoster_clearance_error" class="error hidden">
                            <span id="createJobPoster_clearance_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // Language ?>
                        <label class="form__label" for="createJobPoster_language">Language requirements</label>
                        <div class="form__select-wrapper">
                            <select class="form__select" name="createJobPoster_language" id="createJobPoster_language" required aria-required="true">
                                <option value="">--</option>
                            </select>
                        </div>

                        <div id="createJobPoster_language_error" class="error hidden">
                            <span id="createJobPoster_language_error_msg" class="label label-danger"></span>
                        </div>

                    </fieldset>

                    <fieldset class="box lg-1of2">
                        <legend>Location</legend>

                        <?php // Department ?>
                        <label class="form__label" for="createJobPoster_department">Department</label>
                        <div class="form__select-wrapper">
                            <select class="form__select" name="createJobPoster_department" id="createJobPoster_department" required aria-required="true">
                                <option value="">--</option>
                            </select>
                        </div>

                        <div id="createJobPoster_department_error" class="error hidden">
                            <span id="createJobPoster_department_error_msg" class="label label-danger"></span>
                        </div>


                        <?php // Province ?>
                        <label class="form__label" for="createJobPoster_province">Province</label>
                        <div class="form__select-wrapper">
                            <select class="form__select" name="createJobPoster_province" id="createJobPoster_province" required aria-required="true">
                                <option value="">--</option>
                            </select>
                        </div>

                        <div id="createJobPoster_province_error" class="error hidden">
                            <span id="createJobPoster_province_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // City ?>
                        <label class="form__label" for="createJobPoster_city">City</label>
                        <input class="form__input--text" type="text" name="createJobPoster_city" id="createJobPoster_city" required aria-required="true"/>

                        <div id="createJobPoster_city_error" class="error hidden">
                            <span id="createJobPoster_city_error_msg" class="label label-danger"></span>
                        </div>

                    </fieldset>

                    <fieldset class="box lg-1of2">
                        <legend>Timetable</legend>

                        <?php // Open date ?>
                        <label class="form__label" for="createJobPoster_openDate">Open date</label>
                        <input class="form__input--date" type="date" name="createJobPoster_openDate" id="createJobPoster_openDate" required aria-required="true"/>

                        <div id="createJobPoster_openDate_error" class="error hidden">
                            <span id="createJobPoster_openDate_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // Close date ?>
                        <label class="form__label" for="createJobPoster_closeDate">Close date</label>
                        <input class="form__input--date" type="date" name="createJobPoster_closeDate" id="createJobPoster_closeDate" required aria-required="true"/>

                        <div id="createJobPoster_closeDate_error" class="error hidden">
                            <span id="createJobPoster_closeDate_error_msg" class="label label-danger"></span>
                        </div>

                        <?php // Start date ?>
                        <label class="form__label" for="createJobPoster_startDate">Start Date</label>
                        <div id="createJobPoster_startDate_error" class="error hidden">
                            <span id="createJobPoster_startDate_error_msg" class="label label-danger"></span>
                        </div>
                        <input class="form__input--date" type="date" name="createJobPoster_startDate" id="createJobPoster_startDate" required aria-required="true"/>

                        <?php // Duration ?>
                        <label class="form__label" for="createJobPoster_termQuantity">Duration (in months)</label>
                        <?php // Testing HTML5 error handling ?>
                        <input
                        id="createJobPoster_termQuantity"
                        name="createJobPoster_termQuantity"
                        class="form__input--text"
                        type="text"
                        required
                        aria-required="true"
                        maxlength="2"
                        pattern="[0-9]{1,2}"
                        title="Duration must contain one or two numbers"
                        />

                        <div id="createJobPoster_termQuantity_error" class="error hidden">
                            <span id="createJobPoster_termQuantity_error_msg" class="label label-danger"></span>
                        </div>

                    </fieldset>


                    <fieldset class="box lg-1of2">
                        <legend>Impact (optional)</legend>

                        <?php // Impact (English) ?>
                        <label class="form__label" for="createJobPoster_impact">English</label>
                        <textarea class="form__textarea" name="createJobPoster_impact" id="createJobPoster_impact" rows="2"></textarea>


                        <?php // Impact (Français) ?>
                        <label class="form__label" for="createJobPoster_impact_fr">Français</label>
                        <textarea class="form__textarea" name="createJobPoster_impact_fr" id="createJobPoster_impact_fr" rows="2"></textarea>

                    </fieldset>


                    <?php /* New Open Ended Questions */ ?>

                    <div class="job-poster__open-questions box full">

                        <div class="job-poster__open-questions-wrapper repeater__wrapper flex-grid middle">

                            <h4 class="job-poster__open-question-section-label box full">Open Ended Questions</h4>

                            <div class="job-poster__open-question flex-grid repeater__template">

                                <div class="box med-1of2">
                                    <span class="job-poster__open-question-label">New Open Ended Question</span>
                                </div>

                                <div class="box med-1of2">
                                    <button class="job-poster__open-question-remove-button repeater__remove-button" onclick="Utilities.removeRepeatedElement">remove</button>
                                </div>

                                <div class="job-poster__open-question-wrapper--english box med-1of2">

                                    <span class="job-poster__open-question-wrapper-label">
                                        English Content
                                    </span>

                                    <label class="form__label">
                                        Question
                                    </label>

                                    <input class="form__input--text job-poster__open-question-input" type="text" placeholder="Question"/>

                                    <label class="form__label">
                                        Description
                                    </label>

                                    <textarea class="form__textarea job-poster__open-question-description-input" placeholder="Description"></textarea>

                                </div>

                                <div class="job-poster__open-question-wrapper--french box med-1of2">

                                    <span class="job-poster__open-question-wrapper-label">
                                        French Content
                                    </span>

                                    <label class="form__label">
                                        Question
                                    </label>

                                    <input class="form__input--text job-poster__open-question-input" type="text" placeholder="Question"/>

                                    <label class="form__label">
                                        Description
                                    </label>

                                    <textarea class="form__textarea job-poster__open-question-description-input" placeholder="Description"></textarea>

                                </div>

                            </div>

                            <div class="job-poster__open-question flex-grid repeater__item" data-value="1">

                                <div class="box med-1of2">
                                    <span class="job-poster__open-question-label">New Open Ended Question</span>
                                </div>

                                <div class="box med-1of2">
                                    <button class="job-poster__open-question-remove-button repeater__remove-button" onclick="Utilities.removeRepeatedElement">remove</button>
                                </div>

                                <div class="job-poster__open-question-wrapper--english box med-1of2">

                                    <span class="job-poster__open-question-wrapper-label">
                                        English Content
                                    </span>

                                    <label class="form__label">
                                        Question
                                    </label>

                                    <input class="form__input--text" type="text" placeholder="Question">

                                    <label class="form__label">
                                        Description
                                    </label>

                                    <textarea class="form__textarea" placeholder="Description"></textarea>

                                </div>

                                <div class="job-poster__open-question-wrapper--french box med-1of2">

                                    <span class="job-poster__open-question-wrapper-label">
                                        French Content
                                    </span>

                                    <label class="form__label">
                                        Question
                                    </label>

                                    <input class="form__input--text" type="text" placeholder="Question"/>

                                    <label class="form__label">
                                        Description
                                    </label>

                                    <textarea class="form__textarea" placeholder="Description"></textarea>

                                </div>
                            </div>
                        </div>

                        <button class="job-poster__open-questions-add-button repeater__add-button button--blue" href="javascript:void(0)">Add an Open Ended Question</button>

                    </div>
                </div>

                <div class="createJobPosterSubmitPane flex-grid top manager-edit-profile__button-form">
                    <div class="box full">
                        <input type="button" id="createJobPosterSubmitButton" class="button--yellow" value="Submit" onclick="CreateJobPosterAPI.validateJobPosterForm()">
                    </div>
                </div>

                <div id="createJobPosterOutdatedTab" class="stepGroup hidden">
                    <div class="tabsSteps">
                        <div class="three-step-tab">
                            <button type="button" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_2">Create</button>
                        </div>
                        <div class="three-step-tab tab-current">
                            <button type="button" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_2">Outdated</button>
                        </div>
                        <div class="three-step-tab">
                            <button type="button" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_2">Review</button>
                        </div>
                    </div>


                    <h3>This is for outdated fields</h3>
                </div>

                <div id="createJobPosterReviewTab" class="stepGroup hidden">

                    <div class="tabsSteps">
                        <div class="three-step-tab">
                            <button type="button" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab'); return false;" id="createJobPosterTab1Label_3">Create</button>
                        </div>
                        <div class="three-step-tab">
                            <button type="button" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab'); return false;" id="createJobPosterTab2Label_3">Outdated</button>
                        </div>
                        <div class="three-step-tab tab-current">
                            <button type="button" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab'); return false;" id="createJobPosterTab3Label_3">Review</button>
                        </div>
                    </div>

                    <div class="stepGroupForm">
                        <div class="createJobPosterDemoAreaEnglish" id="createJobPosterDemoAreaEnglish"></div>
                        <div class="createJobPosterDemoAreaFrench" id="createJobPosterDemoAreaFrench"></div>
                    </div>

                </div>

            </form>
        </div>

    </div>
</section>
<?php // END - Create Job Poster Section ?>
