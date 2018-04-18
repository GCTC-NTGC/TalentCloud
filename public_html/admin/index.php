<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor .
-->
<html lang="en">
<head>
    <title>GC Talent Cloud</title>
    <!-- Includes for metadata / scripts -->
    <?php
    include '../inc/common/head.php';
    include '../inc/manager/head-admin.php';
    ?>
</head>

<body>
    <!-- Include for Federal Identity Program (black banner) -->
    <?php include '../inc/manager/header-fip.php'; ?>
    <!-- Include for main navigation -->
    <?php include '../inc/manager/header-nav.php'; ?>

    <!-- BEGIN - Overlays (all should be children of this div) -->
    <div id="overlays">
        <!-- BEGIN - Includes for modal dialogs -->
        <?php
        include '../inc/manager/modal-registration.php';
        include '../inc/manager/modal-login.php';
        include '../inc/manager/modal-upload-photo.php';
        include '../inc/manager/modal-yes-no.php';
        include '../inc/manager/modal-update.php';
        ?>
        <!-- END - Modal dialogs -->
    </div>
    <!-- END - Overlays -->

    <!-- BEGIN - Page Content-->
    <main>
        <!-- BEGIN - Includes for pages -->
        <?php
        include "../inc/manager/page-home-content.php";
        include "../inc/manager/page-job-seeker.php";
        include "../inc/manager/page-create-job-poster.php";
        include "../inc/manager/page-profile.php";
        ?>
        <!-- END - Includes for pages -->
    </main>
    <!-- END - Page Content -->

    <!-- Include for footer -->
    <?php include '../inc/manager/footer.php'; ?>
</body>
</html>
