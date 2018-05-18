<section class="public-manager-profile hidden" id="managerProfileSection">

    <div class="public-manager-profile__heading">

        <div class="content-container">

            <div class="public-manager-profile__heading-photo-wrapper">
                <div class="public-manager-profile__photo" id="managerProfilePic"></div>
            </div>

            <h3 class="public-manager-profile__name" id="managerProfileName"></h3>

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

                <button class="public-manager-profile__back-link" id="jobPosterBackButton" value="Back" onclick="">
                    <i class="fa fa-chevron-left"></i><span id="jobPosterBackButtonText">Back to Job Poster</span>
                </button>

                <h4 class="public-manager-profile__question-title" id="" >My Approach as a Manager</h4>

                <div class="public-manager-profile__question">
                    <h5 class="public-manager-profile__question-subtitle" id="managerProfileLeadershipStyleTitle">My Leadership Style</h5>
                    <p class="public-manager-profile__question-answer" id="managerProfileLeadershipStyle">This is my leadership style.</p>
                </div>

                <div class="public-manager-profile__question">
                    <h5 class="public-manager-profile__question-subtitle" id="managerProfileExpectationsTitle">My Expectations of Employees</h5>
                    <p class="public-manager-profile__question-answer" id="managerProfileExpectations">These are my employee expectations.</p>
                </div>

                <div class="public-manager-profile__question">
                    <h5 class="public-manager-profile__question-subtitle" id="managerProfileDecisionMakingTitle">My Approach to Decision Making</h5>
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

                <h4 class="public-manager-profile__question-title" id="" >About Me</h4>

                <div class="public-manager-profile__question">
                    <h5 class="public-manager-profile__question-subtitle" id="managerProfileAboutMeTitle" >About Me</h5>
                    <p class="public-manager-profile__question-answer" id="managerProfileAboutMe">This is the about me section.</p>
                </div>

                <div class="public-manager-profile__question">
                    <h5 class="public-manager-profile__question-subtitle" id="managerProfileAccomplishmentTitle">My Greatest Accomplishment</h5>
                    <p class="public-manager-profile__question-answer" id="managerProfileAccomplishment">This is my greatest accomplishment.</p>
                </div>

                <div class="public-manager-profile__question manager-education">
                    <h5 class="public-manager-profile__question-subtitle" id="managerProfileEducationTitle">Education</h5>
                    <p class="public-manager-profile__question-answer" id="managerProfileEducation">This is my education.</p>
                </div>

                <div class="public-manager-profile__question">
                    <h5 class="public-manager-profile__question-subtitle" id="managerProfileExperienceTitle">Work History</h5>
                    <p class="public-manager-profile__question-answer" id="managerProfileExperience">This is my work history.</p>
                </div>

                <button class="public-manager-profile__back-link" id="jobPosterBackButton2" value="Back" onclick="">
                    <i class="fa fa-chevron-left"></i><span id="jobPosterBackButtonText2">Back to Job Poster</span>
                </button>

            </div>

        </div>

    </div>

</section>
