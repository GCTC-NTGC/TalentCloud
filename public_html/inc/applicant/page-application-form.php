<section class="pageContent hidden" id="createJobApplicationSection">

    <!-- <div class="pageBanner">
        <h2 class="section--title" id="createJobApplicationTitle">My Job Application</h2>
        <div class="container centered">
            <p id="createJobApplicationPositionLabel">for the position of:</p>
            <h3 id="createJobApplicationPostition">Job title</h3>
        </div>
        <input type='hidden' id='createJobApplicationJobApplicationId' />
        <input type='hidden' id='createJobApplicationJobPosterId' />
        <input type='hidden' id='createJobApplicationJobSeekerId' />
        <input type='hidden' id='createJobApplicationJobApplicationStatusId' />
    </div> -->

    <div class="pageBody">

        <?php // Some aesthetic rework was done here during TAL-102 ?>
        <div class="application-profile__wrapper block-container">

            <img id="createJobApplicationProfilePic" class="profilePicLarge" src="images/user.png" alt="My Profile Pic"/>

            <div class="profileName">
                <span id="createJobApplicationFirstName"></span> <span id="createJobApplicationLastName"></span>
            </div>

        </div>

        <div class="application-form__wrapper block-container">

            <form name="createJobApplicationForm" id="createJobApplicationForm" novalidate="novalidate" method="post" enctype="application/x-www-form-urlencoded">

                <div id="createJobApplicationOpenEndedQuestionsWrapper"></div>

            </form>

        </div>

        <?php // TAL-102 ====================================================== ?>
        <div class="skills__wrapper block-container">

            <?php // Repeatable Skill Accordion ?>

            <?php // DEV-NOTE: This accordion can be used over and over for each skill. The two included in the HTML below here are simply there for reference. One class will have to be altered depending on the state of the user's interaction with the skill. This occurs on the "skills__accordion-trigger". There are 3 modifiers that can be applied to change their icon state: "skills__accordion-trigger--todo", "skills__accordion-trigger--edit", and "skills__accordion-trigger--complete". These will need to be applied based on the state of the content entry. All accordions should begin with the "--todo" modifier. ?>
            <div id="skills__accordion-template" class="skills__accordion hidden">                    
                <div class="skills__accordion-trigger--todo flex-grid middle" role="button" tabindex="0">
                    <div class="box small-1of2">
                        <i class="fa skills__status-icon"></i>
                        <span class="skills__skill-title">Skill Name</span>
                    </div>
                    <div class="box small-1of2">
                        <i class="fa fa-chevron-down"></i>
                    </div>
                </div>

                <div class="skills__accordion-content flex-grid top">
                    <div class="box med-1of2 lg-2of5">
                        <form class="form__wrapper">
                            <?php // DEV-NOTE: Accessibility wise, we'll want to add numeric values to the for and ID values here to ensure there is no repitition. Each skill accordion will require its own set. ?>
                            <label id="selectYearsOfExperience__label" class="form__label" for="selectYearsOfExperience">Years of Experience</label>
                            <div class="form__select-wrapper">
                                <select class="form__select" id="selectYearsOfExperience" name="Select Years of Experience">
                                    <option>1 or Less</option>
                                    <option>2 - 3</option>
                                    <option>4 - 5</option>
                                    <option>6 - 7</option>
                                    <option>8 or More</option>
                                </select>
                            </div>
                            <?php // DEV-NOTE: Same accessibility statement as above here. ?>
                            <label id="selectLevel__label" class="form__label" for="selectLevel">Level</label>
                            <div class="form__select-wrapper">
                                <select class="form__select" id="selectLevel" name="Select Level">
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Expert</option>
                                    <option>Master</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="box med-1of2 lg-3of5">
                        <form class="form__wrapper">
                            <?php // DEV-NOTE: Same accessibility statement as above here. ?>
                            <label id="typeExperience__label" class="form__label" for="typeExperience">Tell us about your experience:</label>
                            <textarea class="form__textarea" id="typeExperience" name="Type your Experience" placeholder="How did you get this experience? What lessons did you learn?"></textarea>
                        </form>
                    </div>
                    <div class="box full">
                        <hr>
                    </div>
                    <div class="box full">
                        <button id="skills__cancel-button" class="button--grey">Cancel</button>
                        <button id="skills__save-button" class="button--blue">Save</button>
                    </div>
                </div>

            </div>

            <div id="skills__essential-group-wrapper" class="skills__group-wrapper">

               <?php // Group (Essential, Asset, etc.) Title ?>
                <h3 class="skills__group-title heading--03">Essential Criteria (All Criteria Required)</h3>

               <?php // Optional Group Copy (See Asset Mockup) ?>
                <p class="skills__group-copy">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias maxime dicta quod? Soluta at aliquid in nesciunt, quis voluptatibus possimus eaque ab inventore nam iusto omnis enim dolores. Accusantium, laudantium!</p>

               <?php // Container for skill accordions ?>
                <div id="skills__essential-accordion-wrapper"></div>

            </div>

            <div id="skills__asset-group-wrapper" class="skills__group-wrapper">

                <?php // Group (Essential, Asset, etc.) Title ?>
                <h3 class="skills__group-title heading--03">Asset Criteria (Not Required)</h3>

                <?php // Optional Group Copy (See Asset Mockup) ?>
                <p class="skills__group-copy">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias maxime dicta quod? Soluta at aliquid in nesciunt, quis voluptatibus possimus eaque ab inventore nam iusto omnis enim dolores. Accusantium, laudantium!</p>

                <?php // Container for skill accordions ?>
                <div id="skills__asset-accordion-wrapper"></div>

            </div>

        </div>

        <?php // Some minor structural work was done here during TAL-102 ?>
        <div id='createJobApplicationButtonWrapper' class="application-button__wrapper">

            <button id="createJobApplicationSubmitButton" class="button--yellow" value="View" onclick="JobApplicationAPI.submitNewJobApplication();">
                Submit
            </button>

        </div>

    </div>

</section>
