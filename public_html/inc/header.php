<?php
header('Content-Type: text/html; charset=utf-8');

$url = filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL);
if ($url == '/admin/'){
    $portal = 'Manager (Admin)';
}
else{
    $portal = 'Applicant';
}
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor . 
-->
<html lang="en">
<head>
    <title>GC Talent Cloud</title>
    <!-- Metadata -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Font Awesome -->
    <script src="https://use.fontawesome.com/9fe1581a5a.js"></script>
    <!-- WET / CDS -->
    <link href="/css/theme.min.css" rel="stylesheet" type="text/css"/>
    <link href="/css/theme.css" rel="stylesheet" type="text/css"/>
    <!-- Custom -->
    <link href="/css/style.css" rel="stylesheet" type="text/css"/>
    <link href="/css/messaging.css" rel="stylesheet" type="text/css"/>
    <link href="/css/sliderButton.css" rel="stylesheet" type="text/css"/>
    <!-- Scripts / APIs -->
    <script src="/js/Utilities.js"></script>
    <script src="/js/TalentCloudAPI.js"></script>
    <script src="/js/ContactAPI.js"></script>
    <script src="/js/DataAPI.js"></script>
    <script src="/js/UserAPI.js"></script>
    <script src="/js/MessageHandlerAPI.js"></script>
    <script src="/js/JobPostAPI.js"></script>
    <script src="/js/FormValidationAPI.js"></script>
    <script src="/js/EventsAPI.js"></script>
    <script src="/js/FormsAPI.js"></script>    
    <script src="/js/JobSeekerAPI.js"></script>
    <script src="/js/FileUploadAPI.js"></script>
    <script>
        var loadingImage = new Image();
        loadingImage.src = "/images/logo.svg";
    </script>
    <!-- Admin scripts -->
    <script src="/admin/js/CreateJobPosterAPI.js"></script>
    <script src="/admin/js/CreateEditProfileAPI.js"></script>
    <script src="/admin/js/ManagerEventsAPI.js"></script>
    <script src="/admin/js/DepartmentAPI.js"></script>
    <!-- Libraries -->
    <link rel="stylesheet" href="/libraries/croppie.css" />
    <script src="/libraries/croppie.js"></script>
</head>

<body>
<div id="cloud-container">
<ul id="wb-tphp">
    <li class="wb-slc">
        <a class="wb-sl" href="#jobs">Skip to available jobs</a>
    </li>
</ul>

<header>
<div id="fip">
    <div class="container">
        <div class="row">
            <div class="col-xs-2">
                <a href="https://www.canada.ca/en.html" class="fip-logo gl-FIP" aria-label="Government of Canada">
                    <object type="image/svg+xml" role="img" data="/images/goc--header-logo.svg" aria-label="Symbol of the Government of Canada" class="logo"></object>
                </a>
            </div>
            <div class="col-xs-8">
                <section class="visible-md visible-lg">
                    <h1 class="tc-title">GC Talent Cloud <i class="fa fa-cloud cloudicon" aria-hidden="true"></i> <?php echo $portal; ?> Portal</h1>
                </section>
            </div>
            <div class="col-xs-2">
                <section id="wb-lng" class="visible-sm visible-md visible-lg">
                    <h2>Language selection</h2>
                    <div id="lang" class="lang">
                        <a href="javascript:void(0)" lang="fr" id="languageSelect" onclick="TalentCloudAPI.setLanguage();">Français</a>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
</header>