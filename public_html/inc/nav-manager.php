<nav id="wb-sm">
    <div class="topbar transparent" id="site--topbar">
        <h2>Topics menu</h2>
        <div class="row">
            <!--
            <div class="col-xs-4 col-sm-3">
                <a href="/" class="cds-logo" role="img" aria-label="Canadian Digital Service"></a>
            </div>
            -->
            <div class="nav-container nav">
                <!--
                <div id="js-mobileNav">
                    <div id="js-mobileNav--closeContainer">
                        <button id="js-mobileNav--button">
                            <span class="text">Close</span>
                            <span class="glyphicon glyphicon-remove close-icon"></span>
                        </button>
                    </div> -->
                    <ul class="navbar-right" role="menubar">
                        <li class="top-nav--link" aria-hidden="false">
                            <a href="/admin/" class="active" id="homeLink">Home</a>
                        </li>
                        <li class="top-nav--link" id="profileLinkListItem" aria-hidden="true">
                            <a href="javascript:void(0)" class="hidden" id="profileLink" onclick="CreateEditProfileAPI.showCreateEditProfile(this);">My Profile</a>
                        </li>
                        <li class="top-nav--link" id="jobPostersLinkListItem" aria-hidden="true">
                            <a href="#" class="hidden" id="jobPostersLink" onclick="CreateJobPosterAPI.showCreateJobPosterForm(this)">Job Posters</a>
                        </li>
                        <li class="top-nav--link" id="teamsLinkListItem" aria-hidden="true">
                            <a href="#" class="hidden" id="teamsLink">My Teams</a>
                        </li>
                        <li class="top-nav--link">
                            <div id="viewProfileLink">
                                <a href="javascript:void(0)" id="viewProfileLink" onclick="CreateEditProfileAPI.showViewProfile(this)">temp_view_profile_link</a>
                            </div>
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
                    </ul>
                   
                </div>
            <!--
                <button class="main-nav-button" id="js-mainNavButton">
                    <span class="main-nav-button--text">Menu</span>
                    <span class="main-nav-button--button">
                        <span class="glyphicon glyphicon-th"></span>
                    </span>
                </button> -->
            </div>
        </div>
    </div>
</nav>