<div class="pageBanner">

    <div id="logo-container" class="logo-container">

        <div class="container">

            <div class="page-banner--logo-container flexContainerVerticallyCentered">

                <div class="page-banner--logo flexLeftOfCenter">
                    <a href="/" role="img" aria-label="GC Talent Cloud">
                        <img id="logoSrc" class="landing-hero__logo tc-logo logo" src="/images/talent-cloud-logo_full.png" width="229" alt="GC Talent Cloud graphic"/>
                    </a>
                </div>

                <div class="landing-hero__tagline-divider page-banner--logo-tagline-divider"></div>

                <div class="page-banner--tagline flexRightOfCenter" id="taglineMain">People want meaningful work.</div>

            </div>

            <!-- Checks to see if the page is the admin portal and then displays the admin tagline. -->
            <?php 
                $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
                if (strpos($url,'admin') !== false) {
                    echo '<p id="adminTagline" class="centered">Changing government through it\'s people</p>';
                } else {
                    
                }
            ?>

        </div>

    </div>
    
</div>