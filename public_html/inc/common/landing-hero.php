<div class="pageBanner">
    <div id="logo-container" class="logo-container">
        <div class="flex-grid middle">
            <div class="box med-full lg-3of5">
                <div class="page-banner--logo-container">
                    <div class="page-banner--logo">
                        <a href="/" role="img" aria-label="GC Talent Cloud">
                            <img id="logoSrc" class="landing-hero__logo tc-logo logo" src="/images/talent-cloud-logo_full.png" width="229" alt="GC Talent Cloud graphic"/>
                        </a>
                    </div>
                </div>
            </div>

            <div class="box med-full lg-2of5">
                <div class="page-banner--tagline-container">
                    <div class="page-banner--tagline" id="taglineMain">People want meaningful work.</div>
                </div>
            </div>
        </div>
            <?php // Checks to see if the page is the admin portal and then displays the admin tagline. ?>
            <?php
                $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
                if (strpos($url,'admin') !== false) {
                    echo '<p id="adminTagline" class="centered">Changing government through it\'s people</p>';
                } else {

                }
            ?>
    </div>
</div>
