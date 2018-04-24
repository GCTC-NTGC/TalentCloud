<nav id="wb-sm">
    <div class="topbar transparent" id="site--topbar">
        <h2 id="topicsMenu">Topics menu</h2>
        <div class="row">
            <div class="nav-container nav">
                <ul class="navbar-right" role="menubar">
                    <li class="top-nav--link" aria-hidden="false" id="homeLinkListItem">
                        <a href="/admin/" class="active" id="homeLink">Home</a>
                    </li>
                    <li class="top-nav--link hidden" id="browseLinkListItem">
                        <div id="browse">
                            <a href="javascript:void(0)" id="browseLink" onclick="JobPostAPI.showBrowseJobs();">Browse Jobs</a>
                        </div>
                    </li>
                    <li class="top-nav--link" id="profileLinkListItem" aria-hidden="true">
                        <a href="javascript:void(0)" class="hidden" id="profileLink" onclick="CreateEditProfileAPI.showCreateEditProfile();TalentCloudAPI.setNav('profileLinkListItem');">My Profile</a>
                    </li>
                    <li class="top-nav--link" id="jobPostersLinkListItem" aria-hidden="true">
                        <a href="javascript:void(0)" class="hidden" id="jobPostersLink" onclick="CreateJobPosterAPI.showCreateJobPosterForm(this);TalentCloudAPI.setNav('jobPostersLinkListItem');">JobPoster</a>
                    </li>
                    <!--li class="top-nav--link" id="teamsLinkListItem" aria-hidden="true">
                        <a href="#" class="hidden" id="teamsLink">My Teams</a>
                    </li-->
                    <li class="top-nav--link" id="registerLinkListItem">
                        <div id="register">
                            <a href="javascript:void(0)" id="registerLink" onclick="UserAPI.showRegisterForm(this)">Register</a>
                        </div>
                    </li>
                    <li class="top-nav--link">
                        <?php
                            $hasUser = null;
                            if (isset($oidc)) {
                                $hasUser = $oidc->requestUserInfo("name");
                            }
                        ?>
                        <div id="loggedOut" class="<?php echo($hasUser!=null?"hidden":""); ?>">
                            <!--a href="javascript:void(0)" id="loginLink" onclick="UserAPI.showLogin(this)">Login</a-->
                            <?php //echo("<a href=\"".AUTH_URI."?client_id=".CLIENT_ID."&redirect_uri=".REDIRECT_URI."&scope=openid%20profile%20email&response_type=id_token%20token&state=123456&prompt=consent\" id=\"loginLink\">Login</a>"); ?>
                            <?php echo("<a href=\"https://account.gccollab.ca/openid/authorize?response_type=code&redirect_uri=https%3A%2F%2Ftc.gccollab.ca%2Fadmin&nonce=".$nonce."&state=".$state."&client_id=800830&scope=openid+profile+email&prompt=consent\" id=\"loginLink\">Login</a>"); ?>
                        </div>
                    </li>
                    <li class="top-nav--link">
                        
                        <div id="loggedIn" class="<?php echo($hasUser==null?"hidden":""); ?>">
                            <a href="javascript:void(0)" id ="logoutLink" onclick="UserAPI.logout()">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
