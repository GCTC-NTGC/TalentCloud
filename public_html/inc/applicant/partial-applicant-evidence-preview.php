<section class="applicant-evidence-preview">

    <div class="applicant-evidence-preview__container">

        <div class="flex-grid">

            <div role="tablist" aria-orientation="vertical" class="box lg-1of4 applicant-evidence-preview__desktop-menu">

                <span class="applicant-evidence-preview__desktop-menu-title">Essential Criteria</span>

                <div id="applicationPreviewEssentialEvidenceWrapper"></div>

                <span class="applicant-evidence-preview__desktop-menu-title">Asset Criteria</span>

                <div id="applicationPreviewEssentialEvidenceWrapper"></div>

                <div class="hidden" id="applicationPrevierwEvidenceMenuItemTemplate">
                    <button role="tab" aria-selected="true" class="applicant-evidence-preview__desktop-menu-item template" data-evidence-trigger="">
                    </button>
                </div>

            </div>

            <div class="box lg-3of4 applicant-evidence-preview__form-wrapper">   
                <?php //This wrapper will be populated with Preview Evidence panels at runtime ?>
            </div>

            <?php //The following Preview Evidence Panel template can be cloned and used to populate the applicant-evidence-preview__form-wrapper ?>
            <div id="applicationPreviewEvidencePanelTemplate" class="hidden">
                <div role="tabpanel" class="applicant-evidence-preview__accordion-wrapper template" data-evidence-target="skill01" aria-labelledby="">

                    <div class="applicant-evidence-preview__accordion-trigger active" type="button" tabindex="0" aria-expanded="true">
                        <span class="applicant-evidence-preview__accordion-trigger-title">
                            <span class="applicant-evidence-preview__criteria-name">Wireframing</span> - 
                            <span class="applicant-evidence-preview__expertise">Intermediate</span> - 
                            <span class="applicant-evidence-preview__experience">3-5 Years</span>
                        </span>
                    </div>

                    <div class="applicant-evidence-preview__accordion-content active">

                        <div class="applicant-evidence-preview__experience-wrapper">

                            <h5 class="applicant-evidence-preview__section-title">
                                <i class="fa fa-check"></i>
                                Experience &amp; Knowledge
                            </h5>

                            <p class="applicant-evidence-preview__experience-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper sodales sem, sit amet rutrum arcu facilisis sed. Mauris consectetur id odio a congue. Ut faucibus tincidunt nulla fermentum sagittis. Vivamus posuere odio non sem maximus, in tristique lacus posuere.</p>

                        </div>

                        <div class="applicant-evidence-preview__reference-wrapper">

                            <hr class="applicant-evidence-preview__divider">

                            <h5 class="applicant-evidence-preview__section-title">
                                <i class="fa fa-user"></i>
                                Micro-reference
                            </h5>

                            <div class="applicant-evidence-preview__reference-content hidden">

                                <p class="applicant-evidence-preview__reference-metadata">
                                    <strong class="applicant-evidence-preview__reference-name">Reference Name</strong> - 
                                    <span class="applicant-evidence-preview__reference-relationship">Relationship</span> - 
                                    <span class="applicant-evidence-preview__reference-start-date">(00/0000)</span> - 
                                    <span class="applicant-evidence-preview__reference-end-date">(00/0000)</span>
                                </p>

                                <p class="applicant-evidence-preview__reference-status">
                                    <strong>Status: </strong>
                                    <span><i class="fa fa-check-circle"></i> Response Received</span>
                                </p>

                                <p class="applicant-evidence-preview__reference-copy">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper sodales sem, sit amet rutrum arcu facilisis sed. Mauris consectetur id odio a congue. Ut faucibus tincidunt nulla fermentum sagittis. Vivamus posuere odio non sem maximus, in tristique lacus posuere."</p>

                            </div>

                            <p class="applicant-evidence-preview__reference-null">No reference was provided.</p>

                        </div>

                        <div class="applicant-evidence-preview__evidence-wrapper">

                            <hr class="applicant-evidence-preview__divider">

                            <h5 class="applicant-evidence-preview__section-title">
                                <i class="fa fa-file"></i>
                                Skill Sample
                            </h5>

                            <div class="applicant-evidence-preview__evidence-content hidden">

                                <p class="applicant-evidence-preview__evidence-metadata">
                                    <strong class="applicant-evidence-preview__evidence-name">Project Name</strong> - 
                                    <span class="applicant-evidence-preview__evidence-date">(00/0000)</span>
                                </p>

                                <p class="applicant-evidence-preview__evidence-status">
                                    <strong>Status: </strong>
                                    <span><i class="fa fa-exclamation-triangle"></i> Awaiting Corroboration</span>
                                </p>

                                <p class="applicant-evidence-preview__evidence-copy"><strong>Contribution:</strong> <span class="applicant-evidence-preview__evidence-story">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper sodales sem, sit amet rutrum arcu facilisis sed. Mauris consectetur id odio a congue. Ut faucibus tincidunt nulla fermentum sagittis. Vivamus posuere odio non sem maximus, in tristique lacus posuere.</span></p> 

                                <a href="" title="View this evidence." target="_blank" class="applicant-evidence-preview__evidence-link button--blue">View Evidence</a>

                            </div>

                            <p class="applicant-evidence-preview__evidence-null">No evidence was provided.</p>

                        </div>

                    </div>

                </div>
            </div>

        </div>

    </div>

</section>