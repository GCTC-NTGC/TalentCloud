<section class="applicant-evidence application-section" data-application-section="essential-criteria">

    <div class="applicant-evidence__container">

        <div class="block-container applicant-evidence__explanation-copy">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat leo nibh, id lacinia lorem rutrum vitae. Aenean sit amet mi pharetra, egestas sapien in, convallis leo. Sed rutrum velit eu ipsum vehicula, laoreet luctus orci ornare. Curabitur sit amet congue velit, a efficitur eros. Aliquam dictum lacus et molestie scelerisque. Sed felis nunc, iaculis ac ex a, laoreet tincidunt ligula. Duis volutpat luctus sapien sit amet aliquam. Donec tincidunt est in massa porta ultricies. Vivamus vitae justo ac magna fermentum bibendum. Quisque tempus tortor tempus nisi vulputate, sit amet aliquet dolor pretium. Integer quis lorem condimentum, tincidunt diam a, iaculis lacus. Cras ut dolor neque. Phasellus et porttitor est.</p>
        </div>

        <div class="flex-grid">

            <!-- DEV-NOTE: This first box is the acting desktop menu. It needs to be populated with button elements. -->
            <div id="applicationEssentialEvidenceMenu" role="tablist" aria-orientation="vertical" class="box lg-1of4 applicant-evidence__desktop-menu">
            </div>

            <div id="applicationEssentialEvidenceFormWrapper" class="box lg-3of4 applicant-evidence__form-wrapper">               
            </div>
        </div>

    </div>

    <div class="application-button__wrapper">
        
        <button class="button--grey" value="View" onclick="EvidenceAPI.saveEvidence('essential', JobApplicationAPI.showPreviousApplicationSection);">
            Save and return
        </button>

        <button class="button--yellow" value="View" onclick="EvidenceAPI.saveEvidence('essential', JobApplicationAPI.showNextApplicationSection);">
            Save and continue
        </button>

    </div>

</section>

<section class="applicant-evidence application-section" data-application-section="asset-criteria">

    <div class="applicant-evidence__container">

        <div class="block-container applicant-evidence__explanation-copy">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat leo nibh, id lacinia lorem rutrum vitae. Aenean sit amet mi pharetra, egestas sapien in, convallis leo. Sed rutrum velit eu ipsum vehicula, laoreet luctus orci ornare. Curabitur sit amet congue velit, a efficitur eros. Aliquam dictum lacus et molestie scelerisque. Sed felis nunc, iaculis ac ex a, laoreet tincidunt ligula. Duis volutpat luctus sapien sit amet aliquam. Donec tincidunt est in massa porta ultricies. Vivamus vitae justo ac magna fermentum bibendum. Quisque tempus tortor tempus nisi vulputate, sit amet aliquet dolor pretium. Integer quis lorem condimentum, tincidunt diam a, iaculis lacus. Cras ut dolor neque. Phasellus et porttitor est.</p>
        </div>

        <div class="flex-grid">

            <!-- DEV-NOTE: This first box is the acting desktop menu. It needs to be populated with button elements. -->
            <div id="applicationAssetEvidenceMenu" role="tablist" aria-orientation="vertical" class="box lg-1of4 applicant-evidence__desktop-menu">
            </div>

            <div id="applicationAssetEvidenceFormWrapper" class="box lg-3of4 applicant-evidence__form-wrapper">               
            </div>
        </div>

    </div>
    
    <div class="application-button__wrapper">
        
        <button class="button--grey" value="View" onclick="EvidenceAPI.saveEvidence('asset', JobApplicationAPI.showPreviousApplicationSection);">
            Save and return
        </button>

        <button class="button--yellow" value="View" onclick="EvidenceAPI.saveEvidence('asset', JobApplicationAPI.showJobApplicationPreview(document.getElementById('createJobApplicationJobPosterId').value));">
            Save and Preview
        </button>

    </div>

</section>

<!-- DEV-NOTE: The "active" class can be applied to the button itself to indicate the currently selected tab. the first tab should always be open on page load by default. The icons grouped within the buttons can also receive an "active" class to indicate their status in the UI. -->
<div class="hidden" id="applicantEvidenceMenuItemTemplate">
    <button role="tab" aria-selected="true" class="applicant-evidence__desktop-menu-item active template" data-evidence-trigger="" data-criteria-type="" data-criteria-id="">
        <span class="applicant-evidence__desktop-item-title"></span>
        <div class="applicant-evidence__desktop-icon-wrapper">
            <!-- <i class="fa fa-clipboard"></i> -->
            <i class="fa fa-check"></i>
            <i class="fa fa-user"></i>
            <i class="fa fa-file"></i>
        </div>
    </button>
