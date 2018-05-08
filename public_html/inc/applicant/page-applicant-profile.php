<section class="applicant-profile hidden" id="profileSection">

    <div class="applicant-profile__heading">

        <div class="content-container">

            <div class="applicant-profile__heading-photo-wrapper">
                <div class="applicant-profile__photo" id="myProfilePic"></div>
                <!-- <img id="myProfilePic" class="profilePicLarge" src="images/user.png" alt="Profile Pic"/> -->
            </div>

            <h2 class="applicant-profile__name" id="updateProfileApplicantProfileFormNameLabelSpan"></h2>

            <p class="applicant-profile__tagline" id="updateProfileApplicantProfileFormTaglineLabelSpan">Default tag line!</p>

            <ul class="applicant-profile__social-wrapper" id="profileSocialMediaLinks">
                <li class="hidden" id="profileTwitterLinkWrapper">
                    <input type="hidden" id="profileTwitterUsername" value=""/>
                    <a href="#" id="profileTwitterLink" target="_blank" title="Twitter Logo">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li class="hidden" id="profileLinkedinLinkWrapper">
                    <input type="hidden" id="profileLinkedInUsername" value=""/>
                    <a href="#" id="profileLinkedinLink" target="_blank" title="Linkedin Logo">
                        <i class="fa fa-linkedin"></i>
                    </a>
                </li>
            </ul>

            <div class="applicant-profile__heading-edit-wrapper">
                <a href="javascript:void(0)" class="profileBasicInfoEdit" onclick="JobSeekerAPI.showJobSeekerProfileBasicInfoEdit()">
                    <i class="fa fa-pencil-square"></i>
                </a>
            </div>

            <input type="hidden" id="profileId"/>
            <input type="hidden" id="profileLastUpdated"/>

        </div>

    </div>

    <div class="applicant-profile__content">

        <div class="content-container">

            <div class="applicant-profile__question-wrapper" id="profileQuestionsWrapper">
                <?php /* Questions & Answers go here */ ?>
            </div>

        </div>

    </div>

    <?php /* <div class="pageBody">

        <div class="container">

            <div id="profileBasicInfo" class="profileBasicInfo centered">
                <div id="profileBasicInfoTopBar" class="profileBasicInfoTopBar flexContainerVerticallyCentered">
                    <div class="flexLeftOfCenter">
                        <ul id="profileSocialMediaLinks" class="profileSocialMediaLinks">
                            <li id="profileTwitterLinkWrapper" class="hidden">
                                <input type="hidden" id="profileTwitterUsername" value=""/>
                                <a href="#" id="profileTwitterLink" target="_blank"><img src="/images/Twitter_icon_white.svg" class="socialMediaLink" alt="Twitter logo"/></a>
                            </li>
                            <li id="profileLinkedinLinkWrapper" class="hidden">
                                <input type="hidden" id="profileLinkedInUsername" value=""/>
                                <a href="#" id="profileLinkedinLink" target="_blank"><img src="/images/Linkedin_icon_white.svg" class="socialMediaLink" alt="LinkedIn logo"/></a>
                            </li>
                        </ul>
                    </div>
                    <img id="myProfilePic" class="profilePicLarge" src="images/user.png" alt="Profile Pic"/>
                    <div class="flexRightOfCenter">
                        <a href="javascript:void(0)" class="profileBasicInfoEdit" onclick="JobSeekerAPI.showJobSeekerProfileBasicInfoEdit()">
                            <img src="/images/edit_profile_pic.svg" alt="Edit Basic Info" class="editImage"/>
                        </a>
                    </div>
                </div>
                <div id="profileNameWrapper">
                    <div class="profileName">
                        <span id="updateProfileApplicantProfileFormNameLabelSpan"></span>
                    </div>
                </div>
                <div class="profileTagLineContainer">
                    <p id="updateProfileApplicantProfileFormTaglineLabelSpan">Default tag line!</p>
                </div>
                <input type="hidden" id="profileId"/>
                <input type="hidden" id="profileLastUpdated"/>
            </div>

            <div class="block-container" id="profileQuestionsWrapper">
                
            </div>

        </div>

    </div> */ ?>

</section>
