<?php /* Need to Have Markup ============================================= */ ?>

    <section class="applicant-evidence application-section" data-application-section="essential-criteria">

        <div class="block-container">

            <div class="content-container applicant-evidence__explanation-copy">

                <p>This text is intended to explain the difference between essential and asset criteria while providing context for micro-references and work samples.</p>

                <div>
                    <button class="button--blue" title="Scroll to the skills list." onclick="EvidenceAPI.scrollToSkills(event, this)">Get Started</button>
                </div>

            </div>

            <hr class="applicant-evidence__anchor">

            <div class="flex-grid">

                <?php /* Floating Sidebar Menu */ ?>

                <div class="box lg-1of4">

                    <div class="applicant-evidence__desktop-menu" id="applicationEssentialEvidenceMenu" aria-orientation="vertical">

                        <span class="applicant-evidence__desktop-menu-label">Skills You Need to Have</span>

                        <?php /* Populated by JavaScript */ ?>

                    </div>

                </div>

                <?php /* Skills List */ ?>

                <div id="applicationEssentialEvidenceFormWrapper" class="box lg-3of4 applicant-evidence__form-wrapper">

                    <?php /* Populated by JavaScript */ ?>

                </div>

            </div>

            <hr>

        </div>

        <div class="application-button__wrapper">

            <button class="button--blue applicant-evidence__save-and-return" value="View" onclick="EvidenceAPI.saveEvidence('essential', function(){JobApplicationAPI.showPreviousApplicationSection(document.getElementById('jobApplicationJobPosterId').value);})">
                Save &amp; Return
            </button>

            <button class="button--yellow applicant-evidence__save-and-continue applicant-evidence__save-and-continue--essential" value="View" onclick="EvidenceAPI.saveEvidence('essential', function(){JobApplicationAPI.showNextApplicationSection(document.getElementById('jobApplicationJobPosterId').value);})">
                Complete All Required Sections
            </button>

        </div>

    </section>

<?php /* Nice to Have Markup ============================================= */ ?>

    <section class="applicant-evidence application-section" data-application-section="asset-criteria">

        <div class="applicant-evidence__container">

            <div class="content-container applicant-evidence__explanation-copy">

                <p>This text is intended to explain the difference between essential and asset criteria while providing context for micro-references and work samples.</p>

                <div>
                    <button class="button--blue" title="Scroll to the skills list." onclick="EvidenceAPI.scrollToSkills(this)">Get Started</button>
                </div>

            </div>

            <hr class="applicant-evidence__anchor">

            <div class="flex-grid">

                <div id="applicationAssetEvidenceMenu" role="tablist" aria-orientation="vertical" class="box lg-1of4 applicant-evidence__desktop-menu">

                    <span class="applicant-evidence__desktop-menu-label">Skills That Are Nice to Have</span>

                    <?php /* Populated by JavaScript */ ?>

                </div>

                <div id="applicationAssetEvidenceFormWrapper" class="box lg-3of4 applicant-evidence__form-wrapper">
                </div>

            </div>

            <hr>

        </div>

        <div class="application-button__wrapper">

            <button class="button--blue applicant-evidence__save-and-return" value="View" onclick="EvidenceAPI.saveEvidence('asset', function(){JobApplicationAPI.showPreviousApplicationSection(document.getElementById('jobApplicationJobPosterId').value);})">
                Save &amp; Return
            </button>

            <button class="button--yellow applicant-evidence__save-and-preview" value="View" onclick="EvidenceAPI.saveEvidence('asset', function(){JobApplicationPreviewAPI.showJobApplicationPreviewById(document.getElementById('jobApplicationJobApplicationId').value);})">
                Save and Preview
            </button>

        </div>

    </section>