</div>

<div class="hidden" id="applicantEvidencePanelTemplate">
    <!-- DEV-NOTE: This is an evidence content accordion. The first accordion should always have "active" classes on the "accordion-wrapper", "accordion-trigger", and "accordion-content" elements. The JS that handles the toggling of these classes is already written for the remaining accordions. I'm using a data attribute to tie the accordion pane to the tab menu above. These will need to be unique to each skill on the page (e.g. skill01, skill02, etc.). We're also going to want to set the "aria-labelledby" value to the ID assigned to the tab item in the menu above. -->

    <div role="tabpanel" class="applicant-evidence__accordion-wrapper active template" data-evidence-target="" aria-labelledby="" data-criteria-type="" data-criteria-id="">

        <!-- DEV-NOTE: Note that these triggers have ARIA-Expanded true/false as necessary. -->
        <div class="applicant-evidence__accordion-trigger active" type="button" tabindex="0" aria-expanded="true">
            <span class="applicant-evidence__accordion-trigger-title">
                <span class="applicant-evidence__accordion-trigger-title-text">Wireframing - Intermediate</span>
                <!-- DEV-NOTE: These icons can receive an "active" class to toggle their state in the UI. This should match the icons in the associated tab menu item. -->
                <div class="applicant-evidence__accordion-trigger-icon-wrapper">
                    <!-- <i class="fa fa-clipboard active"></i> -->
                    <i class="fa fa-check"></i>
                    <i class="fa fa-user"></i>
                    <i class="fa fa-file"></i>
                </div>
            </span>
        </div>

        <div class="applicant-evidence__accordion-content active">

            <div class="applicant-evidence__required-wrapper">

                <p class="applicant-evidence__skill-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper sodales sem, sit amet rutrum arcu facilisis sed. Mauris consectetur id odio a congue. Ut faucibus tincidunt nulla fermentum sagittis. Vivamus posuere odio non sem maximus, in tristique lacus posuere.</p>

                <p class="applicant-evidence__assessment-warning">
                    <i class="fa fa-clipboard"></i>
                    This criteria will be assessed during the interview process.
                </p>

                <hr class="applicant-evidence__content-divider">

                <h5 class="applicant-evidence__section-title">
                    <i class="fa fa-check"></i>
                    My Skill Declaration (Required)
                    <!-- DEV-NOTE: This anchor should link out to a separate help page. -->
                    <a href="" title="Learn more about levels of expertise and where you might fit in." target="_blank">Unsure of your level?</a>
                </h5>

                <form class="form__wrapper flex-grid">

                    <!-- DEV-NOTE: You'll notice I've purposefully omitted including "for" and "id" attributes on form elements. This is because we'll need to add them in dynamically for each skill anyway to ensure no repetition. -->

                    <div class="box full">

                        <label for="" class="form__label">My Level of Expertise:</label>

                        <!-- DEV-NOTE: This is the new structure for what were originally called "sliders". You'll notice that I've included the "for" and "id" attributes here due to the radio inputs not working without them. These will still need to be assigned dynamically. -->

                        <div class="applicant-evidence__expertise-wrapper flex-grid">
                            <!-- Slider should be populated at runtime using item template
                            <label for="skill01expertiseRadio00" class="box small-1of5 form__radio-group-label">
                                <input type="radio" name="expertise" class="form__radio-group-input applicant-evidence__first-target" id="skill01expertiseRadio00"/>
                                <span class="form__radio-group-span">N/A</span>
                            </label>
                            <label for="skill01expertiseRadio01" class="box small-1of5 form__radio-group-label">
                                <input type="radio" name="expertise" class="form__radio-group-input applicant-evidence__first-target" id="skill01expertiseRadio01"/>
                                <span class="form__radio-group-span">Beginner</span>
                            </label>
                            <label for="skill01expertiseRadio02" class="box small-1of5 form__radio-group-label">
                                <input type="radio" name="expertise" class="form__radio-group-input applicant-evidence__first-target" id="skill01expertiseRadio02"/>
                                <span class="form__radio-group-span">Intermediate</span>
                            </label>
                            <label for="skill01expertiseRadio03" class="box small-1of5 form__radio-group-label">
                                <input type="radio" name="expertise" class="form__radio-group-input applicant-evidence__first-target" id="skill01expertiseRadio03"/>
                                <span class="form__radio-group-span">Advanced</span>
                            </label>
                            <label for="skill01expertiseRadio04" class="box small-1of5 form__radio-group-label">
                                <input type="radio" name="expertise" class="form__radio-group-input applicant-evidence__first-target" id="skill01expertiseRadio04"/>
                                <span class="form__radio-group-span">Master</span>
                            </label>
                            -->
                        </div>

                        <!--DEV-NOTE: a template radio button item can be used to populate the expertise "slider" from scratch. The class "small-1ofN" must be added, where N=number of items. "for" and "id" attributes must be set uniquely for each. -->
                        <div class="hidden" id="applicationEvidenceExpertiseItemTemplate">
                            <label for="" class="box form__radio-group-label template">
                                <input type="radio" name="expertise" class="form__radio-group-input applicant-evidence__first-target"/>
                                <span class="form__radio-group-span">N/A</span>
                            </label>
                        </div>
                    </div>

                    <div class="box full">
                        <label for="" class="form__label">My Years of Experience:</label>
                        <div class="applicant-evidence__experience-wrapper flex-grid">
                            <!-- Slider should be populated at runtime using item template
                            <label for="skill01experienceRadio00" class="box small-1of7 form__radio-group-label">
                                <input type="radio" name="experience" class="form__radio-group-input" id="skill01experienceRadio00"/>
                                <span class="form__radio-group-span">0</span>
                            </label>
                            <label for="skill01experienceRadio01" class="box small-1of7 form__radio-group-label">
                                <input type="radio" name="experience" class="form__radio-group-input" id="skill01experienceRadio01"/>
                                <span class="form__radio-group-span">1</span>
                            </label>
                            <label for="skill01experienceRadio02" class="box small-1of7 form__radio-group-label">
                                <input type="radio" name="experience" class="form__radio-group-input" id="skill01experienceRadio02"/>
                                <span class="form__radio-group-span">2</span>
                            </label>
                            <label for="skill01experienceRadio03" class="box small-1of7 form__radio-group-label">
                                <input type="radio" name="experience" class="form__radio-group-input" id="skill01experienceRadio03"/>
                                <span class="form__radio-group-span">3</span>
                            </label>
                            <label for="skill01experienceRadio04" class="box small-1of7 form__radio-group-label">
                                <input type="radio" name="experience" class="form__radio-group-input" id="skill01experienceRadio04"/>
                                <span class="form__radio-group-span">4</span>
                            </label>
                            <label for="skill01experienceRadio05" class="box small-1of7 form__radio-group-label">
                                <input type="radio" name="experience" class="form__radio-group-input" id="skill01experienceRadio05"/>
                                <span class="form__radio-group-span">5</span>
                            </label>
                            <label for="skill01experienceRadio06" class="box small-1of7 form__radio-group-label">
                                <input type="radio" name="experience" class="form__radio-group-input" id="skill01experienceRadio06"/>
                                <span class="form__radio-group-span">6+</span>
                            </label>
                            -->
                        </div>

                        <!--DEV-NOTE: a template radio button item can be used to populate the experience "slider" from scratch. The class "small-1ofN" must be added, where N=number of items. "for" and "id" attributes must be set uniquely for each. -->
                        <div class="hidden" id="applicationEvidenceExperienceItemTemplate">
                            <label for="" class="box small-1of7 form__radio-group-label template">
                                <input type="radio" name="experience" class="form__radio-group-input"/>
                                <span class="form__radio-group-span">0</span>
                            </label>
                        </div>
                    </div>

                    <div class="box full">
                        <label for="" class="form__label">My Experience and Knowledge:</label>
                        <textarea class="form__textarea applicant-evidence__skill-declaration-text applicant-evidence__early-last-target" placeholder="What was your contribution to the project? How big was the project? How does it support your claims?"></textarea>
                    </div>

                </form>

                <!-- DEV-NOTE: The "completion-wrapper" and "optional-wrapper" elements below should only receive an "active" class once the form above has been completed. This should occur after completion of the form and before submission. -->

                <div class="evidence__completion-wrapper">
                    <i class="fa fa-check-circle"></i>
                    <span>Done!</span>
                    <br>
                    <span>This is all you need to apply. You can strengthen your claim by providing more information about your skill below.</span>
                </div>

            </div>

            <div class="applicant-evidence__optional-wrapper">

                <h5 class="applicant-evidence__section-title">
                    <i class="fa fa-user"></i>
                    Micro-reference (Optional)
                    <!-- DEV-NOTE: This anchor should link out to a separate help page. -->
                    <a href="" title="What is a micro-reference?" target="_blank">What is this?</a>
                </h5>

                <p class="applicant-evidence__form-description">Appoint one reference that can vouch for you.</p>

                <form class="form__wrapper flex-grid">

                    <div class="box med-1of2">
                        <label for="applicationEvidenceReferenceName" class="form__label">Reference's Name:</label>
                        <input name="reference_name" type="text" class="form__input--text" id="applicationEvidenceReferenceName"/>
                    </div>

                    <div class="box med-1of2">
                        <label for="applicationEvidenceReferenceEmail" class="form__label">Reference's Email:</label>
                        <input name="reference_email" type="email" class="form__input--email" id="applicationEvidenceReferenceEmail" />
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceReferenceStory" class="form__label">Your Relationship to this Reference:</label>
                        <div class="form__select-wrapper">
                            <select name="reference_relationship" class="form__select" id="applicationEvidenceReferenceRelationship">
                                <option>Option 01</option>
                            </select>
                        </div>
                    </div>

                    <div class="box med-1of2">
                        <label for="applicationEvidenceReferenceFrom" class="form__label">Observed From:</label>
                        <input type="date" name="reference_from_date" class="form__input--date" id="applicationEvidenceReferenceFrom"/>
                    </div>

                    <div class="box med-1of2">
                        <label for="applicationEvidenceReferenceUntil" class="form__label">Observed To:</label>
                        <input type="date" name="reference_until_date" class="form__input--date" id="applicationEvidenceReferenceUntil" />
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceReferenceExpLevel" class="form__label">Your Experience Level at the Time:</label>
                        <div class="form__select-wrapper">
                            <select name="reference_exp_level" class="form__select" id="applicationEvidenceReferenceExpLevel">
                                <option>Option 01</option>
                            </select>
                        </div>
                    </div>

                    <div class="box full">
                        <label for="applicationEvidenceReferenceStory" class="form__label">Tell Us What You Did:</label>
                        <textarea name="reference_story" class="form__textarea" id="applicationEvidenceReferenceStory" placeholder="Provide a sentence or two about the role you played and what you're asking this micro-reference to validate."></textarea>
                    </div>

                </form>

                <hr class="applicant-evidence__content-divider">

                <h5 class="applicant-evidence__section-title">
                    <i class="fa fa-file"></i>
                    Sample of my Skill (Optional)
                    <!-- DEV-NOTE: This anchor should link out to a separate help page. -->
                    <a href="" title="How will this improve my application?" target="_blank">How will this improve my application?</a>
                </h5>

                <p class="applicant-evidence__form-description">Attach an example of your work that you're proud of.</p>

                <form class="form__wrapper flex-grid">

                    <div class="box med-1of2">
                        <label for="" class="form__label">Project/Document Name:</label>
                        <input type="text" class="form__input--text" />
                    </div>

                    <div class="box med-1of2">
                        <label for="" class="form__label">Type of File:</label>
                        <div class="form__select-wrapper">
                            <select class="form__select">
                                <option>Option 01</option>
                            </select>
                        </div>
                    </div>

                    <div class="box full">
                        <label for="" class="form__label">Date Created:</label>
                        <input type="date" class="form__input--date" />
                    </div>

                    <div class="box full">
                        <label for="" class="form__label">Link to Evidence:</label>
                        <input type="url" class="form__input--url" />
                    </div>

                    <div class="box full">
                        <label for="" class="form__label">Story:</label>
                        <textarea class="form__textarea applicant-evidence__last-target" placeholder="Tell us about this piece of evidence and your role in creating it."></textarea>
                    </div>

                </form>

            </div>

        </div>

    </div>
</div>