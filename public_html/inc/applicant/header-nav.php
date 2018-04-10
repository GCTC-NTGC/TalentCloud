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
                            <a href="javascript:void(0)" id="registerLink" onclick="UserAPI.showRegisterForm(this);">Register</a>
                        </div>
                    </li>
                    <li class="top-nav--link">
                        <div id="loggedOut">
                            <a href="javascript:void(0)" id="loginLink" onclick="UserAPI.showLogin(this)">Login</a>
                        </div>
                    </li>
                    <li class="top-nav--link">
                        <div id="loggedIn" class="hidden">
                            <a href="javascript:void(0)" id="logoutLink" onclick="UserAPI.logout()">Logout</a>
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
