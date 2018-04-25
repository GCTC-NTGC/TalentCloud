<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor .
-->
<html lang="en">
<head>
    <title>GC Talent Cloud</title>
    <!-- Include for metadata / scripts -->
    <?php include 'inc/common/head.php'; ?>
</head>

<body>
    <!-- Include for Federal Identity Program (black banner) -->
    <?php include 'inc/applicant/header-fip.php';?>
    <!-- Include for main navigation -->
    <?php include 'inc/applicant/header-nav.php';?>

    <!-- BEGIN - Overlays (all should be children of this div) -->
    <div id="overlays">
        <!-- BEGIN - Includes for modal dialogs -->
        <?php
        include 'inc/applicant/modal-registration.php';
        include 'inc/applicant/modal-login.php';
        include 'inc/applicant/modal-edit-profile.php';
        include 'inc/applicant/modal-edit-profile-answer.php';
        include 'inc/applicant/modal-yes-no.php';
        ?>
        <!-- END - Modal dialogs -->
    </div>
    <!-- END - Overlays -->

    <!-- BEGIN - Page Content-->
    <main>
        <!-- BEGIN - Includes for pages -->
        <?php
        include "inc/applicant/page-home-content.php";
        include "inc/applicant/page-browse-jobs.php";
        include "inc/applicant/page-view-job-poster.php";
        include "inc/applicant/page-applicant-profile.php";
        include "inc/applicant/page-manager-profile.php";
        include "inc/applicant/page-application-form.php";        
        include "inc/applicant/page-job-application-confirm.php";
        include "inc/applicant/page-dashboard.php";
        include "inc/applicant/page-application-preview.php";
        ?>
        <!-- END - Incudes for pages -->
    </main>
    <!-- END - Page Content -->

    <!-- Include for footer -->
    <?php include 'inc/applicant/footer.php';?>
</body>
</html>
