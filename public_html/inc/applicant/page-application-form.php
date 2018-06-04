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

        <div class="application-form__wrapper content-container">

            <form name="createJobApplicationForm" id="createJobApplicationForm" novalidate="novalidate" method="post" enctype="application/x-www-form-urlencoded">

                <div id="createJobApplicationOpenEndedQuestionsWrapper"></div>

            </form>

            <div id="jobApplicationQuestionAnswerTemplate" class="application-form__open-question-item template" data-question-id="0">
                <label class="jobApplicationQuestion application-form__label heading--03" for="jobApplicationAnswerInput">
                    <span class="application-form__open-question"></span>
                    <p class=" application-form__open-question-description"></p>
                </label>
                <textarea id="jobApplicationAnswerInput" name="answer" class="jobApplicationAnswerField application-form__textarea form__textarea application-form__open-answer"></textarea>
            </div>

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
