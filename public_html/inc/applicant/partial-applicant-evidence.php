<section class="applicant-evidence application-section" data-application-section="essential-criteria">

    <div class="applicant-evidence__container">

        <div class="content-container applicant-evidence__explanation-copy">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat leo nibh, id lacinia lorem rutrum vitae. Aenean sit amet mi pharetra, egestas sapien in, convallis leo. Sed rutrum velit eu ipsum vehicula, laoreet luctus orci ornare. Curabitur sit amet congue velit, a efficitur eros. Aliquam dictum lacus et molestie scelerisque. Sed felis nunc, iaculis ac ex a, laoreet tincidunt ligula. Duis volutpat luctus sapien sit amet aliquam. Donec tincidunt est in massa porta ultricies. Vivamus vitae justo ac magna fermentum bibendum. Quisque tempus tortor tempus nisi vulputate, sit amet aliquet dolor pretium. Integer quis lorem condimentum, tincidunt diam a, iaculis lacus. Cras ut dolor neque. Phasellus et porttitor est.</p>
        </div>

        <div class="flex-grid">

            <?php // DEV-NOTE: This first box is the acting desktop menu. It needs to be populated with button elements. ?>
            <div id="applicationEssentialEvidenceMenu" role="tablist" aria-orientation="vertical" class="box lg-1of4 applicant-evidence__desktop-menu">
            </div>

            <div id="applicationEssentialEvidenceFormWrapper" class="box lg-3of4 applicant-evidence__form-wrapper">
            </div>
        </div>

    </div>

    <div class="application-button__wrapper">

        <button class="button--blue applicant-evidence__save-and-return" value="View" onclick="EvidenceAPI.saveEvidence('essential', function(){JobApplicationAPI.showPreviousApplicationSection(document.getElementById('jobApplicationJobPosterId').value);})">
            Save and return
        </button>

        <button class="button--yellow applicant-evidence__save-and-continue" value="View" onclick="EvidenceAPI.saveEvidence('essential', function(){JobApplicationAPI.showNextApplicationSection(document.getElementById('jobApplicationJobPosterId').value);})">
            Save and continue
        </button>

    </div>

</section>

<section class="applicant-evidence application-section" data-application-section="asset-criteria">

    <div class="applicant-evidence__container">

        <div class="content-container applicant-evidence__explanation-copy">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat leo nibh, id lacinia lorem rutrum vitae. Aenean sit amet mi pharetra, egestas sapien in, convallis leo. Sed rutrum velit eu ipsum vehicula, laoreet luctus orci ornare. Curabitur sit amet congue velit, a efficitur eros. Aliquam dictum lacus et molestie scelerisque. Sed felis nunc, iaculis ac ex a, laoreet tincidunt ligula. Duis volutpat luctus sapien sit amet aliquam. Donec tincidunt est in massa porta ultricies. Vivamus vitae justo ac magna fermentum bibendum. Quisque tempus tortor tempus nisi vulputate, sit amet aliquet dolor pretium. Integer quis lorem condimentum, tincidunt diam a, iaculis lacus. Cras ut dolor neque. Phasellus et porttitor est.</p>
        </div>

        <div class="flex-grid">

            <?php // DEV-NOTE: This first box is the acting desktop menu. It needs to be populated with button elements. ?>
            <div id="applicationAssetEvidenceMenu" role="tablist" aria-orientation="vertical" class="box lg-1of4 applicant-evidence__desktop-menu">
            </div>

            <div id="applicationAssetEvidenceFormWrapper" class="box lg-3of4 applicant-evidence__form-wrapper">
            </div>
        </div>

    </div>

    <div class="application-button__wrapper">

        <button class="button--blue applicant-evidence__save-and-return" value="View" onclick="EvidenceAPI.saveEvidence('asset', function(){JobApplicationAPI.showPreviousApplicationSection(document.getElementById('jobApplicationJobPosterId').value);})">
            Save and return
        </button>

        <button class="button--yellow applicant-evidence__save-and-preview" value="View" onclick="EvidenceAPI.saveEvidence('asset', function(){JobApplicationPreviewAPI.showJobApplicationPreviewById(document.getElementById('jobApplicationJobApplicationId').value);})">
            Save and Preview
        </button>

    </div>

