<!-- BEGIN - Job Application Section -->
<section class="pageContent hidden" id="createJobApplicationSection">
    <div class="pageBanner">
        <h2 class="section--title" id="createJobApplicationTitle">My Job Application</h2>
        <div class="container centered">
            <p id="createJobApplicationPositionLabel">for the position of:</p>
            <h3 id="createJobApplicationPostition">Job title</h3>
        </div>
        <input type='hidden' id='createJobApplicationJobApplicationId' />
        <input type='hidden' id='createJobApplicationJobPosterId' />
        <input type='hidden' id='createJobApplicationJobSeekerId' />
    </div>
    <div class="pageBody">
        <div class="container centered">
            <img id="createJobApplicationProfilePic" class="profilePicLarge" src="images/user.png" alt="My Profile Pic"/>
            <div class="profileName">
                <span id="createJobApplicationFirstName"></span> <span id="createJobApplicationLastName"></span>
            </div>
        </div>
        <form name="createJobApplicationForm" id="createJobApplicationForm" novalidate="novalidate" method="post" enctype="application/x-www-form-urlencoded">
            <div class="container">
                <div id="createJobApplicationOpenEndedQuestionsWrapper">

                </div>
            </div>
        </form>
        <div id='createJobApplicationButtonWrapper'>
            <button id="createJobApplicationSubmitButton" class="btn btn-primary" value="View" onclick="JobApplicationAPI.submitNewJobApplication();">
                Submit
            </button>
        </div>
    </div>
</section>
<!-- END - Job Application Section -->
