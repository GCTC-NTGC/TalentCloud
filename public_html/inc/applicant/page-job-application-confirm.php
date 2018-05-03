<?php // BEGIN - Job Application Confirmation Section ?>
<section class="pageContent hidden" id="createJobApplicationConfirmationSection">
     <div class="pageBanner">
        <h2 class="section--title" id="createJobApplicationConfirmationTitle">My Job Application</h2>
    </div>
    <div class="pageBody">
        <div id='createJobApplicationConfirmationBodyWrapper'>
            <div class="centered container">
                <p id="createJobApplicationConfirmationPositionLabel">
                    You have applied for the position of:
                </p>
                <h3 id="createJobApplicationConfirmationPostition">Job title</h3>
                <p id="createJobApplicationConfirmationTrackingReminder">
                    Track the application from your Dashboard.
                </p>
                <button id="createJobApplicationConfirmationContinueButton" class="btn btn-primary" value="View" onclick="DashboardAPI.showDashboard();">
                    Continue to Dashboard
                </button>
            </div>
        </div>
        <div class="confirmationFramingBar"></div>
    </div>
</section>