</section>

<?php // DEV-NOTE: The "active" class can be applied to the button itself to indicate the currently selected tab. the first tab should always be open on page load by default. The icons grouped within the buttons can also receive an "active" class to indicate their status in the UI. ?>
<div class="hidden" id="applicantEvidenceMenuItemTemplate">
    <button role="tab" aria-selected="true" class="applicant-evidence__desktop-menu-item active template" data-evidence-trigger="" data-criteria-type="" data-criteria-id="">
        <span class="applicant-evidence__desktop-item-title">Menu item title</span>
        <div class="applicant-evidence__desktop-icon-wrapper">
            <!-- <i class="fa fa-clipboard"></i> -->
            <i class="fa fa-check"></i>
            <i class="fa fa-user"></i>
            <i class="fa fa-file"></i>
        </div>
    </button>
</div>

<div class="hidden" id="applicantEvidencePanelTemplate">
    <?php // DEV-NOTE: This is an evidence content accordion. The first accordion should always have "active" classes on the "accordion-wrapper", "accordion-trigger", and "accordion-content" elements. The JS that handles the toggling of these classes is already written for the remaining accordions. I'm using a data attribute to tie the accordion pane to the tab menu above. These will need to be unique to each skill on the page (e.g. skill01, skill02, etc.). We're also going to want to set the "aria-labelledby" value to the ID assigned to the tab item in the menu above. ?>

    <div role="tabpanel" class="applicant-evidence__accordion-wrapper active template" data-evidence-target="" aria-labelledby="applicantEvidenceAccordionText" data-criteria-type="" data-criteria-id="">

        <?php // DEV-NOTE: Note that these triggers have ARIA-Expanded true/false as necessary. ?>
        <div class="applicant-evidence__accordion-trigger active" type="button" tabindex="0" aria-expanded="true">
            <span class="applicant-evidence__accordion-trigger-title">
                <h4 class="applicant-evidence__accordion-trigger-title-text">Evidence of your HTML skills</h4>
                <?php // DEV-NOTE: These icons can receive an "active" class to toggle their state in the UI. This should match the icons in the associated tab menu item. ?>
                <div class="applicant-evidence__accordion-trigger-icon-wrapper">
                    <?php // <i class="fa fa-clipboard active"></i> ?>
                    <i class="fa fa-check"></i>
                    <i class="fa fa-user"></i>
                    <i class="fa fa-file"></i>
                </div>
            </span>
        </div>

        <div class="applicant-evidence__accordion-content active">

            <div class="applicant-evidence__required-wrapper">

                <?php /* <p class="applicant-evidence__skill-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper sodales sem, sit amet rutrum arcu facilisis sed. Mauris consectetur id odio a congue. Ut faucibus tincidunt nulla fermentum sagittis. Vivamus posuere odio non sem maximus, in tristique lacus posuere.</p> */ ?>

                <?php /* <p class="applicant-evidence__assessment-warning">
                <i class="fa fa-clipboard"></i>
                This criteria will be assessed during the interview process.
                </p> */ ?>

                <?php /* <hr class="applicant-evidence__content-divider"> */ ?>

                <h5 class="applicant-evidence__section-title applicant-evidence__skill-declaration-title">
                    <i class="fa fa-check"></i>
                    My Skill Declaration (Required)
                    <?php // DEV-NOTE: This anchor should link out to a separate help page. ?>
                    <a href="/#FAQ/credentialingSkillLevel" title="Learn more about levels of expertise and where you might fit in." target="_blank">Unsure of your level?</a>
                </h5>

                <form class="form__wrapper flex-grid">

                    <?php // DEV-NOTE: You'll notice I've purposefully omitted including "for" and "id" attributes on form elements. This is because we'll need to add them in dynamically for each skill anyway to ensure no repetition. ?>

                    <div class="applicant-evidence__expertise-radiogroup box full" role="radiogroup" aria-labelledby="applicationEvidenceExpertiseItemLabel" aria-orientation="horizontal">

                        <label id="applicationEvidenceExpertiseItemLabel" for="" class="applicant-evidence__expertise-radiogroup-title form__label">My Level of Expertise:</label>

                        <?php // DEV-NOTE: This is the new structure for what were originally called "sliders". You'll notice that I've included the "for" and "id" attributes here due to the radio inputs not working without them. These will still need to be assigned dynamically. ?>
                        <div class="applicant-evidence__expertise-wrapper flex-grid">
                            <?php // Slider should be populated at runtime using item template ?>
                        </div>

                        <?php // DEV-NOTE: a template radio button item can be used to populate the expertise "slider" from scratch. The class "small-1ofN" must be added, where N=number of items. "for" and "id" attributes must be set uniquely for each. ?>
                        <div class="hidden" id="applicationEvidenceExpertiseItemTemplate">
                            <label for="" class="box form__radio-group-label template">
                                <span class="hidden">Expertise level option: </span>
                                <input type="radio" name="expertise" class="form__radio-group-input applicant-evidence__first-target"/>
                                <span class="form__radio-group-span"></span>
                            </label>
                        </div>
                    </div>

                    <div class="applicant-evidence__experience-radiogroup box full" role="radiogroup" aria-labelledby="applicationEvidenceExperienceItemLabel" aria-orientation="horizontal">

                        <label id="applicationEvidenceExperienceItemLabel" for="" class="applicant-evidence__experience-radiogroup-title form__label">My Years of Experience:</label>

                        <div class="applicant-evidence__experience-wrapper flex-grid">

                        </div>

                        <?php // DEV-NOTE: a template radio button item can be used to populate the experience "slider" from scratch. The class "small-1ofN" must be added, where N=number of items. "for" and "id" attributes must be set uniquely for each. ?>
                        <div class="hidden" id="applicationEvidenceExperienceItemTemplate">
                            <label for="" class="box small-1of5 form__radio-group-label template">
                                <span class="hidden">Expertise year option: </span>
                                <input type="radio" name="experience" class="form__radio-group-input"/>
                                <span class="form__radio-group-span"></span>
                            </label>
                        </div>
                    </div>

                    <div class="box full">
                        <label for="" class="applicant-evidence__experience-and-knowledge__form-title form__label">
                            My Experience and Knowledge:
                        </label>
                        <textarea class="form__textarea applicant-evidence__skill-declaration-text applicant-evidence__early-last-target" placeholder="What was your contribution to the project? How big was the project? How does it support your claims?"></textarea>      
                    </div>

                </form>

                <?php // DEV-NOTE: The "completion-wrapper" and "optional-wrapper" elements below should only receive an "active" class once the form above has been completed. This should occur after completion of the form and before submission. ?>

                <div class="evidence__completion-wrapper">
                    <i class="fa fa-check-circle"></i>
                    <span class="applicant-evidence-done">Done!</span>
                    <br>
                    <span class="applicant-evidence__completion-message">This is all you need to apply. You can strengthen your claim by providing more information about your skill below.</span>
                </div>

            </div>

            <div class="applicant-evidence__optional-wrapper active">

                <h5 class="applicant-evidence__section-title applicant-evidence__micro-reference-title">
                    <i class="fa fa-user"></i>
                    Micro-reference (Optional)
                    <?php // DEV-NOTE: This anchor should link out to a separate help page. ?>
                    <a href="/#FAQ/credentialingReferences" title="What is a micro-reference?" class="applicant-evidence__faq" target="_blank">How will this strengthen my application?</a>
                </h5>

                <p class="applicant-evidence__form-description applicant-evidence__appoint-reference-label">Appoint one reference that can vouch for you.</p>

                <form class="form__wrapper flex-grid">

                    <div class="box med-1of2">
                        <label for="applicationEvidenceReferenceName" class="applicant-evidence__reference-name form__label">
                            Reference's Name:
                        </label>
                        <input name="reference_name" type="text" class="form__input--text" id="applicationEvidenceReferenceName"/>
                    </div>

                    <div class="box med-1of2">
                        <label for="applicationEvidenceReferenceEmail" class="applicant-evidence__reference-email form__label">
                            Reference's Email:
                        </label>
                        <input name="reference_email" type="email" class="form__input--email" id="applicationEvidenceReferenceEmail" />
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceReferenceRelationship" class="applicant-evidence__reference-relationship form__label">
                            Your Relationship to this Reference:
                        </label>
                        <div class="form__select-wrapper">
                            <select name="reference_relationship" class="form__select" id="applicationEvidenceReferenceRelationship">
                                <option>Option 01</option>
                            </select>
                        </div>
                    </div>

                    <div class="box med-1of2">
                        <label for="applicationEvidenceReferenceFrom" class="form__label applicant-evidence__observed-from">
                            Observed From:
                        </label>
                        <input type="date" name="reference_from_date" class="form__input--date" id="applicationEvidenceReferenceFrom"/>
                    </div>

                    <div class="box med-1of2">
                        <label for="applicationEvidenceReferenceUntil" class="form__label applicant-evidence__observed-to">
                            Observed To:
                        </label>
                        <input type="date" name="reference_until_date" class="form__input--date" id="applicationEvidenceReferenceUntil" />
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceReferenceExpLevel" class="form__label applicant-evidence__your-experience-at-the-time">
                            Your Experience Level at the Time:
                        </label>
                        <div class="form__select-wrapper">
                            <select name="reference_exp_level" class="form__select" id="applicationEvidenceReferenceExpLevel">
                            </select>
                        </div>
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceReferenceStory" class="form__label applicant-evidence__tell-us-what-you-did">
                            Tell Us What You Did:
                        </label>
                        <textarea name="reference_story" class="form__textarea applicant-evidence__reference-story" id="applicationEvidenceReferenceStory" placeholder="Provide a sentence or two about the role you played and what you're asking this micro-reference to validate."></textarea>
                    </div>

                </form>

                <hr class="applicant-evidence__content-divider">

                <h5 class="applicant-evidence__section-title applicant-evidence__sample-of-my-skill">
                    <i class="fa fa-file"></i>
                    Sample of my Skill (Optional)
                    <?php // DEV-NOTE: This anchor should link out to a separate help page. ?>
                    <a href="/#FAQ/credentialingEvidence" title="How will this improve my application?" target="_blank">How will this strengthen my application?</a>
                </h5>

                <p class="applicant-evidence__form-description applicant-evidence__attach-work-sample">Attach an example of your work that you're proud of.</p>

                <form class="form__wrapper flex-grid">

                    <div class="box med-1of2">
                        <label for="applicationEvidenceSampleName" class="form__label applicant-evidence__project-document-name">
                            Project/Document Name:
                        </label>
                        <input id="applicationEvidenceSampleName" name="sample_name" type="text" class="form__input--text" />
                    </div>

                    <div class="box med-1of2">
                        <label for="applicationEvidenceSampleType" class="form__label applicant-evidence__type-of-file">
                            Type of File:
                        </label>
                        <div class="form__select-wrapper">
                            <select id="applicationEvidenceSampleType" name="sample_type" class="form__select">
                            </select>
                        </div>
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceSampleDateCreated" class="form__label applicant-evidence__date-created">
                            Date Created:
                        </label>
                        <input id="applicationEvidenceSampleDateCreated" name="sample_date_created" type="date" class="form__input--date" />
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceSampleHttpLink" class="form__label applicant-evidence__link-to-evidence">
                            Link to Evidence:
                        </label>
                        <input id="applicationEvidenceSampleHttpLink" name="sample_http_link" type="url" class="form__input--url" />
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceSampleStory" class="form__label applicant-evidence__story">
                            Story:
                        </label>
                        <textarea id="applicationEvidenceSampleStory" name="sample_story" class="form__textarea applicant-evidence__last-target applicant-evidence__tell-us-about-evidence" placeholder="Tell us about this piece of evidence and your role in creating it."></textarea>
                    </div>

                </form>

            </div>

        </div>

    </div>
</div>
