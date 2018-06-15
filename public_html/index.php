<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor .
-->
<?php
date_default_timezone_set('America/Toronto');

error_reporting(E_ALL);
ini_set("display_errors", 1);

?>

<?php include 'inc/common/authentication.php'; ?>
<html lang="en">
    <head>
        <title>GC Talent Cloud</title>
        <?php // Include for metadata / scripts ?>
        <?php include 'inc/common/head.php'; ?>
        <?php include 'inc/common/script-session-user.php'; ?>
    </head>
    <body>
        <?php // Include for Federal Identity Program (black banner) ?>
        <?php include 'inc/applicant/header-fip.php'; ?>
        <!-- Include for main navigation -->
        <?php include 'inc/common/header-nav.php'; ?>

        <?php // BEGIN - Overlays (all should be children of this div) ?>
        <div id="overlays">
            <?php // BEGIN - Includes for modal dialogs ?>
            <?php
            include 'inc/applicant/modal-edit-profile.php';
            include 'inc/applicant/modal-edit-profile-answer.php';
            include 'inc/applicant/modal-yes-no.php';
            ?>
            <?php // END - Modal dialogs ?>
        </div>
        <?php // END - Overlays ?>

        <?php // BEGIN - Page Content?>
        <main>
            <?php // BEGIN - Includes for pages ?>
            <?php
            include "inc/applicant/page-home-content.php";
            include "inc/applicant/page-browse-jobs.php";
            include "inc/applicant/page-view-job-poster.php";
            include "inc/common/page-applicant-profile.php";
            include "inc/applicant/page-manager-profile.php";
            include "inc/applicant/page-application-form.php";
            include "inc/applicant/page-job-application-confirm.php";
            include "inc/applicant/page-dashboard.php";
            include "inc/common/page-application-preview.php";
            include "inc/common/faq.php";
            include "inc/common/terms-and-conditions.php";
            include "inc/common/privacy.php";
            ?>
            <?php // END - Incudes for pages ?>
        </main>
        <?php // END - Page Content ?>

        <?php // Include for footer ?>
        <?php include 'inc/applicant/footer.php'; ?>
    </body>
</html>