<?php /* Evidence Templates ============================================== */ ?>

    <?php /* Evidence Sidebar Menu Templates */ ?>

        <?php // DEV-NOTE: The "active" class can be applied to the button itself to indicate the currently selected tab. the first tab should always be open on page load by default. The icons grouped within the buttons can also receive an "active" class to indicate their status in the UI. ?>

        <div class="hidden" id="applicantEvidenceMenuItemTemplate">

            <button class="applicant-evidence__desktop-menu-item template" data-evidence-trigger="" data-criteria-type="" data-criteria-id="">

                <i class="fa fa-times"></i>

                <i class="fa fa-check"></i>

                <span class="applicant-evidence__desktop-item-title">Menu Item Title</span>

            </button>

        </div>

    <?php /* Evidence Skill Templates */ ?>

        <div class="hidden" id="applicantEvidencePanelTemplate">

            <div class="applicant-evidence__skill template" data-criteria-type="" data-criteria-id="">

                <?php /* Skill Anchor */ ?>

                    <a id="" aria-hidden="true"></a>

                <?php /* Skill Title */ ?>

                    <h4 class="applicant-evidence__skill-title">Skill Title</h4>

                <?php /* Auto-population Warning */ ?>

                    <span class="applicant-evidence__skill-warning">Looks like you've already filled this skill in before! We've populated all the fields for you, but please review and save each section before continuing.</span>

                <?php /* Skill Description */ ?>

                    <p class="applicant-evidence__skill-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis iaculis justo ac finibus. Aliquam iaculis maximus velit, in cursus sapien rhoncus ac. Vivamus felis sem, iaculis tristique vulputate quis, iaculis eget est. In arcu mauris, tincidunt sed interdum eget, semper quis neque. Donec libero lectus, dapibus sed ante sed, sagittis ornare odio.</p>

                <?php /* Required Information Accordion */ ?>

                    <div class="applicant-evidence__skill-attribute--required accordion__wrapper active">

                        <?php /* Trigger */ ?>

                            <div class="accordion__trigger active" role="button" onclick="Utilities.toggleAccordion(this)" tabindex="0">

                                <div class="applicant-evidence__skill-status-block">

                                    <i class="fa fa-check"></i>

                                </div>

                                <span>Required Information</span>

                                <i class="fa fa-chevron-down"></i>

                            </div>

                        <?php /* Content */ ?>

                            <div class="accordion__content active">

                                <div class="flex-grid">

                                    <div class="box med-1of2"></div>

                                    <div class="applicant-evidence__context-link-wrapper box med-1of2">
                                        <a href="/#FAQ/credentialingSkillLevel" title="Learn more about levels of expertise and where you might fit in." target="_blank">Unsure of your level?</a>
                                    </div>

                                </div>

                                <form class="form__wrapper">

                                    <div class="applicant-evidence__expertise-radiogroup form__radio-group" role="radiogroup" aria-labelledby="applicationEvidenceExpertiseItemLabel" aria-orientation="horizontal">

                                        <label id="applicationEvidenceExpertiseItemLabel" for="" class="applicant-evidence__expertise-radiogroup-title form__label">
                                            My Level of Expertise
                                        </label>

                                        <?php // DEV-NOTE: This is the new structure for what were originally called "sliders". You'll notice that I've included the "for" and "id" attributes here due to the radio inputs not working without them. These will still need to be assigned dynamically. ?>

                                        <div class="applicant-evidence__expertise-wrapper flex-grid">

                                            <?php // Slider should be populated at runtime using item template ?>

                                        </div>

                                        <?php // DEV-NOTE: a template radio button item can be used to populate the expertise "slider" from scratch. The class "small-1ofN" must be added, where N=number of items. "for" and "id" attributes must be set uniquely for each. ?>

                                        <div class="hidden" id="applicationEvidenceExpertiseItemTemplate">
                                            <label class="box form__radio-group-label template">
                                                <span class="hidden">Expertise level option: </span>
                                                <input type="radio" name="expertise" class="form__radio-group-input applicant-evidence__first-target"/>
                                                <span class="form__radio-group-span"></span>
                                            </label>
                                        </div>

                                    </div>

                                    <div class="applicant-evidence__experience-radiogroup form__radio-group" role="radiogroup" aria-labelledby="applicationEvidenceExperienceItemLabel" aria-orientation="horizontal">

                                        <label id="applicationEvidenceExperienceItemLabel" for="" class="applicant-evidence__experience-radiogroup-title form__label">
                                            My Years of Experience
                                        </label>

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

                                    <?php /* Experience Textarea */ ?>

                                        <div class="form__input-wrapper--float">
                                            <label class="applicant-evidence__experience-and-knowledge__form-title form__label" for="applicationEvidenceDeclarationText">My Experience and Knowledge</label>
                                            <textarea class="applicant-evidence__skill-declaration-text form__textarea" id="applicationEvidenceDeclarationText"></textarea>
                                        </div>

                                    <?php /* Action Buttons */ ?>

                                        <div class="applicant-evidence__skill-attribute-action-wrapper flex-grid middle">

                                            <div class="box small-1of2">

                                            </div>

                                            <div class="box small-1of2">
                                                <button class="button--blue applicant-evidence__save-button" type="button">Save</button>
                                            </div>

                                        </div>

                                </form>

                            </div>

                    </div>

                <?php /* Micro-reference Accordion */ ?>

                    <div class="applicant-evidence__skill-attribute--reference accordion__wrapper">

                        <?php /* Trigger */ ?>

                            <div class="accordion__trigger" role="button" onclick="Utilities.toggleAccordion(this)" tabindex="0">

                                <div class="applicant-evidence__skill-status-block">

                                    <i class="fa fa-check"></i>

                                </div>

                                <span>Optional Micro-reference</span>

                                <i class="fa fa-chevron-down"></i>

                            </div>

                        <?php /* Content */ ?>

                            <div class="accordion__content">

                                <div class="flex-grid">

                                    <div class="box med-1of2">

                                    </div>

                                    <div class="applicant-evidence__context-link-wrapper box med-1of2">
                                        <a href="/#FAQ/credentialingReferences" title="What is a micro-reference?" class="applicant-evidence__faq" target="_blank">How will this strengthen my application?</a>
                                    </div>

                                </div>

                                <form class="form__wrapper">

                                    <div class="flex-grid">

                                        <div class="box med-1of2">

                                            <div class="form__input-wrapper--float">
                                                <label class="form__label" for="applicationEvidenceReferenceName">Reference's Name</label>
                                                <input class="form__input" id="applicationEvidenceReferenceName" name="reference_name" type="text"></input>
                                            </div>

                                        </div>

                                        <div class="box med-1of2">

                                            <div class="form__input-wrapper--float">
                                                <label class="form__label" for="applicationEvidenceReferenceEmail">Reference's Email</label>
                                                <input class="form__input" id="applicationEvidenceReferenceEmail" name="reference_email" type="email"></input>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="form__input-wrapper--select">
                                        <label class="form__label" for="applicationEvidenceReferenceRelationship">Your Relationship to This Reference</label>
                                        <div class="form__select-wrapper">
                                            <select class="form__input" id="applicationEvidenceReferenceRelationship" name="reference_relationship">
                                            </select>
                                        </div>
                                    </div>

                                    <div class="flex-grid">

                                        <div class="box med-1of2">

                                            <div class="form__input-wrapper--date">
                                                <label class="form__label" for="applicationEvidenceReferenceFrom">Observed From</label>
                                                <input class="form__input" id="applicationEvidenceReferenceFrom" name="reference_from_date" type="date"></input>
                                            </div>

                                        </div>

                                        <div class="box med-1of2">

                                            <div class="form__input-wrapper--date">
                                                <label class="form__label" for="applicationEvidenceReferenceUntil">Observed To</label>
                                                <input class="form__input" id="applicationEvidenceReferenceUntil" name="reference_until_date" type="date"></input>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="form__input-wrapper--select">
                                        <label class="form__label" for="applicationEvidenceReferenceExpLevel">Your Years of Experience At the Time</label>
                                        <div class="form__select-wrapper">
                                            <select class="form__input" id="applicationEvidenceReferenceExpLevel" name="reference_exp_level">
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form__input-wrapper--float">
                                        <label class="form__label" for="applicationEvidenceReferenceStory">Tell Us What You Did</label>
                                        <textarea class="form__textarea" id="applicationEvidenceReferenceStory" name="reference_story"></textarea>
                                    </div>

                                    <?php /* Action Buttons */ ?>

                                        <div class="applicant-evidence__skill-attribute-action-wrapper flex-grid middle">

                                            <div class="box small-1of2">
                                                <button class="applicant-evidence__skill-attribute-action-remove" onclick="EvidenceAPI.removeMicroReference(this)" type="button">Remove</button>
                                            </div>

                                            <div class="box small-1of2">
                                                <button class="button--blue applicant-evidence__save-button" type="button">Save</button>
                                            </div>

                                        </div>

                                </form>

                            </div>

                    </div>

                <?php /* Add Reference Button */ ?>

                    <button class="applicant-evidence__optional-button--reference" onclick="EvidenceAPI.addMicroReference(this)">

                        <div class="applicant-evidence__optional-button-icon-wrapper">

                            <i class="fa fa-plus-circle"></i>

                        </div>

                        <span class="applicant-evidence__optional-button-copy">
                            <span>Add an optional micro-reference.</span>
                            <span>Appoint someone who can vouch for your ability in this skill.</span>
                        </span>

                    </button>

                <?php /* Work Sample Accordion */ ?>

                    <div class="applicant-evidence__skill-attribute--sample accordion__wrapper">

                        <?php /* Trigger */ ?>

                            <div class="accordion__trigger" role="button" onclick="Utilities.toggleAccordion(this)" tabindex="0">

                                <div class="applicant-evidence__skill-status-block">

                                    <i class="fa fa-check"></i>

                                </div>

                                <span>Optional Work Sample</span>

                                <i class="fa fa-chevron-down"></i>

                            </div>

                        <?php /* Content */ ?>

                            <div class="accordion__content">

                                <div class="flex-grid">

                                    <div class="box med-1of2">

                                    </div>

                                    <div class="applicant-evidence__context-link-wrapper box med-1of2">
                                        <a href="/#FAQ/credentialingEvidence" title="How will this improve my application?" target="_blank">How will this strengthen my application?</a>
                                    </div>

                                </div>

                                <form class="form__wrapper">

                                    <div class="flex-grid">

                                        <div class="box med-1of2">

                                            <div class="form__input-wrapper--float">
                                                <label class="form__label" for="applicationEvidenceSampleName">Project/Document Name</label>
                                                <input class="form__input" id="applicationEvidenceSampleName" name="sample_name" type="text"></input>
                                            </div>

                                        </div>

                                        <div class="box med-1of2">

                                            <div class="form__input-wrapper--select">
                                                <label class="form__label" for="applicationEvidenceSampleType">Type of Work</label>
                                                <div class="form__select-wrapper">
                                                    <select class="form__input" id="applicationEvidenceSampleType" name="sample_type">
                                                        <?php /* Populated by JavaScript */ ?>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div class="form__input-wrapper--date">
                                        <label class="form__label" for="applicationEvidenceSampleDateCreated">Date This Work was Created</label>
                                        <input class="form__input" id="applicationEvidenceSampleDateCreated" name="sample_date_created" type="date"></input>
                                    </div>

                                    <div class="form__input-wrapper--float">
                                        <label class="form__label" for="applicationEvidenceSampleHttpLink">Link to Your Work</label>
                                        <input class="form__input" id="applicationEvidenceSampleHttpLink" name="sample_http_link" type="url"></input>
                                    </div>

                                    <div class="form__input-wrapper--float">
                                        <label class="form__label" for="applicationEvidenceSampleStory">The Story Behind the Work</label>
                                        <textarea class="form__textarea" id="applicationEvidenceSampleStory" name="sample_story"></textarea>
                                    </div>

                                    <?php /* Action Buttons */ ?>

                                        <div class="applicant-evidence__skill-attribute-action-wrapper flex-grid middle">

                                            <div class="box small-1of2">
                                                <button class="applicant-evidence__skill-attribute-action-remove" onclick="EvidenceAPI.removeWorkSample(this)" type="button">Remove</button>
                                            </div>

                                            <div class="box small-1of2">
                                                <button class="button--blue applicant-evidence__save-button" type="button">Save</button>
                                            </div>

                                        </div>

                                </form>

                            </div>

                    </div>

                <?php /* Add Work Sample Button */ ?>

                    <button class="applicant-evidence__optional-button--sample" onclick="EvidenceAPI.addWorkSample(this)">

                        <div class="applicant-evidence__optional-button-icon-wrapper">

                            <i class="fa fa-plus-circle"></i>

                        </div>

                        <span class="applicant-evidence__optional-button-copy">
                            <span>Add an optional work sample.</span>
                            <span>Provide a link to a sample of your work that showcases this skill.</span>
                        </span>

                    </button>

            </div>

        </div>
