<?php
$url = filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL);
    if ($url == '/admin/') {
        $portal = 'Manager (Admin) Portal';
    } else {
        $portal = 'Applicant Portal';
    }
?>
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
                    <h1 class="page-title">GC Talent Cloud <i class="fa fa-cloud cloudicon" aria-hidden="true"></i> <?php echo $portal; ?> </h1>
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