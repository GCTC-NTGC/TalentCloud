<?php


?>
<nav id="wb-sm">
    <div class="topbar transparent" id="site--topbar">
        <h2 id="topicsMenu">Topics menu</h2>
        <div class="row">
            <div class="nav-container">
                <ul class="navbar-right" role="menubar">
                    <li class="top-nav--link" aria-hidden="false" id="homeLinkListItem">
                        <div id="home">
                            <a href="/" id="homeLink">Home</a>
                        </div>
                    </li>
                    <!--li class="top-nav--link">
                        <a href="/about">FAQ</a>
                    </li>-->
                    <li class="top-nav--link" id="browseLinkListItem">
                        <div id="browse">
                            <a href="#BrowseJobs" id="browseLink" onclick="JobPostAPI.showBrowseJobs();TalentCloudAPI.setNav('browseLinkListItem');">Browse Jobs</a>
                        </div>
                    </li>
                    <li class="top-nav--link" id="dashBoardLinkListItem" aria-hidden="true">
                        <a href="javascript:void(0)" class="hidden" id="dashBoardLink" onclick="DashboardAPI.showDashboard(this);TalentCloudAPI.setNav('dashBoardLinkListItem');">Dashboard</a>
                    </li>
                    <li class="top-nav--link" id="profileLinkListItem" aria-hidden="true">
                        <a href="#MyProfile" class="hidden" id="profileLink" onclick="JobSeekerAPI.showJobSeekerProfile();TalentCloudAPI.setNav('profileLinkListItem');">My Profile</a>
                    </li>
                    <li class="top-nav--link">
                        <div id="register">
                            <!--a href="javascript:void(0)" id="registerLink" onclick="UserAPI.showRegisterForm(this);">Register</a-->
                            <?php echo("<a href=\"https://account.gccollab.ca/register?redirect_uri=https%3A%2F%2Ftc.gccollab.ca%2F\" id=\"registerLink\">Register</a>"); ?>
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
                            <?php 
                            $loginLink = "";
                            $loginLink .= OPENID_URI.AUTH_URI;
                            $loginLink .= "?response_type=".URL_RESPONSE_TYPES;
                            $loginLink .= "&redirect_uri=".urlencode(REDIRECT_URI);
                            $loginLink .= "&nonce=".$nonce;
                            $loginLink .= "&state=".$state;
                            $loginLink .= "&client_id=".CLIENT_ID;
                            $loginLink .= "&scope=".SCOPE;
                            $loginLink .= "&prompt=consent";
                            echo("<a href=\"".$loginLink."\" id=\"loginLink\">Login</a>"); 
                            
                            ?>
                        </div>
                    </li>
                    <li class="top-nav--link">
                        
                        <div id="loggedIn" class="<?php echo($hasUser==null?"hidden":""); ?>">
                            <a href="javascript:void(0)" id ="logoutLink" onclick="UserAPI.logout()">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
            <!--div id="logo" class="logo-container">
                <a href="/" role="img" aria-label="GC Talent Cloud">
                    <img class="tc-logo" src="/images/talentcloudHomepage.png" width="259" alt="GC Talent Cloud logo"/>
                </a>
                <div class="h1 col-xs-12 col-sm-7 col-md-6">People have a right to meaningful work.</div>
            </div-->

        </div>
    </div>
</nav>
