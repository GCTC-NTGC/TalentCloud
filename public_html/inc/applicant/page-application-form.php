<section class="hidden" id="createJobApplicationSection">

    <?php /* Application Progress Tracker */ ?>
    <?php include "partial-applicant-progress-tracker.php"; ?>

    <section id="applcationMyInformationSection" class="application-section" data-application-section="my-information">
        <?php /* Some aesthetic rework was done here during TAL-102 */ ?>
        <div class="application-profile__wrapper block-container">

            <img id="createJobApplicationProfilePic" class="profilePicLarge" src="images/user.png" alt="My Profile Pic"/>

            <div class="profileName">
                <span id="createJobApplicationName"></span>
            </div>

        </div>

        <div
            class="application-form__wrapper content-container">

            <form 
                name="createJobApplicationForm" 
                id="createJobApplicationForm" 
                novalidate="novalidate" 
                method="post" 
                enctype="application/x-www-form-urlencoded">

                <?php /* Open Ended Question Template */ ?>

                    <div 
                        class="application-form__open-question-item template" 
                        id="jobApplicationQuestionAnswerTemplate" 
                        data-question-id="0">
                        
                        <span 
                            class="application-form__open-question">
                            Sample Question Content?
                        </span>

                        <p
                            class="application-form__open-question-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit justo nec lobortis ullamcorper. Aliquam venenatis faucibus mi, sit amet egestas nunc euismod vel. Integer vel est odio. Proin semper, ex vitae ultrices luctus, turpis eros pulvinar nisl, non imperdiet nulla erat nec est. Praesent cursus eleifend sapien in sodales.
                        </p>

                        <div
                            class="form__input-wrapper--float">
                            <label 
                                class="form__label" 
                                for="jobApplicationAnswerInput">
                                Your Answer
                            </label>
                            <textarea
                                class="jobApplicationAnswerField form__textarea" 
                                id="jobApplicationAnswerInput" 
                                name="answer"></textarea>
                        </div>

                    </div>

                <fieldset
                    class="form__fieldset form__form-section" 
                    id="createJobApplicationOpenEndedQuestionsWrapper">

                    <?php /* Populated by JavaScript */ ?>

                </fieldset>

            </form>

        </div>

        <div class="application-button__wrapper">

            <button class="button--yellow" value="View" onclick="JobApplicationAPI.saveJobApplication(JobApplicationAPI.showNextApplicationSection(document.getElementById('jobApplicationJobPosterId').value));">
                Save and continue
            </button>

        </div>
    </section>

    <?php /* TAL-103 ====================================================== */ ?>
    <?php include "partial-applicant-evidence.php"; ?>


</section>
