<section class="public-manager-profile hidden" id="managerProfileSection">

    <div class="public-manager-profile__heading">

        <div class="content-container">

            <div class="public-manager-profile__heading-photo-wrapper">
                <div class="public-manager-profile__photo" id="managerProfilePic"></div>
            </div>

            <h2 class="public-manager-profile__name" id="managerProfileName"></h2>

            <p class="public-manager-profile__tagline" id="managerProfilePositionWrapper">
                <span id="managerProfilePosition"></span> 
                <span id="managerProfilePositionAtLabel"></span> 
                <span id="managerProfileDepartment"></span>
            </p>

            <ul class="public-manager-profile__social-wrapper" id="managerProfileSocialMediaLinks">
                <li class="hidden" id="managerProfileTwitterLinkWrapper">
                    <input type="hidden" id="profileTwitterUsername" value=""/>
                    <a href="#" id="managerProfileTwitterLink" target="_blank" title="Twitter Logo">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li class="hidden" id="managerProfileLinkedinLinkWrapper">
                    <input type="hidden" id="managerProfileLinkedInUsername" value=""/>
                    <a href="#" id="managerProfileLinkedinLink" target="_blank" title="Linkedin Logo">
                        <i class="fa fa-linkedin"></i>
                    </a>
                </li>
            </ul>

            <input type="hidden" id="managerProfile_managerProfileId"/>
            <input type="hidden" id="managerProfile_userId"/>
            <input type="hidden" id="managerProfileLastUpdated"/>

        </div>

    </div>

    <div class="public-manager-profile__content">

        <div class="content-container">

            <div class="public-manager-profile__question-wrapper" id="">

                <button class="public-manager-profile__back-link" id="jobPosterBackButton" value="Back" onclick="EventsAPI.goBack();">
                    <i class="fa fa-chevron-left"></i><span>Back to Job Poster</span>
                </button>

                <h3 class="public-manager-profile__question-title" id="" >My Approach as a Manager</h3>

                <div class="public-manager-profile__question">
                    <h4 class="public-manager-profile__question-subtitle" id="managerProfileLeadershipStyleTitle">My Leadership Style</h4>
                    <p class="public-manager-profile__question-answer" id="managerProfileLeadershipStyle">This is my leadership style.</p>
                </div>

                <div class="public-manager-profile__question">
                    <h4 class="public-manager-profile__question-subtitle" id="managerProfileExpectationsTitle">My Expectations of Employees</h4>
                    <p class="public-manager-profile__question-answer" id="managerProfileExpectations">These are my employee expectations.</p>
                </div>

                <div class="public-manager-profile__question">
                    <h4 class="public-manager-profile__question-subtitle" id="managerProfileDecisionMakingTitle">My Approach to Decision Making</h4>
                    <div class="public-manager-profile__decision-wrapper flex-grid top">

                        <div class="box lg-1of4">
                            <div class="public-manager-profile__decision-support">
                                <p id="managerDecisions_tipWhatis"></p>
                                <p id="managerDecisions_tipSummary"></p>
                            </div>
                        </div>

                        <div class="box lg-3of4">
                            <div>
                                <p class="public-manager-profile__decision-answer" id="managerProfile_review"></p>
                                <p class="public-manager-profile__decision-answer" id="managerProfile_stayLate"></p>
                                <p class="public-manager-profile__decision-answer" id="managerProfile_engagement"></p>
                                <p class="public-manager-profile__decision-answer" id="managerProfile_developmentOpportunities"></p>
                                <p class="public-manager-profile__decision-answer" id="managerProfile_acceptLowValueWorkRequests"></p>
                            </div>
                        </div>

                    </div>
                </div>

                <h3 class="public-manager-profile__question-title" id="" >About Me</h3>

                <div class="public-manager-profile__question">
                    <h4 class="public-manager-profile__question-subtitle" id="managerProfileAboutMeTitle" >About Me</h4>
                    <p class="public-manager-profile__question-answer" id="managerProfileAboutMe">This is the about me section.</p>
                </div>

                <div class="public-manager-profile__question">
                    <h4 class="public-manager-profile__question-subtitle" id="managerProfileAccomplishmentTitle">My Greatest Accomplishment</h4>
                    <p class="public-manager-profile__question-answer" id="managerProfileAccomplishment">This is my greatest accomplishment.</p>
                </div>

                <div class="public-manager-profile__question manager-education">
                    <h4 class="public-manager-profile__question-subtitle" id="managerProfileEducationTitle">Education</h4>
                    <p class="public-manager-profile__question-answer" id="managerProfileEducation">This is my education.</p>
                </div>

                <div class="public-manager-profile__question">
                    <h4 class="public-manager-profile__question-subtitle" id="managerProfileExperienceTitle">Work History</h4>
                    <p class="public-manager-profile__question-answer" id="managerProfileExperience">This is my work history.</p>
                </div>

                <button class="public-manager-profile__back-link" id="" value="Back" onclick="EventsAPI.goBack();">
                    <i class="fa fa-chevron-left"></i><span>Back to Job Poster</span>
                </button>

            </div>

        </div>

    </div>


    <?php /* <div class="pageBody">

        <div class="container"> */ ?>

            <?php /* <div id="managerProfileBasicInfo" class="profileBasicInfo centered">
                <div id="managerProfileBasicInfoTopBar" class="profileBasicInfoTopBar flexContainerVerticallyCentered">
                    <div class="flexLeftOfCenter">
                        <ul id="managerProfileSocialMediaLinks" class="profileSocialMediaLinks">
                            <li id="managerProfileTwitterLinkWrapper" class="hidden">
                                <a href="#" id="managerProfileTwitterLink" target="_blank"><img src="/images/Twitter_icon_white.svg" class="socialMediaLink" alt="Twitter logo"/></a>
                            </li>
                            <li id="managerProfileLinkedinLinkWrapper" class="hidden">
                                <a href="#" id="managerProfileLinkedinLink" target="_blank"><img src="/images/Linkedin_icon_white.svg" class="socialMediaLink" alt="LinkedIn logo"/></a>
                            </li>
                        </ul>
                    </div>
                    <img id="managerProfilePic" class="profilePicLarge" src="images/user.png" alt="Manager Profile Pic"/>
                    <div class="flexRightOfCenter"></div>
                </div>
                <div id="managerProfileNameWrapper">
                    <div id="managerProfileName" class="profileName">
                        <span id="managerProfileName"></span>
                    </div>
                </div>
                <div id="managerProfilePositionWrapper" class="profileTagLineContainer">
                    <p><span id="managerProfilePosition" class="bold"></span> <span id="managerProfilePositionAtLabel"></span> <span id="managerProfileDepartment" class="bold"></span></p>
                </div>
                <input type="hidden" id="managerProfile_managerProfileId"/>
                <input type="hidden" id="managerProfile_userId"/>
                <input type="hidden" id="managerProfileLastUpdated"/>
            </div> */ ?>

            <?php /* <div class="profileSubSection">
                <div class="profileSubSectionTitleBar">
                    <h2 id="managerProfileAboutMeTitle" >About Me</h2>
                </div>
                <p id="managerProfileAboutMe">This is the about me section.</p>
            </div>
            <div class="profileSubSection">
                <div class="profileSubSectionTitleBar">
                    <h2 id="managerProfileAccomplishmentTitle">My Greatest Accomplishment</h2>
                </div>
                <p id="managerProfileAccomplishment">This is my greatest accomplishment.</p>
            </div>
            <div class="profileSubSection">
                <div class="profileSubSectionTitleBar">
                    <h2 id="managerProfileLeadershipStyleTitle">My Leadership Style</h2>
                </div>
                <p id="managerProfileLeadershipStyle">This is my leadership style.</p>
            </div>
            <div class="profileSubSection">
                <div class="profileSubSectionTitleBar">
                    <h2 id="managerProfileExpectationsTitle">My Expectations of Employees</h2>
                </div>
                <p id="managerProfileExpectations">These are my employee expectations.</p>
            </div>
            <div class='profileSubSection manager-decisions'>
                <div class='profileSubSectionTitleBar'>
                    <h2 id="managerProfileDecisionMakingTitle">My Approach to Decision Making</h2>
                </div>
                <div class="manager-decisions-tip">
                    <p id="managerDecisions_tipWhatis"></p>
                    <p id="managerDecisions_tipSummary"></p>
                </div>
                <div>
                    <p id="managerProfile_review"></p>
                    <p id="managerProfile_stayLate"></p>
                    <p id="managerProfile_engagement"></p>
                    <p id="managerProfile_developmentOpportunities"></p>
                    <p id="managerProfile_acceptLowValueWorkRequests"></p>
                </div>
            </div>
            <div class='profileSubSection manager-education'>
                <div class='profileSubSectionTitleBar'>
                    <h2 id='managerProfileEducationTitle'>Education</h2>
                </div>
                <p id='managerProfileEducation'>This is my education.</p>
            </div>
            <div class='profileSubSection'>
                <div class='profileSubSectionTitleBar'>
                    <h2 id='managerProfileExperienceTitle'>Work History</h2>
                </div>
                <p id='managerProfileExperience'>This is my work history.</p>
            </div>
            <div class="profileSubSection centered">
                <button id="jobPosterBackButton" class="btn btn-default" value="Back" onclick="EventsAPI.goBack();">
                    Back to Job Poster
                </button>
            </div> */ ?>
        <?php /* </div>

    </div> */ ?>

</section>
