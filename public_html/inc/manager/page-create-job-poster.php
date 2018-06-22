<?php // BEGIN - Create Job Poster Section ?>
<section class="hidden" id="createJobPosterSection">
    <div class="block-container">

        <form class="form__wrapper" name="createJobPosterForm" id="createJobPosterForm" method="post" enctype="application/x-www-form-urlencoded">

            <div id="createJobPosterCreateTab" class="stepGroup">

                <div class="tabsSteps">
                    <div class="three-step-tab tab-current">
                        <?php // Using buttons for page controls (links with no HTTP ref) ?>
                        <button type="button" class="steppedFormLinkActive" onclick="CreateJobPosterAPI.goToTab('createJobPosterCreateTab')" id="createJobPosterTab1Label_1">Create</button>
                    </div>
                    <div class="three-step-tab">
                        <button type="button" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterOutdatedTab')" id="createJobPosterTab2Label_1">Outdated</button>
                    </div>
                    <div class="three-step-tab">
                        <button type="button" class="steppedFormLink" onclick="CreateJobPosterAPI.goToTab('createJobPosterReviewTab')" id="createJobPosterTab3Label_1">Review</button>
                    </div>
                </div>

                <h3 class="manager-poster__title heading--03">Job Poster Details</h3>

                <div class="form__required-copy-wrapper">
                    All fields required unless indicated as optional
                </div>

                <?php // Grouping form inputs with fieldset and legend ?>
                <div class="form__input-wrapper">
                    <fieldset id="createJobPosterJobTitleSection">
                        <legend class="form__legend">Job Title</legend>
                        <?php // Add aria-required="true" and required attributes ?>
                        <div class="flex-grid middle">
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_jobTitle">English</label>
                                    <input class="form__input" type="text" name="createJobPoster_jobTitle" id="createJobPoster_jobTitle" required aria-required="true"/>
                                </div>
                            </div>
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_jobTitle_fr">Français</label>
                                    <input class="form__input" type="text" name="createJobPoster_jobTitle_fr" id="createJobPoster_jobTitle_fr" required aria-required="true"/>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <?php /*

                <div class="box full">
                <label class="form__label" for="createJobPoster_noc">
                <span id="createJobPoster_noc_labelName"><span>NOC</span>: *</span>
                <div id="createJobPoster_noc_error" class="error hidden">
                <span id="createJobPoster_noc_error_msg" class="label label-danger"></span>
                </div>
                </label>
                <input class="form__input" type="text" name="createJobPoster_noc" id="createJobPoster_noc"/>
                </div>
                */ ?>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend class="form__legend">Salary</legend>
                        <div class="flex-grid middle">
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_remunerationLowRange">Minimum</label>
                                    <input class="form__input" type="number" name="createJobPoster_remunerationLowRange" id="createJobPoster_remunerationLowRange" required aria-required="true"/>
                                </div>
                            </div>
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_remunerationHighRange">Maximum</label>
                                    <input class="form__input" type="number" name="createJobPoster_remunerationHighRange" id="createJobPoster_remunerationHighRange" required aria-required="true"/>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset" id="createJobPosterDetailsSection">
                        <legend class="form__legend">Classifications</legend>
                        <div class="flex-grid">
                            <div class="box med-1of3">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_classification">Occupational group (AS-01)</label>
                                    <?php // Testing HTML5 form validation ?>
                                    <input
                                    id="createJobPoster_classification"
                                    name="createJobPoster_classification"
                                    class="form__input"
                                    type="text"
                                    maxlength="5"
                                    required
                                    aria-required="true"
                                    pattern="[A-Z]{2}[-?][0-9]{2}"
                                    title="Occupational group must contain two characters followed by a hyphen, then two numbers"
                                    oninput="this.value = this.value.toUpperCase()"
                                    />
                                </div>
                            </div>

                            <div class="box med-1of3">
                                <div class="form__input-wrapper--select">
                                    <label class="form__label" for="createJobPoster_clearance">Security clearance level</label>
                                    <div class="form__select-wrapper">
                                        <select class="form__input" name="createJobPoster_clearance" id="createJobPoster_clearance" required aria-required="true">
                                            <option value="">--</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="box med-1of3">
                                <div class="form__input-wrapper--select">
                                    <label class="form__label" for="createJobPoster_language">Language requirements</label>
                                    <div class="form__select-wrapper">
                                        <select class="form__input" name="createJobPoster_language" id="createJobPoster_language" required aria-required="true">
                                            <option value="">--</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend class="form__legend">Location</legend>

                        <div class="flex-grid middle">
                            <div class="box med-1of3">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_city">City</label>
                                    <input class="form__input" type="text" name="createJobPoster_city" id="createJobPoster_city" required aria-required="true"/>
                                </div>
                            </div>

                            <div class="box med-1of3">
                                <div class="form__input-wrapper--select">
                                    <label class="form__label" for="createJobPoster_department">Department</label>
                                    <div class="form__select-wrapper">
                                        <select class="form__input" name="createJobPoster_department" id="createJobPoster_department" required aria-required="true">
                                            <option value="">--</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="box med-1of3">
                                <div class="form__input-wrapper--select">
                                    <label class="form__label" for="createJobPoster_province">Province</label>
                                    <div class="form__select-wrapper">
                                        <select class="form__input" name="createJobPoster_province" id="createJobPoster_province" required aria-required="true">
                                            <option value="">--</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend class="form__legend">Timetable</legend>

                        <div class="flex-grid">
                            <div class="box med-1of4">
                                <div class="form__input-wrapper--date">
                                    <label class="form__label" for="createJobPoster_openDate">Open date</label>
                                    <input class="form__input" type="date" name="createJobPoster_openDate" id="createJobPoster_openDate" required aria-required="true"/>
                                </div>
                            </div>

                            <div class="box med-1of4">
                                <div class="form__input-wrapper--date">
                                    <label class="form__label" for="createJobPoster_closeDate">Close date</label>
                                    <input class="form__input" type="date" name="createJobPoster_closeDate" id="createJobPoster_closeDate" required aria-required="true"/>
                                </div>
                            </div>

                            <div class="box med-1of4">
                                <div class="form__input-wrapper--date">
                                    <label class="form__label" for="createJobPoster_startDate">Start Date</label>
                                    <input class="form__input" type="date" name="createJobPoster_startDate" id="createJobPoster_startDate" required aria-required="true"/>
                                </div>
                            </div>

                            <div class="box med-1of4">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_termQuantity">Duration (in months)</label>
                                    <?php // Testing HTML5 error handling ?>
                                    <input
                                    id="createJobPoster_termQuantity"
                                    name="createJobPoster_termQuantity"
                                    class="form__input"
                                    type="number"
                                    required
                                    aria-required="true"
                                    maxlength="2"
                                    pattern="[0-9]{1,2}"
                                    title="Duration must contain one or two numbers"
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend  class="form__legend" id="createJobPoster_branch_labelName">Branch</legend>

                        <div class="flex-grid middle">
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_branch">English</label>
                                    <input type="text" class="form__input" name="createJobPoster_branch" id="createJobPoster_branch" required aria-required="true"/>
                                </div>
                            </div>
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_branch_fr">Français</label>
                                    <input type="text" class="form__input" name="createJobPoster_branch_fr" id="createJobPoster_branch_fr" required aria-required="true"/>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend class="form__legend">Division</legend>

                        <div class="flex-grid middle">
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_division">English</label>
                                    <input type="text" class="form__input" name="createJobPoster_division" id="createJobPoster_division" required aria-required="true"/>
                                </div>
                            </div>
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_division_fr">Français</label>
                                    <input type="text" class="form__input" name="createJobPoster_division_fr" id="createJobPoster_division_fr" required aria-required="true"/>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend class="form__legend">Impact (optional)</legend>

                        <div class="flex-grid middle">
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_impact">English</label>
                                    <textarea class="form__textarea" name="createJobPoster_impact" id="createJobPoster_impact" rows="2"></textarea>
                                </div>
                            </div>
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_impact_fr">Français</label>
                                    <textarea class="form__textarea" name="createJobPoster_impact_fr" id="createJobPoster_impact_fr" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend class="form__legend">Key Tasks</legend>

                        <div class="flex-grid middle">
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_impact">English</label>
                                    <textarea class="form__textarea" name="createJobPoster_keyTasks" id="createJobPoster_impact" rows="2" aria-required="true" required></textarea>
                                </div>
                            </div>
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_impact_fr">Français</label>
                                    <textarea class="form__textarea" name="createJobPoster_keyTasks_fr" id="createJobPoster_impact_fr" rows="2" aria-required="true" required></textarea>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend class="form__legend">Essential Skills</legend>

                        <div class="flex-grid middle">
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_keyTasks">English</label>
                                    <textarea class="form__textarea" name="createJobPoster_coreCompetencies" id="createJobPoster_impact" rows="2" aria-required="true" required></textarea>
                                </div>
                            </div>
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_impact_fr">Français</label>
                                    <textarea class="form__textarea" name="createJobPoster_coreCompetencies_fr" id="createJobPoster_impact_fr" rows="2" aria-required="true" required></textarea>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div class="form__input-wrapper">
                    <fieldset class="form__fieldset">
                        <legend class="form__legend">Asset Skills</legend>

                        <div class="flex-grid middle">
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_impact">English</label>
                                    <textarea class="form__textarea" name="createJobPoster_developingCompetencies" id="createJobPoster_impact" rows="2" aria-required="true" required></textarea>
                                </div>
                            </div>
                            <div class="box med-1of2">
                                <div class="form__input-wrapper--float">
                                    <label class="form__label" for="createJobPoster_impact_fr">Français</label>
                                    <textarea class="form__textarea" name="createJobPoster_developingCompetencies_fr" id="createJobPoster_impact_fr" rows="2" aria-required="true" required></textarea>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <?php /* New Open Ended Questions */ ?>

                <div class="job-poster__open-questions box full">
                    <div class="job-poster__open-questions-wrapper repeater__wrapper flex-grid middle">

                        <h3 class="job-poster__open-question-section-label heading--03 box full">Questions for the Applicant</h3>

                        <div class="job-poster__open-question flex-grid repeater__template">

                            <div class="box med-1of2">
                                <span class="job-poster__open-question-label">Question ##</span>
                            </div>

                            <div class="box med-1of2">
                                <button class="job-poster__open-question-remove-button repeater__remove-button" onclick="Utilities.removeRepeatedElement">Remove this question</button>
                            </div>

                            <div class="job-poster__open-question-wrapper--english box med-1of2">
                                <div class="form__input-wrapper">
                                    <fieldset class="form__fieldset">
                                        <legend class="form__legend">English</legend>

                                        <div class="form__input-wrapper--float">
                                            <label class="form__label">Question</label>
                                            <input class="form__input job-poster__open-question-input" type="text" />
                                        </div>

                                        <div class="form__input-wrapper--float">
                                            <label class="form__label">Description</label>
                                            <textarea class="form__textarea job-poster__open-question-description-input"></textarea>
                                        </div>

                                    </fieldset>
                                </div>
                            </div>

                            <div class="job-poster__open-question-wrapper--french box med-1of2">
                                <div class="form__input-wrapper">
                                    <fieldset class="form__fieldset">
                                        <legend class="form__legend">Français</legend>

                                        <div class="form__input-wrapper--float">
                                            <label class="form__label">Question</label>
                                            <input class="form__input job-poster__open-question-input" type="text"/>
                                        </div>

                                        <div class="form__input-wrapper--float">
                                            <label class="form__label">Description</label>
                                            <textarea class="form__textarea job-poster__open-question-description-input"></textarea>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>

                        <div class="job-poster__open-question flex-grid repeater__item" data-value="1">

                            <div class="box full">
                                <span class="job-poster__open-question-label">Question #1</span>
                            </div>

                            <!-- Suggest removing for first element
                            <div class="box med-1of2">
                                <button class="job-poster__open-question-remove-button repeater__remove-button" onclick="Utilities.removeRepeatedElement">Remove this question</button>
                            </div> -->

                            <div class="job-poster__open-question-wrapper--english box med-1of2">

                                <div class="form__input-wrapper">
                                    <fieldset class="form__fieldset">
                                        <legend class="form__legend">English</legend>

                                        <div class="form__input-wrapper--float">
                                            <label class="form__label">Question</label>
                                            <input class="form__input job-poster__open-question-input" type="text" aria-required="true" required/>
                                        </div>

                                        <div class="form__input-wrapper--float">
                                            <label class="form__label">Description</label>
                                            <textarea class="form__textarea job-poster__open-question-description-input" aria-required="true" required></textarea>
                                        </div>

                                    </fieldset>
                                </div>

                            </div>

                            <div class="job-poster__open-question-wrapper--french box med-1of2">

                                <div class="form__input-wrapper">
                                    <fieldset class="form__fieldset">
                                        <legend class="form__legend">Français</legend>

                                        <div class="form__input-wrapper--float">
                                            <label class="form__label">Question</label>
                                            <input class="form__input job-poster__open-question-input" type="text" aria-required="true" required/>
                                        </div>

                                        <div class="form__input-wrapper--float">
                                            <label class="form__label">Description</label>
                                            <textarea class="form__textarea job-poster__open-question-description-input" aria-required="true" required></textarea>
                                        </div>

                                    </fieldset>
                                </div>

                            </div>
                        </div>
                    </div>

                    <button class="job-poster__open-questions-add-button repeater__add-button button--blue" href="javascript:void(0)">Add an Open Ended Question</button>

                    <div class="createJobPosterSubmitPane flex-grid top manager-edit-profile__button-form">
                        <div class="box full">
                            <input type="button" id="createJobPosterSubmitButton" class="button--yellow" value="Submit" onclick="CreateJobPosterAPI.validateJobPosterForm()">
                        </div>
                    </div>

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
</section>
<?php // END - Create Job Poster Section ?>
