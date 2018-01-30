<nav id="wb-sm">
    <div class="topbar transparent" id="site--topbar">
        <h2>Topics menu</h2>
        <div class="row">
            <!-- TO DO - Logo
            <div class="circle">
                <a href="/" class="tc-logo" role="img" aria-label="GC Talent Cloud"></a>
            </div>-->
            <div class="nav-container">
                <!--
                <div id="js-mobileNav">
                    <div id="js-mobileNav--closeContainer">
                        <button id="js-mobileNav--button">
                            <span class="text">Close</span>
                            <span class="glyphicon glyphicon-remove close-icon"></span>
                        </button>
                    </div> -->
                    <ul class="navbar-right" role="menubar">
                        <li class="top-nav--link active" aria-hidden="false" id="homeLink">
                            <a href="/">Home</a>
                        </li>

                        <li class="top-nav--link">
                            <a href="/about">FAQ</a>
                        </li>
                       
                        <li class="top-nav--link" id="profileLinkListItem" aria-hidden="true">
                            <a href="#MyProfile" class="hidden" id="profileLink" onclick="JobSeekerAPI.showJobSeekerProfileForm()">My Profile</a>
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