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

    <!-- Restructured during TAL-103 -->
    <div class="application-header__position-wrapper">

        <div class="content-container">

            <?php // Some aesthetic rework was done here during TAL-102 ?>
            <div class="application-profile__wrapper block-container">

                <h3 id="createJobApplicationPostition" class="application-header__position">Job title</h3>

            </div>

        </div>

        <input type='hidden' id='createJobApplicationJobApplicationId' />
        <input type='hidden' id='createJobApplicationJobPosterId' />
        <input type='hidden' id='createJobApplicationJobSeekerId' />
        <input type='hidden' id='createJobApplicationJobApplicationStatusId' />

    </div>

    <div class="pageBody">

        <!-- Application Progress Tracker -->
        <?php include "partial-applicant-progress-tracker.php"; ?>

        <section id="applcationMyInformationSection" class="application-section" data-application-section="my-information">
            <!-- Some aesthetic rework was done here during TAL-102 -->
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

            <div class="application-button__wrapper">

                <button class="button--yellow" value="View" onclick="JobApplicationAPI.saveJobApplication(JobApplicationAPI.showNextApplicationSection());">
                    Save and continue
                </button>

            </div>
        </section>

        <!-- TAL-103 ====================================================== -->
        <?php include "partial-applicant-evidence.php"; ?>

    </div>

</section>