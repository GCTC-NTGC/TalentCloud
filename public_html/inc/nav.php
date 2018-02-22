<nav id="wb-sm">
    <div class="topbar transparent" id="site--topbar">
        <h2>Topics menu</h2>
        <div class="row">
            <div id="logo" class="logo-container">
                <a href="/" role="img" class="circle" aria-label="GC Talent Cloud"><img class="tc-logo" src="/images/talentcloud_logo_white.png" width="200" alt="GC Talent Cloud logo"/></a>
            </div>
            <div class="nav-container">
                <ul class="navbar-right" role="menubar">
                    <!--<li class="top-nav--link active" aria-hidden="false" id="homeLink">
                        <a href="/">Home</a>
                    </li>
                    <li class="top-nav--link">
                        <a href="/about">FAQ</a>
                    </li>-->
                    <li class="top-nav--link" id="browseLinkListItem">
                        <div id="browse">
                            <a href="#BrowseJobs" id="browseLink" onclick="DataAPI.getJobs();">Browse Jobs</a>
                        </div>
                    </li>
                    <li class="top-nav--link" id="profileLinkListItem" aria-hidden="true">
                        <a href="#MyProfile" class="hidden" id="profileLink" onclick="JobSeekerAPI.showJobSeekerProfile()">My Profile</a>
                    </li>
                    <li class="top-nav--link">
                        <div id="register">
                            <a href="javascript:void(0)" id="registerLink" onclick="UserAPI.showRegisterForm(this)">Register</a>
                        </div>
                    </li>
                    <li class="top-nav--link">
                        <div id="loggedOut">
                            <a href="javascript:void(0)" id="loginLink" onclick="UserAPI.showLogin(this)">Login</a>
                        </div>
                    </li>    
                    <li class="top-nav--link">
                        <div id="loggedIn" class="hidden">
                            <span id="loggedInUser">Hi <span id="user_fname"></span>!</span>
                            <a href="javascript:void(0)" id="logoutLink" onclick="UserAPI.logout()">Logout</a>
                        </div>
                    </li>        
                </ul>
            </div>
        </div>
    </div>
</nav>